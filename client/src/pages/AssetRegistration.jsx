import { useEffect, useState } from "react";
import { createAsset, getAssets , predictAsset } from "../services/api";


function AssetRegistration() {
  const [assets, setAssets] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    serial_number: "",
    purchase_date: "",
    purchase_cost: "",
    condition: "good",
    location: "",
  });

  const loadAssets = async () => {
    try {
      const result = await getAssets();
      setAssets(result || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering asset...");

    try {
      await createAsset(form);

      setMessage("✅ Asset registered successfully!");

      setForm({
        name: "",
        serial_number: "",
        purchase_date: "",
        purchase_cost: "",
        condition: "good",
        location: "",
      });

      await loadAssets();
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    }
  };

  const runPrediction = async (assetId) => {
  try {
    const result = await predictAsset(assetId);

    alert(
      `🤖 AI PREDICTION\n\nFailure Risk: ${result.failure_probability}%\nRisk Level: ${result.risk_level}\nRecommended Action: ${result.recommended_action}`
    );

    await loadAssets();
  } catch (error) {
    alert(`Prediction Error: ${error.message}`);
  }
};

  return (
    <div>
      <h1>Asset Registration & Directory</h1>

      <h2>Register New Asset</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Asset Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="serial_number"
          placeholder="Serial Number"
          value={form.serial_number}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="purchase_date"
          value={form.purchase_date}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="purchase_cost"
          placeholder="Purchase Cost"
          value={form.purchase_cost}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Register Asset</button>
      </form>

      <p>{message}</p>

      <hr />

      <h2>Asset Directory</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset</th>
            <th>Serial</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Location</th>
            <th>AI Prediction</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.serial_number}</td>
              <td>{asset.condition}</td>
              <td>{asset.status}</td>
              <td>{asset.location}</td>
              <td>
  <button onClick={() => runPrediction(asset.id)}>
    🤖 Predict Failure
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetRegistration;