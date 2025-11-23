"""
Database configuration and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Database URL - supports both DATABASE_URL and POSTGRES_URL (from Vercel Supabase integration)
# Vercel Supabase integration provides POSTGRES_URL, but we also support DATABASE_URL for flexibility
POSTGRES_URL = os.getenv("POSTGRES_URL")
DATABASE_URL_ENV = os.getenv("DATABASE_URL")

DATABASE_URL = POSTGRES_URL or DATABASE_URL_ENV or "sqlite:///./ucp_estimation.db"

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

