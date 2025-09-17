import React from 'react';
import { LuInfo } from "react-icons/lu";
import { RiArrowRightSLine } from "react-icons/ri";

const PendingTickets = () => {
  const tickets = [
    { id: 1, title: 'Failed Airtime Purchase', color: 'bg-red-500' },
    { id: 2, title: 'Airtime to Cash Request', color: 'bg-yellow-500' },
    { id: 3, title: 'Account Verification', color: 'bg-blue-500' },
    { id: 4, title: 'Wallet Fund Confirmation', color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-4 bg-white w-[90%] mx-auto rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex gap-2 items-center">Pending Tickets <span className="text-red-500"><LuInfo size={24} /></span></h2>
      </div>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex items-center p-2 bg-white border-b hover:bg-gray-100">
            <span className={`w-2 h-2 ${ticket.color} rounded-full mr-2`}></span>
            <span className="flex-1">{ticket.title}</span>
            <span className="text-gray-500"><RiArrowRightSLine /></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingTickets;