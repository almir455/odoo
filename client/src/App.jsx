import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Organization from "./pages/organization";
import AssetRegistration from "./pages/AssetRegistration";
import AssetAllocation from "./pages/AssetAllocation";
import MaintenanceManagement from "./pages/MaintenanceManagement";
import AssetAudit from "./pages/AssetAudit";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ActivityLogs from "./pages/ActivityLogs";
import ResourceBooking from "./pages/ResourceBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/assets" element={<AssetRegistration />} />
        <Route path="/allocation" element={<AssetAllocation />} />
        <Route path="/maintenance" element={<MaintenanceManagement />} />
        <Route path="/audit" element={<AssetAudit />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/activity" element={<ActivityLogs />} />
        <Route path="/booking" element={<ResourceBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;