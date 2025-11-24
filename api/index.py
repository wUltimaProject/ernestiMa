"""
Vercel serverless function entry point
Vercel automatically detects index.py as entry point when Root Directory is set to api/
"""
from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for Vercel serverless compatibility
# This is the handler that Vercel will use
handler = Mangum(app, lifespan="off")

