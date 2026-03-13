from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.UserSchema import UserReadWithTeams, UserCreate
from app.services.user_organization_service import UserOrganizationService

router = APIRouter(prefix="/user-org", tags=["USER_ORGANIZATION"])


@router.get("/fetchAll", response_model=list[UserReadWithTeams])
def fetch_user_organization(db: Session = Depends(get_db)):
    service = UserOrganizationService(db)
    return service.get_all_users()


@router.post("/addUsers", response_model=UserReadWithTeams)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    service = UserOrganizationService(db)
    return service.create_user(payload)


@router.put("/updateUser/{user_id}", response_model=UserReadWithTeams)
def update_user(user_id: int, payload: dict, db: Session = Depends(get_db)):
    service = UserOrganizationService(db)
    return service.update_user(user_id, payload)


@router.delete("/deleteUser/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    service = UserOrganizationService(db)
    return service.delete_user(user_id)
