import React, { useState} from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Overview from '../../components/dashboard/shared/Overview'
import Transactions from '../../components/dashboard/shared/Transactions'
import { Line } from "react-chartjs-2";
import { HiMiniCheckBadge } from "react-icons/hi2"; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BiSolidError } from "react-icons/bi";
import {Chart as ChartJS,LineElement,CategoryScale,LinearScale, PointElement, Tooltip, Filler,} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const Education = () => {
	const [activeFilter, setActiveFilter] = useState("Day");

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
	<div className='bg-gray-100 flex min-h-screen'>
		<Sidebar />

		<div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
			<DashboardNavbar title="Education"/>
			<Overview title="Overview" cardsData={cardsData}/>
			<div className="py-6 px-4 bg-white rounded-2xl"
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
			<Transactions
				title="Recent Transactions"
				columns={[
					{ header: "Transaction ID", key: "id" },
					{ header: "Customer", key: "customer" },
					{ header: "Amount", key: "amount" },
					{ header: "Biller", key: "biller" },
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
				]}
				data={[
					{ id: "TXN_001_5474756", customer: "Chioma", amount: "₦12,000", biller: "WAEC", status: "Completed", date: "Jul 20, 2025 | 13:21" },
					{ id: "TXN_002_0040400", customer: "Fummi", amount: "₦1,200", biller: "NECO", status: "Pending", date: "Jul 20, 2025 | 13:22" },
					{ id: "TXN_002_4848499", customer: "Chidi", amount: "₦10,000", biller: "JAMB", status: "Failed", date: "Jul 20, 2025 | 13:22" }
				]}
			/>
		</div>
	  
	</div>
  )
}

export default Education;
