from sqlalchemy.orm import Session
from app.model.task import Task


class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, workflow_id: int, name: str, task_type: str):
        task = Task(
            workflow_id=workflow_id,
            name=name,
            type=task_type,
            status="PENDING",
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def mark_task_completed(self, task_id: int):
        task = self.db.get(Task, task_id)
        if not task:
            raise ValueError("Task not found")

        task.status = "COMPLETED"
        self.db.commit()
        return task
