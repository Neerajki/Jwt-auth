# app/routes/user_routes.py
from fastapi import APIRouter, HTTPException, Depends, status
from app.models import UserCreate, UserLogin, Token
from app.utils.security import hash_password, verify_password, create_access_token
from app.database import user_collection
from bson.objectid import ObjectId
from app.auth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate):
    if await user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user.password)
    res = await user_collection.insert_one({"email": user.email, "password": hashed})
    return {"id": str(res.inserted_id), "email": user.email}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await user_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def read_current_user(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "email": current_user["email"]
    }
