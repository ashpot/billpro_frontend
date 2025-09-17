// // src/services/authService.js

// const API_BASE = "https://billwev.pythonanywhere.com/api/v1/rest-auth/";

// // --- tiny helper so every call behaves the same way ---
// async function request(url, options = {}) {
//   const res = await fetch(url, {
//     headers: { "Content-Type": "application/json", ...(options.headers || {}) },
//     ...options,
//   });

//   // Backend returns JSON on both success and error
//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     const message =
//       data?.error ||
//       data?.message ||
//       (Array.isArray(data?.non_field_errors) ? data.non_field_errors.join(", ") : "") ||
//       `Request failed (${res.status})`;
//     const err = new Error(message);
//     err.status = res.status;
//     err.body = data;
//     throw err;
//   }
//   return data;
// }

// // 1) Email Signup - creates account & sends email OTP
// export function emailSignup({ full_name, username, email, password, password2 }) {
//   return request(`${API_BASE}/admin_signup/`, {
//     method: "POST",
//     body: JSON.stringify({ full_name, username, email, password, password2 }),
//   });
// }


// export async function requestPasswordReset(/* { email } */) {
//   throw new Error("Password reset request endpoint not provided by backend yet.");
// }

// export async function performPasswordReset(/* { token, password } */) {
//   throw new Error("Password reset endpoint not provided by backend yet.");
// }


// src/services/authService.js

const API_BASE = "https://billwev.pythonanywhere.com/api/v1/rest-auth/";

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
  return request(`${API_BASE}admin_signup/`, {
    method: "POST",
    body: JSON.stringify({ full_name, username, email, password, password2 }),
  });
}

// 2) Admin Signin
export function adminSignin({ username, password }) {
  return request(`${API_BASE}admin_signin/`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// 3) Admin Forget Password - sends reset code + dev token
export function adminForgetPassword({ email }) {
  return request(`${API_BASE}admin_forget_password/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// 4) Admin Reset Password - requires token in URL path
export function adminResetPassword({ token, password, password2 }) {
  return request(`${API_BASE}admin_reset_password/${token}/`, {
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
