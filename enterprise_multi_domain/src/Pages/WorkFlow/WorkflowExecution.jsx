import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Plus,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
import { get_Workflow_Executions } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";

const WorkflowExecution = () => {
  const rows = 10;
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const dispatch = useDispatch();

  const handleRowClick = (executionId) => {
    const id = executionId.data.execution_id_str || " ";
    if (id) {
      navigate(`/workflows/${workflowId}/execution/${id}`);
    }
  };

  const menuStatus = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });
  const [first, setfirst] = useState(0);
  const { loading, currentWorkflowExecutions } = useSelector(
    (state) => state.workflows,
  );
  useEffect(() => {
    dispatch(get_Workflow_Executions(workflowId));
  }, [dispatch, workflowId]);

  const executionData = currentWorkflowExecutions || [];

  const onPageChange = (page) => {
    setfirst((page + 1) * rows);
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Running",
      command: () => setFilters((prev) => ({ ...prev, status: "RUNNING" })),
    },
    {
      label: "Success",
      command: () => setFilters((prev) => ({ ...prev, status: "SUCCESS" })),
    },
    {
      label: "Failed",
      command: () => setFilters((prev) => ({ ...prev, status: "FAILED" })),
    },
  ];

  const filteredData = executionData.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.execution_id_str?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    // 2. Priority Filter (Mapping numeric 1-10 to High/Medium/Low)
    const p = Number(item.priority);
    let itemPriorityBucket = "Low";
    if (p >= 8) itemPriorityBucket = "High";
    else if (p >= 5) itemPriorityBucket = "Medium";

    const matchesPriority =
      filters.priority === "All" || itemPriorityBucket === filters.priority;

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white font-display">
      <main className=" mx-auto p-8 flex flex-col gap-6">
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
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
            {workflowId}
          </NavLink>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-white">Execution</span>
        </nav>
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#111318] dark:text-white text-4xl font-black tracking-tight uppercase">
              Execution History
            </h1>
            <p className="text-[#616f89] dark:text-[#a1aab9] text-base">
              Track workflow runs, identify bottlenecks, and audit forensic
              logs.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white dark:bg-[#1a212c] border border-[#e5e7eb] dark:border-[#2d333d] text-[#111318] dark:text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
              <Download size={18} /> Export CSV
            </button>
            <button className="bg-[#135bec] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-[#0f49bd] transition-colors">
              <Plus size={18} /> New Execution
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Executions (24h)"
            value="12,482"
            sub="+12.5% from yesterday"
            trend="up"
            accent="primary"
          />
          <StatCard
            title="Success Rate"
            value="98.2%"
            trend="progress"
            accent="green"
          />
          <StatCard
            title="Avg. Duration"
            value="1m 14s"
            trend="stable"
            accent="orange"
          />
        </div>

        {/* Filters and Table Container */}
        <div className="bg-white dark:bg-[#1a212c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2d333d] overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-[#f0f2f4] dark:border-[#2d333d] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
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
              <FilterDropdown
                label="Last 7 Days"
                icon={<Calendar size={14} />}
              />

              {(filters.status !== "All" || filters.priority !== "All") && (
                <>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                  <button
                    onClick={() =>
                      setFilters({
                        status: "All",
                        priority: "All",
                      })
                    }
                    className="text-[#135bec] text-xs font-black uppercase tracking-tight hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-60 max-w-md">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89]"
                  size={18}
                />
                <input
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f0f2f4] dark:bg-[#2d333d] border border-gray-300 shadow-md text-sm focus:ring-2 focus:ring-[#135bec]/50 outline-none placeholder-[#616f89]"
                  placeholder="Search Execution ID... "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <>
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </>
            ) : (
              <>
                <DynamicTable
                  tableHead={TableSchemas.execution}
                  first={first}
                  rows={rows}
                  tableData={filteredData}
                  handleRowClick={handleRowClick}
                />
              </>
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#f8f9fa] dark:bg-[#252c38] border-t border-[#e5e7eb] dark:border-[#2d333d] flex items-center justify-center">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredData.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Refined Sub-components --- */

const StatCard = ({ title, value, sub, trend, accent }) => {
  const accentClasses = {
    primary: "border-l-[#135bec]",
    green: "border-l-green-500",
    orange: "border-l-orange-500",
  };

  return (
    <div
      className={`p-5 bg-white dark:bg-[#1a212c] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2d333d] border-l-4 ${accentClasses[accent]}`}
    >
      <p className="text-[11px] font-bold text-[#616f89] uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-4xl font-black tracking-tight">{value}</p>

      {trend === "up" && (
        <div className="mt-2 flex items-center text-xs text-green-600 font-bold gap-1">
          <TrendingUp size={14} /> {sub}
        </div>
      )}
      {trend === "progress" && (
        <div className="mt-3 h-1.5 w-full bg-[#f0f2f4] dark:bg-[#2d333d] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: value }}
          />
        </div>
      )}
      {trend === "stable" && (
        <div className="mt-2 flex items-center text-xs text-[#135bec] font-bold gap-1">
          <Clock size={14} /> Stable baseline
        </div>
      )}
    </div>
  );
};

const FilterDropdown = ({ label, icon }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f2f4] dark:bg-[#2d333d] text-[#111318] dark:text-white rounded-lg text-xs font-bold hover:bg-gray-200 dark:hover:bg-[#384152] transition-colors border border-transparent">
    {icon} {label} <ChevronDown size={14} className="opacity-50" />
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Running:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200",
    Success:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200",
    Failed:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}
    >
      {status === "Running" && (
        <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
      )}
      {status === "Success" && <CheckCircle size={12} />}
      {status === "Failed" && <AlertCircle size={12} />}
      {status}
    </span>
  );
};

const PaginationBtn = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`size-9 flex items-center justify-center rounded-lg text-xs font-bold transition-all border ${
      active
        ? "bg-[#135bec] text-white border-[#135bec]"
        : "bg-white dark:bg-[#1a212c] border-[#e5e7eb] dark:border-[#2d333d] text-[#616f89] hover:bg-gray-50 disabled:opacity-50"
    }`}
  >
    {label || icon}
  </button>
);

export default WorkflowExecution;
