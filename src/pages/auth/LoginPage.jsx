
import React, { useState } from 'react';
import logoIcon from '../../assets/images/Logo Icon.png';
import login from '../../assets/images/login.png';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { adminSignin } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const validateFormClientSide = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username or email is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    setFieldErrors({});

    // ✅ Run client-side validation
    const errors = validateFormClientSide();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await adminSignin({
        username: formData.username, // can also be email
        password: formData.password,
      });

      console.log("Login response data:", response.data);

      // ✅ success -> backend returns { token, user }
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin_user", JSON.stringify(response.data.user));

      setMessage("Login successful!");
      
      if(response.status == 200) navigate("/dashboard"); 
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto my-9">
      <div className='flex items-center space-x-2 mb-8'>
        <img src={logoIcon} alt="BillPro Logo" />
        <span className='text-secondaryLight font-bold text-[32px]'>BillWev</span>
      </div>
     
      <div className="flex justify-between gap-14 h-full">
        {/* Left Side - Login Form */}
        <div className="w-1/2 py-10">
          <h2 className="text-3xl text-secondaryLight font-bold mb-2">Login</h2>
          <p className="text-[#B7B7B7] text-sm font-medium mb-6">
            Welcome back, please enter your details.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username or Email"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  fieldErrors.username ? 'border-red-500' : 'border-[#E5E5E5]'
                }`}
                required
                disabled={isLoading}
              />
              {fieldErrors.username && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    fieldErrors.password ? 'border-red-500' : 'border-[#E5E5E5]'
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
              <a
                href="/forgot-password"
                className="text-sm text-primary font-semibold text-right hover:underline mt-2 block"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className={`w-full py-3 bg-primary text-white text-lg font-semibold rounded-md hover:bg-yellow-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </button>
          </form>
          <p className="text-sm font-semibold text-[#B7B7B7] mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary ml-2 hover:underline">
              Create Account
            </a>
          </p>
          {message && <p className="text-center text-green-500 mt-4">{message}</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Side - Image */}
        <div className="relative w-1/2">
          <img src={login} alt="Login Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
