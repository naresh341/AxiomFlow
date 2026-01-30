import {
  AlertCircle,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  History,
  RotateCcw,
  Search,
  Share2,
  X,
} from "lucide-react";
import { useState } from "react";

const SystemLogs = () => {
  const [logs] = useState([
    {
      id: "550e8400-e29b",
      timestamp: "2023-10-27 10:14:02.001",
      service: "Auth-Service",
      event: "Token Validation Failed",
      severity: "Critical",
      correlationId: "550e8400-e29b",
      status: "Failed",
      summary:
        "Identity provider (Azure AD) returned 503 Service Unavailable during OIDC handshake.",
      env: "Production",
      retries: "3 Attempts",
      payload: {
        timestamp: "2023-10-27T10:14:02Z",
        level: "CRITICAL",
        service: "auth-gateway-v2",
        trace_id: "ax-9912-bb2",
        context: {
          user_id: "usr_88219",
          ip: "192.168.1.42",
          region: "us-east-1",
        },
        exception: {
          type: "TokenValidationError",
          stack:
            "at azure.oidc.validate(line 412)\n at auth.verify(line 98)...",
        },
      },
    },
    {
      id: "f47ac10b-58cc",
      timestamp: "2023-10-27 10:14:05.112",
      service: "Workflow-Engine",
      event: "DB Connection Timeout",
      severity: "Error",
      correlationId: "f47ac10b-58cc",
      status: "Retrying",
      summary:
        "Primary PostgreSQL cluster in us-east-1a not responding to health checks.",
      env: "Production",
      retries: "1 Attempt",
      payload: { status: "pending", target: "db-cluster-01" },
    },
  ]);

  const [selectedLog, setSelectedLog] = useState(logs[0]);

  // Forensic Color Mapping
  const getSeverityStyles = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-[#ef4444] text-white border-[#ef4444]";
      case "error":
        return "bg-[#fee2e2] dark:bg-[#ef4444]/10 text-[#b91c1c] dark:text-[#f87171] border-[#fecaca] dark:border-[#ef4444]/20";
      case "warning":
        return "bg-[#fef3c7] dark:bg-[#fbbf24]/10 text-[#b45309] dark:text-[#fbbf24] border-[#fde68a] dark:border-[#fbbf24]/20";
      default:
        return "bg-[#dbeafe] dark:bg-[#137fec]/10 text-[#1e40af] dark:text-[#60a5fa] border-[#bfdbfe] dark:border-[#137fec]/20";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 ">
      {/* Search & Filter Header */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-[#2d3a4b] bg-white dark:bg-[#0a1017] shrink-0">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#1c2632] border border-slate-300 dark:border-[#2d3a4b] text-sm font-bold transition-all hover:border-[#137fec]">
            <Calendar size={16} className="text-[#137fec]" />
            <span>Last 24 Hours</span>
          </button>

          <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-[#101922] border border-slate-200 dark:border-[#2d3a4b] rounded-xl">
            <span className="text-[10px] uppercase font-black text-slate-400 px-2 tracking-widest">
              Filters:
            </span>
            <button className="px-3 py-1 rounded-lg text-[11px] font-black bg-[#ef4444] text-white shadow-lg shadow-red-500/20">
              CRITICAL
            </button>
            <button className="px-3 py-1 rounded-lg text-[11px] font-black  text-slate-500 hover:text-[#137fec]">
              ERROR
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-lg group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors"
            size={18}
          />
          <input
            className="w-full h-11 bg-slate-50 dark:bg-[#1c2632] border border-slate-300 dark:border-[#2d3a4b] rounded-xl pl-12 pr-4 text-sm focus:border-[#137fec] focus:ring-4 focus:ring-[#137fec]/10 outline-none transition-all"
            placeholder="Search trace IDs, services, or errors..."
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Log Feed */}
        <section className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-white dark:bg-[#0d141c]">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 bg-slate-50 dark:bg-[#151d27] z-20 border-b border-slate-200 dark:border-[#2d3a4b]">
                <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3a4b]">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3a4b]">
                    Service
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3a4b]">
                    Event
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3a4b]">
                    Severity
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3a4b] text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className=" text-[12px]">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`group cursor-pointer transition-all ${
                      selectedLog?.id === log.id
                        ? "bg-[#137fec]/5 dark:bg-[#ef4444]/5 border-l-4 border-l-[#137fec] dark:border-l-[#ef4444]"
                        : "border-l-4 border-l-transparent hover:bg-slate-50 dark:hover:bg-[#1c2632]"
                    }`}
                  >
                    <td className="px-6 py-4 text-slate-400 border-b border-slate-100 dark:border-[#2d3a4b]/30">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100 dark:border-[#2d3a4b]/30">
                      <span className="px-2 py-1 rounded bg-slate-100 dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b] text-slate-700 dark:text-slate-300 font-bold">
                        {log.service}
                      </span>
                    </td>
                    <td className="px-6 py-4  font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-[#2d3a4b]/30">
                      {log.event}
                    </td>
                    <td className="px-6 py-4 border-b border-slate-100 dark:border-[#2d3a4b]/30">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-black uppercase text-[10px] border ${getSeverityStyles(log.severity)}`}
                      >
                        {log.severity === "Critical" && (
                          <AlertOctagon size={12} />
                        )}
                        {log.severity}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-black border-b border-slate-100 dark:border-[#2d3a4b]/30 ${
                        log.status === "Failed"
                          ? "text-[#ef4444]"
                          : "text-[#fbbf24]"
                      }`}
                    >
                      {log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922] flex items-center justify-between shrink-0">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Live Node: US-EAST-01 • 4.2k eps
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-slate-300 dark:border-[#2d3a4b] hover:bg-white dark:hover:bg-[#1c2632] text-slate-500">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 rounded-lg border border-slate-300 dark:border-[#2d3a4b] hover:bg-white dark:hover:bg-[#1c2632] text-slate-500">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Forensic Sidebar */}
        <aside className="w-120 border-l border-slate-200 dark:border-[#2d3a4b] bg-white dark:bg-[#0e1620] flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-200 dark:border-[#2d3a4b] flex items-center justify-between bg-slate-50 dark:bg-[#1c2632]/40">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-[#ef4444] animate-pulse"></div>
              <h2 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Forensic Inspector
              </h2>
            </div>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-[#2d3a4b] rounded-lg text-slate-400 transition-colors">
                <Copy size={16} />
              </button>
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-[#2d3a4b] rounded-lg text-slate-400 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-8 space-y-10">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-[#ef4444] text-white text-[10px] font-black uppercase">
                  Critical
                </span>
                <span className=" text-[11px] text-slate-400">
                  {selectedLog?.id}
                </span>
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {selectedLog?.event}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-slate-200 dark:border-[#2d3a4b] pl-4">
                "{selectedLog?.summary}"
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b] shadow-sm">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">
                  Environment
                </p>
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-200">
                  <div className="size-2 rounded-full bg-[#137fec]"></div>{" "}
                  {selectedLog?.env}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b] shadow-sm">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">
                  Retry Status
                </p>
                <div className="flex items-center gap-2 font-bold text-[#ef4444]">
                  <RotateCcw size={14} /> {selectedLog?.retries}
                </div>
              </div>
            </div>

            {/* Trace Timeline */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <History size={14} /> Propagation Trace
              </h4>
              <div className="relative pl-8 space-y-8 before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-[#2d3a4b]">
                <div className="relative">
                  <span className="absolute -left-7 top-1 size-4 rounded-full bg-[#10b981] ring-4 ring-white dark:ring-[#0e1620] flex items-center justify-center">
                    <CheckCircle2 size={10} className="text-white" />
                  </span>
                  <div className="text-sm font-black text-slate-900 dark:text-slate-100">
                    Ingress: Nginx Gateway
                  </div>
                  <div className="text-[11px]  text-slate-500">
                    10:14:01.882 • 200 OK
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -left-7 top-1 size-4 rounded-full bg-[#ef4444] ring-4 ring-white dark:ring-[#0e1620] flex items-center justify-center">
                    <AlertCircle size={10} className="text-white" />
                  </span>
                  <div className="text-sm font-black text-slate-900 dark:text-slate-100">
                    Service: Token Validator
                  </div>
                  <div className="text-[11px]  text-[#ef4444] font-bold">
                    10:14:02.001 • 503 ERROR
                  </div>
                </div>
              </div>
            </div>

            {/* Code Block */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                  <Database size={14} /> Raw Payload
                </h4>
                <button className="text-[10px] font-black text-[#137fec] hover:underline uppercase">
                  Copy JSON
                </button>
              </div>
              <div className="rounded-2xl bg-[#0a0f14] p-6  text-[12px] leading-relaxed border border-slate-800 shadow-2xl overflow-x-auto">
                <pre className="text-slate-300">
                  {JSON.stringify(selectedLog?.payload || {}, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-50 dark:bg-[#1c2632]/60 border-t border-slate-200 dark:border-[#2d3a4b] flex gap-4 shrink-0">
            <button className="flex-1 bg-[#137fec] hover:bg-[#137fec]/90 text-white h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#137fec]/20 active:scale-95">
              <RotateCcw size={18} /> Replay Event
            </button>
            <button className="w-14 h-14 border-2 border-slate-200 dark:border-[#2d3a4b] text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center hover:bg-white dark:hover:bg-[#1c2632] transition-all active:scale-95">
              <Share2 size={20} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SystemLogs;
