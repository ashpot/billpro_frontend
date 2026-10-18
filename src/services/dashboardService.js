import { apiRequest } from "./apiClient";

export const formatAmount = (amount) => {
  return "₦" + new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

export const formatToken = (num) => {
  if (num == null) return "-";
  return String(num).match(/.{1,4}/g)?.join("-") ?? String(num);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  const day = date.getDate();
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}${getOrdinal(day)} ${month}, ${year} ${time}`;
};


export function getAdminDashboard(period = "month") {
  const params = new URLSearchParams({ period });

  return apiRequest(`admin/dashboard/?${params.toString()}`, {
    method: "GET",
  });
}

export function getAirtimeDashboard() {
  return apiRequest("admin/services/airtime/", { method: "GET" });
}

export function getBettingDashboard() {
  return apiRequest("admin/services/betting/", { method: "GET" });
}

export function getDataDashboard() {
  return apiRequest("admin/services/data/", { method: "GET" });
}

export function getEducationDashboard() {
  return apiRequest("admin/services/education/", { method: "GET" });
}

export function getElectricityDashboard() {
  return apiRequest("admin/services/electricity/", { method: "GET" });
}

export function getTVDashboard() {
  return apiRequest("admin/services/tv/", { method: "GET" });
}
