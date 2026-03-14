import { motion } from "motion/react";
import { Leaf, Award, Users, Sprout, Target, Heart, MapPin, CheckCircle2, Microscope } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1558889485-5930e200a2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBsdXNoJTIwZ3JlZW4lMjBwbGFudHN8ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const cropsImg = "https://images.unsplash.com/photo-1760549255949-767d18981890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZSUyMGNyb3BzJTIwaGFydmVzdCUyMGZhcm18ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const herbImg = "https://images.unsplash.com/photo-1726924245031-45478195b89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiJTIwZ2FyZGVuJTIwbWVkaWNpbmFsJTIwcGxhbnRzfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";

const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const timeline = [
  { year: "2021", title: "The Seed of an Idea", desc: "Founder Arjun Nair noticed that India's world-class botanical gardens had untapped potential — pristine plants and seeds, unavailable to the public." },
  { year: "2022", title: "First Partnership", desc: "Signed MoU with Lalbagh Botanical Garden, Bengaluru — our first official partnership to begin sustainable cultivation." },
  { year: "2023", title: "Going Digital", desc: "Launched our e-commerce platform with 50 plant varieties. First 1,000 orders shipped safely across 8 Indian states." },
  { year: "2024", title: "Scale & Impact", desc: "Expanded to 4 botanical gardens. Introduced monthly seed subscription boxes. Crossed ₹1 crore in revenue." },
  { year: "2026", title: "Today", desc: "50,000+ orders delivered. 12 botanical garden partnerships. India's most trusted botanical plant D2C brand." },
];

const team = [
  { name: "Arjun Nair", role: "Founder & CEO", expertise: "Botanical Sciences, IISc Alumni", initial: "AN", color: "#4ade80" },
  { name: "Dr. Meera Krishnan", role: "Chief Botanist", expertise: "25+ years in Plant Research, PhD from TIFR", initial: "MK", color: "#86efac" },
  { name: "Ritu Sharma", role: "Head of Operations", expertise: "Supply Chain & Logistics, ex-BigBasket", initial: "RS", color: "#34d399" },
  { name: "Vikram Patel", role: "Head of Growth", expertise: "Digital Marketing, ex-Nurserylive", initial: "VP", color: "#6ee7b7" },
];

const gardens = [
  { name: "Lalbagh Botanical Garden", city: "Bengaluru, Karnataka", est: "Est. 1760", speciality: "Rare Tropical Specimens", plants: "1000+" },
  { name: "NBRI", city: "Lucknow, Uttar Pradesh", est: "Est. 1953", speciality: "Medicinal & Aromatic Plants", plants: "2500+" },
  { name: "AGCBBG", city: "Kolkata, West Bengal", est: "Est. 1787", speciality: "Exotic & Heritage Flora", plants: "1400+" },
  { name: "Sanjay Gandhi NP", city: "Mumbai, Maharashtra", est: "Est. 1969", speciality: "Native Wildflowers", plants: "600+" },
];

const values = [
  { icon: Leaf, title: "Sustainability First", desc: "Every plant sold, we plant two more. Our gardens operate on 100% rainwater harvesting and composting." },
  { icon: Award, title: "Uncompromised Quality", desc: "No shortcuts. Every batch is tested by our in-house botanists before packaging and dispatch." },
  { icon: Heart, title: "Community Rooted", desc: "We employ local gardeners, horticulturists, and tribal communities around our partner gardens." },
  { icon: Target, title: "Mission Driven", desc: "Our goal: Make India greener. One home garden at a time. By 2030, we want to green 1 million homes." },
];

export function About() {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,26,14,0.7), rgba(7,26,14,0.95))" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-green-400 text-sm tracking-widest uppercase">Our Story</span>
            <h1 className="text-white mt-3 mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2 }}>
              Born from a Belief That{" "}
              <span style={{ background: "linear-gradient(135deg, #4ade80, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Nature Deserves Better
              </span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              BOTANIKART was founded with one mission — to bridge the gap between India's world-class botanical gardens and the millions of home gardeners who deserve access to truly healthy, pure, certified plants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Image */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-green-400 text-sm tracking-widest uppercase">Our Mission</span>
              <h2 className="text-white mt-2 mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.3 }}>
                Bringing Botanical Excellence Directly to Your Home
              </h2>
              <p className="text-white/60 leading-relaxed mb-5">
                India's premier botanical gardens house some of the rarest and healthiest plant specimens in the world — cultivated by expert botanists with decades of knowledge. Yet most Indians have no access to these treasures.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                We changed that. By partnering directly with these institutions, we can now deliver certified, pesticide-free, organically grown plants and seeds straight to your doorstep — with the full backing of botanical science.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Direct partnership with 12 botanical gardens",
                  "Certified organic — no pesticides, ever",
                  "Expert botanist oversight at every stage",
                  "Packaged for safe transit of live plants",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden" style={glass}>
                <img src={cropsImg} alt="Our Process" className="w-full h-72 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(74,222,128,0.15)" }}>
                      <Microscope className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Botanist Reviewed</div>
                      <div className="text-white/40 text-xs">Every batch inspected before dispatch</div>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm">
                    Our team of 15+ certified botanists personally review and approve every batch of plants and seeds before they leave our partner gardens.
                  </p>
                </div>
              </div>

              {/* Floating stat */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-5 p-4 rounded-2xl"
                style={{ ...glass, border: "1px solid rgba(74,222,128,0.3)" }}
              >
                <div className="text-green-400 font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>98%</div>
                <div className="text-white/50 text-xs">Customer Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-green-400 text-sm tracking-widest uppercase">Our Journey</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              From Seed to Scale
            </h2>
          </motion.div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(74,222,128,0.3), transparent)" }} />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Year bubble */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold text-green-400" style={{ background: "rgba(74,222,128,0.1)", border: "2px solid rgba(74,222,128,0.4)", backdropFilter: "blur(10px)" }}>
                      {item.year}
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 p-5 rounded-2xl"
                    style={glass}
                  >
                    <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Gardens */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-green-400 text-sm tracking-widest uppercase">Our Partners</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              Garden Partnerships
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
              We are officially authorised to cultivate and distribute select plant varieties from these prestigious institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gardens.map((garden, i) => (
              <motion.div
                key={garden.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, border: "1px solid rgba(74,222,128,0.4)" }}
                className="p-5 rounded-2xl text-center transition-all duration-300"
                style={glass}
              >
                <div className="text-3xl mb-3">🏛️</div>
                <div className="px-2 py-0.5 rounded-full text-xs text-green-400 mb-3 mx-auto w-fit" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  {garden.est}
                </div>
                <h3 className="text-white text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{garden.name}</h3>
                <p className="text-white/40 text-xs mb-3 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" /> {garden.city}
                </p>
                <p className="text-green-400/70 text-xs mb-2">{garden.speciality}</p>
                <div className="text-white/60 text-xs">{garden.plants} plant species</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-green-400 text-sm tracking-widest uppercase">What We Stand For</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="p-6 rounded-2xl"
                style={glass}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}>
                  <val.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{val.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-green-400 text-sm tracking-widest uppercase">Our People</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              Meet the Team
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="p-6 rounded-2xl text-center"
                style={glass}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl"
                  style={{ background: `linear-gradient(135deg, #16a34a, ${member.color})`, boxShadow: `0 8px 20px ${member.color}30` }}
                >
                  {member.initial}
                </div>
                <h3 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{member.name}</h3>
                <p className="text-green-400 text-xs mb-2">{member.role}</p>
                <p className="text-white/40 text-xs leading-relaxed">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
            style={{ ...glass, border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <img src={herbImg} alt="Our Process" className="w-full h-64 object-cover" />
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Cultivation", desc: "Grown under expert supervision in botanical gardens" },
                  { step: "02", title: "Inspection", desc: "Every plant reviewed by certified botanists before harvest" },
                  { step: "03", title: "Packaging", desc: "Special breathable eco-packaging keeps plants alive in transit" },
                  { step: "04", title: "Delivery", desc: "Fragile-marked handling with morning delivery preference" },
                ].map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold mb-2" style={{ background: "linear-gradient(135deg, #4ade80, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Playfair Display', serif" }}>
                      {step.step}
                    </div>
                    <h4 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
