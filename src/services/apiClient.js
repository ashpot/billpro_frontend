import { API_BASE } from "./serviceURLs";

/**
 * Shared fetch wrapper for Billwev API requests.
 *
 * Successful responses retain the existing service convention:
 * { status, data }
 *
 * Authenticated requests use Django REST Framework TokenAuthentication.
 */
export async function apiRequest(endpoint, options = {}, { authenticated = true } = {}) {
  const token = localStorage.getItem("admin_token");

  if (authenticated && !token) {
    const error = new Error("You are not authenticated. Please log in again.");
    error.status = 401;
    throw error;
  }

  const headers = new Headers(options.headers || {});

  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    headers.set("Authorization", `Token ${token}`);
  }

  const normalizedEndpoint = String(endpoint).replace(/^\/+/, "");
  const url = `${API_BASE}${normalizedEndpoint}`;

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (cause) {
    const error = new Error(
      "Unable to reach the server. Check your connection and API configuration."
    );
    error.cause = cause;
    error.isNetworkError = true;
    throw error;
  }

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json().catch(() => null);
    } else {
      const text = await response.text().catch(() => "");
      data = text ? { detail: text } : null;
    }
  }

  if (!response.ok) {
    // An authenticated request received an invalid or expired session.
    if (authenticated && response.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");

      // Notify protected routes so they can redirect immediately.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("billwev:unauthorized"));
      }
    }

    const message = getErrorMessage(data, response.status);

    const error = new Error(message);
    error.status = response.status;
    error.body = data;

    throw error;
  }

  return { status: response.status, data };
}

function getErrorMessage(data, status) {
  if (typeof data === "string" && data.trim()) return data;

  if (data && typeof data === "object") {
    if (typeof data.detail === "string") return data.detail;
    if (typeof data.error === "string") return data.error;
    if (typeof data.message === "string") return data.message;

    if (Array.isArray(data.non_field_errors)) {
      return data.non_field_errors.join(", ");
    }

    // Django REST Framework often returns field-level validation errors.
    const validationMessages = Object.entries(data)
      .map(([field, value]) => {
        if (Array.isArray(value)) return `${field}: ${value.join(", ")}`;
        if (typeof value === "string") return `${field}: ${value}`;
        return null;
      })
      .filter(Boolean);

    if (validationMessages.length) return validationMessages.join("; ");
  }

  if (status === 401) {
    return "Your session has expired. Please log in again.";
  }

  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (status >= 500) {
    return "The server encountered an error. Please try again later.";
  }

  return `Request failed (${status})`;
}
