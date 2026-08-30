import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const Service = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const services = [
    // {
    //   title: "Cosmetic Dentistry",
    //   category: "Aesthetics",
    //   desc: "Comprehensive smile redesign with porcelain veneers, direct composite bonding, and aesthetic contouring.",
    //   image: require("../Assets/img/service-1.jpg"),
    //   features: ["Custom shade matching", "Minimal prep veneers", "Same-day bonding available"],
    //   price: "From ₹2,500",
    // },
    {
      title: "Dental Implants",
      category: "Restorative",
      desc: "Permanent titanium implants that replace missing teeth with natural-looking crowns and full bite strength.",
      image: require("../Assets/img/service-2.jpg"),
      features: ["Lifetime durability", "Preserves jawbone health", "Titanium & Zirconia options"],
      price: "From ₹18,000",
    },
    {
      title: "Dental Bridges & Crowns",
      category: "Prosthetics",
      desc: "High-grade ceramic bridges that close gaps between missing teeth, restoring chewing function and smile symmetry.",
      image: require("../Assets/img/service-3.jpg"),
      features: ["Metal-free ceramics", "Custom milled fit", "Natural translucency"],
      price: "From ₹4,500",
    },
    {
      title: "Professional Teeth Whitening",
      category: "Whitening",
      desc: "Fast, in-office laser whitening treatment capable of lifting stains up to 8 shades in a single 45-minute session.",
      image: require("../Assets/img/service-4.jpg"),
      features: ["Safe for enamel", "Zero long-term sensitivity", "Custom take-home trays"],
      price: "From ₹3,000",
    },
  ];

  const pricingTiers = [
    {
      name: "Essential Checkup",
      price: "₹500",
      desc: "Ideal for routine preventive care and early issue detection.",
      features: [
        "Comprehensive Oral Examination",
        "Digital Low-Radiation X-Ray",
        "Basic Ultrasonic Scaling & Polish",
        "Personalized Treatment Plan",
      ],
      popular: false,
    },
    {
      name: "Complete Smile Care",
      price: "₹2,500",
      desc: "Our most popular comprehensive cleaning & cosmetic refresh.",
      features: [
        "Full Oral Health & Gum Screening",
        "Deep Tartar & Plaque Removal",
        "Fluoride Strengthening Treatment",
        "Express Teeth Polishing & Whitening",
        "Free 30-Day Follow-Up Review",
      ],
      popular: true,
    },
    {
      name: "Advanced Restorative",
      price: "Custom",
      desc: "Tailored for orthodontic braces, crowns, and implants.",
      features: [
        "3D Digital CBCT Scan & Planning",
        "Specialist Consultation (Orthodontist/Surgeon)",
        "Customized Ceramic Materials",
        "Flexible EMI Payment Options",
        "Comprehensive Warranty Coverage",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Are dental treatments at DentCare painful?",
      a: "No. We specialize in gentle, pain-free dentistry using advanced local anesthetics, micro-precision lasers, and calming techniques so you remain completely comfortable throughout.",
    },
    {
      q: "How long do dental implants usually last?",
      a: "With standard oral hygiene (brushing, flossing, and biannual checkups), quality dental implants can last a lifetime, providing permanent bone support and chewing strength.",
    },
    {
      q: "Can I choose my preferred doctor when booking?",
      a: "Yes! Our online booking system lets you pick your preferred specialist doctor based on their specialty (General Dentist, Orthodontist, or Prosthodontist) and available schedule.",
    },
    {
      q: "What payment options and insurance do you accept?",
      a: "We accept online credit/debit cards, UPI, netbanking via Razorpay, as well as cash and major healthcare insurance reimbursement plans.",
    },
  ];

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Comprehensive Dental Treatments</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Treatments & Services
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
            From routine preventive checkups to transformative cosmetic restorations, our specialists deliver gold-standard care.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-400 font-medium">Services</span>
          </div>
        </div>
      </div>

      {/* 2. SERVICES GRID */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              Specialized Care
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              World-Class Dental Procedures
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Each treatment is performed by certified specialists using sterile, hospital-grade instrumentation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative sm:w-2/5 overflow-hidden bg-slate-100 min-h-[220px]">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                    {srv.category}
                  </span>
                </div>

                <div className="flex sm:w-3/5 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{srv.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                      {srv.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Fee</span>
                      <span className="text-sm font-bold text-sky-700">{srv.price}</span>
                    </div>
                    <Link
                      to="/appointment"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 transition-colors"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRANSPARENT PRICING PLANS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Clear & Honest Pricing
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Transparent Treatment Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              No hidden fees or unexpected charges. Consult with our specialists with complete financial clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all ${
                  tier.popular
                    ? "border-2 border-sky-500 bg-white shadow-xl shadow-sky-100"
                    : "border border-slate-200 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">{tier.desc}</p>
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  </div>
                  <div className="space-y-3 border-t border-slate-100 pt-6">
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/appointment"
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                      tier.popular
                        ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 hover:bg-sky-700"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>Choose Plan</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-800">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="h-4 w-4 text-sky-600" />
                      {faq.q}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-90 text-sky-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
