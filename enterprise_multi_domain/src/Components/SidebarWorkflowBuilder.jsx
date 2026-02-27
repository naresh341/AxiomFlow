import {
  Clock,
  MousePointer2,
  Send,
  Shield,
  ShieldCheck,
  Split,
  Terminal,
  Zap,
} from "lucide-react";

const SidebarWorkflowBuilder = () => {
  const onDragStart = (event, nodeType, label, description, iconColor) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("nodeLabel", label);
    event.dataTransfer.setData("nodeDesc", description);
    event.dataTransfer.setData("nodeColor", iconColor);

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] p-4 flex flex-col overflow-y-auto">
      <h3 className="text-[15px] font-black uppercase tracking-widest text-slate-600 mb-6">
        Node Library
      </h3>

      <div className="space-y-6">
        <section>
          <h4 className="flex items-center gap-2 text-md font-bold text-slate-500 mb-3">
            <Zap size={14} /> Triggers
          </h4>
          <div className="space-y-2">
            <LibraryItem
              icon={<MousePointer2 size={14} />}
              title="Manual Trigger"
              desc="Starts on user click"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Manual Trigger",
                  "User initiated",
                  "text-blue-500",
                )
              }
            />
          </div>
        </section>

        <section>
          <h4 className="flex items-center gap-2 text-md font-bold text-slate-500 mb-3">
            <Split size={14} /> Logic
          </h4>
          <div className="space-y-2">
            <LibraryItem
              icon={<Terminal size={14} className="text-orange-500" />}
              title="Condition"
              desc="If / Else branching"
              color="bg-orange-500/10"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "conditionNode",
                  "Check Value",
                  "If x > y",
                  "text-orange-500",
                )
              }
            />
          </div>
        </section>

        <section>
          <h4 className="flex items-center gap-2 text-md font-bold text-slate-500 mb-3">
            <Shield size={14} /> Actions
          </h4>
          <div className="space-y-2">
            <LibraryItem
              icon={<ShieldCheck size={14} className="text-emerald-500" />}
              title="Approval"
              desc="Human verification"
              color="bg-emerald-500/10"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Approval",
                  "Pending manager",
                  "text-emerald-500",
                )
              }
            />
            <LibraryItem
              icon={<Send size={14} className="text-purple-500" />}
              title="Slack Alert"
              desc="Messaging notification"
              color="bg-purple-500/10"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Slack Alert",
                  "Notification sent",
                  "text-purple-500",
                )
              }
            />
          </div>
        </section>

        {/* --- Events Section --- */}
        <section>
          <h4 className="flex items-center gap-2 text-md font-bold text-slate-500 mb-3">
            <Clock size={14} /> Events
          </h4>
          <div className="space-y-2">
            <LibraryItem
              icon={<Clock size={14} className="text-blue-400" />}
              title="Delay"
              desc="Wait for a specific time"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Delay",
                  "Wait 30 mins",
                  "text-blue-400",
                )
              }
            />
          </div>
        </section>

        {/* --- Integration Section --- */}
        <section className="mt-6">
          <h4 className="flex items-center gap-2 text-md font-bold text-slate-500 mb-3">
            <Terminal size={14} /> Integrations
          </h4>
          <div className="space-y-2">
            <LibraryItem
              icon={<Zap size={14} className="text-yellow-500" />}
              title="Webhook"
              desc="Receive external data"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Webhook",
                  "HTTP POST Listener",
                  "text-yellow-500",
                )
              }
            />
            <LibraryItem
              icon={<Send size={14} className="text-pink-500" />}
              title="Email"
              desc="Send via SMTP"
              onDragStart={(e) =>
                onDragStart(
                  e,
                  "workflowNode",
                  "Email",
                  "Send report",
                  "text-pink-500",
                )
              }
            />
          </div>
        </section>
      </div>
    </aside>
  );
};

const LibraryItem = ({
  icon,
  title,
  desc,
  color = "bg-slate-100 dark:bg-slate-800",
  onDragStart,
}) => (
  <div
    draggable
    onDragStart={onDragStart}
    className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 cursor-grab hover:border-blue-500 active:scale-95 transition-all bg-white dark:bg-slate-900 shadow-sm"
  >
    <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-bold leading-none">{title}</p>
      <p className="text-[13px] text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

export default SidebarWorkflowBuilder;
