import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
} from "lucide-react";
import { Link } from "react-router-dom";

const DocumentationContent = () => {
  return (
    <div className="bg-white dark:bg-[#101622] font-sans text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="mx-auto px-6 py-12 md:px-12">
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
          <Link
            to={"/Integrations/documentation"}
            className="hover:text-[#135bec] cursor-pointer"
          >
            Docs
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 dark:text-white">
            Developer Onboarding
          </span>
        </nav>

        {/* INTRODUCTION */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
            Introduction
          </h1>
          <div className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed space-y-4">
            <p>
              Welcome to the Developer Portal. This guide will help you
              integrate our enterprise SaaS platform into your existing
              workflow. Whether you're building a custom internal tool or a
              third-party integration, our API provides the flexibility and
              power you need to scale.
            </p>
            <p>
              In this guide, we'll walk through the initial setup, explain how
              our authentication works, and help you make your first successful
              API request in under 5 minutes.
            </p>
          </div>
        </header>

        {/* QUICK START SECTION */}
        <section className="mb-20">
          <h2 className="text-2xl font-black border-b border-slate-100 dark:border-slate-800 pb-4 mb-10 text-slate-900 dark:text-white">
            Quick Start
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-none">
                <span className="flex items-center justify-center size-8 rounded-full bg-[#135bec]/10 text-[#135bec] font-bold text-sm">
                  1
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                  Create your developer account
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Head over to the{" "}
                  <span className="text-[#135bec] font-semibold cursor-pointer hover:underline">
                    Console Settings
                  </span>{" "}
                  and verify your email to unlock the developer sandbox
                  environment.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-none">
                <span className="flex items-center justify-center size-8 rounded-full bg-[#135bec]/10 text-[#135bec] font-bold text-sm">
                  2
                </span>
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                  Generate your first API Key
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  In the API Keys tab, click on "Generate New Key". Give your
                  key a descriptive name and select the "Sandbox" environment.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-xl flex gap-3">
                  <AlertTriangle
                    className="text-amber-600 flex-none"
                    size={20}
                  />
                  <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                    Store your secret key securely. For security reasons, we
                    will only show it to you once.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-none">
                <span className="flex items-center justify-center size-8 rounded-full bg-[#135bec]/10 text-[#135bec] font-bold text-sm">
                  3
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                  Authorize your requests
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  All API requests must be made over HTTPS. Authentication is
                  handled via the{" "}
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">
                    Bearer
                  </span>{" "}
                  token in the Authorization header.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TUTORIAL SECTION */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Tutorial: Your First API Call
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Let's test your integration by fetching your own workspace details.
            This simple GET request verifies that your API key is active and
            correctly authorized.
          </p>

          {/* CODE BLOCK */}
          <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mb-8">
            <div className="flex items-center justify-between bg-[#2d2d2d] px-6 py-3">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-[#135bec]" />
                <span className="text-xs font-black text-white uppercase tracking-widest">
                  JavaScript
                </span>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Copy size={16} />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed text-slate-300">
                <code>
                  <span className="text-blue-400">const</span> response ={" "}
                  <span className="text-blue-400">await</span>{" "}
                  <span className="text-yellow-200">fetch</span>(
                  <span className="text-amber-400">
                    'https://api.company.com/v1/me'
                  </span>
                  , {"{"} <br />
                  &nbsp;&nbsp;<span className="text-purple-400">
                    method
                  </span>: <span className="text-amber-400">'GET'</span>, <br />
                  &nbsp;&nbsp;<span className="text-purple-400">
                    headers
                  </span>: {"{"} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-amber-400">'Authorization'</span>:{" "}
                  <span className="text-amber-400">'Bearer YOUR_API_KEY'</span>,{" "}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-amber-400">'Content-Type'</span>:{" "}
                  <span className="text-amber-400">'application/json'</span>{" "}
                  <br />
                  &nbsp;&nbsp;{"}"} <br />
                  {"}"}); <br />
                  <span className="text-blue-400">const</span> data ={" "}
                  <span className="text-blue-400">await</span> response.
                  <span className="text-yellow-200">json</span>(); <br />
                  console.<span className="text-yellow-200">log</span>(data);
                </code>
              </pre>
            </div>
          </div>

          {/* NEXT STEPS BOX */}
          {/* <div className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              What's next?
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Pagination Guide", link: "#" },
                { label: "Endpoints Reference", link: "#" },
                { label: "Webhook Configuration", link: "#" },
                { label: "Rate Limits", link: "#" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-[#135bec] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#135bec] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-300 group-hover:text-[#135bec] transform group-hover:translate-x-1 transition-all"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </section>

        {/* SUPPORT CALLOUT */}
        <footer className="mt-12 p-8 bg-[#135bec]/5 rounded-3xl border border-[#135bec]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-black text-[#135bec] uppercase tracking-widest">
              Stuck on something?
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Our developer experience team is standing by to help you
              integrate.
            </p>
          </div>
          <Link
            to={"/Support"}
            className="flex items-center gap-2 px-6 py-3 bg-[#135bec] text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            Contact Support
            <ArrowRight size={16} />
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default DocumentationContent;
