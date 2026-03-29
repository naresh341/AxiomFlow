import { Info, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CreateFeatureFlagModal from "../../Components/CreateFeatureFlagModal";

import { useDispatch, useSelector } from "react-redux";
import { get_Flag, toggle_Flag, update_Flag } from "../../RTKThunk/GovernanceThunk";
// import { get_Flag, toggle_Flag, update_Flag } from "../../RTKThunk/AsyncThunk";

const FeatureFlag = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { flags, loading } = useSelector((state) => state.flags);

  useEffect(() => {
    dispatch(get_Flag());
  }, [dispatch]);

  const handleToggle = (id) => {
    dispatch(toggle_Flag(id));
  };

  const filteredFlags = flags.filter(
    (flag) =>
      flag.name.toLowerCase().includes(search.toLowerCase()) ||
      flag.key.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div className="p-6">🚀 Loading flags...</div>;
  return (
    /* Ensure the root div uses a hex code if your tailwind.config isn't set up */
    <div className="bg-[#f6f7f8] dark:bg-[#101922] font-display text-slate-900 dark:text-slate-100 min-h-screen pb-20 transition-colors duration-300">
      <div className=" mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">
              Feature Flags
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
              Manage controlled rollouts and beta features.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-md font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            <span>Create New Flag</span>
          </button>
        </div>

        {/* Search Input - Fixed Dark Mode Background */}
        <div className="mb-10 group">
          <div className="flex items-center bg-white dark:bg-[#1c2632] rounded-lg border border-slate-200 dark:border-[#2d3a4b]  transition-all overflow-hidden shadow-md">
            <div className="text-slate-400 pl-4 flex items-center justify-center">
              <Search size={20} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-slate-900 dark:text-white  placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 py-4 text-base"
              placeholder="Search feature name or ID (e.g. auth_sso_v2)"
            />
          </div>
        </div>

        {/* Core Modules Table - Fixed Dark Mode Background */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 dark:text-white text-[22px] font-bold tracking-tight">
              Core Modules
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#2d3a4b] bg-white dark:bg-[#1c2632] shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40">
                    <th className="px-6 py-4 text-slate-500 dark:text-slate-300 text-sm font-bold uppercase">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-slate-500 dark:text-slate-300 text-sm font-bold uppercase">
                      Scope
                    </th>
                    <th className="px-6 py-4 text-slate-500 dark:text-slate-300 text-sm font-bold uppercase text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 text-slate-500 dark:text-slate-300 text-sm font-bold uppercase">
                      Modified
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#2d3a4b]">
                  {/* {coreModules.map((module) => (
                    <tr
                      key={module.id}
                      className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 transition-colors">
                            {module.name}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 font-mono text-sm mt-1">
                            {module.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-[10px] font-bold uppercase">
                          {module.scope}
                        </span>
                      </td>
                      <td className="px-6 py-5 flex justify-center">
                        <StatusToggle initialStatus={module.status} />
                      </td>
                      <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-sm">
                        {module.modified}{" "}
                        <span className="text-slate-300 dark:text-slate-600">
                          by
                        </span>{" "}
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {module.user}
                        </span>
                      </td>
                    </tr>
                  ))} */}
                  {filteredFlags.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-6 text-gray-500">
                        No flags found
                      </td>
                    </tr>
                  ) : (
                    filteredFlags.map((flag) => (
                      <tr key={flag.id}>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-semibold">{flag.name}</span>
                            <span className="text-sm text-gray-400">
                              {flag.key}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="px-2 py-1 bg-gray-200 rounded">
                            {flag.scope}
                          </span>
                        </td>

                        <td className="px-6 py-5 flex justify-center">
                          <StatusToggle
                            status={flag.is_enabled}
                            onToggle={() => handleToggle(flag.id)}
                          />
                        </td>

                        <td className="px-6 py-5 text-sm">
                          {flag.updated_at || flag.created_at}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Beta Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flags
            .filter((f) => f.type === "beta") // optional filter
            .map((flag) => (
              <BetaCard
                key={flag.id}
                flag={flag}
                onToggle={() => handleToggle(flag.id)}
              />
            ))}
        </div>
      </div>
      <CreateFeatureFlagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeatureFlag;

const StatusToggle = ({ status, onToggle }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={status}
        onChange={onToggle}
      />
      {/* peer-checked:bg-blue-600 handles the color change on toggle */}
      <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );
};

const BetaCard = ({ flag, onToggle }) => {
  const dispatch = useDispatch();

  const handleScopeChange = (e) => {
    try {
      const newScope = e.target.value;

      dispatch(
        update_Flag({
          id: flag.id,
          data: { scope: newScope },
        }),
      );
      dispatch(get_Flag());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1c2632] border border-slate-200 dark:border-[#2d3a4b] p-6 rounded-xl relative overflow-hidden transition-all hover:shadow-md dark:hover:border-slate-500">
      <div className="absolute top-0 right-0 h-1 w-full bg-yellow-500"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              {flag.name}
            </h3>
            <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-1.5 py-0.5 rounded border border-yellow-500/20 uppercase tracking-tighter">
              Beta
            </span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-mono text-md">
            {flag.key}
          </span>
        </div>
        <div className="group relative">
          <Info className="text-slate-400 dark:text-slate-500 cursor-help hover:text-yellow-500 transition-colors w-5 h-5" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white dark:bg-slate-900 text-[10px] text-slate-600 dark:text-slate-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-200 dark:border-[#2d3a4b]">
            {flag.warning || "Experimental feature"}
          </div>
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-md mb-6 leading-relaxed">
        {flag.description || "No description provided"}
      </p>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-md font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Access Scope
          </label>
          <select
            value={flag.scope}
            onChange={handleScopeChange}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-[#2d3a4b] text-slate-700 dark:text-slate-200 text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 outline-none"
          >
            <option value="early">Early Adopter Orgs</option>
            <option value="tier3">Tier 3 Customers</option>
            <option value="internal">Internal Only</option>
          </select>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#2d3a4b]">
          <span className="text-md font-semibold text-slate-900 dark:text-white">
            Enable for Scope
          </span>
          <StatusToggle status={flag.is_enabled} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
};
