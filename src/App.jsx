import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/styles.css';
import Index from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import Airtime from './pages/dashboard/Airtime';
import Data from './pages/dashboard/Data';
import Flights from './pages/dashboard/Flights';
import Education from './pages/dashboard/Education';
import Services from './pages/dashboard/Services';
import Users from './pages/dashboard/Users';
import Chats from './pages/dashboard/Chats';
import TransactionDetails from './pages/dashboard/TransactionDetails';
import Settings from './pages/dashboard/Settings';
import ForgotPassword from './pages/auth/ForgotPassword';
import CheckEmail from './pages/auth/CheckEmail';
import ResetPassword from './pages/auth/ResetPassword';
import SecuredPassword from './pages/auth/SecuredPassword';
import UserProfileDetails from './pages/dashboard/UserProfileDetails';
import UserProfile from './pages/dashboard/UserProfile';
import Referrals from './pages/dashboard/Referrals';
import Reports from './pages/dashboard/Reports';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Auth */}
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        {/* Forgot password flow */}
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/checkemail' element={<CheckEmail />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='/securedpassword' element={<SecuredPassword />} />

        {/* Dashboard & Sub-pages */}
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dashboard/airtime' element={<Airtime />} />
        <Route path='/dashboard/data' element={<Data />} />
        <Route path='/dashboard/flights' element={<Flights />} />
        <Route path='/dashboard/education' element={<Education />} />
        <Route path='/dashboard/services' element={<Services />} />
        <Route path='/dashboard/users' element={<Users />} />
        <Route path='/dashboard/chats' element={<Chats />} />
        <Route path='/dashboard/transactiondetails' element={<TransactionDetails />} />
        <Route path='/dashboard/settings' element={<Settings />} />
        <Route path='/dashboard/userprofile' element={<UserProfile />} />
        <Route path='/dashboard/userprofiledetails' element={<UserProfileDetails />} />
        <Route path='/dashboard/referrals' element={<Referrals />} />
        <Route path='/dashboard/reports' element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
