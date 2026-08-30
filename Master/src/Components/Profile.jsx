import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  User, Mail, Phone, MapPin, ShieldCheck, Stethoscope,
  CheckCircle2, AlertCircle,
  Clock, Star, Calendar, ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosClient";

/* ─── Availability Toggle (Doctor only) ─────────────────── */
const AvailabilityPanel = ({ userDetails, onStatusChange }) => {
  const currentStatus = userDetails?.status || "Available";
  const isAvailable = currentStatus === "Available";

  const statuses = [
    {
      value: "Available",
      label: "Available",
      desc: "Patients can book appointments with you",
      color: "border-emerald-400 bg-emerald-50",
      badge: "bg-emerald-500",
      textColor: "text-emerald-700",
      icon: CheckCircle2,
    },
    {
      value: "UnAvailable",
      label: "On Leave",
      desc: "Your schedule is blocked — no new bookings",
      color: "border-amber-400 bg-amber-50",
      badge: "bg-amber-500",
      textColor: "text-amber-700",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Availability Status</h3>
          <p className="text-xs text-gray-500">Controls whether patients can book appointments with you</p>
        </div>
      </div>

      <div className="space-y-3">
        {statuses.map((s) => {
          const Icon = s.icon;
          const isSelected = currentStatus === s.value;
          return (
            <button
              key={s.value}
              onClick={() => onStatusChange(s.value)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200
                ${isSelected ? `${s.color} border-2` : "border-gray-200 bg-white hover:border-gray-300"}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${isSelected ? `border-2 ${s.badge} border-transparent` : "border-gray-300 bg-white"}`}>
                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${isSelected ? s.textColor : "text-gray-700"}`}>{s.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
              {isSelected && <Icon className={`w-5 h-5 flex-shrink-0 ${s.textColor}`} />}
            </button>
          );
        })}
      </div>

      {/* Current status display */}
      <div className={`mt-4 flex items-center gap-2.5 rounded-xl px-4 py-3 border ${isAvailable ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isAvailable ? "bg-emerald-500" : "bg-amber-500"}`}></span>
        <span className={`text-xs font-semibold ${isAvailable ? "text-emerald-700" : "text-amber-700"}`}>
          Currently: <span className="font-bold">{currentStatus}</span>
        </span>
      </div>
    </div>
  );
};

/* ─── Profile Info Card ──────────────────────────────────── */
const ProfileCard = ({ userDetails, userRole }) => {
  const roleConfig = {
    "1": { label: "Administrator", color: "bg-purple-100 text-purple-700 border-purple-200", icon: ShieldCheck },
    "2": { label: "Doctor",        color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: Stethoscope },
    "0": { label: "Patient",       color: "bg-blue-100 text-blue-700 border-blue-200", icon: User },
  };
  const cfg = roleConfig[userRole] || roleConfig["0"];
  const RoleIcon = cfg.icon;

  const fields = [
    { label: "Full Name",  value: userDetails?.FirstName,  icon: User },
    { label: "Email",      value: userDetails?.Email,      icon: Mail },
    { label: "Phone",      value: userDetails?.Number,     icon: Phone },
    { label: "Gender",     value: userDetails?.Gender,     icon: User },
    { label: "Address",    value: userDetails?.Address,    icon: MapPin },
    ...(userRole === "2" ? [
      { label: "Specialty",       value: userDetails?.Specialist,    icon: Stethoscope },
      { label: "Licence No.",     value: userDetails?.licencenumber, icon: ShieldCheck },
    ] : []),
  ].filter(f => f.value);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Top banner */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-end justify-between -mt-10 mb-5">
          <div className="relative">
            {userDetails?.Image ? (
              <img
                src={`${API_BASE_URL}/${userDetails.Image}`}
                alt={userDetails.FirstName}
                className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center text-white text-3xl font-extrabold">
                {userDetails?.FirstName?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${cfg.color}`}>
            <RoleIcon className="w-3.5 h-3.5" />{cfg.label}
          </span>
        </div>

        {/* Name & specialty */}
        <h2 className="text-xl font-bold text-gray-900">
          {userRole === "2" ? `Dr. ${userDetails?.FirstName}` : userDetails?.FirstName || "—"}
        </h2>
        {userRole === "2" && userDetails?.Specialist && (
          <p className="text-sm text-blue-600 font-medium mt-0.5">{userDetails.Specialist}</p>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 my-5"></div>

        {/* Fields */}
        <div className="space-y-3">
          {fields.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Quick Links Panel ──────────────────────────────────── */
const QuickLinks = ({ userRole }) => {
  const links = [
    ...(userRole === "0" ? [{ to: "/appointment", label: "Book New Appointment", icon: Calendar, color: "text-blue-600 bg-blue-50" }] : []),
    { to: "/resentappointment", label: userRole === "2" ? "View Patient Queue" : "View Appointments", icon: Calendar, color: "text-violet-600 bg-violet-50" },
    { to: "/team", label: "Our Dental Team", icon: Stethoscope, color: "text-teal-600 bg-teal-50" },
    { to: "/", label: "Back to Website", icon: Star, color: "text-gray-600 bg-gray-50" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
      <div className="space-y-2">
        {links.map(({ to, label, icon: Icon, color }) => (
          <Link key={to} to={to}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const Profile = () => {
  const userRole = localStorage.getItem("admin");
  const [userDetails, setUserDetails] = useState(() => {
    try { return JSON.parse(localStorage.getItem("userdetails")) || {}; }
    catch { return {}; }
  });

  const handleStatusChange = (newStatus) => {
    const updated = { ...userDetails, status: newStatus };
    setUserDetails(updated);
    localStorage.setItem("userdetails", JSON.stringify(updated));

    const formData = new FormData();
    formData.append("status", newStatus);
    formData.append("id", localStorage.getItem("id"));
    axios.post(`${API_BASE_URL}/update/status`, formData, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(`Availability status updated to "${newStatus}"`);
      } else {
        toast.error("Failed to update status.");
      }
    }).catch(() => {
      toast.error("Failed to update status. Please try again.");
    });
  };

  return (
    <DashboardLayout pageTitle="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-5">
          <ProfileCard userDetails={userDetails} userRole={userRole} />
          <QuickLinks userRole={userRole} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Doctor-only availability panel */}
          {userRole === "2" && (
            <AvailabilityPanel userDetails={userDetails} onStatusChange={handleStatusChange} />
          )}

          {/* Info panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Account Type",  value: userRole === "1" ? "Administrator" : userRole === "2" ? "Doctor" : "Patient" },
                { label: "User ID",       value: `#${localStorage.getItem("id") || "—"}` },
                { label: "Registered As", value: userDetails?.Email || "—" },
                { label: "Gender",        value: userDetails?.Gender || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                  <p className="font-semibold text-gray-800 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 text-sm">Account Security</p>
                <p className="text-xs text-blue-600 mt-1">
                  Your account is protected with encrypted credentials. If you need to update your password or email, please contact the clinic front desk or administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
