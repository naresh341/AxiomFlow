import React from "react";
import { Filter, Search, Eye, Upload } from "lucide-react";

const EvidenceList = () => {
  // Mock data matching your HTML structure
  const evidenceData = [
    {
      id: 1,
      name: "Firewall Logs Q3 2023",
      category: "Network Security",
      controlId: "CC6.1",
      status: "Approved",
      date: "Oct 15, 2023",
      statusColor: "emerald",
    },
    {
      id: 2,
      name: "Employee Training Records - Engineering",
      category: "Training",
      controlId: "CC1.2",
      status: "Pending Review",
      date: "Nov 12, 2023",
      statusColor: "amber",
    },
    {
      id: 3,
      name: "Physical Access Logs - HQ",
      category: "Access Control",
      controlId: "CC9.1",
      status: "Missing",
      date: "Not Provided",
      statusColor: "rose",
    },
    {
      id: 4,
      name: "Termination Checklists - Q3",
      category: "HR",
      controlId: "CC2.3",
      status: "Approved",
      date: "Sep 29, 2023",
      statusColor: "emerald",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Search and Filter Bar */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127]">
          <div className="flex items-center gap-2 flex-1 ">
            <Search className="text-slate-400" size={18} />
            <input
              className="w-full bg-transparent border-none text-sm focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400"
              placeholder="Search evidence..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Status:
            </span>
            <select className="bg-slate-50 dark:bg-[#111418] border-slate-200 dark:border-[#3b4754] text-xs font-semibold rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary">
              <option>All Statuses</option>
              <option>Approved</option>
              <option>Pending Review</option>
              <option>Missing</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors border border-slate-200 dark:border-[#3b4754] rounded-lg">
            <Filter size={14} />
            More Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="px-4 py-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#111418] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#1c2127]">
                <th className="px-6 py-4 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
                  Evidence Name
                </th>
                <th className="px-6 py-4 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider text-center">
                  Control ID
                </th>
                <th className="px-6 py-4 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">
                  Collected Date
                </th>
                <th className="px-6 py-4 text-right text-slate-500 dark:text-[#9dabb9] text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#3b4754]">
              {evidenceData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-6 py-5 text-slate-900 dark:text-white text-sm font-semibold">
                    {item.name}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-slate-600 dark:text-[#9dabb9] text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                      {item.controlId}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                      ${
                        item.statusColor === "emerald"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : item.statusColor === "amber"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${
                          item.statusColor === "emerald"
                            ? "bg-emerald-500"
                            : item.statusColor === "amber"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-5 text-sm ${item.status === "Missing" ? "text-slate-400 dark:text-[#5c6e80] italic" : "text-slate-600 dark:text-[#9dabb9]"}`}
                  >
                    {item.date}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        className={`p-1.5 transition-colors ${item.status === "Missing" ? "text-slate-400 opacity-30 cursor-not-allowed" : "text-slate-400 hover:text-primary"}`}
                        disabled={item.status === "Missing"}
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                        <Upload size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 pb-12">
        <p className="text-slate-400 dark:text-[#9dabb9] text-xs font-normal leading-normal py-3 border-t border-slate-200 dark:border-[#3b4754]">
          Showing {evidenceData.length} of 118 evidence items. Last global
          refresh: 1 minute ago.
        </p>
      </div>
    </div>
  );
};

export default EvidenceList;
