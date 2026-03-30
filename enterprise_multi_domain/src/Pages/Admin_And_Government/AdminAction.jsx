import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Search,
  Link as LinkIcon,
  FileCode,
  Copy,
  CheckCircle2,
  ExternalLink,
  History,
  X,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import { TableSchemas } from "../../Utils/TableSchemas";
import Paginator from "../../Components/Paginator";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { Menu } from "primereact/menu";
import { get_auditLogs } from "../../RTKThunk/GovernanceThunk";

const AdminActions = () => {
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
  });
  const [page, setPage] = useState(1);
  const rows = 10;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { loading, auditdata, total } = useSelector(
    (state) => state.governance,
  );
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    dispatch(
      get_auditLogs({
        page,
        limit: rows,
        actor_type: "ADMIN",
        status: filters.status === "All" ? null : filters.status,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, page, filters.status, debouncedSearch]);


  const handleRowClick = (rowData) => {
    setSelectedLog(rowData.data);
  };

  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };
  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Success",
      command: () => setFilters((prev) => ({ ...prev, status: "SUCCESS" })),
    },
    {
      label: "Failed",
      command: () => setFilters((prev) => ({ ...prev, status: "FAILED" })),
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="relative flex-1 w-full group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#137fec] transition-colors"
            size={20}
          />
          <input
            className="w-full h-12 bg-white dark:bg-[#111820] border border-slate-300 dark:border-[#1f2937] rounded-xl pl-12 pr-4 text-lg focus:border-[#137fec] outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400"
            placeholder="Search Name..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <Menu
          model={statusItems}
          popup
          ref={menuStatus}
          id="status_menu"
          className="cursor-pointer p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-gray-900 w-48"
          pt={{
            list: { className: "flex flex-col gap-1" },
            action: {
              className:
                "hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg transition-colors p-3",
            },
            label: {
              className: "text-sm font-bold text-gray-700 dark:text-gray-200",
            },
          }}
        />

        {/* Status Filter Button */}
        <FilterButton
          label="Status"
          value={filters.status}
          isActive={filters.status !== "All"}
          icon={<ChevronDown size={14} />}
          onClick={(e) => menuStatus.current.toggle(e)}
        />
        {filters.status !== "All" && (
          <>
            <div className="flex items-center mb-3 ml-4">
              <button
                onClick={() =>
                  setFilters({
                    status: "All",
                  })
                }
                className="text-[#135bec] text-sm font-black uppercase tracking-tight hover:text-blue-700 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 grow">
        {/* Admin Logs Table */}
        <div className="w-full lg:w-[65%] bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            {loading ? (
              <>
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </>
            ) : (
              <DynamicTable
                tableData={auditdata}
                tableHead={TableSchemas.auditLogsUser}
                first={(page - 1) * rows}
                rows={rows}
                handleRowClick={handleRowClick}
              />
            )}
          </div>
          <div className="p-8 border-t border-slate-200 dark:border-[#1f2937] bg-slate-50/50 dark:bg-slate-900/10">
            <Paginator
              first={(page - 1) * rows}
              onPageChange={onPageChange}
              rows={rows}
              totalRecords={total}
            />
          </div>
        </div>

        {/* Forensic Detail Sidebar */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-8 bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl p-8 shadow-2xl sticky top-28 h-fit">
          {selectedLog ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1f2937] pb-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={28} className="text-[#137fec]" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Forensic Details
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  ID: {selectedLog.id?.toString().slice(0, 12)}
                </span>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <History size={16} /> Reason for Change
                  </label>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-[#1f2937] italic text-slate-800 dark:text-slate-200 text-lg leading-relaxed shadow-sm">
                    "
                    {selectedLog.description ||
                      selectedLog.reason ||
                      "No description provided for this action."}
                    "
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <FileCode size={16} /> Configuration Diff
                  </label>
                  <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm leading-8 border border-slate-800 overflow-hidden shadow-inner">
                    {selectedLog.diff ? (
                      selectedLog.diff.map((item, index) => (
                        <div key={index} className="flex gap-6">
                          <span className="text-slate-600 w-8 select-none font-bold">
                            {item.line}
                          </span>
                          <span
                            className={`flex-1 rounded px-2 ${
                              item.type === "added"
                                ? "bg-green-500/20 text-green-400"
                                : item.type === "removed"
                                  ? "bg-red-500/20 text-red-400 line-through opacity-60"
                                  : "text-slate-400"
                            }`}
                          >
                            {item.content}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-2">
                        <div className="text-red-400 bg-red-500/10 px-2 rounded">
                          - {JSON.stringify(selectedLog.old_values || {})}
                        </div>
                        <div className="text-green-400 bg-green-500/10 px-2 rounded">
                          + {JSON.stringify(selectedLog.new_values || {})}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <LinkIcon size={16} /> Approval Reference
                  </label>
                  <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900/50 border-2 border-slate-100 dark:border-[#1f2937] rounded-2xl group hover:border-[#137fec] transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="bg-[#137fec]/10 p-3 rounded-xl text-[#137fec]">
                        <ExternalLink size={24} />
                      </div>
                      <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                        {selectedLog.approval_ref ||
                          selectedLog.approvalRef ||
                          "N/A"}
                      </span>
                    </div>
                    <button className="text-xs font-black text-[#137fec] uppercase tracking-widest group-hover:underline">
                      View Ticket
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-8 border-t border-slate-100 dark:border-[#1f2937] flex gap-4">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(selectedLog, null, 2),
                    )
                  }
                  className="flex-1 py-5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl"
                >
                  <Copy size={20} /> Copy JSON
                </button>
                <button className="flex-1 py-5 bg-white text-slate-900 rounded-2xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-100 transition-all border-2 border-slate-200 dark:border-transparent shadow-xl">
                  <CheckCircle2 size={20} /> Verify
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full   justify-center h-64 text-slate-400 animate-pulse">
              <ShieldCheck size={48} className="mb-4 text-blue-600" />
              <p className="font-black uppercase tracking-widest text-sm ">
                Select Audit Log...
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default AdminActions;
