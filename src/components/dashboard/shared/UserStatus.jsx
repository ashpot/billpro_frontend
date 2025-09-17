import React from 'react';

const KYCStatus = () => {
  const statuses = [
    { label: "Submitted", color: "#0C6DD8" }, // darker blue
    { label: "Approved",  color: "#2994FF" }, // mid blue
    { label: "Rejected",  color: "#5AB1FF" }, // lighter blue
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="font-bold text-secondaryLight text-[23px] mb-4">KYC Status</h2>

      {/* Stacked colored rows */}
      <div className="rounded-xl overflow-hidden">
        {statuses.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 text-white font-bold text-sm"
            style={{ backgroundColor: s.color }}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KYCStatus;
