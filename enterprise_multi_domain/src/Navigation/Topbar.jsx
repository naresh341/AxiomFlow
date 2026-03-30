import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import NotificationPanel from "../Components/NotificationPanel";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../RTKThunk/AuthThunk";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "../RTKThunk/authSelectors";

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.islogin);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const isAuthenticated = useSelector((state) => !!state.islogin.token);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/Dashboard");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed w-full p-4 shadow-md h-16 border-b border-gray-300 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 z-50">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center scale-[0.55] origin-left">
          <label
            className="relative flex h-13.75 w-28.75 items-center rounded-[165px] border border-[#32303e] bg-[#252532] p-1.5 shadow-[inset_0px_5px_10px_0px_#16151c,0px_3px_6px_-2px_#403f4e] cursor-pointer"
            htmlFor="switch"
          >
            <input
              id="switch"
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            <span
              className="z-20 h-10.5 w-10.5 rounded-full bg-linear-to-b from-[#3b3a4e] to-[#272733] shadow-[inset_0px_5px_4px_0px_#424151,0px_4px_15px_0px_#0f0e17] transition-transform duration-300 ease-in-out 
              translate-x-0 peer-checked:translate-x-14.5"
            ></span>

            <span
              className={`absolute h-6.25 w-6.25 rounded-full border-[3px] transition-all duration-500 ease-in-out z-10
               ${
                 theme === "dark"
                   ? "translate-x-3.75 border-[#60d480]"
                   : "translate-x-18 border-[#ef565f]"
               }`}
            ></span>
          </label>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        <h3 className="font-bold text-xl">Axion Flow</h3>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsNotifOpen(true)}
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>
        <div className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Settings size={20} />
        </div>
        {isAuthenticated && (
          <div
            className="relative"
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 cursor-pointer border border-gray-300 dark:border-slate-700">
              <User size={20} />
            </div>

            {/* HOVER MENU */}
            {showUserMenu && (
              <div className="absolute right-0 top-full pt-2 w-48 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold truncate">
                      {user?.name || "User"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-1.5 text-sm font-semibold tracking-wide
                 bg-[#252532] text-white rounded-full
                 border border-[#32303e] 
                 shadow-[0px_3px_6px_-2px_#403f4e,inset_0px_2px_4px_0px_rgba(255,255,255,0.1)]
                 hover:bg-[#2d2d3a] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)]
                 transition-all duration-200 active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.5)]"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      <NotificationPanel
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </div>
  );
};

export default Topbar;
