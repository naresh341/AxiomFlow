import { ReactFlowProvider } from "@xyflow/react";
import { Layers, Play, Save } from "lucide-react";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PropertiesPanel from "../../Components/PropertiesPanel";
import SidebarWorkflowBuilder from "../../Components/SidebarWorkflowBuilder";
import WorkflowCanvas from "../../Components/WorkflowCanvas";
import { createWorkflow } from "../../RTKThunk/WorkflowThunk";
// import { createWorkflow } from "../../RTKThunk/AsyncThunk";
const WorkflowBuilder = () => {
  const canvasRef = useRef();
  const [showNodesMobile, setShowNodesMobile] = useState(false);
  const [showInspectorMobile, setShowInspectorMobile] = useState(false);

  const handleTestRun = () => {
    if (canvasRef.current) {
      canvasRef.current.startSimulation();
    }
  };

  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state) => state.workflows);

  const handlePublishClick = () => {
    const flowData = {
      name: "New Procurement Flow",
      trigger: "manual",
      owner_id: 1, 
      definition: { nodes, edges },
    };
    dispatch(createWorkflow(flowData));
  };

  return (
    <div className="flex flex-col h-screen bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      {/* --- Header --- */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] px-4 sm:px-6 flex items-center justify-between z-30 gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-lg tracking-tight truncate max-w-[150px] sm:max-w-none">
                Procurement Flow
              </h1>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] sm:text-[13px] font-bold text-slate-500">
                v4.0
              </span>
            </div>
            <p className="text-[12px] text-slate-500 hidden sm:block">Last saved 2m ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleTestRun}
            className="
        group relative cursor-pointer flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 
    text-xs sm:text-sm font-bold tracking-tight
    bg-white dark:bg-slate-900 
    text-slate-700 dark:text-slate-200
    border border-slate-200 dark:border-slate-800
    rounded-xl shadow-lg
    hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/20
    hover:text-blue-600 dark:hover:text-blue-400
    transition-all duration-200 active:scale-[0.96]
  "
          >
            <Play
              size={14}
              className="transition-transform group-hover:scale-110 group-hover:fill-blue-600/10"
              fill="none"
            />
            <span>Test Run</span>
          </button>
          <button
            onClick={handlePublishClick}
            className="cursor-pointer flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold bg-[#137fec] text-white rounded-lg hover:bg-blue-600 transition-shadow shadow-lg shadow-blue-500/20"
          >
            <Save size={14} /> Publish
          </button>
        </div>
      </header>

      {/* Mobile Floating Action Toggles for Node Palette & Inspector */}
      <div className="lg:hidden absolute bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setShowNodesMobile((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5"
        >
          <Layers size={14} /> {showNodesMobile ? "Hide Palette" : "Node Palette"}
        </button>
        <button
          onClick={() => setShowInspectorMobile((prev) => !prev)}
          className="px-4 py-2 bg-slate-800 text-white rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 border border-slate-700"
        >
          {showInspectorMobile ? "Hide Inspector" : "Inspector"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <ReactFlowProvider>
          {/* Node Palette (Sidebar) */}
          <div
            className={`
              fixed lg:static top-16 bottom-0 left-0 z-30
              bg-white dark:bg-[#101922] transition-transform duration-300
              ${showNodesMobile ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0 w-64"}
            `}
          >
            <SidebarWorkflowBuilder />
          </div>

          <main className="flex-1 relative h-full w-full">
            <WorkflowCanvas ref={canvasRef} />
          </main>

          {/* Properties Inspector Panel */}
          <aside
            className={`
              fixed lg:static top-16 bottom-0 right-0 z-30
              w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922] transition-transform duration-300
              ${showInspectorMobile ? "translate-x-0 shadow-2xl" : "translate-x-full lg:translate-x-0"}
            `}
          >
            <PropertiesPanel />
          </aside>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
