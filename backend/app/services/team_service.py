from app.model.TeamModel import Team
from app.model.UserModel import User  # Import at top or keep inside if circular
from app.schemas.TeamSchemas import TeamCreate
from sqlalchemy.orm import Session, joinedload

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

    def create_team(
        self, team_in: TeamCreate, admin_id: int, user_obj, user_ids: list[int] = None
    ):
        try:
            db_team = Team(
                name=team_in.name,
                description=team_in.description,
                is_active=team_in.is_active,
                status="ACTIVE",
            )

            if user_ids:
                users_to_add = self.db.query(User).filter(User.id.in_(user_ids)).all()
                db_team.users = users_to_add

            self.db.add(db_team)

            self.db.flush()

            self.audit.write_log(
                actor_id=admin_id,
                actor_type="ADMIN",
                user_obj=user_obj,
                action="CREATE",
                resource_type="team",
                resource_id=db_team.id,
                resource_path="/teams/create",
                description=f"Created team {db_team.name} with {len(db_team.users)} members",
                old_values={},
                new_values={
                    "name": db_team.name,
                    "description": db_team.description,
                    "is_active": db_team.is_active,
                    "member_count": len(db_team.users),
                },
                meta_data={
                    "ip": "192.168.1.1",
                    "location": "New York, NY",
                    "device": "Chrome",
                    "model": "PC",
                },
            )

            self.db.commit()

            return (
                self.db.query(Team)
                .options(joinedload(Team.users))
                .filter(Team.id == db_team.id)
                .first()
            )

        except Exception as e:
            self.db.rollback()
            raise e

    def update_team(self, team_id: int, payload: dict, admin_id: int, user_obj):
        try:
            db_team = self.db.query(Team).filter(Team.id == team_id).first()
            if not db_team:
                raise Exception("Team not found")

            # Capture old values for Audit Log
            old_values = {
                "name": db_team.name,
                "description": db_team.description,
                "status": db_team.status,
                "is_active": db_team.is_active,
            }

            # 1. Update basic fields
            for key, value in payload.items():
                if hasattr(db_team, key) and key not in ["id", "users", "user_ids"]:
                    # Handle string-to-bool conversion from frontend if necessary
                    if key == "is_active" and isinstance(value, str):
                        value = value.lower() == "true"
                    setattr(db_team, key, value)

            # 2. Handle Team Members (Many-to-Many)
            # Use 'user_ids' or 'users' based on what your frontend sends
            user_ids = payload.get("user_ids") or payload.get("users")
            if user_ids is not None:
                # Fetch actual User objects
                users_to_add = self.db.query(User).filter(User.id.in_(user_ids)).all()
                db_team.users = users_to_add

            self.db.flush()

            # 3. Write Audit Log
            self.audit.write_log(
                actor_id=admin_id,
                actor_type="ADMIN",
                user_obj=user_obj,
                action="UPDATE",
                resource_type="team",
                resource_id=db_team.id,
                resource_path=f"/teams/update/{team_id}",
                description=f"Updated team {db_team.name}",
                old_values=old_values,
                new_values=payload,
                meta_data={"ip": "192.168.1.1", "device": "Chrome"},
            )

            self.db.commit()
            self.db.refresh(db_team)
            return db_team

        except Exception as e:
            self.db.rollback()
            raise e

    def delete_team(self, team_id: int):
        team = self.db.query(Team).filter(Team.id == team_id).first()
        if not team:
            raise Exception("Team not found")

        deleted_id = team.id

        try:
            self.db.delete(team)
            self.db.commit()
            return deleted_id
        except Exception as e:
            self.db.rollback()
            raise e
