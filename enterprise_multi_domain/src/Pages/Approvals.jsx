import { Download, Filter } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Approvals = () => {
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const isActive = (path) => {
    if (path === "/approvals" && location.pathname === "/approvals")
      return true;
    return location.pathname === `/approvals/${path}`;
  };

  const isPendingPage = isActive("/approvals");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f6f6f8] dark:bg-[#101622] overflow-hidden">
      <div
        className={`flex justify-between items-end px-10 pt-8 mb-6 transition-all duration-300 ease-in-out 
          ${isPendingPage && isDrawerOpen ? "mr-105" : "mr-0"}`}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111318] dark:text-white text-3xl font-black tracking-tight">
            Approvals
          </h1>
          <p className="text-[#616f89] dark:text-gray-400 text-base">
            Review and act on workflow approval requests
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <Filter size={18} /> <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <Download size={18} /> <span>Export</span>
          </button>
        </div>
      </div>

      <div
        className={`px-10 mb-4 transition-all duration-300 ${isPendingPage && isDrawerOpen ? "mr-105" : "mr-0"}`}
      >
        <div className="flex border-b border-[#dbdfe6] dark:border-gray-800 gap-8">
          <Link
            to="/approvals"
            className={`pb-3 pt-4 text-sm font-bold transition-all border-b-[3px] ${isPendingPage ? "border-[#135bec] text-[#135bec]" : "border-transparent text-gray-500"}`}
          >
            Pending Approvals
          </Link>
          <Link
            to="/approvals/history"
            className={`pb-3 pt-4 text-sm font-bold transition-all border-b-[3px] ${isActive("history") ? "border-[#135bec] text-[#135bec]" : "border-transparent text-gray-500"}`}
          >
            Approval History
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet context={{ isDrawerOpen, setIsDrawerOpen }} />
      </div>
    </div>
  );
};

export default Approvals;
