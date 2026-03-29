import {
  Calendar,
  CheckCircle,
  ChevronDown,
  History,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import ApprovalDecisionModal from "../../Components/ApprovalDecisionModal";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
import RejectConfirmationModal from "../../Components/RejectConfirmationModal";
import { TableSchemas } from "../../Utils/TableSchemas";
import { useNotify } from "../../Components/MiniComponent/useNotify";
import { approve_reject, getApprovalList } from "../../RTKThunk/WorkflowThunk";

const PendingApprovals = () => {
  const { status } = useParams();
  const notify = useNotify();
  const location = useLocation();
  const [activeId, setActiveId] = useState(status);
  const [notes, setNotes] = useState("");
  const { isDrawerOpen, setIsDrawerOpen } = useOutletContext();
  const isHistoryTab = location.pathname.includes("history");
  const [page, setPage] = useState(1);
  const rows = 10;
  const [modalStep, setModalStep] = useState(null);
  const [rejectionData, setRejectionData] = useState(null);
  const menuStatus = useRef(null);
  const menuPriority = useRef(null);
  const calendarRef = useRef(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "ALL_PENDING",
    priority: "All",
    dateRange: null,
  });
  const { data, total, loading } = useSelector((state) => state.approval);
  const dispatch = useDispatch();
  const activeApproval = data.find(
    (item) => item.approval_key?.trim() == activeId?.trim(),
  );

  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };

  useEffect(() => {
    setFilters((prev) => {
      if (isHistoryTab) {
        return { ...prev, status: "HISTORY" };
      }

      if (prev.status === "HISTORY") {
        return { ...prev, status: "ALL_PENDING" };
      }

      return prev; // keep user selection
    });
  }, [isHistoryTab]);

  useEffect(() => {
    setPage(1);
  }, [search, filters.status, filters.priority, filters.dateRange]);

  const handleApproveTrigger = async (decisionStatus) => {
    const payload = {
      approval_id: activeApproval.id,
      comment: notes,
      action_by_name: "Naresh",
      action_taken: decisionStatus,
    };
    if (decisionStatus === "APPROVED") {
      setModalStep("decision");
      return;
    }
    if (decisionStatus === "REJECTED") {
      setRejectionData(payload);
      setModalStep("confirm-reject");
      return;
    }
    try {
      await dispatch(approve_reject(payload)).unwrap();
      handleFinalSuccess();
      notify.success("Approved Successful")
    } catch (error) {
      console.error("Error while processing approval decision", error);
      notify.error(
        error?.message || "Error while processing approval decision",
      );
    }
  };

  const handleFinalReject = async () => {
    try {
      await dispatch(approve_reject(rejectionData)).unwrap();
      handleFinalSuccess();
      notify.success("Reject Successful");
    } catch (error) {
      console.error("Rejection failed", error);
      notify.error(error?.message || " Something Went Wrong");
    }
  };

  const handleFinalSuccess = () => {
    notify.success("Decision processed successfully 🚀");
    setModalStep(null);
    setIsDrawerOpen(false);
  };

  const handleRowClick = (rowData) => {
    setActiveId(rowData.data.approval_key);
    setIsDrawerOpen(true);
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "ALL_PENDING" })),
    },
    {
      label: "Escalated",
      command: () => setFilters((prev) => ({ ...prev, status: "ESCALATED" })),
    },
    {
      label: "Pending",
      command: () => setFilters((prev) => ({ ...prev, status: "PENDING" })),
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

  const getDateLabel = () => {
    if (!filters.dateRange) return "All Time";
    return new Date(filters.dateRange).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(
        getApprovalList({
          status: filters.status,
          page: page,
          limit: rows,
          search,
          priority: filters.priority,
          date: filters.dateRange
            ? filters.dateRange.toISOString().split("T")[0]
            : "",
        }),
      );
    }, 500);

    return () => clearTimeout(delay);
  }, [search, page, filters, dispatch]);

  return (
    <div className=" flex w-full h-[calc(100vh-160px)] overflow-hidden overflow-y-scroll bg-[#f6f6f8] dark:bg-[#101622] animate-in fade-in duration-500">
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isDrawerOpen ? "mr-105" : "mr-0"}`}
      >
        <div className="flex gap-3 py-3 flex-wrap items-center mb-4">
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
                className: "text-sm font-bold text-gray-700 dark:text-gray-200",
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
                className: "text-sm font-bold text-gray-700 dark:text-gray-200",
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
          <FilterButton
            label="Date"
            value={getDateLabel()}
            isActive={filters.dateRange}
            icon={<Calendar size={14} />}
            onClick={() => calendarRef.current.show()}
          />

          {/* The Calendar Component */}
          <div className="relative">
            <PrimeCalendar
              ref={calendarRef}
              value={filters.dateRange}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateRange: e.value }))
              }
              selectionMode="single"
              readOnlyInput
              hideOnDateTimeSelect={true}
              className="absolute opacity-0 pointer-events-none -top-10"
              panelClassName="custom-calendar-panel"
              pt={{
                root: { className: "border-none" },
                panel: {
                  className:
                    "bg-white dark:bg-[#1a2233] border border-[#dbdfe6] dark:border-gray-700 shadow-2xl rounded-2xl p-2 mt-2",
                },
                header: {
                  className:
                    "bg-transparent border-b border-gray-100 dark:border-gray-800 pb-2 mb-2",
                },
                title: {
                  className:
                    "text-sm font-bold text-gray-700 dark:text-gray-200",
                },
                dayLabel: {
                  className: "text-xs font-bold text-gray-400 uppercase",
                },
                day: ({ context }) => ({
                  className: `
          rounded-lg transition-all text-sm
          ${context.selected ? "bg-[#135bec] text-white" : "hover:bg-blue-50 dark:hover:bg-gray-800"}
          ${context.disabled ? "opacity-20" : ""}
        `,
                }),
              }}
            />
          </div>
          {(filters.status !== "ALL_PENDING" ||
            filters.priority !== "All" ||
            filters.dateRange) && (
            <>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
              <button
                onClick={() =>
                  setFilters({
                    status: "ALL_PENDING",
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

        {/* Table Container - Scrollable */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 border border-[#dbdfe6] dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <DynamicTable
                tableData={data}
                first={(page - 1) * rows}
                rows={rows}
                tableHead={TableSchemas.approval}
                handleRowClick={handleRowClick}
              />
            )}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800  dark:bg-gray-900 flex items-center justify-center bg-slate-50/30">
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                <Paginator
                  first={(page - 1) * rows}
                  rows={rows}
                  totalRecords={total}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
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
            <span className="text-[#135bec] text-[15px] font-black uppercase tracking-[0.2em] font-mono">
              {activeApproval?.approval_key || "No ID Selected"}
            </span>
            <h3 className="text-xl font-black text-[#111318] dark:text-white tracking-tight leading-tight">
              {activeApproval?.stage || "Review Request"}
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
              <SummaryRow
                label="Workflow Stage"
                value={activeApproval?.stage}
              />
              <SummaryRow
                label="SLA Remaining"
                value={`${activeApproval?.sla_hours} Hours`}
                highlight
              />
              <SummaryRow
                label="Status"
                value={activeApproval?.status}
                isMono
              />
            </div>
          </section>

          {/* Request Context */}
          <section className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest">
              Request Context
            </h4>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec] font-black text-sm border border-[#135bec]/20">
                {activeApproval?.requester_id}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 dark:text-white">
                  Requester ID: {activeApproval?.requester_name}
                </span>
                <span className="text-[12px] text-gray-500 font-medium">
                  Submitted on:{" "}
                  {new Date(activeApproval?.created_at).toLocaleDateString()}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </section>
        </div>

        {/* --- TRULY STICKY FOOTER --- */}
        <div className="p-6 bg-white dark:bg-gray-900 border-t border-[#dbdfe6] dark:border-gray-800 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={loading}
              onClick={() => handleApproveTrigger("APPROVED")}
              className="bg-[#135bec] text-white h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              {loading ? (
                "Approving..."
              ) : (
                <>
                  <CheckCircle size={18} /> Approve
                </>
              )}
            </button>
            <button
              disabled={loading}
              onClick={() => handleApproveTrigger("REJECTED")}
              className="bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 h-12 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition-all"
            >
              {loading ? (
                "Rejecting..."
              ) : (
                <>
                  <XCircle size={18} /> Reject
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      <ApprovalDecisionModal
        isOpen={modalStep === "decision"}
        activeId={activeApproval}
        onClose={() => setModalStep(null)}
        onRejectTrigger={(status, modalComment) => {
          setNotes(modalComment);
          handleApproveTrigger(status);
        }}
      />

      <RejectConfirmationModal
        isOpen={modalStep === "confirm-reject"}
        data={rejectionData}
        onClose={() => setModalStep("decision")} // Go back to decision modal
        onConfirm={handleFinalReject}
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

export default PendingApprovals;
