import React from "react";
import { Clock, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const TopBar = () => {
  return (
    <div className="hidden border-b border-slate-100 bg-slate-50/80 text-xs text-slate-600 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Left: Opening Hours & Location */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-sky-600" />
            <span>
              <strong className="font-semibold text-slate-700">Mon - Sat:</strong> 8:00 AM - 9:00 PM | Sun: 8:00 AM - 5:00 PM
            </span>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-sky-600" />
            <span>123 Medical Center, Ahmedabad, Gujarat, India</span>
          </div>
        </div>

        {/* Right: Contact & Emergency */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:info@dentcare.com"
            className="flex items-center gap-1.5 transition-colors hover:text-sky-600"
          >
            <Mail className="h-3.5 w-3.5 text-sky-600" />
            <span>info@dentcare.com</span>
          </a>
          <div className="h-3 w-px bg-slate-200" />
          <a
            href="tel:+916351737448"
            className="flex items-center gap-1.5 font-medium text-slate-800 transition-colors hover:text-sky-600"
          >
            <Phone className="h-3.5 w-3.5 text-sky-600" />
            <span>+91 6351737448</span>
          </a>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 border border-emerald-200/60">
            <Sparkles className="h-3 w-3" />
            24/7 Emergency
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
