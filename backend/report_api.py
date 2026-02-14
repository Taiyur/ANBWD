from fastapi import APIRouter, UploadFile, File, Form
from datetime import datetime
import os
import sqlite3

router = APIRouter()

UPLOAD_DIR = "reports"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    return sqlite3.connect("reports.db")

# Create table
conn = get_db()
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    latitude TEXT,
    longitude TEXT,
    address TEXT,
    status TEXT,
    created_at TEXT
)
""")
conn.commit()
conn.close()

@router.post("/report")
async def report_waste(
    file: UploadFile = File(...),
    latitude: str = Form(...),
    longitude: str = Form(...),
    address: str = Form(...)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO complaints (image, latitude, longitude, address, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        file_path,
        latitude,
        longitude,
        address,
        "Pending",
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))

    conn.commit()
    conn.close()

    return {"message": "Complaint submitted successfully"}
