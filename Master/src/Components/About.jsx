import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Clock,
  CheckCircle2,
  Calendar,
  Phone,
  Smile,
  Zap,
} from "lucide-react";

const About = () => {
  const pillars = [
    {
      title: "Painless Dentistry",
      desc: "Gentle techniques and modern anesthetics ensuring zero pain or stress during your visit.",
      icon: Heart,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      title: "Certified Specialists",
      desc: "Our doctors have over 10+ years of dedicated practice across orthodontics, implants, and surgery.",
      icon: Award,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      title: "100% Sterile Environment",
      desc: "Hospital-grade autoclaves and multi-step sterilization protocols after every single patient.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Digital 3D Diagnostics",
      desc: "Low-radiation 3D imaging for ultra-accurate treatment planning and rapid diagnostics.",
      icon: Zap,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Excellence in Dental Medicine</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About DentCare Clinic
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
            Dedicated to providing world-class oral healthcare, cosmetic smile restorations, and compassionate treatments since 2015.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-400 font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* 2. CLINIC STORY & OVERVIEW */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
                Our Story & Philosophy
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A Modern Dental Practice Built on Trust, Precision & Compassion
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At DentCare, we believe a healthy smile is the foundation of lifelong confidence and wellbeing. Founded with a vision to eliminate dental anxiety, our clinic combines cutting-edge dental technology with a calming, patient-first atmosphere.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you visit us for a routine annual cleaning, complex orthodontic alignment, or full-mouth reconstructive implants, you will receive tailored care from experienced doctors who listen closely to your needs.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>State-of-the-art 3D imaging</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Personalized smile makeovers</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Affordable, transparent pricing</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Emergency dental assistance</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule a Consultation</span>
                </Link>
              </div>
            </div>

            {/* Right: Clinic Photo Grid */}
            <div className="lg:col-span-5">
              <div className="relative">
                <img
                  src={require("../Assets/img/about.jpg")}
                  alt="DentCare Facility"
                  className="rounded-3xl shadow-xl object-cover w-full h-[450px]"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Smile className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900">15,000+</div>
                    <div className="text-xs text-slate-500">Smiles Restored</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Why Patients Choose Us
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Setting the Standard for Modern Dentistry
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every aspect of our practice is designed around your comfort, safety, and long-term oral health.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${pil.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pil.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed flex-1">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OPENING HOURS & EMERGENCY CALLOUT */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-sky-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Clinic Availability</span>
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Flexible Hours Designed Around Your Busy Schedule
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We offer extended early morning and evening appointment hours so you never have to compromise your workday for quality dental care.
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <a
                    href="tel:+916351737448"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-sky-600" />
                    <span>Call +91 6351737448</span>
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                  >
                    <span>View Location & Maps</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-3">
                <h4 className="text-base font-bold text-white mb-4">Working Schedule</h4>
                <div className="flex justify-between text-sm py-2 border-b border-white/10 text-slate-200">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-sky-300">8:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-white/10 text-slate-200">
                  <span>Saturday</span>
                  <span className="font-semibold text-sky-300">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between text-sm py-2 text-slate-200">
                  <span>Sunday</span>
                  <span className="font-semibold text-sky-300">8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
