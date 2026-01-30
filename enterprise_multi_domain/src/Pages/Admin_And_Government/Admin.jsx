import {
  Building2,
  ClipboardList,
  FileCheck,
  Flag,
  HeartPulse,
  Info,
  Lock,
  Scale,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
const Admin = () => {
  const managementModules = [
    {
      title: "Organization",
      desc: "Manage company profile, billing, and subscription details.",
      icon: <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      status: "Premium Plan",
      statusColor:
        "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      path: "Organization",
    },
    {
      title: "Security",
      desc: "MFA, access policies, and identity provider configuration.",
      icon: <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      status: "MFA Enforced",
      statusColor:
        "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      path: "security",
    },
    {
      title: "Audit Logs",
      desc: "Detailed traceability of all administrative and user actions.",
      icon: (
        <ClipboardList className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      status: "54 new today",
      statusColor:
        "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      path: "audit-logs",
    },
    {
      title: "Compliance",
      desc: "Centralized repository for certifications and evidence.",
      icon: <FileCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      status: "Next audit in 12d",
      statusColor:
        "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      path: "compliance",
    },
    {
      title: "Feature Flags",
      desc: "Control module availability and progressive rollouts.",
      icon: <Flag className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      status: "3 Beta active",
      statusColor:
        "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      path: "feature-flags",
    },
    {
      title: "Governance",
      desc: "Emergency overrides, legal hold, and policy enforcement.",
      icon: <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      status: "System Locked",
      statusColor:
        "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      path: "governance",
    },
  ];

  return (
    <main className="p-10 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Governance at a Glance Section */}
      <section className="mb-14">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-8">
          Governance at a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* System Health */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
              <HeartPulse className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                System Health
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-4xl font-black dark:text-white">
                  99.9%
                </span>
                <span className="px-3 py-1 text-xs font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full uppercase">
                  Operational
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Status */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Compliance Status
              </p>
              <p className="text-4xl font-black dark:text-white mt-1">
                SOC2 Type II
              </p>
              <p className="text-lg text-green-600 dark:text-green-400 font-bold">
                Certified & Valid
              </p>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-full">
              <ShieldAlert className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Security Alerts
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-4xl font-black dark:text-white">0</span>
                <span className="px-3 py-1 text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-full uppercase">
                  Neutral
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Modules Section */}
      <section className="mb-14">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl font-black text-gray-800 dark:text-slate-100">
            Management Modules
          </h2>
          <button className="text-blue-600 dark:text-blue-400 font-bold text-xl hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementModules.map((module, index) => (
            <NavLink to={module.path} key={index}>
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div>
                  <div className="w-16 h-16 bg-blue-50 shadow-lg dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6  transition-colors duration-300">
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {module.title}
                  </h3>
                  <p className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed mb-8">
                    {module.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-50 dark:border-slate-800">
                  <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                    Status
                  </span>
                  <span
                    className={`px-5 py-2 rounded-xl text-sm font-black ${module.statusColor}`}
                  >
                    {module.status}
                  </span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Big Blue Banner */}
      <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl p-10 flex flex-col lg:flex-row items-center justify-between text-white gap-8 shadow-2xl shadow-blue-500/30">
        <div className="flex items-center gap-8">
          <div className="p-5 bg-white/20 rounded-2xl backdrop-blur-md">
            <Info className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-4xl font-black mb-1">
              New Security Protocol Available
            </h4>
            <p className="text-xl text-blue-100">
              We've introduced Zero-Trust Tunneling for your enterprise
              environment.
            </p>
          </div>
        </div>
        <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl whitespace-nowrap hover:bg-gray-100 transition-all transform active:scale-95 shadow-xl">
          Learn More
        </button>
      </div>
    </main>
  );
};

export default Admin;
