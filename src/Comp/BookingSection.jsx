import { useState } from "react";
import { SERVICES, INITIAL_FORM, API_BASE_URL } from "../Pages";
import { isValidEmail } from "../Pages/Helpers";
import Spinner from "./Spinner";

export default function BookingForm({ showToast }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const setField = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const isFormValid =
    form.name.trim() && form.email.trim() && form.phone.trim() && form.service;

  const handleOrder = async () => {
    if (!isFormValid) {
      showToast("Please fill in Name, Email, Phone, and Service Type.", "error");
      return;
    }
    if (!isValidEmail(form.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          phone:   form.phone.trim(),
          address: form.address.trim(),
          service: form.service,
          date:    form.date,
          notes:   form.notes.trim(),
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an unexpected response. Please try again.");
      }

      if (response.ok) {
        setSubmitted(true);
        showToast("Booking confirmed! We'll call you shortly.", "success");
      } else {
        const errMsg =
          typeof data?.detail === "string"
            ? data.detail
            : Array.isArray(data?.detail)
            ? data.detail.map(e => e.msg).join(", ")
            : data?.message || data?.error || "Booking failed. Please try again.";
        showToast(errMsg, "error");
      }
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        showToast(
          "Cannot reach server. Check if your backend is running on " + API_BASE_URL,
          "error"
        );
      } else {
        showToast(err.message || "Something went wrong. Please try again.", "error");
      }
      console.error("[FreshFold] Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-blue-100">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="font-display text-4xl font-bold text-gray-900">Schedule a Pickup</h2>
          <p className="mt-3 text-gray-500">Fill in your details and we'll reach out to confirm your slot.</p>
        </div>

        {submitted ? (
          <SuccessCard form={form} resetForm={resetForm} />
        ) : (
          <BookingForm
            form={form}
            setField={setField}
            loading={loading}
            isFormValid={isFormValid}
            handleOrder={handleOrder}
          />
        )}
      </div>
    </section>
  );
}

// ── Success state ──
function SuccessCard({ form, resetForm }) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-3xl p-12 text-center fade-up">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
      <p className="text-gray-500">
        We've received your request. Our team will call you within 30 minutes to confirm your pickup slot.
      </p>
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="text-sm text-gray-400 bg-white rounded-xl px-4 py-3 inline-block">
          📞 Expect a call on <span className="font-semibold text-gray-700">{form.phone}</span>
        </div>
        <div className="text-sm text-gray-400 bg-white rounded-xl px-4 py-3 inline-block">
          ✉️ Confirmation sent to <span className="font-semibold text-gray-700">{form.email}</span>
        </div>
      </div>
      <button
        onClick={resetForm}
        className="mt-6 block mx-auto bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-600 transition-colors cursor-pointer"
      >
        Book Another
      </button>
    </div>
  );
}

// ── The actual form ──
function BookingSection({ form, setField, loading, isFormValid, handleOrder }) {
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none bg-white text-sm transition-all disabled:opacity-50";

  return (
    <div className="bg-gray-100 rounded-3xl p-8 border border-gray-100">
      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Rahul Sharma"
            value={form.name}
            onChange={e => setField("name", e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="rahul@example.com"
            value={form.email}
            onChange={e => setField("email", e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Phone */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={e => setField("phone", e.target.value)}
          disabled={loading}
          className={inputClass}
        />
      </div>

      {/* Row 3: Address */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address</label>
        <input
          type="text"
          placeholder="Sector 17, Chandigarh"
          value={form.address}
          onChange={e => setField("address", e.target.value)}
          disabled={loading}
          className={inputClass}
        />
      </div>

      {/* Row 4: Service + Date */}
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Service Type <span className="text-red-400">*</span>
          </label>
          <select
            value={form.service}
            onChange={e => setField("service", e.target.value)}
            disabled={loading}
            className={inputClass}
          >
            <option value="">Select service...</option>
            {SERVICES.map(s => (
              <option key={s.title} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={e => setField("date", e.target.value)}
            disabled={loading}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 5: Notes */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Instructions</label>
        <textarea
          rows={3}
          placeholder="Any specific requirements, stains, or allergies..."
          value={form.notes}
          onChange={e => setField("notes", e.target.value)}
          disabled={loading}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleOrder}
        disabled={!isFormValid || loading}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-sky-200 hover:-translate-y-0.5 text-sm cursor-pointer"
      >
        {loading ? (
          <><Spinner /> Processing your booking...</>
        ) : !isFormValid ? (
          "Fill required fields to continue"
        ) : (
          "Schedule Free Pickup →"
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        <span className="text-red-400">*</span> Required fields &nbsp;·&nbsp; Free pickup · No prepayment · Cancel anytime
      </p>
    </div>
  );
}