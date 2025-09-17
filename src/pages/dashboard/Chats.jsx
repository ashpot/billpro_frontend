import React from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import { HiOutlineMicrophone } from "react-icons/hi";

const Chats = () => {
	const contacts = [
		{ id: 1, name: 'Jacob Jones', role: 'Marketing Coordinator', time: '5m' },
		{ id: 2, name: 'Michael Eze', role: 'Web Designer', time: '5m' },
		{ id: 3, name: 'Ngozi Okonkwo', role: 'Dog Trainer', time: '5m' },
		{ id: 4, name: 'Kathryn Murphy', role: 'Medical Assistant', time: '5m' },
		{ id: 5, name: 'Wade Warren', role: 'Web Designer', time: '5m' },
		{ id: 6, name: 'Marvin McKinney', role: 'Nursing Assistant', time: '5m' },
		{ id: 7, name: 'Eleanor Pena', role: 'Dog Trainer', time: '5m' },
		{ id: 8, name: 'Amima Bello', role: 'Medical Assistant', time: '5m' },
		{ id: 9, name: 'Ngozi Okoro', role: 'Marketing Coordinator', time: '5m' },
		{ id: 10, name: 'Marvin McKinney', role: 'Nursing Assistant', time: '5m' },
	];
	 const messages = [
		{ id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis leo proin turpis euac. Tortor dolor eu at bibendum suspendisse. Feugiat mi, eu rhoncus diam consectetur libero morbi pharetra.', time: '10:15 pm', isVoice: false },
		{ id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis leo proin turpis euac. Tortor dolor eu at bibendum suspendisse.', time: '10:15 pm', isVoice: true, duration: '0:54' },
		{ id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis leo proin turpis euac. Tortor dolor eu at bibendum suspendisse.', time: '06:00 pm', isVoice: true, duration: '0:54' },
		{ id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis leo proin turpis euac. Tortor dolor eu at bibendum suspendisse.', time: '10:15 pm', isVoice: false },
	];
  return (
	<div className='bg-gray-100 flex min-h-screen'>
		<Sidebar />

		<div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
			<div className='flex-1 space-y-2 '>
			<DashboardNavbar title="Chats"/>
			</div>

			<div className="flex h-screen bg-white">
				{/* Contact Sidebar */}
				<div className="w-80 bg-white shadow-md overflow-y-auto border-r">
					<div className="p-4">
					<input
						type="text"
						placeholder="Search"
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
					/>
					</div>
					<div className="divide-y">
					{contacts.map((contact) => (
						<div key={contact.id} className="p-3 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer">
						<div className={`w-10 h-10 ${contact.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
							{contact.name.split(' ').map(n => n[0]).join('')}
						</div>
						<div className="flex-1">
							<div className="font-semibold text-sm">{contact.name}</div>
							<div className="text-gray-500 text-xs truncate">Lorem ipsum dolor sit amet</div>
						</div>
						<div className="text-gray-400 text-xs">{contact.time}</div>
						</div>
					))}
					</div>
				</div>

				{/* Chat Area */}
				<div className="flex-1 flex flex-col">
					{/* Chat Header */}
					<div className="p-4 bg-white border-b flex items-center space-x-3">
					<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
						JJ
					</div>
					<div>
						<div className="font-semibold text-sm">Jacob Jones</div>
						<div className="text-gray-500 text-xs">Marketing Coordinator</div>
					</div>
					</div>

					{/* Messages */}
					<div className="flex-1 p-6 overflow-y-auto bg-white space-y-4">
					<div className="text-center text-gray-500 text-xs mb-4">August 21</div>
					{messages.map((message) => (
						<div key={message.id} className={`flex ${message.isSender ? 'justify-end' : 'justify-start'} mb-2`}>
						{!message.isSender && (
							<div className="w-8 h-8 rounded-full mr-2 flex-shrink-0 mt-auto">
							<div className={`w-full h-full ${message.avatarColor} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
								JJ
							</div>
							</div>
						)}
						<div className={`max-w-xs ${message.isSender ? 'bg-yellow-100' : 'bg-yellow-100'} rounded-lg p-3 text-sm text-gray-800`}>
							{message.isVoice ? (
							<div className="flex items-center space-x-2">
								<HiOutlineMicrophone className="h-5 w-5 text-yellow-600" />
								<div className="flex-1 bg-yellow-200 h-1 rounded-full relative">
								<div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-yellow-600 rounded-full"></div>
								</div>
								<span className="text-gray-600 text-xs">{message.duration}</span>
							</div>
							) : (
							<p>{message.text}</p>
							)}
						</div>
						{message.isSender && (
							<div className="w-8 h-8 rounded-full ml-2 flex-shrink-0 mt-auto">
							{/* Sender avatar if needed, but in image it's not shown */}
							</div>
						)}
						<div className={`text-xs text-gray-500 mt-1 ${message.isSender ? 'text-right' : 'text-left'}`}>
							{message.time}
						</div>
						</div>
					))}
					</div>

					{/* Message Input */}
					<div className="p-4 bg-white border-t flex items-center">
					<input
						type="text"
						placeholder="Write a message..."
						className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
					/>
					</div>
				</div>
			</div>
		</div>
		
	  
	</div>
  )
}

export default Chats;
