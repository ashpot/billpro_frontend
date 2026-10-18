
import { apiRequest } from "./apiClient";

export function getAdminUsers(period = "month") {
  const params = new URLSearchParams({ period });

  return apiRequest(`admin/users/?${params.toString()}`, {
    method: "GET",
  });
}
