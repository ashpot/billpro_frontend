
import React from 'react';

const AccountStatus = () => {
  const accountData = [
    { label: "Active", percent: 70, color: "bg-green-500" },
    { label: "Suspended", percent: 20, color: "bg-yellow-500" },
    { label: "Deactivated", percent: 10, color: "bg-red-500" },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="font-bold text-secondaryLight text-[23px] mb-4">Account Status</h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
        {accountData.map((item, index) => (
          <div
            key={index}
            className={`${item.color} h-4`}
            style={{ width: `${item.percent}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {accountData.map((item, index) => (
          <p key={index} className="font-bold text-secondaryLight text-sm flex items-center">
            <span className={`w-3 h-3 ${item.color} rounded-full mr-2`}></span>
            {item.label} {item.percent}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default AccountStatus;
