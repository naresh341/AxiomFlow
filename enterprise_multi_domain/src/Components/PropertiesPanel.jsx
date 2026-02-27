import { useNodes, useReactFlow } from "@xyflow/react";
import { ChevronDown, Info, X } from "lucide-react";
import { useMemo } from "react";

const PropertiesPanel = () => {
  const nodes = useNodes();
  const { setNodes, setEdges } = useReactFlow();
  const selectedNode = useMemo(
    () => nodes.find((node) => node.selected),
    [nodes],
  );

  if (!selectedNode) {
    return (
      <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] flex items-center justify-center p-8 text-center">
        <div className="text-slate-400">
          <p className="text-sm">No node selected</p>
          <p className="text-[10px]">Select a node to edit its properties</p>
        </div>
      </aside>
    );
  }

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, label: newLabel },
          };
        }
        return node;
      }),
    );
  };

  const onDelete = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id,
      ),
    );
  };
  return (
    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] z-20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-tight">
            Node Properties
          </h3>
          <p className="text-[10px] text-blue-500 font-medium">
            {selectedNode.data.label}
          </p>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Display Name
          </label>
          <input
            type="text"
            value={selectedNode.data.label || ""}
            onChange={handleLabelChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Example Conditional Logic for "Approval" nodes */}
        {selectedNode.data.label === "Approval" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Assign Approver
              </label>
              <div className="relative">
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm appearance-none outline-none">
                  <option>Finance Manager</option>
                  <option>Regional VP</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-3 text-slate-400"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg flex gap-3">
              <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed text-blue-500/80">
                This node requires manual verification before the workflow
                proceeds.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={onDelete}
          className="w-full py-2.5 bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
        >
          Delete Node
        </button>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
