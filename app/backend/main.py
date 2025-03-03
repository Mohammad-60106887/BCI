from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import device, actions, ai_model

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(device.router)
app.include_router(actions.router)
app.include_router(ai_model.router)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running"}
