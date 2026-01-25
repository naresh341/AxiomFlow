import React from "react";
import {
  AlertTriangle,
  Info,
  Filter,
  Download,
  Plus,
  MoreVertical,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RiskMatrix = () => {
  // Mock data for the Risk Registry Table
  const riskRegistry = [
    {
      id: "R-102",
      desc: "Unauthorized Access to Production Data",
      cat: "Security",
      sev: "Critical",
      status: "In Progress",
      owner: "JS",
      ownerName: "J. Smith",
      color: "red",
    },
    {
      id: "R-105",
      desc: "Third-party API failure (Main Cloud provider)",
      cat: "Operational",
      sev: "High",
      status: "Unmitigated",
      owner: "AL",
      ownerName: "A. Lee",
      color: "orange",
    },
    {
      id: "R-109",
      desc: "Missing SSL certificates on internal dev nodes",
      cat: "Security",
      sev: "Medium",
      status: "Mitigated",
      owner: "BK",
      ownerName: "B. Kim",
      color: "yellow",
    },
    {
      id: "R-114",
      desc: "Physical site access log delays",
      cat: "Compliance",
      sev: "Low",
      status: "Mitigated",
      owner: "TR",
      ownerName: "T. Ross",
      color: "emerald",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500">
      {/* 1. Heatmap Summary Section */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
          Risk Matrix (Likelihood vs Impact)
          <Info size={16} className="text-slate-400 cursor-help" />
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#1c2127] p-6 rounded-xl border border-slate-200 dark:border-[#3b4754] shadow-sm">
          {/* Visual Matrix */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="flex w-full max-w-100">
              {/* Y-Axis Label */}
              <div className="flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2">
                Likelihood
              </div>
              {/* The 5x5 Grid */}
              <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full aspect-square border-l border-b border-slate-300 dark:border-slate-700">
                {/* Simplified Matrix Logic: High severity top-right */}
                {[...Array(25)].map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  // Color logic based on standard risk matrix (top right is dangerous)
                  let bgColor = "bg-green-500/20";
                  if (row + col < 3) bgColor = "bg-red-600/60 text-white";
                  else if (row + col < 6) bgColor = "bg-orange-500/40";
                  else if (row + col < 8) bgColor = "bg-yellow-400/20";

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center text-xs font-bold border border-white/5 ${bgColor}`}
                    >
                      {Math.floor(Math.random() * 5)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 ml-6">
              Impact
            </div>
          </div>

          {/* Severity Counters */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <SeverityCard
                count="3"
                label="Critical Risks"
                color="text-red-500"
                bg="bg-red-500/10"
                border="border-red-500/20"
              />
              <SeverityCard
                count="11"
                label="High Risks"
                color="text-orange-500"
                bg="bg-orange-500/10"
                border="border-orange-500/20"
              />
              <SeverityCard
                count="21"
                label="Medium Risks"
                color="text-yellow-600"
                bg="bg-yellow-500/10"
                border="border-yellow-500/20"
              />
              <SeverityCard
                count="23"
                label="Low Risks"
                color="text-emerald-500"
                bg="bg-emerald-500/10"
                border="border-emerald-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Risk Registry Table Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">
            Risk Registry
          </h3>
          <div className="flex gap-2">
            <TableButton icon={<Filter size={16} />} label="Filter" />
            <TableButton icon={<Download size={16} />} label="Export CSV" />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-[#283039] border-b border-slate-200 dark:border-[#3b4754]">
              <tr>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Risk ID
                </th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Severity
                </th>
                <th className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Mitigation
                </th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#283039]">
              {riskRegistry.map((risk) => (
                <tr
                  key={risk.id}
                  className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-4 font-mono text-xs text-slate-400">
                    {risk.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold dark:text-white">
                    <div>{risk.desc}</div>
                    <div className="text-[10px] text-slate-400 font-normal uppercase">
                      {risk.cat}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border 
                      ${
                        risk.color === "red"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : risk.color === "orange"
                            ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      {risk.sev}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {risk.status === "Mitigated" ? (
                        <CheckCircle size={14} className="text-emerald-500" />
                      ) : (
                        <RefreshCw
                          size={14}
                          className="text-amber-500 animate-spin-slow"
                        />
                      )}
                      <span
                        className={
                          risk.status === "Mitigated"
                            ? "text-emerald-500"
                            : "text-amber-500"
                        }
                      >
                        {risk.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-primary">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Internal Helper Components
const SeverityCard = ({ count, label, color, bg, border }) => (
  <div className={`p-4 rounded-lg border ${bg} ${border}`}>
    <div className={`${color} text-2xl font-black`}>{count}</div>
    <div className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const TableButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 rounded-lg h-9 px-3 bg-slate-100 dark:bg-[#283039] text-slate-600 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
    {icon} <span>{label}</span>
  </button>
);

export default RiskMatrix;
