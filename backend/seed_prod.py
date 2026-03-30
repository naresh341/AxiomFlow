import os
import bcrypt
from datetime import datetime, timezone
from dotenv import load_dotenv
from sqlalchemy import text

# 1. Force load the Neon Environment
load_dotenv(".env.production", override=True)

from app.core.database import SessionLocal, engine
from app.model.base import Base

# 2. 🔥 COPY THESE DIRECTLY FROM YOUR MAIN.PY
# This ensures every single table for AxionFlow is recognized
from app.model.approval import Approval
from app.model.AuditLogsModel import AuditLog
from app.model.complianceModel import (
    ComplianceControl,
    ComplianceEvidence,
    CompliancePolicy,
    ComplianceRisk,
    PolicyDocument,
)
from app.model.execution import Execution
from app.model.FeatureFlagModel import FeatureFlag
from app.model.GovernanceActionModel import GovernanceAction
from app.model.IntegrationModel import (
    CustomIntegration,
    Integration,
    IntegrationAction,
    UserIntegration,
)
from app.model.OTPModel import OTP
from app.model.PasswordResetTokenModel import PasswordResetToken
from app.model.Roles_And_OrganizationModel import Organization, Permission, Role
from app.model.SecurityModel import SecurityModel
from app.model.task import Task
from app.model.TeamMemberModel import TeamMember
from app.model.TeamModel import Team
from app.model.UserModel import User
from app.model.workflow import Workflow
from app.model.WorkflowVersion import WorkflowVersion
# (Make sure to also include the "Payment" model if it's in a separate file)


def seed_production_admin():
    print(f"📡 TARGET: {os.getenv('DATABASE_URL')}")

    # 3. Create ALL Tables
    print("🛠️ Creating all AxionFlow tables in Neon...")
    Base.metadata.create_all(bind=engine)
    print("✅ Schema synced!")

    db = SessionLocal()
    try:
        # 4. Create the mandatory Organization
        # Your User model has a ForeignKey to Organization, so we MUST create this first.
        print("🏢 Seeding default organization...")
        db.execute(
            text(
                "INSERT INTO organizations (name) VALUES ('AxionFlow Corp') ON CONFLICT DO NOTHING"
            )
        )
        db.commit()

        org_id = db.execute(text("SELECT id FROM organizations LIMIT 1")).fetchone()[0]

        # 5. Create the Admin User
        admin_email = "admin@axionflow.com"
        exists = db.query(User).filter(User.email == admin_email).first()

        if not exists:
            hashed = bcrypt.hashpw(
                "AxionAdmin2026!".encode("utf-8"), bcrypt.gensalt()
            ).decode("utf-8")
            new_admin = User(
                username="admin",
                email=admin_email,
                password_hash=hashed,
                first_name="Axion",
                last_name="Admin",
                role="ADMIN",  # Use your Enum or string based on your model
                status="ACTIVE",
                organization_id=org_id,
                is_active=True,
                provider="local",
            )
            db.add(new_admin)
            db.commit()
            print(f"🚀 SUCCESS: Admin created for AxionFlow!")
        else:
            print("⚠️ Admin already exists.")

    except Exception as e:
        print(f"❌ ERROR: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_production_admin()
