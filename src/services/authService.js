import { apiRequest } from "./apiClient";

// Admin signup. This endpoint does not require an existing token.
export function emailSignup({ full_name, username, email, password, password2 }) {
  return apiRequest(
    "admin/auth/signup/",
    {
      method: "POST",
      body: JSON.stringify({ full_name, username, email, password, password2 }),
    },
    { authenticated: false }
  );
}

// Admin login. The token is stored by LoginPage after a successful response.
export function adminSignin({ username, password }) {
  return apiRequest(
    "admin/auth/login/",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    },
    { authenticated: false }
  );
}

export function adminForgetPassword({ email }) {
  return apiRequest(
    "admin/auth/password-reset/request/",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
    { authenticated: false }
  );
}

export function adminResetPassword({ token, password, password2 }) {
  return request(`${API_BASE}admin/auth/password-reset/`, {
    method: "POST",
    body: JSON.stringify({
      token,
      password,
      password2,
    }),
  });
}

export async function requestPasswordReset() {
  throw new Error("Password reset request endpoint not provided by backend yet.");
}

export async function performPasswordReset() {
  throw new Error("Password reset endpoint not provided by backend yet.");
}
