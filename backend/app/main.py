import cloudinary
from app.api.routes.approvalroute import router as approvalRouter
from app.api.routes.auditLogsroute import router as auditLogs
from app.api.routes.compliance_routes import router as complianceRoute
from app.api.routes.FeatureFlag_route import router as flag
from app.api.routes.Roles_And_OrganizationRoutes import router as role_oraganization
from app.api.routes.Security_routes import router as security
from app.api.routes.taskroute import router as taskRouter
from app.api.routes.team_route import router as team
from app.api.routes.upload_routes import router as upload
from app.api.routes.user_organization_route import router as userOrg
from app.api.routes.workflow import router as workflow_router
from app.auth.routes import (
    router as auth_router,
)
from app.api.routes.otp_routes import router as otp
from app.api.routes.GovernanceAction_Routes import router as GovAction

# To create the table In the Postgres
# Base.metadata.create_all(bind=engine)
from app.core.cloudinary_config import init_cloudinary
from app.core.config import settings
from app.core.database import engine
from app.model.approval import Approval
from app.model.AuditLogsModel import AuditLog
from app.model.base import Base
from app.model.complianceModel import (
    ComplianceControl,
    ComplianceEvidence,
    CompliancePolicy,
    ComplianceRisk,
    PolicyDocument,
)
from app.model.execution import Execution
from app.model.FeatureFlagModel import FeatureFlag
from app.model.PasswordResetTokenModel import PasswordResetToken
from app.model.Roles_And_OrganizationModel import Organization, Permission, Role
from app.model.SecurityModel import SecurityModel
from app.model.task import Task
from app.model.TeamMemberModel import TeamMember
from app.model.TeamModel import Team
from app.model.UserModel import User
from app.model.workflow import Workflow
from app.model.WorkflowVersion import WorkflowVersion
from app.model.OTPModel import OTP
from app.model.GovernanceActionModel import GovernanceAction
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


async def lifespan(app: FastAPI):
    print("🔥 Starting application... creating tables")
    Base.metadata.create_all(bind=engine)
    init_cloudinary()
    yield
    print("🛑 Shutting down application")


print("Cloud URL:", settings.CLOUDINARY_URL)
app = FastAPI(title="Workflow Engine API", lifespan=lifespan)

#  Router
app.include_router(auth_router)
app.include_router(workflow_router)
app.include_router(taskRouter)
app.include_router(approvalRouter)
app.include_router(userOrg)
app.include_router(team)
app.include_router(auditLogs)
app.include_router(complianceRoute)
app.include_router(role_oraganization)
app.include_router(upload)
app.include_router(security)
app.include_router(flag)
app.include_router(otp)
app.include_router(GovAction)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)


@app.get("/health", tags=["System"])
def health():
    return {"status": "OK"}
