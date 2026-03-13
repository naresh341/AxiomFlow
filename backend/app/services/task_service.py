from datetime import date, datetime, timezone
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.model.task import Task
from app.repositories.task_repo import TaskRepository
from app.model.workflow import Workflow


class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TaskRepository(db)

    def list_task(self, workflow_id: int = None, status: str = None):
        query = self.db.query(Task)

        if not status or status == "MyTasks" or status.strip() == "":
            return self.repo.get_task(workflow_id=workflow_id, status=None)

        if status == "OverDue":
            return query.filter(
                Task.due_at < datetime.now(timezone.utc), Task.status != "COMPLETED"
            ).all()

        if status == "DueToday":
            today = date.today()
            if workflow_id:
                query = query.filter(Task.workflow_id == workflow_id)
            return query.filter(func.date(Task.due_at) == today).all()

        return self.repo.get_task(workflow_id=workflow_id, status=status)

    def create_task(self, task_in):
        # 1. Convert Pydantic object to dict if necessary
        if hasattr(task_in, "model_dump"):
            task_data = task_in.model_dump()
        elif hasattr(task_in, "dict"):
            task_data = task_in.dict()
        else:
            task_data = task_in

        # 2. Handle Parent Workflow (Auto-create if missing)
        w_id = task_data.get("workflow_id")
        workflow = self.db.query(Workflow).filter(Workflow.id == w_id).first()

        if not workflow:
            # If the frontend sent an ID that doesn't exist, or no ID at all,
            # we create a placeholder workflow.
            new_workflow = Workflow(
                name=task_data.get("name", "Auto-Generated Workflow")
            )
            self.db.add(new_workflow)
            self.db.commit()
            self.db.refresh(new_workflow)
            w_id = new_workflow.id

        # 3. Key Generation & Priority (Moved OUTSIDE the 'if' block)
        total_tasks = self.db.query(Task).count()
        generated_key = f"TSK-{(total_tasks + 1):03d}"

        local_task_count = self.db.query(Task).filter(Task.workflow_id == w_id).count()
        priority_order = local_task_count + 1

        # 4. Task Creation
        new_task = Task(
            task_key=generated_key,
            name=task_data.get("name"),
            type=task_data.get("type"),
            workflow_id=w_id,
            workflow_version_id=task_data.get("workflow_version_id"),
            input_data=task_data.get("input_data"),
            status="PENDING",
            retry_count=0,
            priority=priority_order,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )

        return self.repo.create(new_task)

    def mark_task_completed(self, task_id: int):
        task = self.db.get(Task, task_id)
        if not task:
            raise ValueError(f"Task with ID {task_id} not found")

        task.status = "COMPLETED"
        task.completed_at = datetime.now(timezone.utc)
        task.updated_at = datetime.now(timezone.utc)

        return self.repo.update_status(task, "COMPLETED")

    def mark_task_failed(self, task_id: int, error_msg: str):
        task = self.db.get(Task, task_id)
        if not task:
            raise ValueError(f"Task with ID {task_id} not found")

        task.status = "FAILED"
        task.error_message = error_msg
        task.updated_at = datetime.now(timezone.utc)

        self.db.commit()
        self.db.refresh(task)
        return task
