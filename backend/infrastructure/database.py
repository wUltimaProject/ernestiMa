"""
Database configuration and session management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL - supports both DATABASE_URL and POSTGRES_URL (from Vercel Supabase integration)
# Vercel Supabase integration provides POSTGRES_URL, but we also support DATABASE_URL for flexibility
DATABASE_URL = os.getenv(
    "POSTGRES_URL",  # Vercel Supabase integration uses this
    os.getenv(
        "DATABASE_URL",  # Fallback for manual configuration
        "sqlite:///./ucp_estimation.db"  # Default to SQLite for local development
    )
)

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

