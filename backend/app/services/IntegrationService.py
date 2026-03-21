from sqlalchemy.orm import Session
from app.model.IntegrationModel import Integration, UserIntegration, IntegrationAction


class IntegrationService:
    def __init__(self, db: Session):
        self.db = db

    def get_integrations(self):
        return self.db.query(Integration).all()

    def connect_integration(self, integration_id: int, user_id: int):

        new_connection = UserIntegration(
            integration_id=integration_id, user_id=user_id, status="connected"
        )

        self.db.add(new_connection)
        self.db.commit()
        self.db.refresh(new_connection)

        return new_connection

    def disconnect_integration(self, integration_id: int, user_id: int):

        connection = (
            self.db.query(UserIntegration)
            .filter(
                UserIntegration.integration_id == integration_id,
                UserIntegration.user_id == user_id,
            )
            .first()
        )

        if connection:
            connection.status = "disconnected"
            self.db.commit()

        return connection

    def get_user_integrations(self, user_id: int):
        return (
            self.db.query(UserIntegration)
            .filter(UserIntegration.user_id == user_id)
            .all()
        )


def get_integrations_with_status(self, user_id: int):
    integrations = self.db.query(Integration).all()

    user_connections = (
        self.db.query(UserIntegration).filter(UserIntegration.user_id == user_id).all()
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
