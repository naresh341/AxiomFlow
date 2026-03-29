import {
  ArrowLeftRight,
  Award,
  Calendar,
  CreditCard,
  ExternalLink,
  Info,
  PlusCircle,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetch_Invoices,
//   fetch_Org,
//   update_Billing,
//   update_Subscription,
// } from "../RTKThunk/AsyncThunk";
import { TableSchemas } from "../Utils/TableSchemas";
import DynamicTable from "./DynamicTable";
import Paginator from "./Paginator";
import PaymentModal from "./PaymentModal";
import { fetch_Invoices, fetch_Org, update_Billing, update_Subscription } from "../RTKThunk/GovernanceThunk";

const UpdgradePlan = () => {
  const [paymentPayload, setPaymentPayload] = useState(null);
  const dispatch = useDispatch();
  const { organization, loading, invoices } = useSelector(
    (state) => state.organization,
  );

  const [selectedPlan, setSelectedPlan] = useState(
    organization?.subscription?.plan_name || "BASIC",
  );

  const [billingCycle, setBillingCycle] = useState(
    organization?.subscription?.billing_cycle || "MONTHLY",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addOns, setAddOns] = useState({
    ai: false,
    support: true,
    encryption: false,
  });

  const [billingData, setBillingData] = useState({
    billing_email: "",
    billing_contact_name: "",
  });

  useEffect(() => {
    if (organization?.billing) {
      setBillingData({
        billing_email: organization.billing.billing_email || "",
        billing_contact_name: organization.billing.billing_contact_name || "",
      });
    }
  }, [organization]);

  useEffect(() => {
    if (organization?.subscription) {
      setSelectedPlan(organization.subscription.plan_name);
      setBillingCycle(organization.subscription.billing_cycle);
    }
  }, [organization]);

  const plans = [
    {
      name: "BASIC",
      price: 0,
      users: "Up to 50",
      workflows: "10 Active",
      analytics: "Basic Reports",
    },
    {
      name: "PROFESSIONAL",
      price: 99,
      users: "Up to 200",
      workflows: "50 Active",
      analytics: "Advanced Insights",
    },
    {
      name: "ENTERPRISE",
      price: 499,
      users: "Unlimited",
      workflows: "Unlimited",
      analytics: "Custom Builder",
    },
  ];

  // Calculate dynamic total for the footer
  const totalMonthly = useMemo(() => {
    const planBase = plans.find((p) => p.name === selectedPlan)?.price || 0;

    const multiplier = billingCycle === "ANNUAL" ? 12 : 1;

    const aiCost = addOns.ai ? 49 : 0;
    const supportCost = addOns.support ? 120 : 0;
    const encryptionCost = addOns.encryption ? 25 : 0;

    return (planBase + aiCost + supportCost + encryptionCost) * multiplier;
  }, [selectedPlan, addOns, billingCycle]);

  // const handleUpgrade = async () => {
  //   try {
  //     const basePrice = plans.find((p) => p.name === selectedPlan)?.price || 0;
  //     const multiplier = billingCycle === "ANNUAL" ? 12 : 1;
  //     const monthlyTotal =
  //       basePrice +
  //       (addOns.ai ? 49 : 0) +
  //       (addOns.support ? 120 : 0) +
  //       (addOns.encryption ? 25 : 0);

  //     const total = monthlyTotal * multiplier;

  //     const payload = {
  //       plan_name: selectedPlan,
  //       billing_cycle: billingCycle,
  //       price: total,
  //       addons: formattedAddons,
  //     };

  //     // await dispatch(update_Subscription(payload));
  //     // await dispatch(update_Billing(billingData));
  //     // dispatch(fetch_Org());

  //     setPaymentPayload(payload);
  //     setIsModalOpen(true);
  //   } catch (error) {
  //     console.error("Upgrade failed", error);
  //   }
  // };

  const handleUpgrade = async () => {
    try {
      const basePrice = plans.find((p) => p.name === selectedPlan)?.price || 0;

      const multiplier = billingCycle === "ANNUAL" ? 12 : 1;

      const addons = [
        { name: "AI_ANALYTICS", price: 49, enabled: addOns.ai },
        { name: "SUPPORT", price: 120, enabled: addOns.support },
        { name: "ENCRYPTION", price: 25, enabled: addOns.encryption },
      ];

      const addonTotal = addons.reduce(
        (sum, a) => sum + (a.enabled ? a.price : 0),
        0,
      );

      const total = (basePrice + addonTotal) * multiplier;

      // 🔥 SINGLE SOURCE OF TRUTH OBJECT
      const payload = {
        subscription: {
          plan_name: selectedPlan,
          billing_cycle: billingCycle,
          price: total,
          addons,
        },
        billing: {
          billing_email: billingData.billing_email,
          billing_contact_name: billingData.billing_contact_name,
        },
      };

      setPaymentPayload(payload);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Upgrade failed", error);
    }
  };

  const toggleAddOn = (key) => {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    dispatch(fetch_Org());
  }, [dispatch]);

  useEffect(() => {
    if (organization?.subscription?.addons) {
      const backendAddons = organization.subscription.addons;

      const mapped = {
        ai:
          backendAddons.find((a) => a.name === "AI_ANALYTICS")?.enabled ||
          false,
        support:
          backendAddons.find((a) => a.name === "SUPPORT")?.enabled || false,
        encryption:
          backendAddons.find((a) => a.name === "ENCRYPTION")?.enabled || false,
      };

      setAddOns(mapped);
    }
  }, [organization]);

  useEffect(() => {
    dispatch(fetch_Invoices());
  }, [dispatch]);

  const formattedInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];

    return invoices.map((inv, index) => ({
      srno: index + 1,
      invoice_number: inv.invoice_number || inv.id,
      amount: `$${inv.amount}`,
      created_at: new Date(inv.created_at).toLocaleDateString(),
      status: inv.status,
      file: inv.file_url, // backend must send this
    }));
  }, [invoices]);

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      const payload = {
        ...paymentPayload,
        payment_id: paymentResult?.id,
        status: "PAID",
      };

      await dispatch(update_Subscription(payload.subscription)).unwrap();
      await dispatch(update_Billing(payload.billing)).unwrap();
      await dispatch(fetch_Org()).unwrap();

      setIsModalOpen(false);
      setPaymentPayload(null);
    } catch (err) {
      console.error("Transaction commit failed", err);
    }
  };

  const handlePaymentFailure = (err) => {
    console.error("Payment failed", err);
    setIsModalOpen(false);
  };
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] font-sans text-[#111318] dark:text-white min-h-screen pb-32">
      <main className=" mx-auto px-6 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Organization Plan & Billing
            </h1>
            <p className="text-[#616f89] dark:text-gray-400 text-lg">
              Manage subscription, tiers, and invoicing.
            </p>
          </div>
          <div className="flex gap-5">
            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              className="h-10 px-4 rounded-xl border-[#dbe0e6]  border dark:border-gray-700 dark:bg-gray-800 text-lg outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="" disabled>
                Select Billing Cycle
              </option>
              <option value="MONTHLY">Monthly</option>
              <option value="ANNUAL">Annual</option>
            </select>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#135bec]/10 text-[#135bec] rounded-full font-bold text-sm border border-[#135bec]/20">
              <Award size={16} /> Premium Status
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Current Plan",
              val: selectedPlan,
              icon: <ShieldCheck className="text-[#135bec]" />,
            },
            {
              label: "Billing Cycle",
              val: billingCycle,
              icon: <Calendar className="text-green-500" />,
            },
            {
              label: "Users",
              val: organization?.subscription?.users_limit || "N/A",
              progress: 72,
              icon: <Users className="text-purple-500" />,
            },
            {
              label: "Renewal",
              val: organization?.subscription?.renewal_date || "N/A",
              icon: <RefreshCw className="text-orange-500" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-[#616f89]">
                  {stat.label}
                </span>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.val}</p>
              {stat.progress && (
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-3">
                  <div
                    className="bg-[#135bec] h-full rounded-full"
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Plan Comparison Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ArrowLeftRight size={24} /> Plan Comparison
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#dbdfe6] dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="px-6 py-4 text-sm font-bold">Features</th>
                    {plans.map((p) => (
                      <th
                        key={p.name}
                        className={`px-6 py-4 text-sm font-bold ${selectedPlan === p.name ? "bg-[#135bec]/5" : ""}`}
                      >
                        {p.name}
                        {selectedPlan === p.name && (
                          <div className="text-[12px]  text-[#135bec] uppercase mt-1">
                            Current
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dbdfe6] dark:divide-gray-800">
                  {["users", "workflows", "analytics"].map((feature) => (
                    <tr key={feature}>
                      <td className="px-6 py-4 text-sm font-medium capitalize">
                        {feature}
                      </td>
                      {plans.map((p) => (
                        <td
                          key={p.name}
                          className={`px-6 py-4 text-sm text-[#616f89] ${selectedPlan === p.name ? "bg-[#135bec]/5 font-bold text-[#135bec]" : ""}`}
                        >
                          {p[feature]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-800/30">
                    <td className="px-6 py-6 text-sm font-bold">Price</td>
                    {plans.map((p) => (
                      <td
                        key={p.name}
                        className={`px-6 py-6 ${selectedPlan === p.name ? "bg-[#135bec]/5" : ""}`}
                      >
                        <p className="text-xl font-black">
                          ${p.price}
                          <span className="text-xs font-normal">/mo</span>
                        </p>
                        {selectedPlan !== p.name && (
                          <button
                            onClick={() => setSelectedPlan(p.name)}
                            className="mt-3 w-full py-2 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 rounded-lg text-xs font-bold hover:border-[#135bec] transition-all"
                          >
                            Switch to {p.name}
                          </button>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add-Ons & Billing Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PlusCircle size={24} /> Optional Add-Ons
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: "ai",
                  title: "Advanced AI Analytics",
                  price: 49,
                  desc: "Predictive modeling and trend forecasting.",
                },
                {
                  id: "support",
                  title: "Premium 24/7 Support",
                  price: 120,
                  desc: "Access to our rapid response team.",
                },
                {
                  id: "encryption",
                  title: "Enhanced Data Encryption",
                  price: 25,
                  desc: "Enterprise-grade custom key management.",
                },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-gray-900 ${addOns[item.id] ? "border-[#135bec] ring-1 ring-[#135bec]" : "border-[#dbdfe6] dark:border-gray-800"}`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={addOns[item.id]}
                      onChange={() => toggleAddOn(item.id)}
                      className="size-5 rounded text-[#135bec] focus:ring-[#135bec]"
                    />
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-sm text-[#616f89]">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#135bec]">+${item.price}</p>
                    <p className="text-[10px] text-[#616f89] uppercase font-bold">
                      /mo
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CreditCard size={24} /> Billing Details
            </h2>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#616f89] mb-1 block">
                    Billing Contact
                  </label>
                  <input
                    className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg p-2 text-sm"
                    value={billingData.billing_contact_name}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        billing_contact_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#616f89] mb-1 block">
                    Billing Email
                  </label>
                  <input
                    className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg p-2 text-sm"
                    value={billingData.billing_email}
                    onChange={(e) =>
                      setBillingData({
                        ...billingData,
                        billing_email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="p-4 bg-[#f6f6f8] dark:bg-gray-800 rounded-xl flex items-center gap-4">
                <div className="size-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-[#135bec]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Visa ending in 4242</p>
                  <p className="text-xs text-[#616f89]">Exp 12/2026</p>
                </div>
                <button className="text-[#135bec] text-xs font-bold hover:underline">
                  Edit
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Invoices */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Receipt size={24} /> Recent Invoices
            </h2>
            <button className="text-[#135bec] text-sm font-bold flex items-center gap-1">
              View All <ExternalLink size={14} />
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden shadow-sm">
            {/* <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-[#616f89]">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-[#616f89]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-[#616f89]">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-[#616f89]">
                    Status
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbdfe6] dark:divide-gray-800">
                {[1, 2].map((i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-bold">
                      INV-2026-0{i}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#616f89]">
                      Nov 12, 2025
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">$1,188.00</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-[#135bec]">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            {loading ? (
              <p className="p-6 text-center">Loading invoices...</p>
            ) : formattedInvoices.length === 0 ? (
              <p className="p-6 text-center text-gray-400">No invoices found</p>
            ) : (
              <>
                <DynamicTable
                  tableHead={TableSchemas.invoices}
                  tableData={formattedInvoices}
                />
                <Paginator />
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer Summary Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-t border-[#dbdfe6] dark:border-gray-800 px-6 py-4 z-50 shadow-2xl">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#135bec]/10 rounded-xl text-[#135bec] hidden sm:block">
              <Info size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">
                New Total: ${totalMonthly}/
                {billingCycle === "ANNUAL" ? "yr" : "mo"}
              </p>
              <p className="text-xs text-[#616f89]">
                Switching to {selectedPlan} Plan with{" "}
                {Object.values(addOns).filter(Boolean).length} add-ons selected
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-8 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-sm">
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleUpgrade}
              className="flex-1 sm:flex-none px-12 py-3 bg-[#135bec] text-white rounded-xl font-black text-sm shadow-xl shadow-[#135bec]/30 hover:scale-105 active:scale-95 transition-all"
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </footer>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
        payload={paymentPayload}
      />
    </div>
  );
};

export default UpdgradePlan;
