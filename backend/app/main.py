from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.model.workflow import Workflow
from app.model.task import Task
from app.model.approval import Approval
from app.model.execution import Execution
from app.model.WorkflowVersion import WorkflowVersion
from app.model.base import Base
from app.core.database import engine

Base.metadata.create_all(bind=engine)

from app.auth.routes import (
    router as auth_router,
)  # this import is from app->auth->routes.py  then router as auth_router


# from app.workflows.routes import router as workflow_router
from app.api.routes.workflow import router as workflow_router


app = FastAPI(
    title="Workflow Engine API",
)
# Login Router
app.include_router(auth_router)
# Workflow Router
app.include_router(workflow_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["System"])  # Defines the Route and it is a decorator
def health():  # Defines the Function and can be named anything eg:server ,status ,health etc
    return {"status": "OK"}
