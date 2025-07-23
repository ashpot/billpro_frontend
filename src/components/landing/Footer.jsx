import React from 'react'
import logo from '../../assets/images/logo.png'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
	<footer className='py-10 bg-[#F2F2F2]'>
		<div className='max-w-[85%] mx-auto '>
			<div className='mb-5 md:my-5 flex items-center justify-center md:justify-start'> 
				<img src={logo} alt="Logo" className='w-2/5 md:w-auto' />
			</div>
			<div className='flex flex-col md:flex-row items-center justify-between gap-4 text-secondary pb-5'>
				<p className='font-semibold md:font-medium text-xs md:text-lg'>The smart way to pay your bills</p>
				<div className='flex gap-10'>
					<a href='' className='hover:text-primary' ><FaFacebook size={25}/></a>
					<a href='' className='hover:text-primary'><FaInstagram size={25}/></a>
					<a href='' className='hover:text-primary'><FaXTwitter size={25}/></a>
					<a href='' className='hover:text-primary'><FaLinkedin size={25}/></a>
				</div>
			</div>

			<div className='flex flex-col md:flex-row items-center justify-between border-t border-[#1E1E1E] py-4 font-medium text-[#1E1E1E] text-[10px] md:text-lg'>
				<p className='hidden md:block'>&copy; 2025 BillPro. All rights reserved.</p>
				<ul className='flex flex-row gap-4 mt-4 md:mt-0'>
					<li><a href=''>Terms of Service </a></li>
					<li><a href=''>Privacy Policy</a></li>
					<li><a href=''>Contact Us</a></li>
				</ul>
				<p className='md:hidden pt-5'>&copy; 2025 BillPro. All rights reserved.</p>
			</div>
		</div>
			
	</footer>
  )
}

export default Footer
