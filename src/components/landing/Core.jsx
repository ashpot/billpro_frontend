import React from 'react'
import speed from '../../assets/images/speed.png'
import convenience from '../../assets/images/convenience.png'
import security from '../../assets/images/security.png'

const Core = () => {
  return (
	<section className='max-w-[85%] mx-auto py-10 md:py-20'>
	  <div className='text-center mb-10'>
		<h1 className='font-extrabold text-primary text-[23px] md:text-[49px]'>Why Choose BillPro?</h1>
		<p className='font-semibold text-secondary text-xs md:text-[25px]'>Experience the difference with our platform</p>
	  </div>

	  <div className='flex flex-col md:flex-row gap-12 items-center justify-between pt-10'>
		<div className='text-center md:text-left md:w-[55%]'> 
			<h2 className='font-bold text-lg md:text-[39px] mb-1 md:mb-4'>Lightning Speed</h2>
			<p className='font-normal md:font-medium text-[13px] md:text-[22px] text-secondary'>Complete transactions in seconds, not minutes. Our optimized payment process ensures you never miss a payment deadline with quick, hassle-free transactions</p>
		</div>
		<div>
			<img src={speed} alt="" />
		</div>
	  </div>

	  <div className='flex flex-col md:flex-row gap-28 items-center justify-between pt-10'>
		<div className='hidden md:block'>
			<img src={convenience} alt="" />
		</div>
		<div className='text-center md:text-left md:w-[55%]'>
			<h2 className='font-bold text-lg md:text-[39px] mb-1 md:mb-4'>Ultimate Convenience</h2>
			<p className='font-normal md:font-medium text-[13px] md:text-[22px] text-secondary'>Manage all your bills in one place, eliminating the need for multiple apps or websites. Access your payment history anytime, anywhere with our intuitive interface.</p>
		</div>
		<div className='md:hidden -mt-16'>
			<img src={convenience} alt="" />
		</div>
	  </div>

	  <div className='flex flex-col md:flex-row gap-20 items-center justify-between pt-10'>
		<div className='text-center md:text-left md:w-[50%]'>
			<h2 className='font-bold text-lg md:text-[39px] mb-1 md:mb-4'>Bank-Grade Security</h2>
			<p className='font-normal md:font-medium text-[13px] md:text-[22px] text-secondary'>Your financial information is protected with advanced encryption and multi-factor authentication. We prioritize your privacy and data security at every step.</p>
		</div>
		<div className='-mt-16'>
			<img src={security} alt="" />
		</div>
	  </div>
	</section>
  )
}

export default Core
