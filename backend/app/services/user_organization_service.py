from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.model.UserModel import User
from app.model.TeamModel import Team
from app.schemas.UserSchema import UserCreate, Status
from app.core.security import hash_password


class UserOrganizationService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_users(self):
        return (
            self.db.query(User)
            .options(joinedload(User.teams), joinedload(User.led_teams))
            .order_by(User.created_at.desc())
            .all()
        )

    def get_user_by_id(self, user_id: int):
        user = (
            self.db.query(User)
            .options(joinedload(User.teams))
            .filter(User.id == user_id)
            .first()
        )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def create_user(self, payload: UserCreate):
        # 1. Check for duplicate email
        existing_user = self.db.query(User).filter(User.email == payload.email).first()
        if existing_user:
            raise HTTPException(
                status_code=400, detail="User with this email already exists"
            )

        # 2. Hash password and create object
        hashed_pw = hash_password(payload.password)
        user = User(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            password_hash=hashed_pw,
            role=payload.role,
            username=payload.email,
            is_active=payload.is_active,
            status=Status.ACTIVE,
        )
        self.db.add(user)
        self.db.flush()  # Use flush to get the ID without committing yet

        # 3. Assign Teams (Correctly placed BEFORE return)
        if payload.team_ids:
            teams = self.db.query(Team).filter(Team.id.in_(payload.team_ids)).all()
            user.teams.extend(teams)

        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user(self, user_id: int, payload: dict):
        user = self.get_user_by_id(user_id)

        # 1. Update basic fields
        # CRITICAL: We MUST skip "teams" here because it's a list of IDs
        for key, value in payload.items():
            if hasattr(user, key) and key not in [
                "teams",
                "team_ids",
                "password",
                "email",
                "id",
            ]:
                setattr(user, key, value)

        # 2. Handle the "teams" key from your payload
        # Your payload uses the key "teams" for the ID list
        if "teams" in payload:
            team_ids = payload.get("teams")  # This is [9]

            if team_ids:
                # Fetch actual Team objects from the DB
                team_objects = self.db.query(Team).filter(Team.id.in_(team_ids)).all()
                user.teams = team_objects
            else:
                user.teams = []

        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_user(self, user_id: int):
        user = self.get_user_by_id(user_id)

        user.is_active = False

        self.db.commit()
        return {"status": "success", "message": "User deactivated successfully"}
