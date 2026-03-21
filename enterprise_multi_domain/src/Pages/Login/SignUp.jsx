import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import Lucide Icons
import { CheckCircle, Chrome, Database, Lock, ShieldCheck } from "lucide-react";
import { RegisterUser } from "../../RTKThunk/AsyncThunk";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // 🔥 Split full name
      const [first_name, ...rest] = formData.fullName.split(" ");
      const last_name = rest.join(" ") || "User";

      const payload = {
        username: formData.username,
        email: formData.email,
        first_name,
        last_name,
        password: formData.password,
      };

      const res = await dispatch(RegisterUser(payload)).unwrap();

      console.log("User Registered:", res);

      // 🚀 Redirect after success
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-[#dbdfe6] dark:border-gray-800 bg-white dark:bg-background-dark px-10 py-3">
        <div className="flex items-center gap-4 text-[#111318] dark:text-white">
          <Database className="size-6 text-blue-600" /> {/* Lucide Icon */}
          <h2 className="text-lg font-bold tracking-tight">EnterpriseSaaS</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
            Already have an account?
          </span>
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg h-10 px-4 bg-blue-600 text-white text-sm font-bold"
          >
            Sign In
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white dark:bg-background-dark border border-[#dbdfe6] dark:border-gray-800 rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-[#111318] dark:text-white text-[28px] font-bold pb-2">
              Create your enterprise account
            </h1>
            <p className="text-gray-500 text-sm">
              Join thousands of teams scaling with EnterpriseSaaS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium dark:text-gray-200">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                className="w-full rounded-lg border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 focus:ring-2 focus:ring-blue-600/20"
                placeholder="name@company.com"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium dark:text-gray-200">
                UserName
              </label>
              <input
                name="username"
                value={formData.username}
                className="w-full rounded-lg border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 focus:ring-2 focus:ring-blue-600/20"
                placeholder="User Name"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium dark:text-gray-200">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                className="w-full rounded-lg border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 focus:ring-2 focus:ring-blue-600/20"
                placeholder="Full Name"
                type="text"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium dark:text-gray-200">
                Password
              </label>
              <input
                name="password"
                className="w-full rounded-lg border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 h-12 px-4 focus:ring-2 focus:ring-blue-600/20"
                placeholder="Min. 8 characters"
                type="password"
                onChange={handleChange}
              />
              {/* Strength Indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full bg-blue-600 transition-all duration-500 ${formData.password.length > 7 ? "w-full" : "w-1/3"}`}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">
                  {formData.password.length > 7 ? "Strong" : "Weak"}
                </span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg h-12 bg-blue-600 text-white font-bold hover:bg-blue-600/90 transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-[#dbdfe6] dark:border-gray-800"></div>
              <span className="mx-4 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                Or
              </span>
              <div className="flex-grow border-t border-[#dbdfe6] dark:border-gray-800"></div>
            </div>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-lg h-12 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-900 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              type="button"
            >
              <Chrome className="size-5 text-blue-500" /> {/* Lucide Icon */}
              Sign up with Google SSO
            </button>
          </form>
        </div>
      </main>

      {/* Footer with Lucide Icons */}
      <footer className="py-8 px-10 flex flex-wrap items-center justify-center gap-8 border-t border-[#dbdfe6] dark:border-gray-800 opacity-60">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <Lock className="size-4" />
          256-bit SSL Encryption
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <CheckCircle className="size-4" />
          SOC2 Type II Compliant
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <ShieldCheck className="size-4" />
          GDPR Ready
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
