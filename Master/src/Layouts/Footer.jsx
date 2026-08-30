import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Heart,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 antialiased">
      {/* Top Pre-Footer / Highlights Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Modern Equipment</h4>
                <p className="text-xs text-slate-400">Digital 3D X-Rays & Laser Tech</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Certified Dentists</h4>
                <p className="text-xs text-slate-400">Specialists with 10+ Years Exp.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Pain-Free Dentistry</h4>
                <p className="text-xs text-slate-400">Gentle & comfortable care</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Emergency Support</h4>
                <p className="text-xs text-slate-400">Fast response & walk-ins</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1 & 2: Clinic Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/20">
                <span className="text-2xl">🦷</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Dent<span className="text-sky-400">Care</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 pr-6">
              DentCare is committed to providing world-class dental care with compassion, state-of-the-art technology, and tailored treatments designed for radiant, healthy smiles that last a lifetime.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Accepting New Patients
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                  About Our Clinic
                </Link>
              </li>
              <li>
                <Link to="/team" className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                  Our Certified Dentists
                </Link>
              </li>
              <li>
                <Link to="/service" className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Treatments
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-1.5 text-slate-400">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                Cosmetic Dentistry
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                Dental Implants
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                Teeth Whitening
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                Orthodontics & Braces
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                Root Canal Therapy
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
              Clinic Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" />
                <span>123 Medical Center, Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-sky-400" />
                <a href="tel:+916351737448" className="hover:text-white transition-colors">+91 6351737448</a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-sky-400" />
                <span>info@dentcare.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Clock className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" />
                <span>Mon - Sat: 8 AM - 9 PM<br />Sun: 8 AM - 5 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Developer Banner Section */}
      <div className="border-t border-slate-900 bg-slate-900/80 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Built by <strong className="font-semibold text-white">Jashabirsinh Bhatiya</strong></span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+916351737448"
              className="flex items-center gap-1.5 text-slate-300 hover:text-sky-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-sky-400" />
              <span>+91 6351737448</span>
            </a>

            <a
              href="https://github.com/luc-j156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-sky-400 transition-colors"
              title="LinkedIn Profile"
            >
              <svg className="h-4 w-4 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} DentCare Dental Clinic. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/about" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/service" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
