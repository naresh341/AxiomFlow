import {
  CheckCircle2,
  Edit3,
  KeyRound,
  Plus,
  Timer,
  Vibrate,
} from "lucide-react";
import { useEffect, useState } from "react";
import PasswordPolicyEditor from "../../Components/PasswordPolicyEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  get_Security,
  update_Security,
  create_Security,
  delete_Security,
} from "../../RTKThunk/AsyncThunk";
const Security = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.islogin.user);

  const orgId = user?.organization_id;

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.security);

  useEffect(() => {
    if (orgId) {
      dispatch(get_Security(orgId));
    }
  }, [orgId, dispatch]);

  const [formData, setFormData] = useState({
    mfa_enabled: false,

    password_policy: {
      min_length: 14,
      require_uppercase: true,
      require_numbers: true,
      require_symbols: true,
      expiry_days: 90,
      history_limit: 5,
    },

    session_policy: {
      timeout_minutes: 30,
    },

    network_policy: {
      allowed_ips: [],
    },
  });
  const networkAccess = formData?.network_policy?.allowed_ips || [];

  useEffect(() => {
    if (data?.data) {
      const policy = data.data;

      setFormData((prev) => ({
        ...prev,
        ...policy,

        password_policy: {
          ...prev.password_policy,
          ...(policy.password_policy || {}),

          // ✅ FIX: convert strings → numbers here
          min_length: Number(policy.password_policy?.min_length || 0),
          history_limit: Number(policy.password_policy?.history_limit || 0),
          max_attempts: Number(policy.password_policy?.max_attempts || 0),
          lockout_duration: Number(
            policy.password_policy?.lockout_duration || 0,
          ),
        },

        session_policy: {
          ...prev.session_policy,
          ...(policy.session_policy || {}),
        },

        network_policy: {
          ...prev.network_policy,
          ...(policy.network_policy || {}),
        },
      }));
    }
  }, [data]);
  const handleSaveSecurity = () => {
    dispatch(update_Security({ id: orgId, payload: { data: formData } }));
  };

  const toggleMFA = () => {
    const updatedValue = !formData.mfa_enabled;

    setFormData((prev) => ({
      ...prev,
      mfa_enabled: updatedValue,
    }));

    dispatch(
      update_Security({
        id: orgId,
        payload: {
          data: {
            ...formData,
            mfa_enabled: updatedValue,
          },
        },
      }),
    );
  };

  const handleSessionChange = (value) => {
    const timeout = Number(value);

    const updatedData = {
      ...formData,
      session_policy: {
        ...formData.session_policy,
        timeout_minutes: timeout,
      },
    };

    setFormData(updatedData);

    dispatch(
      update_Security({
        id: orgId,
        payload: { data: updatedData },
      }),
    );
  };

  const addIpRange = () => {
    const newIp = {
      id: Date.now(),
      name: "",
      range: "",
      date: new Date().toISOString().split("T")[0],
    };

    setFormData((prev) => ({
      ...prev,
      network_policy: {
        ...prev.network_policy,
        allowed_ips: [...prev.network_policy.allowed_ips, newIp],
      },
    }));
  };

  const updateIp = (id, key, value) => {
    let updatedIps;

    setFormData((prev) => {
      updatedIps = prev.network_policy.allowed_ips.map((ip) =>
        ip.id === id ? { ...ip, [key]: value } : ip,
      );

      return {
        ...prev,
        network_policy: {
          ...prev.network_policy,
          allowed_ips: updatedIps,
        },
      };
    });

    if (key === "range" && value) {
      dispatch(
        create_Security({
          id: orgId,
          ip: value,
        }),
      );
    }
  };

  const revokeIp = (ipRange) => {
    dispatch(delete_Security({ id: orgId, ip: ipRange }));

    setFormData((prev) => ({
      ...prev,
      network_policy: {
        ...prev.network_policy,
        allowed_ips: prev.network_policy.allowed_ips.filter(
          (item) => item.range !== ipRange,
        ),
      },
    }));
  };
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white transition-colors">
      <main className="mx-auto py-12 px-6">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Security Controls & Risk Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Manage enterprise-grade security settings and mitigate platform
            risks across the entire infrastructure.
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1: MFA Enforcement */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[12px] font-black uppercase rounded-lg">
                    High Security
                  </span>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[12px] font-black uppercase rounded-lg">
                    Enforced
                  </span>
                </div>
                <div
                  onClick={toggleMFA}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                    formData.mfa_enabled ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                      formData.mfa_enabled ? "right-1" : "left-1"
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <Vibrate size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">MFA Enforcement</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
                    Mandatory hardware tokens (YubiKey, Titan) are required for
                    all administrator and super-user accounts. Biometric
                    WebAuthn is also permitted as a secondary method.
                  </p>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Sarah Jones on Oct 12, 2023
              </p>
            </footer>
          </section>

          {/* Card 2: Password Policy */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[12px] font-black uppercase rounded-lg">
                  Medium Security
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 text-sm font-black flex items-center gap-2 hover:underline"
                >
                  <Edit3 size={16} /> Edit Policy
                </button>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                  <KeyRound size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Password Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      `Minimum ${formData.password_policy.min_length} characters`,
                      `Rotation every ${formData.password_policy.expiry_days} days`,
                      `No reuse of last ${formData.password_policy.history_limit} passwords`,
                      `Uppercase, numeric, & symbols`,
                    ].map((rule) => (
                      <div
                        key={rule}
                        className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                      >
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="text-base">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Robert Chen on Jan 05, 2024
              </p>
            </footer>
          </section>

          {/* Card 3: Session Management */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[12px] font-black uppercase rounded-lg">
                  Medium Risk Badge
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                    <Timer size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Session Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Configure automated logout for inactive administrative
                      sessions.
                    </p>
                  </div>
                </div>
                <div className="min-w-55">
                  <label className="block text-[12px] font-black uppercase text-gray-400 mb-2 tracking-widest">
                    Session Timeout
                  </label>
                  <select
                    value={formData.session_policy.timeout_minutes}
                    onChange={(e) => handleSessionChange(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-sm font-bold py-3 px-4 focus:ring-2 focus:ring-blue-600"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={60}>1 Hour</option>
                    <option value={480}>End of Working Day</option>
                  </select>
                </div>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by System Automator on Feb 28, 2024
              </p>
            </footer>
          </section>

          {/* Card 4: Network Access Control */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold">Network Access Control</h3>
                  <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[12px] font-black uppercase rounded-lg">
                    High Security
                  </span>
                </div>
                <button
                  onClick={addIpRange}
                  className="bg-blue-600 text-white text-xs font-black py-2.5 px-5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Plus size={16} /> Add IP Range
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100 dark:border-gray-800">
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        Location Name
                      </th>
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        IP Range / CIDR
                      </th>
                      <th className="pb-4 font-black uppercase text-[12px] tracking-widest">
                        Added On
                      </th>
                      <th className="pb-4 text-right font-black uppercase text-[12px] tracking-widest">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {networkAccess.map((item) => (
                      <tr key={item.id}>
                        {/* Name */}
                        <td className="py-3 px-4">
                          <input
                            value={item.name}
                            onChange={(e) =>
                              updateIp(item.id, "name", e.target.value)
                            }
                            placeholder="Location Name"
                            className="w-full rounded-lg border border-gray-300 dark:bg-white h-10 px-3 text-sm"
                          />
                        </td>

                        {/* IP */}
                        <td className="py-3 px-4">
                          <input
                            value={item.range}
                            onChange={(e) =>
                              updateIp(item.id, "range", e.target.value)
                            }
                            placeholder="IP Range / CIDR"
                            className="w-full rounded-lg border border-gray-300 dark:bg-white h-10 px-3 text-sm"
                          />
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4  text-gray-400">
                          {item.date}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => revokeIp(item)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}

                    {networkAccess.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-6 text-gray-400 italic"
                        >
                          No IP ranges added
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-[#dbe0e6] dark:border-gray-800">
              <p className="text-gray-400 text-xs italic">
                Last updated by Admin Sarah Jones on Mar 01, 2024
              </p>
            </footer>
          </section>
        </div>

        {/* Footer Meta */}
        <footer className="mt-16 text-center">
          <p className="text-gray-400 text-[12px] uppercase tracking-[0.3em] font-black mb-3">
            Audit Logs & Compliance
          </p>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xl mx-auto">
            All changes to these controls are logged and immutable for 7 years.
            Regulatory compliance: SOC2, ISO 27001.
          </p>
        </footer>
        <PasswordPolicyEditor
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSaveSecurity}
        />
      </main>
    </div>
  );
};

export default Security;
