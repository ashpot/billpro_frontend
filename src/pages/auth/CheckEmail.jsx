
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import checkEmail from '../../assets/images/checkEmail.png';
import { IoIosArrowBack } from "react-icons/io";

const CheckEmail = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate email from previous step (replace with prop or state from Forgot Password page)
  const prefilledEmail = 'user@example.com'; // Example; replace with actual email from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/resend-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: prefilledEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been sent to your email!');
      } else {
        setError(data.message || 'Failed to send reset link');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/resend-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: prefilledEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been resent to your email!');
      } else {
        setError(data.message || 'Failed to resend reset link');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 w-[90%] mx-auto">
      <div className="flex mb-6">
        <img src={logo} alt="BillPro Logo" className="h-10" />
      </div>

      <div className="max-w-[48%] w-full mx-auto items-center justify-center">
        <div className="flex justify-center mb-6">
          <img src={checkEmail} alt="Check Email" className="w-[45%]" />
        </div>

        {/* Title and Description */}
        <h2 className="text-[34px] font-bold text-secondaryLight text-center mb-2">Check your email!</h2>
        <p className="text-[#B7B7B7] font-medium text-sm text-center mb-6">
          Thanks! An email was sent that will ask you to click on a link to verify that you own this account. 
          If you don't get the email, please contact 
          <a href="mailto:support@kinety.com" className="ml-1 hover:underline">
            support@kinety.com
          </a> 
        </p>

        {/* Form - Removed input since email is pre-sent, kept for resend context */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            type="submit"
            className={`w-full py-3 bg-primary text-white text-[18.99px] font-semibold rounded-md hover:bg-yellow-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Open email inbox'}
          </button>
        </form>

        {/* Back to Login */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleResendEmail(); }}
          className="flex justify-center items-center font-semibold text-[18.99px] mt-4 p-3 rounded-md bg-[#F7F7F7] text-secondary "
        >
          <IoIosArrowBack className="mr-7"/> Resend Email
        </a>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CheckEmail;