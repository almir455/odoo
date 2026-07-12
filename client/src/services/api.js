async function callOdoo(route, params = {}) {
  const response = await fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params,
      id: Date.now(),
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.data?.message || "Odoo API Error");
  }

  return data.result;
}

export async function getDashboardData() {
  return callOdoo("/assetflow/dashboard");
}

export async function predictAsset(assetId) {
  return callOdoo("/assetflow/predict", {
    asset_id: assetId,
  });
}