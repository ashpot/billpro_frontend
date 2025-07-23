import React from 'react'
import Hero from '../components/landing/Hero'
import About from '../components/landing/About'
import Core from '../components/landing/Core'
import FAQ from '../components/landing/FAQ'
import Payment from '../components/landing/Payment'
import Features from '../components/landing/Features'
import Navbar from '../components/landing/Navbar'
import Footer from '../components/landing/Footer'

const index = () => {
  return (
	<div>
      <Navbar />
	  <Hero />
	  <About />
	  <Features />
	  <Core />
	  <FAQ />
	  <Payment />
	  <Footer />
	</div>
  )
}

export default index
