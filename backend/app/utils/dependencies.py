from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId

from app.database.mongodb import db
from app.utils.security import decode_access_token


security = HTTPBearer()


async def get_current_vendor(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Get the currently authenticated vendor from the JWT token.
    """

    token = credentials.credentials

    try:
        vendor_id = decode_access_token(token)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    if not ObjectId.is_valid(vendor_id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid vendor ID",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    vendor = db.vendors.find_one(
        {
            "_id": ObjectId(vendor_id)
        }
    )

    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Vendor account not found",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    vendor["_id"] = str(vendor["_id"])

    return vendor