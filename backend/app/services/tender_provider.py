import os

import requests
from dotenv import load_dotenv


load_dotenv()

PARSE_API_KEY = os.getenv("PARSE_API_KEY")

PARSE_BASE_URL = (
    "https://api.parse.bot/scraper/"
    "0f97d39b-53f6-419f-8445-c782f9439d13"
)


def get_active_tenders(page: int = 0):
    if not PARSE_API_KEY:
        raise ValueError("PARSE_API_KEY is not set in the environment")

    response = requests.get(
        f"{PARSE_BASE_URL}/get_active_tenders",
        headers={
            "X-API-Key": PARSE_API_KEY
        },
        params={
            "page": page
        },
        timeout=30,
    )

    response.raise_for_status()

    return response.json()


def normalize_tender(tender: dict):
    return {
        "title": tender.get("title"),
        "reference_number": tender.get("title_refno_tender_id"),
        "organisation_name": tender.get("organisation_name"),
        "published_date": tender.get("e_published_date"),
        "bid_submission_closing_date": tender.get(
            "bid_submission_closing_date"
        ),
        "tender_opening_date": tender.get(
            "tender_opening_date"
        ),
        "detail_url": tender.get("detail_url"),
        "corrigendum": tender.get("corrigendum"),
        "source": "CPPP",
        "location": None,
        "estimated_value": None,
        "emd_amount": None,
        "category": None,
        "requirements": [],
        "documents": [],
    }


def get_tender_detail(url: str):
    """
    Fetch complete tender details using the tender's
    original CPPP detail URL.
    """

    if not PARSE_API_KEY:
        raise ValueError("PARSE_API_KEY is not set in the environment")

    if not url:
        raise ValueError("Tender detail URL is missing")

    response = requests.get(
        f"{PARSE_BASE_URL}/get_tender_detail",
        headers={
            "X-API-Key": PARSE_API_KEY
        },
        params={
            "url": url
        },
        timeout=60,
    )

    response.raise_for_status()

    return response.json()