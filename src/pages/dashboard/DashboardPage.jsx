
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import Overview from "../../components/dashboard/shared/Overview";
import Transactions from "../../components/dashboard/shared/Transactions";
import { Line } from "react-chartjs-2";
import { LuInfo } from "react-icons/lu";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiPlugsFill } from "react-icons/pi";
import {
  getAdminDashboard,
  formatAmount,
} from "../../services/dashboardService";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      if (dashboardData) {
        setChartLoading(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const response = await getAdminDashboard(period);

        if (cancelled) return;

        const data = response?.data ?? response;

        setDashboardData(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load dashboard data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setChartLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
    // Fetch dashboard data whenever the selected chart period changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!dashboardData && error) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
        <button
          onClick={() => setPeriod((current) => current)}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!dashboardData) return null;

  const cardsData = [
    {
      icon: FaUsers,
      color: "text-blue-600",
      bgColor: "blue",
      value: dashboardData.total_users ?? 0,
      label: "Total Users",
    },
    {
      icon: FaMoneyBillWave,
      color: "text-yellow-600",
      bgColor: "yellow",
      value: formatAmount(dashboardData.todays_total_amount ?? 0),
      label: "Today's Transactions",
    },
    {
      icon: MdOutlinePendingActions,
      color: "text-red-600",
      bgColor: "red",
      value: dashboardData.pending_transactions?.length ?? 0,
      label: "Pending Transactions",
    },
    {
  icon: MdOutlinePendingActions,
  color: "text-purple-600",
  bgColor: "purple",
  value: formatAmount(dashboardData.total_amount ?? 0),
  label: "Total Transactions",
},
  ];

  const trendLabels = Array.isArray(dashboardData.trend_labels)
    ? dashboardData.trend_labels
    : [];

  const trendValues = Array.isArray(dashboardData.trend_values)
    ? dashboardData.trend_values.map((value) => Number(value) || 0)
    : [];

  const periods = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  return (
    <div className="bg-gray-100 flex min-h-screen">
      <Sidebar />

      <div className="flex-1 space-y-8 p-4 mb-5 w-[80%]">
        <DashboardNavbar title="Dashboard" />

        <Overview title="Overview" cardsData={cardsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto items-stretch">
          {/* Transaction Trends Chart */}
          <div
            className="py-6 px-4 bg-white rounded-2xl lg:col-span-2"
            style={{ minHeight: "320px" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h2 className="font-bold text-secondaryLight text-[23px]">
                  Transaction Trends
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Successful transaction amounts
                </p>
              </div>

              <div className="flex space-x-2">
                {periods.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      if (period !== item.value) {
                        setPeriod(item.value);
                      }
                    }}
                    disabled={chartLoading}
                    aria-pressed={period === item.value}
                    className={`px-3 py-1 text-sm rounded-3xl transition-colors ${
                      period === item.value
                        ? "text-white bg-primary"
                        : "text-[#777777] bg-[#F2F2F2] hover:bg-gray-200"
                    } ${
                      chartLoading
                        ? "opacity-60 cursor-wait"
                        : "cursor-pointer"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {error && dashboardData && (
              <p className="text-sm text-red-500 mb-2">
                Could not refresh the dashboard: {error}
              </p>
            )}

            
<div
  style={{ height: "230px", width: "100%" }}
  className="mt-4 relative"
>
  {chartLoading && (
    <div className="absolute inset-0 z-10 flex items-start justify-center pt-8 bg-white/60">
      <span className="text-sm text-gray-500">
        Updating chart...
      </span>
    </div>
  )}

  {trendValues.length === 0 ? (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-3">
        <LuInfo size={24} className="text-yellow-600" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        No transaction data available
      </p>

      <p className="text-xs text-gray-500 mt-1 max-w-sm">
        There is no transaction activity to display for this period.
        Try another period or check back when transactions are recorded.
      </p>
    </div>
  ) : trendValues.every((value) => value === 0) ? (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mb-3">
        <LuInfo size={24} className="text-yellow-600" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        No successful transactions yet
      </p>

      <p className="text-xs text-gray-500 mt-1 max-w-sm">
        No successful transaction amounts were recorded during the{" "}
        {period === "day"
          ? "last 24 hours"
          : period === "week"
          ? "last 7 days"
          : "last 30 days"}
        . Your transaction trend will appear here when activity is recorded.
      </p>
    </div>
  ) : (
    <Line
      data={{
        labels: trendLabels,
        datasets: [
          {
            label: "Transaction Amount",
            data: trendValues,
            fill: true,
            backgroundColor: "rgba(255, 204, 0, 0.2)",
            borderColor: "rgba(255, 204, 0, 1)",
            tension: 0.4,
          },
        ],
      }}
      options={{
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
            callbacks: {
              label: (context) =>
                ` ${formatAmount(context.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "gray",
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: period === "day" ? 8 : 10,
            },
          },
          y: {
            beginAtZero: true,
            display: false,
            grid: { display: false },
          },
        },
        elements: {
          point: { radius: 0, hoverRadius: 5 },
        },
      }}
    />
  )}
</div>

          </div>

          {/* Pending Tickets Placeholder */}
          <div className="p-4 bg-white rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-secondaryLight text-[23px] flex gap-2 items-center">
                Pending Tickets
                <span className="text-red-500">
                  <LuInfo size={24} />
                </span>
              </h2>
            </div>

            <p className="text-gray-500 text-sm">
              No API for tickets yet.
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <Transactions
            title="Recent Transactions"
            rowsPerPage={10}
            showActions={false}
            data={dashboardData.recent_transactions ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
