import React, { useState } from "react";
import {
  ShieldCheck,
  Vibrate,
  KeyRound,
  Timer,
  Plus,
  CheckCircle2,
  UserCheck,
  Edit3,
} from "lucide-react";
import PasswordPolicyEditor from "../../Components/PasswordPolicyEditor";

const Security = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const networkAccess = [
    { name: "VPN Gateway", range: "192.168.10.0/24", date: "Oct 10, 2023" },
    {
      name: "Office HQ (London)",
      range: "10.0.0.1 - 10.0.0.254",
      date: "Nov 15, 2023",
    },
    {
      name: "Admin Remote Proxy",
      range: "203.0.113.42/32",
      date: "Dec 22, 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white transition-colors">
      <main className="mx-auto py-12 px-6">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Security Controls & Risk Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Manage enterprise-grade security settings and mitigate platform
            risks across the entire infrastructure.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1: MFA Enforcement */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[12px] font-black uppercase rounded-lg">
                    High Security
                  </span>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[12px] font-black uppercase rounded-lg">
                    Enforced
                  </span>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <Vibrate size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">MFA Enforcement</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
                    Mandatory hardware tokens (YubiKey, Titan) are required for
                    all administrator and super-user accounts. Biometric
                    WebAuthn is also permitted as a secondary method.
                  </p>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Sarah Jones on Oct 12, 2023
              </p>
            </footer>
          </section>

          {/* Card 2: Password Policy */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[12px] font-black uppercase rounded-lg">
                  Medium Security
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 text-sm font-black flex items-center gap-2 hover:underline"
                >
                  <Edit3 size={16} /> Edit Policy
                </button>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <KeyRound size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Password Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Minimum 14 characters",
                      "Rotation every 90 days",
                      "No reuse of last 5 passwords",
                      "Uppercase, numeric, & symbols",
                    ].map((rule) => (
                      <div
                        key={rule}
                        className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                      >
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="text-base">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Robert Chen on Jan 05, 2024
              </p>
            </footer>
          </section>

          {/* Card 3: Session Management */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[12px] font-black uppercase rounded-lg">
                  Medium Risk Badge
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                    <Timer size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Session Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Configure automated logout for inactive administrative
                      sessions.
                    </p>
                  </div>
                </div>
                <div className="min-w-55">
                  <label className="block text-[12px] font-black uppercase text-gray-400 mb-2 tracking-widest">
                    Session Timeout
                  </label>
                  <select className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-sm font-bold py-3 px-4 focus:ring-2 focus:ring-blue-600">
                    <option>15 Minutes</option>
                    <option selected>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>End of Working Day</option>
                  </select>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by System Automator on Feb 28, 2024
              </p>
            </footer>
          </section>

          {/* Card 4: Network Access Control */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold">Network Access Control</h3>
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[12px] font-black uppercase rounded-lg">
                    High Security
                  </span>
                </div>
                <button className="bg-blue-600 text-white text-xs font-black py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  <Plus size={16} /> Add IP Range
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100 dark:border-gray-800">
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        Location Name
                      </th>
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        IP Range / CIDR
                      </th>
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        Added On
                      </th>
                      <th className="pb-4 text-right font-black uppercase text-[12px] tracking-widest">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {networkAccess.map((item) => (
                      <tr
                        key={item.name}
                        className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="py-5 font-bold">{item.name}</td>
                        <td className="py-5 font-mono text-gray-500 dark:text-gray-400">
                          {item.range}
                        </td>
                        <td className="py-5 text-gray-400">{item.date}</td>
                        <td className="py-5 text-right">
                          <button className="text-red-500 hover:text-red-600 font-black text-[12px] uppercase tracking-widest">
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Sarah Jones on Mar 01, 2024
              </p>
            </footer>
          </section>
        </div>

        {/* Footer Meta */}
        <footer className="mt-16 text-center">
          <p className="text-gray-400 text-[12px] uppercase tracking-[0.3em] font-black mb-3">
            Audit Logs & Compliance
          </p>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xl mx-auto">
            All changes to these controls are logged and immutable for 7 years.
            Regulatory compliance: SOC2, ISO 27001.
          </p>
        </footer>
        <PasswordPolicyEditor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default Security;
