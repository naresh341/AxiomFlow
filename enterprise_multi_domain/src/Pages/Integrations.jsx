import {
  ArrowUpRight,
  Cpu,
  FileText,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  Terminal,
  Webhook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const Integrations = () => {
  const navigate = useNavigate();

  const handleConfigure = (id) => {
    navigate(`/Integrations/configure/${id.toLowerCase()}`);
  };
  return (
    <main className="mx-auto w-full px-4 lg:px-10 py-8 space-y-8">
      {/* Page Heading Section */}
      <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-[#111418] dark:text-white">
            Integrations Marketplace
          </h1>
          <p className="max-w-2xl text-base font-normal text-gray-500 dark:text-gray-400">
            Manage your connected services and discover new tools to automate
            your workflow. Integrate in seconds using our managed connectors.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("documentation")}
            className=" cursor-pointer flex items-center gap-2 rounded-lg bg-gray-200 shadow-md dark:bg-gray-800 px-4 py-2.5 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FileText size={20} />
            <span>API Documentation</span>
          </button>
          <button
            onClick={() => navigate("createIntegration")}
            className=" cursor-pointer flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600/90 shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            <span>Custom Integration</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] py-3 pl-12 pr-4 text-[#111418] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
            placeholder="Search by name or keyword..."
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          <button className="cursor-pointer flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-white shadow-sm">
            <span className="text-sm font-semibold">All</span>
          </button>
          <button className=" cursor-pointer flex h-11 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] px-5 text-gray-600 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all">
            <LayoutGrid size={18} />
            <span className="text-sm font-semibold">CRM</span>
          </button>
          <button className=" cursor-pointer flex h-11 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] px-5 text-gray-600 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all">
            <MessageSquare size={18} />
            <span className="text-sm font-semibold">Communication</span>
          </button>
          <button className="cursor-pointer flex h-11 items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] px-5 text-gray-600 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all">
            <Terminal size={18} />
            <span className="text-sm font-semibold">Developer Tools</span>
          </button>
        </div>
      </div>

      {/* CRM Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-[#111418] dark:text-white">
            Customer Relationship Management
          </h2>
          <a
            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            href="#"
          >
            View All CRM <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <IntegrationCard
            name="Salesforce"
            desc="Automatically sync leads, accounts, and custom objects between platforms."
            img="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
            connected
            onAction={() => handleConfigure("salesforce")}
          />
          <IntegrationCard
            name="HubSpot"
            desc="Integrate your marketing automation and sales pipeline tools."
            img="https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg"
          />
          <IntegrationCard
            name="Pipedrive"
            desc="Manage your sales cycle and track contact communications."
            img="https://upload.wikimedia.org/wikipedia/commons/b/b5/Pipedrive_logo.svg"
          />
        </div>
      </section>
      {/* Communication and aterts */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-[#111418] dark:text-white">
            Communication and Alerts
          </h2>
          <a
            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            href="#"
          >
            View All Dev Tools <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <IntegrationCard
            name="Slack"
            desc="Manage repositories and automate your CI/CD pipelines."
            img="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            connected
          />
          <IntegrationCard
            name="Microsoft Teams"
            desc="Send real-time event notifications to any external URL via HTTP."
            icon={<Webhook size={40} className="text-gray-400" />}
          />
        </div>
      </section>
      {/* Dev Tools Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-[#111418] dark:text-white">
            Developer Tools
          </h2>
          <a
            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
            href="#"
          >
            View All Dev Tools <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <IntegrationCard
            name="GitHub"
            desc="Manage repositories and automate your CI/CD pipelines."
            img="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            connected
          />
          <IntegrationCard
            name="Outgoing Webhooks"
            desc="Send real-time event notifications to any external URL via HTTP."
            icon={<Webhook size={40} className="text-gray-400" />}
          />
          <IntegrationCard
            name="Direct API Access"
            desc="Manage your personalized API tokens and OAuth client IDs."
            icon={<Cpu size={40} className="text-gray-400" />}
            statusText="Active"
            connected
          />
        </div>
      </section>
    </main>
  );
};

// Reusable Sub-component for individual cards
const IntegrationCard = ({
  name,
  desc,
  img,
  icon,
  connected,
  statusText,
  onAction,
}) => (
  <div className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] p-5 shadow-sm hover:shadow-lg hover:border-blue-600/30 transition-all duration-300">
    <div className="mb-4 flex items-start justify-between">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
        {img ? <img src={img} alt={name} className="max-h-full" /> : icon}
      </div>
      <span
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
          connected
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        }`}
      >
        {connected && (
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
        )}
        {statusText || (connected ? "Connected" : "Not Connected")}
      </span>
    </div>
    <h3 className="text-lg font-bold text-[#111418] dark:text-white group-hover:text-blue-600 transition-colors">
      {name}
    </h3>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
      {desc}
    </p>
    <div className="mt-6">
      <button
        onClick={onAction}
        className={`w-full rounded-lg py-2.5 text-sm font-bold transition-all active:scale-95 ${
          connected
            ? "bg-blue-600 text-white hover:bg-blue-600/90 shadow-md shadow-blue-600/10"
            : "bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        {connected ? "Configure" : "Connect"}
      </button>
    </div>
  </div>
);

export default Integrations;
