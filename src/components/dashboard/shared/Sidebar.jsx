import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoIcon from "../../../assets/images/Logo Icon.png";
import {
  MdDashboardCustomize,
  MdPhone,
  MdOutlineFlight,
  MdInsertChart,
} from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { PiUsersThreeFill, PiUsersFourFill } from "react-icons/pi";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";
import { CgArrowsExchange } from "react-icons/cg";
import { PiWifiMediumBold } from "react-icons/pi";

const linkClasses = ({ isActive }) =>
  [
    "flex items-center text-base font-medium px-3 py-2 rounded-md transition-colors duration-200",
    isActive
      ? "text-white bg-primary"
      : "text-secondaryLight hover:bg-amber-100",
  ].join(" ");

const Sidebar = () => {
  const location = useLocation();

  // Section highlight logic
  const inMain =
    ["/dashboard", "/dashboard/users", "/dashboard/chats"].some((p) =>
      location.pathname.startsWith(p)
  );

  const inServices = [
    "/dashboard/airtime",
    "/dashboard/convert-airtime",
    "/dashboard/data",
    "/dashboard/education",
    "/dashboard/flights",
    "/dashboard/services",
  ].some((p) => location.pathname.startsWith(p));
  const inOthers = [
    "/dashboard/referrals",
    "/dashboard/reports",
  ].some((p) => location.pathname.startsWith(p));

  return (
    <div className="bg-white lg:block w-1/5 flex flex-col justify-between py-6 px-4">
      <div>
        {/* Logo */}
        <div className="flex justify-center my-6 items-center space-x-2">
          <img src={logoIcon} alt="BillPro Logo" />
          <span className='text-secondaryLight font-bold text-[32px]'>BillWev</span>
        </div>

        <nav className="space-y-2">
          {/* Main Section */}
          <h3
            className={`text-sm font-bold uppercase mb-4 ${
              inMain ? "text-primary" : "text-secondary"
            }`}
          >
            Main
          </h3>
          <NavLink to="/dashboard" end className={linkClasses}>
            <MdDashboardCustomize size={24} className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/users" className={linkClasses}>
            <PiUsersThreeFill size={24} className="mr-2" />
            Users
          </NavLink>
          <NavLink to="/dashboard/chats" className={linkClasses}>
            <HiMiniChatBubbleBottomCenterText size={24} className="mr-2" />
            Chats
          </NavLink>

          {/* Services Section */}
          <h3
            className={`text-sm font-bold uppercase py-4 ${
              inServices ? "text-primary" : "text-secondary"
            }`}
          >
            Services
          </h3>
          <NavLink to="/dashboard/airtime" className={linkClasses}>
            <MdPhone size={20} className="mr-3" />
            Airtime
          </NavLink>
          <NavLink to="/dashboard/convert-airtime" className={linkClasses}>
            <CgArrowsExchange size={24} className="mr-2" />
            Convert Airtime
          </NavLink>
          <NavLink to="/dashboard/data" className={linkClasses}>
            <PiWifiMediumBold size={24} className="mr-2" />
            Data
          </NavLink>
          <NavLink to="/dashboard/education" className={linkClasses}>
            <RiGraduationCapFill size={20} className="mr-3" />
            Education
          </NavLink>
          <NavLink to="/dashboard/flights" className={linkClasses}>
            <MdOutlineFlight size={24} className="mr-2" />
            Flights
          </NavLink>
          <div className="flex justify-center pt-4">
            <NavLink to="/dashboard/services" >
              <button className="p-4 text-center text-sm font-bold text-secondary uppercase bg-[#F2F2F2] hover:bg-amber-100 hover:text-primary py-2 rounded-md">
                See All
              </button>
            </NavLink>
          </div>
          
          {/* Others Section */}
          <h3
            className={`text-sm font-bold uppercase py-4 ${
              inOthers ? "text-primary" : "text-secondary"
            }`}
          >
            Others
          </h3>
          <NavLink to="/dashboard/referrals" className={linkClasses}>
            <PiUsersFourFill size={24} className="mr-2" />
            Referrals
          </NavLink>
          <NavLink to="/dashboard/reports" className={linkClasses}>
            <MdInsertChart size={24} className="mr-2" />
            Reports
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
