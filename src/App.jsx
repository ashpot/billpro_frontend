import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/styles.css';
import Index from './pages/LandingPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
