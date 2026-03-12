
import React, { useEffect, useState } from "react";
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Overview from '../../components/dashboard/shared/Overview'
import Transactions from '../../components/dashboard/shared/Transactions'
import { HiMiniCheckBadge } from "react-icons/hi2"; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BiSolidError } from "react-icons/bi";
import { getEducationDashboard, formatAmount, formatDate } from "../../services/dashboardService";
import { API_BASE } from "../../services/serviceURLs";


const Education = () => {

  const [dashboardData, setDashboardData] = useState(null);
  
   const [loadingId, setLoadingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      async function fetchDashboard() {
        try {
          setLoading(true);
          setError("");
          
          const response = await getEducationDashboard();
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
  

  
  const handleRequery = async (transactionId) => {
    const token = localStorage.getItem("admin_token");
  try {
    setLoadingId(transactionId);

    const response = await fetch(
      `${API_BASE}admin/transactions/${transactionId}/requery/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
          
        },
      }
    );

    if (!response.ok) {
      throw new Error("Requery failed");
    }

    const data = await response.json();
    console.log("Requery response:", data);

    // Optionally refresh dashboard data here

  } catch (error) {
    console.error("Requery failed:", error);
  } finally {
    setLoadingId(null);
  }
};


  
  const cardsData = [
    {
      icon: FaMoneyBillWave,
      color: 'text-blue-600',
      bgColor: 'blue',
      value: dashboardData.total,
      label: 'Total Volume',
    },
    {
      icon: HiMiniCheckBadge,
      color: 'text-[#27D26E]',
      bgColor: 'green',
      value: dashboardData.successful,
      label: "Successful",
    },
    {
      icon: MdOutlinePendingActions,
      color: 'text-[#E39E00]',
      bgColor: 'yellow',
      value: dashboardData.pending,
      label: 'Pending',
    },
    {
      icon: BiSolidError,
      color: 'text-[#FF3030]',
      bgColor: 'red',
      value: dashboardData.failed,
      label: 'Failed',
    },
  ];

  return (
  <div className='bg-gray-100 flex max-h-full'>
    <Sidebar />

    <div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
      <DashboardNavbar title="Education"/>
      <Overview title="Overview" cardsData={cardsData}/>
      
      
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
              { header: "Amount", key: "amount", render: (value) => formatAmount(value),},
              { header: "Description", key: "provider" ,
                 render: (provider) =>
                  `${provider?.name ?? ""}`.trim() 
              },
              {
                header: "Status",
                key: "status",
                render: (value) => (
                  <span
                    className={`px-5 py-2 rounded-full text-xs font-semibold ${
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
              { header: "Date | Time", key: "created_at", render: (value) => formatDate(value), },
              {
                header: "Action",
                key: "action",
                render: (_, row) =>
            row.status == "Pending" && (
              <button
                onClick={() => handleRequery(row.id)}
                disabled={loadingId === row.id}
                className="px-5 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingId === row.id ? "Requerying..." : "Requery"}
              </button>
            )
              },
            ]}
            data={dashboardData.transactions.length > 0 ? dashboardData.transactions : []}
          />
        </div>
    
  </div>
  )
}

export default Education;
