
import React from 'react';
import logo from '../../assets/images/logo.png';
import securedPassword from '../../assets/images/securedPassword.png';
import { useNavigate } from "react-router-dom";

const SecuredPassword = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-4 w-[90%] mx-auto">
      <div className="flex mb-6">
        <img src={logo} alt="BillPro Logo" className="h-10" />
      </div>

      <div className="max-w-md w-full mx-auto items-center justify-center">
        <div className="flex justify-center mb-6">
          <img src={securedPassword} alt="Secured Password" className="w-[45%]" />
        </div>

        <h2 className="text-[34px] font-bold text-secondaryLight text-center">
          Password Changed!
        </h2>
        <p className="text-[#B7B7B7] font-medium text-sm text-center mb-6">
          You’ve successfully completed your password reset.
        </p>

        <button
          onClick={handleGoToLogin}
          className="w-full flex justify-center py-3 bg-primary text-white text-lg font-semibold rounded-md hover:bg-yellow-500"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default SecuredPassword;
