import React from "react";
import { BiColor } from "react-icons/bi";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdPhone } from "react-icons/md"; 
import { CgArrowsExchange } from "react-icons/cg";
import { PiWifiMediumBold } from "react-icons/pi"; 
import { MdOutlineElectricBolt } from "react-icons/md";
import { MdOutlineFlight } from "react-icons/md"; 
import { HiGiftTop } from "react-icons/hi2";
import { HiSun } from "react-icons/hi2";
import { MdTv } from "react-icons/md";

const data = [
  { icon: <MdPhone size={24} className="bg-[#FF3030] text-white p-2 rounded-full w-12 h-12" />, title: "Airtime", volume: "₦1.3M" },
  { icon: <BiColor size={24} className="bg-[#2785D2] text-white p-2 rounded-full w-12 h-12" />, title: "Betting", volume: "₦1.1M" },
  { icon: <CgArrowsExchange size={24} className="bg-[#FDB813] text-white p-2 rounded-full w-12 h-12" />, title: "Convert Airtime", volume: "₦982K" },
  { icon: <PiWifiMediumBold size={24} className="bg-[#56CCF2] text-white p-2 rounded-full w-12 h-12" />, title: "Data", volume: "₦2.1M" },
  { icon: <RiGraduationCapFill size={24} className="bg-[#FD8813] text-white p-2 rounded-full w-12 h-12" />, title: "Education", volume: "₦879K" },
  { icon: <MdOutlineElectricBolt size={24} className="bg-[#27D26E] text-white p-2 rounded-full w-12 h-12" />, title: "Electricity", volume: "₦2.3M" },
  { icon: <MdOutlineFlight size={24} className="bg-[#EF5DA8] text-white p-2 rounded-full w-12 h-12" />, title: "Flights", volume: "₦7.9M" },
  { icon: <HiGiftTop size={24} className="bg-[#9B51E0] text-white p-2 rounded-full w-12 h-12" />, title: "Gift Cards", volume: "₦992K" },
  { icon: <HiSun size={24} className="bg-[#FDB813] text-white p-2 rounded-full w-12 h-12" />, title: "Solar", volume: "₦483K" },
  { icon: <MdTv size={24} className="bg-[#27D26E] text-white p-2 rounded-full w-12 h-12" />, title: "Television", volume: "₦1.2M" },
];

const Card = ({ icon, title, volume }) => (
  <div className="bg-white shadow rounded-xl pt-10 p-5 flex flex-col gap-3">
    <div className="flex items-center gap-3 mb-5">
      {icon}
      <div>
        <h2 className="font-bold text-secondaryLight text-[27.5px]">{title}</h2>
        <p className="text-[15px] font-semibold text-secondary">Total Volume: {volume}</p>
      </div>
    </div>
    {/* Progress bar */}
    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden flex">
      <div className="bg-green-500 w-3/4"></div>
      <div className="bg-yellow-400 w-1/6"></div>
      <div className="bg-red-500 w-1/12"></div>
    </div>
  </div>
);

export default function ServicesGrid() {
  return (
    <div className="min-h-screen py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
