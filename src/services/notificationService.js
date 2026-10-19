
import { apiRequest } from "./apiClient";

export function getAdminNotifications({
  page = 1,
  pageSize = 10,
  search = "",
  status = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  if (search.trim()) params.set("search", search.trim());
  if (status && status !== "all") params.set("status", status);

  return apiRequest(`admin/notifications/?${params.toString()}`, {
    method: "GET",
  });
}

export function getAdminNotification(id) {
  return apiRequest(`admin/notifications/${id}/`, {
    method: "GET",
  });
}

export function sendAdminNotification(payload) {
  return apiRequest("admin/notifications/send/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
