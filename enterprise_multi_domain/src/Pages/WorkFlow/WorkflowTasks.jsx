import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { get_Workflow_Tasks } from "../../RTKThunk/AsyncThunk";
import TaskDashboard from "./WorkFlowTaskDashboard";
import TaskSidebar from "./WorkFlowTaskSidebar";

const WorkflowTasks = () => {
  const { workflowId } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [first, setFirst] = useState(0);
  const rows = 10;
  const taskId = searchParams.get("task_key");
  // const tasks = workflowTasks[workflowId] || [];
  // const activeTask = tasks.find((t) => t.id === taskId);
  const { currentWorkflowTasks, loading } = useSelector(
    (state) => state.workflows,
  );
  // const { currentWorkflow } = useOutletContext();

  useEffect(() => {
    if (workflowId) {
      dispatch(get_Workflow_Tasks(workflowId));
    }
    console.log("First Task Data:", currentWorkflowTasks);
  }, [dispatch, workflowId]);

  const activeTask = currentWorkflowTasks.find(
    (t) => String(t.id) === taskId || String(t.task_key) === taskId,
  );
  if (loading)
    return (
      <div className="p-10 text-center font-bold">Fetching Blueprint...</div>
    );

  const handlePageChange = (page) => {
    setFirst((page - 1) * rows);
  };
  return (
    <div className="relative">
      <TaskDashboard
        data={currentWorkflowTasks}
        workflowId={workflowId}
        onRowClick={(item) => setSearchParams({ task_key: item.data.task_key })}
        handlePageChange={handlePageChange}
        first={first}
        rows={rows}
      />

      {activeTask && (
        <TaskSidebar task={activeTask} onClose={() => setSearchParams({})} />
      )}
    </div>
  );
};

export default WorkflowTasks;
