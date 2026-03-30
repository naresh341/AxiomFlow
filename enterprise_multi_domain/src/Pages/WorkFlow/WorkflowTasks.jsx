import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import TaskDashboard from "./WorkFlowTaskDashboard";
import TaskSidebar from "./WorkFlowTaskSidebar";
import { get_Workflow_Tasks } from "../../RTKThunk/WorkflowThunk";

const WorkflowTasks = () => {
  const { workflowId } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const rows = 10;
  const taskId = searchParams.get("task_key");
  const { currentWorkflowTasks, loading, total } = useSelector(
    (state) => state.workflows,
  );

  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (workflowId) {
      dispatch(
        get_Workflow_Tasks({
          workflowId,
          page,
          limit: rows,
          status: filters.status === "All" ? null : filters.status,
          priority: filters.priority === "All" ? null : filters.priority,
          search: debouncedSearch,
        }),
      );
    }
  }, [
    dispatch,
    workflowId,
    page,
    filters.status,
    filters.priority,
    debouncedSearch,
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // delay

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status]);

  const activeTask = currentWorkflowTasks?.find(
    (t) => String(t.id) === taskId || String(t.task_key) === taskId,
  );
  if (loading)
    return (
      <div className="p-10 text-center font-bold">Fetching Blueprint...</div>
    );

  const handlePageChange = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className="relative">
      <TaskDashboard
        data={currentWorkflowTasks}
        workflowId={workflowId}
        onRowClick={(item) => setSearchParams({ task_key: item.data.task_key })}
        handlePageChange={handlePageChange}
        first={(page - 1) * rows}
        rows={rows}
        totalRecords={total}
        loading={loading}
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {activeTask && (
        <TaskSidebar task={activeTask} onClose={() => setSearchParams({})} />
      )}
    </div>
  );
};

export default WorkflowTasks;
