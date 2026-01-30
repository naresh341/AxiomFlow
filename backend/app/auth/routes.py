from fastapi import APIRouter,HTTPException

from .schemas import LoginRequest, LoginResponse

router =APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/login",  response_model=LoginResponse)
def login(data:LoginRequest):
    if data.username=="admin" and data.password=="admin":
        return {
            "user":{"name":"Admin"},
            "token":"fake-jwt-token"
        }          
    raise HTTPException(status_code=401,detail="Invalid Credentials")   
    
    