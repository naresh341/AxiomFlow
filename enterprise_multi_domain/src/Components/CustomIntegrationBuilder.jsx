import {
  CheckCircle,
  ChevronRight,
  Delete,
  Info,
  Play,
  Plus,
  Shuffle,
  SquareMenu,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomIntegrationBuilder = () => {
  const [showSecret, setShowSecret] = useState(false);
  const navigate = useNavigate();
  const [mappings, setMappings] = useState([
    {
      id: 1,
      source: "user.id",
      target: "external_user_id",
      type: "Integer",
      required: true,
    },
    {
      id: 2,
      source: "user.email",
      target: "email_address",
      type: "String",
      required: true,
    },
  ]);

  const addMapping = () => {
    const newId =
      mappings.length > 0 ? Math.max(...mappings.map((m) => m.id)) + 1 : 1;
    setMappings([
      ...mappings,
      { id: newId, source: "", target: "", type: "String", required: false },
    ]);
  };

  const removeMapping = (id) => {
    setMappings(mappings.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] font-sans text-[#111318] dark:text-white min-h-screen">
      <main className=" mx-auto px-6 py-8 pb-32">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-500">
          <Link
            to={"/Integrations"}
            className="hover:text-[#135bec] cursor-pointer"
          >
            Integrations
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200">
            Create Custom Integration
          </span>
        </div>

        {/* Page Heading */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black tracking-tight">
              Create Custom Integration
            </h1>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-black rounded-full uppercase tracking-widest">
              Draft
            </span>
          </div>
          <button
            onClick={() => navigate("CustomIntegrationDocumentation")}
            className="flex items-center gap-2 rounded-xl h-11 px-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold shadow-sm hover:border-[#135bec] transition-all"
          >
            <SquareMenu size={18} />
            <span>View Documentation</span>
          </button>
        </div>

        <div className="space-y-8">
          {/* Section 1: Details */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 px-8 py-5 flex items-center gap-3">
              <div className="p-2 bg-[#135bec]/10 rounded-lg text-[#135bec]">
                <Info size={20} />
              </div>
              <h2 className="text-lg font-black">Integration Details</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Integration Name
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
                  placeholder="e.g. CRM Sync Pro"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Integration Type
                </label>
                <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer">
                  <option>API</option>
                  <option>Webhook</option>
                  <option>Scheduled Sync</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Description
                </label>
                <textarea
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-[#135bec]/20 outline-none min-h-[120px]"
                  placeholder="Briefly describe the business logic..."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: Data Mapping */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#135bec]/10 rounded-lg text-[#135bec]">
                  <Shuffle size={20} />
                </div>
                <h2 className="text-lg font-black">Data Mapping</h2>
              </div>
              <button
                onClick={addMapping}
                className="flex items-center gap-2 bg-[#135bec] text-white px-4 py-2 rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-[#135bec]/20"
              >
                <Plus size={18} />
                <span>Add Field</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Source Field
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Target Field
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Type
                    </th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                      Required
                    </th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mappings.map((mapping) => (
                    <tr
                      key={mapping.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="px-8 py-4">
                        <input
                          className="bg-transparent border-none text-sm font-mono text-[#135bec] focus:ring-0 w-full"
                          value={mapping.source}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="px-8 py-4">
                        <input
                          className="bg-transparent border-none text-sm font-mono text-slate-600 dark:text-slate-300 focus:ring-0 w-full"
                          value={mapping.target}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="px-8 py-4">
                        <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
                          <option>String</option>
                          <option>Integer</option>
                          <option>Boolean</option>
                        </select>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={mapping.required}
                          className="rounded border-slate-300 text-[#135bec] focus:ring-[#135bec]"
                          onChange={() => {}}
                        />
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button
                          onClick={() => removeMapping(mapping.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Delete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Test Area */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#135bec]/10 rounded-lg text-[#135bec]">
                  <Terminal size={20} />
                </div>
                <h2 className="text-lg font-black">Test & Validation</h2>
              </div>
              <button className="flex items-center gap-2 bg-[#135bec] text-white px-6 py-2 rounded-xl text-sm font-black shadow-lg shadow-[#135bec]/20 hover:brightness-110 active:scale-95 transition-all">
                <Play size={18} />
                <span>Run Test Execution</span>
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">
                    Last Status
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-xl font-black text-green-900 dark:text-green-400">
                      Success
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Response Time
                  </p>
                  <p className="text-xl font-black text-slate-900 dark:text-slate-100">
                    1.24s
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Execution Log
                </label>
                <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-green-400 h-48 overflow-y-auto custom-scrollbar">
                  <p className="opacity-50">
                    [14:20:01] Initializing secure connection...
                  </p>
                  <p className="opacity-50">
                    [14:20:02] Mappings validated: 2 fields active.
                  </p>
                  <p className="text-blue-400">
                    [14:20:02] POST /api/v1/sync HTTP/1.1
                  </p>
                  <p className="text-white font-bold">
                    [14:20:03] Response: 200 OK
                  </p>
                  <p className="text-yellow-400">
                    Payload: {"{ id: 102, status: 'synced' }"}
                  </p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-10 py-5 flex items-center justify-between z-50">
        <button className="flex items-center gap-2 px-5 py-2.5 text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
          <Delete size={18} />
          <span>Delete Integration</span>
        </button>
        <div className="flex gap-4">
          <button className="px-8 py-2.5 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Discard Changes
          </button>
          <button className="px-10 py-2.5 bg-[#135bec] text-white text-sm font-black rounded-xl shadow-xl shadow-[#135bec]/30 hover:brightness-110 active:scale-95 transition-all">
            Save & Publish
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CustomIntegrationBuilder;
