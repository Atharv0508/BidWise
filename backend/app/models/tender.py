from typing import Optional

from pydantic import BaseModel


class Tender(BaseModel):
    title: str

    organisation_name: Optional[str] = None

    published_date: Optional[str] = None

    bid_submission_closing_date: Optional[str] = None

    tender_opening_date: Optional[str] = None

    detail_url: Optional[str] = None

    reference_number: Optional[str] = None

    corrigendum: Optional[str] = None

    source: str = "CPPP"