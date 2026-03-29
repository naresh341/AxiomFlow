import { Outlet } from "react-router-dom";
import Sidebar from "../Navigation/Sidebar";
import Topbar from "../Navigation/Topbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Login_Credentials } from "../RTKThunk/AuthThunk";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Login_Credentials());
  }, [dispatch]);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-slate-950">
      <Topbar className="fixed top-0 left-0 right-0 z-50" />

      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
