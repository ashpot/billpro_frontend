
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSyncAlt,
  FaPlus,
  FaMinus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import {
  getAdminWalletDetails,
  creditAdminWallet,
  debitAdminWallet,
} from "../../services/walletService";

const TRANSACTIONS_PER_PAGE = 10;

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

const getCustomerName = (customer, wallet) => {
  if (typeof customer === "string") return customer;

  const firstName = customer?.first_name ?? "";
  const lastName = customer?.last_name ?? "";
  const fullName =
    customer?.full_name ??
    customer?.get_full_name ??
    `${firstName} ${lastName}`.trim();

  return (
    fullName ||
    customer?.username ||
    customer?.email ||
    wallet?.customer_name ||
    wallet?.user_name ||
    "Unknown customer"
  );
};

const getStatusClasses = (status) => {
  const normalizedStatus = String(status ?? "")
    .toLowerCase()
    .replaceAll("_", " ");

  if (
    ["success", "successful", "completed", "paid"].includes(normalizedStatus)
  ) {
    return "bg-green-100 text-green-700";
  }

  if (
    ["failed", "failure", "rejected", "cancelled", "canceled"].includes(
      normalizedStatus
    )
  ) {
    return "bg-red-100 text-red-700";
  }

  if (
    ["pending", "processing", "initiated"].includes(normalizedStatus)
  ) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-gray-100 text-gray-700";
};

const getTransactionAmount = (transaction) =>
  transaction.amount ??
  transaction.transaction_amount ??
  transaction.value ??
  0;

const getTransactionType = (transaction) =>
  transaction.transaction_type ??
  transaction.type ??
  transaction.transaction_category ??
  transaction.description ??
  "Transaction";

const getTransactionReference = (transaction) =>
  transaction.reference ??
  transaction.transaction_reference ??
  transaction.id ??
  transaction.pk ??
  "—";

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 break-words text-xl font-bold text-gray-900">
            {value}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>

        <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function WalletDetailsPage() {
  const { id } = useParams();

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [transactionPage, setTransactionPage] = useState(1);

  const [walletAction, setWalletAction] = useState(null);
  const [actionAmount, setActionAmount] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const fetchWalletDetails = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminWalletDetails(id);
      const data = response?.data ?? response;

      const walletData = data?.wallet ?? data?.result ?? data;
      const transactionData =
        data?.transactions ??
        data?.recent_transactions ??
        walletData?.transactions ??
        [];

      setWallet(walletData);
      setTransactions(
        Array.isArray(transactionData)
          ? transactionData
          : transactionData?.results ?? []
      );
      setTransactionPage(1);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load wallet details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWalletDetails();
  }, [fetchWalletDetails]);

  const openWalletAction = (action) => {
    setWalletAction(action);
    setActionAmount("");
    setActionError("");
    setActionSuccess("");
  };

  const closeWalletAction = () => {
    if (actionLoading) return;

    setWalletAction(null);
    setActionAmount("");
    setActionError("");
    setActionSuccess("");
  };

  const handleWalletAction = async (event) => {
    event.preventDefault();

    const amount = Number(actionAmount);

    if (
      !actionAmount.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setActionError("Enter a valid amount greater than zero.");
      return;
    }

    setActionLoading(true);
    setActionError("");
    setActionSuccess("");

    try {
      const operation =
        walletAction === "credit"
          ? creditAdminWallet
          : debitAdminWallet;

      const response = await operation(id, amount);
      const data = response?.data ?? response;

      setActionSuccess(
        data?.message ||
          `Wallet ${
            walletAction === "credit" ? "credited" : "debited"
          } successfully.`
      );

      await fetchWalletDetails();
      setActionAmount("");
    } catch (err) {
      setActionError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          `Unable to ${
            walletAction === "credit" ? "credit" : "debit"
          } wallet. Please try again.`
      );
    } finally {
      setActionLoading(false);
    }
  };

  const customer =
    wallet?.customer ??
    wallet?.user_details ??
    wallet?.user ??
    wallet?.owner ??
    {};

  const customerName = getCustomerName(customer, wallet);

  const balance =
    wallet?.balance ??
    wallet?.available_balance ??
    wallet?.wallet_balance ??
    0;

  const totalDeposits =
    wallet?.total_deposits ??
    wallet?.deposits_total ??
    wallet?.total_deposited ??
    null;

  const totalSent =
    wallet?.total_sent ??
    wallet?.total_transfers ??
    wallet?.total_withdrawals ??
    null;

  const walletId = wallet?.id ?? wallet?.pk ?? id;

  const customerEmail =
    typeof customer === "object"
      ? customer?.email ?? wallet?.customer_email ?? wallet?.email
      : wallet?.customer_email ?? wallet?.email;

  const customerPhone =
    typeof customer === "object"
      ? customer?.phone ?? wallet?.customer_phone ?? wallet?.phone
      : wallet?.customer_phone ?? wallet?.phone;

  const customerId =
    typeof customer === "object"
      ? customer?.id ?? customer?.pk
      : wallet?.user_id;

  const lastUpdated =
    wallet?.updated_at ??
    wallet?.last_update ??
    wallet?.date_updated ??
    wallet?.modified_at;

  const createdAt =
    wallet?.created_at ??
    wallet?.date_created ??
    wallet?.date_added;

  const totalTransactionPages = Math.max(
    1,
    Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE)
  );

  const safeTransactionPage = Math.min(
    transactionPage,
    totalTransactionPages
  );

  const startIndex =
    (safeTransactionPage - 1) * TRANSACTIONS_PER_PAGE;

  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + TRANSACTIONS_PER_PAGE
  );

  const firstTransaction =
    transactions.length === 0 ? 0 : startIndex + 1;

  const lastTransaction = Math.min(
    startIndex + TRANSACTIONS_PER_PAGE,
    transactions.length
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <DashboardNavbar />

        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Link
                to="/admin/wallets"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-amber-600"
              >
                <FaArrowLeft size={12} />
                Back to Wallets
              </Link>

              <h1 className="text-2xl font-bold text-gray-900">
                Wallet Details
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View wallet information, customer details, and transactions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => openWalletAction("credit")}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <FaPlus size={12} />
                Credit Wallet
              </button>

              <button
                type="button"
                onClick={() => openWalletAction("debit")}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <FaMinus size={12} />
                Debit Wallet
              </button>

              <button
                type="button"
                onClick={fetchWalletDetails}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSyncAlt
                  className={loading ? "animate-spin" : ""}
                  size={13}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
              <p className="mt-4 text-sm text-gray-500">
                Loading wallet details...
              </p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="font-semibold text-red-700">
                Could not load wallet
              </p>
              <p className="mt-1 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchWalletDetails}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Wallet details */}
          {!loading && !error && wallet && (
            <>
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                  title="Current Wallet Balance"
                  value={formatCurrency(balance)}
                  icon={FaWallet}
                  description="Available wallet balance"
                />

                <StatCard
                  title="Total Deposits"
                  value={
                    totalDeposits !== null
                      ? formatCurrency(totalDeposits)
                      : "—"
                  }
                  icon={FaMoneyBillWave}
                  description="Total deposits recorded"
                />

                <StatCard
                  title="Total Sent"
                  value={
                    totalSent !== null
                      ? formatCurrency(totalSent)
                      : "—"
                  }
                  icon={FaExchangeAlt}
                  description="Total amount sent"
                />
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Wallet information */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
                  <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Wallet Information
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Account details and wallet metadata
                      </p>
                    </div>

                    <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                      <FaWallet size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Wallet ID
                      </p>
                      <p className="mt-1 break-all font-semibold text-gray-800">
                        {walletId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Balance
                      </p>
                      <p className="mt-1 font-semibold text-gray-800">
                        {formatCurrency(balance)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Date Created
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {formatDate(createdAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Last Updated
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {formatDate(lastUpdated)}
                      </p>
                    </div>

                    {wallet?.currency && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Currency
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {wallet.currency}
                        </p>
                      </div>
                    )}

                    {wallet?.status && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          Status
                        </p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            wallet.status
                          )}`}
                        >
                          {wallet.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customer information */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <FaUser size={18} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-gray-900">
                        Customer
                      </h2>
                      <p className="truncate text-sm text-gray-500">
                        {customerName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <FaUser className="mt-1 text-gray-400" size={14} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Full Name</p>
                        <p className="mt-1 break-words text-sm font-medium text-gray-800">
                          {customerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaEnvelope
                        className="mt-1 text-gray-400"
                        size={14}
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                          Email Address
                        </p>
                        <p className="mt-1 break-all text-sm text-gray-700">
                          {customerEmail || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaPhone className="mt-1 text-gray-400" size={14} />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                          Phone Number
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {customerPhone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    {customerId && (
                      <Link
                        to={`/admin/users/${customerId}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        View Customer Profile
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </section>

              {/* Transaction history */}
              <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Wallet Transactions
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Transactions associated with this wallet
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {transactions.length}{" "}
                    {transactions.length === 1
                      ? "transaction"
                      : "transactions"}
                  </span>
                </div>

                {transactions.length === 0 ? (
                  <div className="p-10 text-center">
                    <FaCalendarAlt
                      className="mx-auto text-gray-300"
                      size={28}
                    />
                    <p className="mt-3 font-medium text-gray-700">
                      No transactions found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Transactions will appear here when available.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[850px] text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                          <tr>
                            <th className="px-5 py-4 font-semibold">
                              Reference / ID
                            </th>
                            <th className="px-5 py-4 font-semibold">
                              Type
                            </th>
                            <th className="px-5 py-4 text-right font-semibold">
                              Amount
                            </th>
                            <th className="px-5 py-4 font-semibold">
                              Status
                            </th>
                            <th className="px-5 py-4 font-semibold">
                              Date
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {paginatedTransactions.map(
                            (transaction, index) => {
                              const transactionId =
                                transaction.id ??
                                transaction.pk ??
                                `${safeTransactionPage}-${index}`;

                              const status =
                                transaction.status ??
                                transaction.transaction_status ??
                                "Unknown";

                              return (
                                <tr
                                  key={transactionId}
                                  className="transition hover:bg-gray-50"
                                >
                                  <td className="px-5 py-4 font-medium text-gray-800">
                                    {getTransactionReference(transaction)}
                                  </td>

                                  <td className="px-5 py-4 text-gray-600">
                                    {getTransactionType(transaction)}
                                  </td>

                                  <td className="px-5 py-4 text-right font-semibold text-gray-800">
                                    {formatCurrency(
                                      getTransactionAmount(transaction)
                                    )}
                                  </td>

                                  <td className="px-5 py-4">
                                    <span
                                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                        status
                                      )}`}
                                    >
                                      {String(status).replaceAll("_", " ")}
                                    </span>
                                  </td>

                                  <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                                    {formatDate(
                                      transaction.created_at ??
                                        transaction.date_created ??
                                        transaction.created ??
                                        transaction.date ??
                                        transaction.timestamp
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-medium text-gray-800">
                          {firstTransaction}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium text-gray-800">
                          {lastTransaction}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-800">
                          {transactions.length}
                        </span>{" "}
                        transactions
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setTransactionPage((current) =>
                              Math.max(1, current - 1)
                            )
                          }
                          disabled={safeTransactionPage === 1}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FaChevronLeft size={10} />
                          Previous
                        </button>

                        <span className="whitespace-nowrap px-2 text-sm text-gray-600">
                          Page {safeTransactionPage} of{" "}
                          {totalTransactionPages}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setTransactionPage((current) =>
                              Math.min(
                                totalTransactionPages,
                                current + 1
                              )
                            )
                          }
                          disabled={
                            safeTransactionPage === totalTransactionPages
                          }
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
            </>
          )}

          {!loading && !error && !wallet && (
            <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <FaWallet className="mx-auto text-gray-300" size={32} />
              <h2 className="mt-3 font-semibold text-gray-800">
                Wallet not found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                No wallet information was returned for this ID.
              </p>
              <Link
                to="/admin/wallets"
                className="mt-4 inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Return to Wallets
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* Credit / Debit modal */}
      {walletAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeWalletAction();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-action-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${
                    walletAction === "credit"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {walletAction === "credit" ? (
                    <FaPlus size={18} />
                  ) : (
                    <FaMinus size={18} />
                  )}
                </div>

                <h2
                  id="wallet-action-title"
                  className="text-xl font-bold text-gray-900"
                >
                  {walletAction === "credit"
                    ? "Credit Wallet"
                    : "Debit Wallet"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {walletAction === "credit"
                    ? "Add funds to this customer's wallet."
                    : "Deduct funds from this customer's wallet."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeWalletAction}
                disabled={actionLoading}
                aria-label="Close modal"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-5 rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Customer</p>
              <p className="mt-1 font-semibold text-gray-800">
                {customerName}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Current balance: {formatCurrency(balance)}
              </p>
            </div>

            <form onSubmit={handleWalletAction}>
              <label
                htmlFor="wallet-action-amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Amount (₦)
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₦
                </span>

                <input
                  id="wallet-action-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  required
                  autoFocus
                  value={actionAmount}
                  onChange={(event) =>
                    setActionAmount(event.target.value)
                  }
                  placeholder="0.00"
                  disabled={actionLoading || Boolean(actionSuccess)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-8 pr-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:bg-gray-100"
                />
              </div>

              {actionError && (
                <p
                  role="alert"
                  className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {actionError}
                </p>
              )}

              {actionSuccess && (
                <p
                  role="status"
                  className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                >
                  {actionSuccess}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeWalletAction}
                  disabled={actionLoading}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {actionSuccess ? "Close" : "Cancel"}
                </button>

                {!actionSuccess && (
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      walletAction === "credit"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {actionLoading
                      ? "Processing..."
                      : walletAction === "credit"
                        ? "Confirm Credit"
                        : "Confirm Debit"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
