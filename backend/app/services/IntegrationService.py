from sqlalchemy.orm import Session
from app.model.IntegrationModel import Integration, UserIntegration, CustomIntegration
import uuid

from app.GlobalException.GlobalExceptionError import AppException
from sqlalchemy import or_


class IntegrationService:
    def __init__(self, db: Session):
        self.db = db

    # def get_integrations(self, user_id: int):
    #     system = self.db.query(Integration).all()

    #     custom = (
    #         self.db.query(CustomIntegration)
    #         .filter(CustomIntegration.user_id == user_id)
    #         .all()
    #     )

    #     system_data = [
    #         {
    #             "id": i.id,
    #             "name": i.name,
    #             "key": i.key,
    #             "category": i.category,
    #             "description": i.description,
    #             "source": "system",
    #         }
    #         for i in system
    #     ]

    #     custom_data = [
    #         {
    #             "id": c.id,
    #             "name": c.name,
    #             "key": c.key,
    #             "category": "custom",
    #             "description": c.description,
    #             "source": "custom",  # ✅ IMPORTANT
    #         }
    #         for c in custom
    #     ]

    #     return system_data + custom_data

    from sqlalchemy import or_

    def get_integrations(self, user_id: int, search: str = None, category: str = None):
        try:
            system_query = self.db.query(Integration)
            custom_query = self.db.query(CustomIntegration).filter(
                CustomIntegration.user_id == user_id
            )

            if search:
                system_query = system_query.filter(
                    or_(
                        Integration.name.ilike(f"%{search}%"),
                        Integration.key.ilike(f"%{search}%"),
                    )
                )

                custom_query = custom_query.filter(
                    or_(
                        CustomIntegration.name.ilike(f"%{search}%"),
                        CustomIntegration.key.ilike(f"%{search}%"),
                    )
                )

            if category and category.lower() != "all":
                system_query = system_query.filter(Integration.category == category)

                if category == "custom":
                    custom_query = custom_query  # already custom
                else:
                    custom_query = custom_query.filter(False)  # skip custom

            system = system_query.all()
            custom = custom_query.all()

            system_data = [
                {
                    "id": i.id,
                    "name": i.name,
                    "key": i.key,
                    "category": i.category,
                    "description": i.description,
                    "source": "system",
                }
                for i in system
            ]

            custom_data = [
                {
                    "id": c.id,
                    "name": c.name,
                    "key": c.key,
                    "category": "custom",
                    "description": c.description,
                    "source": "custom",
                }
                for c in custom
            ]

            return system_data + custom_data

        except Exception as e:
            raise AppException(
                500, "INTEGRATION_FETCH_FAILED", "Failed to fetch integrations", str(e)
            )

    def get_connection(self, user_id, integration_id):
        return (
            self.db.query(UserIntegration)
            .filter_by(user_id=user_id, integration_id=integration_id)
            .first()
        )

    def connect_integration(self, user_id, integration_id, source):
        try:
            if source == "system":
                record = (
                    self.db.query(UserIntegration)
                    .filter_by(user_id=user_id, integration_id=integration_id)
                    .first()
                )
            else:
                record = (
                    self.db.query(UserIntegration)
                    .filter_by(user_id=user_id, custom_integration_id=integration_id)
                    .first()
                )

            if record:
                record.status = "connected"
            else:
                record = UserIntegration(
                    user_id=user_id,
                    integration_id=integration_id if source == "system" else None,
                    custom_integration_id=integration_id
                    if source == "custom"
                    else None,
                    source=source,
                    status="connected",
                )
                self.db.add(record)

            self.db.commit()
            self.db.refresh(record)
            return record
        except Exception as e:
            self.db.rollback()
            raise AppException(
                500, "INTEGRATION_DISCONNECT_FAILED", "Failed to disconnect", str(e)
            )

    def disconnect(self, user_id, integration_id, source):
        try:
            if source == "system":
                record = (
                    self.db.query(UserIntegration)
                    .filter_by(user_id=user_id, integration_id=integration_id)
                    .first()
                )
            else:
                record = (
                    self.db.query(UserIntegration)
                    .filter_by(user_id=user_id, custom_integration_id=integration_id)
                    .first()
                )

            if record:
                record.status = "disconnected"
                self.db.commit()
                self.db.refresh(record)
            else:
                raise AppException(
                    404, "INTEGRATION_NOT_FOUND", "Integration not found"
                )

            return record
        except Exception as e:
            self.db.rollback()
            raise AppException(
                500, "CONFIG_SAVE_FAILED", "Failed to save configuration", str(e)
            )

    def get_user_integrations(self, user_id: int):
        return (
            self.db.query(UserIntegration)
            .filter(UserIntegration.user_id == user_id)
            .all()
        )

    def get_integrations_with_status(self, user_id: int):
        integrations = self.db.query(Integration).all()

        user_connections = (
            self.db.query(UserIntegration)
            .filter(UserIntegration.user_id == user_id)
            .all()
        )

        connected_map = {conn.integration_id: conn.status for conn in user_connections}

        result = []

        for integration in integrations:
            result.append(
                {
                    "id": integration.id,
                    "name": integration.name,
                    "key": integration.key,
                    "category": integration.category,
                    "description": integration.description,
                    "connected": connected_map.get(integration.id) == "connected",
                }
            )

        return result

    def create_integration(self, user_id: int, payload):
        try:
            new_integration = CustomIntegration(
                name=payload.name,
                key=f"custom_{user_id}_{uuid.uuid4().hex[:6]}",
                category="custom",
                description=payload.description,
                type=payload.type,
                user_id=user_id,
                mappings=[m.model_dump() for m in payload.mappings]
                if payload.mappings
                else None,
            )

            self.db.add(new_integration)
            self.db.commit()
            self.db.refresh(new_integration)

            return new_integration
        except Exception as e:
            self.db.rollback()
            raise AppException(
                500,
                "CUSTOM_INTEGRATION_CREATE_FAILED",
                "Failed to create integration",
                str(e),
            )

    def save_configuration(self, user_id, integration_id, payload):
        try:
            record = (
                self.db.query(UserIntegration)
                .filter(
                    UserIntegration.user_id == user_id,
                    (
                        (UserIntegration.integration_id == integration_id)
                        | (UserIntegration.custom_integration_id == integration_id)
                    ),
                )
                .first()
            )

            if not record:
                raise AppException(
                    404, "INTEGRATION_NOT_FOUND", "Integration not found"
                )

            record.mappings = [m.dict() for m in payload.mappings]

            self.db.commit()
            self.db.refresh(record)

            return record
        except Exception as e:
            self.db.rollback()
            raise AppException(
                500,
                "CUSTOM_INTEGRATION_CREATE_FAILED",
                "Failed to create integration",
                str(e),
            )
