import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/styles.css';



const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const Airtime = lazy(() => import("./pages/dashboard/Airtime"));
const Data = lazy(() => import("./pages/dashboard/Data"));
const Betting = lazy(() => import("./pages/dashboard/Betting"));
const Electricity = lazy(() => import("./pages/dashboard/Electricity"));
const Flights = lazy(() => import("./pages/dashboard/Flights"));
const Education = lazy(() => import("./pages/dashboard/Education"));
const TV = lazy(() => import("./pages/dashboard/Tv"));
const Services = lazy(() => import("./pages/dashboard/Services"));
const Users = lazy(() => import("./pages/dashboard/Users"));

const Chats = lazy(() => import("./pages/dashboard/Chats"));
const TransactionDetails = lazy(
  () => import("./pages/dashboard/TransactionDetails")
);
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const UserProfileDetails = lazy(
  () => import("./pages/dashboard/UserProfileDetails")
);
const UserProfile = lazy(() => import("./pages/dashboard/UserProfile"));
const Referrals = lazy(() => import("./pages/dashboard/Referrals"));
const Reports = lazy(() => import("./pages/dashboard/Reports"));
const WithdrawalRequests = lazy(
  () => import("./pages/dashboard/WithdrawalRequests")
);
const Notification = lazy(
  () => import("./pages/dashboard/NotificationsPage")
);

import UserDetailsPage from "./pages/dashboard/UserDetailsPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SendNotificationPage from "./pages/dashboard/SendNotificationPage";
import NotificationDetailsPage from "./pages/dashboard/NotificationDetailsPage";

/*{ ---- auth pages ---- }*/
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import CheckEmail from './pages/auth/CheckEmail';
import ResetPassword from './pages/auth/ResetPassword';
import SecuredPassword from './pages/auth/SecuredPassword';

/* { ----- landing pages ----- } */
import Index from './pages/LandingPage'
import PrivacyPolicy from './pages/PrivacyPolicy';
import RequestDelete from './pages/RequestDelete';
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
    <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          Loading page...
        </p>
      </div>
    }
  >
      <Routes>
        {/* Landing & Auth */}
        <Route path='/' element={<Index />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/signup' element={<SignupPage />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/request-delete' element={<RequestDelete />} />

        <Route
          path="/admin/users/:id"
          element={<UserDetailsPage />}
        />

        {/* Forgot password flow */}
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        <Route path='/checkemail' element={<CheckEmail />} />
        {/* Password reset routes */}
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

          {/* Support older reset links */}
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Show a helpful message if the reset token is missing */}
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          <Route
            path="/auth/secured-password"
            element={<SecuredPassword />}
          />

        
    {/* Protected Dashboard & Sub-pages */}
      <Route path="/admin" element={<ProtectedRoute />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="airtime/overview" element={<Airtime />} />
      <Route path="data/overview" element={<Data />} />
      <Route path="betting/overview" element={<Betting />} />
      <Route path="electricity/overview" element={<Electricity />} />
      <Route path="tv/overview" element={<TV />} />
      <Route path="flights/overview" element={<Flights />} />
      <Route path="education/overview" element={<Education />} />
      <Route path="services" element={<Services />} />
      <Route path="users/overview" element={<Users />} />
      <Route path="chats" element={<Chats />} />
      <Route path="transactions/:id" element={<TransactionDetails />} />
      <Route path="settings" element={<Settings />} />
      <Route path="users/profile" element={<UserProfile />} />
      <Route path="users/profile/:id" element={<UserProfileDetails />} />
      <Route path="referrals/overview" element={<Referrals />} />
      <Route path="reports" element={<Reports />} />
      <Route path="withdrawal-requests" element={<WithdrawalRequests />} />
      <Route
  path="/admin/notifications"
  element={<NotificationsPage />}
/>

<Route
  path="/admin/notifications/send"
  element={<SendNotificationPage />}
/>

<Route
  path="/admin/notifications/:id"
  element={<NotificationDetailsPage />}
/>
      </Route>

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
