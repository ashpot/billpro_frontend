// import React from 'react'
// import Sidebar from '../../components/dashboard/shared/Sidebar'
// import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
// import AccountStatus from '../../components/dashboard/shared/AccountStatus'
// import Transactions from '../../components/dashboard/shared/Transactions'
// import Overview from '../../components/dashboard/shared/Overview'
// import { Line } from 'react-chartjs-2';
// import KYCStatus from '../../components/dashboard/shared/UserStatus'
// import { FaUsers } from 'react-icons/fa'; 
// import { PiUserFocusLight } from "react-icons/pi";
// import { LiaUserCheckSolid } from "react-icons/lia";
// import { FaGripLinesVertical } from "react-icons/fa";

// const Users = () => {
// 	const cardsData = [
// 		{
// 			icon: FaUsers,
// 			color: 'text-blue-600',
// 			bgColor: 'blue',
// 			value: '13,673',
// 			label: 'Total Users',
// 		},
// 		{
// 			icon: LiaUserCheckSolid,
// 			color: 'text-[#27D26E]',
// 			bgColor: 'green',
// 			value: '10,234',
// 			label: "Verified Users",
// 		},
// 		{
// 			icon: PiUserFocusLight,
// 			color: 'text-[#FDB813]',
// 			bgColor: 'yellow',
// 			value: '2,654',
// 			label: 'Pending KYC',
// 		},
// 		{
// 			icon: FaGripLinesVertical,
// 			color: 'text-[#FF3030]',
// 			bgColor: 'red',
// 			value: '1,001',
// 			label: 'Suspended Users',
// 		},
// 	];
//   return (
// 	<div className='bg-gray-100 flex min-h-screen'>
// 		<Sidebar />

// 		<div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
// 			<DashboardNavbar title="Users"/>
// 			<Overview title="Overview" cardsData={cardsData}/>
// 			<div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mx-auto items-stretch'>
// 				<div className='py-6 px-4 bg-white rounded-2xl lg:col-span-2' style={{ maxHeight: '402px', minHeight: '300px' }} >
// 					<div className='flex justify-between mb-3'>
// 						<h2 className='font-bold text-secondaryLight text-[23px] '>User Growth</h2>
// 						<div className='flex space-x-2'>
// 						<button className='px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl'>Day</button>
// 						<button className='px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl'>Week</button>
// 						<button className='px-3 py-1 text-sm text-white bg-primary rounded-3xl'>Month</button>
// 						</div>
// 					</div>
// 					<div style={{ height: 'calc(100% - 2rem)', width: '100%' }} className='mt-4'>
// 						<Line 
// 						data={{
// 							labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
// 							datasets: [{
// 							label: 'Transactions',
// 							data: [5, 15, 35, 55, 45, 25, 20, 30, 40], 
// 							fill: true,
// 							backgroundColor: 'rgba(255, 204, 0, 0.2)',
// 							borderColor: 'rgba(255, 204, 0, 1)',
// 							tension: 0.5, // Slightly increased for smoother curves as in the image
// 							}],
// 						}}
// 						options={{
// 							responsive: true,
// 							maintainAspectRatio: false,
// 							plugins: {
// 							legend: { display: false },
// 							},
// 							scales: {
// 							x: {
// 								grid: { display: false },
// 								ticks: { color: 'gray' },
// 							},
// 							y: {
// 								display: false, // Hide y-axis completely
// 								grid: { display: false },
// 							},
// 							},
// 							elements: {
// 							point: { radius: 0 }, // Hide points for a cleaner line
// 							},
// 						}}
// 						/>
// 					</div>
// 				</div>
// 				<div className='space-y-5'>
// 					<AccountStatus />
// 					<KYCStatus />
// 				</div>
// 			</div>
			
// 			<Transactions
// 				title="Users"
// 				columns={[
// 				{ header: "Name", key: "name" },
// 				{ header: "Email", key: "email" },
// 				{ header: "Phone", key: "phone" },
// 				{ header: "Balance", key: "balance" },
// 				{
// 					header: "Status",
// 					key: "status",
// 					render: (value) => (
// 					<span
// 						className={`px-2 py-1 rounded-full text-xs font-semibold ${
// 						value === "Active"
// 							? "bg-green-200 text-green-800"
// 							: value === "Suspended"
// 							? "bg-yellow-200 text-yellow-800"
// 							: "bg-red-200 text-red-800"
// 						}`}
// 					>
// 						{value}
// 					</span>
// 					),
// 				},
// 				{ header: "Join Date", key: "date" },
// 				]}
// 				data={[
// 				{ name: "Chioma Igwe", email: "chioma@gmail.com", phone: "08037504702", balance: "₦12,000", status: "Active", date: "Jul 20, 2025" },
// 				{ name: "Licia Chekwas", email: "lchekwas@gmail.com", phone: "08037504702", balance: "₦12,000", status: "Suspended", date: "Jul 20, 2025" },
// 				{ name: "Oma Ndukwe", email: "omandukwe@yahoo.com", phone: "08037504702", balance: "₦12,000", status: "Suspended", date: "Jul 20, 2025" }
// 				]} 
// 			/>
// 		</div>
	  
// 	</div>
//   )
// }

// export default Users;


import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/dashboard/shared/Sidebar';
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar';
import AccountStatus from '../../components/dashboard/shared/AccountStatus';
import Transactions from '../../components/dashboard/shared/Transactions';
import Overview from '../../components/dashboard/shared/Overview';
import { Line } from 'react-chartjs-2';
import KYCStatus from '../../components/dashboard/shared/UserStatus';
import { FaUsers } from 'react-icons/fa'; 
import { PiUserFocusLight } from "react-icons/pi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { FaGripLinesVertical } from "react-icons/fa";
import { getAdminUsers } from '../../services/userService';

const Users = () => {
  const [cardsData, setCardsData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminUsers();

        const cards = [
          {
            icon: FaUsers,
            color: 'text-blue-600',
            bgColor: 'blue',
            value: data.total_users,
            label: 'Total Users',
          },
          {
            icon: LiaUserCheckSolid,
            color: 'text-[#27D26E]',
            bgColor: 'green',
            value: data.verifed_count,
            label: "Verified Users",
          },
          {
            icon: PiUserFocusLight,
            color: 'text-[#FDB813]',
            bgColor: 'yellow',
            value: data.pending_count,
            label: 'Pending KYC',
          },
          {
            icon: FaGripLinesVertical,
            color: 'text-[#FF3030]',
            bgColor: 'red',
            value: data.suspended_count,
            label: 'Suspended Users',
          },
        ];
        setCardsData(cards);

        const formattedUsers = data.user_table.map((u, i) => ({
          id: i,
          name: `${u.first_name || ""} ${u.last_name || ""}`.trim() || "N/A",
          email: u.email || "N/A",
          phone: u.phone || "N/A",
          balance: `₦${u.balance?.toLocaleString() || 0}`,
          status: u.account_status || "Unknown",
          date: new Date(u.date_joined).toLocaleDateString(),
        }));

        setUsers(formattedUsers);

      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className='bg-gray-100 flex min-h-screen'>
      <Sidebar />

      <div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
        <DashboardNavbar title="Users"/>

        <Overview title="Overview" cardsData={cardsData}/>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mx-auto items-stretch'>
          <div className='py-6 px-4 bg-white rounded-2xl lg:col-span-2' style={{ maxHeight: '402px', minHeight: '300px' }} >
            <div className='flex justify-between mb-3'>
              <h2 className='font-bold text-secondaryLight text-[23px] '>User Growth</h2>
              <div className='flex space-x-2'>
                <button className='px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl'>Day</button>
                <button className='px-3 py-1 text-sm text-[#B7B7B7] bg-[#F2F2F2] rounded-3xl'>Week</button>
                <button className='px-3 py-1 text-sm text-white bg-primary rounded-3xl'>Month</button>
              </div>
            </div>
            <div style={{ height: 'calc(100% - 2rem)', width: '100%' }} className='mt-4'>
              <Line 
                data={{
                  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [{
                    label: 'Transactions',
                    data: [5, 15, 35, 55, 45, 25, 20, 30, 40], 
                    fill: true,
                    backgroundColor: 'rgba(255, 204, 0, 0.2)',
                    borderColor: 'rgba(255, 204, 0, 1)',
                    tension: 0.5,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false }, ticks: { color: 'gray' } },
                    y: { display: false, grid: { display: false } },
                  },
                  elements: { point: { radius: 0 } },
                }}
              />
            </div>
          </div>

          <div className='space-y-5'>
            <AccountStatus />
            <KYCStatus />
          </div>
        </div>

        {/* Users Table */}
        <Transactions
          title="Users"
          columns={[
            { header: "Name", key: "name" },
            { header: "Email", key: "email" },
            { header: "Phone", key: "phone" },
            { header: "Balance", key: "balance" },
            {
              header: "Status",
              key: "status",
              render: (value) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    value.toLowerCase() === "active"
                      ? "bg-green-200 text-green-800"
                      : value.toLowerCase() === "suspended"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {value}
                </span>
              ),
            },
            { header: "Join Date", key: "date" },
          ]}
          data={users}
        />

        {loading && <p className="text-gray-500 text-center">Loading users...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Users;

