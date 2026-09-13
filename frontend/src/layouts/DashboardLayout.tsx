// src/layouts/DashboardLayout.tsx

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar activePath={location.pathname} onNavigate={navigate} />

      {/* Main Content */}
      <main
        className="
          min-h-screen
          pt-16
          lg:ml-[250px]
          lg:pt-0
        "
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
