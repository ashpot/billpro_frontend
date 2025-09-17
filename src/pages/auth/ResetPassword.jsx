// import React, { useState } from 'react';
// import logo from '../../assets/images/logo.png';
// import resetPassword from '../../assets/images/resetPassword.png';
// import { IoEyeSharp } from 'react-icons/io5';
// import { FaEyeSlash } from 'react-icons/fa';
// import { useNavigate, useParams } from "react-router-dom";
// import { adminResetPassword } from "../../services/authService";

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); // New state for New Password toggle
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Existing state for Confirm Password toggle

//   // Simulate token or email from previous step (replace with prop or state from CheckEmail page)
//   const resetToken = 'example-token';

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//     if (error) setError('');
//   };

//   const handleChangeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//     if (error) setError('');
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');
//     setError('');

//     // Client-side validation
//     if (!password.trim() || !confirmPassword.trim()) {
//       setError('Both password and confirm password are required');
//       setIsLoading(false);
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: resetToken, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Password has been successfully reset!');
//       } else {
//         setError(data.message || 'Failed to reset password');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-4 w-[90%] mx-auto">
//       <div className="flex mb-6">
//         <img src={logo} alt="BillPro Logo" className="h-10" />
//       </div>

//       <div className="max-w-md w-full mx-auto items-center justify-center">
//         <div className="flex justify-center mb-6">
//           <img src={resetPassword} alt="Reset Password" className="w-[45%]" />
//         </div>

//         {/* Title and Description */}
//         <h2 className="text-[34px] font-bold text-secondaryLight text-center ">Reset your password!</h2>
//         <p className="text-[#B7B7B7] font-medium text-sm text-center mb-6">
//           Please kindly set your new password.
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               value={password}
//               onChange={handleChangePassword}
//               placeholder="New Password"
//               className="w-full p-3  font-medium text-secondary text-[16.61px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
//               aria-label={showPassword ? 'Hide new password' : 'Show new password'}
//             >
//               {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
//             </button>
//           </div>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               value={confirmPassword}
//               onChange={handleChangeConfirmPassword}
//               placeholder="Re-enter Password"
//               className="w-full p-3 font-medium text-secondary text-[16.61px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={toggleConfirmPasswordVisibility}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
//               aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
//             >
//               {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
//             </button>
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-3 bg-primary text-white text-[18.99px] font-semibold rounded-lg hover:bg-yellow-500 ${
//               isLoading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Resetting...' : 'Continue'}
//           </button>
//         </form>

//         {message && <p className="text-center text-green-500 mt-4">{message}</p>}
//         {error && <p className="text-center text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import resetPassword from '../../assets/images/resetPassword.png';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import { adminResetPassword } from "../../services/authService";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ get token from URL param: /resetpassword/:token
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    // Client-side validation
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Both password and confirm password are required');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const data = await adminResetPassword({
        token,
        password,
        password2: confirmPassword,
      });

      setMessage(data.success || 'Password has been successfully reset!');
      navigate("/securedpassword");
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 w-[90%] mx-auto">
      <div className="flex mb-6">
        <img src={logo} alt="BillPro Logo" className="h-10" />
      </div>

      <div className="max-w-md w-full mx-auto items-center justify-center">
        <div className="flex justify-center mb-6">
          <img src={resetPassword} alt="Reset Password" className="w-[45%]" />
        </div>

        {/* Title and Description */}
        <h2 className="text-[34px] font-bold text-secondaryLight text-center ">
          Reset your password!
        </h2>
        <p className="text-[#B7B7B7] font-medium text-sm text-center mb-6">
          Please kindly set your new password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 font-medium text-secondary text-[16.61px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
              aria-label={showPassword ? 'Hide new password' : 'Show new password'}
            >
              {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter Password"
              className="w-full p-3 font-medium text-secondary text-[16.61px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-primary text-white text-[18.99px] font-semibold rounded-lg hover:bg-yellow-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Continue'}
          </button>
        </form>

        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
