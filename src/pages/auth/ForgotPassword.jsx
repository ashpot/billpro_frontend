
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import forgotPassword from "../../assets/images/forgotPassword.png";
import { IoIosArrowBack } from "react-icons/io";
import { adminForgetPassword } from "../../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminForgetPassword({
        email: normalizedEmail,
      });

      const result = response?.data ?? response;

      // Save the email for the confirmation page, not a reset token.
      sessionStorage.setItem("billwev_reset_email", normalizedEmail);

      setMessage(
        result?.message ||
          "If the account exists, password reset instructions will be sent to your email."
      );

      // App.jsx registers this exact route.
      navigate("/checkemail", { replace: true });
    } catch (err) {
      setError(
        err.message ||
          "We couldn't process your request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto p-4">
      <div className="flex mb-6">
        <Link to="/auth/login" aria-label="Back to login">
          <img src={logo} alt="BillPro Logo" className="h-10" />
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-6 flex justify-center">
          <img
            src={forgotPassword}
            alt="Forgot Password"
            className="w-[50%] object-contain"
          />
        </div>

        <h1 className="mb-2 text-center text-[34px] font-bold text-secondaryLight">
          Forgot your password?
        </h1>

        <p className="mb-6 text-center text-sm font-medium text-[#B7B7B7]">
          Enter your email so that we can send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="reset-email" className="sr-only">
              Email address
            </label>

            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
              placeholder="Email"
              autoComplete="email"
              required
              disabled={isLoading}
              className={`w-full rounded-md border border-[#E5E5E5] bg-[#F7F7F7] p-3 text-[16px] font-medium text-secondary focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                error ? "border-red-500" : ""
              }`}
            />

            {error && (
              <p role="alert" className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-primary py-3 text-[19px] font-semibold text-white hover:bg-yellow-500 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-4 text-center text-sm text-green-600">
            {message}
          </p>
        )}

        <Link
          to="/auth/login"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-[#F7F7F7] p-3 text-[19px] font-semibold text-secondary"
        >
          <IoIosArrowBack className="mr-3" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
