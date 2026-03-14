import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  HeadphonesIcon,
  Truck,
  RefreshCw,
} from "lucide-react";

const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const contactReasons = [
  { icon: Truck, label: "Order / Delivery", color: "#4ade80" },
  { icon: RefreshCw, label: "Return / Replace", color: "#86efac" },
  { icon: HeadphonesIcon, label: "Plant Care Help", color: "#34d399" },
  { icon: MessageCircle, label: "General Query", color: "#6ee7b7" },
];

const faqs = [
  {
    q: "How are plants packaged for delivery?",
    a: "We use specially designed breathable eco-packaging with moisture-retaining moss padding. All live plant orders are marked 'Fragile' and handled accordingly by our delivery partners.",
  },
  {
    q: "What is your Dead on Arrival (DOA) policy?",
    a: "If your plant arrives damaged or dead, simply send us a photo within 48 hours of delivery. We'll ship a replacement at no extra cost — guaranteed.",
  },
  {
    q: "Do you deliver pan-India?",
    a: "We deliver to 18,000+ pincodes across India. Enter your pincode in the shop page to check availability. Some remote areas may have longer delivery windows for fragile plants.",
  },
  {
    q: "How do I pause or cancel my seed subscription?",
    a: "You can manage your subscription anytime from your account dashboard — pause, skip a month, or cancel with just one click. No questions asked.",
  },
  {
    q: "Are your plants really grown in government botanical gardens?",
    a: "Absolutely. We have official MoUs (Memorandums of Understanding) with 12 government botanical gardens across India. Each product listing shows which garden it's sourced from.",
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    color: "white",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    fontSize: "0.875rem",
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section className="py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
          <span className="text-green-400 text-sm tracking-widest uppercase">Get In Touch</span>
          <h1 className="text-white mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
            We're Here to Help
          </h1>
          <p className="text-white/50">
            Questions about your order, plant care advice, or just want to say hello — we'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {[
            { icon: Phone, label: "Call Us", value: "+91 98765 43210", sub: "Mon–Sat, 9AM–7PM", color: "#4ade80" },
            { icon: Mail, label: "Email Us", value: "hello@botanikart.in", sub: "Reply within 24hrs", color: "#86efac" },
            { icon: MessageCircle, label: "WhatsApp", value: "Quick Support", sub: "Chat now", color: "#25D366" },
            { icon: MapPin, label: "HQ", value: "New Delhi, India", sub: "By appointment only", color: "#60a5fa" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.04 }}
              className="p-5 rounded-2xl text-center cursor-pointer"
              style={glass}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}35` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div className="text-white/50 text-xs mb-1">{item.label}</div>
              <div className="text-white text-xs font-medium">{item.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 p-8 rounded-3xl"
            style={glass}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700 }}>Message Sent! 🌿</h3>
                <p className="text-white/50 text-sm max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours. In the meantime, feel free to chat with us on WhatsApp for instant support.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full text-sm text-white"
                  style={{ background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700 }}>
                  Send Us a Message
                </h2>
                <p className="text-white/40 text-sm mb-6">Fill in the form below and we'll respond within 24 hours.</p>

                {/* Reason selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {contactReasons.map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => setForm({ ...form, reason: r.label })}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl text-xs transition-all"
                      style={{
                        background: form.reason === r.label ? `${r.color}18` : "rgba(255,255,255,0.03)",
                        border: form.reason === r.label ? `1px solid ${r.color}50` : "1px solid rgba(255,255,255,0.08)",
                        color: form.reason === r.label ? r.color : "rgba(255,255,255,0.4)",
                      }}
                    >
                      <r.icon className="w-4 h-4" />
                      {r.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Arjun Sharma"
                        value={form.name}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="arjun@email.com"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1.5 block">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Order #BD-2026-1234"
                        value={form.subject}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/50 text-xs mb-1.5 block">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(74,222,128,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-medium"
                    style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl"
              style={glass}
            >
              <h3 className="text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <Clock className="w-4 h-4 text-green-400" /> Business Hours
              </h3>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-white/50">{day}</span>
                    <span className="text-white/70">{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Support team is currently available
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919876543210"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="block p-6 rounded-2xl cursor-pointer"
              style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.15), rgba(18,140,126,0.2))", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Chat on WhatsApp</div>
                  <div className="text-white/50 text-xs">Fastest way to reach us</div>
                </div>
              </div>
              <p className="text-white/40 text-xs">For order updates, plant care queries, and quick support — our team responds within minutes on WhatsApp.</p>
            </motion.a>

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-5 rounded-2xl overflow-hidden"
              style={glass}
            >
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white text-sm font-medium">Headquarters</div>
                  <div className="text-white/40 text-xs mt-0.5">Plot 42, Mehrauli-Badarpur Road,<br />New Delhi - 110030, India</div>
                </div>
              </div>
              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-28 flex items-center justify-center" style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}>
                <div className="text-center">
                  <div className="text-2xl mb-1">🗺️</div>
                  <div className="text-white/30 text-xs">Open in Google Maps</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <span className="text-green-400 text-sm tracking-widest uppercase">FAQ</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden"
                style={glass}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-white text-sm font-medium pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: openFaq === i ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${openFaq === i ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}` }}
                  >
                    <span className="text-white/70 text-sm leading-none">+</span>
                  </motion.div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
