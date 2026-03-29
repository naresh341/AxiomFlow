from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.IntegrationService import IntegrationService
from app.schemas.IntegrationSchema import (
    IntegrationResponse,
    UserIntegrationResponse,
    CustomIntegrationCreate,
    CustomIntegrationResponse,
    ConnectIntegrationRequest,
    MappingPayload
)
from typing import List
from app.model.UserModel import User
from app.core.security import get_current_user

router = APIRouter(prefix="/integrations", tags=["Integrations"])


@router.get("/fetchIntegration", response_model=List[IntegrationResponse])
def get_integrations(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)
    return service.get_integrations(user.id)


@router.post("/connect")
def connect_integration(
    payload: ConnectIntegrationRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)

    return service.connect_integration(
        user_id=user.id,
        integration_id=payload.integration_id,
        source=payload.source, 
    )


@router.post("/disconnect")
def disconnect_integration(
    payload: ConnectIntegrationRequest,  # reuse schema
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)

    return service.disconnect(
        user_id=user.id,
        integration_id=payload.integration_id,
        source=payload.source,  # ✅ CRITICAL
    )


@router.get("/user", response_model=list[UserIntegrationResponse])
def get_user_integrations(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)
    return service.get_user_integrations(user.id)


@router.post("/createIntegration", response_model=CustomIntegrationResponse)
def create_custom_integration(
    payload: CustomIntegrationCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)
    return service.create_integration(user.id, payload)

@router.post("/configure/{id}")
def save_configuration(
    id: int,
    payload: MappingPayload,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = IntegrationService(db)
    return service.save_configuration(user.id, id, payload)