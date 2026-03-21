import {
  Building2,
  Globe,
  Image as ImageIcon,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import UploadAsset from "../../Components/UploadAsset";
import { useDispatch } from "react-redux";
import { create_Organization } from "../../RTKThunk/AsyncThunk";
import { useNavigate } from "react-router-dom";
const OrganizationSettings = () => {
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    logo_url: "",
    timezone: "",
    sso_enabled: true,
    mfa_enabled: false,
    session_timeout: 60,
    password_policy: "standard",
    language: "",
  });

  const handleCreateOrg = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.domain) {
      alert("Name and Domain are required");
      return;
    }

    dispatch(create_Organization(formData))
      .unwrap()
      .then((res) => {
        console.log("Org Created:", res);

        alert("Organization Created ✅");

        navigate("/UsersAndOraganization/roles-permissions");
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating organization");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      logo_url: url,
    }));
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo_url: "",
    }));
  };
  return (
    <main className=" overflow-y-auto ">
      <div className="space-y-6 ">
        {/* General Information Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Building2 size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold dark:text-white">
                General Information
              </h2>
            </div>
            <p className="stext-md text-slate-500 mt-1">
              Basic details about your organization across the platform.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                  Organization Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Organization Name"
                  className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md"
                />
              </div>
              <div className="space-y-2">
                <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                  Primary Domain
                </label>
                <input
                  name="domain"
                  type="text"
                  value={formData.domain}
                  placeholder="Domain Name"
                  onChange={handleChange}
                  className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md"
                  defaultValue="acme-global.com"
                />
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                Organization Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  {formData.logo_url ? (
                    <img
                      src={formData.logo_url}
                      alt="logo"
                      className="size-16 object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="text-slate-400" size={24} />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 stext-sm font-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Upload size={14} /> Upload
                    </button>
                    <button
                      onClick={handleRemoveLogo}
                      className="flex items-center gap-1.5 px-3 py-1.5 stext-sm font-bold text-slate-500 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Recommended size: 512x512px. PNG or SVG.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Localization Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold dark:text-white">
                Localization
              </h2>
            </div>
            <p className="stext-md text-slate-500 mt-1">
              Set the default regional and language settings.
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                Default Timezone
              </label>
              <select
                value={formData.timezone}
                name="timezone"
                onChange={handleChange}
                className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md dark:text-white"
              >
                <option value="" disabled>
                  Select Timezone
                </option>
                <option value="PST">(UTC-08:00) Pacific Time</option>
                <option value="UTC">(UTC+00:00) London</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                Default Language
              </label>
              <select
                value={formData.language}
                name="language"
                onChange={handleChange}
                className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md dark:text-white"
              >
                <option value="" disabled>
                  Select language
                </option>
                <option value="English">English (United States)</option>
                <option value="Spanish">Spanish (ES)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold dark:text-white">
                Security & Access
              </h2>
            </div>
            <p className="stext-md text-slate-500 mt-1">
              Configure authentication methods and protocols.
            </p>
          </div>
          <div className="p-6 space-y-6">
            {/* Toggle SSO */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="stext-md font-semibold dark:text-white">
                  Single Sign-On (SSO)
                </p>
                <p className="stext-sm text-slate-500">
                  Enable Okta, Azure AD, or Google Workspace.
                </p>
              </div>
              <button
                onClick={() => {
                  setSsoEnabled(!ssoEnabled);
                  setFormData((prev) => ({
                    ...prev,
                    sso_enabled: !ssoEnabled,
                  }));
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${ssoEnabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${ssoEnabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            {/* Toggle MFA */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="stext-md font-semibold dark:text-white">
                  Multi-Factor Authentication (MFA)
                </p>
                <p className="stext-sm text-slate-500">
                  Enforce MFA for all users.
                </p>
              </div>
              <button
                onClick={() => {
                  setMfaEnabled(!mfaEnabled);
                  setFormData((prev) => ({
                    ...prev,
                    mfa_enabled: !mfaEnabled,
                  }));
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${mfaEnabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${mfaEnabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                    Session Timeout (min)
                  </label>
                  <input
                    name="session_timeout"
                    type="number"
                    placeholder=" 60 min"
                    value={formData.session_timeout}
                    className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="stext-md font-semibold text-slate-700 dark:text-slate-300">
                    Password Requirements
                  </label>
                  <select
                    name="password_policy"
                    onChange={handleChange}
                    value={formData.password_policy}
                    className="w-full bg-slate-50 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg p-2.5 stext-md dark:text-white"
                  >
                    <option value="standard">Standard (8+ characters)</option>
                    <option value="SSO">Enterprise (SSO Only)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Actions Bar */}
      <div className="sticky   p-6    backdrop-blur-md z-10">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-2 text-md dark:bg-white dark:text-black shadow-md border-slate-200 border font-bold text-slate-600  hover:bg-slate-100  rounded-lg transition-all"
          >
            Discard
          </button>
          <button
            type="submit"
            onClick={handleCreateOrg}
            className="px-6 py-2 text-md  font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 flex flex-col md:flex-row justify-between items-center stext-sm text-slate-500 gap-4">
        <p>© 2024 Enterprise SaaS Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="hover:underline" href="#">
            Terms of Service
          </a>
          <a className="hover:underline" href="#">
            System Status
          </a>
        </div>
      </div>

      <UploadAsset
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleLogoUpload}
      />
    </main>
  );
};

export default OrganizationSettings;
