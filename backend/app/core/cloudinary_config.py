import cloudinary
from app.core.config import settings


def init_cloudinary():
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_URL.split("@")[1],
        api_key=settings.CLOUDINARY_URL.split("//")[1].split(":")[0],
        api_secret=settings.CLOUDINARY_URL.split(":")[2].split("@")[0],
        secure=True,
    )
