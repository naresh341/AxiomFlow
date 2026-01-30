from app.model.task import Task
from app.repositories.base import BaseRepository


class TaskRepository(BaseRepository):
    def __init__(self, db):
        self.db = db

    def create(self, task: Task):
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def get_by_workflow(self, workflow_id: int):
        return self.db.query(Task).filter(Task.workflow_id == workflow_id).all()

    def update_status(self, task: Task, status: str):
        task.status = status
        self.db.commit()
        self.db.refresh(task)
        return task
