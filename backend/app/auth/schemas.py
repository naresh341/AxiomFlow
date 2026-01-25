from pydantic import BaseModel

class LoginRequest(BaseModel):
    username:str
    password:str

class User(BaseModel):
    name:str 
    
class LoginResponse(BaseModel):
    user:User
    token:str       