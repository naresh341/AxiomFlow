import os

from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List
import json
from dotenv import load_dotenv

env_type = os.getenv("ENV", "dev")
env_file_to_load = ".env.production" if env_type == "prod" else ".env"

load_dotenv(env_file_to_load, override=True)


class Settings(BaseSettings):
    # ================================
    # App
    # ================================
    APP_NAME: str = "Enterprise Workflow Engine"
    # ENV: str = "dev"
    ENV: str = env_type
    DEBUG: bool = False if env_type == "prod" else True

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
        # env_file = ".env"
        env_file = env_file_to_load
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
