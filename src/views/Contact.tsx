"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import { CONTACT } from "../constants/contact";

const topics = [
  { value: "", label: "Select a topic" },
  { value: "general", label: "General inquiry" },
  { value: "order", label: "Order & shipping" },
  { value: "custom", label: "Custom or bespoke" },
  { value: "appointment", label: "Private appointment" },
  { value: "press", label: "Press & partnerships" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!topic) {
      setError("Please choose a topic.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <PageShell
      title="Contact"
      subtitle="Questions about an order, caring for your anti-tarnish pieces, or a private appointment—we read every message and reply within two business days."
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <aside className="lg:col-span-4 space-y-10">
          <div className="flex gap-4">
            <MapPin className="text-white/70 shrink-0 mt-1" size={20} strokeWidth={1.25} />
            <div>
              <p className="text-xs tracking-widest uppercase text-white/55 mb-2">
                Studio
              </p>
              <p className="text-white/90 font-light leading-relaxed">
                By appointment only
                <br />
                Sample studio
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="text-white/70 shrink-0 mt-1" size={20} strokeWidth={1.25} />
            <div>
              <p className="text-xs tracking-widest uppercase text-white/55 mb-2">
                Email
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/90 font-light hover:text-white border-b border-white/20 hover:border-white transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="text-white/70 shrink-0 mt-1" size={20} strokeWidth={1.25} />
            <div>
              <p className="text-xs tracking-widest uppercase text-white/55 mb-2">
                Phone
              </p>
              <a
                href={CONTACT.phoneHref}
                className="text-white/90 font-light hover:text-white border-b border-white/20 hover:border-white transition-colors"
              >
                {CONTACT.phone}
              </a>
              <p className="text-white/50 text-sm mt-2 font-light">
                WhatsApp: {CONTACT.phone}
              </p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-sm border border-white/15 bg-white/[0.03] p-10 md:p-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20">
                  <Check className="text-white" size={28} strokeWidth={1.25} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
                  Thank you
                </h2>
                <p className="text-white/80 font-light leading-relaxed max-w-md mx-auto">
                  Your message has been received. We will get back to you at{" "}
                  <span className="text-white">{email}</span> within two business
                  days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {error ? (
                  <p className="text-sm text-red-300/90" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs tracking-widest uppercase text-white/55 mb-2 block">
                      Name *
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-widest uppercase text-white/55 mb-2 block">
                      Email *
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>

                <label className="block max-w-md">
                  <span className="text-xs tracking-widest uppercase text-white/55 mb-2 block">
                    Phone <span className="text-white/35">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors"
                    placeholder="+1 …"
                  />
                </label>

                <label className="block max-w-md">
                  <span className="text-xs tracking-widest uppercase text-white/55 mb-2 block">
                    Topic *
                  </span>
                  <select
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-background border border-white/20 py-3 px-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    {topics.map((t) => (
                      <option key={t.value || "placeholder"} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs tracking-widest uppercase text-white/55 mb-2 block">
                    Message *
                  </span>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/15 p-4 text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors resize-y min-h-[160px]"
                    placeholder="Tell us how we can help…"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 border border-white/25 bg-white/5 px-8 py-4 text-sm tracking-[0.2em] uppercase text-white hover:bg-white/10 hover:border-white transition-colors"
                >
                  Send message
                  <Send size={18} strokeWidth={1.5} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
}
