import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { routeConfig } from "../config/routeConfig";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(location.pathname === "/configurator");
  }, [location.pathname]);

  const currentRoute = routeConfig[location.pathname];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar
        activePath={location.pathname}
        onNavigate={navigate}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      <div
        className={`
          min-h-screen
          transition-[margin-left]
          duration-300
          ease-in-out
          ${collapsed ? "ml-sidebar-collapsed" : "ml-sidebar"}
        `}
      >
        <Header
          title={currentRoute?.title ?? "Dashboard"}
          subtitle={currentRoute?.subtitle}
        />

        <main className="p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
