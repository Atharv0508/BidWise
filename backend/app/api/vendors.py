from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from bson import ObjectId

from app.database.mongodb import db
from app.models.vendor import VendorCreate
from app.utils.jwt import create_access_token
from app.utils.auth import get_current_vendor


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)


# ============================================================
# CREATE VENDOR
# ============================================================

@router.post("/")
async def create_vendor(vendor: VendorCreate):
    try:
        # Check if email already exists
        existing_vendor = db.vendors.find_one({
            "email": vendor.email
        })

        if existing_vendor:
            raise HTTPException(
                status_code=400,
                detail="A vendor with this email already exists"
            )

        vendor_data = vendor.model_dump()

        # Hash password before storing it
        vendor_data["password"] = pwd_context.hash(
            vendor_data["password"]
        )

        result = db.vendors.insert_one(vendor_data)

        return {
            "message": "Vendor created successfully",
            "vendor_id": str(result.inserted_id)
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ============================================================
# LOGIN VENDOR
# ============================================================

@router.post("/login")
async def login_vendor(email: str, password: str):

    vendor = db.vendors.find_one({
        "email": email
    })

    if not vendor:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    if not pwd_context.verify(
        password,
        vendor["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT token
    access_token = create_access_token({
        "vendor_id": str(vendor["_id"]),
        "email": vendor["email"],
    })

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "vendor_id": str(vendor["_id"]),
        "company_name": vendor["company_name"],
    }


# ============================================================
# GET ALL VENDORS
# ============================================================

@router.get("/")
async def get_vendors():

    try:
        vendors = []

        for vendor in db.vendors.find():

            vendor["_id"] = str(vendor["_id"])

            # Never expose password
            vendor.pop("password", None)

            vendors.append(vendor)

        return vendors

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ============================================================
# GET CURRENT LOGGED-IN VENDOR
# ============================================================

@router.get("/me")
async def get_current_vendor_profile(
    vendor_id: str = Depends(get_current_vendor)
):

    try:

        if not ObjectId.is_valid(vendor_id):

            raise HTTPException(
                status_code=400,
                detail="Invalid vendor ID"
            )

        vendor = db.vendors.find_one({
            "_id": ObjectId(vendor_id)
        })

        if not vendor:

            raise HTTPException(
                status_code=404,
                detail="Vendor not found"
            )

        vendor["_id"] = str(vendor["_id"])

        # Never return password
        vendor.pop("password", None)

        return vendor

    except HTTPException:
        raise

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ============================================================
# GET VENDOR BY ID
# ============================================================

@router.get("/{vendor_id}")
async def get_vendor(vendor_id: str):

    try:

        if not ObjectId.is_valid(vendor_id):

            raise HTTPException(
                status_code=400,
                detail="Invalid vendor ID"
            )

        vendor = db.vendors.find_one({
            "_id": ObjectId(vendor_id)
        })

        if not vendor:

            raise HTTPException(
                status_code=404,
                detail="Vendor not found"
            )

        vendor["_id"] = str(vendor["_id"])

        # Never return password
        vendor.pop("password", None)

        return vendor

    except HTTPException:
        raise

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )