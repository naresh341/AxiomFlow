# schemas.py
from pydantic import BaseModel
from typing import List, Dict, Optional


class OrganizationSchema(BaseModel):
    name: str
    domain: str
    logo_url: Optional[str] = "None"
    timezone: Optional[str] = "UTC"
    language: Optional[str] = "en"
    sso_enabled: Optional[bool] = True
    mfa_enabled: Optional[bool] = False
    session_timeout: Optional[int] = 60
    password_policy: Optional[str] = "standard"


class RoleSchema(BaseModel):
    name: str
    description: Optional[str]
    permissions: Dict[str, List[str]]
    # organization_id: int
    mfa_required: Optional[bool] = False
    ip_restricted: Optional[bool] = False
