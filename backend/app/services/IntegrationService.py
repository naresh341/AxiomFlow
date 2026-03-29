from sqlalchemy.orm import Session
from app.model.IntegrationModel import Integration, UserIntegration, CustomIntegration
from fastapi import HTTPException
import uuid


class IntegrationService:
    def __init__(self, db: Session):
        self.db = db

    def get_integrations(self, user_id: int):
        system = self.db.query(Integration).all()

        custom = (
            self.db.query(CustomIntegration)
            .filter(CustomIntegration.user_id == user_id)
            .all()
        )

        system_data = [
            {
                "id": i.id,
                "name": i.name,
                "key": i.key,
                "category": i.category,
                "description": i.description,
                "source": "system",  # ✅ IMPORTANT
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
                "source": "custom",  # ✅ IMPORTANT
            }
            for c in custom
        ]

        return system_data + custom_data

    def get_connection(self, user_id, integration_id):
        return (
            self.db.query(UserIntegration)
            .filter_by(user_id=user_id, integration_id=integration_id)
            .first()
        )

    # def connect_integration(self, user_id, integration_id):
    #     existing = self.get_connection(user_id, integration_id)

    #     if existing:
    #         return existing

    #     connection = UserIntegration(
    #         user_id=user_id, integration_id=integration_id, status="connected"
    #     )

    #     try:
    #         self.db.add(connection)
    #         self.db.commit()
    #         self.db.refresh(connection)
    #         return connection
    #     except:
    #         self.db.rollback()
    #         raise

    def connect_integration(self, user_id, integration_id, source):

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
                custom_integration_id=integration_id if source == "custom" else None,
                source=source,
                status="connected",
            )
            self.db.add(record)

        self.db.commit()
        self.db.refresh(record)
        return record

    # def disconnect_integration(self, integration_id: int, user_id: int):
    #     connection = self.get_connection(user_id, integration_id)

    #     if connection:
    #         connection.status = "disconnected"
    #         self.db.commit()
    #         self.db.refresh(connection)

    #     if not connection:
    #         raise HTTPException(status_code=404, detail="Connection not found")

    #     return connection

    def disconnect(self, user_id, integration_id, source):

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
            raise HTTPException(status_code=404, detail="Not found")

        return record

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

    def save_configuration(self, user_id, integration_id, payload):

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
            raise HTTPException(status_code=404, detail="Integration not found")

        record.mappings = [m.dict() for m in payload.mappings]

        self.db.commit()
        self.db.refresh(record)

        return record
