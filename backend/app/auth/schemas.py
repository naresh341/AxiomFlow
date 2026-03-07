from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class User(BaseModel):
    name: str
    role: str


class LoginResponse(BaseModel):
    user: User
