import {
  Calendar,
  ChevronDown,
  Download,
  ShieldAlert,
  Users,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import AdminActions from "./AdminAction";
import SystemLogs from "../SystemLogs";
import UserAction from "../UserAction";

const AuditLogsSystem = () => {
  const [activeTab, setActiveTab] = useState("user");

  const configs = {
    user: {
      title: "User Audit Logs",
      sub: "Track user, admin, and system-level activities across your organization.",
      btn: "Export Reports",
    },
    admin: {
      title: "Admin Audit Logs",
      sub: "Privileged administrative activity and security policy changes.",
      btn: "Export JSON",
    },
    system: {
      title: "System Logs",
      sub: "Backend events and forensic infrastructure logs.",
      // btn is removed here as per your request
    },
  };

  const current = configs[activeTab] || configs.user;

  return (
    <div className="min-h-screen bg-white dark:bg-[#101922] text-slate-900 dark:text-slate-300 transition-colors">
      <main className="mx-auto p-6 lg:p-10 flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            {/* font-extrabold maps to your 800 weight */}
            <h1 className="text-4xl font-extrabold tracking-tight uppercase dark:text-white">
              {current.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {current.sub}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-[#111418] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium">
              <Calendar size={16} className="text-slate-400" />
              <span>Oct 2023</span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>

            {/* CONDITIONAL BUTTON: Only renders if current.btn exists */}
            {current.btn && (
              <button className="flex items-center gap-2 rounded-lg h-10 px-5 bg-[#137fec] text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                <Download size={16} />
                <span>{current.btn}</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex gap-10 border-b border-slate-200 dark:border-slate-800">
          <TabButton
            active={activeTab === "user"}
            onClick={() => setActiveTab("user")}
            icon={<Users size={16} />}
            label="User Actions"
          />
          <TabButton
            active={activeTab === "admin"}
            onClick={() => setActiveTab("admin")}
            icon={<ShieldAlert size={16} />}
            label="Admin Actions"
          />
          <TabButton
            active={activeTab === "system"}
            onClick={() => setActiveTab("system")}
            icon={<Terminal size={16} />}
            label="System Logs"
          />
        </div>

        {/* CONTENT AREA */}
        <div className="mt-2">
          {activeTab === "user" && <UserAction />}
          {activeTab === "admin" && <AdminActions />}
          {activeTab === "system" && <SystemLogs />}
        </div>
      </main>
    </div>
  );
};

// Simple helper component for cleaner code
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${
      active
        ? "border-b-[3px] border-[#137fec] text-[#137fec]"
        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
    }`}
  >
    <div className="flex items-center gap-2">
      {icon} {label}
    </div>
  </button>
);

export default AuditLogsSystem;
