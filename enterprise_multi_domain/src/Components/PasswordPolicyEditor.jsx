import {
  CheckCircle2,
  History,
  Lock,
  ShieldCheck,
  Unlock,
  X,
} from "lucide-react";
import { useState } from "react";

const PasswordPolicyEditor = ({ isOpen, onClose }) => {
  const [lockoutEnabled, setLockoutEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-300 h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-[#dbe0e6] dark:border-gray-800 animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-[#dbe0e6] dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-2xl font-black tracking-tight dark:text-white">
              Password Policy Editor
            </h2>
            <p className="text-base text-[#617589] dark:text-gray-400">
              Configure enterprise-wide authentication requirements and rotation
              rules.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row mb-10">
          {/* Left Side: Form Fields */}
          <div className="flex-1 p-8 md:p-10 border-r border-[#dbe0e6] dark:border-gray-800">
            <form className="space-y-12">
              {/* Complexity Requirements */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111418] dark:text-gray-300">
                    Complexity Requirements
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Minimum length
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        defaultValue="14"
                        className="w-24 h-12 bg-gray-50 border  dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg font-bold text-center focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      <span className="text-sm font-bold text-[#617589]">
                        characters
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Require uppercase",
                      "Require numbers",
                      "Require special characters",
                    ].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:border-blue-600/30 transition-all group"
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span className="text-base font-bold dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Expiration & History */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                    <History size={20} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111418] dark:text-gray-300">
                    Expiration & History
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Password age
                    </label>
                    <select className="w-56 h-12 bg-gray-50 border dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl px-4 font-bold text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option selected>90 days</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Password history
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#617589]">
                        Do not reuse last
                      </span>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-20 h-12 bg-gray-50 border  dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-center font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                      <span className="text-sm font-bold text-[#617589]">
                        passwords
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Lockout */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                    <Unlock size={20} />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111418] dark:text-gray-300">
                    Account Lockout
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <div>
                      <p className="text-lg font-black dark:text-white">
                        Enable account lockout
                      </p>
                      <p className="text-sm text-[#617589] dark:text-gray-400">
                        Lock account after multiple failed login attempts.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLockoutEnabled(!lockoutEnabled)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${lockoutEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${lockoutEnabled ? "right-1" : "left-1"}`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Max attempts
                      </label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-full h-12 bg-gray-50 border shadow-md dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl px-4 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Lockout duration (mins)
                      </label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full h-12 bg-gray-50 border shadow-md dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl px-4 font-bold"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Right Side: Security Insights Sidebar */}
          <aside className="w-full md:w-[320px] bg-gray-50 dark:bg-gray-800/20 p-8 md:p-10">
            <div className="sticky top-0 space-y-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h3 className="text-sm font-black uppercase tracking-widest dark:text-gray-200">
                  Security Impact
                </h3>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-black uppercase tracking-tighter text-emerald-600">
                      Compliance: SOC2
                    </span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    Current settings meet SOC2 requirements for credential
                    strength and rotation.
                  </p>
                </div>

                <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-black uppercase tracking-tighter text-emerald-600">
                      ISO 27001
                    </span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    Aligned with Annex A.9 access control standards.
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold dark:text-gray-300">
                      Attack Surface Reduction
                    </span>
                    <span className="text-xs font-black text-emerald-600">
                      +85%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%] rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4 leading-relaxed italic">
                    Enforcing a 14-character minimum significantly mitigates
                    brute-force vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5  border-t border-[#dbe0e6] dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase text-[#617589] tracking-[0.2em]">
            Version 2.4.0 • Draft State
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-black text-[#617589] hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-blue-600/20">
              Save Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPolicyEditor;
