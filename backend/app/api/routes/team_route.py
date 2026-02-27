from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.team_service import TeamService
from app.core.dependencies import get_db
from app.schemas.TeamSchemas import TeamReadWithMembers
from typing import List

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.get("/fetchAll", response_model=List[TeamReadWithMembers])
def fetch_all_teams(db: Session = Depends(get_db)):
    service = TeamService(db)
    return service.get_all_teams()
