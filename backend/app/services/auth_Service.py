from datetime import datetime, timedelta, timezone

import bcrypt
from app.auth.reset_token_utils import generate_reset_token, hash_token
from app.core.security import create_access_token, create_refresh_token
from app.model.PasswordResetTokenModel import PasswordResetToken
from app.model.UserModel import User, UserRole, UserStatus
from app.services.email_service import send_reset_email
from fastapi import BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.GlobalException.GlobalExceptionError import AppException

RESET_TOKEN_EXPIRY_MINUTES = 60


class AuthService:
    @staticmethod
    def login_user(data, db: Session):
        try:
            user = (
                db.query(User)
                .filter(
                    (User.username == data.username) | (User.email == data.username)
                )
                .first()
            )

            if not user:
                raise AppException(
                    401,
                    "AUTH_INVALID_CREDENTIALS",
                    "Invalid credentials",
                )

            if not user.password_hash:
                raise AppException(
                    400,
                    "AUTH_PASSWORD_NOT_SET",
                    "Password not set",
                )

            if not bcrypt.checkpw(
                data.password.encode("utf-8"), user.password_hash.encode("utf-8")
            ):
                raise AppException(
                    401,
                    "AUTH_INVALID_CREDENTIALS",
                    "Invalid credentials",
                )
            if user.status != UserStatus.ACTIVE:
                raise AppException(
                    403,
                    "AUTH_ACCOUNT_INACTIVE",
                    "Account is not active",
                )

            access_token = create_access_token(
                {
                    "sub": str(user.id),
                    "role": user.role,
                    "organization_id": user.organization_id,
                }
            )

            refresh_token = create_refresh_token(
                {
                    "sub": str(user.id),
                    "organization_id": user.organization_id,
                }
            )

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "id": user.id,
                    "name": f"{user.first_name} {user.last_name}",
                    "email": user.email,
                    "role": user.role,
                    "organization_id": user.organization_id,
                },
            }
        except AppException:
            raise
        except Exception as e:
            raise AppException(500, "LOGIN_FAILED", "Login failed", str(e))

    # --------------------------------------------

    @staticmethod
    def register_user(data, db: Session):

        # 1️⃣ Check duplicate user
        existing_user = (
            db.query(User)
            .filter((User.email == data.email) | (User.username == data.username))
            .first()
        )

        if existing_user:
            raise AppException(
                400,
                "USER_EXISTS",
                "User already exists",
            )

        # 2️⃣ Hash password
        hashed_password = bcrypt.hashpw(
            data.password.encode(), bcrypt.gensalt()
        ).decode()

        # 3️⃣ Create user
        new_user = User(
            username=data.username,
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            password_hash=hashed_password,
            # 🔐 Controlled fields
            role=UserRole.EMPLOYEE,
            status=UserStatus.ACTIVE,
            is_active=True,
            provider="local",
            created_at=datetime.now(timezone.utc),
            organization_id=data.organization_id,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"message": "User registered successfully", "user_id": new_user.id}

    # --------------------------------------------

    @staticmethod
    def refresh_access_token(refresh_token: str):
        from app.core.security import decode_token

        if not refresh_token:
            raise AppException(
                401,
                "AUTH_NO_REFRESH_TOKEN",
                "No refresh token",
            )

        payload = decode_token(refresh_token)
        user_id = payload.get("sub")

        if not user_id:
            raise AppException(
                401,
                "AUTH_INVALID_REFRESH_TOKEN",
                "Invalid refresh token",
            )

        new_access_token = create_access_token({"sub": str(user_id)})

        return {"access_token": new_access_token}

    # --------------------------------------------

    @staticmethod
    def logout_user():
        # No DB logic needed (stateless JWT)
        return {"message": "Logged out successfully"}


# ==============================================================================


def forgot_password(email: str, db: Session, background_tasks: BackgroundTasks):
    user = db.query(User).filter(User.email == email).first()

    # 🔒 Don't reveal if user exists
    if not user:
        return {"message": "If email exists, reset link sent"}

    # 🔥 generate token
    raw_token = generate_reset_token()
    token_hash = hash_token(raw_token)

    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=RESET_TOKEN_EXPIRY_MINUTES
    )

    # ❗ Invalidate previous tokens
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == user.id, PasswordResetToken.is_used == False
    ).update({"is_used": True})

    # ✅ create new token
    reset_token = PasswordResetToken(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at,
    )

    db.add(reset_token)
    db.commit()

    # 📩 Send email (for now print)
    reset_link = f"http://localhost:5173/reset-password?token={raw_token}"
    background_tasks.add_task(send_reset_email, user.email, reset_link)
    print("RESET LINK:", reset_link)

    return {"message": "If email exists, reset link sent"}


def reset_password(token: str, password: str, db: Session):

    token_hash = hash_token(token)

    reset_entry = (
        db.query(PasswordResetToken)
        .filter(PasswordResetToken.token_hash == token_hash)
        .first()
    )

    if not reset_entry:
        raise HTTPException(400, "Invalid token")

    if reset_entry.is_used:
        raise HTTPException(400, "Token already used")

    if reset_entry.expires_at < datetime.now(timezone.utc):
        raise HTTPException(400, "Token expired")

    user = db.query(User).filter(User.id == reset_entry.user_id).first()

    if not user:
        raise HTTPException(404, "User not found")

    # 🔐 hash new password
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    user.password_hash = hashed_password

    reset_entry.is_used = True

    db.commit()

    return {"message": "Password reset successful"}
