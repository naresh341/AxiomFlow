from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.team_service import TeamService
from app.core.dependencies import get_db
from app.schemas.TeamSchemas import TeamCreate, TeamRead
from app.core.security import get_current_user  # Assuming you have this

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.get(
    "/fetchAll",
)
def fetch_all_teams(
    db: Session = Depends(get_db),
    page: int = 1,
    limit: int = 10,
):
    service = TeamService(db)
    return service.get_all_teams(page=page, limit=limit)


@router.post("/createTeam", response_model=TeamRead)
def create_new_team(
    payload: TeamCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = TeamService(db)
    return service.create_team(payload, current_user.id, current_user)


@router.put("/updateTeam/{team_id}", response_model=TeamRead)
def update_existing_team(
    team_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    service = TeamService(db)
    return service.update_team(team_id, payload, current_user.id, current_user)


@router.delete("/deleteTeam/{team_id}")
def delete_Team(team_id: int, db: Session = Depends(get_db)):
    service = TeamService(db)
    return service.delete_team(team_id)
