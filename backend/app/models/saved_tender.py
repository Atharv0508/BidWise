from pydantic import BaseModel


class SavedTenderCreate(BaseModel):
    tender_id: str