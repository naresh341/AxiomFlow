import {
  AlertTriangle,
  Gavel,
  History,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BreakGlassAction, Send_OTP } from "../RTKThunk/AsyncThunk";
import OtpModal from "./MiniComponent/OtpModal";

const BreakGlassModal = ({ isOpen, onClose }) => {
  const [mfaCode, setMfaCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpmodel, setOtpmodel] = useState(false);
  const dispatch = useDispatch();

  const handleBreakGlass = async () => {
    try {
      const payload = {
        mfa_code: mfaCode,
        action_type: "BREAK_GLASS",
      };

      await dispatch(BreakGlassAction(payload)).unwrap();

      setOtpmodel(false);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(Send_OTP({ action_type: "BREAK_GLASS" })).unwrap();

      setOtpSent(true);
      setOtpmodel(true);
    } catch (err) {
      console.error(err);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-sans transition-colors duration-300">
      {/* Background Page (Blurred as per your HTML) */}
      <div className="layout-container flex h-full grow flex-col filter blur-sm select-none pointer-events-none">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
          <div className="flex flex-col max-w-240 flex-1 gap-8">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#137fec]/20 rounded flex items-center justify-center">
                    <ShieldCheck className="text-[#137fec]" size={32} />
                  </div>
                  <h1 className="text-[#111418] dark:text-white text-4xl font-black">
                    Governance
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Break-Glass Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-white dark:bg-[#1a1c1e] rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.3)] border border-red-500/30 overflow-hidden">
          {/* Modal Header */}
          <div className="bg-red-600 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4 text-white">
              <AlertTriangle size={32} strokeWidth={2.5} />
              <div className="flex flex-col">
                <h2 className="text-xl font-black uppercase tracking-tight leading-none">
                  Requesting Break-Glass Access
                </h2>
                <span className="text-xs font-bold text-red-100 opacity-80 uppercase tracking-[0.2em] mt-1">
                  Step 2 of 2: Verification & Warning
                </span>
              </div>
            </div>
            <div className="text-white/40 font-mono text-xs hidden sm:block">
              AUTH_LEVEL_0
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-8 flex flex-col gap-8">
            {/* Warning Section */}
            <div className="bg-red-50 dark:bg-red-950/40 border-l-[6px] border-red-600 p-6 flex gap-4">
              <Gavel className="text-red-600 shrink-0" size={40} />
              <div className="flex flex-col gap-2">
                <h3 className="text-red-700 dark:text-red-400 text-lg font-black leading-tight uppercase tracking-wide">
                  High-Severity Access Protocol
                </h3>
                <p className="text-red-900 dark:text-red-200 text-base font-bold leading-relaxed">
                  Warning: You are about to enable unrestricted administrative
                  access. This action will be immutably logged and the Board of
                  Directors will be notified immediately.
                </p>
              </div>
            </div>

            {/* MFA Input Section */}
            <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Smartphone className="text-[#137fec]" size={18} />
                <p className="text-[#111418] dark:text-white text-sm font-bold uppercase tracking-wider">
                  Multi-Factor Authentication
                </p>
              </div>
              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  className="h-12 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Send OTP
                </button>
              )}

              {otpSent && (
                <div className="flex flex-col gap-3">
                  <label
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase"
                    htmlFor="mfa-code"
                  >
                    Enter code from your security key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="mfa-code"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      className="flex-1 h-12 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg px-4 text-xl font-mono tracking-[0.5em] focus:border-red-600 focus:ring-0 transition-colors dark:text-white"
                      placeholder="XXXXXX"
                    />
                    {/* <button className="h-12 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Resend
                    </button> */}
                  </div>
                </div>
              )}
            </div>

            {/* Justification Log */}
            <div className="flex flex-col gap-2 opacity-60">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Justification Summary (Ref: INC-9921-A)
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic border-l-2 border-gray-300 pl-4 py-1">
                "Primary authentication gateway failure in US-EAST-1 cluster.
                Emergency database migration required to restore core
                services..."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row-reverse gap-4 pt-4">
              <button
                type="submit"
                onClick={handleBreakGlass}
                className=" cursor-pointer flex-1 h-14 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-3 rounded-lg font-black uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(220,38,38,0.4)] active:scale-[0.98]"
              >
                <ShieldCheck size={20} />
                Confirm & Enable Access
              </button>
              <button
                type="button"
                onClick={onClose}
                className=" cursor-pointer flex-1 h-14 bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center gap-3 rounded-lg font-bold uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Modal Footer Status */}
          <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              <History size={14} />
              Immutable Audit Trail: ENABLED
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              Board Notification: PENDING CONFIRMATION
            </div>
          </div>
        </div>
      </div>

      <OtpModal isOpen={otpmodel} onClose={() => setOtpmodel(false)} />
    </div>
  );
};

export default BreakGlassModal;
