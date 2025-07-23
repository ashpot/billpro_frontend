import React from 'react'
import appStore from '../../assets/images/appStore.png'
import googlePlay from '../../assets/images/googlePlay.png'

const Payment = () => {
  return (
	<div id='payment' className='max-w-[85%] mx-auto text-center py-10 md:py-14'>
	  <h1 className='font-extrabold text-primary text-[23px] md:text-[49px]'>Ready to Simplify Your Bill Payments?</h1>
	  <p className='font-semibold text-secondary text-xs md:text-[25px] md:leading-snug'>Join thousands of users who have made bill payments easier with BillPro. <br className='hidden md:block' /> Download the app today and experience the convenience.</p>
	  <div className='py-5 md:py-12 flex items-center justify-center gap-4'>
		<img src={googlePlay} alt="google store" className='w-[40%] md:w-[20%]'/>
		<img src={appStore} alt="app store" className='w-[40%] md:w-[20%]'/>
	   </div>
	</div>
  )
}

export default Payment
