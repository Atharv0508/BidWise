from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from app.models.vendor import VendorCreate

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