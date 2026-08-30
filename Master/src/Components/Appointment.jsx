import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Stethoscope, UserCircle2, CalendarDays, CreditCard,
  ChevronRight, ChevronLeft, CheckCircle2, Loader2,
  Clock, Phone, Mail, FileText, AlertCircle,
  Smile, Braces, Hammer
} from "lucide-react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../api/axiosClient";

/* ─── Constants ─────────────────────────────────────────── */
const STEPS = [
  { id: 1, label: "Specialty",  icon: Stethoscope },
  { id: 2, label: "Doctor",     icon: UserCircle2  },
  { id: 3, label: "Date & Time",icon: CalendarDays },
  { id: 4, label: "Confirm",    icon: CreditCard   },
];

const SPECIALTIES = [
  {
    value: "General Dentist",
    label: "General Dentist",
    icon: Smile,
    desc: "Routine checkups, fillings, extractions, preventive care",
    color: "from-blue-500 to-blue-600",
    light: "bg-blue-50 border-blue-200 hover:border-blue-400",
    selected: "bg-blue-600 border-blue-600",
  },
  {
    value: "Orthodontist",
    label: "Orthodontist",
    icon: Braces,
    desc: "Braces, aligners, bite correction and teeth straightening",
    color: "from-teal-500 to-teal-600",
    light: "bg-teal-50 border-teal-200 hover:border-teal-400",
    selected: "bg-teal-600 border-teal-600",
  },
  {
    value: "Prosthodontist",
    label: "Prosthodontist",
    icon: Hammer,
    desc: "Crowns, bridges, implants, dentures and full mouth rehab",
    color: "from-violet-500 to-violet-600",
    light: "bg-violet-50 border-violet-200 hover:border-violet-400",
    selected: "bg-violet-600 border-violet-600",
  },
];

const TIME_SLOTS = [
  { value: "Morning",   label: "Morning",    hours: "9:00 AM – 12:00 PM", icon: "🌅" },
  { value: "AfterNoon", label: "Afternoon",  hours: "12:00 PM – 4:00 PM", icon: "☀️" },
  { value: "Evening",   label: "Evening",    hours: "4:00 PM – 7:00 PM",  icon: "🌆" },
];

/* ─── Progress Bar ───────────────────────────────────────── */
const ProgressIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-10">
    {STEPS.map((step, i) => {
      const Icon = step.icon;
      const done = currentStep > step.id;
      const active = currentStep === step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2
                ${done   ? "bg-teal-500 border-teal-500 text-white shadow-md"
                : active ? "bg-white border-blue-600 text-blue-600 shadow-lg ring-4 ring-blue-100"
                :          "bg-gray-100 border-gray-200 text-gray-400"
                }`}
            >
              {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>
            <span
              className={`mt-1.5 text-xs font-semibold hidden sm:block
                ${active ? "text-blue-700" : done ? "text-teal-600" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-500 ${done ? "bg-teal-400" : "bg-gray-200"}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ─── Step 1: Specialty ──────────────────────────────────── */
const StepSpecialty = ({ selected, onSelect }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Choose a Specialty</h2>
    <p className="text-gray-500 text-sm text-center mb-8">Select the type of dental care you need</p>
    <div className="grid gap-4">
      {SPECIALTIES.map((sp) => {
        const Icon = sp.icon;
        const isSelected = selected === sp.value;
        return (
          <button
            key={sp.value}
            type="button"
            onClick={() => onSelect(sp.value)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200
              ${isSelected
                ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-100"
                : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
              }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sp.color} flex items-center justify-center flex-shrink-0 shadow`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-base ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{sp.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{sp.desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
              ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
              {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

/* ─── Step 2: Doctor ─────────────────────────────────────── */
const StepDoctor = ({ doctors, selectedId, onSelect, loading }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Choose Your Doctor</h2>
    <p className="text-gray-500 text-sm text-center mb-8">All our dentists are board-certified specialists</p>
    {loading ? (
      <div className="flex flex-col items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
        <p className="text-sm text-gray-500">Loading available doctors…</p>
      </div>
    ) : doctors.length === 0 ? (
      <div className="flex flex-col items-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-amber-400 mb-3" />
        <p className="font-semibold text-gray-700">No doctors found</p>
        <p className="text-sm text-gray-500 mt-1">Please go back and try a different specialty</p>
      </div>
    ) : (
      <div className="grid gap-3">
        {doctors.map((doc) => {
          const isSelected = String(selectedId) === String(doc.id);
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelect(doc.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200
                ${isSelected
                  ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow">
                {doc.FirstName?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                  Dr. {doc.FirstName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {doc.Specialist || "Dental Specialist"} · License #{doc.id?.toString().padStart(4, "0")}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className="text-amber-400 text-xs">★</span>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">Available</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
    )}
  </div>
);

/* ─── Step 3: Date & Time ────────────────────────────────── */
const StepDateTime = ({ date, setDate, time, setTime }) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Pick a Date & Time</h2>
      <p className="text-gray-500 text-sm text-center mb-8">Choose your preferred appointment slot</p>

      {/* Date */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-500" />Appointment Date</span>
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
        />
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" />Preferred Time Slot</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = time === slot.value;
            return (
              <button
                key={slot.value}
                type="button"
                onClick={() => setTime(slot.value)}
                className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200
                  ${isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-100"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                  }`}
              >
                <span className="text-2xl mb-1">{slot.icon}</span>
                <span className={`font-semibold text-sm ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                  {slot.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{slot.hours}</span>
                {isSelected && (
                  <span className="mt-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Selected</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability notice */}
      <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          Appointment confirmation is subject to doctor availability. You'll receive an SMS & email confirmation within 30 minutes of booking.
        </p>
      </div>
    </div>
  );
};

/* ─── Step 4: Confirm & Pay ──────────────────────────────── */
const StepConfirm = ({
  specialty, doctor, date, time,
  Name, setName, Email, setEmail,
  CustomerNumber, setCustomerNumber, Description, setDescription,
  isSubmitting
}) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Confirm & Pay</h2>
    <p className="text-gray-500 text-sm text-center mb-6">Review your booking and complete payment</p>

    {/* Summary card */}
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100 p-5 mb-6">
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Booking Summary</p>
      <div className="space-y-2">
        {[
          { label: "Specialty", value: specialty },
          { label: "Doctor",    value: doctor ? `Dr. ${doctor.FirstName}` : "—" },
          { label: "Date",      value: date  ? new Date(date).toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" }) : "—" },
          { label: "Time Slot", value: time || "—" },
          { label: "Fee",       value: "₹200 (Consultation)" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <span className="text-xs text-gray-500 font-medium w-24 flex-shrink-0">{label}</span>
            <span className="text-xs font-semibold text-gray-800 text-right">{value}</span>
          </div>
        ))}
        <div className="pt-2 mt-2 border-t border-blue-200 flex items-center justify-between">
          <span className="text-sm font-bold text-blue-800">Total Payable</span>
          <span className="text-sm font-bold text-blue-800">₹200</span>
        </div>
      </div>
    </div>

    {/* Personal details form */}
    <div className="space-y-4">
      <p className="text-sm font-bold text-gray-700">Your Details</p>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          <span className="flex items-center gap-1.5"><UserCircle2 className="w-3.5 h-3.5" />Full Name *</span>
        </label>
        <input
          type="text"
          placeholder="Your full name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email *</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />Phone *</span>
          </label>
          <input
            type="tel"
            placeholder="10-digit mobile"
            value={CustomerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />Symptoms / Notes (optional)</span>
        </label>
        <textarea
          rows="3"
          placeholder="Describe your dental concern or any special requirements…"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
        />
      </div>
    </div>

    {/* Test UPI payment notice */}
    <div className="mt-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
      <div>
        <p className="text-xs font-bold text-emerald-800">
          Demo Test UPI Payment Enabled
        </p>
        <p className="text-xs text-emerald-700 mt-0.5">
          No real money will be deducted. When you click <strong>Pay ₹200 & Confirm Booking</strong>, a simulated instant Test UPI payment (QR / UPI ID) will execute, generating a test payment ID and marking your appointment as <strong>Paid (Success)</strong>.
        </p>
      </div>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Appointment = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Step 1
  const [Specialist, setSpecialist] = useState("");
  // Step 2
  const [DoctorList, setDoctorList] = useState([]);
  const [DoctorId, setDoctorId] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  // Step 3
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // Step 4 (personal details)
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [CustomerNumber, setCustomerNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDoctor = DoctorList.find((d) => String(d.id) === String(DoctorId));

  /* ── Fetch doctors when specialty changes ── */
  const fetchDoctors = async (specialty) => {
    setLoadingDoctors(true);
    setDoctorList([]);
    setDoctorId("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getDoctorFromSpecialist`,
        { Specialist: specialty },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success === true) {
        setDoctorList(response.data.result || []);
      }
    } catch (e) {
      console.error("Failed to fetch doctors", e);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleSpecialtySelect = (value) => {
    setSpecialist(value);
  };

  /* ── Navigation guards ── */
  const canAdvance = () => {
    if (step === 1) return !!Specialist;
    if (step === 2) return !!DoctorId;
    if (step === 3) return !!date && !!time;
    if (step === 4) return !!Name && !!Email && !!CustomerNumber;
    return false;
  };

  const goNext = () => {
    if (step === 1) {
      fetchDoctors(Specialist);
    }
    if (canAdvance()) setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => s - 1);

  /* ── Final Submit ── */
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!Name || !Email || !CustomerNumber) {
      toast.error("Please fill in all required contact details.");
      return;
    }
    setIsSubmitting(true);
    const appointmentData = {
      Specialist: Specialist,
      Name: Name,
      date: date,
      time: time,
      Email: Email,
      DoctorId: DoctorId,
      description: Description,
      CustomerNumber: CustomerNumber,
      user_id: localStorage.getItem("id") || "0",
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/add/appointment`, appointmentData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success === true) {
        toast.loading("Simulating Test UPI Payment (Scan & Pay Demo)...", { id: "payment-toast" });

        // Simulate successful test UPI QR scan & pay (no real money deducted)
        setTimeout(async () => {
          const fakePaymentId = "pay_test_upi_" + Math.random().toString(36).substring(2, 10);
          const payData = {
            razorpay_payment_id: fakePaymentId,
            payment_status: "Success",
            id: response.data.result.insertId,
          };

          try {
            await axios.post(`${API_BASE_URL}/update/appointmentStatus`, payData, {
              headers: { Accept: "auth", "Content-Type": "application/json" },
            });
            toast.success("Test UPI Payment Successful! Appointment booked.", { id: "payment-toast" });
            navigate("/resentappointment");
          } catch (err) {
            toast.error("Payment status update failed.", { id: "payment-toast" });
          } finally {
            setIsSubmitting(false);
          }
        }, 1500);

      } else {
        toast.error(response.data.message || "Selected slot is unavailable.");
        setIsSubmitting(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 flex flex-col">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Book an Appointment</h1>
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Book Appointment</span>
          </div>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Progress indicator */}
          <ProgressIndicator currentStep={step} />

          {/* Step Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {/* Step content */}
            <div className="min-h-[300px]">
              {step === 1 && (
                <StepSpecialty selected={Specialist} onSelect={handleSpecialtySelect} />
              )}
              {step === 2 && (
                <StepDoctor
                  doctors={DoctorList}
                  selectedId={DoctorId}
                  onSelect={setDoctorId}
                  loading={loadingDoctors}
                />
              )}
              {step === 3 && (
                <StepDateTime
                  date={date} setDate={setDate}
                  time={time} setTime={setTime}
                />
              )}
              {step === 4 && (
                <form id="confirm-form" onSubmit={HandleSubmit}>
                  <StepConfirm
                    specialty={Specialist}
                    doctor={selectedDoctor}
                    date={date}
                    time={time}
                    Name={Name} setName={setName}
                    Email={Email} setEmail={setEmail}
                    CustomerNumber={CustomerNumber} setCustomerNumber={setCustomerNumber}
                    Description={Description} setDescription={setDescription}
                    isSubmitting={isSubmitting}
                  />
                </form>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all
                  ${step === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex items-center gap-2">
                {STEPS.map((s) => (
                  <div
                    key={s.id}
                    className={`rounded-full transition-all duration-300 ${
                      s.id === step ? "w-6 h-2.5 bg-blue-600" : s.id < step ? "w-2.5 h-2.5 bg-teal-400" : "w-2.5 h-2.5 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canAdvance()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                    ${canAdvance()
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg active:scale-[0.99]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="confirm-form"
                  disabled={!canAdvance() || isSubmitting}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                    ${canAdvance() && !isSubmitting
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />Processing…</>
                  ) : (
                    <><CreditCard className="w-4 h-4" />Pay ₹200</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Help strip */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91-9876543210</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>24/7 Emergency Line</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Free cancellation 24h before</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
