"""
Vercel serverless function wrapper for FastAPI
This file is used when deploying to Vercel
"""
import sys
import os

# Get absolute path to backend directory
# This file is in backend/api/index.py
# We need to add backend/ to sys.path to import main
current_file = os.path.abspath(__file__)
api_dir = os.path.dirname(current_file)  # backend/api/
backend_dir = os.path.dirname(api_dir)   # backend/

# Add backend directory to Python path if not already there
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Verify we can find main.py
main_path = os.path.join(backend_dir, 'main.py')
if not os.path.exists(main_path):
    raise ImportError(f"Cannot find main.py at {main_path}. Current working directory: {os.getcwd()}")

from mangum import Mangum
from main import app

# Wrap FastAPI app with Mangum for AWS Lambda/Vercel compatibility
handler = Mangum(app, lifespan="off")
