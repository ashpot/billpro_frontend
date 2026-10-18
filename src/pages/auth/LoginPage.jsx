
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoIcon from "../../assets/images/Logo Icon.png";
import login from "../../assets/images/login.png";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { adminSignin } from "../../services/authService";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (error) setError("");
    if (message) setMessage("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username or email is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setFieldErrors({});

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminSignin({
        username: formData.username.trim(),
        password: formData.password,
      });

      const result = response?.data ?? response;

      if (!result?.token || !result?.user) {
        throw new Error(
          "Login response is incomplete. Please check the authentication API response."
        );
      }

      localStorage.setItem("admin_token", result.token);
      localStorage.setItem("admin_user", JSON.stringify(result.user));

      const destination = location.state?.from;

      const redirectTo =
        destination?.pathname?.startsWith("/admin/")
          ? `${destination.pathname}${destination.search || ""}${destination.hash || ""}`
          : "/admin/dashboard";

      navigate(redirectTo, { replace: true });
          } catch (err) {
            setError(
              err.message || "Login failed. Please check your credentials and try again."
            );
          } finally {
            setIsLoading(false);
          }
        };

  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Logo */}
        <Link
          to="/auth/login"
          className="mb-8 inline-flex items-center gap-2"
          aria-label="Billwev login"
        >
          <img
            src={logoIcon}
            alt="Billwev Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-secondaryLight text-2xl font-bold sm:text-[32px]">
            BillWev
          </span>
        </Link>

        {/* Login content */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* Login form */}
          <section className="w-full min-w-0 py-2 sm:py-6 md:py-10">
            <h1 className="mb-2 text-3xl font-bold text-secondaryLight">
              Admin Login
            </h1>

            <p className="mb-6 text-sm font-medium text-[#B7B7B7]">
              Welcome back, please enter your details.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label htmlFor="username" className="sr-only">
                  Username or Email
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username or Email"
                  autoComplete="username"
                  aria-invalid={Boolean(fieldErrors.username)}
                  aria-describedby={
                    fieldErrors.username ? "username-error" : undefined
                  }
                  className={`w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    fieldErrors.username
                      ? "border-red-500"
                      : "border-[#E5E5E5]"
                  }`}
                  required
                  disabled={isLoading}
                />

                {fieldErrors.username && (
                  <p
                    id="username-error"
                    className="mt-1 text-sm text-red-500"
                  >
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={
                      fieldErrors.password ? "password-error" : undefined
                    }
                    className={`w-full rounded-md border p-3 pr-11 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                      fieldErrors.password
                        ? "border-red-500"
                        : "border-[#E5E5E5]"
                    }`}
                    required
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                    disabled={isLoading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </button>
                </div>

                {fieldErrors.password && (
                  <p
                    id="password-error"
                    className="mt-1 text-sm text-red-500"
                  >
                    {fieldErrors.password}
                  </p>
                )}

                <div className="mt-2 text-right">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full rounded-md bg-primary py-3 text-lg font-semibold text-white transition-colors hover:bg-yellow-500 ${
                  isLoading ? "cursor-not-allowed opacity-60" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Login"}
              </button>
            </form>

            {message && (
              <p role="status" className="mt-4 text-center text-green-600">
                {message}
              </p>
            )}

            {error && (
              <p role="alert" className="mt-4 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            <p className="mt-6 text-sm font-normal leading-6 text-[#B7B7B7]">
              Manage utility payments, monitor transactions, oversee customer
              accounts, and keep Billwev running smoothly. Sign in to access
              your dashboard and manage your operations securely.
            </p>
          </section>

          {/* Illustration */}
          <div className="hidden w-full min-w-0 md:block">
            <img
              src={login}
              alt="Billwev admin login illustration"
              className="h-auto max-h-[560px] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
