import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Copy,
  History,
  Info,
  MoreVertical,
  Plus,
  RotateCcw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateVersionModal from "../../Components/CreateVersionModal";

const WorkflowVersions = () => {
  const [activeTab, setActiveTab] = useState("All Versions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { workflowId } = useParams();

  const handleRowClick = (versionId) => {
    navigate(`${versionId}?workflowId=${workflowId}`);
  };

  const versions = [
    {
      id: "v2.0.0",
      status: "Active",
      lineage: "Cloned from v1.2.0",
      lineageIcon: <Copy size={14} />,
      author: "Jane Doe",
      date: "Oct 24, 2023",
      summary:
        "Added conditional logic to the approval step and optimized API call frequency...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: "v2.1.0",
      status: "Draft",
      lineage: "New Workflow",
      lineageIcon: <Plus size={14} />,
      author: "John Smith",
      date: "Oct 26, 2023",
      summary: "Initial draft for the new Q4 customer onboarding flow...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "v1.0.0",
      status: "Archived",
      lineage: "Initial baseline",
      author: "Jane Doe",
      date: "Sep 12, 2023",
      summary: "Legacy version kept for compliance and audit requirements...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  ];

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <main className="mx-auto px-10 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <a className="hover:text-[#0f49bd]" href="#">
                Workflows
              </a>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-slate-300">
                Customer Onboarding API
              </span>
            </nav>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Workflow Versions
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl leading-relaxed">
              Track and manage changes, deployments, and lifecycle states for
              your automation workflows. Roll back to previous versions or
              create new drafts for testing.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors">
              <History size={18} className="mr-2" /> Audit Logs
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="pointer-cursor flex items-center justify-center rounded-lg h-10 px-5 bg-[#0f49bd] text-white text-sm font-bold hover:bg-[#0f49bd]/90 transition-all shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Create New Version
            </button>
          </div>
        </div>

        {/* Tabs Component */}
        <div className="mb-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
            {["All Versions", "Active", "Drafts", "Archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 pb-3 pt-2 px-1 border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-[#0f49bd] text-[#0f49bd]"
                    : "border-transparent text-white hover:text-[#0f49bd]"
                }`}
              >
                <span className="text-md font-bold tracking-tight">{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-[#0f49bd]/10" : "bg-slate-100 dark:bg-slate-800"}`}
                >
                  {tab === "All Versions" ? "12" : tab === "Active" ? "1" : "3"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table Component */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Source Lineage
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Change Summary
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {versions.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => handleRowClick(v.id)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer ${v.status === "Archived" ? "opacity-75" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-slate-900 dark:text-white font-bold text-sm">
                          {v.id}
                        </span>
                        <StatusBadge status={v.status} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        {v.lineageIcon} {v.lineage}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.avatar}
                          className="size-8 rounded-full border border-slate-200"
                          alt={v.author}
                        />
                        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                          {v.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {v.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 max-w-[300px]">
                        <p className="text-slate-500 dark:text-slate-400 text-sm truncate">
                          {v.summary}
                        </p>
                        <Info
                          size={14}
                          className="text-slate-300 cursor-help"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {v.status === "Draft" ? (
                        <div className="flex justify-end gap-2">
                          <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded hover:bg-slate-200 transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1.5 bg-[#0f49bd]/10 text-[#0f49bd] text-xs font-bold rounded hover:bg-[#0f49bd]/20 transition-colors">
                            Activate
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <ActionButton
                            icon={<Copy size={18} />}
                            title="Clone"
                          />
                          <ActionButton
                            icon={<Archive size={18} />}
                            title="Archive"
                          />
                          <ActionButton
                            icon={<MoreVertical size={18} />}
                            title="More"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50">
            <div className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                1
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                4
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                12
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 border rounded-lg hover:bg-white">
                <ChevronLeft size={16} />
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg bg-[#0f49bd] text-white font-bold text-sm shadow-sm">
                1
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-sm">
                2
              </button>
              <button className="p-2 border rounded-lg hover:bg-white">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Version Immutability"
            desc="Active versions are read-only. To make changes, clone the version into a new draft."
            primary
          />
          <InfoCard
            icon={<RotateCcw size={18} />}
            title="Auto-Archiving"
            desc="Versions older than 6 months without activity are automatically archived."
          />
          <InfoCard
            icon={<Workflow size={18} />}
            title="Collaborative Drafting"
            desc="Multiple users can edit a draft. Review audit logs to track field changes."
          />
        </div>
      </main>
      <CreateVersionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Active:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    Draft:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    Archived:
      "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase w-fit ${styles[status]}`}
    >
      {status === "Active" && (
        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {status}
    </span>
  );
};

const ActionButton = ({ icon, title }) => (
  <button
    title={title}
    className="p-2 text-slate-500 hover:text-[#0f49bd] hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
  >
    {icon}
  </button>
);

const InfoCard = ({ icon, title, desc, primary }) => (
  <div
    className={`p-5 rounded-xl border ${primary ? "bg-[#0f49bd]/5 border-[#0f49bd]/10" : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"}`}
  >
    <div
      className={`flex items-center gap-3 mb-3 ${primary ? "text-[#0f49bd]" : "text-slate-700 dark:text-slate-300"}`}
    >
      {icon} <h3 className="font-bold text-sm">{title}</h3>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default WorkflowVersions;
