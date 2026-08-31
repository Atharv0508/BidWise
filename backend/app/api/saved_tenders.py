from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.database.mongodb import db
from app.models.saved_tender import SavedTenderCreate
from app.utils.auth import get_current_vendor


router = APIRouter(
    prefix="/saved-tenders",
    tags=["Saved Tenders"],
)


# ============================================================
# SAVE TENDER
# ============================================================

@router.post("/")
async def save_tender(
    data: SavedTenderCreate,
    current_vendor=Depends(get_current_vendor),
):
    try:
        vendor_id = current_vendor["_id"]

        # Validate tender ID
        if not ObjectId.is_valid(data.tender_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid tender ID",
            )

        tender_id = ObjectId(data.tender_id)

        # Check that tender exists
        tender = db.tenders.find_one(
            {"_id": tender_id}
        )

        if not tender:
            raise HTTPException(
                status_code=404,
                detail="Tender not found",
            )

        # Prevent duplicate saves
        existing = db.saved_tenders.find_one(
            {
                "vendor_id": vendor_id,
                "tender_id": tender_id,
            }
        )

        if existing:
            return {
                "message": "Tender already saved",
                "saved_tender_id": str(existing["_id"]),
            }

        result = db.saved_tenders.insert_one(
            {
                "vendor_id": vendor_id,
                "tender_id": tender_id,
                "saved_at": datetime.now(timezone.utc),
            }
        )

        return {
            "message": "Tender saved successfully",
            "saved_tender_id": str(result.inserted_id),
            "tender_id": data.tender_id,
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save tender: {str(error)}",
        )


# ============================================================
# GET SAVED TENDERS
# ============================================================

@router.get("/")
async def get_saved_tenders(
    current_vendor=Depends(get_current_vendor),
):
    try:
        vendor_id = current_vendor["_id"]

        saved_records = db.saved_tenders.find(
            {
                "vendor_id": vendor_id
            }
        ).sort(
            "saved_at",
            -1,
        )

        tenders = []

        for record in saved_records:

            tender = db.tenders.find_one(
                {
                    "_id": record["tender_id"]
                }
            )

            if not tender:
                continue

            tender["_id"] = str(tender["_id"])

            tender["saved_at"] = record["saved_at"]

            tenders.append(tender)

        return {
            "count": len(tenders),
            "tenders": tenders,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch saved tenders: {str(error)}",
        )


# ============================================================
# CHECK WHETHER A TENDER IS SAVED
# ============================================================

@router.get("/{tender_id}")
async def check_saved_tender(
    tender_id: str,
    current_vendor=Depends(get_current_vendor),
):
    try:
        if not ObjectId.is_valid(tender_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid tender ID",
            )

        vendor_id = current_vendor["_id"]

        saved = db.saved_tenders.find_one(
            {
                "vendor_id": vendor_id,
                "tender_id": ObjectId(tender_id),
            }
        )

        return {
            "saved": saved is not None,
            "tender_id": tender_id,
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to check saved tender: {str(error)}",
        )


# ============================================================
# REMOVE SAVED TENDER
# ============================================================

@router.delete("/{tender_id}")
async def remove_saved_tender(
    tender_id: str,
    current_vendor=Depends(get_current_vendor),
):
    try:
        if not ObjectId.is_valid(tender_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid tender ID",
            )

        vendor_id = current_vendor["_id"]

        result = db.saved_tenders.delete_one(
            {
                "vendor_id": vendor_id,
                "tender_id": ObjectId(tender_id),
            }
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Saved tender not found",
            )

        return {
            "message": "Tender removed from saved tenders",
            "tender_id": tender_id,
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to remove saved tender: {str(error)}",
        )