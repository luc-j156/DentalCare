import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { contactService } from "../api";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const contactData = {
        Name: name,
        Email: email,
        Number: phone,
        Subject: subject,
        Message: message,
      };

      const res = await contactService.submitContact(contactData);
      if (res.success) {
        toast.success("Message sent! Our team will get back to you within 24 hours.");
        setName("");
        setSubject("");
        setMessage("");
        setEmail("");
        setPhone("");
      } else {
        toast.error(res.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    {
      title: "Clinic Location",
      desc: "123 Medical Center, Ahmedabad, Gujarat, India",
      icon: MapPin,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      title: "Direct Helpline",
      desc: "+91 6351737448",
      sub: "Mon - Sat (8 AM - 9 PM)",
      icon: Phone,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Email Support",
      desc: "info@dentcare.com",
      sub: "Quick 24/7 online response",
      icon: Mail,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Operating Hours",
      desc: "Mon - Sat: 8:00 AM - 9:00 PM",
      sub: "Sunday: 8:00 AM - 5:00 PM",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="bg-white text-slate-800 antialiased">
      {/* 1. HERO HEADER */}
      <div className="relative bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>We are here to help</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contact Our Clinic
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base">
            Have questions about a treatment or need help booking? Reach out to our friendly dental support staff.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-400 font-medium">Contact</span>
          </div>
        </div>
      </div>

      {/* 2. CONTACT INFO CARDS */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-sky-700">{card.desc}</p>
                  {card.sub && <p className="mt-1 text-xs text-slate-500">{card.sub}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & EMBEDDED MAP */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-100">
              <div className="mb-6 space-y-2">
                <span className="inline-block rounded-full bg-sky-100 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-sky-800">
                  Send a Message
                </span>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  How Can We Assist You?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fill in the details below and we will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Subject / Concern *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Teeth Whitening Inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, symptoms, or preferred consultation timing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/30 hover:bg-sky-700 transition-all disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            </div>

            {/* Right: Map & Emergency Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-md h-[340px] bg-slate-100">
                <iframe
                  title="DentCare Location Map"
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ahmedabad%2C%20Gujarat%2C%20India+(DentCare%20Dental)&amp;t=p&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Walk-In Emergencies Accepted</h4>
                    <p className="text-xs text-slate-400">Toothaches, broken teeth & acute dental trauma</p>
                  </div>
                </div>
              </div>

              {/* Developer Contact Card */}
              <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-teal-50 to-white p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-sky-600" /> Web Application Developer
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Jashabirsinh Bhatiya</h4>
                  <p className="text-xs text-slate-500">Frontend Developer & UI/UX Designer</p>
                </div>
                <div className="pt-2 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <a href="tel:+916351737448" className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-sky-600 transition-colors">
                    <Phone className="h-3.5 w-3.5 text-sky-600" />
                    <span>+91 6351737448</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/luc-j156" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900 transition-colors" title="GitHub Profile">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700 transition-colors" title="LinkedIn Profile">
                      <svg className="h-4 w-4 fill-current text-sky-600" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
