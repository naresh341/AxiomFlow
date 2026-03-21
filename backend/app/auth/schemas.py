from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# --------------------------------------------
# ✅ BASE USER (Reusable)
# --------------------------------------------
class UserBase(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: EmailStr


# --------------------------------------------
# ✅ REGISTER REQUEST
# --------------------------------------------
class RegisterSchema(UserBase):
    username: str = Field(..., min_length=3)
    first_name: str
    last_name: str
    email: EmailStr
    password: str = Field(..., min_length=6)


# --------------------------------------------
# ✅ LOGIN REQUEST
# --------------------------------------------
class LoginRequest(BaseModel):
    username: str = Field(..., description="Username or Email")
    password: str = Field(..., min_length=6)


# --------------------------------------------
# ✅ USER RESPONSE (Clean output)
# --------------------------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    organization_id: int

    class Config:
        from_attributes = True  # for SQLAlchemy compatibility


# --------------------------------------------
# ✅ LOGIN RESPONSE
# --------------------------------------------
class LoginResponse(BaseModel):
    user: UserResponse


# --------------------------------------------
# ✅ REGISTER RESPONSE
# --------------------------------------------
class RegisterResponse(BaseModel):
    message: str
    user_id: int


# --------------------------------------------
# ✅ TOKEN RESPONSE (Optional for APIs)
# --------------------------------------------
class TokenResponse(BaseModel):
    access_token: str


# --------------------------------------------
# ✅ GENERIC MESSAGE RESPONSE
# --------------------------------------------
class MessageResponse(BaseModel):
    message: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    password: str = Field(..., min_length=6)
