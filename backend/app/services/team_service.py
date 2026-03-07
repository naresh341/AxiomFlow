from sqlalchemy.orm import Session, joinedload
from app.model.TeamModel import Team
from app.schemas.TeamSchemas import TeamCreate
from .auditLogsService import AuditService


class TeamService:
    def __init__(self, db: Session):
        self.db = db
        self.audit = AuditService(db)

    def get_all_teams(self):
        return (
            self.db.query(Team)
            .options(joinedload(Team.users))
            .order_by(Team.created_at.desc())
            .all()
        )

    # def create_team(self, team_in: TeamCreate):
    #     db_team = Team(
    #         name=team_in.name,
    #         description=team_in.description,
    #         is_active=team_in.is_active,
    #     )
    #     self.db.add(db_team)
    #     self.db.commit()
    #     self.db.refresh(db_team)
    #     return db_team

    def create_team(self, team_in, admin_id, user_obj):
        # 1. Do the actual work
        db_team = Team(name=team_in.name, description=team_in.description)
        self.db.add(db_team)
        self.db.commit()
        self.db.refresh(db_team)

        # 2. Tell the logbook what happened (Adding more detail)
        self.audit.write_log(
            actor_id=admin_id,
            actor_type="admin",
            user_obj=user_obj,  # Passing the actual user object
            action="create",
            resource_type="team",
            resource_path="/teams/create",
            description=f"Created team {db_team.name}",
            meta_data={
                "ip": "192.168.1.1",
                "location": "New York, NY",
                "device": "Chrome",
                "model": "PC",
            },
        )

        return db_team
