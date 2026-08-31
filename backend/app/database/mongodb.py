import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL is not set in the environment")

client = MongoClient(MONGODB_URL)
db = client[MONGODB_DATABASE]

db.saved_tenders.create_index(
    [
        ("vendor_id", 1),
        ("tender_id", 1),
    ],
    unique=True,
)