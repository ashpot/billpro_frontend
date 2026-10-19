
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave,
  FaPaperPlane,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import { getAdminWallets } from "../../services/walletService";

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

  return date.toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatCard = ({ title, value, icon: Icon, iconStyle }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-3 break-words text-2xl font-bold text-gray-800">
          {formatCurrency(value)}
        </p>
      </div>

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
      >
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [stats, setStats] = useState({
    total_wallet_sum: 0,
    deposits_today: 0,
    total_sent: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminWallets({
        page,
        pageSize,
        search,
      });

      const data = response?.data ?? {};

      // Supports either paginated results or a simple wallets array.
      const walletRows = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.wallets)
        ? data.wallets
        : Array.isArray(data.data)
        ? data.data
        : [];

      setWallets(walletRows);
      setTotalCount(
        Number(data.count ?? data.total_count ?? walletRows.length)
      );

      const summary = data.stats ?? data.summary ?? data;

      setStats({
        total_wallet_sum:
          summary.total_wallet_sum ?? summary.total_balance ?? 0,
        deposits_today:
          summary.deposits_today ?? summary.today_deposits ?? 0,
        total_sent:
          summary.total_sent ?? summary.total_amount_sent ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch wallets:", err);
      setError(
        err?.message || "Unable to load wallets. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardNavbar title="Wallets" />

        <div className="space-y-6 p-4 sm:p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Wallets
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor wallet balances, deposits and outgoing payments.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={fetchWallets}
                className="self-start font-semibold underline sm:self-auto"
              >
                Try again
              </button>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Wallet Sum"
              value={stats.total_wallet_sum}
              icon={FaWallet}
              iconStyle="bg-blue-100 text-blue-700"
            />

            <StatCard
              title="Deposits Today"
              value={stats.deposits_today}
              icon={FaMoneyBillWave}
              iconStyle="bg-green-100 text-green-700"
            />

            <StatCard
              title="Total Sent"
              value={stats.total_sent}
              icon={FaPaperPlane}
              iconStyle="bg-yellow-100 text-yellow-700"
            />
          </div>

          {/* Wallets table */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Wallets Table
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {totalCount.toLocaleString("en-NG")} wallet records
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex gap-2"
              >
                <div className="relative min-w-0 flex-1 sm:w-64">
                  <FaSearch
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search customer or wallet ID"
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-5 py-4 font-semibold">ID</th>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Balance</th>
                    <th className="px-5 py-4 font-semibold">Last Update</th>
                  </tr>
                </thead>

                <tbody>
                  {wallets.map((wallet, index) => {
                    const walletId = wallet.id ?? wallet.pk;
                    const customer =
                      wallet.customer ??
                      wallet.user_details ??
                      wallet.user ??
                      {};

                    const customerName =
                      typeof customer === "string"
                        ? customer
                        : customer.full_name ||
                          `${customer.first_name || ""} ${
                            customer.last_name || ""
                          }`.trim() ||
                          customer.username ||
                          customer.email ||
                          wallet.customer_name ||
                          "N/A";

                    return (
                      <tr
                        key={walletId ?? index}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-5 py-4">
                          {walletId != null ? (
                            <Link
                              to={`/admin/wallets/${walletId}`}
                              className="font-semibold text-primary hover:underline"
                              title="View wallet details"
                            >
                              #{walletId}
                            </Link>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {customer.photo && (
                              <img
                                src={customer.photo}
                                alt={customerName}
                                className="h-9 w-9 rounded-full bg-gray-100 object-cover"
                              />
                            )}

                            <div>
                              <p className="font-medium text-gray-800">
                                {customerName}
                              </p>
                              {customer.email && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {customer.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-800">
                          {formatCurrency(wallet.balance)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                          {formatDate(
                            wallet.updated_at ??
                              wallet.last_update ??
                              wallet.date_updated
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {!loading && wallets.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-14 text-center text-sm text-gray-500"
                      >
                        No wallets found.
                      </td>
                    </tr>
                  )}

                  {loading && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        Loading wallets...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Rows per page</span>
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1.5 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((current) => current - 1)}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft size={12} />
                  </button>

                  <button
                    type="button"
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage((current) => current + 1)}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default WalletsPage;
