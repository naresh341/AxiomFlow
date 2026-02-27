import {
  ArrowRight,
  CheckCircle,
  Info,
  Send,
  Timer,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const ApprovalDecisionModal = ({
  isOpen,
  onClose,
  onRejectTrigger,
  activeId,
}) => {
  const [decision, setDecision] = useState("Approve");
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (decision === "Reject") {
      onRejectTrigger("REJECTED", comment);
    } else {
      onRejectTrigger("APPROVED", comment);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-160 bg-white dark:bg-[#1a2130] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#111318] dark:text-white text-2xl font-bold tracking-tight">
              Approval Decision
            </h1>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">
              Approval ID:{" "}
              <span className="font-mono text-[#0f49bd] dark:text-blue-400">
                {activeId.approval_key}
              </span>{" "}
              | Workflow: <span className="font-medium">{activeId.stage}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          {/* Summary Card */}
          <div className="p-6">
            <div className="bg-[#f6f6f8] dark:bg-[#252d3d] border border-gray-100 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-3 flex-1">
                  <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Request Details
                  </p>
                  <p className="text-[#111318] dark:text-white text-base font-bold">
                    Request Type: User Provisioning
                  </p>
                  <p className="text-[#616f89] dark:text-gray-400 text-sm font-medium flex items-center gap-1">
                    <User size={14} /> {activeId.requester_name}
                  </p>
                </div>
                <div className="w-32 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-md border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                  <div className="text-blue-500 font-bold text-xs">
                    PROFILE PREVIEW
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase flex items-center gap-1 dark:text-white">
                    <Timer size={12} /> SLA Status
                  </span>
                  <span className="text-xs font-semibold dark:text-white">
                    {activeId.sla_hours} hrs remaining
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full bg-[#0f49bd]"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Choice */}
          <div className="px-6 pb-6">
            <h3 className="text-sm font-bold dark:text-white mb-3">
              Decision Choice
            </h3>
            <div className="flex h-12 items-center rounded-lg bg-[#f6f6f8] dark:bg-[#252d3d] p-1.5 border border-gray-200 dark:border-gray-700">
              {["Approve", "Reject"].map((option) => (
                <button
                  key={option}
                  onClick={() => setDecision(option)}
                  className={`flex grow items-center justify-center gap-2 h-full rounded-md text-sm font-bold transition-all ${
                    decision === option
                      ? "bg-white dark:bg-[#1a2130] shadow-sm ring-1 ring-black/5 " +
                        (option === "Approve"
                          ? "text-[#10b981]"
                          : "text-[#ef4444]")
                      : "text-[#616f89] dark:text-gray-400"
                  }`}
                >
                  {option === "Approve" ? (
                    <CheckCircle size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="px-6 pb-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold dark:text-white">
                {decision} Comment{" "}
                {decision === "Reject" && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 shadow-md outline-0 dark:border-gray-700 dark:bg-[#1a2130] dark:text-white text-sm p-3 min-h-25 focus:ring-2 focus:ring-[#0f49bd]"
                placeholder={
                  decision === "Approve"
                    ? "Optional context..."
                    : "Explain why this is being rejected..."
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* {decision === "Approve" && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                <ArrowRight className="text-[#0f49bd]" size={20} />
                <div>
                  <p className="text-[10px] text-[#0f49bd] font-bold uppercase">
                    Next Step Preview
                  </p>
                  <p className="text-sm font-semibold dark:text-white">
                    Security Review Phase
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-[#141b29] border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-gray-400 mt-0.5" />
            <p className="text-[11px] text-[#616f89] italic">
              Audit trail recorded per compliance policy.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-[#616f89] hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-all ${
                decision === "Approve"
                  ? "bg-[#10b981] hover:bg-[#059669]"
                  : "bg-[#ef4444] hover:bg-[#dc2626]"
              }`}
            >
              {decision === "Approve" ? "Approve Request" : "Reject Request"}{" "}
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApprovalDecisionModal;
