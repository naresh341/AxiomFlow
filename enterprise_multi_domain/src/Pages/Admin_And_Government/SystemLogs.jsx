import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Copy,
  Database,
  History,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
// import { get_auditLogs } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import { get_auditLogs } from "../../RTKThunk/GovernanceThunk";

const SystemLogs = () => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0);
  const rows = 15;
  const menuStatus = useRef(null);
  // 1. Redux Integration
  const { loading, auditdata } = useSelector((state) => state.governance);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    status: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(get_auditLogs("SYSTEM")); // Assuming your thunk handles system type
  }, [dispatch]);

  const handleRowClick = (rowData) => {
    console.log("Row Clicked:", rowData.data);
    setSelectedLog(rowData.data);
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "DEBUG",
      command: () => setFilters((prev) => ({ ...prev, status: "DEBUG" })),
    },
    {
      label: "INFO",
      command: () => setFilters((prev) => ({ ...prev, status: "INFO" })),
    },
    {
      label: "WARNING",
      command: () => setFilters((prev) => ({ ...prev, status: "WARNING" })),
    },
    {
      label: "ERROR",
      command: () => setFilters((prev) => ({ ...prev, status: "ERROR" })),
    },
    {
      label: "CRITICAL",
      command: () => setFilters((prev) => ({ ...prev, status: "CRITICAL" })),
    },
  ];
  const filteredData = auditdata?.filter((item) => {
    const matchesStatus =
      filters.status === "All" || item.status?.toUpperCase() === filters.status;

    const matchesSearch =
      !searchQuery ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesStatus && matchesSearch;
  });
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="px-6 py-4 flex flex-wrap items-center  gap-4 border-b border-slate-200 dark:border-[#2d3a4b] bg-white dark:bg-[#0a1017] shrink-0">
        <div className="relative w-full max-w-lg group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec]"
            size={18}
          />
          <input
            className="w-full h-11 bg-slate-50 dark:bg-[#1c2632] border border-slate-300 dark:border-[#2d3a4b] rounded-xl pl-12 pr-4 text-sm focus:border-[#137fec] outline-none transition-all"
            placeholder="Search trace IDs, services, or errors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
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
      </div>

      <div className="flex flex-col lg:flex-row gap-8 grow">
        {/* Main Log Feed */}
        <section className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-white dark:bg-[#0d141c]">
            {loading ? (
              <>
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </>
            ) : (
              <DynamicTable
                tableData={filteredData}
                tableHead={TableSchemas.auditLogsSystem}
                first={first}
                rows={rows}
                loading={loading}
                handleRowClick={handleRowClick}
              />
            )}
            <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922] shrink-0">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredData?.length || 0}
                onPageChange={(e) => setFirst(e.first)}
              />
            </div>
          </div>

          {/* Table Footer */}
        </section>

        {/* Forensic Sidebar */}
        <aside className="w-full lg:w-[35%] flex flex-col gap-8 bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl p-8 shadow-2xl sticky top-28 h-fit">
          {selectedLog ? (
            <>
              <div className="p-4 border-b border-slate-200 dark:border-[#2d3a4b] flex items-center justify-between bg-slate-50 dark:bg-[#1c2632]/40">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-[#ef4444] animate-pulse"></div>
                  <h2 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Forensic Inspector
                  </h2>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(JSON.stringify(selectedLog))
                    }
                    className="p-2 hover:bg-slate-200 dark:hover:bg-[#2d3a4b] rounded-lg text-slate-400"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-[#2d3a4b] rounded-lg text-slate-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-8 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-white text-sm font-black uppercase ${selectedLog.severity === "Critical" ? "bg-[#ef4444]" : "bg-blue-500"}`}
                    >
                      {selectedLog.severity}
                    </span>
                    <span className="text-md text-slate-400 font-bold">
                      {selectedLog.correlationId || selectedLog.id}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    {selectedLog.event}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-slate-200 dark:border-[#2d3a4b] pl-4">
                    "
                    {selectedLog.summary ||
                      "No automated summary available for this event."}
                    "
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b]">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">
                      Environment
                    </p>
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-200">
                      <div className="size-2 rounded-full bg-[#137fec]"></div>{" "}
                      {selectedLog.env || "Production"}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b]">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">
                      Retry Status
                    </p>
                    <div className="flex items-center gap-2 font-bold text-[#ef4444]">
                      <RotateCcw size={14} />{" "}
                      {selectedLog.retries || "0 Attempts"}
                    </div>
                  </div>
                </div>

                {/* Propagation Trace */}
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                    <History size={14} /> Propagation Trace
                  </h4>
                  <div className="relative pl-8 space-y-8 before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-[#2d3a4b]">
                    <TraceNode
                      label="Ingress: Nginx Gateway"
                      time="T-minus 12ms"
                      status="200 OK"
                      color="bg-[#10b981]"
                      icon={<CheckCircle2 size={10} />}
                    />
                    <TraceNode
                      label={`Service: ${selectedLog.service}`}
                      time={selectedLog.timestamp}
                      status={selectedLog.status}
                      color="bg-[#ef4444]"
                      icon={<AlertCircle size={10} />}
                    />
                  </div>
                </div>

                {/* Raw Payload */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                      <Database size={14} /> Raw Payload
                    </h4>
                  </div>
                  <div className="rounded-2xl bg-[#0a0f14] p-6 text-[12px] border border-slate-800 shadow-2xl overflow-x-auto">
                    <pre className="text-slate-300 font-mono">
                      {JSON.stringify(
                        selectedLog.payload || selectedLog,
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-[#1c2632]/60 border-t border-slate-200 dark:border-[#2d3a4b] flex gap-4 shrink-0">
                <button className="flex-1 bg-[#137fec] hover:bg-[#137fec]/90 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all">
                  <RotateCcw size={18} /> Replay Event
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full   justify-center h-64 text-slate-400 animate-pulse">
              <ShieldCheck size={48} className="mb-4 text-blue-600" />
              <p className="font-black uppercase tracking-widest text-sm ">
                Select System Log...
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// Helper Component for the Trace Timeline
const TraceNode = ({ label, time, status, color, icon }) => (
  <div className="relative">
    <span
      className={`absolute -left-7 top-1 size-4 rounded-full ${color} ring-4 ring-white dark:ring-[#0e1620] flex items-center justify-center`}
    >
      {icon}
    </span>
    <div className="text-sm font-black text-slate-900 dark:text-slate-100">
      {label}
    </div>
    <div
      className={`text-[11px] font-bold ${color === "bg-[#ef4444]" ? "text-[#ef4444]" : "text-slate-500"}`}
    >
      {time} • {status}
    </div>
  </div>
);

export default SystemLogs;
