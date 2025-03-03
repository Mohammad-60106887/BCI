from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from neurosity import NeurositySDK
import asyncio
from typing import Dict

# Load environment variables
load_dotenv()


router = APIRouter(prefix="/api")

# Initialize Neurosity client with debug logging
print(f"Initializing Neurosity SDK with device ID: {os.getenv('DEVICE_ID')}")
neurosity = NeurositySDK({
    "device_id": os.getenv("DEVICE_ID"),
})

latest_status: Dict = {
    "state": "Initializing",
    "sleepMode": False,
    "charging": False,
    "battery": 0,
    "lastHeartbeat": "Never",
    "ssid": "Not connected",
}

async def connect_to_device():
    try:
        print("Attempting to connect to device...")
        await neurosity.login({
            "email": os.getenv("EMAIL"),
            "password": os.getenv("PASSWORD")
        })
        print("Login successful")
        
        # Attempt to select the device
        await neurosity.select_device(os.getenv("DEVICE_ID"))
        print(f"Selected device: {os.getenv('DEVICE_ID')}")
        
        return True
    except Exception as e:
        print(f"Connection error: {str(e)}")
        return False

def status_callback(status):
    global latest_status
    latest_status = status
    print(f"Device status updated: {status}")

@router.on_event("startup")
async def startup_event():
    connected = await connect_to_device()
    if connected:
        neurosity.status(callback=status_callback)
        print("Subscribed to status updates")
    else:
        print("Failed to connect to device")

@router.get("/device_status")
async def device_status():
    try:
        if latest_status["state"] == "Initializing":
            # Attempt to reconnect if we're still in initializing state
            connected = await connect_to_device()
            if not connected:
                raise HTTPException(status_code=503, detail="Device not connected")
        
        return JSONResponse(content=latest_status)
    except Exception as e:
        print(f"Error getting device status: {e}")
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=503
        )

@router.get("/credentials")
async def get_credentials():
    credentials = {
        "deviceId": os.getenv("DEVICE_ID"),
        "email": os.getenv("EMAIL"),
        "password": os.getenv("PASSWORD")
    }
    print(f"Credentials requested: {credentials['deviceId']}, {credentials['email']}")  # Debug log
    return JSONResponse(content=credentials)