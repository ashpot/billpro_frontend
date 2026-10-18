
import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import AccountStatus from "../../components/dashboard/shared/AccountStatus";
import UsersTable from "../../components/dashboard/shared/UsersTable";
import Overview from "../../components/dashboard/shared/Overview";
import KYCStatus from "../../components/dashboard/shared/UserStatus";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

import { PiUserFocusLight } from "react-icons/pi";
import { LiaUserCheckSolid } from "react-icons/lia";
import {
  FaUsers,
  FaGripLinesVertical,
  FaUserCheck,
  FaUserSlash,
  FaSignInAlt,
} from "react-icons/fa";

import { getAdminUsers } from "../../services/userService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const PERIODS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const numberFormatter = new Intl.NumberFormat("en-NG");

const formatNumber = (value) => numberFormatter.format(Number(value) || 0);

const formatCurrency = (value) =>
  "₦" +
  new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDate = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusClasses = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "active":
    case "verified":
      return "bg-green-100 text-green-700";

    case "pending":
    case "unverified":
    case "inactive":
      return "bg-yellow-100 text-yellow-700";

    case "suspended":
    case "deactivated":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getDefaultChartLabels = (period) => {
  if (period === "day") {
    return Array.from({ length: 24 }, (_, hour) =>
      String(hour).padStart(2, "0")
    );
  }

  if (period === "week") {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }

  return [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
};

const getChartTitle = (period) => {
  if (period === "day") return "Today's User Acquisition";
  if (period === "week") return "This Week's User Acquisition";
  return "Monthly User Acquisition";
};

const Users = () => {
  const [cardsData, setCardsData] = useState([]);
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("month");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminUsers(period);
      const data = response?.data ?? {};

      setUserStats(data);

      const cards = [
  {
    icon: FaUserCheck,
    color: "text-[#27D26E]",
    bgColor: "green",
    value: formatNumber(data.active_count),
    label: "Active Users",
  },
  {
    icon: FaUserSlash,
    color: "text-[#FDB813]",
    bgColor: "yellow",
    value: formatNumber(data.inactive_count),
    label: "Inactive Users",
  },
  {
    icon: FaUsers,
    color: "text-[#FF3030]",
    bgColor: "red",
    value: formatNumber(data.suspended_count),
    label: "Suspended Users",
  },
  {
    icon: FaSignInAlt,
    color: "text-blue-600",
    bgColor: "blue",
    value: formatNumber(data.today_login_count),
    label: "Today's Login",
  },
];

setCardsData(cards);
      const userRows = Array.isArray(data.user_table)
        ? data.user_table
        : [];

      const formattedUsers = (
  Array.isArray(data.user_table) ? data.user_table : []
).map((user) => ({
  id: user.id,
  photo: user.photo || "/media/users/default.jpg",
  name:
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.username ||
    "N/A",
  email: user.email || "N/A",
  phone: user.phone || "N/A",
  status: user.account_status || "Unknown",
  date: formatDate(user.date_joined),
}));

setUsers(formattedUsers);

      
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to load users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const growth = userStats.user_growth ?? {};

  const chartLabels = Array.isArray(growth.labels)
    ? growth.labels
    : getDefaultChartLabels(period);

  const chartValues = Array.isArray(growth.data)
    ? growth.data.map((value) => Number(value) || 0)
    : chartLabels.map(() => 0);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "New Users",
        data: chartValues,
        fill: true,
        backgroundColor: "rgba(255, 204, 0, 0.18)",
        borderColor: "rgba(255, 204, 0, 1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: period === "day" ? 2 : 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgba(255, 204, 0, 1)",
        pointBorderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            `New users: ${formatNumber(context.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#888888",
          maxRotation: 0,
          autoSkip: period !== "day",
          maxTicksLimit: period === "day" ? 24 : undefined,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: "#888888",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
          dash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 flex min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0 space-y-8 p-4 mb-5">
        <DashboardNavbar title="Users" />

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchUsers}
              className="self-start rounded-lg bg-red-100 px-4 py-2 font-semibold hover:bg-red-200 sm:self-auto"
            >
              Try again
            </button>
          </div>
        )}

        <section>
          <Overview title="Overview" cardsData={cardsData} />
        </section>

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          {/* User Growth Chart */}
          <section className="min-w-0 rounded-2xl bg-white px-4 py-6 sm:px-6 lg:col-span-2">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-secondaryLight sm:text-[23px]">
                  User Growth
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {getChartTitle(period)}
                </p>
              </div>

              <div
                className="flex w-fit items-center gap-1 rounded-full bg-[#F2F2F2] p-1"
                aria-label="User growth period"
              >
                {PERIODS.map((item) => {
                  const selected = period === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setPeriod(item.value)}
                      aria-pressed={selected}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "bg-primary text-white shadow-sm"
                          : "text-[#888888] hover:bg-white hover:text-gray-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">
                  New registrations
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {formatNumber(
                    typeof growth.total === "number"
                      ? growth.total
                      : chartValues.reduce((sum, value) => sum + value, 0)
                  )}
                </p>
              </div>

              <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                {period === "day"
                  ? "00:00 – 23:00"
                  : period === "week"
                  ? "Sunday – Saturday"
                  : "January – December"}
              </span>
            </div>

            <div className="relative mt-4 h-[250px] w-full sm:h-[280px]">
              {loading && users.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Loading user growth...
                </div>
              ) : chartValues.reduce((sum, value) => sum + value, 0) === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <FaUsers className="mb-3 text-3xl text-gray-300" />

                  <p className="font-medium text-gray-600">
                    No new registrations for this period
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    User acquisition data will appear here when users register.
                  </p>
                </div>
              ) : (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </section>

          {/* Account Status */}
          <div className="min-w-0 space-y-5">
            <AccountStatus
              active={userStats.verified_percentage ?? 0}
              pending={userStats.pending_percentage ?? 0}
              deactivated={userStats.deactivated_percentage ?? 0}
            />

            <KYCStatus />
          </div>
        </div>

        {/* Users Table */}
        <UsersTable
  users={users}
  loading={loading}
/>
      </div>
    </div>
  );
};

export default Users;
