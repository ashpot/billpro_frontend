
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setSessionExpired(true);
    };

    window.addEventListener(
      "billwev:unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "billwev:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  const token = localStorage.getItem("admin_token");
  const storedUser = localStorage.getItem("admin_user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("admin_user");
  }

  if (sessionExpired || !token || !user) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
