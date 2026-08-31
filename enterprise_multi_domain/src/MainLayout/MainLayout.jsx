import { Outlet } from "react-router-dom";
import Sidebar from "../Navigation/Sidebar";
import Topbar from "../Navigation/Topbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login_Credentials } from "../RTKThunk/AuthThunk";
import { Toaster } from "react-hot-toast";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { status, token } = useSelector((state) => state.islogin);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "loading" && !token) {
      dispatch(Login_Credentials());
    }
  }, [dispatch, token]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <Topbar
        onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
      />

      <div className="flex flex-1 pt-16 overflow-hidden relative">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
