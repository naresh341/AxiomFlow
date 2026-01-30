import {
  BarChart3,
  CheckCircle2,
  History,
  LayoutGrid,
  Network,
  Puzzle,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";

const CreateRole = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modules = [
    { name: "Users", icon: <Users size={18} />, perms: ["V", "C", "E", "D"] },
    {
      name: "Roles",
      icon: <ShieldCheck size={18} />,
      perms: ["V", "C", "E", "D"],
    },
    {
      name: "Teams",
      icon: <LayoutGrid size={18} />,
      perms: ["V", "C", "E", "D"],
    },
    {
      name: "Workflows",
      icon: <Workflow size={18} />,
      perms: ["V", "C", "E", "D", "A"],
    },
    {
      name: "Tasks",
      icon: <CheckCircle2 size={18} />,
      perms: ["V", "C", "E", "D"],
    },
    { name: "Approvals", icon: <CheckCircle2 size={18} />, perms: ["V", "A"] },
    { name: "Analytics", icon: <BarChart3 size={18} />, perms: ["V", "C"] },
    {
      name: "Integrations",
      icon: <Puzzle size={18} />,
      perms: ["V", "C", "E", "D"],
    },
    {
      name: "Admin & Governance",
      icon: <Settings2 size={18} />,
      perms: ["V", "C", "E", "D", "A"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-240 bg-white dark:bg-[#111318] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#282e39] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 dark:border-[#282e39]">
          <div className="flex items-center gap-4">
            <div className="bg-[#135bec]/10 p-2.5 rounded-xl">
              <ShieldAlert className="text-[#135bec]" size={24} />
            </div>
            <div>
              <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tight">
                Create New Role
              </h2>
              <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium uppercase tracking-wider">
                Enterprise RBAC Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
          {/* Section: General Info */}
          <section>
            <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#135bec]"></span>{" "}
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-bold">
                  Role Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Workflow Manager"
                  className="w-full rounded-xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#1c1f27] text-slate-900 dark:text-white px-4 py-3 focus:border-[#135bec] focus:ring-4 focus:ring-[#135bec]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-bold">
                  Role ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="RO-10293"
                  className="w-full rounded-xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#1c1f27] text-slate-900 dark:text-white px-4 py-3 focus:border-[#135bec] outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-bold">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe the responsibilities and access scope of this role..."
                  className="w-full rounded-xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#1c1f27] text-slate-900 dark:text-white px-4 py-3 focus:border-[#135bec] outline-none transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Section: Permission Matrix */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#135bec]"></span>{" "}
                Permission Matrix
              </h3>
              <button className="text-[#135bec] text-xs font-bold hover:underline flex items-center gap-1.5 transition-all">
                <History size={14} /> Reset to system default
              </button>
            </div>

            <div className="border border-slate-200 dark:border-[#282e39] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#282e39]/50 border-b border-slate-200 dark:border-[#282e39]">
                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                      Module / Resource
                    </th>
                    {["View", "Create", "Edit", "Delete", "Approve"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-4 py-4 text-[11px] font-black text-slate-500 uppercase text-center tracking-widest"
                        >
                          {header}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#282e39]">
                  {modules.map((m) => (
                    <tr
                      key={m.name}
                      className="hover:bg-slate-50/50 dark:hover:bg-[#282e39]/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{m.icon}</span>
                          {m.name}
                        </div>
                      </td>
                      {["V", "C", "E", "D", "A"].map((p) => (
                        <td key={p} className="px-4 py-4 text-center">
                          {m.perms.includes(p) ? (
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-[#135bec] focus:ring-[#135bec]/20 dark:bg-[#1c1f27]"
                            />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700 font-bold">
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Advanced Settings */}
          <section className="bg-slate-50 dark:bg-[#1c1f27] p-6 rounded-2xl border border-slate-200 dark:border-[#282e39] space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="mfa"
                  className="w-5 h-5 rounded border-slate-300 text-[#135bec] focus:ring-[#135bec]"
                />
              </div>
              <label
                htmlFor="mfa"
                className="text-sm font-bold text-slate-700 dark:text-[#9da6b9] cursor-pointer flex items-center gap-2"
              >
                <Network size={16} /> Require Multi-Factor Authentication (MFA)
                for this role
              </label>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="ip"
                  className="w-5 h-5 rounded border-slate-300 text-[#135bec] focus:ring-[#135bec]"
                />
              </div>
              <label
                htmlFor="ip"
                className="text-sm font-bold text-slate-700 dark:text-[#9da6b9] cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck size={16} /> Restrict login to corporate IP
                addresses only
              </label>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-200 dark:border-[#282e39] bg-slate-50/50 dark:bg-[#111318] flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-[#282e39] rounded-xl transition-all"
          >
            Discard Changes
          </button>
          <button className="bg-[#135bec] hover:bg-[#104ec9] text-white px-10 py-3 rounded-xl text-sm font-black transition-all shadow-xl shadow-[#135bec]/20 flex items-center gap-3 active:scale-[0.98]">
            Create Role <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
