import React from 'react'
import { PiHandCoins } from "react-icons/pi";
import { PiSwap } from "react-icons/pi";
import { PiAirplaneTilt } from "react-icons/pi";
import { PiLockKey } from "react-icons/pi";

const Features = () => {
  return (
	<div id='features' className='bg-primary py-10 text-center'>
	  <h1 className='font-extrabold text-white text-[23px] md:text-[49px]'>Features</h1>

	  <div className='max-w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black py-10'>
		<div className='flex flex-col items-center space-y-3 rounded-2xl p-5 bg-[#FFFFFF1A] border-transparent border-[1px] border-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(253,184,19,0.3)] backdrop-blur-[30px] shadow-[0px_20px_30px_0px_#E39E0099] hover:shadow-[0px_20px_30px_10px_#E39E00] transition-shadow duration-300'>
			<PiHandCoins className='text-5xl md:text-6xl text-white mb-5' />
			<h2 className='font-bold text-base md:text-[23px] '>Pay All Your Bills</h2>
			<p className='font-medium text-sm md:text-base'>Airtime, Television, Electricity, and more in seconds.</p>
		</div>

		<div className='flex flex-col items-center space-y-3 rounded-2xl p-5 bg-[#FFFFFF1A] border-transparent border-[1px] border-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(253,184,19,0.3)] backdrop-blur-[30px] shadow-[0px_20px_30px_0px_#E39E0099] hover:shadow-[0px_20px_30px_10px_#E39E00] transition-shadow duration-300'>
			<PiSwap className='text-5xl md:text-6xl text-white mb-5' />
			<h2 className='font-bold text-base md:text-[23px] '>Convert Airtime</h2>
			<p className='font-medium text-sm md:text-base'>Turn unused airtime into usable wallet funds.</p>
		</div>

		<div className='flex flex-col items-center space-y-3 rounded-2xl p-5 bg-[#FFFFFF1A] border-transparent border-[1px] border-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(253,184,19,0.3)] backdrop-blur-[30px] shadow-[0px_20px_30px_0px_#E39E0099] hover:shadow-[0px_20px_30px_10px_#E39E00] transition-shadow duration-300'>
			<PiAirplaneTilt className='text-5xl md:text-6xl text-white mb-5' />
			<h2 className='font-bold text-base md:text-[23px] '>Book Flights</h2>
			<p className='font-medium text-sm md:text-base'>Flights, education, betting - one dashboard.</p>
		</div>

		<div className='flex flex-col items-center space-y-3 rounded-2xl p-5 bg-[#FFFFFF1A] border-transparent border-[1px] border-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(253,184,19,0.3)] backdrop-blur-[30px] shadow-[0px_20px_30px_0px_#E39E0099] hover:shadow-[0px_20px_30px_10px_#E39E00] transition-shadow duration-300'>
			<PiLockKey className='text-5xl md:text-6xl text-white mb-5' />
			<h2 className='font-bold text-base md:text-[23px] '>Secure Wallet</h2>
			<p className='font-medium text-sm md:text-base'>6-digit PIN + email/phone OTP verification.</p>
		</div>
		
	  </div>
	</div>
  )
}

export default Features
