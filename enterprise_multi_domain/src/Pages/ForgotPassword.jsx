import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EmailSent from "./EmailSent";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-200">
      {/* Exact Header from your HTML */}
      <header className="w-full px-6 py-6 lg:px-12 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-2 text-[#111418] dark:text-white">
          <div className="size-8 text-blue-600">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">
            Enterprise SaaS
          </h2>
        </div>
      </header>

      <main className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-137.5 bg-white dark:bg-[#1a2632] shadow-sm border border-[#dbe0e6] dark:border-slate-800 rounded">
          <div className="px-8 pt-10 pb-6">
            <div className="flex flex-col items-center mb-8">
              <div className="size-10 text-blue-600 mb-3">
                {/* SVG Icon matching your branding */}
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                    fill="currentColor"
                  ></path>
                  <path
                    clipRule="evenodd"
                    d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-[#111418] dark:text-white text-sm font-semibold uppercase tracking-widest">
                Enterprise SaaS
              </span>
            </div>

            {!isSent ? (
              <>
                <h1 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight text-center mb-2">
                  Reset your password
                </h1>
                <p className="text-[#617589] dark:text-slate-400 text-sm text-center mb-10 leading-relaxed px-4">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#111418] dark:text-slate-300 text-sm font-semibold leading-normal">
                      Email address
                    </label>
                    <input
                      className="form-input flex w-full rounded text-[#111418] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-[#617589] p-3 text-base font-normal leading-normal transition-all"
                      placeholder="name@company.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-6 pt-2">
                    <button
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-primary/90 text-white h-12 rounded font-bold text-base transition-colors duration-200 disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    <div className="flex items-center justify-center">
                      <Link
                        className="flex items-center gap-1.5 text-blue-600 text-md font-semibold hover:underline"
                        to="/Login"
                      >
                        <span className=" text-lg">
                          <ArrowLeft size={20} />
                        </span>
                        Back to Sign In
                      </Link>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              //   <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
              //     <div className="size-16 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              //       <span className="material-symbols-outlined text-4xl">
              //         check_circle
              //       </span>
              //     </div>
              //     <h2 className="text-[#111418] dark:text-white text-2xl font-bold mb-2">
              //       Check your email
              //     </h2>
              //     <p className="text-[#617589] dark:text-slate-400 text-sm leading-relaxed mb-8">
              //       We've sent a password reset link to <br />
              //       <strong>{email}</strong>
              //     </p>
              //     <Link
              //       className="text-blue-600 font-bold hover:underline"
              //       to="/Login"
              //     >
              //       Return to login
              //     </Link>
              //   </div>
              <EmailSent />
            )}
          </div>

          <div className="mt-4 border-t border-[#f0f2f4] dark:border-slate-800 bg-[#fafbfc] dark:bg-slate-800/50 py-4 px-8 rounded-b">
            <div className="flex items-center justify-center gap-2 text-[#617589] dark:text-slate-500 text-sm">
              <span className=" text-md">
                <Lock size={15} />
              </span>
              <p className="font-medium tracking-wide">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <Link
            className="text-slate-500 hover:text-blue-600 text-xs font-medium"
            to="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-slate-500 hover:text-blue-600 text-xs font-medium"
            to="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-slate-500 hover:text-blue-600 text-xs font-medium"
            to="/help"
          >
            Help Center
          </Link>
        </div>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">
          © 2026 Enterprise SaaS, Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
