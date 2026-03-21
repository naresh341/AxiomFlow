from fastapi import APIRouter, UploadFile, File, Depends
from app.services.upload_service import upload_to_cloudinary
from app.core.security import get_current_user
from app.model.UserModel import User

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/logo")
async def upload_logo(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    org_id = current_user.organization_id

    result = await upload_to_cloudinary(file=file, org_id=org_id, asset_type="logos")

    return result
