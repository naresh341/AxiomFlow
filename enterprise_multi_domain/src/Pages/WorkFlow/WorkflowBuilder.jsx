import { ReactFlowProvider } from "@xyflow/react";
import { Layers, Play, Save } from "lucide-react";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PropertiesPanel from "../../Components/PropertiesPanel";
import SidebarWorkflowBuilder from "../../Components/SidebarWorkflowBuilder";
import WorkflowCanvas from "../../Components/WorkflowCanvas";
import { createWorkflow } from "../../RTKThunk/WorkflowThunk";
// import { createWorkflow } from "../../RTKThunk/AsyncThunk";
const WorkflowBuilder = () => {
  const canvasRef = useRef();

  const handleTestRun = () => {
    if (canvasRef.current) {
      canvasRef.current.startSimulation();
    }
  };

  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.workflows);

  const handlePublishClick = () => {
    // 2. Construct the data object to match your Python Schema
    const flowData = {
      name: "New Procurement Flow",
      trigger: "manual",
      owner_id: 1, // Replace with actual user ID later
      definition: { nodes, edges },
    };
    console.log("Payload to be sent:", flowData);
    // 3. Dispatch the action
    dispatch(createWorkflow(flowData));
  };

  return (
    <div className="flex flex-col h-screen bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      {/* --- Header --- */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Layers size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight">
                Procurement Approval Flow
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[13px] font-bold text-slate-500">
                v4.0
              </span>
            </div>
            <p className="text-[14px] text-slate-500">Last saved 2m ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleTestRun}
            className="
        group relative cursor-pointer flex items-center gap-2 px-5 py-2.5 
    text-sm font-bold tracking-tight
    bg-white dark:bg-slate-900 
    text-slate-700 dark:text-slate-200
    border border-slate-200 dark:border-slate-800
    rounded-xl shadow-lg
    hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/20
    hover:text-blue-600 dark:hover:text-blue-400
    transition-all duration-200 active:scale-[0.96] active:bg-slate-50
  "
          >
            {/* The Icon with a slight animation */}
            <Play
              size={16}
              className="transition-transform group-hover:scale-110 group-hover:fill-blue-600/10"
              fill="none"
            />

            <span>Test Run</span>
          </button>
          <button
            onClick={handlePublishClick}
            className="cursor-pointer flex items-center  gap-2 px-5 py-2 text-sm font-bold bg-[#137fec] text-white rounded-lg hover:bg-blue-600 transition-shadow shadow-lg shadow-blue-500/20"
          >
            <Save size={16} /> Publish
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ReactFlowProvider>
          <SidebarWorkflowBuilder />
          <main className="flex-1 relative">
            <WorkflowCanvas ref={canvasRef} />
          </main>
          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922]">
            <PropertiesPanel />
          </aside>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
