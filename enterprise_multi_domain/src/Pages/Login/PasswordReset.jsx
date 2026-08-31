import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Reset_Password } from "../../RTKThunk/AuthThunk";
import { useNotify } from "../../Components/MiniComponent/useNotify";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = useNotify();
  const { loading } = useSelector((state) => state.islogin);

  // ✅ Validate token on load
  useEffect(() => {
    if (!token) {
      setValidToken(false);
      setError("Invalid or expired reset link");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Hard validation layer
    if (!token) {
      return setError("Invalid reset session");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");

    try {
      await dispatch(Reset_Password({ token, password })).unwrap();

      // 🎯 Success redirect
      navigate("/Login");
      notify.success(
        "Password reset successful! Please log in with your new password.",
      );
    } catch (err) {
      console.error(err);
      const errMsg =
        typeof err === "string" ? err : err?.message || "Reset failed. Try again.";
      setError(errMsg);
      notify.error(errMsg);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-200">
      {/* Header */}
      <header className="w-full px-6 py-6 lg:px-12 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-2 text-[#111418] dark:text-white">
          <div className="size-8 text-blue-600">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                fill="currentColor"
              />
              <path
                clipRule="evenodd"
                d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">
            Axiom Flow
          </h2>
        </div>
      </header>

      <main className="grow flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-lg bg-white dark:bg-[#1a2632] shadow-sm border border-[#dbe0e6] dark:border-slate-800 rounded-xl">
          <div className="px-4 sm:px-8 pt-6 sm:pt-10 pb-6">
            {!validToken ? (
              <div className="text-center py-6">
                <h2 className="text-xl font-bold text-red-500 mb-4">
                  Invalid Link
                </h2>
                <p className="text-gray-500 dark:text-slate-400 mb-6">
                  This reset link is expired or invalid.
                </p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Request new link
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-8">
                  <div className="size-10 text-blue-600 mb-3">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-[#111418] dark:text-white text-sm font-semibold uppercase tracking-widest">
                    Axiom Flow
                  </span>
                </div>

                <h1 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-tight text-center mb-2">
                  Set new password
                </h1>
                <p className="text-[#617589] dark:text-slate-400 text-sm text-center mb-10 leading-relaxed px-4">
                  Enter your new password below. Make sure it's at least 6 characters.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#111418] dark:text-slate-300 text-sm font-semibold leading-normal">
                      New Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input flex w-full rounded text-[#111418] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-[#617589] p-3 pr-12 text-base font-normal leading-normal transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 p-1 rounded-md text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff size={20} strokeWidth={1.5} />
                        ) : (
                          <Eye size={20} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#111418] dark:text-slate-300 text-sm font-semibold leading-normal">
                      Confirm Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="form-input flex w-full rounded text-[#111418] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-[#617589] p-3 pr-12 text-base font-normal leading-normal transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 p-1 rounded-md text-[#617589] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} strokeWidth={1.5} />
                        ) : (
                          <Eye size={20} strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center font-medium">
                      {error}
                    </p>
                  )}

                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white h-12 rounded font-bold text-base transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    <div className="flex items-center justify-center">
                      <Link
                        to="/Login"
                        className="flex items-center gap-1.5 text-blue-600 text-md font-semibold hover:underline"
                      >
                        <ArrowLeft size={20} />
                        Back to Sign In
                      </Link>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="mt-4 border-t border-[#f0f2f4] dark:border-slate-800 bg-[#fafbfc] dark:bg-slate-800/50 py-4 px-8 rounded-b">
            <div className="flex items-center justify-center gap-2 text-[#617589] dark:text-slate-500 text-sm">
              <Lock size={15} />
              <p className="font-medium tracking-wide">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">
          © 2026 Axiom Flow, Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PasswordReset;
