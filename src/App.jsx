import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/styles.css';
import Index from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import Airtime from './pages/dashboard/Airtime';
import Data from './pages/dashboard/Data';
import Betting from './pages/dashboard/Betting';
import Electricity from './pages/dashboard/Electricity';
import Flights from './pages/dashboard/Flights';
import Education from './pages/dashboard/Education';
import TV from './pages/dashboard/Tv';
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
import WithdrawalRequests from './pages/dashboard/WithdrawalRequests';
import Notification from './pages/dashboard/Notifications';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RequestDelete from './pages/RequestDelete';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Auth */}
        <Route path='/' element={<Index />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<SignupPage />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/request-delete' element={<RequestDelete />} />

        {/* Forgot password flow */}
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        <Route path='/checkemail' element={<CheckEmail />} />
        <Route path='/auth/reset-password/:token' element={<ResetPassword />} />
        <Route path='/auth/secured-password' element={<SecuredPassword />} />

        {/* Dashboard & Sub-pages */}
        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/airtime/overview' element={<Airtime />} />
        <Route path='/admin/data/overview' element={<Data />} />
        <Route path='/admin/betting/overview' element={<Betting />} />
        <Route path='/admin/electricity/overview' element={<Electricity />} />
        <Route path='/admin/tv/overview' element={<TV/>} />
        <Route path='/admin/flights/overview' element={<Flights />} />
        <Route path='/admin/education/overview' element={<Education />} />
        <Route path='/admin/services' element={<Services />} />
        <Route path='/admin/users/overview' element={<Users />} />
        <Route path='/admin/chats' element={<Chats />} />
        <Route path='/admin/transactions/:id' element={<TransactionDetails />} />
        <Route path='/admin/settings/' element={<Settings />} />
        <Route path='/admin/users/profile' element={<UserProfile />} />
        <Route path='/admin/users/profile/:id' element={<UserProfileDetails />} />
        <Route path='/admin/referrals/overview' element={<Referrals />} />
        <Route path='/admin/reports' element={<Reports />} />
        <Route path='/admin/withdrawal-requests' element={<WithdrawalRequests />} />
        <Route path='/admin/notifications' element={<Notification />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
