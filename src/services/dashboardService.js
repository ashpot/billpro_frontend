// src/services/dashboardService.js

import { API_BASE } from "./serviceURLs";


export const formatAmount = (amount) => {
  return "₦" + new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}${getOrdinal(day)} ${month}, ${year} ${time}`;
};

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

  return request(`${API_BASE}admin/dashboard/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}


export async function getAirtimeDashboard() {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Not authenticated");

  return request(`${API_BASE}admin/services/airtime/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}