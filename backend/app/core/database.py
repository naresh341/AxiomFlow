from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

connect_args = {}

if settings.ENV == "prod":
    # This forces SSL for Neon in production
    connect_args = {"sslmode": "require"}
else:
    # This ensures local dev doesn't fail by asking for SSL from your PC
    connect_args = {}

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args=connect_args,
    future=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)
