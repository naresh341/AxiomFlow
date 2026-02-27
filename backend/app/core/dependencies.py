from app.core.database import SessionLocal
from sqlalchemy.orm import Session
from typing import Generator


# This is also called as Dependency Injection
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
