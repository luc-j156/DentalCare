import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  Calendar, Clock, User, Phone, Mail, FileText,
  Printer, Download, CheckCircle2, XCircle, AlertCircle,
  Filter, Search, TrendingUp, CreditCard, Stethoscope,
  Users, ChevronRight, RefreshCw, Loader2, Receipt,
  BriefcaseMedical, IndianRupee, Star
} from "lucide-react";

import toast from "react-hot-toast";

/* ─── Helpers ──────────────────────────────────────────── */
const role = () => localStorage.getItem("admin"); // "0"=patient, "1"=admin, "2"=doctor

const StatusBadge = ({ status }) => {
  const map = {
    Success:   { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2,  label: "Paid" },
    Pending:   { color: "bg-amber-100 text-amber-700 border-amber-200",       icon: AlertCircle,  label: "Pending" },
    Failed:    { color: "bg-red-100 text-red-700 border-red-200",             icon: XCircle,      label: "Failed" },
    null:      { color: "bg-gray-100 text-gray-600 border-gray-200",          icon: AlertCircle,  label: "Unpaid" },
    undefined: { color: "bg-gray-100 text-gray-600 border-gray-200",          icon: AlertCircle,  label: "Unpaid" },
  };
  const cfg = map[status] || map["Pending"];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.color}`}>
      <Icon className="w-3 h-3" />{cfg.label}
    </span>
  );
};

const TimeSlotBadge = ({ slot }) => {
  const map = {
    Morning:   "bg-amber-50 text-amber-700 border-amber-200",
    AfterNoon: "bg-sky-50 text-sky-700 border-sky-100",
    Evening:   "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${map[slot] || "bg-gray-100 text-gray-600"}`}>
      <Clock className="w-3 h-3" />{slot}
    </span>
  );
};

const daysDiff = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const appt = new Date(dateStr);
  appt.setHours(0, 0, 0, 0);
  return Math.ceil((appt - today) / (1000 * 60 * 60 * 24));
};

/* ─── Receipt Modal ──────────────────────────────────────── */
const ReceiptModal = ({ item, onClose }) => {
  const printRef = useRef();
  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Appointment Receipt</title>
      <style>body{font-family:sans-serif;padding:30px;max-width:600px;margin:0 auto}
      h2{color:#1e40af}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9}
      .label{color:#64748b;font-size:13px}.value{font-weight:600;font-size:13px}
      .badge{background:#dcfce7;color:#166534;padding:4px 10px;border-radius:20px;font-size:12px}
      </style></head><body>${content}</body></html>`);
    win.document.close();
    win.print();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
        <div ref={printRef}>
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Appointment Receipt</h2>
            <p className="text-xs text-gray-400 mt-1">SmileCare Dental Clinic</p>
          </div>
          <div className="space-y-3 bg-gray-50 rounded-2xl p-5 mb-6">
            {[
              { label: "Patient Name",   value: item.Name },
              { label: "Doctor",         value: item.FirstName ? `Dr. ${item.FirstName}` : "—" },
              { label: "Specialty",      value: item.Specialist || "—" },
              { label: "Date",           value: item.date ? new Date(item.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—" },
              { label: "Time Slot",      value: item.time },
              { label: "Token No.",      value: `#${item.token || "—"}` },
              { label: "Payment ID",     value: item.razorpay_payment_id || "—" },
              { label: "Payment Status", value: item.payment_status || "Pending" },
              { label: "Amount Paid",    value: item.payment_status === "Success" ? "₹200" : "₹0" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start">
                <span className="text-xs text-gray-500 font-medium w-32 flex-shrink-0">{label}</span>
                <span className="text-xs font-semibold text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>
          {item.payment_status === "Success" && (
            <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-emerald-700 font-semibold">Payment confirmed via Razorpay</span>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── KPI Card (Admin) ───────────────────────────────────── */
const KpiCard = ({ label, value, sub, icon: Icon, color, gradient }) => (
  <div className={`rounded-2xl p-5 ${gradient} text-white shadow-lg`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <TrendingUp className="w-4 h-4 text-white/60" />
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-sm font-semibold text-white/90 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-white/70 mt-1">{sub}</p>}
  </div>
);

/* ─── Admin View ─────────────────────────────────────────── */
const AdminView = ({ appointments, filterDate, setFilterDate, filterTime, setFilterTime, onFilter, loading }) => {
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const todayAppts = appointments.filter(a => {
    const d = a.date ? new Date(a.date).toISOString().split("T")[0] : "";
    return d === today;
  });
  const paidCount = appointments.filter(a => a.payment_status === "Success").length;
  const revenue = paidCount * 200;

  const filtered = appointments.filter(a =>
    !search ||
    a.Name?.toLowerCase().includes(search.toLowerCase()) ||
    a.FirstName?.toLowerCase().includes(search.toLowerCase()) ||
    a.Email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Appointments Today"  value={todayAppts.length}       sub="vs. all time"            icon={Calendar}         gradient="bg-gradient-to-br from-blue-500 to-blue-700" />
        <KpiCard label="Total Revenue"       value={`₹${revenue.toLocaleString("en-IN")}`} sub={`${paidCount} paid`} icon={IndianRupee}      gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <KpiCard label="Total Appointments"  value={appointments.length}     sub="all time"                icon={BriefcaseMedical} gradient="bg-gradient-to-br from-violet-500 to-purple-700" />
        <KpiCard label="Paid Appointments"   value={paidCount}               sub="payment confirmed"       icon={CreditCard}       gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Patient, doctor name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date</label>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Time Slot</label>
            <select value={filterTime} onChange={e => setFilterTime(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500">
              <option value="">All Slots</option>
              <option value="Morning">Morning</option>
              <option value="AfterNoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <button onClick={onFilter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> All Appointments
            <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold">{filtered.length}</span>
          </h3>
          <button onClick={onFilter} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 font-medium">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
            <span className="text-sm text-gray-500">Loading appointments…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Calendar className="w-10 h-10 text-gray-200 mb-3" />
            <p className="font-semibold text-gray-500">No appointments found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">#</th>
                  <th className="px-5 py-3 text-left">Patient</th>
                  <th className="px-5 py-3 text-left">Doctor</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Slot</th>
                  <th className="px-5 py-3 text-left">Token</th>
                  <th className="px-5 py-3 text-left">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3.5 text-gray-400 text-xs font-mono">{i + 1}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-800">{item.Name}</p>
                      <p className="text-xs text-gray-400">{item.CustomerNumber}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-700">{item.FirstName ? `Dr. ${item.FirstName}` : "—"}</p>
                      <p className="text-xs text-gray-400">{item.Specialist || "General"}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 text-xs whitespace-nowrap">
                      {item.date ? new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-3.5"><TimeSlotBadge slot={item.time} /></td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">#{item.token || "—"}</span>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={item.payment_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Doctor View ────────────────────────────────────────── */
const DoctorView = ({ appointments, loading }) => {
  const today = new Date().toISOString().split("T")[0];
  const todayQueue = appointments.filter(a => {
    const d = a.date ? new Date(a.date).toISOString().split("T")[0] : "";
    return d === today;
  });
  const upcoming = appointments.filter(a => {
    const d = a.date ? new Date(a.date).toISOString().split("T")[0] : "";
    return d > today;
  });

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{todayQueue.length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Today's Patients</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{upcoming.length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Upcoming</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{appointments.filter(a => a.payment_status === "Success").length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Completed</p>
        </div>
      </div>

      {/* Today's Queue */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            Today's Patient Queue
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold ml-1">{todayQueue.length}</span>
          </h3>
          <span className="text-xs text-gray-400">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long" })}</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" /><span className="text-sm text-gray-500">Loading…</span></div>
        ) : todayQueue.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Calendar className="w-10 h-10 text-gray-200 mb-3" />
            <p className="font-semibold text-gray-500">No patients scheduled today</p>
            <p className="text-xs text-gray-400 mt-1">Enjoy your free day! 🎉</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {todayQueue.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/30 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {item.Name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{item.Name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    {item.CustomerNumber && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />{item.CustomerNumber}
                      </span>
                    )}
                    {item.Email && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />{item.Email}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1 italic truncate">"{item.description}"</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <TimeSlotBadge slot={item.time} />
                  <p className="text-xs text-gray-400 mt-1">Token #{item.token || i + 1}</p>
                </div>
                <StatusBadge status={item.payment_status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming appointments */}
      {upcoming.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-500" /> Upcoming Appointments
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {upcoming.slice(0, 5).map((item, i) => {
              const diff = daysDiff(item.date);
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm flex-shrink-0">
                    {item.Name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{item.Name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.date ? new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—"} · <TimeSlotBadge slot={item.time} />
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diff <= 2 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff} days`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Patient View ───────────────────────────────────────── */
const PatientView = ({ appointments, loading }) => {
  const [receipt, setReceipt] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments.filter(a => {
    const d = a.date ? new Date(a.date).toISOString().split("T")[0] : "";
    return d >= today;
  });
  const history = appointments.filter(a => {
    const d = a.date ? new Date(a.date).toISOString().split("T")[0] : "";
    return d < today;
  });

  return (
    <div className="space-y-6">
      {receipt && <ReceiptModal item={receipt} onClose={() => setReceipt(null)} />}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{upcoming.length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Upcoming</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{appointments.filter(a => a.payment_status === "Success").length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Paid Visits</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-3xl font-bold">{appointments.length}</p>
          <p className="text-sm font-semibold text-white/90 mt-1">Total Visits</p>
        </div>
      </div>

      {/* CTA */}
      <Link to="/appointment"
        className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all group">
        <div>
          <p className="font-bold text-lg">Book a New Appointment</p>
          <p className="text-blue-100 text-sm mt-0.5">Choose your specialist, date & time slot</p>
        </div>
        <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" /> Upcoming Appointments
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-semibold ml-1">{upcoming.length}</span>
          </h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>
        ) : upcoming.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Calendar className="w-10 h-10 text-gray-200 mb-3" />
            <p className="font-semibold text-gray-500">No upcoming appointments</p>
            <Link to="/appointment" className="mt-3 text-xs text-blue-600 font-semibold hover:underline">Book one now →</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcoming.map((item, i) => {
              const diff = daysDiff(item.date);
              return (
                <div key={i} className="flex items-center gap-4 px-6 py-5 hover:bg-blue-50/20 transition-colors">
                  {/* Countdown */}
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 ${diff === 0 ? "bg-red-100" : diff <= 2 ? "bg-amber-100" : "bg-blue-100"}`}>
                    <span className={`text-lg font-extrabold leading-none ${diff === 0 ? "text-red-600" : diff <= 2 ? "text-amber-600" : "text-blue-600"}`}>
                      {diff === 0 ? "📅" : diff}
                    </span>
                    <span className={`text-[10px] font-bold ${diff === 0 ? "text-red-500" : diff <= 2 ? "text-amber-500" : "text-blue-500"}`}>
                      {diff === 0 ? "today" : "days"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-800 text-sm">{item.FirstName ? `Dr. ${item.FirstName}` : "Doctor TBD"}</p>
                      {item.Specialist && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{item.Specialist}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.date ? new Date(item.date).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) : "—"}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <TimeSlotBadge slot={item.time} />
                      <span className="text-xs text-gray-400">Token #{item.token || "—"}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 space-y-2">
                    <StatusBadge status={item.payment_status} />
                    <button
                      onClick={() => setReceipt(item)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors ml-auto"
                    >
                      <Receipt className="w-3.5 h-3.5" /> Receipt
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Appointment History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" /> Appointment History
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold ml-1">{history.length}</span>
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {history.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-700 text-sm">{item.FirstName ? `Dr. ${item.FirstName}` : "—"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.date ? new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"} · {item.time}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 space-y-1.5">
                  <StatusBadge status={item.payment_status} />
                  <button
                    onClick={() => setReceipt(item)}
                    className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors ml-auto"
                  >
                    <Printer className="w-3 h-3" /> Print
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const ResentAppointment = () => {
  const [appointMentList, setAppointMentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTime, setFilterTime] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const userRole = role();

  const getDoctorFromList = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", localStorage.getItem("id"));
    formData.append("admin", localStorage.getItem("admin"));
    try {
      const response = await axios.post("http://localhost:5000/recent/appointment", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success === true) {
        setAppointMentList(response.data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!filterDate && !filterTime) {
      getDoctorFromList();
      return;
    }
    setLoading(true);
    setAppointMentList([]);
    const formData = new FormData();
    formData.append("time", filterTime);
    formData.append("date", filterDate);
    try {
      const response = await axios.post("http://localhost:5000/getappointment", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success === true) {
        setAppointMentList(response.data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getDoctorFromList(); }, []);

  const pageTitle =
    userRole === "1" ? "Admin Dashboard" :
    userRole === "2" ? "Doctor Dashboard" :
    "My Appointments";

  return (
    <DashboardLayout pageTitle={pageTitle}>
      {userRole === "1" && (
        <AdminView
          appointments={appointMentList}
          filterDate={filterDate} setFilterDate={setFilterDate}
          filterTime={filterTime} setFilterTime={setFilterTime}
          onFilter={handleFilter}
          loading={loading}
        />
      )}
      {userRole === "2" && (
        <DoctorView appointments={appointMentList} loading={loading} />
      )}
      {(userRole === "0" || !userRole) && (
        <PatientView appointments={appointMentList} loading={loading} />
      )}
    </DashboardLayout>
  );
};

export default ResentAppointment;
