from app.core.security import hash_password
from app.model.TeamModel import Team
from app.model.UserModel import User
from app.schemas.UserSchema import Status, UserCreate
from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.GlobalException.GlobalExceptionError import AppException


class UserOrganizationService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_users(
        self,
        page: int = 1,
        limit: int = 10,
        search: str = None,
        status: str = None,
    ):

        query = self.db.query(User).options(
            joinedload(User.teams), joinedload(User.led_teams)
        )

        if status and status.lower() != "all":
            query = query.filter(User.status == status.upper())

        if search:
            search_filters = [
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.username.ilike(f"%{search}%"),
            ]

            query = query.filter(or_(*search_filters))

        query = query.order_by(User.created_at.desc())

        total = query.count()
        offset = (page - 1) * limit

        users = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
            "data": users,
        }

    def get_user_by_id(self, user_id: int):
        user = (
            self.db.query(User)
            .options(joinedload(User.teams))
            .filter(User.id == user_id)
            .first()
        )
        if not user:
            raise AppException(
                404,
                "USER_NOT_FOUND",
                "User not found",
            )

        return user

    def create_user(self, payload: UserCreate):
        try:
            existing_user = (
                self.db.query(User).filter(User.email == payload.email).first()
            )
            if existing_user:
                raise AppException(
                    400,
                    "USER_ALREADY_EXISTS",
                    "User with this email already exists",
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
            self.db.flush()
            if payload.team_ids:
                teams = self.db.query(Team).filter(Team.id.in_(payload.team_ids)).all()
                if not teams:
                    raise AppException(
                        404,
                        "TEAM_NOT_FOUND",
                        "Provided team IDs are invalid",
                    )
                user.teams.extend(teams)

            self.db.commit()
            self.db.refresh(user)
            return user
        except AppException:
            self.db.rollback()
            raise

        except Exception as e:
            self.db.rollback()
            raise AppException(
                500,
                "USER_CREATE_FAILED",
                "Failed to create user",
                str(e),
            )

    def update_user(self, user_id: int, payload: dict):
        try:
            user = self.get_user_by_id(user_id)

            for key, value in payload.items():
                if hasattr(user, key) and key not in [
                    "teams",
                    "team_ids",
                    "password",
                    "email",
                    "id",
                ]:
                    setattr(user, key, value)

            if "teams" in payload:
                team_ids = payload.get("teams")

                if team_ids:
                    team_objects = (
                        self.db.query(Team).filter(Team.id.in_(team_ids)).all()
                    )
                    if not team_objects:
                        raise AppException(
                            404,
                            "TEAM_NOT_FOUND",
                            "Invalid team IDs provided",
                        )
                    user.teams = team_objects
                else:
                    user.teams = []

            self.db.commit()
            self.db.refresh(user)
            return user
        except AppException:
            self.db.rollback()
            raise

        except Exception as e:
            self.db.rollback()
            raise AppException(
                500,
                "USER_UPDATE_FAILED",
                "Failed to update user",
                str(e),
            )

    def delete_user(self, user_id: int):
        try:
            user = self.get_user_by_id(user_id)

            if not user.is_active:
                raise AppException(
                    400,
                    "USER_ALREADY_DEACTIVATED",
                    "User is already deactivated",
                )

            user.is_active = False

            self.db.commit()

            return {
                "success": True,
                "message": "User deactivated successfully",
            }

        except AppException:
            self.db.rollback()
            raise

        except Exception as e:
            self.db.rollback()
            raise AppException(
                500,
                "USER_DELETE_FAILED",
                "Failed to delete user",
                str(e),
            )
