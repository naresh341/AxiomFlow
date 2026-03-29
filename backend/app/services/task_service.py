from datetime import date, datetime, timezone

from app.GlobalException.GlobalExceptionError import AppException
from app.model.task import Task
from app.model.workflow import Workflow
from app.repositories.task_repo import TaskRepository
from sqlalchemy import func
from sqlalchemy.orm import Session


class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TaskRepository(db)

    def list_task(
        self,
        workflow_id: int = None,
        status: str = None,
        page=1,
        limit=10,
        search: str = None,
        priority: str = None,
    ):
        try:
            query = self.db.query(Task)

            if workflow_id:
                query = query.filter(Task.workflow_id == workflow_id)

            if status and status.strip() != "" and status != "MyTasks":
                if status == "OverDue":
                    query = query.filter(
                        Task.due_at < datetime.now(timezone.utc),
                        Task.status != "COMPLETED",
                    )

                elif status == "DueToday":
                    today = date.today()
                    query = query.filter(func.date(Task.due_at) == today)

                else:
                    query = query.filter(Task.status == status.upper())

            if search and search.strip() != "":
                search_term = f"%{search.lower()}%"
                query = query.filter(
                    func.lower(Task.task_key).like(search_term)
                    | func.lower(Task.name).like(search_term)
                )
            if priority and priority != "All":
                if priority == "High":
                    query = query.filter(Task.priority >= 8)
                elif priority == "Medium":
                    query = query.filter(Task.priority.between(5, 7))
                elif priority == "Low":
                    query = query.filter(Task.priority <= 4)

            query = query.order_by(Task.id.desc())

            total = query.count()
            offset = (page - 1) * limit
            data = query.offset(offset).limit(limit).all()

            return {
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": (total + limit - 1) // limit,
                "data": data,
            }
        except AppException:
            # ✅ Already structured → just rethrow
            raise

        except Exception as e:
            # 🔥 Convert ANY unknown error into AppException
            raise AppException(
                status_code=500,
                code="TASK_FETCH_FAILED",
                message="Failed to fetch tasks",
                details=str(e),
            )

    def create_task(self, task_in):
        try:
            if hasattr(task_in, "model_dump"):
                task_data = task_in.model_dump()
            elif hasattr(task_in, "dict"):
                task_data = task_in.dict()
            else:
                task_data = task_in

            w_id = task_data.get("workflow_id")
            workflow = self.db.query(Workflow).filter(Workflow.id == w_id).first()

            if not workflow:
                new_workflow = Workflow(
                    name=task_data.get("name", "Auto-Generated Workflow")
                )
                self.db.add(new_workflow)
                self.db.commit()
                self.db.refresh(new_workflow)
                w_id = new_workflow.id

            total_tasks = self.db.query(Task).count()
            generated_key = f"TSK-{(total_tasks + 1):03d}"

            local_task_count = (
                self.db.query(Task).filter(Task.workflow_id == w_id).count()
            )
            priority_order = local_task_count + 1

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
        except AppException:
            raise
        except Exception as e:
            raise AppException(
                status_code=500,
                code="TASK_CREATION_FAILED",
                message="Failed to create task",
                details=str(e),
            )

    def mark_task_completed(self, task_id: int):
        try:
            task = self.db.get(Task, task_id)
            if not task:
                raise AppException(
                    status_code=404,
                    code="TASK_NOT_FOUND",
                    message=f"Task with ID {task_id} not found",
                )
            task.status = "COMPLETED"
            task.completed_at = datetime.now(timezone.utc)
            task.updated_at = datetime.now(timezone.utc)

            return self.repo.update_status(task, "COMPLETED")
        except AppException:
            raise
        except Exception as e:
            raise AppException(
                status_code=500,
                code="TASK_COMPLETE_FAILED",
                message="Failed to mark task as completed",
                details=str(e),
            )

    def mark_task_failed(self, task_id: int, error_msg: str):
        try:
            task = self.db.get(Task, task_id)
            if not task:
                raise AppException(
                    status_code=404,
                    code="TASK_NOT_FOUND",
                    message=f"Task with ID {task_id} not found",
                )

            task.status = "FAILED"
            task.error_message = error_msg
            task.updated_at = datetime.now(timezone.utc)

            self.db.commit()
            self.db.refresh(task)
            return task
        except AppException:
            raise

        except Exception as e:
            raise AppException(
                status_code=500,
                code="TASK_FAIL_UPDATE_FAILED",
                message="Failed to mark task as failed",
                details=str(e),
            )

    def update_task(self, task_id: int, update_data):
        try:
            task = self.db.get(Task, task_id)

            if not task:
                raise AppException(
                    status_code=404,
                    code="TASK_NOT_FOUND",
                    message="Task not found",
                )

            if hasattr(update_data, "model_dump"):
                update_data = update_data.model_dump(exclude_unset=True)

            task.updated_at = datetime.now(timezone.utc)

            return self.repo.update(task, update_data)
        except AppException:
            raise

        except Exception as e:
            raise AppException(
                status_code=500,
                code="TASK_UPDATE_FAILED",
                message="Failed to update task",
                details=str(e),
            )

    def delete_task(self, task_id: int):
        try:
            task = self.db.get(Task, task_id)

            if not task:
                raise ValueError("Task not found")

            self.repo.delete(task)

            return {"message": "Task deleted successfully"}
        except AppException:
            raise

        except Exception as e:
            raise AppException(
                status_code=500,
                code="TASK_DELETE_FAILED",
                message="Failed to delete task",
                details=str(e),
            )
