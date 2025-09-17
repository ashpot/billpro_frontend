import React from 'react'
import Sidebar from '../../components/dashboard/shared/Sidebar'
import DashboardNavbar from '../../components/dashboard/shared/DashboardNavbar'
import ServicesGrid from '../../components/dashboard/shared/ServicesGrid'

const Services = () => {
  return (
	<div className='bg-gray-100 flex min-h-screen'>
		<Sidebar />

		<div className='flex-1 space-y-8 p-4 mb-5 w-[80%]'>
			<DashboardNavbar title="Services"/>
			<ServicesGrid />
		</div>
	  
	</div>
  )
}

export default Services;
