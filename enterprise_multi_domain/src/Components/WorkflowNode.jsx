import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const WorkflowNode = ({ data, selected }) => {
  // Extract our new simulation states from data
  const { isActive, status } = data;

  return (
    <div
      className={`w-60 bg-white dark:bg-slate-800 border-2 rounded-xl p-4 shadow-xl transition-all duration-500 relative ${
        isActive
          ? "border-blue-500 ring-4 ring-blue-500/40 scale-105 z-50 bg-blue-50/50 dark:bg-blue-900/20"
          : selected
            ? "border-blue-500 ring-4 ring-blue-500/20"
            : "border-slate-200 dark:border-slate-700"
      }`}
    >
      {/* Simulation Badge */}
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-[8px] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse shadow-lg">
          Executing
        </div>
      )}

      {/* Target Handle (Input) */}
      <Handle
        type="target"
        position={Position.Left}
        className="size-3! bg-[#137fec]! border-2! border-white! dark:border-slate-800!"
      />

      <div className="flex items-center gap-2 mb-2">
        <div
          className={`p-1.5 rounded-lg transition-colors ${
            isActive
              ? "bg-blue-500 text-white"
              : "bg-slate-100 dark:bg-slate-700"
          }`}
        >
          {data.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight">{data.label}</span>
          {status === "completed" && (
            <span className="text-[8px] text-emerald-500 font-bold uppercase">
              ● Success
            </span>
          )}
        </div>
      </div>

      {data.description && (
        <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
          {data.description}
        </p>
      )}

      {/* Source Handle (Output) */}
      <Handle
        type="source"
        position={Position.Right}
        className="size-3! bg-[#137fec]! border-2! border-white! dark:border-slate-800!"
      />
    </div>
  );
};

export default memo(WorkflowNode);
