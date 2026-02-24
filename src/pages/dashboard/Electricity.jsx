import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Overview from '../../components/dashboard/shared/Overview'
import Transactions from '../../components/dashboard/shared/Transactions'
import { Line } from "react-chartjs-2";
import { HiMiniCheckBadge } from "react-icons/hi2"; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BiSolidError } from "react-icons/bi";


const Electricity = () => {
  const [activeFilter, setActiveFilter] = useState("Day");

  
  
  const cardsData = [
    {
      icon: FaMoneyBillWave,
      color: 'text-blue-600',
      bgColor: 'blue',
      value: '9,673',
      label: 'Total Volume',
    },
    {
      icon: HiMiniCheckBadge,
      color: 'text-[#27D26E]',
      bgColor: 'green',
      value: '357',
      label: "Successful",
    },
    {
      icon: MdOutlinePendingActions,
      color: 'text-[#E39E00]',
      bgColor: 'yellow',
      value: '109',
      label: 'Pending',
    },
    {
      icon: BiSolidError,
      color: 'text-[#FF3030]',
      bgColor: 'red',
      value: '342',
      label: 'Failed',
    },
  ];

  return (
    <div className='bg-gray-100 flex max-h-full'>
        <Sidebar />

        <div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
            <DashboardNavbar title="Electricity"/>
            <Overview title="Overview" cardsData={cardsData}/>
            
            <Transactions
        title="Transactions"
        columns={[
          { header: "Transaction ID", key: "id" },
          { header: "Customer", key: "customer" },
          { header: "Amount", key: "amount" },
          { header: "Network", key: "network" },
          {
            header: "Status",
            key: "status",
            render: (value) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  value === "Completed"
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
          { header: "Date | Time", key: "date" },
          {header: "Action"}
        ]}
        data={[
          { id: "TXN_001_5474756", customer: "Chioma", amount: "₦12,000", network: "MTN-NG", status: "Completed", date: "Jul 20, 2025 | 13:21" },
          { id: "TXN_002_0040400", customer: "Fummi", amount: "₦1,200", network: "AIRTEL-NG", status: "Pending", date: "Jul 20, 2025 | 13:22" },
          { id: "TXN_002_4848499", customer: "Chidi", amount: "₦10,000", network: "GLO-NG", status: "Failed", date: "Jul 20, 2025 | 13:22" }
        ]} 
      />
        </div>
      
    </div>
  )
}

export default Electricity;
