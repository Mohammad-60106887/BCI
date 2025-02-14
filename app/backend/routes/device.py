from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from neurosity import NeurositySDK  # ✅ Correct import

load_dotenv()
router = APIRouter()

# ✅ Neurosity API Credentials
DEVICE_ID = os.getenv("NEXT_PUBLIC_DEVICE_ID")
EMAIL = os.getenv("NEXT_PUBLIC_EMAIL")
PASSWORD = os.getenv("NEXT_PUBLIC_PASSWORD")

# ✅ Correct initialization with device_id
neurosity = NeurositySDK(options={"device_id": DEVICE_ID})

try:
    neurosity.login(email=EMAIL, password=PASSWORD)
except Exception as e:
    print(f"Neurosity connection failed: {e}")

@router.get("/device_status")
async def device_status():
    try:
        status = await neurosity.status()
        return JSONResponse(content=status)
    except:
        return JSONResponse(content={"error": "Device not found"}, status_code=404)
