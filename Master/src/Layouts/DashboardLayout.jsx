import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users, User, PlusCircle, LogOut,
  Menu, X, Home, ShieldCheck, Stethoscope,
  ChevronRight, LayoutDashboard, Settings,
} from "lucide-react";

const DashboardLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userDetailsStr = localStorage.getItem("userdetails");
  const userDetails = userDetailsStr ? JSON.parse(userDetailsStr) : {};
  const userRole = localStorage.getItem("admin"); // "1"=Admin, "2"=Doctor, "0"=Patient
  const userName = userDetails.FirstName || (userRole === "1" ? "Admin" : "User");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getRoleBadge = () => {
    if (userRole === "1") return { label: "Administrator", color: "bg-purple-100 text-purple-700 border-purple-200", icon: ShieldCheck };
    if (userRole === "2") return { label: "Doctor",        color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: Stethoscope };
    return                       { label: "Patient",       color: "bg-blue-100 text-blue-700 border-blue-200",   icon: User };
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

  // Role-specific sidebar nav
  const navItems = [
    {
      name: "Back to Website",
      path: "/",
      icon: Home,
      show: true,
    },
    {
      name: userRole === "1" ? "Admin Dashboard" : userRole === "2" ? "Doctor Dashboard" : "My Appointments",
      path: "/resentappointment",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "Book Appointment",
      path: "/appointment",
      icon: PlusCircle,
      show: userRole === "0",
    },
    {
      name: userRole === "2" ? "Patient Queue" : "Our Doctors",
      path: userRole === "2" ? "/resentappointment" : "/team",
      icon: Users,
      show: userRole !== "0",
    },
    {
      name: "Profile & Settings",
      path: "/profile",
      icon: Settings,
      show: true,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-xl border-r border-slate-100 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-blue-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white text-lg shadow-md">
              🦷
            </span>
            <div className="flex flex-col">
              <span className="text-base leading-tight tracking-tight text-gray-900">SmileCare</span>
              <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">Portal</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User card */}
        <div className="p-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-teal-500 text-white font-bold shadow">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900">{userName}</p>
                <div className={`mt-0.5 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${roleInfo.color}`}>
                  <RoleIcon className="h-3 w-3" />
                  <span>{roleInfo.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {navItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={`${item.path}-${item.name}`}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-5 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-800">
                {pageTitle || `Welcome back, ${userName} 👋`}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs text-emerald-700 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Clinic Open
            </div>
            <Link
              to="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white font-bold hover:shadow-md transition-shadow"
              title="View Profile"
            >
              {userName.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
