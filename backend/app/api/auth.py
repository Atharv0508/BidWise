from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext

from app.database.mongodb import db
from app.models.vendor import VendorLogin, TokenResponse
from app.utils.jwt import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


@router.post("/login", response_model=TokenResponse)
async def login_vendor(vendor: VendorLogin):

    # Find vendor by email
    existing_vendor = db.vendors.find_one({
        "email": vendor.email
    })

    if not existing_vendor:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    password_is_valid = pwd_context.verify(
        vendor.password,
        existing_vendor["password"]
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT token
    access_token = create_access_token({
        "sub": str(existing_vendor["_id"]),
        "email": existing_vendor["email"]
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }