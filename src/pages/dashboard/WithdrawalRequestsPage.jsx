
import { useCallback, useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaCheck,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import {
  getAdminWithdrawalRequests,
  completeWithdrawalRequest,
  cancelWithdrawalRequest,
} from "../../services/withdrawalRequestService";

const PAGE_SIZE = 10;

const formatCurrency = (value) => {
  const amount = Number(value ?? 0);

  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)}`;
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const normalizeStatus = (status) =>
  String(status ?? "Pending").trim().toLowerCase().replaceAll("_", " ");

const isPending = (status) => normalizeStatus(status) === "pending";

const getStatusClasses = (status) => {
  const value = normalizeStatus(status);

  if (["completed", "served", "successful", "success"].includes(value)) {
    return "bg-green-100 text-green-700";
  }

  if (["cancelled", "canceled", "failed", "rejected"].includes(value)) {
    return "bg-red-100 text-red-700";
  }

  if (value === "pending" || value === "processing") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-gray-100 text-gray-700";
};

const getCustomer = (request) => {
  const customer =
    request.customer ??
    request.user_details ??
    request.user ??
    {};

  if (typeof customer === "string") return customer;

  const fullName =
    customer.full_name ??
    `${customer.first_name ?? ""} ${customer.last_name ?? ""}`.trim();

  return (
    fullName ||
    customer.username ||
    customer.email ||
    request.customer_name ||
    request.user_name ||
    "Unknown customer"
  );
};

const getRequestAmount = (request) =>
  request.amount ??
  request.withdrawal_amount ??
  request.requested_amount ??
  0;

const getAccountNumber = (request) =>
  request.account_number ??
  request.accountNumber ??
  request.bank_account_number ??
  request.account?.account_number ??
  "—";

const getAccountName = (request) =>
  request.account_name ??
  request.accountName ??
  request.bank_account_name ??
  request.account?.account_name ??
  "—";

const getBankName = (request) =>
  request.bank_name ??
  request.bank ??
  request.bank_details?.name ??
  request.account?.bank_name ??
  "—";

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 break-words text-2xl font-bold text-gray-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function WithdrawalRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    served: 0,
    pending: 0,
  });

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const [confirmation, setConfirmation] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminWithdrawalRequests({
        page,
        pageSize: PAGE_SIZE,
        search,
        status: statusFilter,
      });

      const data = response?.data ?? response;
      const rows = Array.isArray(data)
        ? data
        : data?.results ?? data?.withdrawal_requests ?? data?.data ?? [];

      setRequests(Array.isArray(rows) ? rows : []);

      const count = Number(
        data?.count ?? data?.total_count ?? data?.pagination?.count ?? rows.length
      );

      setTotalCount(count);
      setTotalPages(
        Math.max(
          1,
          Number(
            data?.total_pages ??
              data?.pagination?.total_pages ??
              Math.ceil(count / PAGE_SIZE)
          )
        )
      );

      const summary = data?.stats ?? data?.summary ?? {};

      setStats({
        total: Number(
          summary.total_requests ??
            summary.total_request ??
            summary.total ??
            data?.total_requests ??
            count
        ),
        served: Number(
          summary.total_served ??
            summary.served_count ??
            summary.completed_count ??
            data?.total_served ??
            0
        ),
        pending: Number(
          summary.total_pending ??
            summary.pending_count ??
            data?.total_pending ??
            0
        ),
      });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load withdrawal requests."
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusFilter = (value) => {
    setPage(1);
    setStatusFilter(value);
  };

  const runRequestAction = async () => {
    if (!confirmation) return;

    const { request, action } = confirmation;
    const requestId = request.id ?? request.pk;

    if (!requestId) {
      setActionError("This withdrawal request has no valid ID.");
      setConfirmation(null);
      return;
    }

    setProcessingId(requestId);
    setActionError("");
    setActionMessage("");

    try {
      if (action === "complete") {
        await completeWithdrawalRequest(requestId);
      } else {
        await cancelWithdrawalRequest(requestId);
      }

      setActionMessage(
        action === "complete"
          ? `Withdrawal request #${requestId} marked as completed.`
          : `Withdrawal request #${requestId} cancelled.`
      );

      setConfirmation(null);
      await fetchRequests();
    } catch (err) {
      setActionError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          `Unable to ${action} this withdrawal request.`
      );

      setConfirmation(null);
    } finally {
      setProcessingId(null);
    }
  };

  const firstItem = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastItem = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <DashboardNavbar />

        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Page header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Withdrawal Requests
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage customer withdrawal requests.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchRequests}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
            >
              <FaSyncAlt
                size={13}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {/* Feedback messages */}
          {actionMessage && (
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              <FaCheckCircle className="mt-0.5 shrink-0" />
              <p>{actionMessage}</p>
              <button
                type="button"
                onClick={() => setActionMessage("")}
                className="ml-auto text-green-700 hover:text-green-900"
                aria-label="Dismiss message"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {actionError && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <FaExclamationCircle className="mt-0.5 shrink-0" />
              <p>{actionError}</p>
              <button
                type="button"
                onClick={() => setActionError("")}
                className="ml-auto text-red-700 hover:text-red-900"
                aria-label="Dismiss error"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Requests"
              value={stats.total.toLocaleString("en-NG")}
              icon={FaMoneyBillWave}
              description="All withdrawal requests"
            />

            <StatCard
              title="Total Served"
              value={stats.served.toLocaleString("en-NG")}
              icon={FaCheckCircle}
              description="Successfully completed requests"
            />

            <StatCard
              title="Total Pending"
              value={stats.pending.toLocaleString("en-NG")}
              icon={FaClock}
              description="Requests awaiting processing"
            />
          </section>

          {/* Table */}
          <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Withdrawal Requests
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review bank details and update pending requests.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <form onSubmit={handleSearch} className="flex">
                  <div className="relative min-w-0 flex-1">
                    <FaSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={13}
                    />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Search customer or ID..."
                      className="w-full rounded-l-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-r-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-700"
                  >
                    Search
                  </button>
                </form>

                <select
                  value={statusFilter}
                  onChange={(event) => handleStatusFilter(event.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-amber-500"
                  aria-label="Filter by status"
                >
                  <option value="">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
                <p className="mt-4 text-sm text-gray-500">
                  Loading withdrawal requests...
                </p>
              </div>
            ) : error ? (
              <div className="p-10 text-center">
                <p className="font-medium text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={fetchRequests}
                  className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Try Again
                </button>
              </div>
            ) : requests.length === 0 ? (
              <div className="p-12 text-center">
                <FaMoneyBillWave
                  className="mx-auto text-gray-300"
                  size={30}
                />
                <p className="mt-3 font-medium text-gray-700">
                  No withdrawal requests found
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or status filter.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1400px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-4 py-4 font-semibold">ID</th>
                        <th className="px-4 py-4 font-semibold">Customer</th>
                        <th className="px-4 py-4 text-right font-semibold">
                          Amount
                        </th>
                        <th className="px-4 py-4 font-semibold">
                          Account Number
                        </th>
                        <th className="px-4 py-4 font-semibold">
                          Account Name
                        </th>
                        <th className="px-4 py-4 font-semibold">Bank</th>
                        <th className="px-4 py-4 font-semibold">Status</th>
                        <th className="px-4 py-4 font-semibold">
                          Date Added
                        </th>
                        <th className="px-4 py-4 font-semibold">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {requests.map((request) => {
                        const requestId = request.id ?? request.pk;
                        const status = request.status ?? "Pending";
                        const pending = isPending(status);
                        const processing = processingId === requestId;

                        return (
                          <tr
                            key={requestId}
                            className="transition hover:bg-gray-50"
                          >
                            <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800">
                              {requestId ?? "—"}
                            </td>

                            <td className="px-4 py-4">
                              <div className="max-w-[200px]">
                                <p className="truncate font-medium text-gray-800">
                                  {getCustomer(request)}
                                </p>
                                {(request.customer?.email ||
                                  request.user?.email ||
                                  request.email) && (
                                  <p className="mt-1 truncate text-xs text-gray-400">
                                    {request.customer?.email ||
                                      request.user?.email ||
                                      request.email}
                                  </p>
                                )}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-gray-800">
                              {formatCurrency(getRequestAmount(request))}
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                              {getAccountNumber(request)}
                            </td>

                            <td className="px-4 py-4 text-gray-600">
                              {getAccountName(request)}
                            </td>

                            <td className="px-4 py-4 text-gray-600">
                              {getBankName(request)}
                            </td>

                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                  status
                                )}`}
                              >
                                {String(status).replaceAll("_", " ")}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                              {formatDate(
                                request.date_added ??
                                  request.created_at ??
                                  request.created ??
                                  request.date_created
                              )}
                            </td>

                            <td className="px-4 py-4">
                              {pending ? (
                                <div className="flex min-w-[230px] flex-wrap gap-2">
                                  <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => {
                                      setActionError("");
                                      setConfirmation({
                                        request,
                                        action: "complete",
                                      });
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                                  >
                                    <FaCheck size={10} />
                                    Mark as Completed
                                  </button>

                                  <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => {
                                      setActionError("");
                                      setConfirmation({
                                        request,
                                        action: "cancel",
                                      });
                                    }}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                                  >
                                    <FaTimes size={10} />
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">
                                  No actions available
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium text-gray-800">
                      {firstItem}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-800">
                      {lastItem}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-800">
                      {totalCount}
                    </span>{" "}
                    requests
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={page <= 1 || loading}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FaChevronLeft size={10} />
                      Previous
                    </button>

                    <span className="whitespace-nowrap px-2 text-sm text-gray-600">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setPage((current) =>
                          Math.min(totalPages, current + 1)
                        )
                      }
                      disabled={page >= totalPages || loading}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <FaChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>

      {/* Confirmation modal */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdrawal-confirmation-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                confirmation.action === "complete"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {confirmation.action === "complete" ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaExclamationCircle size={20} />
              )}
            </div>

            <h2
              id="withdrawal-confirmation-title"
              className="text-lg font-bold text-gray-900"
            >
              {confirmation.action === "complete"
                ? "Complete Withdrawal Request?"
                : "Cancel Withdrawal Request?"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {confirmation.action === "complete"
                ? "Confirm that this withdrawal has been paid to the customer's bank account. This action will mark the request as completed."
                : "Are you sure you want to cancel this withdrawal request? Confirm that cancellation is appropriate before proceeding."}
            </p>

            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Request ID</span>
                <span className="font-semibold text-gray-800">
                  {confirmation.request.id ?? confirmation.request.pk}
                </span>
              </div>

              <div className="mt-2 flex justify-between gap-4">
                <span className="text-gray-500">Customer</span>
                <span className="text-right font-medium text-gray-800">
                  {getCustomer(confirmation.request)}
                </span>
              </div>

              <div className="mt-2 flex justify-between gap-4">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(getRequestAmount(confirmation.request))}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={processingId !== null}
                onClick={() => setConfirmation(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Go Back
              </button>

              <button
                type="button"
                disabled={processingId !== null}
                onClick={runRequestAction}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
                  confirmation.action === "complete"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {processingId !== null
                  ? "Processing..."
                  : confirmation.action === "complete"
                    ? "Confirm Completion"
                    : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
