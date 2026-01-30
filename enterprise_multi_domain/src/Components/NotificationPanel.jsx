import {
  AlertTriangle,
  Bolt,
  CheckCircle,
  CheckSquare,
  GitBranch,
} from "lucide-react";

const NotificationPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = {
    today: [
      {
        id: 1,
        title: "Approval Required",
        desc: "Invoice #INV-901 awaiting action from finance team.",
        time: "2h ago",
        icon: <CheckSquare size={18} />,
        type: "primary",
        unread: true,
        actions: true,
      },
      {
        id: 2,
        title: "Execution Failed",
        desc: "Critical: User Onboarding Workflow failed at step: Create Account",
        time: "5h ago",
        icon: <Bolt size={18} />,
        type: "error",
        unread: true,
      },
    ],
    yesterday: [
      {
        id: 3,
        title: "SLA Breach",
        desc: "Escalation: Approval APR-1021 is overdue by 24 hours.",
        time: "1d ago",
        icon: <AlertTriangle size={18} />,
        type: "warning",
        unread: false,
      },
      {
        id: 4,
        title: "Version Published",
        desc: "v3.5.0 of Payroll Workflow is now live in production.",
        time: "1d ago",
        icon: <GitBranch size={18} />,
        type: "info",
        unread: false,
      },
    ],
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-10 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="fixed right-0 top-0 w-[360px] h-full bg-white dark:bg-[#101922] shadow-2xl z-100 flex flex-col border-l border-gray-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Notifications
            </h2>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold rounded uppercase">
              4 New
            </span>
          </div>
          <button className="text-[#137fec] text-xs font-semibold hover:underline flex items-center gap-1">
            <CheckCircle size={14} /> Mark all as read
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(notifications).map(([group, items]) => (
            <div key={group}>
              <div className="px-5 py-2.5 bg-gray-50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800">
                <h4 className="text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                  {group}
                </h4>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-4 px-5 py-4 border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors ${item.unread ? "border-l-4 border-l-[#137fec]" : "pl-[23px]"}`}
                >
                  <div
                    className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center 
                    ${item.type === "primary" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : ""}
                    ${item.type === "error" ? "bg-red-50 dark:bg-red-900/20 text-red-600" : ""}
                    ${item.type === "warning" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600" : ""}
                    ${item.type === "info" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500" : ""}
                  `}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug">
                      {item.desc}
                    </p>
                    {item.actions && (
                      <div className="mt-2 flex gap-2">
                        <button className="px-3 py-1 bg-[#137fec] text-white text-[11px] font-bold rounded">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-[11px] font-bold rounded">
                          Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Empty State Mockup (Bottom) */}
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center opacity-60">
            <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 mb-3">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-gray-900 dark:text-white text-sm font-bold">
              You're all caught up
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
