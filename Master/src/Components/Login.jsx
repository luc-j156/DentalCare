import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Loader2, ShieldCheck, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const userData = { Email: data.email, Password: data.password };
    const LoginUrl = `${API_BASE_URL}/user_login`;
    try {
      const response = await axios.post(LoginUrl, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const login = response.data;
      if (login.success === true) {
        localStorage.clear();
        localStorage.setItem("email", login.result.Email);
        localStorage.setItem("userdetails", JSON.stringify(login.result));
        localStorage.setItem("id", login.result.id);
        localStorage.setItem("admin", login.result.admin);
        toast.success(`Welcome back, ${login.result.FirstName || "User"}!`);
        navigate("/");
      } else {
        localStorage.clear();
        toast.error(login.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 flex flex-col">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Sign In</span>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">SmileCare Dental</p>
              <p className="text-xs text-gray-500">Secure Patient Portal</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in to your account</h2>
              <p className="text-gray-500 text-sm">Manage your appointments and health records</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none
                      ${errors.email
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <button type="button" className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm transition-all outline-none
                      ${errors.password
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm
                  ${isValid && !isLoading
                    ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-md active:scale-[0.99]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs text-gray-400 font-medium">New to SmileCare?</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <Link
              to="/register"
              className="block w-full py-3 rounded-xl border-2 border-blue-200 text-blue-600 text-sm font-semibold text-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              Create a free account
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            🔒 Your data is protected with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
