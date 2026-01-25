import React, { useState } from "react";
import {
  Layers,
  LayoutDashboard,
  ClipboardCheck,
  History,
  GitBranch,
  Settings,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  Grid,
} from "lucide-react";

const ApprovalHistory = () => {
  const [activeTab, setActiveTab] = useState("history");

  const historyData = [
    {
      id: "APP-89212",
      workflow: "Q3 Marketing Budget",
      step: "Finance Review",
      decision: "Approved",
      by: "Sarah Jenkins",
      date: "Oct 12, 2023 14:22",
      comments: "Verified allocations match guidelines.",
    },
    {
      id: "APP-89190",
      workflow: "Cloud Infra Upgrade",
      step: "CTO Approval",
      decision: "Rejected",
      by: "Marcus Chen",
      date: "Oct 11, 2023 09:45",
      comments: "Scope exceeds yearly technical debt allowance.",
    },
    {
      id: "APP-89155",
      workflow: "New Hire: UX Designer",
      step: "HR Validation",
      decision: "Delegated",
      by: "Elena Rodriguez",
      date: "Oct 10, 2023 16:10",
      comments: "Delegated to Recruiting Lead.",
    },
    {
      id: "APP-89101",
      workflow: "Legal Review: Vendor A",
      step: "General Counsel",
      decision: "Approved",
      by: "David Miller",
      date: "Oct 10, 2023 11:30",
      comments: "Standard terms applied.",
    },
    {
      id: "APP-89088",
      workflow: "Travel Request: AWS Reinvent",
      step: "Dept Manager",
      decision: "Approved",
      by: "Sarah Jenkins",
      date: "Oct 09, 2023 15:55",
      comments: "Early bird pricing confirmed.",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f6f8] dark:bg-[#101622] ">
      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        {/* Toolbar & Filters */}
        <div className="">
          <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[300px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20 outline-none"
                  placeholder="Search Approval ID, Workflow Name..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-2">
                <FilterButton icon={<Filter size={16} />} label="Status" />
                <FilterButton icon={<Grid size={16} />} label="Workflow" />
                <FilterButton
                  icon={<Calendar size={16} />}
                  label="Date Range"
                />
                <button className="text-[#135bec] text-xs font-black px-2 hover:underline">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Approval ID
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Workflow Name
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Step
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Decision
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Decision By
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Decision Date
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {historyData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-[#135bec] font-mono">
                        {row.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                        {row.workflow}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {row.step}
                      </td>
                      <td className="px-6 py-4">
                        <DecisionBadge type={row.decision} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-semibold">
                        {row.by}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 italic max-w-xs truncate">
                        {row.comments}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Showing{" "}
                <span className="text-gray-900 dark:text-white">1 - 5</span> of{" "}
                <span className="text-gray-900 dark:text-white">1,240</span>
              </div>
              <div className="flex items-center gap-1">
                <PageButton icon={<ChevronLeft size={16} />} disabled />
                <PageButton label="1" active />
                <PageButton label="2" />
                <PageButton label="3" />
                <span className="px-2 text-gray-300">...</span>
                <PageButton label="45" />
                <PageButton icon={<ChevronRight size={16} />} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Rows per page:
                </span>
                <select className="text-xs font-bold border-gray-200 dark:border-gray-800 rounded-lg py-1.5 pl-3 pr-8 bg-gray-50 dark:bg-gray-800 outline-none">
                  <option>10</option>
                  <option>20</option>
                  <option selected>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const FilterButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all">
    <span className="text-gray-400">{icon}</span>
    {label}
  </button>
);

const DecisionBadge = ({ type }) => {
  const styles = {
    Approved:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Delegated:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles[type]}`}
    >
      {type}
    </span>
  );
};

const PageButton = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
      active
        ? "bg-[#135bec] text-white"
        : disabled
          ? "text-gray-200 cursor-not-allowed"
          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {icon || label}
  </button>
);

export default ApprovalHistory;
