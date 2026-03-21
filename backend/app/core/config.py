from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List
import json
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # ================================
    # App
    # ================================
    APP_NAME: str = "Enterprise Workflow Engine"
    ENV: str = "dev"
    DEBUG: bool = True

    # ================================
    # Email
    # ================================
    RESEND_API_KEY: str
    FROM_EMAIL: str

    # ================================
    # Server
    # ================================
    API_PREFIX: str = "/api"

    # ================================
    # Database
    # ================================
    DATABASE_URL: str | None = None

    # ================================
    # Security
    # ================================
    SECRET_KEY: str | None = None
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"
    CLOUDINARY_URL: str

    # ================================
    # CORS
    # ================================
    ALLOWED_ORIGINS: List[str] = []

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"

    # ✅ Ensure proper JSON parsing if needed
    @property
    def parsed_origins(self) -> List[str]:
        if isinstance(self.ALLOWED_ORIGINS, str):
            return json.loads(self.ALLOWED_ORIGINS)
        return self.ALLOWED_ORIGINS


@lru_cache
def get_settings() -> Settings:
    settings = Settings()

    if not settings.DATABASE_URL:
        raise RuntimeError("DATABASE_URL is not set")

    if not settings.SECRET_KEY:
        raise RuntimeError("SECRET_KEY is not set")

    return settings


settings = get_settings()
