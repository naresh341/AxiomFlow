import {
  AlertTriangle,
  ArrowRight,
  Info,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import BreakGlassModal from "../../Components/BreakGlassModal";
import { NavLink } from "react-router-dom";
import OverrideModal from "../../Components/OverrideModal";
import LockRoles from "../../Components/LockRoles";

const Governance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [isLockRolesModalOpen, setIsLockRolesModalOpen] = useState(false);
  return (
    <div className="min-h-screen transition-colors duration-300 bg-[#f6f7f8] dark:bg-[#101922]">
      <div className="flex flex-col h-full grow">
        <div className="px-4 py-10  flex flex-1 justify-center">
          <div className="flex flex-col  flex-1 gap-8">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex flex-col min-w-72 gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="text-[#137fec] w-10 h-10"
                    strokeWidth={2.5}
                  />
                  <h1 className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Governance & Emergency Controls
                  </h1>
                </div>
                <p className="text-[#617589] dark:text-gray-400 text-lg font-normal leading-normal">
                  High-fidelity enterprise oversight and mission-critical access
                  management for platform administrators.
                </p>
              </div>
            </div>

            {/* Audit Status Panel */}
            <div className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-xl shadow-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-green-600 w-5 h-5" />
                    <p className="text-[#111418] dark:text-white text-base font-bold leading-tight">
                      Audit & Logging Status: Active
                    </p>
                  </div>
                  <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                    All governance actions performed on this console are
                    immutably logged and synced to the global security vault.
                  </p>
                </div>
                <NavLink
                  to={"/Admin/audit-logs"}
                  className="flex items-center gap-2 text-sm font-bold text-[#137fec] hover:underline"
                >
                  View Audit Logs
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>

            {/* Control Cards Section */}
            <div className="flex flex-col gap-6">
              {/* Org-wide Overrides Card */}
              <div className="p-4">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="w-full h-2 bg-yellow-400"></div>
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="w-full lg:w-1/3 aspect-video bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #fef9c3 0%, #facc15 100%)",
                      }}
                    >
                      <ShieldAlert className="text-yellow-700 w-16 h-16" />
                    </div>
                    <div className="flex flex-col grow justify-center gap-3 p-6 min-w-72">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-[10px] font-bold tracking-wider uppercase">
                          Critical Impact
                        </span>
                      </div>
                      <p className="text-[#111418] dark:text-white text-xl font-bold tracking-[-0.015em]">
                        Org-wide Overrides
                      </p>
                      <div className="flex flex-col xl:flex-row items-end gap-6 justify-between">
                        <div className="flex flex-col gap-2">
                          <p className="text-[#617589] dark:text-gray-400 text-base font-normal">
                            Force security policies across all teams and
                            departments. This action overrides individual
                            project settings and local configurations instantly.
                          </p>
                          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium text-sm">
                            <LockKeyhole className="w-4 h-4" />
                            <span>Requires MFA verification</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsOverrideModalOpen(true)}
                          className="flex items-center justify-center h-10 px-5 min-w-35 bg-[#137fec] hover:bg-[#137fec]/90 text-white text-sm font-bold rounded-lg transition-colors"
                        >
                          Enable Overrides
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Enforcement Card */}
              <div className="p-4">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="w-full h-2 bg-orange-500"></div>
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="w-full lg:w-1/3 aspect-video bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #ffedd5 0%, #f97316 100%)",
                      }}
                    >
                      <Zap className="text-orange-700 w-16 h-16" />
                    </div>
                    <div className="flex flex-col grow justify-center gap-3 p-6 min-w-72">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 text-[10px] font-bold tracking-wider uppercase">
                          Policy Lockdown
                        </span>
                      </div>
                      <p className="text-[#111418] dark:text-white text-xl font-bold tracking-[-0.015em]">
                        Role Enforcement
                      </p>
                      <div className="flex flex-col xl:flex-row items-end gap-6 justify-between">
                        <p className="text-[#617589] dark:text-gray-400 text-base font-normal">
                          Lock role permissions globally to prevent unauthorized
                          changes or escalation of privileges during audit
                          periods or high-security windows.
                        </p>
                        <button
                          onClick={() => setIsLockRolesModalOpen(true)}
                          className="flex items-center justify-center h-10 px-5 min-w-35 bg-[#137fec] hover:bg-[#137fec]/90 text-white text-sm font-bold rounded-lg transition-colors"
                        >
                          Lock Roles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Access (Break-Glass) Card */}
              <div className="p-4">
                <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-900 border-2 border-red-500 rounded-xl shadow-[0_8px_24px_rgba(220,38,38,0.1)] ring-4 ring-red-500/5">
                  <div className="w-full h-2 bg-red-600"></div>
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="w-full lg:w-1/3 aspect-video bg-cover bg-center flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #fee2e2 0%, #dc2626 100%)",
                      }}
                    >
                      <AlertTriangle className="text-red-800 w-16 h-16" />
                    </div>
                    <div className="flex flex-col grow justify-center gap-3 p-6 min-w-72">
                      <div className="flex items-center">
                        <span className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase">
                          Emergency Only
                        </span>
                      </div>
                      <p className="text-[#111418] dark:text-white text-xl font-bold tracking-[-0.015em]">
                        Emergency Access (Break-Glass)
                      </p>
                      <div className="flex flex-col xl:flex-row items-end gap-6 justify-between">
                        <div className="flex flex-col gap-3">
                          <p className="text-[#617589] dark:text-gray-400 text-base font-normal">
                            Grant temporary full administrative access for
                            critical incident response. Use only when standard
                            authentication methods are compromised.
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 rounded flex items-start gap-2">
                            <Info className="text-red-700 dark:text-red-400 w-5 h-5 mt-0.5" />
                            <p className="text-red-700 dark:text-red-400 text-sm font-bold leading-normal">
                              Audit Warning: All actions will be logged and
                              reported directly to the Board of Directors.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="flex items-center justify-center h-12 px-6 min-w-55 bg-red-600 hover:bg-red-700 text-white text-sm font-black rounded-lg transition-all shadow-lg hover:shadow-red-500/20"
                        >
                          Request Break-Glass Access
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-8 flex flex-col items-center gap-2 opacity-60">
              <p className="text-[#617589] dark:text-gray-500 text-xs font-medium uppercase tracking-widest">
                Internal Governance Console v4.2.0
              </p>
              <p className="text-[#617589] dark:text-gray-500 text-xs font-normal">
                Security Operations Center Support: +1 (800) 555-0199
              </p>
            </div>
          </div>
        </div>
      </div>

      <BreakGlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <OverrideModal
        isOpen={isOverrideModalOpen}
        onClose={() => setIsOverrideModalOpen(false)}
      />
      <LockRoles
        isOpen={isLockRolesModalOpen}
        onClose={() => setIsLockRolesModalOpen(false)}
      />
    </div>
  );
};

export default Governance;
