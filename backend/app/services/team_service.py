from sqlalchemy.orm import Session, joinedload
from app.model.TeamModel import Team
from app.schemas.TeamSchemas import TeamCreate


class TeamService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_teams(self):
        return (
            self.db.query(Team)
            .options(joinedload(Team.users))
            .order_by(Team.created_at.desc())
            .all()
        )

    def create_team(self, team_in: TeamCreate):
        db_team = Team(
            name=team_in.name,
            description=team_in.description,
            is_active=team_in.is_active,
        )
        self.db.add(db_team)
        self.db.commit()
        self.db.refresh(db_team)
        return db_team
