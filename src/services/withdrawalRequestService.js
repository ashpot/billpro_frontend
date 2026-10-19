
import { apiRequest } from "./apiClient";

export function getAdminWithdrawalRequests({
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
  if (status) params.set("status", status);

  return apiRequest(
    `admin/withdrawal-requests/?${params.toString()}`,
    { method: "GET" }
  );
}

export function completeWithdrawalRequest(id) {
  return apiRequest(`admin/withdrawal-requests/${id}/complete/`, {
    method: "POST",
  });
}

export function cancelWithdrawalRequest(id) {
  return apiRequest(`admin/withdrawal-requests/${id}/cancel/`, {
    method: "POST",
  });
}
