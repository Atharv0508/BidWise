from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db
from app.api.vendors import router as vendors_router
from app.api.tenders import router as tenders_router
from app.api.saved_tenders import router as saved_tenders_router
from app.api.auth import router as auth_router


app = FastAPI(
    title="BidWise API",
    description="Backend API for BidWise",
    version="1.0.0",
)


# =========================
# CORS
# =========================

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


# =========================
# API ROUTERS
# =========================

app.include_router(vendors_router)
app.include_router(tenders_router)
app.include_router(saved_tenders_router)
app.include_router(auth_router)


# =========================
# ROOT
# =========================

@app.get("/")
async def root():
    return {
        "message": "BidWise backend is running"
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }


# =========================
# DATABASE TEST
# =========================

@app.get("/database-test")
async def database_test():
    try:
        db.command("ping")

        return {
            "status": "connected",
            "database": db.name,
        }

    except Exception as error:
        return {
            "status": "error",
            "message": str(error),
        }