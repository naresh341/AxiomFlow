import React from "react";
import { AlertTriangle, ChevronLeft, Trash2, Info } from "lucide-react";

const RejectConfirmationModal = ({ isOpen, onClose, onConfirm, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[580px] bg-[#1e1414] rounded-xl border border-[#392828] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Warning Icon & Headline */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center size-16 bg-[#ec1313]/10 rounded-full mb-4">
            <AlertTriangle className="text-[#ec1313]" size={40} />
          </div>
          <h2 className="text-white text-[24px] font-bold leading-tight">
            Are you sure you want to reject this approval?
          </h2>
        </div>

        {/* Data Summary */}
        <div className="px-8 py-2">
          <div className="bg-[#2a1b1b] rounded-lg border border-[#392828] divide-y divide-[#392828]">
            <div className="p-4 flex justify-between">
              <span className="text-[#b99d9d] text-xs font-semibold uppercase">
                Approval ID
              </span>
              <span className="text-white font-bold">{data?.id || "N/A"}</span>
            </div>
            <div className="p-4">
              <span className="text-[#b99d9d] text-xs font-semibold uppercase block mb-1">
                Rejection Comment
              </span>
              <p className="text-white text-sm leading-relaxed italic">
                "{data?.comment || "No comment provided"}"
              </p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="p-6">
          <div className="flex gap-4 rounded-lg border border-[#ec1313]/30 bg-[#ec1313]/5 p-5">
            <Trash2 className="text-[#ec1313] shrink-0" size={24} />
            <div className="flex flex-col gap-1">
              <p className="text-white text-base font-bold">
                Permanent Action Warning
              </p>
              <p className="text-[#b99d9d] text-sm">
                This action cannot be undone and will terminate the associated
                workflow execution immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center bg-[#2a1b1b]/50 border-t border-[#392828] px-6 py-6 gap-4">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 h-12 bg-[#392828] hover:bg-[#4a3535] text-white font-bold rounded-lg transition-all"
          >
            <ChevronLeft size={18} /> Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 bg-[#ec1313] hover:bg-[#ff1a1a] text-white font-bold rounded-lg shadow-lg shadow-[#ec1313]/20 transition-all"
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
};
export default RejectConfirmationModal;
