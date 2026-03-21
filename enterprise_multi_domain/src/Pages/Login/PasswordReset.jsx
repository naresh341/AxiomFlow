import { ArrowLeft, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Reset_Password } from "../../RTKThunk/AsyncThunk";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validToken, setValidToken] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err || "Reset failed. Try again.");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="w-full px-6 py-6 lg:px-12 flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#111418] dark:text-white">
          Enterprise SaaS
        </h2>
      </header>

      <main className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-137.5 bg-white dark:bg-[#1a2632] shadow-sm border border-[#dbe0e6] dark:border-slate-800 rounded">
          <div className="px-8 pt-10 pb-6">
            {!validToken ? (
              <div className="text-center">
                <h2 className="text-xl font-bold text-red-500 mb-4">
                  Invalid Link
                </h2>
                <p className="text-gray-500 mb-6">
                  This reset link is expired or invalid.
                </p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 font-semibold"
                >
                  Request new link
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-[#111418] dark:text-white text-2xl font-bold text-center mb-2">
                  Set new password
                </h1>

                <p className="text-[#617589] text-sm text-center mb-10">
                  Enter your new password below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 p-3 border rounded"
                  />

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-12 p-3 border rounded"
                  />

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white h-12 rounded font-bold"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>

                  <div className="flex justify-center">
                    <Link
                      to="/login"
                      className="flex items-center gap-2 text-blue-600"
                    >
                      <ArrowLeft size={18} />
                      Back to login
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="border-t py-4 text-center text-sm text-gray-500">
            <Lock size={14} className="inline mr-2" />
            Secure password reset
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordReset;
