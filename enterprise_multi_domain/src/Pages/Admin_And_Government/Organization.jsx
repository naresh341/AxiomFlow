import {
  AlertTriangle,
  ChevronRight,
  CloudUpload,
  Copy,
  Download,
  ExternalLink,
  Fingerprint,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_Org, update_logo, update_Org } from "../../RTKThunk/GovernanceThunk";
// import { fetch_Org, update_logo, update_Org } from "../../RTKThunk/AsyncThunk";
const Organization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    timezone: "",
    retention_years: 5,
  });

  const { organization, loading, error } = useSelector(
    (state) => state.organization,
  );

  useEffect(() => {
    dispatch(fetch_Org());
  }, [dispatch]);

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || "",
        region: organization.region || "",
        timezone: organization.timezone || "",
        retention_years: organization.retention_years || 5,
      });
    }
  }, [organization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(update_Org(formData));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    dispatch(update_logo({ file }));
    dispatch(fetch_Org());
  };
  const complianceItems = [
    {
      label: "SOC2 Type II",
      status: organization?.compliance?.soc2_status || "N/A",
    },
    {
      label: "GDPR Readiness",
      status: organization?.compliance?.gdpr_status || "N/A",
    },
    {
      label: "HIPAA",
      status: organization?.compliance?.hipaa_status || "N/A",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
      case "Verified":
        return "bg-emerald-100 text-emerald-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Expired":
      case "Failed":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const handleUpdatePolicy = () => {
    dispatch(
      update_Org({
        retention_years: formData.retention_years,
      }),
    );
    dispatch(fetch_Org());
  };

  {
    error && <p className="text-red-500 text-sm">{error}</p>;
  }
  return (
    <main className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] p-6 lg:p-12 transition-colors duration-300">
      <div className=" mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-[#111418] dark:text-white">
            Organization Settings
          </h1>
          <p className="text-xl text-[#617589] dark:text-gray-400 mt-2">
            Manage your company-wide preferences, subscription, and data
            policies.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Editable Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Organization Profile */}
            <section className="bg-white dark:bg-[#1c2632] rounded-2xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-8 dark:text-white">
                  Organization Profile
                </h2>

                <div className="space-y-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-14 px-5 rounded-xl border border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 text-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Company Logo
                    </label>
                    <label className="  flex flex-col items-center justify-center border-2 border-dashed border-[#dbe0e6] dark:border-gray-600 rounded-2xl py-12 bg-[#f8fafc] dark:bg-[#101922] group hover:border-blue-500 transition-colors cursor-pointer">
                      {preview ? (
                        <img src={preview} className="h-20 mb-4" />
                      ) : (
                        <CloudUpload className="w-12 h-12 text-[#617589] mb-4 group-hover:text-blue-500 transition-colors" />
                      )}
                      <input type="file" hidden onChange={handleLogoUpload} />

                      <p className="text-xl font-bold dark:text-white">
                        Upload Logo
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Drag and drop or browse files
                      </p>
                    </label>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Organization ID
                    </label>
                    <div className="flex items-center justify-between bg-[#f0f2f4] dark:bg-gray-800 px-6 h-16 rounded-xl border border-[#dbe0e6] dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <Fingerprint className="text-blue-600 w-6 h-6" />
                        <code className="text-lg font-mono font-bold dark:text-gray-300">
                          ORG-8821-XP-4402
                        </code>
                      </div>
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors text-blue-600">
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  Save Changes
                </button>
              </footer>
            </section>

            {/* Region & Timezone */}
            <section className="bg-white dark:bg-[#1c2632] rounded-2xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-8 dark:text-white">
                  Region & Timezone
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Geographic Region
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="h-14 px-4 rounded-xl border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 text-lg outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                      <option value="" disabled>
                        Select Region
                      </option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-lg font-bold dark:text-gray-200">
                      Timezone
                    </label>
                    <div className="relative">
                      <Search
                        className="absolute left-4 top-4 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 rounded-xl border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 text-lg outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-white dark:bg-[#1c2632] rounded-2xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-8 dark:text-white">
                  Data Retention
                </h2>
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold dark:text-gray-200">
                      Retention Period
                    </p>
                    <span className="text-2xl font-black text-blue-600">
                      {formData.retention_years} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.retention_years}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        retention_years: Number(e.target.value),
                      })
                    }
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-6 rounded-2xl flex gap-5">
                    <AlertTriangle
                      className="text-amber-600 shrink-0"
                      size={28}
                    />
                    <p className="text-amber-800 dark:text-amber-400 text-base leading-relaxed">
                      <strong>Policy Alert:</strong> Changes to data retention
                      policies may impact audit compliance. Please consult with
                      your legal team before finalizing changes.
                    </p>
                  </div>
                </div>
              </div>
              <footer className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button
                  onClick={handleUpdatePolicy}
                  className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-lg hover:bg-blue-700 transition-all"
                >
                  {loading ? "Updating..." : "Update Policy"}
                </button>
              </footer>
            </section>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-8">
            {/* Subscription */}
            <div className="bg-white dark:bg-[#1c2632] rounded-2xl border border-[#dbe0e6] dark:border-gray-700 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold dark:text-white">
                  Subscription
                </h3>
              </div>
              <div className="mb-8">
                <p className="text-4xl font-black text-blue-600 mb-2">
                  {organization?.subscription?.plan_name || "Not Selected Plan"}
                </p>
                <p className="text-lg text-gray-500 font-medium">
                  {organization?.subscription?.billing_cycle ||
                    " No Billing Cycle"}
                </p>
              </div>
              <button
                onClick={() => navigate("UpgradePlan")}
                className="w-full cursor-pointer bg-blue-600 text-white h-14 rounded-xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group"
              >
                Upgrade Plan
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Compliance Status */}
            <div className="bg-white dark:bg-[#1c2632] rounded-2xl border border-[#dbe0e6] dark:border-gray-700 p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6 dark:text-white">
                Compliance Status
              </h3>
              <div className="space-y-4">
                {complianceItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl ${item.opacity || ""}`}
                  >
                    <span className="font-bold text-lg dark:text-gray-200">
                      {item.label}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-black rounded-full uppercase tracking-widest ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 text-gray-500 dark:text-gray-400 font-bold flex items-center justify-center gap-2 hover:text-blue-600 transition-colors">
                <Download size={18} /> Download All Reports
              </button>
            </div>

            {/* Support Box */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-blue-600/20">
              <p className="font-black text-lg mb-2">Need help?</p>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Our enterprise support team is available 24/7 to assist with
                your configuration.
              </p>
              <Link
                to={"/Support"}
                className="font-black text-lg flex items-center gap-2 hover:underline"
              >
                Contact Support <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Organization;
