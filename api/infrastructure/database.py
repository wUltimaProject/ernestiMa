"""
Database configuration and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import logging
import socket
from urllib.parse import urlparse, urlunparse
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Database URL - supports both DATABASE_URL and POSTGRES_URL (from Vercel Supabase integration)
# Vercel Supabase integration provides POSTGRES_URL, but we also support DATABASE_URL for flexibility
# For Supabase with Vercel serverless, use pooler connection string (port 6543) instead of direct (port 5432)
# Pooler uses IPv4 and works better with serverless functions
POSTGRES_URL = os.getenv("POSTGRES_URL")
DATABASE_URL_ENV = os.getenv("DATABASE_URL")

# Convert Supabase direct connection (port 5432) to pooler connection (port 6543) for serverless compatibility
# Also force IPv4 by resolving hostname to IPv4 address (Vercel serverless doesn't support IPv6)
def convert_to_pooler_url(url: str) -> str:
    """Convert Supabase direct connection to pooler connection for serverless compatibility"""
    if url and "supabase.co" in url:
        try:
            # Parse the connection string
            parsed = urlparse(url)
            
            # Convert port 5432 to 6543 (pooler port)
            if parsed.port == 5432:
                port = 6543
            else:
                port = parsed.port or 5432
            
            # Resolve hostname to IPv4 address (force IPv4, not IPv6)
            hostname = parsed.hostname
            if hostname:
                try:
                    # Get IPv4 address only
                    ipv4 = socket.gethostbyname(hostname)
                    logger.info(f"Resolved {hostname} to IPv4: {ipv4}")
                    
                    # Replace hostname with IPv4 address in connection string
                    # Format: postgresql://user:pass@ipv4:port/db
                    netloc = f"{parsed.username}:{parsed.password}@{ipv4}:{port}"
                    if parsed.port:
                        url = urlunparse((
                            parsed.scheme,
                            netloc,
                            parsed.path,
                            parsed.params,
                            parsed.query,
                            parsed.fragment
                        ))
                    else:
                        # If no port was in original, we need to add it
                        url = url.replace(f"@{hostname}/", f"@{ipv4}:{port}/")
                    
                    logger.info("Converted Supabase connection to pooler with IPv4 address")
                except socket.gaierror as e:
                    logger.warning(f"Could not resolve {hostname} to IPv4: {e}. Using original hostname.")
                    # Fallback: just change port
                    if ":5432/" in url:
                        url = url.replace(":5432/", ":6543/")
            else:
                # Fallback: just change port
                if ":5432/" in url:
                    url = url.replace(":5432/", ":6543/")
        except Exception as e:
            logger.error(f"Error converting connection string: {e}")
            # Fallback: just change port
            if ":5432/" in url:
                url = url.replace(":5432/", ":6543/")
    
    return url

DATABASE_URL = POSTGRES_URL or DATABASE_URL_ENV or "sqlite:///./ucp_estimation.db"

# Convert to pooler if it's a Supabase direct connection
if DATABASE_URL and not DATABASE_URL.startswith("sqlite"):
    DATABASE_URL = convert_to_pooler_url(DATABASE_URL)

# Log which database URL is being used (without exposing credentials)
if POSTGRES_URL:
    logger.info("Using POSTGRES_URL from environment")
elif DATABASE_URL_ENV:
    logger.info("Using DATABASE_URL from environment")
else:
    logger.warning("No database URL found in environment, using SQLite default")

# For SQLite, we need to disable check_same_thread
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=False
    )
else:
    # PostgreSQL (including Supabase) - use connection pooling for serverless
    # Supabase pooler connection strings work out of the box
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,  # Verify connections before using (important for serverless)
        pool_recycle=300,    # Recycle connections after 5 minutes
        echo=False
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

