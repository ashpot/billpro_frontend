import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { CheckCircle } from "lucide-react";
import profileSummary from '../../assets/images/ProfileSummary.png'
import profilepicture from '../../assets/images/profilepicture.png'

const UserProfileDetails = () => {
  return (
	<div className="bg-gray-100 min-h-screen font-sans pb-10">
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4">
			<div className="flex items-center mb-2 sm:mb-0">
				<button className="text-secondaryLight text-2xl mr-8"><IoArrowBackSharp /> </button>
				<div>
				<h1 className="font-bold text-secondaryLight text-[29px]">Profile Details</h1>
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
		<div className="w-[85%] mx-auto space-y-5">
			<div className="relative mb-6">
				<img
					src={profileSummary}
					alt="Background"
					className="w-full object-cover "
				/>

				<div className="absolute inset-0 flex items-center px-6">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center">
							<div className="relative">
								<img
									src={profilepicture} 
									alt="Chioma Okafor"
									className="w-[80%] h-[80%] rounded-full "
								/>
								<span className="absolute top-4 right-10 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
							</div>

							<div>
								<div className="flex items-center space-x-1">
									<h2 className="text-white font-bold text-[23px]">Chioma Okafor</h2>
									<CheckCircle className="w-4 h-4 text-primary" />
								</div>
								<p className="text-gray-200 font-medium text-base">chioma@gmail.com</p>
								<p className="text-gray-300 font-medium text-base">Abia, Nigeria</p>
							</div>
						</div>

						<div className="flex space-x-7">
							<button className="px-4 py-2 bg-white text-secondaryLight text-base font-semibold rounded-lg shadow">
							Send Message
							</button>
							<button className="px-6 py-2 bg-primary text-white text-base font-semibold rounded-lg shadow">
							Suspend
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="p-6 bg-white rounded-2xl ">
				<h2 className="text-[23px] text-secondaryLight font-bold mb-4">Personal Information</h2>
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
						<p className="font-semibold text-secondary text-base">Email Address</p>
						<p className="font-bold text-secondaryLight text-lg">@peteokeke</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">Phone Number</p>
						<p className="font-bold text-secondaryLight text-lg">08037652890</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">Gender</p>
						<p className="font-bold text-secondaryLight text-lg">Male</p>
					</div>
				</div>
            </div>
			<div className="p-6 bg-white rounded-2xl ">
				<h2 className="text-[23px] text-secondaryLight font-bold mb-4">Address</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div>
						<p className="font-semibold text-secondary text-base">Country</p>
						<p className="font-bold text-secondaryLight text-lg">Nigeria</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">State</p>
						<p className="font-bold text-secondaryLight text-lg">Abia</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">City</p>
						<p className="font-bold text-secondaryLight text-lg">Aba</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">Zip Code</p>
						<p className="font-bold text-secondaryLight text-lg">4000927</p>
					</div>
				</div>
            </div>
		    <div className="p-6 bg-white rounded-2xl ">
				<h2 className="text-[23px] text-secondaryLight font-bold mb-4">KYC Information</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div>
						<p className="font-semibold text-secondary text-base">NIN</p>
						<p className="font-bold text-secondaryLight text-lg">00063738377378</p>
					</div>
					<div>
						<p className="font-semibold text-secondary text-base">BVN</p>
						<p className="font-bold text-secondaryLight text-lg">************</p>
					</div>
				</div>
            </div>
		</div>
		
	  
	</div>
  )
}

export default UserProfileDetails
