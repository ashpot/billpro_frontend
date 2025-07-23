import React from 'react'
import FAQs from '../../assets/images/FAQs.png'

const FAQ = () => {
  return (
	<section id='faq' className='text-white relative' loading="lazy"
		style={{
			backgroundImage: `url(${FAQs})`,
			backgroundBlendMode: 'overlay',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			minHeight: '100vh',
			paddingTop: '20px',
			paddingBottom: '20px',
		}}>

		<div className='md:py-20'>
			<div className='max-w-[95%] mx-auto text-center md:mb-20'>
				<h1 className='font-extrabold text-primary text-xl md:text-[49px] pb-1 md:pb-5'>Frequently Asked Questions</h1>
				<p className='font-semibold text-[10px] md:text-xl'>Find quick answers to common questions about BillPro</p>
			</div>

			<div className='max-w-[85%] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14'>
				<div className='border rounded-xl shadow-2xl p-5 hover:shadow-[5px_10px_20px_0px_#FFFFFF] transition-shadow duration-300'>
					<h3 className='font-bold md:font-extrabold text-sm md:text-2xl py-3'>Which services can I pay for?</h3>
					<p className='font-medium md:font-normal text-[11px] md:text-lg mb-5'>BillPro supports a wide range of services including electricity bills, cable TV subscriptions, airtime & data purchases, local flight bookings, and betting account funding. We continuously add new services based on user needs and market demands.</p>
				</div>

				<div className='border rounded-xl shadow-2xl p-5 hover:shadow-[5px_10px_20px_0px_#FFFFFF] transition-shadow duration-300'>
					<h3 className='font-bold md:font-extrabold text-sm md:text-2xl py-3'>How do I convert airtime to cash?</h3>
					<p className='font-medium md:font-normal text-[11px] md:text-lg mb-5'>Converting airtime to cash is simple with BillPro. Just select the 'Convert' option, enter the amount you want to convert, choose your preferred payment method, and confirm the transaction. The cash will be transferred to your wallet within minutes, with the best conversion rates guaranteed.</p>
				</div>

				<div className='border rounded-xl shadow-2xl p-5 hover:shadow-[5px_10px_20px_0px_#FFFFFF] transition-shadow duration-300'>
					<h3 className='font-bold md:font-extrabold text-sm md:text-2xl py-3'>How secure is BillPro?</h3>
					<p className='font-medium md:font-normal text-[11px] md:text-lg mb-5'>BillPro employs bank-grade security measures including end-to-end encryption, secure socket layer (SSL) technology, and multi-factor authentication. We regularly update our security protocols and are fully compliant with international data protection standards to ensure your transactions and personal information remain safe.</p>
				</div>

				<div className='border rounded-xl shadow-2xl p-5 hover:shadow-[5px_10px_20px_0px_#FFFFFF] transition-shadow duration-300'>
					<h3 className='font-bold md:font-extrabold text-sm md:text-2xl py-3'>Is the app free to download?</h3>
					<p className='font-medium md:font-normal text-[11px] md:text-lg mb-5'>Yes, BillPro is completely free to download from both the App Store and Google Play Store. While the app itself is free, standard transaction fees may apply for certain services, which are always clearly displayed before you confirm any transaction.</p>
				</div>
			</div>
		</div>
	  
	</section>
  )
}

export default FAQ
