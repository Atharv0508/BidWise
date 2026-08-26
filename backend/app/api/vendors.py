from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from app.models.vendor import VendorCreate
from bson import ObjectId
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)


@router.post("/")
async def create_vendor(vendor: VendorCreate):
    try:
        # Convert the Pydantic model into a dictionary
        vendor_data = vendor.model_dump()

        # Insert vendor into MongoDB
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