import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ElevatorConfiguratorPage from "./pages/ElevatorConfiguratorPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/configurator"
              element={<ElevatorConfiguratorPage />}
            />

            {/* Add future pages here */}

            {/* 
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/quotations" element={<QuotationsPage />} />
            <Route path="/site-visits" element={<SiteVisitsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            */}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
