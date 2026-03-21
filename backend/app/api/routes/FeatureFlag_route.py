from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import get_current_user
from app.core.dependencies import get_db
from app.schemas.FeatureFlagSchema import (
    FeatureFlagCreate,
    FeatureFlagUpdate,
    FeatureFlagResponse,
)
from app.model.UserModel import User
from app.services import FeatureFlagService as service

router = APIRouter(prefix="/feature-flags", tags=["Feature Flags"])


@router.post("/createFeatureFlag", response_model=FeatureFlagResponse)
def create_flag(
    payload: FeatureFlagCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return service.create_flag(db, payload, user)


# GET ALL
@router.get("/fetchFeatureFlag", response_model=list[FeatureFlagResponse])
def get_flags(db: Session = Depends(get_db)):
    return service.get_all_flags(db)


@router.get("/{flag_id}", response_model=FeatureFlagResponse)
def get_flag(flag_id: int, db: Session = Depends(get_db)):
    flag = service.get_flag_by_id(db, flag_id)

    if not flag:
        raise HTTPException(status_code=404, detail="Flag not found")

    return flag


# TOGGLE
@router.patch("/{flag_id}/toggle", response_model=FeatureFlagResponse)
def toggle_flag(
    flag_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    flag = service.toggle_flag(db, flag_id, user)

    if not flag:
        raise HTTPException(status_code=404, detail="Flag not found")

    return flag


# UPDATE ROLLOUT
@router.patch("/{flag_id}/rollout")
def update_rollout(flag_id: int, percentage: int, db: Session = Depends(get_db)):
    flag = service.update_rollout(db, flag_id, percentage)

    if not flag:
        raise HTTPException(status_code=404, detail="Flag not found")

    return flag


# UPDATE
@router.patch("/updateFeatureFlag/{flag_id}", response_model=FeatureFlagResponse)
def update_flag(
    flag_id: int, payload: FeatureFlagUpdate, db: Session = Depends(get_db)
):
    flag = service.update_flag(db, flag_id, payload)

    if not flag:
        raise HTTPException(status_code=404, detail="Flag not found")

    return flag


# DELETE
@router.delete("/deleteFeatureFlag/{flag_id}")
def delete_flag(flag_id: int, db: Session = Depends(get_db)):
    success = service.delete_flag(db, flag_id)

    if not success:
        raise HTTPException(status_code=404, detail="Flag not found")

    return {"message": "Deleted successfully"}
