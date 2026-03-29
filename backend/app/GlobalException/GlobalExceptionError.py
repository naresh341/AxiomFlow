from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError


class AppException(HTTPException):
    def __init__(self, status_code: int, code: str, message: str, details=None):
        self.code = code
        self.message = message
        self.details = details

        super().__init__(
            status_code=status_code,
            detail={
                "success": False,
                "error": {
                    "code": code,
                    "message": message,
                    "details": details,
                },
            },
        )


# ✅ HANDLERS (NO @app here)


async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid input data",
                "details": exc.errors(),
            },
        },
    )


async def integrity_exception_handler(request: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "error": {
                "code": "DB_INTEGRITY_ERROR",
                "message": "Database constraint error.",
                "details": str(exc.orig),
            },
        },
    )


async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Something went wrong. Please try again later.",
                "details": str(exc),
            },
        },
    )
