from app.model.UserModel import User
from sqlalchemy.orm import Session, joinedload


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
        return (
            self.db.query(User)
            .options(joinedload(User.teams))
            .filter(User.id == user_id)
            .first()
        )
