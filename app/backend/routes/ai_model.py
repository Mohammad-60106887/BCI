from fastapi import APIRouter

router = APIRouter()

@router.get("/predict")
def dummy_prediction():
    return {"prediction": "AI model response (Dummy for now)"}
