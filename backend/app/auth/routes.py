from app.core.dependencies import get_db
from app.services.auth_Service import AuthService
from fastapi import APIRouter, Cookie, Depends, Response, HTTPException
from sqlalchemy.orm import Session

from app.auth.schemas import (
    LoginRequest,
    LoginResponse,
    RegisterSchema,
    ResetPasswordRequest,
)
from app.services.auth_Service import forgot_password, reset_password
from fastapi import BackgroundTasks
from app.core.security import get_current_user
from app.model.UserModel import User

router = APIRouter(prefix="/auth", tags=["Auth"])


# ✅ LOGIN
@router.post("/login", response_model=LoginResponse)
def login(
    data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
):
    result = AuthService.login_user(data, db)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        # secure=False,   // False only for local Development. Set to True in production with HTTPS
        secure=True,
        # samesite="lax",
        samesite="none",
        max_age=15 * 60,
    )

    # Set refresh token cookie
    response.set_cookie(
        key="refresh_token",
        value=result["refresh_token"],
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
    )

    return {"user": result["user"]}


# ✅ REGISTER
@router.post("/register")
def register(
    data: RegisterSchema,
    db: Session = Depends(get_db),
):
    result = AuthService.register_user(data, db)
    return result


@router.post("/refresh")
def refresh_token(
    response: Response,
    refresh_token: str = Cookie(None),
):
    result = AuthService.refresh_access_token(refresh_token)

    response.set_cookie(
        key="access_token",
        value=result["access_token"],
        httponly=True,
        secure=False,  # ⚠️ True in production
        samesite="lax",
        max_age=15 * 60,
    )

    return {"message": "Token refreshed"}


# ✅ LOGOUT
@router.post("/logout")
def logout(response: Response):
    AuthService.logout_user()

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return {"message": "Logged out successfully"}


@router.post("/forgot-password")
def forgot_password_route(
    email: dict,
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = BackgroundTasks(),
):
    return forgot_password(email["email"], db, background_tasks)


@router.post("/reset-password")
def reset_password_route(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    return reset_password(data.token, data.password, db)


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": f"{current_user.first_name} {current_user.last_name}",
        "email": current_user.email,
        "organization_id": current_user.organization_id,
        "role": current_user.role,
    }
