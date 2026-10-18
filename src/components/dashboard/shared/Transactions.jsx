
import React, { useMemo, useState } from "react";
import { LuSearch, LuRefreshCw, LuUndo2 } from "react-icons/lu";
import { formatAmount, formatDate } from "../../../services/dashboardService";

const STATUS_STYLES = {
  successful: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  processing: "bg-blue-50 text-blue-700 ring-blue-200",
  failed: "bg-red-50 text-red-700 ring-red-200",
  declined: "bg-red-50 text-red-700 ring-red-200",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
  reversed: "bg-violet-50 text-violet-700 ring-violet-200",
  refunded: "bg-violet-50 text-violet-700 ring-violet-200",
};

const STATUS_DOTS = {
  successful: "bg-emerald-500",
  success: "bg-emerald-500",
  completed: "bg-emerald-500",
  pending: "bg-amber-500",
  processing: "bg-blue-500",
  failed: "bg-red-500",
  declined: "bg-red-500",
  cancelled: "bg-slate-400",
  reversed: "bg-violet-500",
  refunded: "bg-violet-500",
};

const getCustomerName = (user) => {
  if (!user) return "—";

  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user.username || user.email || user.phone || "—";
};

const getServiceName = (transaction) => {
  const service = transaction.bill_service;

  if (typeof service === "string") return service;

  return (
    service?.name ||
    service?.title ||
    service?.service_name ||
    transaction.service_name ||
    "—"
  );
};


const getNetworkName = (transaction) => {
  const provider = transaction.provider;

  if (typeof provider === "string") return provider;

  return (
    provider?.name ||
    provider?.provider_name ||
    transaction.network ||
    "—"
  );
};

const getNetworkLogo = (transaction) => {
  const provider = transaction.provider;

  if (!provider || typeof provider !== "object") return "";

  return (
    provider.logo ||
    provider.logo_url ||
    provider.image ||
    provider.image_url ||
    provider.icon || 
    provider.photo ||
    provider.photo_url ||
    ""
  );
};


const getTransactionId = (transaction) =>
  transaction.transaction_id ||
  transaction.reference ||
  transaction.id ||
  "—";

const StatusBadge = ({ status }) => {
  const label = String(status || "Unknown");
  const normalized = label.trim().toLowerCase();

  const color =
    STATUS_STYLES[normalized] ||
    "bg-slate-100 text-slate-600 ring-slate-200";

  const dot = STATUS_DOTS[normalized] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold leading-4 ring-1 ring-inset ${color}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

const Transactions = ({
  title = "Transactions",
  data = [],
  rowsPerPage = 10,
  showActions = false,
  onRequery,
  onReverse,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeAction, setActiveAction] = useState(null);
  const [actionError, setActionError] = useState("");

  const safeData = Array.isArray(data) ? data : [];

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return safeData;

    return safeData.filter((transaction) => {
      const searchableValues = [
        getTransactionId(transaction),
        getCustomerName(transaction.user),
        transaction.user?.email,
        transaction.user?.phone,
        transaction.amount,
        getServiceName(transaction),
        getNetworkName(transaction),
        transaction.status,
        transaction.created_at,
      ];

      return searchableValues.some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );
    });
  }, [safeData, searchQuery]);

  const pageSize = Math.max(1, Number(rowsPerPage) || 10);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );
  const startIndex = (safeCurrentPage - 1) * pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  const pageItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (safeCurrentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  }, [totalPages, safeCurrentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const runAction = async (action, transaction) => {
    const callback = action === "requery" ? onRequery : onReverse;

    if (typeof callback !== "function") return;

    if (
      action === "reverse" &&
      !window.confirm(
        `Are you sure you want to reverse transaction ${getTransactionId(transaction)}?`
      )
    ) {
      return;
    }

    setActionError("");
    setActiveAction({ id: transaction.id, action });

    try {
      await callback(transaction);
    } catch (error) {
      setActionError(
        error?.message || `Unable to ${action} this transaction.`
      );
    } finally {
      setActiveAction(null);
    }
  };

  const columns = [
    {
      key: "transaction_id",
      header: "Transaction ID",
      render: (transaction) => (
        <span
          className="font-semibold text-secondaryLight"
          title={String(getTransactionId(transaction))}
        >
          {getTransactionId(transaction)}
        </span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (transaction) => (
        <div className="min-w-[120px]">
          <p className="font-semibold text-secondaryLight">
            {getCustomerName(transaction.user)}
          </p>
          {transaction.user?.email && (
            <p className="mt-0.5 text-xs font-normal text-gray-400">
              {transaction.user.email}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction) => (
        <span className="whitespace-nowrap font-semibold text-secondaryLight">
          {formatAmount(transaction.amount ?? 0)}
        </span>
      ),
    },
    {
      key: "service",
      header: "Service",
      render: (transaction) => getServiceName(transaction),
    },
    
{
  key: "network",
  header: "Network",
  render: (transaction) => {
    const name = getNetworkName(transaction);
    const logo = getNetworkLogo(transaction);

    return (
      <div className="flex min-w-[120px] items-center gap-2.5">
        {logo ? (
          <img
            src={logo}
            alt=""
            loading="lazy"
            className="h-8 w-8 shrink-0 rounded-full border border-gray-100 bg-white object-contain p-1"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500"
            aria-hidden="true"
          >
            {name !== "—" ? name.charAt(0).toUpperCase() : "?"}
          </div>
        )}

        <span className="font-medium text-secondaryLight">
          {name}
        </span>
      </div>
    );
  },
},

    {
      key: "status",
      header: "Status",
      render: (transaction) => (
        <StatusBadge status={transaction.status} />
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (transaction) => {
        if (!transaction.created_at) return "—";

        const date = new Date(transaction.created_at);

        return Number.isNaN(date.getTime())
          ? "—"
          : formatDate(transaction.created_at);
      },
    },
  ];

  if (showActions) {
    columns.push({
      key: "actions",
      header: "Actions",
      
render: (transaction) => {
  const isPending =
    String(transaction.status || "").trim().toLowerCase() === "pending";

  if (!isPending) {
    return <span className="text-gray-300">—</span>;
  }

  const isRequerying =
    activeAction?.id === transaction.id &&
    activeAction?.action === "requery";

  const isReversing =
    activeAction?.id === transaction.id &&
    activeAction?.action === "reverse";

  return (
    <div className="flex min-w-[190px] items-center gap-2">
      <button
        type="button"
        onClick={() => runAction("requery", transaction)}
        disabled={!onRequery || Boolean(activeAction)}
        title="Requery transaction status"
        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LuRefreshCw
          className={isRequerying ? "animate-spin" : ""}
          size={14}
        />
        {isRequerying ? "Requerying..." : "Requery"}
      </button>

      <button
        type="button"
        onClick={() => runAction("reverse", transaction)}
        disabled={!onReverse || Boolean(activeAction)}
        title="Reverse transaction"
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LuUndo2 size={14} />
        {isReversing ? "Reversing..." : "Reverse"}
      </button>
    </div>
  );
},

    });
  }

  return (
    <section className="mx-auto rounded-2xl bg-white p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-bold text-secondaryLight sm:text-[23px]">
          {title}
        </h2>

        <div className="relative w-full lg:max-w-sm">
          <input
            type="search"
            placeholder={`Search ${title}`}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl bg-[#F2F2F2] py-2.5 pl-4 pr-10 text-sm font-medium text-secondary outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <LuSearch
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {actionError && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] bg-white text-left text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-4 py-4 font-semibold uppercase tracking-wide text-secondary"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((transaction, index) => (
                <tr
                  key={
                    transaction.id ??
                    transaction.transaction_id ??
                    `${startIndex + index}`
                  }
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-4 py-4 text-gray-700"
                    >
                      {column.render
                        ? column.render(transaction)
                        : transaction[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center font-medium text-gray-500"
                >
                  {searchQuery
                    ? "No transactions match your search."
                    : "No transactions found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center sm:text-left">
            Showing {startIndex + 1}–{" "}
            {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
            {filteredData.length} records
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
              className="rounded-lg border bg-[#F2F2F2] px-3 py-2 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            {pageItems.map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-gray-400"
                  aria-hidden="true"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={
                    safeCurrentPage === page ? "page" : undefined
                  }
                  className={`min-w-9 rounded-lg border px-3 py-2 ${
                    safeCurrentPage === page
                      ? "border-primary bg-primary text-white"
                      : "bg-[#F2F2F2] text-secondary hover:bg-yellow-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(Math.max(totalPages, 1), page + 1)
                )
              }
              disabled={safeCurrentPage >= totalPages}
              className="rounded-lg border bg-[#F2F2F2] px-3 py-2 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Transactions;
