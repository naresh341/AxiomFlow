from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Enterprise Workflow Engine"
    ENV: str = "dev"
    DEBUG: bool = True

    # Server
    API_PREFIX: str = "/api"

    # Database
    DATABASE_URL: str | None = None

    # Security
    SECRET_KEY: str | None = None
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"

    # CORS
    ALLOWED_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    settings = Settings()

    # ✅ Explicit validation (clear error)
    if not settings.DATABASE_URL:
        raise RuntimeError("DATABASE_URL is not set")

    if not settings.SECRET_KEY:
        raise RuntimeError("SECRET_KEY is not set")

    return settings


settings = get_settings()
