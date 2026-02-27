from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.UserSchema import UserReadWithTeams

from app.services.user_organization_service import UserOrganizationService

router = APIRouter(prefix="/user-org", tags=["USER_ORGANIZATION"])


@router.get("/fetchAll", response_model=list[UserReadWithTeams])
def fetch_user_organization(db: Session = Depends(get_db)):
    service = UserOrganizationService(db)
    return service.get_all_users()
