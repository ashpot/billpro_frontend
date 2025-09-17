// src/services/userService.js

const API_BASE = "https://billwev.pythonanywhere.com/api/v1/rest-auth/";

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
  return request(`${API_BASE}/admin_user_management/`);
}
