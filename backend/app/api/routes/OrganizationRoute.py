from app.core.dependencies import get_db
from app.core.security import get_current_user
from app.model.UserModel import User
from app.schemas.OrganizationSchema import (
    LogoUploadResponse,
    OrganizationRead,
    OrganizationUpdate,
)
from app.services.OrganizationService import OrganizationService
from app.services.upload_service import upload_to_cloudinary
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

router = APIRouter(prefix="/otp", tags=["OTP"])


@router.get("/organization", response_model=OrganizationRead)
async def get_org(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return OrganizationService.get_organization(db, current_user)


@router.put("/organization", response_model=OrganizationRead)
async def update_org(
    payload: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return OrganizationService.update_organization(db, current_user, payload)


@router.post("/organization/logo", response_model=LogoUploadResponse)
async def update_logo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    upload = await upload_to_cloudinary(file=file, org_id=current_user.organization_id)

    updated = OrganizationService.update_logo(db, current_user, upload["url"])

    return {"logo_url": upload["url"], "organization": updated}
