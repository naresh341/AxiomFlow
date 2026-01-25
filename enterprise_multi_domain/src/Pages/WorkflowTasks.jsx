import { useParams, useSearchParams } from "react-router-dom";
import TaskDashboard from "./TaskDashboard";
import TaskSidebar from "./TaskSidebar";

const workflowTasks = {
  1: [
    {
      id: "TSK-101",
      name: "Verify Identity",
      status: "Completed",
      type: "Security",
      duration: "2.4s",
      logs: "User ID matched with database...",
    },
    {
      id: "TSK-102",
      name: "Assign Permissions",
      status: "In Progress",
      type: "System",
      duration: "1.1s",
      logs: "Fetching IAM roles...",
    },
  ],
  2: [
    {
      id: "TSK-201",
      name: "Log Analysis",
      status: "Failed",
      type: "Audit",
      duration: "15s",
      logs: "Error: Connection timed out at 443",
    },
  ],
  3: [
    {
      id: "TSK-301",
      name: "IP Blocking",
      status: "Completed",
      type: "Security",
      duration: "0.5s",
      logs: "Blacklisted 192.168.1.1",
    },
  ],
};

const WorkflowTasks = () => {
  const { workflowId } = useParams();

  const normalizedId = Number(workflowId);
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get("taskId");
  const tasks = workflowTasks[normalizedId] || [];
  const activeTask = tasks.find((t) => t.id === taskId);

  return (
    <div className="relative">
      <TaskDashboard
        data={workflowTasks}
        workflowId={workflowId}
        onRowClick={(id) => setSearchParams({ taskId: id })}
      />

      {activeTask && (
        <TaskSidebar task={activeTask} onClose={() => setSearchParams({})} />
      )}
    </div>
  );
};

export default WorkflowTasks;
