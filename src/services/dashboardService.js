// src/services/dashboardService.js

const API_BASE = "https://billwev.pythonanywhere.com/api/v1/rest-auth/";

// --- helper ---
async function request(url, options = {}) {
  console.log("➡️ Fetching:", url, options); 
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("admin_token")}`,
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      (Array.isArray(data?.non_field_errors) ? data.non_field_errors.join(", ") : "") ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.body = data;
    throw err;
  }
     // ✅ return both data and status
  return { status: res.status, data };
}

export async function getAdminDashboard(period = "month") {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Not authenticated");

  return request(`${API_BASE}admin_dashboard/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
