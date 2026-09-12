import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ElevatorConfiguratorPage from "./pages/ElevatorConfiguratorPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text-primary">
        <Routes>
          {/* TODO: Add all pages once UI is ready */}

          <Route path="/" element={<Navigate to="/configurator" replace />} />

          <Route path="/configurator" element={<ElevatorConfiguratorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
