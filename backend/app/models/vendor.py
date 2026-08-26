from pydantic import BaseModel, Field
from typing import List, Optional


class Material(BaseModel):
    name: str = Field(..., min_length=2)
    category: Optional[str] = None
    specifications: Optional[str] = None
    available_quantity: Optional[float] = None
    unit: Optional[str] = None


class VendorCreate(BaseModel):
    company_name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    materials: List[Material] = []