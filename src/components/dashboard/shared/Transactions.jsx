import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const Transactions = ({ title = "Recent Transactions", columns, data = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // you can make this a prop too

  // Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset to first page when searching
  };

  // Filter
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 bg-white mx-auto rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-secondaryLight text-[23px]">{title}</h2>
        <div className="flex space-x-4">
          {/* Search */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={`Search ${title}`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-xl p-2 pl-5 pr-10 w-96 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-[#F2F2F2] text-[#B7B7B7] text-base font-semibold"
            />
            <LuSearch className="absolute right-3 text-gray-400" />
          </div>
          {/* Filter */}
          <div className="relative inline-block">
            <select className="appearance-none pl-10 pr-4 py-2 bg-[#F2F2F2] text-secondary font-semibold text-base rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option>Filter by</option>
              <option>Status</option>
              <option>Date</option>
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden text-base font-semibold">
          <thead className="bg-[#F7F7F7]">
            <tr className="text-base font-semibold">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-secondary uppercase"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                      {col.render ? col.render(row[col.key]) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-secondary text-base font-semibold">
        <span>
          Showing {startIndex + 1} -{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length} records
        </span>
        <div className="flex space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-2 py-1 border rounded-xl ${
              currentPage === 1
                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                : "text-[#B7B7B7] bg-[#F2F2F2] hover:text-white hover:bg-primary"
            }`}
          >
            Prev
          </button>

          <span className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 border rounded-xl ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "text-[#B7B7B7] bg-[#F2F2F2] hover:text-white hover:bg-yellow-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 border rounded-xl ${
              currentPage === totalPages
                ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                : "text-[#B7B7B7] bg-[#F2F2F2] hover:text-white hover:bg-primary"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
