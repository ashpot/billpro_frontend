
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import checkEmail from "../../assets/images/checkEmail.png";
import { IoIosArrowBack } from "react-icons/io";
import { adminForgetPassword } from "../../services/authService";

const CheckEmail = () => {
  const [email] = useState(
    () => sessionStorage.getItem("billwev_reset_email") || ""
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    if (!email) {
      setError("Please return to the forgot-password page and enter your email.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await adminForgetPassword({ email });
      const result = response?.data ?? response;

      setMessage(
        result?.message ||
          "If the account exists, new password reset instructions will be sent to your email."
      );
    } catch (err) {
      setError(
        err.message || "Unable to resend the email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto p-4">
      <div className="mb-6 flex">
        <Link to="/auth/login" aria-label="Back to login">
          <img src={logo} alt="BillPro Logo" className="h-10" />
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center">
        <div className="mb-6 flex justify-center">
          <img
            src={checkEmail}
            alt="Check your email"
            className="w-[45%] object-contain"
          />
        </div>

        <h1 className="mb-2 text-center text-[34px] font-bold text-secondaryLight">
          Check your email!
        </h1>

        <p className="mb-3 text-center text-sm font-medium text-[#B7B7B7]">
          If an account exists for the email address below, password reset
          instructions will be sent to it. Follow the link in that email to
          continue.
        </p>

        {email ? (
          <p className="mb-6 break-all text-center font-semibold text-secondary">
            {email}
          </p>
        ) : (
          <p className="mb-6 text-center text-sm text-[#B7B7B7]">
            No email address was found. Return to the previous page and enter
            your email address.
          </p>
        )}

        <button
          type="button"
          onClick={handleResendEmail}
          disabled={isLoading || !email}
          className={`w-full rounded-md bg-primary py-3 text-[19px] font-semibold text-white hover:bg-yellow-500 ${
            isLoading || !email
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
        >
          {isLoading ? "Resending..." : "Resend Email"}
        </button>

        {message && (
          <p role="status" className="mt-4 text-center text-sm text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[#B7B7B7]">
          Didn't receive an email? Check your spam folder or contact{" "}
          <a
            href="mailto:support@billpro.com.ng"
            className="font-medium hover:underline"
          >
            support@billpro.com.ng
          </a>
          .
        </p>

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

export default CheckEmail;
