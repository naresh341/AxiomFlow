import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Search,
  Waypoints,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateTaskModal from "../Components/CreateTaskModal";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("My Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasks = [
    {
      id: "T-101",
      name: "Quarterly Financial Audit",
      status: "In Progress",
      priority: "High",
      assignee: {
        name: "John Doe",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      dueDate: "Oct 24, 2023",
      source: "Finance Workflow",
      workflowId: "WF-9921",
    },
    {
      id: "T-102",
      name: "Compliance Document Review",
      status: "In Progress",
      priority: "Med",
      assignee: {
        name: "Sarah Smith",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      dueDate: "Oct 25, 2023",
      source: "Legal Workflow",
      workflowId: "WF-8842",
    },
    {
      id: "T-103",
      name: "Onboarding Package Setup",
      status: "Completed",
      priority: "Low",
      assignee: {
        name: "Mike Ross",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      dueDate: "Oct 20, 2023",
      source: "Manual",
      workflowId: null,
    },
    {
      id: "T-104",
      name: "Vendor Security Assessment",
      status: "Overdue",
      priority: "High",
      assignee: {
        name: "Emily Chen",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
      dueDate: "Oct 22, 2023",
      source: "IT Security Workflow",
      workflowId: "WF-7731",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f6f6f8] dark:bg-[#101622] min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-[#101622] border-b border-[#dbdfe6] dark:border-gray-800">
        <div className=" mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-[#111318] dark:text-white text-3xl font-black tracking-tight">
              Tasks Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Track and manage your enterprise operations
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f0f2f4] dark:bg-gray-800 text-[#111318] dark:text-white rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
              <Download size={18} /> Export
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              <Plus size={18} /> New Task
            </button>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className=" w-full mx-auto px-6 mt-6">
        <div className="bg-white dark:bg-[#101622] rounded-2xl shadow-sm border border-[#dbdfe6] dark:border-gray-800 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-[#dbdfe6] dark:border-gray-800 px-6 flex gap-8">
            {["My Tasks", "Due Today", "Overdue"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 pt-5 text-sm font-black transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters Area */}
          <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-transparent">
            <div className="flex-1 max-w-md relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {["Status", "Priority", "Assignee"].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-50"
                >
                  {filter} <ChevronRight size={14} className="rotate-90" />
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-y border-slate-200 dark:border-gray-800">
                  <th className="px-6 py-4">Task Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                            task.status === "Completed"
                              ? "bg-green-500 border-green-500"
                              : "border-slate-300 group-hover:border-blue-600"
                          }`}
                        >
                          {task.status === "Completed" && (
                            <Check size={14} className="text-white font-bold" />
                          )}
                        </div>
                        <p
                          className={`text-sm font-bold ${task.status === "Completed" ? "text-slate-400 line-through" : "text-slate-900 dark:text-white"}`}
                        >
                          {task.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            task.status === "Completed"
                              ? "bg-green-500"
                              : task.status === "Overdue"
                                ? "bg-red-500"
                                : "bg-blue-600"
                          }`}
                        ></span>
                        <span
                          className={`text-xs font-bold ${
                            task.status === "Completed"
                              ? "text-green-600"
                              : task.status === "Overdue"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                            : task.priority === "Med"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30"
                              : "bg-slate-100 text-slate-700 dark:bg-gray-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={task.assignee.img}
                          className="w-7 h-7 rounded-full bg-slate-200"
                          alt="avatar"
                        />
                        <span className="text-sm font-bold">
                          {task.assignee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${task.status === "Overdue" ? "text-red-600" : "text-slate-500"}`}
                      >
                        {task.dueDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {task.workflowId ? (
                        <Link
                          to={`/workflows/${task.workflowId}`}
                          className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Waypoints size={14} />
                          {task.source}
                        </Link>
                      ) : (
                        <span className="text-sm text-slate-400 font-medium italic">
                          {task.source}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between bg-slate-50/30">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing 4 of 24 tasks
            </p>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-white transition-all">
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-white transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Tasks;
