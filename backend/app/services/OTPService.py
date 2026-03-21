import hashlib
import random
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException

from app.model.OTPModel import OTP


# -------------------------
# GENERATE OTP
# -------------------------
def generate_otp():
    return str(random.randint(100000, 999999))


# -------------------------
# CREATE OTP (FRONTEND DISPLAY MODE)
# -------------------------
def create_otp(db, user, action_type: str):

    otp = generate_otp()
    otp_hash = hashlib.sha256(otp.encode()).hexdigest()

    record = OTP(
        user_id=user.id,
        action_type=action_type,
        otp_hash=otp_hash,
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=2),
        is_used=False,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    # 🔥 return OTP to frontend (DEV MODE ONLY)
    return {
        "message": "OTP generated successfully",
        "otp": otp,  # ⚠️ frontend will display this in modal
        "expires_in": 120,
    }


def verify_otp(db, user_id: int, action_type: str, otp: str):

    record = (
        db.query(OTP)
        .filter(
            OTP.user_id == user_id,
            OTP.action_type == action_type,
            OTP.is_used == False,
        )
        .order_by(OTP.created_at.desc())
        .first()
    )

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found")

    if record.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="OTP expired")

    if record.otp_hash != hashlib.sha256(otp.encode()).hexdigest():
        raise HTTPException(status_code=400, detail="Invalid OTP")

    record.is_used = True
    db.commit()

    return True
