import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./Assets/css/bootstrap.min.css";
import "./Assets/css/style.css";

import PublicLayout from "./Layouts/PublicLayout";

import Index from "./Components/Index";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Appointment from "./Components/Appointment";
import ResentAppointment from "./Components/ResentAppointment";
import Team from "./Components/Team";
import Service from "./Components/Service";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)",
          },
          success: {
            style: { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" },
            iconTheme: { primary: "#22c55e", secondary: "#f0fdf4" },
          },
          error: {
            style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" },
            iconTheme: { primary: "#ef4444", secondary: "#fef2f2" },
          },
        }}
      />
      <Routes>
        {/* Public Pages wrapped with modern PublicLayout */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Index />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/service"
          element={
            <PublicLayout>
              <Service />
            </PublicLayout>
          }
        />
        <Route
          path="/team"
          element={
            <PublicLayout>
              <Team />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* Auth & Booking — standalone full-page layouts (no PublicLayout wrapper) */}
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/appointment" element={<Appointment />} />
        {/* Dashboard pages — DashboardLayout is rendered internally */}
        <Route path="/profile"            element={<Profile />} />
        <Route path="/resentappointment"  element={<ResentAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
