from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.auth.routes import router as auth_router     # this import is from app->auth->routes.py  then router as auth_router

app = FastAPI()
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")              #Defines the Route and it is a decorator
def health():              #Defines the Function and can be named anything eg:server ,status ,health etc                 
    return {"status":"OK"}

