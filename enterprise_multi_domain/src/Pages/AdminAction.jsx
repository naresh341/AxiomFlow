import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Link as LinkIcon,
  FileCode,
  Copy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  History,
} from "lucide-react";

const AdminActions = () => {
  const [adminLogs] = useState([
    {
      id: "LOG-09281-SOC2",
      timestamp: "2023-10-31 09:12:04",
      admin: "Sarah Hughes",
      initials: "SH",
      avatarColor: "bg-indigo-600",
      actionType: "Update Policy",
      entity: "SOC2-Framework",
      summary: "MFA Enforced",
      status: "Success",
      reason:
        "Quarterly security compliance requirement for SOC2-Type II. Enforcing strict MFA for all administrative endpoints across the primary production framework.",
      approvalRef: "SEC-9122-SOC2",
      ipOrigin: "142.251.46.206",
      sessionId: "s_9k2...0fa2",
      diff: [
        { line: "04", content: '"access_policy": {', type: "normal" },
        { line: "05", content: '  "enforcement": {', type: "normal" },
        { line: "06", content: '    "mfa": "optional",', type: "removed" },
        { line: "07", content: '    "mfa": "required",', type: "added" },
        { line: "08", content: '    "grace_period": 86400,', type: "removed" },
        { line: "09", content: '    "grace_period": 0', type: "added" },
        { line: "10", content: "  }", type: "normal" },
        { line: "11", content: "}", type: "normal" },
      ],
    },
    {
      id: "LOG-08451-IAM",
      timestamp: "2023-10-31 08:45:12",
      admin: "James Ross",
      initials: "JR",
      avatarColor: "bg-amber-600",
      actionType: "Revoke Access",
      entity: "Marketing-Team",
      summary: "Offboarded User: ID_9281",
      status: "Success",
      reason:
        "Automated offboarding trigger from HRIS system. Revoking all cloud-platform permissions for employee ID 9281.",
      approvalRef: "HR-992-TERM",
      ipOrigin: "104.18.2.11",
      sessionId: "s_2a1...9fb1",
      diff: [
        { line: "12", content: '"user_status": "active",', type: "removed" },
        { line: "13", content: '"user_status": "terminated",', type: "added" },
        {
          line: "14",
          content: '"access_keys": ["AK_92", "AK_95"]',
          type: "removed",
        },
        { line: "15", content: '"access_keys": []', type: "added" },
      ],
    },
  ]);

  const [selectedLog, setSelectedLog] = useState(adminLogs[0]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="relative flex-1 max-w-md group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#137fec] transition-colors"
            size={20}
          />
          <input
            className="w-full h-14 bg-white dark:bg-[#111820] border border-slate-300 dark:border-[#1f2937] rounded-xl pl-12 pr-4 text-lg focus:border-[#137fec] focus:ring-4 focus:ring-[#137fec]/10 outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400"
            placeholder="Search logs..."
            type="text"
          />
        </div>
        <select className="h-14 bg-white dark:bg-[#111820] border border-slate-300 dark:border-[#1f2937] rounded-xl px-6 text-base font-bold focus:border-[#137fec] outline-none text-slate-900 dark:text-slate-100 min-w-55">
          <option>All Action Types</option>
          <option>Update Policy</option>
          <option>Revoke Access</option>
        </select>
        <button className="text-sm text-slate-500 dark:text-slate-500 hover:text-[#137fec] font-black uppercase tracking-[0.2em] transition-colors">
          Clear Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 grow">
        {/* Admin Logs Table */}
        <div className="w-full lg:w-[65%] bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-[#1f2937] text-slate-600 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">
                <tr>
                  <th className="px-8 py-6">Admin User</th>
                  <th className="px-8 py-6">Action</th>
                  <th className="px-8 py-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {adminLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`${
                      selectedLog?.id === log.id
                        ? "bg-[#137fec]/5 dark:bg-[#137fec]/10 border-l-[6px] border-l-[#137fec]"
                        : "border-l-[6px] border-l-transparent"
                    } hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer`}
                  >
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-5">
                        <div
                          className={`size-12 rounded-full ${log.avatarColor} flex items-center justify-center text-sm text-white font-black shadow-lg`}
                        >
                          {log.initials}
                        </div>
                        <div>
                          <p className="font-black text-xl text-slate-900 dark:text-slate-100">
                            {log.admin}
                          </p>
                          <p className="text-sm font-mono text-slate-500">
                            {log.timestamp}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <p className="font-mono text-lg font-bold text-[#137fec]">
                        {log.entity}
                      </p>
                      <p className="text-base text-slate-600 dark:text-slate-400">
                        {log.actionType}
                      </p>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <span
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest border ${
                          log.status === "Success"
                            ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20"
                            : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-slate-200 dark:border-[#1f2937] flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10">
            <p className="text-base font-bold text-slate-500 uppercase tracking-widest">
              Showing {adminLogs.length} of 1,248
            </p>
            <div className="flex gap-4">
              <button className="p-3 border border-slate-300 dark:border-[#1f2937] rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <ChevronLeft
                  size={24}
                  className="text-slate-600 dark:text-slate-300"
                />
              </button>
              <button className="px-8 py-3 bg-[#137fec] text-white rounded-xl font-black text-base shadow-lg">
                1
              </button>
              <button className="p-3 border border-slate-300 dark:border-[#1f2937] rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors">
                <ChevronRight
                  size={24}
                  className="text-slate-600 dark:text-slate-300"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Forensic Detail Sidebar */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-8 bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl p-8 shadow-2xl sticky top-28 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1f2937] pb-6">
            <div className="flex items-center gap-4">
              <ShieldCheck size={28} className="text-[#137fec]" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Forensic Details
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              ID: {selectedLog?.id}
            </span>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <History size={16} /> Reason for Change
              </label>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-[#1f2937] italic text-slate-800 dark:text-slate-200 text-lg leading-relaxed shadow-sm">
                "{selectedLog?.reason}"
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <FileCode size={16} /> Configuration Diff
              </label>
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-8 border border-slate-800 overflow-hidden shadow-inner">
                {selectedLog?.diff.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <span className="text-slate-600 w-8 select-none font-bold">
                      {item.line}
                    </span>
                    <span
                      className={`flex-1 rounded px-2 ${
                        item.type === "added"
                          ? "bg-green-500/20 text-green-400"
                          : item.type === "removed"
                            ? "bg-red-500/20 text-red-400 line-through opacity-60"
                            : "text-slate-400"
                      }`}
                    >
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <LinkIcon size={16} /> Approval Reference
              </label>
              <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900/50 border-2 border-slate-100 dark:border-[#1f2937] rounded-2xl group hover:border-[#137fec] transition-all cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="bg-[#137fec]/10 p-3 rounded-xl text-[#137fec]">
                    <ExternalLink size={24} />
                  </div>
                  <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {selectedLog?.approvalRef}
                  </span>
                </div>
                <button className="text-xs font-black text-[#137fec] uppercase tracking-widest group-hover:underline">
                  View Jira
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-8 border-t border-slate-100 dark:border-[#1f2937] flex gap-4">
            <button className="flex-1 py-5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl">
              <Copy size={20} /> Copy JSON
            </button>
            <button className="flex-1 py-5 bg-white text-slate-900 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-100 transition-all border-2 border-slate-200 dark:border-transparent shadow-xl">
              <CheckCircle2 size={20} /> Verify
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminActions;
