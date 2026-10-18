
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaWallet,
  FaUser,
  FaCreditCard,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { apiRequest } from "../../services/apiClient";
import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";

const formatCurrency = (value) =>
  "₦" +
  new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getTransactionStatusStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "successful":
    case "success":
    case "completed":
      return "border-green-300 bg-green-100 text-green-700";

    case "pending":
    case "processing":
      return "border-gray-300 bg-gray-100 text-gray-600";

    case "failed":
    case "reversed":
    case "declined":
      return "border-red-300 bg-red-100 text-red-700";

    default:
      return "border-gray-200 bg-gray-100 text-gray-600";
  }
};

const UserDetailsPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [virtualAccount, setVirtualAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState("10");

  useEffect(() => {
    let cancelled = false;

    async function fetchUserDetails() {
      try {
        setLoading(true);
        setError("");

        // The screenshot shows this backend resource URL.
        const response = await apiRequest(`admin/users/${id}/`, {
          method: "GET",
        });

        if (cancelled) return;

        const data = response?.data ?? {};

        setUser(data.user ?? data);
        setWallet(data.wallet ?? data.user?.wallet ?? null);
        setVirtualAccount(
          data.virtual_account ??
            data.dedicated_virtual_account ??
            data.user?.virtual_account ??
            null
        );

        const transactionList =
          data.transactions ??
          data.transaction_history ??
          data.user?.transactions ??
          [];

        setTransactions(
          Array.isArray(transactionList) ? transactionList : []
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load user details:", err);
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Unable to load this user's details."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) fetchUserDetails();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const fullName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    user?.username ||
    user?.email ||
    "User Details";

  const userPhoto =
    user?.photo ||
    user?.profile_photo ||
    "/media/users/default.jpg";

  const accountStatus = user?.account_status || "Unknown";

  const walletBalance =
    wallet?.balance ??
    user?.balance ??
    0;

  const filteredTransactions = transactions.filter((transaction) => {
    const query = search.toLowerCase();

    const matchesSearch = [
      transaction.reference,
      transaction.transaction_id,
      transaction.id,
      transaction.network,
      transaction.type,
      transaction.description,
      transaction.status,
    ].some((value) => String(value ?? "").toLowerCase().includes(query));

    const status = String(transaction.status || "").toLowerCase();

    const matchesStatus =
      statusFilter === "all" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayedTransactions = filteredTransactions.slice(
    0,
    Number(pageSize)
  );

  const handleWalletAction = (action) => {
    // Connect these actions to your existing wallet-management endpoints.
    // No balance is changed until the appropriate backend operation is implemented.
    window.alert(
      `${action} for ${fullName} requires the wallet action endpoint to be connected.`
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F4F6FF]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardNavbar title="User Details" />

        <div className="space-y-5 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/admin/users/overview"
              className="text-sm font-medium text-blue-500 hover:text-blue-700"
            >
              <span className="inline-flex items-center gap-2">
                <FaArrowLeft size={12} />
                Back to Users
              </span>
            </Link>

            <span className="text-sm text-gray-500">
              User ID: #{id}
            </span>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="ml-3 font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {loading && !user ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              Loading user details...
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
              {/* Left column */}
              <div className="space-y-5 xl:col-span-4">
                {/* Profile */}
                <section className="overflow-hidden rounded-2xl bg-white">
                  <div className="flex min-h-[210px] flex-col items-center justify-center px-5 py-8 text-center">
                    <img
                      src={userPhoto}
                      alt={fullName}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "/media/users/default.jpg";
                      }}
                      className="mb-4 h-16 w-16 rounded-full border border-gray-100 bg-gray-100 object-cover"
                    />

                    <h2 className="text-lg font-semibold text-gray-800">
                      {fullName}
                    </h2>

                    <p className="mt-1 text-sm text-blue-500">
                      @{user?.username || "N/A"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {user?.email || "No email address"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 border-t border-gray-100 px-3 py-5 text-center">
                    <div className="px-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatDate(user?.date_joined)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Date Joined
                      </p>
                    </div>

                    <div className="border-x border-gray-100 px-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {transactions.length}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Transactions
                      </p>
                    </div>

                    <div className="px-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {accountStatus}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Account Status
                      </p>
                    </div>
                  </div>
                </section>

                {/* Wallet */}
                <section className="overflow-hidden rounded-2xl bg-white">
                  <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
                    <h3 className="font-semibold text-gray-800">
                      Wallet
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-center gap-2 pb-4">
                      <FaWallet className="text-gray-400" size={18} />
                      <p className="text-3xl font-semibold tracking-tight text-gray-900">
                        {formatCurrency(walletBalance)}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-5">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleWalletAction("Credit")}
                          className="rounded-xl bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
                        >
                          Credit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleWalletAction("Debit")}
                          className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
                        >
                          Debit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("user-transactions")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                          View Ledger
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Dedicated Virtual Account */}
                <section className="overflow-hidden rounded-2xl bg-white">
                  <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
                    <h3 className="font-semibold text-gray-800">
                      Dedicated Virtual Account
                    </h3>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Account Name
                      </p>
                      <p className="mt-1 break-words text-sm text-gray-700">
                        {virtualAccount?.account_name ||
                          virtualAccount?.accountName ||
                          "Not available"}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Account Number
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {virtualAccount?.account_number ||
                          virtualAccount?.accountNumber ||
                          "Not available"}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Bank
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {virtualAccount?.bank_name ||
                          virtualAccount?.bankName ||
                          virtualAccount?.bank ||
                          "Not available"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column: transactions */}
              <section
                id="user-transactions"
                className="min-w-0 overflow-hidden rounded-2xl bg-white xl:col-span-8"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
                  <h3 className="font-semibold text-gray-800">
                    Transactions
                  </h3>
                </div>

                <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Show</span>

                    <select
                      value={pageSize}
                      onChange={(event) => setPageSize(event.target.value)}
                      className="rounded-md border border-gray-200 bg-white px-2 py-2 outline-none focus:border-indigo-400"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>

                    <span>entries</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <label className="relative">
                      <FaSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={12}
                      />
                      <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search transactions"
                        className="w-full rounded-md border border-gray-200 py-2 pl-8 pr-3 text-sm outline-none focus:border-indigo-400 sm:w-52"
                      />
                    </label>

                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(event) =>
                          setStatusFilter(event.target.value)
                        }
                        className="appearance-none rounded-md border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm outline-none focus:border-indigo-400"
                      >
                        <option value="all">All statuses</option>
                        <option value="successful">Successful</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="completed">Completed</option>
                      </select>
                      <FaChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={10}
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto px-4 pb-5">
                  <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                     <tr className="bg-gray-100 text-gray-700 uppercase">
                        {[
                          "Transaction ID",
                          "Amount",
                          "Network",
                          "Status",
                          "Date",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="whitespace-nowrap px-3 py-3 text-xs font-semibold first:rounded-l-lg last:rounded-r-lg"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {displayedTransactions.map((transaction, index) => {
                        const status =
                          transaction.status ||
                          transaction.transaction_status ||
                          "Unknown";

                        return (
                          <tr
                            key={
                              transaction.id ||
                              transaction.reference ||
                              transaction.transaction_id ||
                              index
                            }
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600">
                              {transaction.reference ||
                                transaction.transaction_id ||
                                transaction.id ||
                                "N/A"}
                            </td>

                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-700">
                              {formatCurrency(transaction.amount)}
                            </td>

                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600">
                              {transaction.network ||
                                transaction.service ||
                                transaction.type ||
                                "N/A"}
                            </td>

                            <td className="whitespace-nowrap px-3 py-5">
                              <span
                                className={`inline-flex min-w-[76px] justify-center rounded-full border px-3 py-2 text-xs ${getTransactionStatusStyle(
                                  status
                                )}`}
                              >
                                {status}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600">
                              {formatDate(
                                transaction.created_at ||
                                  transaction.date_added ||
                                  transaction.date
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {displayedTransactions.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-12 text-center text-sm text-gray-500"
                          >
                            {transactions.length === 0
                              ? "No transactions found for this user."
                              : "No transactions match your search."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
                  Showing{" "}
                  {displayedTransactions.length > 0 ? 1 : 0} to{" "}
                  {displayedTransactions.length} of{" "}
                  {filteredTransactions.length} entries
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDetailsPage;
