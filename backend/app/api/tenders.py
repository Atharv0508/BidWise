from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId

from app.database.mongodb import db
from app.services.tender_provider import (
    get_active_tenders,
    normalize_tender,
    get_tender_detail,
)


router = APIRouter(
    prefix="/tenders",
    tags=["Tenders"],
)


# ============================================================
# GET ACTIVE TENDERS FROM PARSE
# ============================================================

@router.get("/active")
async def get_active_tenders_api(
    page: int = Query(
        0,
        ge=0,
        description="Zero-based page number",
    )
):
    """
    Get active tenders directly from the Parse API.
    This does NOT save the tenders to MongoDB.
    """

    try:
        data = get_active_tenders(page)

        return data

    except ValueError as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail=f"Tender provider error: {str(error)}",
        )


# ============================================================
# SYNC ACTIVE TENDERS TO MONGODB
# ============================================================

@router.post("/sync")
async def sync_tenders(
    page: int = Query(
        0,
        ge=0,
        description="Zero-based page number",
    )
):
    """
    Fetch active tenders from Parse and save/update
    them in MongoDB.
    """

    try:
        response = get_active_tenders(page)

        tender_data = response.get("data", {})

        tenders = tender_data.get("tenders", [])

        if not tenders:
            return {
                "message": "No tenders found",
                "inserted": 0,
                "updated": 0,
                "total": 0,
                "page": page,
            }

        inserted = 0
        updated = 0

        for tender in tenders:

            normalized = normalize_tender(tender)

            title = normalized.get("title")
            reference_number = normalized.get(
                "reference_number"
            )

            # Ignore records without a title
            if not title:
                continue

            # Use reference number as the preferred
            # unique identifier.
            if reference_number:
                query = {
                    "reference_number": reference_number,
                    "source": "CPPP",
                }
            else:
                query = {
                    "title": title,
                    "source": "CPPP",
                }

            existing = db.tenders.find_one(query)

            if existing:

                db.tenders.update_one(
                    {"_id": existing["_id"]},
                    {
                        "$set": normalized
                    },
                )

                updated += 1

            else:

                db.tenders.insert_one(normalized)

                inserted += 1

        return {
            "message": "Tenders synchronized successfully",
            "inserted": inserted,
            "updated": updated,
            "total": inserted + updated,
            "page": page,
        }

    except ValueError as error:

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

    except Exception as error:

        raise HTTPException(
            status_code=502,
            detail=f"Tender synchronization failed: {str(error)}",
        )


# ============================================================
# GET TENDERS FROM MONGODB
# ============================================================

@router.get("/")
async def get_tenders(
    limit: int = Query(
        20,
        ge=1,
        le=100,
        description="Number of tenders to return",
    )
):
    """
    Get tenders stored in BidWise MongoDB.
    """

    try:

        tenders = []

        cursor = (
            db.tenders
            .find()
            .sort("published_date", -1)
            .limit(limit)
        )

        for tender in cursor:

            tender["_id"] = str(tender["_id"])

            tenders.append(tender)

        return {
            "count": len(tenders),
            "tenders": tenders,
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch tenders: {str(error)}",
        )


# ============================================================
# ENRICH ONE TENDER WITH FULL DETAILS
# ============================================================

@router.post("/{tender_id}/enrich")
async def enrich_tender(tender_id: str):
    """
    Fetch full tender details from Parse using the
    detail_url stored in MongoDB and save the result
    back into the tender document.
    """

    try:

        # ----------------------------------------------------
        # Validate MongoDB ObjectId
        # ----------------------------------------------------

        if not ObjectId.is_valid(tender_id):

            raise HTTPException(
                status_code=400,
                detail="Invalid tender ID",
            )

        # ----------------------------------------------------
        # Find tender in MongoDB
        # ----------------------------------------------------

        tender = db.tenders.find_one(
            {
                "_id": ObjectId(tender_id)
            }
        )

        if not tender:

            raise HTTPException(
                status_code=404,
                detail="Tender not found",
            )

        # ----------------------------------------------------
        # Get original tender URL
        # ----------------------------------------------------

        detail_url = tender.get("detail_url")

        if not detail_url:

            raise HTTPException(
                status_code=400,
                detail="Tender does not have a detail URL",
            )

        # ----------------------------------------------------
        # Call Parse tender detail endpoint
        # ----------------------------------------------------

        detail_data = get_tender_detail(detail_url)

        # ----------------------------------------------------
        # Handle CAPTCHA protected pages
        # ----------------------------------------------------

        if detail_data.get("status") == "CAPTCHA_GATED":

            return {
                "status": "CAPTCHA_GATED",
                "message": (
                    "This tender detail page is protected by "
                    "CAPTCHA and could not be automatically retrieved."
                ),
                "tender_id": tender_id,
                "detail_url": detail_url,
            }

        # ----------------------------------------------------
        # Save full Parse response to MongoDB
        # ----------------------------------------------------

        db.tenders.update_one(
            {
                "_id": ObjectId(tender_id)
            },
            {
                "$set": {
                    "details": detail_data,
                    "details_enriched": True,
                }
            },
        )

        # ----------------------------------------------------
        # Return result
        # ----------------------------------------------------

        return {
            "message": "Tender details enriched successfully",
            "tender_id": tender_id,
            "details": detail_data,
        }

    except HTTPException:
        raise

    except Exception as error:

        raise HTTPException(
            status_code=502,
            detail=f"Tender enrichment failed: {str(error)}",
        )


# ============================================================
# SEARCH AND FILTER TENDERS
# ============================================================

@router.get("/search")
async def search_tenders(
    q: str | None = Query(
        default=None,
        description="Search tender title or reference number",
    ),
    location: str | None = Query(
        default=None,
        description="Filter by location",
    ),
    organisation: str | None = Query(
        default=None,
        description="Filter by organisation",
    ),
    category: str | None = Query(
        default=None,
        description="Filter by category",
    ),
    min_value: float | None = Query(
        default=None,
        ge=0,
        description="Minimum estimated tender value",
    ),
    max_value: float | None = Query(
        default=None,
        ge=0,
        description="Maximum estimated tender value",
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
        description="Number of results",
    ),
):
    """
    Search and filter tenders stored in MongoDB.
    """

    try:
        filters = {}

        # ----------------------------------------------------
        # Text search
        # ----------------------------------------------------

        if q:
            filters["$or"] = [
                {
                    "title": {
                        "$regex": q,
                        "$options": "i",
                    }
                },
                {
                    "reference_number": {
                        "$regex": q,
                        "$options": "i",
                    }
                },
            ]

        # ----------------------------------------------------
        # Location
        # ----------------------------------------------------

        if location:
            filters["location"] = {
                "$regex": location,
                "$options": "i",
            }

        # ----------------------------------------------------
        # Organisation
        # ----------------------------------------------------

        if organisation:
            filters["organisation_name"] = {
                "$regex": organisation,
                "$options": "i",
            }

        # ----------------------------------------------------
        # Category
        # ----------------------------------------------------

        if category:
            filters["category"] = {
                "$regex": category,
                "$options": "i",
            }

        # ----------------------------------------------------
        # Tender value
        # ----------------------------------------------------

        value_filter = {}

        if min_value is not None:
            value_filter["$gte"] = min_value

        if max_value is not None:
            value_filter["$lte"] = max_value

        if value_filter:
            filters["estimated_value"] = value_filter

        # ----------------------------------------------------
        # Query MongoDB
        # ----------------------------------------------------

        cursor = (
            db.tenders
            .find(filters)
            .sort("published_date", -1)
            .limit(limit)
        )

        tenders = []

        for tender in cursor:
            tender["_id"] = str(tender["_id"])
            tenders.append(tender)

        return {
            "count": len(tenders),
            "filters": {
                "q": q,
                "location": location,
                "organisation": organisation,
                "category": category,
                "min_value": min_value,
                "max_value": max_value,
            },
            "tenders": tenders,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Tender search failed: {str(error)}",
        )


# ============================================================
# GET ONE TENDER FROM MONGODB
# ============================================================

@router.get("/{tender_id}")
async def get_tender(tender_id: str):

    try:

        # ----------------------------------------------------
        # Validate MongoDB ObjectId
        # ----------------------------------------------------

        if not ObjectId.is_valid(tender_id):

            raise HTTPException(
                status_code=400,
                detail="Invalid tender ID",
            )

        # ----------------------------------------------------
        # Find tender
        # ----------------------------------------------------

        tender = db.tenders.find_one(
            {
                "_id": ObjectId(tender_id)
            }
        )

        if not tender:

            raise HTTPException(
                status_code=404,
                detail="Tender not found",
            )

        # ----------------------------------------------------
        # Convert ObjectId to string
        # ----------------------------------------------------

        tender["_id"] = str(tender["_id"])

        return tender

    except HTTPException:
        raise

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch tender: {str(error)}",
        )