from pydantic import BaseModel
from typing import List, Optional


class PasswordPolicy(BaseModel):
    min_length: int
    require_uppercase: bool
    require_numbers: bool
    require_symbols: bool
    expiry_days: int
    history_limit: int


class SessionPolicy(BaseModel):
    timeout_minutes: int


class NetworkPolicy(BaseModel):
    allowed_ips: List[str]


class SecurityPolicy(BaseModel):
    organization_id: str
    mfa_enabled: bool

    password_policy: PasswordPolicy
    session_policy: SessionPolicy
    network_policy: NetworkPolicy

    updated_by: Optional[str] = None

