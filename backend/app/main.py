from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db

app = FastAPI(
    title="BidWise API",
    description="Backend API for BidWise",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "BidWise backend is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/database-test")
async def database_test():
    try:
        db.command("ping")
        return {"status": "connected", "database": db.name}
    except Exception as error:
        return {
            "status": "error",
            "message": str(error),
        }