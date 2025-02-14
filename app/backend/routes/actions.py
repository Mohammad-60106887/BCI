
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Dummy storage for actions
actions_db = []

class ActionRequest(BaseModel):
    target: str
    action: str

@router.post("/assign_action")
def assign_action(request: ActionRequest):
    actions_db.append(request.dict())
    return {"message": f"Assigned {request.action} to {request.target}"}
