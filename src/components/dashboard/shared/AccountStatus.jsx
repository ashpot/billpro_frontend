
import React from "react";

const AccountStatus = ({ active = 0, pending = 0, deactivated = 0 }) => {
  const accountData = [
    {
      label: "Active",
      percent: Number(active) || 0,
      color: "bg-green-500",
    },
    {
      label: "Suspended",
      percent: Number(pending) || 0,
      color: "bg-yellow-500",
    },
    {
      label: "Deactivated",
      percent: Number(deactivated) || 0,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="font-bold text-secondaryLight text-[23px] mb-4">
        Account Status
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
        {accountData.map((item) => (
          <div
            key={item.label}
            className={`${item.color} h-4`}
            style={{
              width: `${Math.min(100, Math.max(0, item.percent))}%`,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {accountData.map((item) => (
          <p
            key={item.label}
            className="font-bold text-secondaryLight text-sm flex items-center"
          >
            <span
              className={`w-3 h-3 ${item.color} rounded-full mr-2`}
            />
            {item.label} {item.percent}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default AccountStatus;
