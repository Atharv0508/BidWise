from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from app.models.vendor import VendorCreate
from bson import ObjectId
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)


@router.post("/")
async def create_vendor(vendor: VendorCreate):
    try:
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

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

@router.post("/login")
async def login_vendor(email: str, password: str):
    vendor = db.vendors.find_one({"email": email})

    if not vendor:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not pwd_context.verify(password, vendor["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "message": "Login successful",
        "vendor_id": str(vendor["_id"]),
        "company_name": vendor["company_name"]
    }

@router.get("/")
async def get_vendors():
    try:
        vendors = []

        for vendor in db.vendors.find():
            vendor["_id"] = str(vendor["_id"])
            vendors.append(vendor)

        return vendors

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@router.get("/{vendor_id}")
async def get_vendor(vendor_id: str):
    try:
        if not ObjectId.is_valid(vendor_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid vendor ID"
            )

        vendor = db.vendors.find_one(
            {"_id": ObjectId(vendor_id)}
        )

        if not vendor:
            raise HTTPException(
                status_code=404,
                detail="Vendor not found"
            )

        vendor["_id"] = str(vendor["_id"])
        return vendor

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )