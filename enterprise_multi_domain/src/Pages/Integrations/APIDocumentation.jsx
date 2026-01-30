import {
  BookOpen,
  CheckCircle2,
  Code2,
  Copy,
  Eye,
  Lock,
  Plus,
  RefreshCw,
  ShieldAlert,
  Table,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateApiKeyModal from "../../Components/GenerateApiKeyModal";

const APIDocumentation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("cURL");
  const [ModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const apiKeys = [
    {
      name: "Production Admin Key",
      env: "Prod",
      lastUsed: "2 mins ago",
      status: "Active",
    },
    {
      name: "Local Test Key",
      env: "Dev",
      lastUsed: "3 days ago",
      status: "Revoked",
    },
  ];

  const endpoints = [
    {
      method: "GET",
      path: "/users",
      desc: "Retrieve workspace users",
      scope: "read:users",
      color: "text-green-600 bg-green-50",
    },
    {
      method: "POST",
      path: "/users",
      desc: "Create a new user",
      scope: "write:users",
      color: "text-blue-600 bg-blue-50",
      active: true,
    },
    {
      method: "PATCH",
      path: "/users/{id}",
      desc: "Update user properties",
      scope: "write:users",
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-sans text-slate-900 dark:text-slate-100">
      <main className=" mx-auto px-10 py-10 flex gap-10">
        {/* LEFT COLUMN: DOCUMENTATION & MANAGEMENT */}
        <div className="flex-1  space-y-10">
          {/* INTRO */}
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter">
                API Documentation
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Build powerful integrations with our RESTful endpoints.
              </p>
            </div>
            <button
              onClick={() => navigate("DocumentationContent")}
              className="flex cursor-pointer items-center gap-2 px-4 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all"
            >
              <BookOpen size={16} />
              Developer Guide
            </button>
          </div>

          {/* SERVICE BOX */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Service Overview
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  label: "Base URL",
                  val: "https://api.company.com/v1",
                  isCode: true,
                },
                {
                  label: "Authentication",
                  val: "Bearer <API_KEY>",
                  isCode: true,
                },
                { label: "Format", val: "application/json" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[200px_1fr] p-5 items-center"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {row.label}
                  </span>
                  <span
                    className={`${row.isCode ? "font-mono text-[#135bec] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit" : ""} text-sm font-medium`}
                  >
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* API KEYS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Lock size={20} className="text-[#135bec]" /> API Management
              </h2>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#135bec] text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <Plus size={18} /> Generate Key
              </button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Key Name</th>
                    <th className="px-6 py-4">Environment</th>
                    <th className="px-6 py-4">Last Used</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {apiKeys.map((key) => (
                    <tr
                      key={key.name}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-bold">
                        {key.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${key.env === "Prod" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}
                        >
                          {key.env}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {key.lastUsed}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`flex items-center gap-1.5 text-xs font-bold ${key.status === "Active" ? "text-green-600" : "text-red-500"}`}
                        >
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${key.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {key.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2 text-slate-400">
                          <button className="p-1.5 hover:text-[#135bec] transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 hover:text-[#135bec] transition-colors">
                            <RefreshCw size={16} />
                          </button>
                          <button className="p-1.5 hover:text-red-500 transition-colors">
                            <ShieldAlert size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ENDPOINTS LIST */}
          <section className="space-y-4">
            <h2 className="text-xl font-black">Endpoints</h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {endpoints.map((ep) => (
                  <div
                    key={ep.path}
                    className={`group flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-all ${ep.active ? "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-600" : ""}`}
                  >
                    <div className="flex items-center gap-6">
                      <span
                        className={`w-16 px-2 py-1 rounded text-[10px] font-black text-center ${ep.color}`}
                      >
                        {ep.method}
                      </span>
                      <div>
                        <p className="text-sm font-mono font-bold dark:text-white">
                          {ep.path}
                        </p>
                        <p className="text-xs text-slate-500">{ep.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {ep.scope}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: CONSOLE (STICKY) */}
        <aside className="w-[480px] space-y-6 sticky top-24 h-fit">
          {/* ENDPOINT SPEC */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
            <div className="p-5 bg-[#135bec] text-white">
              <div className="flex items-center gap-2 mb-2 opacity-80">
                <Code2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Active Endpoint
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-white text-[#135bec] px-2 py-0.5 rounded text-xs font-black">
                  POST
                </span>
                <span className="font-mono font-bold text-lg">/v1/users</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-black mb-4">
                  <Table size={16} className="text-slate-400" /> Headers
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-slate-500">
                      Authorization
                    </span>
                    <span className="font-bold text-red-500">String *</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-slate-500">
                      Content-Type
                    </span>
                    <span className="font-mono font-bold">
                      application/json
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black mb-4">Body Parameters</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-xs font-black text-[#135bec]">
                        email
                      </p>
                      <p className="text-[10px] text-slate-500">
                        The user's unique email address
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-red-500">
                      Required
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-xs font-black text-[#135bec]">
                        role
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Member permission level
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 italic">
                      Enum
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CODE SNIPPET */}
          <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between bg-[#2d2d2d] px-4">
              <div className="flex">
                {["cURL", "JS", "Python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-3 text-[10px] font-black transition-all ${selectedLanguage === lang ? "text-white border-b-2 border-[#135bec]" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Copy size={14} />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-slate-300">
                <code>
                  <span className="text-blue-400">curl</span> --request POST \
                  <br />
                  &nbsp;&nbsp;--url https://api.company.com/v1/users \<br />
                  &nbsp;&nbsp;--header{" "}
                  <span className="text-amber-400">
                    'Authorization: Bearer KEY'
                  </span>{" "}
                  \<br />
                  &nbsp;&nbsp;--data{" "}
                  <span className="text-amber-400">{`{
    "email": "jane@doe.com",
    "role": "admin"
  }`}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* RESPONSE CODES */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Responses
              </h4>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                <CheckCircle2 size={12} /> 201 Created
              </span>
            </div>
            <div className="space-y-2">
              {[
                {
                  code: 201,
                  msg: "Created successfully",
                  color: "text-green-600",
                },
                {
                  code: 400,
                  msg: "Invalid request body",
                  color: "text-orange-500",
                },
                { code: 401, msg: "Unauthorized key", color: "text-red-500" },
              ].map((res) => (
                <div
                  key={res.code}
                  className="flex justify-between items-center text-[10px] font-bold"
                >
                  <span className={`font-mono ${res.color}`}>{res.code}</span>
                  <span className="text-slate-500">{res.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <GenerateApiKeyModal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default APIDocumentation;
