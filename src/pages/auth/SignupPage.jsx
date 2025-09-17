
import React, { useState } from 'react';
import logoIcon from '../../assets/images/Logo Icon.png';
import login from '../../assets/images/login.png';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { emailSignup } from '../../services/authService';
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(e.target.name);
    //console.log(e.target.value)
  };

  /*const validateForm = () => {
    if (!formData.fullname.trim()) return 'Full name is required';
    if (!formData.username.trim()) return 'Username is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return '';
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await emailSignup({
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      });
      
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      if (response.status === 201) {
        setMessage("Verification email sent!");
        console.log("Signup successful:", response.data);
        localStorage.setItem("signup_user_id", response.data.user_id);
        localStorage.setItem("signup_email", formData.email);

        // ✅ Navigate to login after signup
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
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
        {/* Left Side - Signup Form */}
        <div className="w-1/2 py-10">
          <h2 className="text-3xl text-secondaryLight font-bold mb-2">Sign Up</h2>
          <p className="text-[#B7B7B7] text-sm font-medium mb-6">Let's get started</p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onBlur={handleChange}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
                disabled={isLoading}
              />
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
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full py-3 bg-primary text-white text-lg font-semibold rounded-md hover:bg-yellow-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Get Started'}
            </button>
          </form>
          <p className="text-sm font-semibold text-[#B7B7B7] mt-4">
            Already an admin?{' '}
            <a href="/login" className="text-primary ml-2 hover:underline">
              Sign in
            </a>
          </p>
          {message && <p className="text-center text-green-500 mt-4">{message}</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Side - Image */}
        <div className="relative w-1/2">
          <img src={login} alt="Signup Illustration" className="" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;