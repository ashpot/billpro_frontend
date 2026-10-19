
import { apiRequest } from "./apiClient";

export function getAdminWallets({ page = 1, pageSize = 10, search = "" } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  return apiRequest(`admin/wallets/?${params.toString()}`, {
    method: "GET",
  });
}

export function getAdminWalletDetails(id) {
  return apiRequest(`admin/wallets/${id}/`, {
    method: "GET",
  });
}




export function creditAdminWallet(id, amount) {
  return apiRequest(`admin/wallets/${id}/credit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ amount: String(amount) }).toString(),
  });
}

export function debitAdminWallet(id, amount) {
  return apiRequest(`admin/wallets/${id}/debit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ amount: String(amount) }).toString(),
  });
}

