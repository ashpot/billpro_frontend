
import React from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import Card from '../../components/dashboard/shared/Card';
import profileSummary from '../../assets/images/ProfileSummary.png'
import profilepicture from '../../assets/images/profilepicture.png'
import { CheckCircle } from "lucide-react";
import { FaSackDollar } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaGripLinesVertical } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { RiVisaLine } from "react-icons/ri";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Phone, Zap, Wifi } from "lucide-react";
import {Chart as ChartJS, BarElement, LineElement,CategoryScale,LinearScale, PointElement, Tooltip, Filler, ArcElement} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, ArcElement, BarElement);

const UserProfile = () => {
	const transactions = [
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "MTN Airtime",
      sub: "2468×yz123BP",
      number: "08012345678",
      date: "25 July 2025",
      status: "Completed",
      amount: "-₦500",
    },
    {
      icon: <Zap className="w-6 h-6 text-green-500" />,
      title: "Electricity",
      sub: "2468×yz123BP",
      number: "0000001100",
      date: "25 July 2025",
      status: "Completed",
      amount: "-₦12,000",
    },
    {
      icon: <Wifi className="w-6 h-6 text-sky-500" />,
      title: "MTN Data",
      sub: "2468×yz123BP",
      number: "08012345678",
      date: "25 July 2025",
      status: "Completed",
      amount: "-₦1,500",
    },
	];
	const userSpendingData = {
		labels: [],
		datasets: [
		{
			data: [400, 300, 600, 200],
			backgroundColor: ['#0088FE', '#FF80BF', '#00C49F', '#FFBB28'],
			borderWidth: 0,
		},
		],
	};

	const debitCreditData = {
		labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
		datasets: [
		{
			label: 'Debit',
			data: [2460, 1800, 1500, 2000, 1300, 1700, 2200], // Adjusted to match visual proportions
			backgroundColor: '#FFC107',
			borderRadius: 8,
		},
		{
			label: 'Credit',
			data: [420, 300, 200, 500, 250, 350, 400], // Adjusted to match visual proportions
			backgroundColor: '#4CAF50',
			borderRadius: 8,
		},
		],
	};
	const referralsData = { total: 16, successful: 8 };

	const KYCdata = {
		labels: ['Phone/Email', 'BVN', 'Address'],
		datasets: [
		{
			data: [50, 25, 25], // Percentages summing to 75% of the total
			backgroundColor: ['#3B82F6', '#3B82F6', '#D1D5DB'], // Blue for completed, gray for remaining
			borderWidth: 0,
			cutout: '70%', // Makes it a donut chart
		},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
		legend: {
			display: false, // Hide legend, we'll handle it manually
		},
		tooltip: {
			enabled: false, // Disable tooltips
		},
		},
		rotation: -90, // Start from top
		circumference: 270, // 75% of full circle (270 degrees out of 360)
	};

	return (
		<div className='bg-gray-100 flex max-h-full'>
			<Sidebar />

			<div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
				<DashboardNavbar title="User Profile"/>
				<div className="relative mb-6">
					<img
						src={profileSummary}
						alt="Background"
						className="w-full object-cover "
					/>

					<div className="absolute inset-0 flex items-center px-6">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center">
								<div className="relative">
									<img
										src={profilepicture} 
										alt="Chioma Okafor"
										className="w-[80%] h-[80%] rounded-full "
									/>
									<span className="absolute top-4 right-10 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
								</div>

								<div>
									<div className="flex items-center space-x-1">
										<h2 className="text-white font-bold text-[23px]">Chioma Okafor</h2>
										<CheckCircle className="w-4 h-4 text-primary" />
									</div>
									<p className="text-gray-200 font-medium text-base">chioma@gmail.com</p>
									<p className="text-gray-300 font-medium text-base">Abia, Nigeria</p>
								</div>
							</div>

							<div className="flex space-x-7">
								<button className="px-4 py-2 bg-white text-secondaryLight text-base font-semibold rounded-lg shadow">
								Send Message
								</button>
								<button className="px-6 py-2 bg-primary text-white text-base font-semibold rounded-lg shadow">
								Suspend
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='mx-auto bg-white p-4 rounded-2xl'>
					<h1 className='font-bold text-secondaryLight text-[23px] mb-3'>Wallet Summary</h1>

					<div className="space-x-4 flex">
						<Card>
							<div className="flex items-center py-4 space-x-2">
								<FaSackDollar className="text-xl text-blue-600 bg-blue-100 rounded-full w-10 h-10 p-2 border border-blue-600" />
								<div className='leading-none'>
									<p className="text-sm font-semibold text-secondary">Wallet Balance</p>
									<p className="text-[29px] text-secondaryLight font-bold">₦13,673</p>
								</div>
							</div>
						</Card>
						<Card>
							<div className="flex items-center py-4 space-x-2">
								<FaHandHoldingDollar className="text-xl text-[#27D26E] bg-green-100 rounded-full w-10 h-10 p-2 border border-[#27D26E]" />
								<div className='leading-none'>
									<p className="text-sm font-semibold text-secondary">Total Credit</p>
									<p className="text-[29px] text-secondaryLight font-bold">₦120,600</p>
								</div>
							</div>
						</Card>
						<Card>
							<div className="flex items-center py-4 space-x-2">
								<FaFileInvoiceDollar className="text-xl text-red-600 bg-red-100 rounded-full w-10 h-10 p-2 border border-red-600" />
								<div className='leading-none'>
									<p className="text-sm font-semibold text-secondary">Total Debit</p>
									<p className="text-[29px] text-secondaryLight font-bold">₦89,750</p>
								</div>
							</div>
						</Card>
						<Card>
							<div className="flex items-center py-4 space-x-2">
								<FaGripLinesVertical className="text-xl text-[#27D26E] bg-green-100 rounded-full w-10 h-10 p-2 border border-[#27D26E]" />
								<div className='leading-none'>
									<p className="text-base font-semibold text-secondary">Account Status</p>
									<p className="text-[29px] font-bold text-[#27D26E]">Active</p>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-4'>
					<div className="bg-white rounded-2xl p-5 col-span-2">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-[29px] font-bold text-secondaryLight">Latest Transactions</h2>
							<button className="text-secondary text-[23px] font-semibold">See All</button>
						</div>

						<div className="space-y-4">
							{transactions.map((t, i) => (
							<div
								key={i}
								className="flex justify-between items-center border-b last:border-0 pb-3"
							>
								<div className="flex items-center gap-3">
									<div className="bg-gray-100 p-2 rounded-full">{t.icon}</div>
										<div>
											<p className="font-semibold text-base text-secondaryLight">{t.title}</p>
											<p className="text-sm font-semibold text-secondary">{t.sub}</p>
										</div>
									</div>
									<p className="font-semibold text-base text-secondaryLight">{t.number}</p>
									<p className="font-semibold text-base text-secondary">{t.date}</p>
									<span className="px-3 py-1 rounded-xl border border-[#7EE4A8] bg-[#E9FAF1] text-[#27D26E] font-semibold text-base">
									{t.status}
									</span>
									<p className="text-[#FE5C73] text-base font-semibold">{t.amount}</p>
								</div>
								))}
						</div>
					</div>

					<div className="bg-white p-4 rounded-2xl">
						<h2 className="text-[23px] text-secondaryLight font-bold mb-4">User Spending</h2>
						<div className="h-64 flex items-center justify-center">
							<Doughnut data={userSpendingData} />
						</div>
						<div className="mt-4 text-sm text-secondary flex justify-center">
							<div className="grid grid-cols-2 mb-2 gap-3 font-semibold">
								<div className="flex items-center">
									<span className="w-3 h-3 rounded-full mr-2 bg-[#0088FE] "></span> Television
								</div>
								<div className="flex items-center">
									<span className="w-3 h-3 rounded-full mr-2 bg-[#00C49F]"></span> Electricity
								</div>
							{/* </div> */}
							{/* <div className="flex justify-between"> */}
								<div className="flex items-center">
									<span className="w-3 h-3 rounded-full mr-2 bg-[#FF80BF]"></span> Airtime
								</div>
								<div className="flex items-center">
									<span className="w-3 h-3 rounded-full mr-2 bg-[#FFBB28]"></span> Convert
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-5 grid-rows-1 gap-4'>
					<div className="bg-white p-4 rounded-2xl col-span-3 row-span-2">
						<div className="flex justify-between items-center mb-2">
							<h2 className="text-[29px] font-bold text-secondaryLight">Debit & Credit Overview</h2>
						</div>
						<div className='flex justify-between items-center mb-8'>
							<p className="text-secondary text-base font-semibold"><span className='text-secondaryLight'>₦17,560 </span>Debited & <span className='text-secondaryLight'>₦50,420</span>  Credited in this Week</p>
							<div className="flex justify-end text-secondary text-base font-semibold">
								<span className="flex items-center mr-4">
								  <span className="w-3 h-3 bg-[#FFC107] rounded-sm mr-1"></span> Debit
								</span>
								<span className="flex items-center">
								  <span className="w-3 h-3 bg-[#4CAF50] rounded-sm mr-1"></span> Credit
								</span>
							</div>
						</div>
						
						<div className="h-64">
							<Bar
							data={debitCreditData}
							options={{
								maintainAspectRatio: false,
								plugins: {
								legend: {
									display: false, // Hide default legend
								},
								},
								scales: {
								x: {
									grid: {
									display: false,
									},
								},
								y: {
									beginAtZero: true,
									grid: {
									display: false,
									},

									ticks: {
									display: false,
									},
								},
								},
								barThickness: 30, 
							}}
							/>
						</div>
						
					</div>

					<div className="bg-white p-4 rounded-2xl col-span-2 row-span-1">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-[23px] text-secondaryLight font-bold">User Card</h2>
							<a href="#" className="text-secondary text-[17px] font-semibold">See All</a>
						</div>
						<div className="relative">
							<div
							className="rounded-lg p-4 text-white"
							style={{
								background: 'linear-gradient(45deg, #FF4500, #FFA500)',
							}}
							>
							<div className="flex justify-between items-center font-bold text-6xl">
								<RiVisaLine />
								<FcSimCardChip  className='text-white'/>
							</div>
							<p className="mt-4 text-lg">4102 - 8144 - 7783 - 0092</p>
							<div className="flex justify-between mt-4 text-sm">
								<div>
								<p className="font-semibold">NAME</p>
								<p>VANESSA GREEN</p>
								</div>
								<div>
								<p className="font-semibold">VALID TILL</p>
								<p>05/28</p>
								</div>
							</div>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 rounded-2xl col-span-2 row-span-2 ">
						<div className="flex justify-between items-center mb-10">
							<h1 className="text-[23px] text-secondaryLight font-bold">KYC Status</h1>
							<a href="#" className="text-secondary text-[17px] font-semibold">See Details</a>
						</div>
							
						<div className="relative flex flex-col items-center ">
							<Doughnut data={KYCdata} options={options} />
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-2xl font-bold text-gray-800">75%</span>
							</div>
						</div>
						<div className="mt-9 grid grid-cols-2 w-[90%] mx-auto gap-3 text-secondary font-semibold">
							<div className="flex items-center">
								<span className="w-3 h-3 rounded-full bg-blue-600 mr-1"></span>
								<span className="text-sm">NIN</span>
							</div>
							<div className="flex items-center">
								<span className="w-3 h-3 rounded-full bg-blue-600 mr-1"></span>
								<span className="text-sm">Phone/Email</span>
							</div>
							<div className="flex items-center">
								<span className="w-3 h-3 rounded-full bg-blue-600 mr-1"></span>
								<span className="text-sm">BVN</span>
							</div>
							<div className="flex items-center">
								<span className="w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
								<span className="text-sm">Address</span>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 rounded-2xl col-span-3 row-span-1">
						<div className="flex justify-between items-center mb-7">
							<h2 className="text-[29px] font-bold text-secondaryLight">Referrals</h2>
							<a href="#" className="text-[17px] text-secondary font-semibold">See Details</a>
						</div>
						<div className="relative h-16">
							<div
								className="absolute top-0 left-0 h-8 rounded-lg"
								style={{ width: `${(referralsData.total / 16) * 100}%`, backgroundColor: '#1E90FF' }}
								>
								<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">
									{referralsData.total}
								</span>
							</div>
							<div
								className="absolute top-8 left-0 h-8 rounded-lg"
								style={{ width: `${(referralsData.successful / 16) * 100}%`, backgroundColor: '#FFA500' }}
								>
								<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-500 font-bold"></span>
								
							</div>
						</div>
						<div className="flex space-x-10 mt-10 text-sm text-secondary font-semibold">
							<span className="flex items-center">
							  <span className="w-3 h-3 bg-blue-600 rounded-full mr-5"></span> Total Referrals
							</span>
							<span className="flex items-center">
							  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-5"></span> Successful Referrals
							</span>
						</div>
					</div>

					
				</div>

				

			</div>
		</div>
	)
}

export default UserProfile
