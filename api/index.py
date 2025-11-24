"""
Vercel serverless function entry point
Vercel automatically detects Python files in api/ folder
"""
import sys
import traceback

try:
    from mangum import Mangum
    from main import app
    
    # Wrap FastAPI app with Mangum for Vercel serverless compatibility
    handler = Mangum(app, lifespan="off")
except Exception as e:
    # Log the error so we can see it in Vercel logs
    error_msg = f"Error in index.py: {str(e)}\n{traceback.format_exc()}"
    print(error_msg, file=sys.stderr)
    sys.stderr.flush()
    
    # Create a minimal handler that returns the error
    def handler(event, context):
        return {
            "statusCode": 500,
            "body": error_msg
        }

