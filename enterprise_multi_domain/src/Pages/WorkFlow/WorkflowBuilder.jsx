import {
  ChevronDown,
  Clock,
  Info,
  Layers,
  Minus,
  MousePointer2,
  Play,
  Plus,
  Save,
  Send,
  Shield,
  ShieldCheck,
  Split,
  Target,
  Terminal,
  X,
  Zap,
} from "lucide-react";

// --- Utility: Bezier Curve Path Generator ---
const WorkflowEdge = ({ start, end, active = false }) => {
  // Calculates a smooth curve between two points
  const controlPointX = start.x + (end.x - start.x) / 2;
  const d = `M ${start.x} ${start.y} C ${controlPointX} ${start.y}, ${controlPointX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={active ? "#137fec" : "#334155"}
      strokeWidth="2.5"
      strokeDasharray={active ? "none" : "5,5"}
      className={
        active ? "drop-shadow-[0_0_8px_rgba(19,127,236,0.4)]" : "opacity-40"
      }
    />
  );
};

const WorkflowBuilder = () => {
  //   const [selectedNode, setSelectedNode] = useState("manager-approval");

  return (
    <div className="flex flex-col h-screen bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* --- Header --- */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary rounded-lg text-white">
            <Layers size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-tight">
                Procurement Approval Flow
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500">
                v4.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Last saved 2m ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Play size={16} /> Test Run
          </button>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-[#137fec] text-white rounded-lg hover:bg-blue-600 transition-shadow shadow-lg shadow-blue-500/20">
            <Save size={16} /> Publish
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* --- Left Sidebar: Node Library --- */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] p-4 z-20 overflow-y-auto">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            Node Library
          </h3>

          <div className="space-y-6">
            <section>
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
                <Zap size={14} /> Triggers
              </h4>
              <div className="space-y-2">
                <LibraryItem
                  icon={<MousePointer2 size={14} />}
                  title="Manual Trigger"
                  desc="Starts on user click"
                />
                <LibraryItem
                  icon={<Clock size={14} />}
                  title="Scheduled"
                  desc="Runs on a timer"
                />
              </div>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
                <Split size={14} /> Logic
              </h4>
              <div className="space-y-2">
                <LibraryItem
                  icon={<Terminal size={14} className="text-orange-500" />}
                  title="If / Else"
                  desc="Condition branching"
                />
              </div>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3">
                <Shield size={14} /> Actions
              </h4>
              <div className="space-y-2">
                <LibraryItem
                  icon={<ShieldCheck size={14} className="text-emerald-500" />}
                  title="Approval"
                  desc="Human verification"
                  color="bg-emerald-500/10"
                />
                <LibraryItem
                  icon={<Send size={14} className="text-purple-500" />}
                  title="Slack Alert"
                  desc="Messaging notification"
                  color="bg-purple-500/10"
                />
              </div>
            </section>
          </div>
        </aside>

        {/* --- Center: Visual Canvas --- */}
        <main className="flex-1 relative bg-[#f8fafc] dark:bg-[#0a1016] overflow-hidden">
          {/* SVG Background Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #283039 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Connection Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Trigger to Condition */}
            <WorkflowEdge
              start={{ x: 232, y: 350 }}
              end={{ x: 340, y: 350 }}
              active={true}
            />
            {/* Condition to Approval (True Branch) */}
            <WorkflowEdge
              start={{ x: 532, y: 310 }}
              end={{ x: 660, y: 200 }}
              active={true}
            />
            {/* Condition to Notification (False Branch) */}
            <WorkflowEdge
              start={{ x: 532, y: 390 }}
              end={{ x: 660, y: 500 }}
              active={false}
            />
          </svg>

          {/* Nodes Container */}
          <div className="relative w-full h-full p-20 flex items-center justify-center">
            {/* Node: Trigger */}
            <NodeWrapper
              x={40}
              y={300}
              title="Manual Trigger"
              icon={<MousePointer2 className="text-blue-500" />}
            >
              <p className="text-[10px] text-slate-500 mt-1 italic">
                Initiate Procurement
              </p>
              <Port position="right" />
            </NodeWrapper>

            {/* Node: Logic Condition */}
            <NodeWrapper
              x={340}
              y={300}
              title="Amount Check"
              icon={<Terminal className="text-orange-500" />}
            >
              <div className="mt-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded text-[10px] font-mono text-orange-500">
                amount &gt; $5,000
              </div>
              <Port position="left" />
              <div className="absolute -right-6 top-4 text-[9px] font-bold text-blue-500">
                TRUE
              </div>
              <Port position="right" yOffset="25%" />
              <div className="absolute -right-7 bottom-4 text-[9px] font-bold text-slate-400">
                FALSE
              </div>
              <Port position="right" yOffset="75%" active={false} />
            </NodeWrapper>

            {/* Node: Approval (Selected) */}
            <div
              className={`absolute left-[660px] top-[100px] w-60 bg-white dark:bg-slate-800 border-2 rounded-xl p-4 shadow-2xl transition-all cursor-pointer ring-4 ring-blue-500/20 border-blue-500 scale-105`}
              onClick={() => setSelectedNode("manager-approval")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold tracking-tight">
                    Manager Approval
                  </span>
                </div>
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Assignment</span>
                  <span className="font-bold text-blue-500">Finance Lead</span>
                </div>
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-2/3" />
                </div>
              </div>
              <Port position="left" />
            </div>

            {/* Node: Slack Notification */}
            <NodeWrapper
              x={660}
              y={450}
              title="Slack Alert"
              icon={<Send size={16} className="text-purple-500" />}
              opacity="opacity-50"
            >
              <p className="text-[10px] text-slate-500 mt-1 italic">
                Under limit notification
              </p>
              <Port position="left" active={false} />
            </NodeWrapper>
          </div>

          {/* Floating Canvas Controls */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-xl">
              <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700 transition-colors">
                <Plus size={18} />
              </button>
              <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-200 dark:border-slate-700 transition-colors">
                <Minus size={18} />
              </button>
              <button className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <Target size={18} />
              </button>
            </div>
          </div>
        </main>

        {/* --- Right Sidebar: Config Panel --- */}
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] z-20 flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">Node Properties</h3>
              <p className="text-[10px] text-slate-500">Manager Approval</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Assign Approver
              </label>
              <div className="relative">
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Finance Manager</option>
                  <option>Regional VP</option>
                  <option>Department Head</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                SLA Timeout
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  defaultValue="24"
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 text-sm outline-none">
                  <option>Hours</option>
                  <option>Days</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-bold italic">Auto-Escalation</h4>
                  <p className="text-[10px] text-slate-500">
                    Move to next level on timeout
                  </p>
                </div>
                <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 size-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg flex gap-3">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-blue-500/80">
                  Requires mandatory receipt upload if the procurement amount
                  exceeds $10,000.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors">
              Delete Node
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const LibraryItem = ({
  icon,
  title,
  desc,
  color = "bg-slate-100 dark:bg-slate-800",
}) => (
  <div
    className={`p-3 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 cursor-grab hover:border-blue-500 transition-colors bg-white dark:bg-slate-900 shadow-sm`}
  >
    <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-xs font-bold leading-none">{title}</p>
      <p className="text-[10px] text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

const NodeWrapper = ({
  x,
  y,
  title,
  icon,
  children,
  opacity = "opacity-100",
}) => (
  <div
    className={`absolute w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg hover:border-blue-500 transition-colors ${opacity}`}
    style={{ left: x, top: y }}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs font-bold tracking-tight">{title}</span>
    </div>
    {children}
  </div>
);

const Port = ({ position, yOffset = "50%", active = true }) => {
  const styles = {
    left: { left: "-6px", top: yOffset },
    right: { right: "-6px", top: yOffset },
  };

  return (
    <div
      className={`absolute size-3 rounded-full border-2 border-white dark:border-slate-800 transition-colors ${active ? "bg-[#137fec]" : "bg-slate-500 opacity-50"}`}
      style={styles[position]}
    />
  );
};

export default WorkflowBuilder;
