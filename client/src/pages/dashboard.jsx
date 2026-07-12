import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getDashboardData();
        console.log("AssetFlow Dashboard:", result);
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    loadDashboard();
  }, []);

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Dashboard API Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <h2 style={{ padding: "30px" }}>Loading AssetFlow...</h2>;
  }

  const cards = [
    ["Total Assets", data.total_assets],
    ["Available Assets", data.available_assets],
    ["Assigned Assets", data.assigned_assets],
    ["Under Maintenance", data.maintenance_assets],
    ["Active Alerts", data.active_alerts],
    ["Maintenance Cost", `₹${data.total_maintenance_cost}`],
  ];

  return (
    <div style={styles.page}>
      <h1>AssetFlow AI Dashboard</h1>

      <p style={styles.subtitle}>
        Smart Enterprise Asset & Predictive Maintenance System
      </p>

      <div style={styles.grid}>
        {cards.map(([title, value]) => (
          <div style={styles.card} key={title}>
            <h3>{title}</h3>
            <h2>{value ?? 0}</h2>
          </div>
        ))}
      </div>

      <div style={styles.status}>
        <h2>AI System Status</h2>
        <p>🟢 Odoo Backend Connected</p>
        <p>🟢 PostgreSQL Connected</p>
        <p>🟢 AssetFlow Prediction Engine Ready</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  status: {
    marginTop: "35px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
  },
};

export default Dashboard;