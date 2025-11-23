"""
Vercel serverless function entry point
Vercel automatically detects Python files in api/ folder
"""
from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for Vercel serverless compatibility
handler = Mangum(app, lifespan="off")

