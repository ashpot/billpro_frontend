import React from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import profilepicture from '../../assets/images/profilepicture.png';

function Settings() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <button className="text-secondaryLight text-2xl mr-8"><IoArrowBackSharp /> </button>
          <div>
            <h1 className="font-bold text-secondaryLight text-[29px]">Settings</h1>
            <p className="font-semibold text-secondary text-base">Review and manage your information.</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-secondary text-base mr-5">Last Updated: 2mins ago</p>
          <button className="bg-primary text-black px-4 py-3 rounded-xl flex items-center font-semibold text-base">
            <MdOutlineRefresh className='mr-2 font-semibold text-base'/> Refresh
          </button>
        </div>
      </div>

      <div className='flex justify-between items-start w-[90%] mx-auto'>
        {/* Left Panel - Edit Profile */}
        <div className="p-6 bg-white rounded-lg w-2/3 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="font-bold text-secondaryLight text-[29px]">Edit Profile</h1>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button className="bg-[#E5E5E5] text-secondary px-4 py-3 rounded-xl font-semibold text-base">Cancel</button>
              <button className="bg-primary text-white px-4 py-3 rounded-xl font-semibold text-base">Save Changes</button>
            </div>
          </div>

          <div className="p-4 mb-6">
            <h2 className="text-[23px] text-secondaryLight font-bold mb-4">General</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-secondary text-base">First Name</p>
                <p className="font-bold text-secondaryLight text-lg">Peter</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Middle Name</p>
                <p className="font-bold text-secondaryLight text-lg">Chima</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Last Name</p>
                <p className="font-bold text-secondaryLight text-lg">Okeke</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Username</p>
                <p className="font-bold text-secondaryLight text-lg">@peteokeke</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Password</p>
                <p className="font-bold text-secondaryLight text-lg">************</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Confirm Password</p>
                <p className="font-bold text-secondaryLight text-lg">************</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-[23px] text-secondaryLight font-bold mb-4">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-secondary text-base">Phone Number</p>
                <p className="font-bold text-secondaryLight text-lg">08012345678</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">WhatsApp</p>
                <p className="font-bold text-secondaryLight text-lg">+2348012345678</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Email Address</p>
                <p className="font-bold text-secondaryLight text-lg">chioka@mail.com</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Street Address</p>
                <p className="font-bold text-secondaryLight text-lg">15 Oba Lane</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">City</p>
                <p className="font-bold text-secondaryLight text-lg">Ikeja</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">State</p>
                <p className="font-bold text-secondaryLight text-lg">Lagos</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">Country</p>
                <p className="font-bold text-secondaryLight text-lg">Nigeria</p>
              </div>
              <div>
                <p className="font-semibold text-secondary text-base">ZIP Code</p>
                <p className="font-bold text-secondaryLight text-lg">123-123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center w-[25%] relative">
          {/* Status Dot */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full"></div>

          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto mb-4">
            <img src={profilepicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>

          {/* Name and Username */}
          <div className="mb-4 border-b pb-4">
            <h2 className="text-lg font-semibold flex justify-center items-center">Peter Okeke <RiVerifiedBadgeFill className='ml-2 text-yellow-500' /></h2>
            <p className="text-sm text-gray-600">@peteokeke</p>
            <p className="text-sm text-gray-600">Admin</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-center text-yellow-500">
              <FaPhone className="mr-2" />
              <span className="text-black">08012345678</span>
            </div>
            <div className="flex items-center justify-center text-yellow-500 border-b pb-4">
              <IoMdMail className="mr-2" />
              <span className="text-black">thepete@mail.com</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <FaLinkedin className="w-5 h-5 mr-2" />
              <span className="text-black">/peterokeke223</span>
            </div>
            <div className="flex items-center justify-center text-blue-600">
              <IoLogoFacebook className="w-5 h-5 mr-2" />
              <span className="text-black">/peterokeke57Ieh7.fb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;