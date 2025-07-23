import React from 'react'
import heroImage from '../../assets/images/heroImage.png'
import appStore from '../../assets/images/appStore.png'
import googlePlay from '../../assets/images/googlePlay.png'

const Hero = () => {
  return (
	<section id='home' className='max-w-[85%] mx-auto max-h-screen flex flex-col md:flex-row items-center justify-between gap-10 md:gap-5 -mb-20 md:mb-20'>
	  <div className='text-center md:text-left h-1/5 md:mt-14'>
		<h4 className='font-semibold text-[10px] md:text-base '>SIMPLIFIED PAYMENTS</h4>
		<h1 className='font-bold md:font-extrabold text-primary text-[34px] md:text-[61px] leading-tight'>One App for All Your Bills.</h1>
		<p className='font-semibold text-[13px] md:text-[22px] '>Top up airtime, pay electricity and TV, <br /> convert airtime, and more - fast, secure, and <br className='hidden md:block' /> stress-free.</p>	
		<div className='flex items-center justify-center md:justify-start gap-4 mt-6'>
			<img src={googlePlay} alt="google store" className='w-[40%] md:w-[30%]'/>
			<img src={appStore} alt="app store" className='w-[40%] md:w-[30%]'/>
		</div>
	  </div>

	  <div className='relative'>
		<img src={heroImage} alt="hero image" />
	  </div>
	</section>
  )
}

export default Hero
