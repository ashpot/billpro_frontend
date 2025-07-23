import React from 'react'
import logo from '../../assets/images/logo.png'

const Navbar = () => {
  return (
	<nav className='flex items-center md:justify-around p-4 sticky top-0 bg-white z-50'>
		<div className='flex text-left'>
			<a href='#home'>
				<img src={logo} alt="Logo" className='w-2/4 md:w-auto' />
			</a>
		</div>
		<div className='md:flex space-x-10 font-semibold text-xl hidden'>
			<a href="#home" className="text-[#1E1E1E] hover:text-primary">Home</a>
			<a href="#about" className="text-[#1E1E1E] hover:text-primary">About</a>
			<a href="#features" className="text-[#1E1E1E] hover:text-primary">Features</a>
			<a href="#faq" className="text-[#1E1E1E] hover:text-primary">FAQ</a>
			<a href="#contact" className="text-[#1E1E1E] hover:text-primary">Contact</a>
		</div>
		<a href="" className='bg-primary rounded-3xl p-4 font-semibold text-[22px] text-white hover:bg-yellow-400 hidden md:block'>Download App</a>

	</nav>
  )
}

export default Navbar
