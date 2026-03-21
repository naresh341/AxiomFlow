from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.IntegrationService import IntegrationService
from app.schemas.IntegrationSchema import (
    IntegrationResponse,
    UserIntegrationCreate,
    UserIntegrationResponse,
)
from typing import List

router = APIRouter(prefix="/integrations", tags=["Integrations"])


@router.get("/fetchIntegration", response_model=List[IntegrationResponse])
def get_integrations(db: Session = Depends(get_db)):
    service = IntegrationService(db)
    return service.get_integrations()


@router.post("/connect", response_model=UserIntegrationResponse)
def connect_integration(payload: UserIntegrationCreate, db: Session = Depends(get_db)):
    service = IntegrationService(db)
    return service.connect_integration(payload.integration_id, payload.user_id)


@router.post("/disconnect/{integration_id}/{user_id}")
def disconnect_integration(
    integration_id: int, user_id: int, db: Session = Depends(get_db)
):
    service = IntegrationService(db)
    return service.disconnect_integration(integration_id, user_id)


@router.get("/user/{user_id}", response_model=List[UserIntegrationResponse])
def get_user_integrations(user_id: int, db: Session = Depends(get_db)):
    service = IntegrationService(db)
    return service.get_user_integrations(user_id)


