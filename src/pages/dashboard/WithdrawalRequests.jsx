import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Overview from '../../components/dashboard/shared/Overview'
import { Line, Doughnut } from "react-chartjs-2";
import { HiMiniCheckBadge } from "react-icons/hi2"; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BiSolidError } from "react-icons/bi";
import {Chart as ChartJS,LineElement,CategoryScale,LinearScale, PointElement, Tooltip, Filler, ArcElement} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, ArcElement);

const WithdrawalRequests = () => {
  const [activeFilter, setActiveFilter] = useState("Day");

  // Sample time labels & values for "Day"
  const labels = [
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  ];

  const values = [1200, 2500, 3000, 4400, 2700, 2300, 1200, 3000, 4100, 3500, 2900, 3100];

  const data = {
    labels,
    datasets: [
      {
        label: "Transactions",
        data: values,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(255, 193, 7, 0.3)");
          gradient.addColorStop(1, "rgba(255, 193, 7, 0)");
          return gradient;
        },
        borderColor: "rgba(255, 193, 7, 1)",
        tension: 0.1,
        pointBackgroundColor: "rgba(255, 193, 7, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#FFC107",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
        callbacks: {
          label: (context) => `₦${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888" },
      },
      y: {
        min: 1000,
        max: 5000,
        ticks: { color: "#888" },
        grid: { color: "rgba(200, 200, 200, 0.1)" },
      },
    },
  };
  const cardsData = [
    {
      icon: FaMoneyBillWave,
      color: 'text-[#FDB813]',
      bgColor: 'yellow',
      value: '9,673',
      label: 'Total Transactions',
    },
    {
      icon: HiMiniCheckBadge,
      color: 'text-[#27D26E]',
      bgColor: 'green',
      value: '357',
      label: "Total Revenue",
    },
    {
      icon: MdOutlinePendingActions,
      color: 'text-[#E13BA3]',
      bgColor: 'purple',
      value: '109',
      label: 'Avg TXN Value',
    },
    {
      icon: BiSolidError,
      color: 'text-[#2785D2]',
      bgColor: 'blue',
      value: '342',
      label: 'Total Users',
    },
  ];

  const topReferrers = {
    labels: [],
    datasets: [
    {
        data: [20,30,50,90, 30, 25, 12, 8, 5, 3],
        backgroundColor: ['#1D9BF0', '#7AF638', '#25F2E7', '#FF0FA5', '#FF7F0F', '#4F378B', '#FDB813', '#27D26E', '#FF3030', '#1E1E1E'],
        borderWidth: 0,
    },
    ],
  };


  return (
    <div className='bg-gray-100 flex max-h-full'>
        <Sidebar />

        <div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
            <DashboardNavbar title="Withdrawal Requests"/>
            <div className='grid grid-cols-5 grid-rows-4 gap-4'>
                <div className="py-6 px-4 bg-white rounded-2xl col-span-3 row-span-2"
                    style={{ maxHeight: "520px", minHeight: "400px" }}>
                    <div className="flex justify-between mb-3">
                        <h2 className="font-bold text-secondaryLight text-[23px] ">Transaction Trends</h2>
                        <div className="flex space-x-2 mt-5">
                        {["Day", "Week", "Month"].map((filter) => (
                            <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 text-sm rounded-3xl ${
                                activeFilter === filter
                                ? "text-white bg-primary"
                                : "text-[#B7B7B7] bg-[#F2F2F2]"
                            }`}
                            >
                            {filter}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div style={{ maxHeight: "520px", minHeight: "400px" }}>
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className="bg-white py-6 px-4 rounded-2xl col-span-2 row-span-2">
                    <div className="flex justify-between items-center mb-7">
                        <h2 className="text-[23px] text-secondaryLight font-bold">Top Referrers</h2>
                        <a href="#" className="text-secondary text-[17px] font-semibold">See All</a>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut data={topReferrers} />
                    </div>
                    <div className="mt-6 text-sm text-secondary flex justify-center">
                        <div className="grid grid-cols-2 mb-2 gap-3 font-semibold">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#1D9BF0] "></span> Airtime
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#7AF638]"></span> Betting
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#FF0FA5] "></span> Data
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#FF3030]"></span> Electricity
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#FF7F0F] "></span> Gift Cards
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#27D26E]"></span> Television
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-2 bg-[#4F378B]"></span>Convert Airtime
                            </div>
                            
                        </div>
                    </div>
                </div>
            {/* </div>
            <div className='grid grid-cols-3 gap-4'> */}
                <div className="py-6 px-4 bg-white rounded-2xl col-span-5 row-span-2"
                    style={{ maxHeight: "520px", minHeight: "400px" }}>
                    <div className="flex justify-between mb-3">
                        <h2 className="font-bold text-secondaryLight text-[23px] ">Withdrawal Requests Lists</h2>
                        <div className="flex space-x-2 mt-5">
                        
                        </div>
                    </div>
                    <div style={{ maxHeight: "520px", minHeight: "400px" }}>
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
                
            </div>
        </div>
      
    </div>
  )
}

export default WithdrawalRequests;
