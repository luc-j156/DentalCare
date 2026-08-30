import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Calendar,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("admin"); // "1" = Admin, "2" = Doctor, "0" = Patient
  const userDetails = JSON.parse(localStorage.getItem("userdetails") || "{}");
  const userName = userDetails.FirstName || (userRole === "1" ? "Admin" : "User");

  const logout = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "Our Dentists", path: "/team" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-md shadow-sky-500/20 transition-transform group-hover:scale-105">
            <span className="text-2xl">🦷</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Dent<span className="text-sky-600">Care</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Dental Clinic & Surgery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Conditional Dropdown or Links for Logged-in Users */}
          {userId && (
            <Link
              to="/resentappointment"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive("/resentappointment")
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 text-sky-600" />
              <span>
                {userRole === "1"
                  ? "Admin Dashboard"
                  : userRole === "2"
                  ? "Doctor Queue"
                  : "My Appointments"}
              </span>
            </Link>
          )}
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="hidden items-center gap-3 md:flex">
          {userId ? (
            <div className="flex items-center gap-2">
              {userRole !== "1" && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <User className="h-4 w-4 text-sky-600" />
                  <span>{userName}</span>
                </Link>
              )}
              {userRole === "1" && (
                <span className="flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 border border-purple-200">
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </span>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-600/25 transition-all hover:from-sky-500 hover:to-sky-600 hover:shadow-lg hover:shadow-sky-600/35"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          )}

          {/* If patient is logged in, show Book Appointment button */}
          {userId && userRole === "0" && (
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-600/25 transition-all hover:from-sky-500 hover:to-sky-600"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-100 bg-white px-4 pt-2 pb-6 shadow-xl md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                  isActive(link.path)
                    ? "bg-sky-50 text-sky-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {userId && (
              <>
                <Link
                  to="/resentappointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {userRole === "1"
                    ? "Admin Dashboard"
                    : userRole === "2"
                    ? "Doctor Appointments"
                    : "My Appointments"}
                </Link>
                {userRole !== "1" && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Profile ({userName})
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
            {userId ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 font-semibold text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl border border-slate-200 py-2.5 text-center font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-xl bg-sky-600 py-2.5 text-center font-semibold text-white shadow-md shadow-sky-600/25 hover:bg-sky-700"
                >
                  Book Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
