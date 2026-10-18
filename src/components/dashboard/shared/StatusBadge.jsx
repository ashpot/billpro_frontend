
import React from "react";

const STATUS_STYLES = {
  success: {
    label: "Success",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  successful: {
    label: "Success",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
  failed: {
    label: "Failed",
    color: "bg-red-50 text-red-700 ring-red-200",
    dot: "bg-red-500",
  },
  declined: {
    label: "Declined",
    color: "bg-red-50 text-red-700 ring-red-200",
    dot: "bg-red-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  },
  refunded: {
    label: "Refunded",
    color: "bg-violet-50 text-violet-700 ring-violet-200",
    dot: "bg-violet-500",
  },
};

const StatusBadge = ({ status }) => {
  const rawStatus = String(status ?? "Unknown").trim();
  const normalizedStatus = rawStatus.toLowerCase();

  const config = STATUS_STYLES[normalizedStatus] || {
    label: rawStatus || "Unknown",
    color: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex min-w-[94px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold leading-4 ring-1 ring-inset ${config.color}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dot}`}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
