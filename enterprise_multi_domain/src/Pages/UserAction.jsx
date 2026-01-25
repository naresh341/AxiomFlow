import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Info,
  Laptop,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

const UserAction = () => {
  const [logs] = useState([
    {
      id: "sess_9281_af82_0019_cc21",
      timestamp: "2023-10-30 14:22:10",
      user: "Alex Rivera",
      action: "Password Change",
      resource: "/account/security",
      ip: "192.168.1.104",
      status: "Success",
      description:
        "The user successfully updated their account password via the security settings page. MFA challenge was completed via TOTP.",
      role: "Administrator",
      dept: "IT Security",
      location: "San Francisco, CA (US)",
      device: "Chrome v118.0.0 (MacOS)",
      model: "MacBook Pro 14-inch",
    },
    {
      id: "sess_1102_bf22_9941_aa10",
      timestamp: "2023-10-30 13:05:45",
      user: "Jordan Smith",
      action: "Login Attempt",
      resource: "/auth/login",
      ip: "45.23.112.9",
      status: "Failed",
      description:
        "Failed login attempt. Incorrect password provided three times from an unrecognized IP address.",
      role: "Member",
      dept: "Marketing",
      location: "New York, NY (US)",
      device: "Safari (iOS)",
      model: "iPhone 15 Pro",
    },
  ]);

  const [selectedLog, setSelectedLog] = useState(logs[0]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter Bar - Enhanced Height and Text Size */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors"
            size={20}
          />
          <input
            className="w-full h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 text-base focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20 outline-none transition-all"
            placeholder="Search logs..."
            type="text"
          />
        </div>
        <select className="h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-base focus:border-[#137fec] outline-none">
          <option>All Users</option>
        </select>
        <select className="h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-base focus:border-[#137fec] outline-none">
          <option>Action Type</option>
        </select>
        <select className="h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-base focus:border-[#137fec] outline-none">
          <option>Status: All</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 grow">
        {/* Main Table Section (70%) - Increased Padding and Font Sizes */}
        <div className="w-full lg:w-[68%] bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#283039] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                <tr>
                  <th className="px-8 py-5">Timestamp</th>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Action</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`${selectedLog?.id === log.id ? "bg-[#137fec]/5 dark:bg-[#137fec]/10 border-l-4 border-l-[#137fec]" : "border-l-4 border-l-transparent"} hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all`}
                  >
                    <td className="px-8 py-6 whitespace-nowrap text-slate-400 font-medium text-base">
                      {log.timestamp}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <User size={20} className="text-slate-500" />
                        </div>
                        <span className="font-bold text-lg">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-base font-medium">
                      {log.action}
                      <p className="text-sm text-slate-400 font-normal">
                        {log.resource}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span
                        className={`inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-bold uppercase tracking-tight ${log.status === "Success" ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-base text-slate-500 font-medium">
              Showing {logs.length} entries
            </p>
            <div className="flex gap-3">
              <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                <ChevronLeft size={20} />
              </button>
              <button className="px-5 py-2 bg-[#137fec] text-white rounded-lg font-bold">
                1
              </button>
              <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel Section (32%) - Increased Contrast and Sizing */}
        <aside className="w-full lg:w-[32%] flex flex-col gap-8 bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#283039] rounded-2xl p-8 shadow-sm sticky top-28 h-fit">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
            <Info size={24} className="text-[#137fec]" />
            <h3 className="text-xl font-black uppercase tracking-tight">
              Log Details
            </h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Action Description
              </label>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {selectedLog?.description}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                User Metadata
              </label>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 grid grid-cols-2 gap-y-5">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Role
                  </p>
                  <p className="text-base font-bold">{selectedLog?.role}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Dept
                  </p>
                  <p className="text-base font-bold">{selectedLog?.dept}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Location
                  </p>
                  <p className="text-base font-bold">{selectedLog?.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                System Source
              </label>
              <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="p-2 bg-[#137fec]/10 rounded-lg">
                  <Laptop size={24} className="text-[#137fec]" />
                </div>
                <div>
                  <p className="text-base font-bold">{selectedLog?.device}</p>
                  <p className="text-sm text-slate-400 font-medium">
                    {selectedLog?.model} • {selectedLog?.ip}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                Identifier
              </label>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-sm">
                <span className="truncate opacity-70">{selectedLog?.id}</span>
                <button className="text-[#137fec] hover:scale-110 transition-transform">
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-slate-200 dark:shadow-none transition-transform hover:-translate-y-0.5">
            <Eye size={20} />
            Inspect Payload
          </button>
        </aside>
      </div>
    </div>
  );
};

export default UserAction;
