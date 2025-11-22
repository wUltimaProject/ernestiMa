"""
FastAPI application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from infrastructure.database import engine, Base
from presentation.routes import router

# Create database tables
Base.metadata.create_all(bind=engine)

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
# Add Vercel domain if in production
if os.getenv("VERCEL_URL"):
    vercel_url = f"https://{os.getenv('VERCEL_URL')}"
    allowed_origins.append(vercel_url)
# Add custom domain if set
if os.getenv("FRONTEND_URL"):
    allowed_origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)


@app.get("/api/")
async def root():
    return {"message": "ErnestiMa API", "version": "1.0.0"}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}

