import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Plus,
  RefreshCcw,
  Search,
  TrendingUp,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const WorkflowExecution = () => {
  const navigate = useNavigate();
  const { workflowId } = useParams();

  const handleRowClick = (executionId) => {
    navigate(`${executionId}?workflowId=${workflowId}`);
  };

  const executions = [
    {
      id: "ex-8271-bf-01",
      source: "API Gateway",
      status: "Running",
      time: "2023-11-24 14:12:05",
      duration: "12s",
      failure: "—",
    },
    {
      id: "ex-8269-ac-92",
      source: "Schedule (Cron)",
      status: "Success",
      time: "2023-11-24 13:45:00",
      duration: "4m 12s",
      failure: "—",
    },
    {
      id: "ex-8265-cc-11",
      source: "Webhook",
      status: "Failed",
      time: "2023-11-24 12:30:11",
      duration: "22s",
      failure: "InventoryCheckNode",
    },
    {
      id: "ex-8260-xd-45",
      source: "Manual",
      status: "Success",
      time: "2023-11-24 11:15:00",
      duration: "1m 05s",
      failure: "—",
    },
    {
      id: "ex-8255-wa-22",
      source: "API Gateway",
      status: "Success",
      time: "2023-11-24 10:05:42",
      duration: "58s",
      failure: "—",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white font-display">
      <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
        <NavLink
          to="/workflows"
          className="hover:text-blue-600 transition-colors"
        >
          Workflows
        </NavLink>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white">{workflowId}</span>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white">Execution</span>
      </nav>
      <main className=" mx-auto p-8 flex flex-col gap-6">
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
              <FilterDropdown label="All Statuses" />
              <FilterDropdown
                label="Last 7 Days"
                icon={<Calendar size={14} />}
              />
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89]"
                  size={18}
                />
                <input
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f0f2f4] dark:bg-[#2d333d] border-none text-sm focus:ring-2 focus:ring-[#135bec]/50 outline-none placeholder-[#616f89]"
                  placeholder="Search Execution ID..."
                />
              </div>
              <button className="p-2.5 bg-[#f0f2f4] dark:bg-[#2d333d] text-[#111318] dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-[#384152] transition-colors">
                <RefreshCcw size={18} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8f9fa] dark:bg-[#252c38] text-[11px] font-bold text-[#616f89] uppercase tracking-widest border-b border-[#e5e7eb] dark:border-[#2d333d]">
                <tr>
                  <th className="px-6 py-4">Execution ID</th>
                  <th className="px-6 py-4">Trigger Source</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Started At</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Failure Step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#2d333d]">
                {executions.map((ex) => (
                  <tr
                    key={ex.id}
                    onClick={() => handleRowClick(ex.id)}
                    className="hover:bg-[#f6f6f8] dark:hover:bg-[#252c38] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-[#135bec] font-bold tracking-tight">
                      {ex.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#616f89] dark:text-[#a1aab9]">
                      {ex.source}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ex.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#616f89] dark:text-[#a1aab9]">
                      {ex.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#616f89] dark:text-[#a1aab9]">
                      {ex.duration}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${ex.status === "Failed" ? "text-red-500" : "text-[#616f89] dark:text-[#a1aab9]"}`}
                    >
                      {ex.failure}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#f8f9fa] dark:bg-[#252c38] border-t border-[#e5e7eb] dark:border-[#2d333d] flex items-center justify-between">
            <span className="text-sm text-[#616f89] dark:text-[#a1aab9] font-medium">
              Showing 1 to 5 of 2,482 executions
            </span>
            <div className="flex items-center gap-2">
              <PaginationBtn icon={<ChevronLeft size={18} />} disabled />
              <PaginationBtn label="1" active />
              <PaginationBtn label="2" />
              <PaginationBtn icon={<ChevronRight size={18} />} />
            </div>
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
