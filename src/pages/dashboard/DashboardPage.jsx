
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/shared/Sidebar";
import DashboardNavbar from "../../components/dashboard/shared/DashboardNavbar";
import Overview from "../../components/dashboard/shared/Overview";
import Transactions from "../../components/dashboard/shared/Transactions";
import { Line } from "react-chartjs-2";
import { LuInfo } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiPlugsFill } from "react-icons/pi";
import { formatDate, getAdminDashboard } from "../../services/dashboardService";
import { formatAmount } from "../../services/dashboardService";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");
        
        const response = await getAdminDashboard("month"); // default period
        console.log(response.data);
        setDashboardData(response.data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!dashboardData) return null;

  // --- Map API data to cards ---
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
      value: `${formatAmount(dashboardData.todays_total_amount) ?? 0.00}`,
      label: "Today's Transactions",
    },
    {
      icon: MdOutlinePendingActions,
      color: "text-red-600",
      bgColor: "red",
      value: dashboardData.pending_transactions.length ?? 0,
      label: "Pending Transactions",
    },
    {
      icon: PiPlugsFill,
      color: "text-[#27D26E]",
      bgColor: "green",
      value: "Online",
      valueColor: "text-[#27D26E]",
      label: "API Status",
    },
  ];

  // --- Map trend data for chart ---
  const trendLabels = dashboardData.trend_labels || [];
  const trendValues = dashboardData.trend_values || [];

  return (
    <div className="bg-gray-100 flex min-h-screen">
      <Sidebar />

      <div className="flex-1 space-y-8 p-4 mb-5 w-[80%]">
        <DashboardNavbar title="Dashboard" />

        {/* Overview Cards */}
        <Overview title="Overview" cardsData={cardsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto items-stretch">
          {/* Transaction Trends Chart */}
          <div
            className="py-6 px-4 bg-white rounded-2xl lg:col-span-2"
            style={{ maxHeight: "320px", minHeight: "300px" }}
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-secondaryLight text-[23px] ">
                Transaction Trends
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl">
                  Day
                </button>
                <button className="px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl">
                  Week
                </button>
                <button className="px-3 py-1 text-sm text-white bg-primary rounded-3xl">
                  Month
                </button>
              </div>
            </div>
            <div
              style={{ height: "calc(100% - 2rem)", width: "100%" }}
              className="mt-4"
            >
              <Line
                data={{
                  labels: trendLabels,
                  datasets: [
                    {
                      label: "Transactions",
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
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: "gray" },
                    },
                    y: {
                      display: false,
                      grid: { display: false },
                    },
                  },
                  elements: {
                    point: { radius: 0 },
                  },
                }}
              />
            </div>
          </div>

          {/* Pending Tickets Placeholder (no API yet) */}
          <div className="p-4 bg-white rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-secondaryLight text-[23px] flex gap-2 items-center">
                Pending Tickets <span className="text-red-500"><LuInfo size={24} /></span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm">No API for tickets yet.</p>
          </div>
        </div>

        {/* Recent Transactions */}
        
        <div>
          <Transactions
            title="Recent Transactions"
            columns={[
              { header: "Transaction ID", key: "transaction_id" },
              {
                header: "Customer",
                key: "user",
                render: (user) =>
                  `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || user?.username
              },
              { header: "Amount", key: "amount", 
                render:(value) => formatAmount(value)
              },
              { header: "Description", key: "provider", render: (provider) => `${provider?.name}`},
              {
                header: "Status",
                key: "status",
                render: (value) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      value === "Successful"
                        ? "bg-green-200 text-green-800"
                        : value === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {value}
                  </span>
                ),
              },
              { header: "Date | Time", key: "created_at", render: (value) => formatDate(value)},
            ]}
            data={dashboardData.recent_transactions.length > 0 ? dashboardData.recent_transactions : []}
          />
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;
