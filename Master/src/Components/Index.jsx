import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Phone,
  Award,
  Sparkles,
  Heart,
  ChevronRight,
  CheckCircle2,
  Stethoscope,
  Smile,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [specialist, setSpecialist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate("/appointment");
  };

  const services = [
    {
      title: "Cosmetic Dentistry",
      desc: "Transform your smile with porcelain veneers, cosmetic bonding, and smile contouring.",
      image: require("../Assets/img/service-1.jpg"),
      tag: "Aesthetics",
    },
    {
      title: "Dental Implants",
      desc: "Permanent, natural-looking tooth replacements with state-of-the-art titanium roots.",
      image: require("../Assets/img/service-2.jpg"),
      tag: "Restorative",
    },
    {
      title: "Dental Bridges",
      desc: "Restore your bite function and natural facial structure with precision dental bridges.",
      image: require("../Assets/img/service-3.jpg"),
      tag: "Prosthetics",
    },
    {
      title: "Teeth Whitening",
      desc: "Professional in-office laser whitening for a brighter smile up to 8 shades lighter.",
      image: require("../Assets/img/service-4.jpg"),
      tag: "Whitening",
    },
  ];

  const stats = [
    { label: "Happy Smiles", value: "15,000+", icon: Smile },
    { label: "Expert Dentists", value: "10+", icon: Stethoscope },
    { label: "Satisfaction Rate", value: "99.8%", icon: Heart },
    { label: "Emergency Support", value: "24/7", icon: Phone },
  ];

  const testimonials = [
    {
      name: "Sneha Patel",
      role: "Patient",
      comment:
        "The treatment was completely pain-free and the staff made me feel so comfortable. My teeth whitening results were unbelievable!",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Patient",
      comment:
        "Got my dental implants here. The precision, cleanliness, and professionalism of Dr. Nirav and the team are truly world-class.",
      rating: 5,
    },
    {
      name: "Pooja Sharma",
      role: "Patient",
      comment:
        "Booking an appointment online was seamless and instant. Highly recommend DentCare for entire family dental checkups.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white py-16 lg:py-24">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100/60 px-3.5 py-1 text-xs font-semibold text-sky-800">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Premier Dental Care & Oral Surgery</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                Exceptional Care for{" "}
                <span className="bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent">
                  Confident, Radiant
                </span>{" "}
                Smiles
              </h1>

              <p className="max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
                Experience gentle, pain-free dental treatments with state-of-the-art 3D technology, certified specialists, and a warm, personalized touch for your entire family.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/appointment"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-600/30 transition-all hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/40 hover:-translate-y-0.5"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book an Appointment</span>
                </Link>
                <Link
                  to="/service"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
                >
                  <span>Explore Treatments</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>

              {/* Trust Highlight list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>100% Pain-Free Care</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Certified Specialists</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Modern 3D Equipment</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-sky-900/10 border-4 border-white">
                  <img
                    src={require("../Assets/img/about.jpg")}
                    alt="Dental Care Clinic"
                    className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Trust Badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">Award Winning Clinic</p>
                          <p className="text-[11px] text-slate-500">Excellence in Dentistry 2026</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400 text-xs">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. QUICK SEARCH & BOOKING WIDGET */}
          <div className="relative -mb-8 mt-12 lg:mt-16">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quick Appointment Booking</h3>
                  <p className="text-xs text-slate-500">Find the right specialist doctor & reserve your preferred slot</p>
                </div>
                <span className="hidden rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 sm:inline-block">
                  Instant Confirmation
                </span>
              </div>

              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Specialty */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Dental Specialty
                  </label>
                  <select
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="">All Specialties</option>
                    <option value="General Dentist">General Dentist</option>
                    <option value="Orthodontist">Orthodontist (Braces)</option>
                    <option value="Prosthodontist">Prosthodontist (Implants)</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="">Any Time</option>
                    <option value="Morning">Morning (8 AM - 12 PM)</option>
                    <option value="AfterNoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening">Evening (4 PM - 9 PM)</option>
                  </select>
                </div>

                {/* Submit CTA */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition-all hover:from-sky-500 hover:to-sky-600 hover:shadow-lg hover:shadow-sky-600/30"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Find & Book Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRIC STATS BANNER */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="py-20 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              Our Dental Services
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Complete Dental Care For Every Need
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From routine cleaning and whitening to advanced surgical implants, we provide comprehensive oral healthcare under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 backdrop-blur-sm shadow-sm">
                    {srv.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed flex-1">
                    {srv.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/appointment"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
                    >
                      <span>Book Treatment</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/service"
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <span>View All Treatments & Pricing</span>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BEFORE & AFTER TRANSFORMATION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                Proven Results
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Real Patient Smile Transformations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                See the difference precision dentistry makes. Using customized aesthetic alignment, porcelain veneers, and whitening treatments, we deliver natural, confident smiles.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Customized Treatment Plan</h4>
                    <p className="text-xs text-slate-500">Designed specifically for your jaw structure & dental symmetry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">High-Durability Materials</h4>
                    <p className="text-xs text-slate-500">Long-lasting natural aesthetics backed by guarantee.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Start Your Smile Journey</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <div className="bg-slate-900/80 px-3 py-1.5 text-center text-xs font-semibold text-white">
                  Before Treatment
                </div>
                <img
                  src={require("../Assets/img/before.jpg")}
                  alt="Before Dental Procedure"
                  className="h-64 w-full object-cover"
                />
              </div>

              <div className="overflow-hidden rounded-2xl border border-teal-300 shadow-md">
                <div className="bg-teal-600 px-3 py-1.5 text-center text-xs font-semibold text-white">
                  After Treatment
                </div>
                <img
                  src={require("../Assets/img/after.jpg")}
                  alt="After Dental Procedure"
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Patients Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Discover why over 15,000 patients trust DentCare for their smile transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(test.rating)}
                  </div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{test.name}</h4>
                    <p className="text-xs text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA CALLOUT BANNER */}
      <section className="bg-gradient-to-r from-sky-600 to-teal-600 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Experience Healthy, Radiant Smiles?
          </h2>
          <p className="max-w-2xl mx-auto text-sky-100 text-sm sm:text-base">
            Book your consultation with one of our certified dental specialists online in just 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/appointment"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-sky-700 shadow-lg hover:bg-sky-50 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment Now</span>
            </Link>
            <a
              href="tel:+919887456321"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91 98874 56321</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
