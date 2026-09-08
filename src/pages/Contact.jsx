import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SEO from "../components/SEO";
import GridBackground from "../components/GridBackground";
import Map from "../components/Map";
import { company } from "../config/company";
import { services } from "../data/services";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  // Honeypot field — real users never see or fill this. If it has a value,
  // the request is treated as spam and silently discarded server-side.
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Enter your name.";
  if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.message.trim() || form.message.trim().length < 20)
    errors.message = "Tell us a bit more — at least 20 characters.";
  if (form.message.trim().length > 4000) errors.message = "Message is too long.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Jayanth Technologies to discuss your project, product idea or technology challenge."
        path="/contact"
      />

      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 overflow-hidden">
        <GridBackground />
        <div className="container-px relative max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl leading-[1.05] font-medium"
          >
            Let&apos;s build <span className="brand-gradient-text">something great.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink-400 max-w-xl leading-relaxed"
          >
            Have an idea, project or technology challenge? Tell us about it and we&apos;ll get back to you.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Form */}
          <div className="relative rounded-xl2 border border-white/[0.08] bg-base-900/60 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <CheckCircle2 size={40} className="text-violet-400" />
                  <h3 className="mt-5 text-xl font-medium text-ink-100">Message sent successfully.</h3>
                  <p className="mt-2 text-ink-400">We&apos;ll get back to you soon.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-violet-300 hover:text-violet-200 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                    <Field label="Company" name="company" value={form.company} onChange={handleChange} />
                  </div>

                  <div>
                    <label htmlFor="service" className="text-sm text-ink-300">
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-lg border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-sm text-ink-200 outline-none focus:border-violet-400/50 transition-colors"
                    >
                      <option value="">Select a service (optional)</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm text-ink-300">
                      Message <span className="text-ink-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or challenge..."
                      className={`mt-2 w-full resize-none rounded-lg border bg-white/[0.02] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-colors ${
                        errors.message ? "border-red-400/50" : "border-white/[0.1] focus:border-violet-400/50"
                      }`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-400/25 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>Something went wrong. Please try again or contact us directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-[15px] font-medium text-white shadow-glow transition-all duration-200 ease-premium hover:brightness-110 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact details + map */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl2 border border-white/[0.08] bg-white/[0.02] p-7">
              <h3 className="text-lg font-medium text-ink-100">{company.legalName}</h3>
              <p className="mt-1 text-sm text-ink-400">
                {company.location.city}, {company.location.state}, {company.location.country}
              </p>

              <div className="mt-6 flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-3 text-ink-300">
                  <Mail size={16} className="text-violet-400" />
                  {company.contact.email}
                </div>
                <div className="flex items-center gap-3 text-ink-300">
                  <Phone size={16} className="text-violet-400" />
                  {company.contact.phone}
                </div>
                <div className="flex items-center gap-3 text-ink-300">
                  <MapPin size={16} className="text-violet-400" />
                  {company.location.addressLine}
                </div>
              </div>
            </div>

            <Map />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", value, onChange, error, required }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm text-ink-300">
        {label} {required && <span className="text-ink-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="on"
        className={`mt-2 w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none transition-colors ${
          error ? "border-red-400/50" : "border-white/[0.1] focus:border-violet-400/50"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
