import {
  ArrowRight,
  Bell,
  MessageSquare,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { useState } from "react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tickets = [
    {
      id: "#TK-8821",
      subject: "Unable to export PDF reports",
      status: "Open",
      updated: "2 hours ago",
      description: "Report engine returns 500 error on batch export...",
    },
    {
      id: "#TK-8790",
      subject: "API Rate limiting issues",
      status: "Closed",
      updated: "1 day ago",
      description: "Production keys experiencing unexpected throttle...",
    },
    {
      id: "#TK-8755",
      subject: "New user seat allocation",
      status: "Closed",
      updated: "3 days ago",
      description: "Need to increase enterprise tier limit...",
    },
  ];

  const releases = [
    {
      version: "v2.4.0",
      date: "Oct 24, 2023",
      title: "Advanced Analytics",
      current: true,
    },
    {
      version: "v2.3.8",
      date: "Oct 12, 2023",
      title: "OAuth 2.0 Integration",
      current: false,
    },
    {
      version: "v2.3.5",
      date: "Sep 28, 2023",
      title: "Maintenance Update",
      current: false,
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            How can we help you today?
          </h1>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              className="w-full h-14 pl-12 pr-4 rounded-2xl  border border-gray-300  dark:border-slate-700  dark:bg-slate-900 outline-none shadow-xl shadow-blue-500/5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all text-lg"
              placeholder="Search documentation, articles, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-md">
            <span className="text-slate-400 font-medium">Popular:</span>
            {["API Keys", "Billing", "SSO Config", "Exports"].map((tag) => (
              <button
                key={tag}
                className="text-blue-600 font-bold hover:underline"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className=" mx-auto px-4  py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Active Tickets
              </h2>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                <Plus size={18} />
                New Ticket
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-6 py-4">Reference</th>
                      <th className="px-6 py-4">Inquiry</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-5 font-mono text-xs text-slate-400">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-md font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {ticket.subject}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {ticket.description}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                              ticket.status === "Open"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-xs text-slate-500">
                          {ticket.updated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="w-full py-4 bg-slate-50/50 dark:bg-slate-800/20 text-blue-600 text-xs font-black uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                View Ticket History <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Release Notes */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                  <Bell size={20} />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white">
                  Release Notes
                </h3>
              </div>

              <div className="space-y-6">
                {releases.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-4 border-l-2 ${item.current ? "border-blue-600" : "border-slate-200 dark:border-slate-700"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded ${
                          item.current
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                        }`}
                      >
                        {item.version}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-md font-bold dark:text-slate-200">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
                Full Changelog
              </button>
            </div>

            {/* Feedback Widget */}
            <div className="bg-blue-600 p-6 rounded-2xl shadow-xl shadow-blue-600/20 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare size={20} />
                <h3 className="font-black">Help us improve</h3>
              </div>
              <p className="text-blue-100 text-md mb-4">
                Found a bug or have a feature request? Let our product team
                know.
              </p>
              <textarea
                className="w-full h-28 p-3 rounded-xl bg-blue-700 border-transparent focus:ring-2 focus:ring-white/20 placeholder:text-blue-300 text-md mb-4 resize-none"
                placeholder="Describe your suggestion..."
              />
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                Submit Feedback <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
