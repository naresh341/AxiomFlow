import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import ExportAnalytics from "../Components/ExportAnalytics";
import CreateAnalyticsReport from "../Components/CreateAnalyticsReport";

const KPI_DATA = [
  {
    label: "Total Active Users",
    value: "12,840",
    change: "+5.2%",
    trend: "up",
    icon: "group",
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Completion Rate",
    value: "98.4%",
    change: "+1.1%",
    trend: "up",
    icon: "task_alt",
    color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600",
  },
  {
    label: "Avg. Approval Time",
    value: "4h 12m",
    change: "-8.4%",
    trend: "down",
    icon: "timer",
    color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600",
  },
  {
    label: "Active Processes",
    value: "1,205",
    change: "+3.5%",
    trend: "up",
    icon: "account_tree",
    color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600",
  },
];

const BOTTLE_NECKS = [
  {
    name: "Invoice Processing - EMEA",
    delay: "42.5m",
    impact: 70,
    status: "Warning",
    statusColor:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  },
  {
    name: "Customer Onboarding v4",
    delay: "12.1m",
    impact: 20,
    status: "Healthy",
    statusColor:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  },
  {
    name: "Employee Background Check",
    delay: "3h 45m",
    impact: 95,
    status: "Critical",
    statusColor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  },
];

const REPORTS = [
  {
    name: "Q4 Usage Summary",
    type: "PDF",
    schedule: "Weekly",
    owner: "Alex Rivera",
    avatar: "14",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20",
  },
  {
    name: "Departmental Efficiency",
    type: "CSV",
    schedule: "Monthly",
    owner: "Jordan Smith",
    avatar: "15",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    name: "Workflow Audit Log",
    type: "PDF",
    schedule: "Quarterly",
    owner: "Taylor Chen",
    avatar: "16",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20",
  },
  {
    name: "SaaS Cost Analysis",
    type: "CSV",
    schedule: "Monthly",
    owner: "Morgan Lee",
    avatar: "17",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
  },
];

const Analytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f6f7f8] dark:bg-[#101c22] font-sans">
      <main className=" mx-auto px-6 lg:px-10 py-8">
        {/* Header Section */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#111618] dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-tight">
              Analytics Overview
            </h1>
            <p className="text-[#617c89] dark:text-gray-400 text-base font-normal">
              Real-time performance insights across your organization.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 rounded-lg text-sm font-bold text-[#111618] dark:text-white hover:bg-gray-50 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">
                ios_share
              </span>
              Export Data
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#13a4ec] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#13a4ec]/20 hover:bg-[#13a4ec]/90 transition-all"
            >
              <Plus size={18} />
              Create Report
            </button>
          </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-0 z-40 mb-8 py-3 bg-[#f6f7f8]/80 dark:bg-[#101c22]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex h-10 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 px-4 hover:border-[#13a4ec] transition-colors shadow-sm">
              <Calendar size={16} className="text-[#13a4ec]" />
              <p className="text-[#111618] dark:text-white text-sm font-medium">
                Last 30 Days
              </p>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex h-10 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 px-4 hover:border-[#13a4ec] transition-colors shadow-sm">
              <p className="text-[#111618] dark:text-white text-sm font-medium">
                Team: Engineering
              </p>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <button className="text-[#13a4ec] text-sm font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {KPI_DATA.map((kpi, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-[#dbe2e6] dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <span className="material-symbols-outlined">{kpi.icon}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${kpi.trend === "up" ? "text-[#078836] bg-green-50 dark:bg-green-900/20" : "text-[#e73508] bg-red-50 dark:bg-red-900/20"}`}
                >
                  {kpi.change}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {kpi.label}
              </p>
              <p className="text-[#111618] dark:text-white text-2xl font-black">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Analytics Section */}
        <section className="mb-12">
          <h2 className="text-[#111618] dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#13a4ec] rounded-full"></span>
            Workflow Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Donut Chart Mockup */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-[#dbe2e6] dark:border-gray-700">
              <p className="text-sm font-bold mb-4">Success vs. Failure</p>
              <div className="relative h-48 w-full flex items-center justify-center">
                <div className="size-40 rounded-full border-[12px] border-[#13a4ec] border-r-red-500 border-b-[#13a4ec]/40 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-black dark:text-white">92%</p>
                    <p className="text-[10px] uppercase text-gray-500 font-bold">
                      Success
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xs font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-[#13a4ec] rounded-full"></span>{" "}
                  Completed
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-red-500 rounded-full"></span>{" "}
                  Failed
                </div>
              </div>
            </div>

            {/* Line Chart Mockup */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-[#dbe2e6] dark:border-gray-700 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-bold dark:text-white">
                  Execution Time Trend (ms)
                </p>
                <span className="text-[10px] px-2 py-0.5 bg-[#f6f7f8] dark:bg-gray-700 rounded font-bold dark:text-white">
                  AVG: 240ms
                </span>
              </div>
              <div className="flex-grow flex items-end gap-2 px-2 h-40">
                {[40, 45, 60, 55, 70, 65, 80, 95, 85, 75, 90, 100].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#13a4ec]/30 hover:bg-[#13a4ec] transition-colors rounded-t-sm"
                      style={{ height: `${h}%` }}
                    ></div>
                  ),
                )}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-medium px-1 uppercase tracking-widest">
                <span>Oct 01</span>
                <span>Oct 15</span>
                <span>Oct 30</span>
              </div>
            </div>
          </div>

          {/* Bottleneck Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#dbe2e6] dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#dbe2e6] dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-sm font-bold dark:text-white">
                Bottleneck Detection
              </h3>
              <button className="text-xs text-[#13a4ec] font-bold hover:underline">
                View detailed logs
              </button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f7f8]/50 dark:bg-gray-700/50 text-gray-500 uppercase text-[10px] font-black">
                <tr>
                  <th className="px-6 py-3">Workflow Name</th>
                  <th className="px-6 py-3">Average Delay</th>
                  <th className="px-6 py-3">Impact Score</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {BOTTLE_NECKS.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium dark:text-slate-200">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 dark:text-slate-400">
                      {row.delay}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.impact > 80 ? "bg-red-500" : row.impact > 50 ? "bg-orange-500" : "bg-green-500"}`}
                          style={{ width: `${row.impact}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-[#111618] dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#13a4ec] rounded-full"></span>
            Approval Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart: Delay by Role */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-[#dbe2e6] dark:border-gray-700">
              <p className="text-sm font-bold mb-6 dark:text-white">
                Average Delay by Role
              </p>
              <div className="space-y-4">
                {[
                  { role: "Team Lead", time: "1.5h", width: "30%" },
                  { role: "Dept. Manager", time: "4.2h", width: "65%" },
                  { role: "Director / VP", time: "8.9h", width: "95%" },
                  { role: "Finance Controller", time: "3.1h", width: "50%" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                      <span>{item.role}</span>
                      <span>{item.time}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#13a4ec] rounded-full transition-all duration-1000"
                        style={{ width: item.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capacity Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-[#dbe2e6] dark:border-gray-700">
              <p className="text-sm font-bold mb-4 dark:text-white">
                Volume vs Capacity
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-black text-[#13a4ec]">
                    1,402
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                      Total Pending
                    </p>
                    <p className="text-xs text-gray-500">
                      Currently awaiting action across 42 teams
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-black text-emerald-600">
                    94%
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                      Efficiency Score
                    </p>
                    <p className="text-xs text-gray-500">
                      Approval throughput vs last month
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-sm font-bold text-[#13a4ec] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  View Resource Allocation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Reports Management */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[#111618] dark:text-white text-xl font-bold flex items-center gap-2">
              <span className="w-1 h-6 bg-[#13a4ec] rounded-full"></span>
              Recent Reports
            </h2>
            <button className="text-[#13a4ec] text-sm font-bold hover:underline">
              View History
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe2e6] dark:border-gray-700 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f6f7f8]/50 dark:bg-gray-700/50 border-b border-[#dbe2e6] dark:border-gray-700 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {REPORTS.map((report, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-400">
                          <FileText size={18} />
                        </div>
                        <span className="text-sm font-bold text-[#111618] dark:text-white">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-black ${report.color}`}
                      >
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {report.schedule}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://i.pravatar.cc/150?u=${report.avatar}`}
                          className="size-7 rounded-full border-2 border-white dark:border-gray-600 shadow-sm"
                          alt=""
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {report.owner}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-[#13a4ec] hover:bg-blue-50 dark:hover:bg-gray-600 rounded-full transition-all">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State Footer (Optional) */}
            <div className="px-6 py-4 bg-[#f6f7f8]/30 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest">
                Showing {REPORTS.length} of 24 generated reports
              </p>
            </div>
          </div>
        </section>
      </main>

      <ExportAnalytics
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <CreateAnalyticsReport
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default Analytics;
