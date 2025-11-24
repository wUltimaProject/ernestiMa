"""
FastAPI application entry point
"""
import logging
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Configure logging to see errors in Vercel logs
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

try:
    from infrastructure.database import engine, Base
    from presentation.routes import router
    
    # Create database tables (with error handling)
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as db_error:
        logger.error(f"Failed to create database tables: {db_error}", exc_info=True)
        # Continue anyway - health endpoint will still work
        router = None
except Exception as import_error:
    logger.error(f"Failed to import database/routes: {import_error}", exc_info=True)
    router = None

app = FastAPI(
    title="ErnestiMa API",
    description="API for software project estimation using the Use Case Points method",
    version="1.0.0",
)

# CORS configuration - allow both local and production origins
import os
allowed_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3002,http://localhost:3000"
).split(",")
# Add Vercel backend domain if in production (for API docs)
if os.getenv("VERCEL_URL"):
    vercel_url = f"https://{os.getenv('VERCEL_URL')}"
    allowed_origins.append(vercel_url)
# Add frontend URL (required for separate Vercel projects)
if os.getenv("FRONTEND_URL"):
    frontend_urls = os.getenv("FRONTEND_URL").split(",")
    allowed_origins.extend(frontend_urls)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers (only if available)
if router:
    app.include_router(router)
else:
    logger.warning("Router not available - database routes will not work")


@app.get("/")
async def root():
    return {"message": "ErnestiMa API", "version": "1.0.0"}


@app.get("/health")
async def health():
    """Health check endpoint - works even if database is not available"""
    import os
    from infrastructure.database import engine
    from sqlalchemy import text
    
    # Check if database URL is configured
    postgres_url = os.getenv("POSTGRES_URL")
    database_url = os.getenv("DATABASE_URL")
    
    db_info = {
        "postgres_url_set": bool(postgres_url),
        "database_url_set": bool(database_url),
        "postgres_url_preview": postgres_url[:30] + "..." if postgres_url and len(postgres_url) > 30 else postgres_url,
    }
    
    try:
        # Try to check database connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            result.fetchone()
        db_status = "connected"
        error = None
    except Exception as e:
        logger.error(f"Database health check failed: {e}", exc_info=True)
        db_status = "disconnected"
        error = str(e)
        db_info["error"] = error
    
    return {
        "status": "healthy",
        "database": db_status,
        "db_info": db_info
    }

# Vercel automatically detects FastAPI when it finds 'app = FastAPI()' in index.py
# No need for Mangum wrapper - Vercel handles it automatically

