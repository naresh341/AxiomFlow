from datetime import datetime, timedelta, timezone

from app.core.config import settings
from app.core.dependencies import get_db
from app.model.UserModel import User
from fastapi import Depends, HTTPException, status, Request
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import bcrypt

from app.GlobalException.GlobalExceptionError import AppException


async def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    try:
        token = request.cookies.get("access_token")

        if not token:
            raise AppException(
                401,
                "AUTH_TOKEN_MISSING",
                "Session expired. Please log in again.",
            )

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )

            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(status_code=401, detail="Invalid token payload")

        except JWTError:
            raise AppException(
                401,
                "AUTH_TOKEN_EXPIRED",
                "Session expired. Please log in again.",
            )

        user = db.query(User).filter(User.id == int(user_id)).first()

        if not user:
            raise AppException(
                401,
                "AUTH_USER_NOT_FOUND",
                "User no longer exists",
            )

        return user
    except AppException:
        raise

    except Exception as e:
        raise AppException(500, "AUTH_INTERNAL_ERROR", "Authentication failed", str(e))


def create_access_token(data: dict):
    try:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})

        return jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )
    except Exception as e:
        raise AppException(
            500, "TOKEN_CREATE_FAILED", "Failed to create access token", str(e)
        )


def create_refresh_token(data: dict):
    try:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(days=7)
        to_encode.update({"exp": expire})

        return jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )
    except Exception as e:
        raise AppException(
            500, "REFRESH_TOKEN_FAILED", "Failed to create refresh token", str(e)
        )


def decode_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        return payload
    except JWTError:
        raise AppException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code="AUTH_INVALID_TOKEN",
            message="Invalid or expired token",
        )
    except Exception as e:
        raise AppException(500, "TOKEN_DECODE_FAILED", "Token decoding failed", str(e))


def hash_password(password: str) -> str:
    try:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    except Exception as e:
        raise AppException(
            500, "PASSWORD_HASH_FAILED", "Password hashing failed", str(e)
        )


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception as e:
        raise AppException(
            500, "PASSWORD_VERIFY_FAILED", "Password verification failed", str(e)
        )
