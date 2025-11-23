"""
Vercel serverless function wrapper for FastAPI
This file is in api/ (root) for Vercel automatic detection
It imports from backend/api/index.py
"""
import sys
import os

# Add backend directory to path
backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backend')
sys.path.insert(0, backend_dir)

# Import the handler from backend
from api.index import handler

# Export handler for Vercel
__all__ = ['handler']

