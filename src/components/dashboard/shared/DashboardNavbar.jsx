

import React, { useState, useRef, useEffect } from 'react';
import { LuSearch } from "react-icons/lu";
import { MdNotifications } from "react-icons/md";
import { FiPower } from "react-icons/fi"; 
import { FiSettings } from "react-icons/fi";
import profile from '../../../assets/images/profile.png';

const DashboardNavbar = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const wrapperRef = useRef(null); 

  const user = JSON.parse(localStorage.getItem("admin_user")) || null;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white py-4 px-6 mx-auto my-4 rounded-3xl relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[29px] font-bold text-secondaryLight">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-xl p-2 pl-5 pr-10 w-96 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-[#F2F2F2] text-[#B7B7B7] text-base font-semibold"
            />
            <LuSearch className="absolute right-3 text-gray-400" />
          </div>
          <button className="bg-gray-100 rounded-full p-2 text-black hover:scale-105">
            <MdNotifications size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-4 relative" ref={wrapperRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src={profile}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-[13px] font-semibold text-secondaryLight">Hi, {user.first_name}</p>
              <p className="text-[13px] font-semibold text-[#B7B7B7]">@{user.username}</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute font-medium text-base top-full right-0 w-44 bg-white rounded-2xl shadow-lg py-2 z-10">
              <div className="flex items-center px-4 py-2 text-secondaryLight hover:bg-gray-100 cursor-pointer">
                <FiPower className="mr-4 " />
                <span>Logout</span>
              </div>
              <a href='/dashboard/settings' className="flex items-center px-4 py-2 text-secondaryLight hover:bg-gray-100 cursor-pointer">
                <FiSettings className="mr-4" />
                <span>Settings</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;