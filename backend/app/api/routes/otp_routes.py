from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.OTPSchema import OTPRequest, OTPVerify
from app.services.OTPService import create_otp, verify_otp

from app.core.dependencies import get_db
from app.core.security import get_current_user


router = APIRouter(prefix="/otp", tags=["OTP"])


# -------------------------
# SEND OTP
# -------------------------
@router.post("/send")
def send_otp(
    data: OTPRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    result = create_otp(db, user, data.action_type)

    return {"status": "success", "data": result}


# -------------------------
# VERIFY OTP
# -------------------------
@router.post("/verify")
def verify_otp_route(
    data: OTPVerify,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    return {"verified": verify_otp(db, user.id, data.action_type, data.otp)}
