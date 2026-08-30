import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import TeamBox from "../Containers/TeamBox";
import ManageApp from "./ManageApp";
import { doctorService } from "../api";

const Team = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("admin");

  const getDoctorList = async () => {
    try {
      setLoading(true);
      const res = await doctorService.getAllDoctors();
      if (res.success && res.result) {
        setDoctorList(res.result);
      }
    } catch (err) {
      console.error("Failed to load doctor list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Board-Certified Dental Experts</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Meet Our Dental Specialists
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
            Our experienced dental surgeons, orthodontists, and prosthodontists are dedicated to delivering precision care.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-400 font-medium">Our Dentists</span>
          </div>
        </div>
      </div>

      {/* Admin Doctor Addition Form */}
      {userRole === "1" && (
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <ManageApp onDoctorAdded={getDoctorList} />
        </div>
      )}

      {/* 2. DOCTORS GRID */}
      <section className="py-20 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              Expert Team
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Certified & Experienced Dentists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Book a direct consultation with our doctors specialized in prosthodontics, cosmetic smile design, and orthodontics.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <TeamBox prod={doctorList} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
