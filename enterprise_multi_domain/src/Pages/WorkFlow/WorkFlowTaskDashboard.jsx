import {
  ChevronDown,
  ChevronRight,
  Download,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CreateTaskModal from "../../Components/CreateTaskModal";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
import { TableSchemas } from "../../Utils/TableSchemas";
import {
  addTasks,
  delete_Tasks,
  get_Workflow_Tasks,
  update_Tasks,
} from "../../RTKThunk/WorkflowThunk";

const WorkFlowTaskDashboard = ({
  data,
  workflowId,
  onRowClick,
  handlePageChange,
  first,
  rows,
  loading,
  totalRecords,
  search,
  setSearch,
  status,
  priority,
  filters,
  setFilters,
}) => {
  const menuStatus = useRef(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const menuPriority = useRef(null);

  const handleCreateTask = async (workflowId, payload) => {
    try {
      await dispatch(addTasks({ workflowId, payload })).unwrap();
      console.log("workflowId in dashboard:", workflowId);
      dispatch(get_Workflow_Tasks(workflowId));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEdit = (risk) => {
    setSelectedTask(risk);
    setIsModalOpen(true);
  };
  const handleDeleteTask = async (id) => {
    try {
      await dispatch(delete_Tasks(id)).unwrap();
      dispatch(get_Workflow_Tasks(workflowId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateTask = async (id, payload) => {
    try {
      await dispatch(update_Tasks({ id, payload })).unwrap();
      dispatch(get_Workflow_Tasks(workflowId));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "In Progress",
      command: () => setFilters((prev) => ({ ...prev, status: "IN_PROGRESS" })),
    },
    {
      label: "Pending",
      command: () => setFilters((prev) => ({ ...prev, status: "PENDING" })),
    },
    {
      label: "Completed",
      command: () => setFilters((prev) => ({ ...prev, status: "COMPLETED" })),
    },
    {
      label: "Failed",
      command: () => setFilters((prev) => ({ ...prev, status: "FAILED" })),
    },
    {
      label: "Skipped",
      command: () => setFilters((prev) => ({ ...prev, status: "SKIPPED" })),
    },
  ];

  const priorityItems = [
    {
      label: "All Priority",
      command: () => setFilters((f) => ({ ...f, priority: "All" })),
    },
    {
      label: "High (8-10)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-red-600 font-bold">
          <div className="size-2 rounded-full bg-red-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "High" })),
    },
    {
      label: "Medium (5-7)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-amber-600 font-bold">
          <div className="size-2 rounded-full bg-amber-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "Medium" })),
    },
    {
      label: "Low (1-4)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-emerald-600 font-bold">
          <div className="size-2 rounded-full bg-emerald-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "Low" })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-display text-[#111318] dark:text-white">
      <main className="mx-auto px-6 py-8">
        <nav className="flex items-center justify-between gap-2 mb-6 text-sm font-medium text-slate-500">
          <div className="w-full flex items-center gap-3">
            <NavLink
              to="/workflows"
              className="hover:text-blue-600 transition-colors"
            >
              Workflows
            </NavLink>
            <ChevronRight size={14} />
            <NavLink
              to={`/workflows/${workflowId}`}
              className="text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
            >
              {`${workflowId}`}
            </NavLink>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-white">TASK</span>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex  whitespace-nowrap items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              <Plus size={18} /> New Task
            </button>
          </div>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-1">Tasks</h1>
            <p className="text-[#616f89] dark:text-[#9ca3af] text-sm">
              Execution-level task breakdown and status tracking
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-3 py-3 flex-wrap items-center ">
              <Menu
                model={statusItems}
                popup
                ref={menuStatus}
                id="status_menu"
                className="cursor-pointer p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-gray-900 w-48"
                pt={{
                  list: { className: "flex flex-col gap-1" },
                  action: {
                    className:
                      "hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg transition-colors p-3",
                  },
                  label: {
                    className:
                      "text-sm font-bold text-gray-700 dark:text-gray-200",
                  },
                }}
              />

              {/* Status Filter Button */}
              <FilterButton
                label="Status"
                value={filters.status}
                isActive={filters.status !== "All"}
                icon={<ChevronDown size={14} />}
                onClick={(e) => menuStatus.current.toggle(e)}
              />
              <Menu
                model={priorityItems}
                popup
                ref={menuPriority}
                className="cursor-pointer p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-gray-900 w-48"
                pt={{
                  list: { className: "flex flex-col gap-1" },
                  action: {
                    className:
                      "hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg transition-colors p-3",
                  },
                  label: {
                    className:
                      "text-sm font-bold text-gray-700 dark:text-gray-200",
                  },
                }}
              />
              <FilterButton
                label="Priority"
                value={filters.priority}
                isActive={filters.priority !== "All"}
                icon={<ChevronDown size={14} />}
                onClick={(e) => menuPriority.current.toggle(e)}
              />

              {/* The Calendar Component */}
              {(filters.status !== "All" ||
                filters.priority !== "All" ||
                filters.dateRange) && (
                <>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                  <button
                    onClick={() =>
                      setFilters({
                        status: "All",
                        priority: "All",
                        dateRange: null,
                      })
                    }
                    className="text-[#135bec] text-xs font-black uppercase tracking-tight hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>
            <div className="relative h-10 min-w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                className="w-full h-full pl-10 pr-4 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1f2937] text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none shadow-md "
                type="text"
                placeholder="Search by TASK ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button className="h-10 px-4 bg-[#0f49bd] hover:bg-[#0f49bd]/90 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Tasks" value="1,240" trend="+12%" />
          <StatCard
            label="Completed"
            value="1,150"
            trend="+10%"
            color="border-l-emerald-500"
            text="text-emerald-500"
          />
          <StatCard
            label="In Progress"
            value="45"
            trend="-5%"
            color="border-l-[#0f49bd]"
            text="text-[#0f49bd]"
          />
          <StatCard
            label="Failed"
            value="45"
            trend="+2%"
            color="border-l-red-500"
            text="text-red-500"
          />
          <StatCard label="Avg Duration" value="1.2s" trend="0%" />
        </div>

        {/* Table Section */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101622] shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#137fec]"></div>
            </div>
          ) : (
            <DynamicTable
              tableData={data}
              tableHead={TableSchemas.task}
              handleRowClick={onRowClick}
              first={first}
              rows={rows}
              onEdit={handleEdit}
              onDelete={handleDeleteTask}
            />
          )}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800  dark:bg-gray-900 flex items-center justify-center bg-slate-50/30">
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={(e) => handlePageChange(e.page + 1)}
              />
            </div>
          </div>
        </div>
      </main>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        editData={selectedTask}
        workflowId={workflowId}
        onCreate={handleCreateTask}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

const StatCard = ({
  label,
  value,
  trend,
  color = "border-slate-200",
  text = "text-slate-900 dark:text-white",
}) => (
  <div
    className={`flex flex-col gap-2 rounded-xl p-5 border shadow-sm bg-white dark:bg-[#101622] dark:border-slate-700 border-l-4 ${color}`}
  >
    <p className="text-[#616f89] dark:text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <p className={`${text} text-2xl font-black`}>{value}</p>
      <span className="text-emerald-500 text-xs font-bold">{trend}</span>
    </div>
  </div>
);

export default WorkFlowTaskDashboard;
