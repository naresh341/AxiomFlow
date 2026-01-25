import React from "react";
import {
  CheckCircle2,
  Users,
  BarChart3,
  Headphones,
  ArrowRight,
  Download,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-white dark:bg-[#101622] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in duration-300">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Animated Success Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative size-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2
                className="text-emerald-600 dark:text-emerald-400"
                size={48}
                strokeWidth={2.5}
              />
            </div>
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            Your organization has been upgraded to{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Enterprise Pro
            </span>
            .
          </p>

          {/* Transaction Summary Card */}
          <div className="w-full text-left bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-800/50">
            <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              Transaction Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Amount Paid
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  $12,474.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Payment Method
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-black text-slate-400">
                    VISA
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    ending in 8890
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Billing Cycle
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Annual
                </span>
              </div>
            </div>
          </div>

          {/* Features Unlocked Section */}
          <div className="w-full border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-6 mb-10">
            <h2 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
              <Sparkles size={14} />
              New Capabilities Unlocked
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="size-10 bg-white dark:bg-[#101622] rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-800 shadow-sm">
                  <Users
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 text-center leading-tight">
                  Unlimited
                  <br />
                  Seats
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-10 bg-white dark:bg-[#101622] rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-800 shadow-sm">
                  <BarChart3
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 text-center leading-tight">
                  Advanced
                  <br />
                  Analytics
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="size-10 bg-white dark:bg-[#101622] rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-800 shadow-sm">
                  <Headphones
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 text-center leading-tight">
                  24/7 Priority
                  <br />
                  Support
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => navigate("/Admin/Organization")}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              Go to Dashboard
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <div className="flex items-center justify-center gap-6 mt-2">
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold text-sm transition-colors group">
                <Download size={16} />
                <span>Download Receipt</span>
              </button>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold text-sm transition-colors group">
                <ExternalLink size={16} />
                <span>Manage Billing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
