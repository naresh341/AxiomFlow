import {
  Bolt,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  GitBranch,
  Info,
  Mail,
  Maximize2,
  TrendingUp,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

const WorkflowOverview = () => {
  // Access data passed from WorkflowDetailLayout via the Outlet
  const { currentWorkflow } = useOutletContext();

  const stats = [
    {
      label: "Total Runs",
      value: "1,240",
      trend: "+12.4%",
      trendType: "up",
      icon: <TrendingUp size={14} />,
    },
    {
      label: "Success Rate",
      value: "98.2%",
      trend: "Stable",
      trendType: "stable",
      icon: <CheckCircle2 size={14} />,
    },
    {
      label: "Avg. Time",
      value: "45.2s",
      trend: "+2.1s slower",
      trendType: "down",
      icon: <Clock size={14} />,
    },
    {
      label: "Last Run",
      value: "SUCCESS",
      trend: "5 mins ago",
      trendType: "neutral",
      icon: null,
    },
  ];

  const recentExecutions = [
    {
      id: "EXE-10294",
      source: "System Trigger",
      status: "Success",
      time: "Oct 24, 14:02:11",
      duration: "42s",
    },
    {
      id: "EXE-10293",
      source: "John Doe (Admin)",
      status: "Failed",
      time: "Oct 24, 13:45:02",
      duration: "12s",
    },
    {
      id: "EXE-10292",
      source: "System Trigger",
      status: "Success",
      time: "Oct 24, 12:30:45",
      duration: "51s",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* LEFT COLUMN: Main Dashboard Content */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black">{stat.value}</p>
              <div
                className={`flex items-center gap-1 text-[11px] font-bold mt-2 ${
                  stat.trendType === "up" || stat.trendType === "stable"
                    ? "text-emerald-600"
                    : stat.trendType === "down"
                      ? "text-red-500"
                      : "text-slate-500"
                }`}
              >
                {stat.icon}
                <span>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Diagram Preview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">
              Workflow Logic Preview
            </h3>
            <button className="text-blue-600 text-xs font-black flex items-center gap-1.5 hover:underline uppercase tracking-tighter">
              <Maximize2 size={14} />
              Open Canvas
            </button>
          </div>

          <div className="p-12 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
            <DiagramNode
              icon={<Bolt className="text-blue-600" />}
              label="Trigger"
              sub="User Created"
              primary
            />
            <Connector />
            <DiagramNode
              icon={<GitBranch className="text-amber-600" />}
              label="Condition"
              sub="Role == 'Admin'"
            />
            <Connector />
            <DiagramNode
              icon={<Mail className="text-indigo-600" />}
              label="Action"
              sub="Send Welcome Email"
            />
            <Connector />
            <div className="px-6 py-2 bg-slate-200 dark:bg-slate-700 rounded-full border border-slate-300 dark:border-slate-600">
              <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">
                End Pipeline
              </p>
            </div>
          </div>
        </div>

        {/* Recent Executions Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200">
              Recent Executions
            </h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">
              Full History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Execution ID</th>
                  <th className="px-6 py-4">Triggered By</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Start Time</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {recentExecutions.map((exe) => (
                  <tr
                    key={exe.id}
                    
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">
                      {exe.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {exe.source}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`flex items-center gap-2 text-[10px] font-black uppercase ${exe.status === "Success" ? "text-emerald-600" : "text-red-500"}`}
                      >
                        <span
                          className={`size-2 rounded-full ${exe.status === "Success" ? "bg-emerald-500" : "bg-red-500"}`}
                        ></span>
                        {exe.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {exe.time}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Contextual Metadata Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sticky top-24">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-6">
            <Info size={18} className="text-blue-600" />
            Metadata
          </h3>

          <div className="space-y-6">
            <MetaItem
              label="Created By"
              value={currentWorkflow.owner}
              avatar={currentWorkflow.owner
                .split(" ")
                .map((n) => n[0])
                .join("")}
              color="bg-blue-100 text-blue-700"
            />
            <MetaItem label="Created On" value="Jan 12, 2024 • 09:30 AM" />
            <MetaItem
              label="Last Modified"
              value={currentWorkflow.modified}
              avatar="SM"
              color="bg-amber-100 text-amber-700"
            />

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Version
              </label>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-xs font-bold border border-slate-200 dark:border-slate-700">
                  v2.4.1
                </span>
                <button className="text-blue-600 text-[10px] font-black uppercase hover:underline">
                  Changelog
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Onboarding", "Security", "HR-Core"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs font-bold uppercase">
              <Download size={14} />
              Export Definition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- INTERNAL SUB-COMPONENTS ---

const DiagramNode = ({ icon, label, sub, primary = false }) => (
  <div
    className={`w-64 p-4 bg-white dark:bg-slate-800 border-2 rounded-2xl shadow-sm flex items-center gap-4 transition-transform hover:scale-105 cursor-pointer ${primary ? "border-blue-600" : "border-slate-100 dark:border-slate-700"}`}
  >
    <div
      className={`p-2 rounded-lg ${primary ? "bg-blue-50 dark:bg-blue-900/30" : "bg-slate-50 dark:bg-slate-900"}`}
    >
      {icon}
    </div>
    <div>
      <p
        className={`text-[9px] uppercase font-black tracking-widest ${primary ? "text-blue-600" : "text-slate-400"}`}
      >
        {label}
      </p>
      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {sub}
      </p>
    </div>
  </div>
);

const Connector = () => (
  <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700 my-1"></div>
);

const MetaItem = ({ label, value, avatar, color }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
      {label}
    </label>
    <div className="flex items-center gap-2">
      {avatar && (
        <div
          className={`size-6 rounded-full flex items-center justify-center text-[10px] font-black ${color}`}
        >
          {avatar}
        </div>
      )}
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  </div>
);

export default WorkflowOverview;
