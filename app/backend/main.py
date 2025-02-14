from fastapi import FastAPI
from routes import device, actions, ai_model  # ✅ Remove "app."

app = FastAPI()

app.include_router(device.router)
app.include_router(actions.router)
app.include_router(ai_model.router)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}
