import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  ChevronRight,
  Database,
  Mail,
  RefreshCw,
  Save,
  User,
} from "lucide-react";
import { useParams } from "react-router-dom";

const Configure = () => {
  const { id } = useParams();
  return (
    <main className="mx-auto w-full  grow   ">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <a
          className="hover:text-blue-600 transition-colors uppercase font-semibold"
          href="/Integrations"
        >
          Integration Marketplace
        </a>
        <ChevronRight size={14} />
        <span className="font-medium text-[#111418] dark:text-white hover:text-blue-600 active:text-bg-blue-600 uppercase">
          {id}
        </span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-6 pb-8">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white dark:bg-[#1a242f] p-3 shadow-md border border-gray-200 dark:border-gray-700">
            <img
              alt="Salesforce"
              className="max-h-full"
              src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-[#111418] dark:text-white">
                Salesforce Integration
              </h1>
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Connected
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure data synchronization between NexusMarket and your CRM.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw size={18} />
            <span>Test Connection</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-600/90 shadow-md shadow-blue-600/20 transition-all active:scale-95">
            <Save size={18} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Auth & Sync Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Authentication Card */}
          <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] p-6 shadow-md">
            <h2 className="mb-4 text-lg  font-bold uppercase tracking-wider text-gray-600">
              Authentication
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 border border-gray-100 dark:border-gray-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                  <User size={20} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-[#111418] dark:text-white truncate">
                    nexus_admin_prod
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Connected to Production Org
                  </span>
                </div>
              </div>
              <button className="w-full rounded-lg border border-blue-600/20 bg-blue-600/5 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-600/10 transition-colors">
                Re-authenticate Account
              </button>
            </div>
          </section>

          {/* Sync Settings Card */}
          <section className="rounded-xl border border-gray-200  dark:border-gray-700 bg-white dark:bg-[#1a242f] p-6 shadow-md">
            <h2 className="mb-5 text-lg font-bold uppercase tracking-wider text-gray-600">
              Sync Settings
            </h2>
            <div className="flex flex-col gap-6">
              <ToggleRow
                title="Automatic Sync"
                subtitle="Enable real-time background sync"
                defaultChecked
              />
              <ToggleRow
                title="Sync Contacts"
                subtitle="Bidirectional contact sync"
                defaultChecked
              />
              <ToggleRow
                title="Sync Accounts"
                subtitle="Company profile sync"
              />

              <div className="pt-2">
                <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">
                  Sync Frequency
                </label>
                <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] py-2.5 text-sm text-[#111418] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none">
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily at midnight</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Field Mapping Table */}
        <div className="lg:col-span-2">
          <section className="flex flex-col h-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] shadow-md">
            <div className="border-b border-gray-100 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#111418] dark:text-white">
                    Field Mapping
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Map attributes to Salesforce objects.
                  </p>
                </div>
                <button className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-bold text-[#111418] dark:text-white hover:bg-gray-50 transition-colors">
                  Add Custom Mapping
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 dark:bg-gray-800/30 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-6 py-4">NexusMarket Field</th>
                    <th className="px-6 py-4 text-center">Direction</th>
                    <th className="px-6 py-4">Salesforce Field</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <MappingRow
                    label="Email Address"
                    icon={<Mail size={18} />}
                    direction="both"
                    value="Contact.Email"
                  />
                  <MappingRow
                    label="First Name"
                    icon={<User size={18} />}
                    direction="right"
                    value="Contact.FirstName"
                  />
                  <MappingRow
                    label="Last Name"
                    icon={<User size={18} />}
                    direction="right"
                    value="Contact.LastName"
                  />
                  <MappingRow
                    label="Company Name"
                    icon={<Building2 size={18} />}
                    direction="both"
                    value="Account.Name"
                  />
                  <MappingRow
                    label="Usage Status"
                    icon={<Database size={18} />}
                    direction="right"
                    value="Account.Nexus_Health__c"
                  />
                </tbody>
              </table>
            </div>

            <div className="mt-auto border-t border-gray-100 dark:border-gray-800 p-6 bg-gray-50/30 dark:bg-gray-800/20">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Mappings are validated against your Salesforce schema in
                real-time.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

// --- Sub-components to keep code clean ---

const ToggleRow = ({ title, subtitle, defaultChecked }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-[#111418] dark:text-white">
        {title}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </span>
    </div>
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
    </label>
  </div>
);

const MappingRow = ({ label, icon, direction, value }) => (
  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-gray-400">{icon}</span>
        {label}
      </div>
    </td>
    <td className="px-6 py-4 text-center">
      <div className="flex items-center justify-center text-blue-600">
        {direction === "both" ? (
          <ArrowLeftRight size={18} />
        ) : (
          <ArrowRight size={18} />
        )}
      </div>
    </td>
    <td className="px-6 py-4">
      <select className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm py-1.5 focus:ring-1 focus:ring-blue-600 outline-none">
        <option>{value}</option>
        <option>Lead.Field_Value</option>
        <option>None (Do not sync)</option>
      </select>
    </td>
  </tr>
);

export default Configure;
