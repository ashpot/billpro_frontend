// src/services/userService.js
import { API_BASE } from "./serviceURLs";

async function request(url, options = {}) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
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

  return data;
}

// GET Admin Users
export function getAdminUsers() {
  return request(`${API_BASE}admin/users/`);
}
