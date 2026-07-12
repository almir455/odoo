import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import AssetRegistration from "./pages/AssetRegistration";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", display: "flex", gap: "20px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/assets">Asset Registration</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assets" element={<AssetRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;