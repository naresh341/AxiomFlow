import { useMemo, useState } from "react";
import {
  X,
  CreditCard,
  History,
  CheckCircle2,
  Building2,
  Info,
} from "lucide-react";
import PaymentSuccessModal from "./PaymentSuccessModal";

const ConfirmPaymentModal = ({
  isOpen,
  onClose,
  payload,
  onSuccess,
  onFailure,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  // ===============================
  // 🧠 SOURCE OF TRUTH (BACKEND DRIVEN)
  // ===============================
  const subscription = payload?.subscription;
  const billing = payload?.billing;

  const planName = subscription?.plan_name || "N/A";
  const billingCycle = subscription?.billing_cycle || "MONTHLY";
  const addons = subscription?.addons || [];
  const basePrice = subscription?.price || 0;

  // optional metadata
  const billingEmail = billing?.billing_email || "";
  const billingContact = billing?.billing_contact_name || "";

  // ===============================
  // 💰 COMPUTED FINANCIALS
  // ===============================
  const finalTotal = useMemo(() => {
    return basePrice;
  }, [basePrice]);

  // ===============================
  // 🚀 PAYMENT EXECUTION FLOW
  // ===============================
  const handleConfirmPayment = async () => {
    try {
      setProcessing(true);

      // simulate payment gateway call (replace with Stripe/Razorpay/etc.)
      const fakePaymentResult = {
        id: "pay_" + Date.now(),
        status: "SUCCESS",
      };

      const finalPayload = {
        ...payload,
        payment_id: fakePaymentResult.id,
        status: "PAID",
      };

      await onSuccess?.(finalPayload);

      setSuccessModal(true);
    } catch (err) {
      onFailure?.(err);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen || !payload) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10 bg-slate-900/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl bg-white dark:bg-[#101622] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
        <header className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-10 py-3 sticky top-0 bg-white dark:bg-[#101622] z-10">
          <div className="flex flex-col">
            <h2 className="text-[#111318] dark:text-white text-2xl font-black leading-tight tracking-tight">
              Enterprise Billing Confirmation
            </h2>
            <p className="text-[#616f89] dark:text-slate-400 text-md font-normal">
              Finalize node allocation and corporate payment credentials
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl h-12 w-12 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 border border-slate-100 dark:border-slate-800"
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-10 pl-10 pt-3 pb-10 space-y-10">
          {/* Section 1: Dynamic Plan & Seat Breakdown */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 flex justify-between items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 flex-1">
                <div>
                  <p className="text-[#616f89] dark:text-slate-400 text-[12px] font-black uppercase tracking-widest mb-2">
                    Selected Plan
                  </p>
                  <p className="text-[#111318] dark:text-white text-lg font-bold">
                    {planName}
                  </p>
                </div>
                <div>
                  <p className="text-[#616f89] dark:text-slate-400 text-[12px] font-black uppercase tracking-widest mb-2">
                    User Nodes
                  </p>
                  <p className="text-[#111318] dark:text-white text-lg font-bold">
                    {seatCount} Seats
                  </p>
                </div>
                <div>
                  <p className="text-[#616f89] dark:text-slate-400 text-[12px] font-black uppercase tracking-widest mb-2">
                    Unit Price
                  </p>
                  <p className="text-[#111318] dark:text-white text-lg font-bold">
                    ${pricePerSeat}/mo
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 dark:bg-blue-700 p-8 rounded-2xl text-white flex flex-col justify-center relative overflow-hidden">
              <CheckCircle2
                className="absolute -right-2 -bottom-2 text-white/10"
                size={80}
              />
              <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 relative z-10">
                Billing Schedule
              </p>
              <p className="text-xl font-bold italic tracking-tight uppercase relative z-10">
                Annual Cycle
              </p>
              <p className="text-blue-200 text-xs mt-1 relative z-10">
                Renewal: Jan 22, 2027
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Section 2: Payment Credentials */}
            <section className="space-y-6">
              <h3 className="text-[#111318] dark:text-white text-xs font-black uppercase tracking-[0.2em] opacity-60 flex items-center gap-3">
                <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>{" "}
                01. Payment Method
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[12px] dark:text-white font-black text-slate-500 uppercase ml-1 tracking-widest">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border-gray-300 border shadow-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all dark:text-white "
                      placeholder="Cardholder Name"
                    />
                    <CreditCard
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[12px] tracking-widest dark:text-white font-black text-slate-500 uppercase ml-1">
                      Expiry
                    </label>
                    <input
                      required
                      className="rounded-xl border-gray-300 border shadow-md200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:border-blue-600 outline-none dark:text-white"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[12px] tracking-widest dark:text-white font-black text-slate-500 uppercase ml-1">
                      CVC
                    </label>
                    <input
                      required
                      className="rounded-xl border-gray-300 border shadow-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:border-blue-600 outline-none dark:text-white"
                      placeholder="CVC"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Business Metadata */}
            <section className="space-y-6">
              <h3 className="text-[#111318] dark:text-white text-xs font-black uppercase tracking-[0.2em] opacity-60 flex items-center gap-3">
                <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>{" "}
                02. Corporate Entity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-[12px] tracking-widest dark:text-white font-black text-slate-500 uppercase ml-1">
                    Billing Email (Invoices)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border-gray-300 border shadow-md dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all dark:text-white "
                      placeholder="Billing Address"
                    />
                    <Building2
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] tracking-widest dark:text-white font-black text-slate-500 uppercase ml-1">
                    PO Number
                  </label>
                  <input
                    required
                    className="rounded-xl border-gray-300 border shadow-md200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:border-blue-600 outline-none dark:text-white"
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] tracking-widest dark:text-white font-black text-slate-500 uppercase ml-1">
                    Tax ID / VAT
                  </label>
                  <input
                    required
                    className="rounded-xl border-gray-300 border shadow-md200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 h-14 px-5 text-md focus:border-blue-600 outline-none dark:text-white"
                    placeholder="Ex: US123456"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Section 4: Advanced Financial Breakdown */}
          <section className="bg-slate-50 dark:bg-slate-800/20 border-y border-slate-100 dark:border-slate-800 -mx-10 px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <History
                  className="text-blue-600 dark:text-blue-400"
                  size={20}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                A proration credit of{" "}
                <strong className="text-slate-700 dark:text-slate-200">
                  ${prorationCredit.toFixed(2)}
                </strong>{" "}
                from your unused "Pro" plan has been automatically applied to
                this transaction.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-semibold ">
                  Subtotal (Annual)
                </span>
                <span className="text-[#111318] dark:text-white font-bold">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-semibold">
                  Previous Plan Credit
                </span>
                <span className="text-green-600 font-bold">
                  -${prorationCredit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  Sales Tax (8%) <Info size={12} className="opacity-50" />
                </span>
                <span className="text-[#111318] dark:text-white font-bold">
                  ${taxAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Final Amount Visual Card */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-8 flex justify-between items-center">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                Total Amount Payable
              </p>
              <p className="text-slate-400 text-[10px] mt-1 italic font-medium uppercase">
                Inclusive of all local taxes
              </p>
            </div>
            <div className="text-right">
              <span className="text-[#111318] dark:text-white text-5xl font-black tracking-tighter">
                ${finalTotal.toLocaleString()}
              </span>
              <p className="text-slate-400 text-xs font-bold mt-1">USD</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-100 dark:border-slate-800 px-10 py-8 bg-white dark:bg-[#101622] flex flex-col sm:flex-row items-center justify-between gap-8">
          <label className="flex items-start gap-4 cursor-pointer max-w-lg group">
            <input
              className="mt-1 h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 bg-transparent cursor-pointer"
              type="checkbox"
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              I certify that I am authorized to make this corporate purchase. I
              agree to the 12-month commitment starting today.
            </span>
          </label>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer sm:flex-none px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={() => setSuccessModal(true)}
              disabled={!agreed}
              className="flex-1 cursor-pointer sm:flex-none px-12 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-sm font-black rounded-xl shadow-xl shadow-blue-600/20 disabled:opacity-80 disabled:bg-blue-800 transition-all uppercase tracking-widest active:scale-95"
            >
              Confirm & Pay
            </button>
          </div>
        </footer>
      </div>
      <PaymentSuccessModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
      />
    </div>
  );
};

export default ConfirmPaymentModal;
