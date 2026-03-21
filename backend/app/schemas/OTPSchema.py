from pydantic import BaseModel


class OTPRequest(BaseModel):
    action_type: str


class OTPVerify(BaseModel):
    action_type: str
    otp: str
