# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user_routes

app = FastAPI()

# CORS for frontend on localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Allow ALL origins
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, PUT, DELETE etc.
    allow_headers=["*"],   # All headers
)

app.include_router(user_routes.router)
