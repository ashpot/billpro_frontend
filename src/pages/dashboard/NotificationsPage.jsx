
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
  FaEye,
} from "react-icons/fa";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import { getAdminNotifications } from "../../services/notificationService";

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

const statusStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "sent":
      return "bg-green-100 text-green-700";
    case "partial":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "no_devices":
      return "bg-gray-100 text-gray-600";
    case "pending":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const StatCard = ({ title, value, icon: Icon, iconClass }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-3 text-2xl font-bold text-gray-800">
          {Number(value || 0).toLocaleString("en-NG")}
        </p>
      </div>

      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon size={19} />
      </div>
    </div>
  </div>
);

const NotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    today: 0,
    this_week: 0,
    this_month: 0,
    all: 0,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminNotifications({
        page,
        pageSize,
        search,
        status: selectedStatus,
      });

      const data = response?.data ?? {};

      setNotifications(Array.isArray(data.results) ? data.results : []);
      setTotalCount(Number(data.count || 0));

      if (data.stats) {
        setStats({
          today: data.stats.today ?? 0,
          this_week: data.stats.this_week ?? 0,
          this_month: data.stats.this_month ?? 0,
          all: data.stats.all ?? data.count ?? 0,
        });
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(
        err?.message || "Unable to load notifications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, selectedStatus]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const openNotification = (notification) => {
    navigate(`/admin/notifications/${notification.id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <DashboardNavbar title="Notifications" />

        <div className="space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review notification history and sending results.
              </p>
            </div>

            <Link
              to="/admin/notifications/send"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <FaPaperPlane size={13} />
              Send Notification
            </Link>
          </div>

          {error && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={fetchNotifications}
                className="self-start font-semibold underline sm:self-auto"
              >
                Try again
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Notifications Today"
              value={stats.today}
              icon={FaCalendarDay}
              iconClass="bg-yellow-100 text-yellow-700"
            />
            <StatCard
              title="Notifications This Week"
              value={stats.this_week}
              icon={FaCalendarWeek}
              iconClass="bg-blue-100 text-blue-700"
            />
            <StatCard
              title="Notifications This Month"
              value={stats.this_month}
              icon={FaCalendarAlt}
              iconClass="bg-green-100 text-green-700"
            />
            <StatCard
              title="All Notifications"
              value={stats.all}
              icon={FaBell}
              iconClass="bg-purple-100 text-purple-700"
            />
          </div>

          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Notification History
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {totalCount.toLocaleString("en-NG")} notification records
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative">
                  <FaSearch
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search notifications"
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary sm:w-60"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(event) => {
                    setSelectedStatus(event.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="all">All statuses</option>
                  <option value="sent">Sent</option>
                  <option value="partial">Partially sent</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                  <option value="no_devices">No devices</option>
                </select>

                <button
                  type="submit"
                  className="rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-5 py-4 font-semibold">Notification</th>
                    <th className="px-5 py-4 font-semibold">Recipient</th>
                    <th className="px-5 py-4 font-semibold">Date Sent</th>
                    <th className="px-5 py-4 font-semibold">Devices</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">View</th>
                  </tr>
                </thead>

                <tbody>
                  {notifications.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => openNotification(item)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") openNotification(item);
                      }}
                      tabIndex={0}
                      role="link"
                      className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <td className="max-w-[340px] px-5 py-4">
                        <p className="truncate font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {item.body}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {item.receiver || "N/A"}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {formatDate(item.date_created)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {item.target_count ?? "—"}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                        >
                          {String(item.status || "Unknown")
                            .replace("_", " ")
                            .replace(/^./, (letter) => letter.toUpperCase())}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openNotification(item);
                          }}
                          aria-label={`View notification ${item.id}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-primary"
                        >
                          <FaEye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {!loading && notifications.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-14 text-center"
                      >
                        <FaBell className="mx-auto mb-3 text-3xl text-gray-300" />
                        <p className="font-medium text-gray-600">
                          No notifications found
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Try a different search or send a new notification.
                        </p>
                      </td>
                    </tr>
                  )}

                  {loading && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        Loading notifications...
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
                  onChange={handlePageSizeChange}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1.5 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => setPage((current) => current - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <FaChevronLeft size={12} />
                  </button>

                  <button
                    type="button"
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage((current) => current + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
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

export default NotificationsPage;
