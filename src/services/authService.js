
import { API_BASE } from "./serviceURLs";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  // Backend returns JSON on both success and error
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

// --- USER / ADMIN AUTH ENDPOINTS ---

// 1) Admin Signup - creates account & sends email verification
export function emailSignup({ full_name, username, email, password, password2 }) {
  return request(`${API_BASE}admin/auth/signup/`, {
    method: "POST",
    body: JSON.stringify({ full_name, username, email, password, password2 }),
  });
}

// 2) Admin Signin
export function adminSignin({ username, password }) {
  return request(`${API_BASE}admin/auth/login/`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// 3) Admin Forget Password - sends reset code + dev token
export function adminForgetPassword({ email }) {
  return request(`${API_BASE}admin/auth/password-reset/request/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// 4) Admin Reset Password - requires token in URL path
export function adminResetPassword({ token, password, password2 }) {
  return request(`${API_BASE}admin/auth/password-reset/`, {
    method: "POST",
    body: JSON.stringify({ password, password2 }),
  });
}

// --- Placeholders for non-admin reset (if backend adds them later) ---
export async function requestPasswordReset(/* { email } */) {
  throw new Error("Password reset request endpoint not provided by backend yet.");
}

export async function performPasswordReset(/* { token, password } */) {
  throw new Error("Password reset endpoint not provided by backend yet.");
}
