import { ChevronDown, ChevronRight, Download, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const TaskDashboard = ({ data, workflowId, onRowClick }) => {
  const tasks = data[workflowId] || [];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "In Progress":
        return "bg-[#0f49bd]/10 text-[#0f49bd] dark:text-blue-400 border-[#0f49bd]/20";
      case "Failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-display text-[#111318] dark:text-white">
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
        <span className="text-slate-900 dark:text-white">TASK</span>
      </nav>
      <main className="mx-auto px-6 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">Tasks</h1>
            <p className="text-[#616f89] dark:text-[#9ca3af] text-sm">
              Execution-level task breakdown and status tracking
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              <button className="flex h-10 items-center gap-2 px-4 rounded-lg bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700 text-sm font-medium">
                Status: All <ChevronDown size={16} />
              </button>
              <button className="flex h-10 items-center gap-2 px-4 rounded-lg bg-white dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700 text-sm font-medium">
                Type: All <ChevronDown size={16} />
              </button>
            </div>
            <div className="relative h-10 min-w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                className="w-full h-full pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1f2937] text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none"
                placeholder="Search by task name/ID"
              />
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#1f2937] border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => onRowClick(task.id)}
                  className="hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white group-hover:text-[#0f49bd]">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {task.type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyles(task.status)}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium font-mono text-slate-700 dark:text-slate-300">
                    {task.duration}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight
                      size={18}
                      className="inline text-slate-400 group-hover:text-[#0f49bd]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-[#1f2937] border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500">
              Showing 1-{tasks.length} of 1,240 results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-slate-200 bg-white dark:bg-slate-800 text-xs font-bold">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-[#0f49bd] text-white text-xs font-bold">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
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

export default TaskDashboard;
