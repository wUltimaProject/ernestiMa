"""
FastAPI application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ErnestiMa API",
    description="API per la stima di progetti software utilizzando il metodo Use Case Points",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "ErnestiMa API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

