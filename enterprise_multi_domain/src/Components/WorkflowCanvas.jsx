import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react"; // Added useState
import { toast } from "react-hot-toast";
import WorkflowNode from "./WorkflowNode";

const nodeTypes = {
  workflowNode: WorkflowNode,
  // Make sure to add your conditionNode here if you created it!
};

// 1. MOCK DATA: This is the "Real Data" we will process
const testData = {
  price: 1200,
  customer: "John Doe",
  status: "pending",
};

const WorkflowCanvas = forwardRef((props, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const [activeNodeId, setActiveNodeId] = useState(null);

  const runRealSimulation = useCallback(async () => {
    // Find the first node (Trigger)
    const simulationToast = toast.loading("Starting simulation...");
    let currentNode = nodes.find((n) => !edges.find((e) => e.target === n.id));

    while (currentNode) {
      setActiveNodeId(currentNode.id); // Highlight current node

      // Update node data to show it's "Processing"
      setNodes((nds) =>
        nds.map((n) =>
          n.id === currentNode.id
            ? { ...n, data: { ...n.data, status: "processing" } }
            : n,
        ),
      );
      toast.loading(`Executing: ${currentNode.data.label}`, {
        id: simulationToast,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for visual effect

      let nextEdge;

      // --- THE REAL LOGIC STARTS HERE ---
      if (currentNode.data.label === "Condition") {
        // Evaluate the real data
        const isTrue = testData.price > 1000;
        const path = isTrue ? "true" : "false";

        toast(`Logic: Price (${testData.price}) > 1000 is ${isTrue}`, {
          icon: isTrue ? "✅" : "❌",
          duration: 2000,
        });

        // Find edge connected to the specific handle (true/false)
        nextEdge = edges.find(
          (e) => e.source === currentNode.id && e.sourceHandle === path,
        );
      } else {
        // Default: just find the next connected node
        nextEdge = edges.find((e) => e.source === currentNode.id);
      }

      // Clear processing status before moving on
      setNodes((nds) =>
        nds.map((n) =>
          n.id === currentNode.id
            ? { ...n, data: { ...n.data, status: "completed" } }
            : n,
        ),
      );

      if (nextEdge) {
        currentNode = nodes.find((n) => n.id === nextEdge.target);
      } else {
        currentNode = null;
      }
    }

    setActiveNodeId(null);
    toast.success("Workflow Execution Complete!", { id: simulationToast });
  }, [nodes, edges, setNodes]);

  useImperativeHandle(ref, () => ({
    startSimulation: () => {
      runRealSimulation();
    },
  }));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("nodeLabel");
      const desc = event.dataTransfer.getData("nodeDesc");
      const iconColor = event.dataTransfer.getData("nodeColor");

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label, description: desc, iconColor, activeNodeId: null }, // Pass activeNodeId to node
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <div className="flex-1 h-full w-full relative bg-[#f8fafc] dark:bg-[#0a1016]">
      {/* 4. RUN BUTTON: Hidden inside canvas for now, or trigger via Header */}
      <ReactFlow
        nodes={nodes.map((n) => ({
          ...n,
          data: { ...n.data, isActive: n.id === activeNodeId },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid={true}
        snapGrid={[20, 20]}
        fitView
      >
        <Background color="#283039" gap={24} variant="dots" />
        <Controls className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 fill-slate-600 dark:fill-slate-300" />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
});

export default WorkflowCanvas;
