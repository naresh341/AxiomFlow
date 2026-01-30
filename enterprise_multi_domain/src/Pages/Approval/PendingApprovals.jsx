import {
  Calendar,
  CheckCircle,
  ChevronDown,
  History,
  MoreVertical,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ApprovalDecisionModal from "../../Components/ApprovalDecisionModal";
import RejectConfirmationModal from "../../Components/RejectConfirmationModal";

const PendingApprovals = () => {
  // Logic to track which row is clicked to show in the sidebar
  const [activeId, setActiveId] = useState("APP-9042");
  const [selectedIds, setSelectedIds] = useState(["APP-9042", "APP-8831"]);
  const { isDrawerOpen, setIsDrawerOpen } = useOutletContext();

  const [modalStep, setModalStep] = useState(null); // 'decision' | 'confirm-reject' | null
  const [rejectionData, setRejectionData] = useState(null);

  const handleRejectTrigger = (data) => {
    setRejectionData(data);
    setModalStep("confirm-reject");
  };

  const handleFinalSuccess = () => {
    setModalStep(null);
    setIsDrawerOpen(false);
    // Add toast or refresh logic here
    console.log("Workflow Updated Successfully");
  };
  const handleRowClick = (id) => {
    setActiveId(id);
    setIsDrawerOpen(true);
  };
  const approvals = [
    {
      id: "APP-9042",
      workflow: "Purchase Order",
      step: "Dept Head Review",
      requester: "John Smith",
      priority: "High",
      status: "Awaiting",
      date: "2023-11-25",
      amount: "$4,250.00",
    },
    {
      id: "APP-8831",
      workflow: "Expense Claim",
      step: "Finance Audit",
      requester: "Sarah Chen",
      priority: "Medium",
      status: "Escalated",
      date: "2023-11-24",
      amount: "$1,120.00",
    },
    {
      id: "APP-9105",
      workflow: "Access Request",
      step: "Security Review",
      requester: "Mike Ross",
      priority: "High",
      status: "Awaiting",
      date: "2023-11-26",
      amount: "N/A",
    },
    {
      id: "APP-9150",
      workflow: "Contract Renewal",
      step: "Legal Signing",
      requester: "Harvey Specter",
      priority: "Low",
      status: "Awaiting",
      date: "2023-11-28",
      amount: "$12,000.00",
    },
  ];

  return (
    <div className=" flex w-full h-[calc(100vh-160px)] overflow-hidden bg-[#f6f6f8] dark:bg-[#101622] animate-in fade-in duration-500">
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isDrawerOpen ? "mr-[420px]" : "mr-0"}`}
      >
        <div className="    flex gap-3 py-3 flex-wrap items-center mb-4">
          <FilterButton
            label="Status"
            value="Awaiting, Escalated"
            icon={<ChevronDown size={14} />}
          />
          <FilterButton
            label="Workflow"
            value="All"
            icon={<ChevronDown size={14} />}
          />
          <FilterButton
            label="Priority"
            value="All"
            icon={<ChevronDown size={14} />}
          />
          <FilterButton
            label="Date Range"
            value="Last 30 Days"
            icon={<Calendar size={14} />}
          />
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
          <button className="text-[#135bec] text-xs font-bold hover:underline">
            Clear All
          </button>
        </div>

        {/* Table Container - Scrollable */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 border border-[#dbdfe6] dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          {/* Bulk Action Bar */}
          <div className="bg-[#135bec]/5 border-b border-[#dbdfe6] dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked
                className="rounded border-gray-300 text-[#135bec] size-4"
                readOnly
              />
              <span className="text-sm font-bold text-[#135bec]">
                {selectedIds.length} items selected
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setModalStep("decision")}
                className="bg-[#135bec] text-white px-5 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                Approve Selected
              </button>
              <button
                onClick={() => setModalStep("decision")}
                className="bg-white dark:bg-gray-800 text-red-600 border border-red-200 px-5 py-2 rounded-lg text-xs font-bold hover:bg-red-50"
              >
                Reject Selected
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800/90 backdrop-blur-sm">
                <tr>
                  <th className="p-4 w-12 pl-6"></th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest">
                    Approval ID
                  </th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest">
                    Workflow & Step
                  </th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest">
                    Requested By
                  </th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest text-center">
                    Priority
                  </th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest">
                    Status
                  </th>
                  <th className="p-4 text-[11px] font-black text-[#616f89] uppercase tracking-widest text-right pr-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {approvals.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                    className={`${activeId === row.id ? "bg-[#135bec]/5" : ""} hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group`}
                  >
                    <td
                      className="p-4 pl-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(row.id)}
                        className="rounded border-gray-300 text-[#135bec]"
                        readOnly
                      />
                    </td>
                    <td
                      className={`p-4 text-sm font-bold font-mono ${activeId === row.id ? "text-[#135bec]" : "text-[#111318] dark:text-white"}`}
                    >
                      {row.id}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold">{row.workflow}</div>
                      <div className="text-xs text-[#616f89]">{row.step}</div>
                    </td>
                    <td className="p-4 text-sm font-medium">{row.requester}</td>
                    <td className="p-4 text-center">
                      <PriorityBadge level={row.priority} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-2 rounded-full ${row.status === "Escalated" ? "bg-red-500 animate-pulse" : "bg-blue-500"}`}
                        ></div>
                        <span
                          className={`text-sm font-bold ${row.status === "Escalated" ? "text-red-600" : "text-gray-600 dark:text-gray-300"}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button className="text-gray-400 group-hover:text-[#135bec] transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Detail Drawer (Fixed Width, Full Height) --- */}
      <aside
        className={`fixed right-0 top-16 bottom-0 h-[calc(100vh-64px)] w-105 bg-white dark:bg-gray-900 border-l border-[#dbdfe6] dark:border-gray-800 flex flex-col shadow-2xl z-90 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* --- FIXED HEADER --- */}
        <div className="p-6 border-b border-[#dbdfe6] dark:border-gray-800 flex justify-between items-start shrink-0 bg-white dark:bg-gray-900">
          <div className="flex flex-col gap-1">
            <span className="text-[#135bec] text-[10px] font-black uppercase tracking-[0.2em] font-mono">
              {activeId || "REQ-001"}
            </span>
            <h3 className="text-xl font-black text-[#111318] dark:text-white tracking-tight leading-tight">
              Review Purchase Order
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Approval Summary */}
          <section className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Approval Summary
            </h4>
            <div className="bg-[#f6f6f8] dark:bg-gray-800/50 p-5 rounded-xl space-y-4 border border-gray-100 dark:border-gray-800">
              <SummaryRow label="Request Type" value="Hardware Procurement" />
              <SummaryRow label="Amount" value="$4,250.00" highlight />
              <SummaryRow label="Project Code" value="PRJ-2023-ALPHA" isMono />
            </div>
          </section>

          {/* Request Context */}
          <section className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">
              Request Context
            </h4>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec] font-black text-sm border border-[#135bec]/20">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 dark:text-white">
                  John Smith
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  Submitted on Nov 20, 2023 • 10:45 AM
                </span>
              </div>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-[3px] border-[#135bec]/30 pl-4 py-1">
                "Requesting 3x MacBook Air M2 for the new engineering interns
                starting next month. Budget already approved in Q4 projections."
              </p>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
              <History size={14} /> Activity Timeline
            </h4>
            <div className="relative space-y-8 pl-4 border-l-2 border-gray-100 dark:border-gray-800 ml-2 py-1">
              <TimelineItem
                title="Request Submitted"
                time="Nov 20, 2023 • John Smith"
                dotColor="bg-green-500"
              />
              <TimelineItem
                title="Policy Validation Passed"
                time="Nov 20, 2023 • System Action"
                dotColor="bg-green-500"
              />
              <TimelineItem
                title="Pending Dept Head Review"
                time="Nov 21, 2023 • Assigned to You"
                dotColor="bg-[#135bec]"
                isActive
              />
            </div>
          </section>

          {/* Decision Notes Area */}
          <section className="space-y-4 pt-4">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Decision Notes
              </label>
              <textarea
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] text-sm p-4 outline-none border transition-all resize-none text-gray-900 dark:text-white"
                placeholder="Optional comments for the requester..."
                rows="3"
              ></textarea>
            </div>
          </section>
        </div>

        {/* --- TRULY STICKY FOOTER --- */}
        <div className="p-6 bg-white dark:bg-gray-900 border-t border-[#dbdfe6] dark:border-gray-800 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setModalStep("decision")}
              className="bg-[#135bec] text-white h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <CheckCircle size={18} /> Approve
            </button>
            <button
              onClick={() => setModalStep("decision")}
              className="bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition-all"
            >
              <XCircle size={18} /> Reject
            </button>
          </div>
        </div>
      </aside>

      <ApprovalDecisionModal
        isOpen={modalStep === "decision"}
        activeId={activeId}
        onClose={() => setModalStep(null)}
        onRejectTrigger={handleRejectTrigger}
      />

      {/* MODAL 2: CONFIRMATION */}
      <RejectConfirmationModal
        isOpen={modalStep === "confirm-reject"}
        data={rejectionData}
        onClose={() => setModalStep("decision")} // Go back to decision modal
        onConfirm={handleFinalSuccess}
      />
    </div>
  );
};

// --- Sub-Components for Clean Code ---

const SummaryRow = ({ label, value, highlight, isMono }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500 font-medium">{label}</span>
    <span
      className={`${highlight ? "text-lg font-black text-[#111318] dark:text-white" : "font-bold"} ${isMono ? "font-mono text-xs" : ""}`}
    >
      {value}
    </span>
  </div>
);

const TimelineItem = ({ title, time, dotColor, isActive }) => (
  <div className="relative">
    <div
      className={`absolute -left-[25px] top-1 size-4 rounded-full ${dotColor} border-4 border-white dark:border-gray-900 shadow-sm transition-transform ${isActive ? "scale-125" : ""}`}
    ></div>
    <div className="flex flex-col gap-0.5">
      <span
        className={`text-sm ${isActive ? "font-black text-[#135bec]" : "font-bold text-gray-700 dark:text-gray-300"}`}
      >
        {title}
      </span>
      <span className="text-[11px] text-gray-400 font-medium">{time}</span>
    </div>
  </div>
);

const PriorityBadge = ({ level }) => {
  const styles = {
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Medium: "bg-blue-100 text-blue-700 border-blue-200",
    Low: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border inline-block ${styles[level]}`}
    >
      {level}
    </span>
  );
};

const FilterButton = ({ label, value, icon }) => (
  <button className="flex h-10 items-center gap-x-3 rounded-xl bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 px-4 shadow-sm hover:border-[#135bec] transition-all group">
    <p className="text-[#111318] dark:text-white text-xs font-bold">
      {label}: <span className="text-gray-400 font-medium">{value}</span>
    </p>
    <span className="text-gray-400 group-hover:text-[#135bec] transition-colors">
      {icon}
    </span>
  </button>
);

export default PendingApprovals;
