import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Lucide icons for a clean enterprise look
import { ArrowLeft, CheckCircle2, Lock, Triangle } from "lucide-react";

const EmailSent = () => {
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#f6f8f6] dark:bg-[#102210] min-h-screen flex flex-col font-display transition-colors duration-300">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-[#f0f4f0] dark:border-[#1a2e1a] px-10 py-3 bg-white dark:bg-[#102210]">
        <div className="flex items-center gap-4 text-[#111811] dark:text-white">
          <Triangle className="size-6 text-[#11d411] fill-current" />
          <h2 className="text-lg font-bold tracking-tight">Enterprise SaaS</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Support
          </button>
          <div className="size-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-120 bg-white dark:bg-[#152a15] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center">
          {/* Brand Icon in Card */}
          <div className="mb-8">
            <Triangle className="size-12 text-[#11d411]" />
          </div>

          {/* Success Checkmark */}
          <div className="mb-6 flex items-center justify-center">
            <div className="size-20 bg-[#11d411]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-[#11d411] size-12" />
            </div>
          </div>

          <h1 className="text-[#111811] dark:text-white text-[28px] font-bold text-center pb-4">
            Check your email
          </h1>

          <p className="text-[#4F5B4F] dark:text-slate-300 text-base text-center pb-8 px-2">
            We've sent a password reset link to your email address. Please
            follow the instructions in the email to reset your password.
          </p>

          <button
            onClick={() =>
              window.open("https://mail.google.com/mail/u/0/#inbox")
            }
            className="w-full h-12 rounded bg-[#11d411] text-[#111811] text-base font-bold hover:opacity-90 transition-opacity"
          >
            Open Email App
          </button>

          <div className="text-center mt-6 mb-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Didn't receive the email?{" "}
              <button
                className={`font-semibold ${timer === 0 ? "text-[#11d411] hover:underline" : "text-slate-400 cursor-not-allowed"}`}
                disabled={timer > 0}
              >
                Resend
              </button>
              {timer > 0 && (
                <span className="ml-1 text-slate-400 font-mono text-xs">
                  (0:{timer.toString().padStart(2, "0")})
                </span>
              )}
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 w-full pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#11d411] transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
          <Lock size={14} />
          Secure password recovery for enterprise accounts
        </div>
      </main>

      {/* Decorative Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#11d411]/20 to-transparent"></div>
    </div>
  );
};

export default EmailSent;
