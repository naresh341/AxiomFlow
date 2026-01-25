import { Bell, Menu, Search, Settings } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed w-full p-4 shadow-md h-16 border-b border-gray-300 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 z-50">
      <div className="flex items-center gap-5">
        <div className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition">
          <Menu size={20} />
        </div>
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
        <h3 className="font-bold text-xl">Enterprise Domain</h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            className="w-64 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 py-1.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="Search..."
          />
        </div>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>
        <div className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Settings size={20} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
