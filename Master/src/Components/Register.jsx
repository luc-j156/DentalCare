import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Eye, EyeOff, Mail, Lock, User, Phone, MapPin,
  Loader2, ShieldCheck, ChevronRight, CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosClient";

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const passwordValue = watch("Password", "");
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const PostData = {
      FirstName: data.FirstName,
      Email: data.Email,
      Password: data.Password,
      Gender: data.Gender,
      Address: data.Address,
      Number: data.Number,
    };
    const SignUpURL = `${API_BASE_URL}/signup`;
    try {
      const res = await axios.post(SignUpURL, PostData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success === true) {
        toast.success("Account created successfully! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
    }`;

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
        {errors[field].message}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 flex flex-col">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Create Account</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Register</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">SmileCare Dental</p>
              <p className="text-xs text-gray-500">Free Patient Account</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Join SmileCare</h2>
              <p className="text-gray-500 text-sm">Book appointments and track your dental health</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Dr. / Mr. / Ms. Your Name"
                    {...register("FirstName", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                    })}
                    className={inputClass("FirstName")}
                  />
                </div>
                <ErrorMsg field="FirstName" />
              </div>

              {/* Phone & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      {...register("Number", {
                        required: "Phone number is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                      })}
                      className={inputClass("Number")}
                    />
                  </div>
                  <ErrorMsg field="Number" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("Email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                      })}
                      className={inputClass("Email")}
                    />
                  </div>
                  <ErrorMsg field="Email" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("Password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    className={`${inputClass("Password")} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                {passwordValue && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength ? strengthColors[strength] : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${strength < 2 ? "text-red-500" : strength < 4 ? "text-yellow-600" : "text-green-600"}`}>
                      Password strength: {strengthLabels[strength]}
                    </p>
                  </div>
                )}
                <ErrorMsg field="Password" />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4">
                  {["male", "Female"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        value={g}
                        {...register("Gender", { required: "Please select your gender" })}
                        className="w-4 h-4 text-blue-600 accent-blue-600"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 capitalize font-medium">
                        {g === "male" ? "Male" : "Female"}
                      </span>
                    </label>
                  ))}
                </div>
                <ErrorMsg field="Gender" />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea
                    rows="2"
                    placeholder="Your full residential address"
                    {...register("Address", {
                      required: "Address is required",
                      minLength: { value: 10, message: "Please enter a complete address" },
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none resize-none ${
                      errors.Address
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
                    }`}
                  />
                </div>
                <ErrorMsg field="Address" />
              </div>

              {/* Benefits checklist */}
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">
                  What you get with your free account
                </p>
                {[
                  "Book & manage appointments online",
                  "View upcoming & past visits",
                  "Receive SMS & email reminders",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                    <span className="text-xs text-blue-800">{item}</span>
                  </div>
                ))}
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
                    Creating account…
                  </>
                ) : (
                  "Create My Account"
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs text-gray-400 font-medium">Already registered?</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <Link
              to="/login"
              className="block w-full py-3 rounded-xl border-2 border-blue-200 text-blue-600 text-sm font-semibold text-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              Sign in to your account
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

export default Register;
