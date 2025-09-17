import React from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";

function TransactionDetails() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <button className="text-secondaryLight text-2xl mr-8"><IoArrowBackSharp /> </button>
          <div>
            <h1 className="font-bold text-secondaryLight text-[29px]">Transaction Details</h1>
            <p className="font-semibold text-secondary text-base">Review and manage transaction information.</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-secondary text-base mr-5">Last Updated: 2mins ago</p>
          <button className="bg-primary text-black px-4 py-3 rounded-xl flex items-center font-semibold text-base">
            <MdOutlineRefresh className='mr-2 font-semibold text-base'/> Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-[90%] mx-auto">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-secondaryLight text-[23px] mb-4">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-secondary text-base">Full Name</p>
              <p className="font-bold text-secondaryLight text-lg">Chioma Okafor</p>
            </div>
            <div>
              <p className="font-semibold text-secondary text-base">Phone Number</p>
              <p className="font-bold text-secondaryLight text-lg">08012345678</p>
            </div>
            <div>
              <p className="font-semibold text-secondary text-base">Email Address</p>
              <p className="font-bold text-secondaryLight text-lg">chioka@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold text-secondary text-base">Location</p>
              <p className="font-bold text-secondaryLight text-lg">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-secondaryLight text-[23px] mb-4">Admin Actions</h2>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button className="bg-primary text-black py-2 rounded-lg font-semibold text-base">Retry Transaction</button>
            <button className="bg-[#FF3030] text-white py-2 rounded-lg font-semibold text-base">Escalate to Support</button>
            <button className="bg-[#2785D2] text-white py-2 rounded-lg font-semibold text-base">View Internal Note</button>
            <button className="bg-[#B7B7B7] text-black py-2 rounded-lg font-semibold text-base">View API Log</button>
          </div>
          <button className="bg-[#8A38F5] text-white py-2 rounded-lg font-semibold text-base w-full">Reassign Admin</button>
        </div>
      </div>

      {/* Transaction Info and Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-[90%] mx-auto">
          <div className='bg-white p-4 rounded-lg shadow'>
            <h2 className="font-bold text-secondaryLight text-[23px] mb-4">User Details</h2> 
			<div className='grid grid-cols-2 gap-4'>
				<div className="mb-2">
					<p className="font-semibold text-secondary text-base">Transaction ID</p>
					<p className="font-bold text-secondaryLight text-lg">TXN_2024_001234</p>
				</div>
				<div>
					<p className="font-semibold text-secondary text-base">Service/Biller</p>
					<p className="font-bold text-secondaryLight text-lg">MTN-NG</p>
				</div>
				<div className="mb-4">
					<p className="font-semibold text-secondary text-base">Amount</p>
					<p className="font-bold text-secondaryLight text-lg">2,000</p>
				</div>
				<div>
					<p className="font-semibold text-secondary text-base">Date & Time</p>
					<p className="font-bold text-secondaryLight text-lg">Jul 20, 2025 | 13:21</p>
				</div>
				<div className="mb-2">
					<p className="font-semibold text-secondary text-base">Transaction Status</p>
					<span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold text-lg">Failed</span>
				</div>
				<div>
					<p className="font-semibold text-secondary text-base">Error Message</p>
					<p className="text-red-600 font-bold text-lg">Gateway Timeout</p>
				</div>
			</div>
        </div>
		<div className="bg-white p-4 rounded-lg shadow">
		  <h2 className="font-bold text-secondaryLight text-[23px] mb-4">Quick Info</h2>
		  <div className="space-y-2">
			<div className="flex justify-between">
				<span className="font-semibold text-secondary text-base">Created At</span>
				<span className="font-bold text-secondaryLight text-lg">Jul 20, 2025 | 13:21 </span>
			</div>
			<div className="flex justify-between">
			  <span className="font-semibold text-secondary text-base">Attempts</span>
			  <span className="font-bold text-secondaryLight text-lg">2 of 3</span>
			</div>
			<div className="flex justify-between">
			  <span className="font-semibold text-secondary text-base">Priority</span>
			  <span className="font-bold text-lg text-red-600">High</span>
			</div>
			<div className="flex justify-between">
			  <span className="font-semibold text-secondary text-base">Assigned To</span>
			  <span className="font-bold text-secondaryLight text-lg">Admin 04 - Peter</span>
			</div>
		  </div>
		</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto">
		<div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-secondaryLight text-[23px] mb-4">Activity Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-center">
				<div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
				<div className="flex justify-between w-full">
					<span>
						<p className="font-bold text-secondaryLight text-lg">Transaction Created</p>
						<p className="font-semibold text-secondary text-base">Transaction Request Initiated.</p>
					</span>
					<span className="font-semibold text-secondary text-base">13:21</span>
				</div>
			</div>
			<div className="flex items-center">
				<div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
					<div className="flex justify-between w-full">
						<span>
							<p className="font-bold text-secondaryLight text-lg">Processing Payment</p>
							<p className="font-semibold text-secondary text-base">Payment sent to EEDC Gateway.</p>
						</span>
						<span className="font-semibold text-secondary text-base">13:21</span>
					</div>
			</div>
			<div className="flex items-center">
				<div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
				<div className="flex justify-between w-full">
					<span>
						<p className="font-bold text-secondaryLight text-lg">Gateway Response</p>
						<p className="font-semibold text-secondary text-base">Gateway Timeout occurred.</p>
					</span>
					<span className="font-semibold text-secondary text-base">13:21</span>
				</div>
			</div>
			<div className="flex items-center">
				<div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
				<div className="flex justify-between w-full">
					<span>
						<p className="font-bold text-secondaryLight text-lg">User Notification</p>
						<p className="font-semibold text-secondary text-base">SMS & Email notification sent to user.</p>
					</span>
					<span className="font-semibold text-secondary text-base">13:21</span>
				</div>
			</div>
         </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-secondaryLight text-[23px] mb-4">Internal Notes</h2>
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p className="mb-1 font-medium text-secondaryLight text-base">Customer called regarding this failed transaction. Promised callback within 2 hours.</p>
            <p className="font-medium text-secondary text-sm">Admin 04 - 5mins ago</p>
          </div>
          <input
            type="text"
            placeholder="Add a new internal note..."
            className="w-full p-3 border border-gray-300 rounded-lg font-medium text-secondary text-base"
          />
        </div>
        
      </div>
    </div>
  );
}

export default TransactionDetails;