import cloudinary.uploader
import cloudinary
from app.core.config import settings
from fastapi.concurrency import run_in_threadpool


async def upload_to_cloudinary(file, org_id: int, asset_type: str = "logos"):
    # Safety Check: If the API key is missing, re-init from settings
    if not cloudinary.Config().api_key:
        cloudinary.config(cloudinary_url=settings.CLOUDINARY_URL, secure=True)

    def sync_upload():
        # Using the file.file (SPOOL) directly
        return cloudinary.uploader.upload(
            file.file,
            folder=f"Axiomflow/organizations/{org_id}/{asset_type}",
            public_id=f"{asset_type}_{org_id}",
            overwrite=True,
            resource_type="auto",
        )

    result = await run_in_threadpool(sync_upload)
    return {"url": result.get("secure_url"), "public_id": result.get("public_id")}
