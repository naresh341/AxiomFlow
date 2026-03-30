import {
  Calendar,
  CheckCircle2,
  Lock,
  ShieldAlert,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState } from "react";
// import { OverRideAction, Send_OTP } from "../RTKThunk/AsyncThunk";
import { useDispatch } from "react-redux";
import OtpModal from "./MiniComponent/OtpModal";
import { OverRideAction, Send_OTP } from "../RTKThunk/GovernanceThunk";
import { useNotify } from "./MiniComponent/useNotify";

const OverrideModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpmodel, setOtpmodel] = useState(false);
  const notify = useNotify();

  const [formData, setFormData] = useState({
    justification: "",
    metadata: {},
    mfa: ["", "", "", "", "", ""],
    mfa_code: "",
    duration: "",
  });

  // =====================
  // HANDLE BASIC INPUT
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================
  // DURATION SELECT
  // =====================
  const setDuration = (value) => {
    setFormData((prev) => ({
      ...prev,
      duration: value,
    }));
  };

  // =====================
  // MFA HANDLING
  // =====================
  const handleMfaChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    setFormData((prev) => {
      const updated = [...prev.mfa];
      updated[index] = value;

      return {
        ...prev,
        mfa: updated,
        mfa_code: updated.join(""),
      };
    });

    if (value && index < 5) {
      document.querySelector(`input[data-index="${index + 1}"]`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.mfa[index] && index > 0) {
      document.querySelector(`input[data-index="${index - 1}"]`)?.focus();
    }
  };

  // =====================
  // SUBMIT VIA THUNK
  // =====================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        mfa_code: formData.mfa_code,
        justification: formData.justification,
        duration: formData.duration,
        metadata: {
          ...formData.metadata,
        },
      };

     await dispatch(OverRideAction(payload)).unwrap();

      notify.success("Organization-wide overrides enabled successfully!");

      onClose();
    } catch (err) {
      console.error("Governance action failed", err);
      notify.error(err.message || "Failed to enable overrides.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(Send_OTP({ action_type: "override" })).unwrap();

      setOtpSent(true);
      setOtpmodel(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-[#101922] border border-slate-200 dark:border-[#2d3a4b] w-full max-w-240 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-[#2d3a4b] bg-[#f2b90d]/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-[#f2b90d]" />
              <p className="text-[#f2b90d] text-[10px] font-black tracking-[0.2em] uppercase">
                Security Action Required
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Enable Organization-wide Overrides
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            High-Stakes Governance Workflow • Admin Authorization Required
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Step 1: Impact */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-[#f2b90d] text-[#101922] text-xs font-black">
                1
              </span>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Impact Summary
              </h3>
            </div>
            <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-5 flex gap-4">
              <TriangleAlert className="text-[#ef4444] shrink-0" size={32} />
              <div className="space-y-2">
                <p className="font-bold text-slate-900 dark:text-white">
                  This action will supersede all local team-level
                  configurations.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Enabling this override bypasses existing regional constraints.
                  This operation is logged and requires manual reversion.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[
                    "Global Security Policies",
                    "Access Control Lists",
                    "Feature Toggles",
                    "Audit Triggers",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400"
                    >
                      <CheckCircle2 size={14} className="text-[#f2b90d]" />{" "}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Inputs */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-[#f2b90d] text-[#101922] text-xs font-black">
                2
              </span>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Mandatory Justification
              </h3>
            </div>
            <div className="space-y-4">
              <textarea
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-[#f2b90d]/20 dark:text-white  border border-slate-200 dark:border-[#2d3a4b] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#f2b90d] outline-none min-h-25 transition-all  "
                placeholder="Provide detailed business justification for this global change..."
              />
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDuration("manual")}
                  className="flex items-center justify-between px-4 py-3 bg-[#f2b90d]/10 border border-[#f2b90d] rounded-xl text-xs font-bold text-[#f2b90d]"
                >
                  <span>Until manually disabled</span>
                  <CheckCircle2 size={16} />
                </button>
                <button
                  onClick={() => setDuration("1 Hour")}
                  className="flex items-center justify-between px-4 py-3 bg-transparent border border-slate-200 dark:border-[#2d3a4b] rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-[#1c2632]"
                >
                  <span>Auto-expire (1 Hour)</span>
                  <Calendar size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Step 3: Verification */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center size-6 rounded-full bg-[#f2b90d] text-[#101922] text-xs font-black">
                3
              </span>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Identity Verification
              </h3>
            </div>
            <div className="bg-slate-50 dark:bg-[#151d27] p-6 rounded-2xl border border-slate-200 dark:border-[#2d3a4b] space-y-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1c2632] text-[#f2b90d] focus:ring-[#f2b90d]"
                />
                <span className="text-xs font-medium leading-relaxed text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                  I confirm that this high-stakes override is authorized by the
                  CISO and I understand the global impact.
                </span>
              </label>

              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  className="h-12 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Send OTP
                </button>
              )}
              {otpSent && (
                <div className="flex justify-center gap-2">
                  {formData.mfa.map((digit, index) => (
                    <input
                      key={index}
                      data-index={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleMfaChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="size-12 text-center text-xl border-slate-300 shadow-md font-bold bg-white dark:bg-[#1c2632] border  dark:border-[#2d3a4b] rounded-xl focus:border-[#f2b90d] focus:ring-4 focus:ring-[#f2b90d]/10 outline-none transition-all"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-[#1c2632]/50 border-t border-slate-200 dark:border-[#2d3a4b] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            <Lock size={12} /> Secure Session
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-6 py-2.5 rounded-xl border border-slate-300 dark:border-[#2d3a4b] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#2d3a4b] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer px-8 py-2.5 rounded-xl bg-[#f2b90d] text-[#101922] text-xs font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#f2b90d]/20"
            >
              Enable Overrides
            </button>
          </div>
        </div>
      </div>

      <OtpModal isOpen={otpmodel} onClose={() => setOtpmodel(false)} />
    </div>
  );
};

export default OverrideModal;
