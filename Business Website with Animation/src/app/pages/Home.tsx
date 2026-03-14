import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import {
  Leaf,
  Star,
  Shield,
  Truck,
  Award,
  Sprout,
  FlowerIcon,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Package,
  RefreshCw,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1558889485-5930e200a2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBsdXNoJTIwZ3JlZW4lMjBwbGFudHN8ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const cropsImg = "https://images.unsplash.com/photo-1760549255949-767d18981890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZSUyMGNyb3BzJTIwaGFydmVzdCUyMGZhcm18ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const seedsImg = "https://images.unsplash.com/photo-1752051665195-a5c2781361fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHBhY2tldHMlMjBnYXJkZW5pbmclMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const housePlantsImg = "https://images.unsplash.com/photo-1758373148976-5fe6deb51916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3VzZXBsYW50cyUyMHBvdHRlZCUyMGdyZWVufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const herbImg = "https://images.unsplash.com/photo-1726924245031-45478195b89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiJTIwZ2FyZGVuJTIwbWVkaWNpbmFsJTIwcGxhbnRzfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const flowerImg = "https://images.unsplash.com/photo-1708281105381-44c700c1b0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBibG9vbWluZyUyMGdhcmRlbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const exoticImg = "https://images.unsplash.com/photo-1759382904628-91bd4b922460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGV4b3RpYyUyMHBsYW50JTIwcmFyZXxlbnwxfHx8fDE3NzM0ODM2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080";

// Glass card utility styles
const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "1.5rem",
};

const glassHover = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(74,222,128,0.3)",
  borderRadius: "1.5rem",
};

function GlassCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ ...glass, ...style }}>
      {children}
    </div>
  );
}

const stats = [
  { value: "50K+", label: "Plants Delivered" },
  { value: "12", label: "Botanical Gardens" },
  { value: "200+", label: "Crop Varieties" },
  { value: "98%", label: "Customer Satisfaction" },
];

const features = [
  {
    icon: BadgeCheck,
    title: "Govt. Garden Certified",
    desc: "Every plant grown under expert supervision in India's prestigious government botanical gardens.",
    color: "#4ade80",
  },
  {
    icon: Shield,
    title: "Pesticide-Free",
    desc: "100% organic cultivation. No harmful chemicals — safe for your family and environment.",
    color: "#86efac",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    desc: "Specially designed packaging ensures your plants arrive healthy and alive — guaranteed.",
    color: "#34d399",
  },
  {
    icon: Sprout,
    title: "Rare & Exotic Varieties",
    desc: "Access to exclusive plant species only available from botanical garden collections.",
    color: "#6ee7b7",
  },
  {
    icon: HeartHandshake,
    title: "Expert Botanist Support",
    desc: "Post-purchase care guidance from certified botanists to help your plants thrive.",
    color: "#a7f3d0",
  },
  {
    icon: RefreshCw,
    title: "DOA Replacement",
    desc: "Dead-on-arrival? We replace it. No questions asked within 48 hours of delivery.",
    color: "#4ade80",
  },
];

const products = [
  {
    id: 1,
    name: "Golden Pothos",
    category: "Indoor Plant",
    price: 349,
    originalPrice: 499,
    rating: 4.8,
    reviews: 234,
    tag: "Bestseller",
    tagColor: "#4ade80",
    img: housePlantsImg,
    garden: "Lalbagh, Bengaluru",
  },
  {
    id: 2,
    name: "Tulsi Herb Kit",
    category: "Medicinal Herb",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviews: 512,
    tag: "Organic",
    tagColor: "#34d399",
    img: herbImg,
    garden: "NBRI, Lucknow",
  },
  {
    id: 3,
    name: "Marigold Seeds",
    category: "Flower Seeds",
    price: 89,
    originalPrice: 129,
    rating: 4.7,
    reviews: 189,
    tag: "Seasonal",
    tagColor: "#d4af37",
    img: flowerImg,
    garden: "Sanjay Gandhi NP",
  },
  {
    id: 4,
    name: "Bird of Paradise",
    category: "Rare Exotic",
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviews: 87,
    tag: "Rare",
    tagColor: "#c084fc",
    img: exoticImg,
    garden: "Acharya BG, Kolkata",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "I'm blown away by the quality! My Golden Pothos arrived in perfect condition, beautifully packed. The care card was incredibly helpful. Will definitely order again!",
    avatar: "PS",
    garden: "Ordered from Lalbagh Collection",
  },
  {
    name: "Rajesh Kumar",
    location: "Bengaluru, Karnataka",
    rating: 5,
    text: "The seed subscription box is brilliant! Every month I get a curated pack of seasonal seeds with planting guides. My terrace garden has never looked better.",
    avatar: "RK",
    garden: "Monthly Seed Subscriber",
  },
  {
    name: "Ananya Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "Knowing these plants come from government botanical gardens gives me full confidence. The Tulsi kit came with such rich, healthy roots. Truly premium quality!",
    avatar: "AP",
    garden: "Medicinal Herb Collection",
  },
];

const categories = [
  { name: "Indoor Plants", count: "80+ varieties", img: housePlantsImg, emoji: "🌿" },
  { name: "Vegetable Crops", count: "60+ varieties", img: cropsImg, emoji: "🥬" },
  { name: "Medicinal Herbs", count: "40+ varieties", img: herbImg, emoji: "🌱" },
  { name: "Flower Seeds", count: "100+ varieties", img: flowerImg, emoji: "🌸" },
  { name: "Rare & Exotic", count: "25+ varieties", img: exoticImg, emoji: "✨" },
  { name: "Seed Collections", count: "200+ varieties", img: seedsImg, emoji: "🌾" },
];

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="Botanical Garden" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,26,14,0.9) 0%, rgba(13,43,24,0.7) 50%, rgba(7,26,14,0.85) 100%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid rgba(74,222,128,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Sparkles className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">India's First Botanical Garden D2C Brand</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-white mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                Nature Grown in{" "}
                <span style={{ background: "linear-gradient(135deg, #4ade80, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Government
                </span>{" "}
                Botanical Gardens
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-white/60 mb-8 max-w-lg"
                style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
              >
                Certified organic plants, healthy crops & rare seeds — directly from India's most prestigious botanical gardens to your doorstep. Pesticide-free. Botanist-approved.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <NavLink to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(74,222,128,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium"
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #4ade80)",
                      boxShadow: "0 4px 20px rgba(74,222,128,0.4)",
                    }}
                  >
                    <Leaf className="w-4 h-4" />
                    Shop Plants & Seeds
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </NavLink>
                <NavLink to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Our Story
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </NavLink>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: BadgeCheck, text: "Govt. Certified" },
                  { icon: Shield, text: "Pesticide-Free" },
                  { icon: Award, text: "Botanist Approved" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Icon className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-white/70 text-xs">{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side — floating glass cards */}
            <div className="relative hidden lg:block h-96">
              {/* Main product card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ ...glass, position: "absolute", top: 0, right: 0, width: 260, overflow: "hidden" }}
              >
                <img src={housePlantsImg} alt="Plants" className="w-full h-44 object-cover rounded-t-3xl" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-400 text-xs">Indoor Plant</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.2)", color: "#4ade80" }}>Bestseller</span>
                  </div>
                  <h3 className="text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Golden Pothos</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-400 font-medium">₹349</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white/60 text-xs">4.8</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating seeds card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                animate-loop={{ y: [0, -12, 0] }}
                style={{ ...glass, position: "absolute", bottom: 30, left: 0, width: 220, overflow: "hidden" }}
              >
                <img src={seedsImg} alt="Seeds" className="w-full h-32 object-cover rounded-t-3xl" />
                <div className="p-3">
                  <span className="text-yellow-300/80 text-xs">🌾 Seed Collection</span>
                  <h4 className="text-white text-sm mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>Monsoon Seed Box</h4>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-green-400 text-sm font-medium">₹599/mo</span>
                    <span className="text-white/50 text-xs">Subscribe</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ ...glass, position: "absolute", top: "40%", left: "20%", padding: "1rem 1.5rem" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">50,000+</div>
                    <div className="text-white/50 text-xs">Plants Delivered</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating orb */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 left-8 w-16 h-16 rounded-full opacity-60"
                style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.3), rgba(134,239,172,0.2))", backdropFilter: "blur(10px)", border: "1px solid rgba(74,222,128,0.3)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.04, ...glassHover }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center py-6 px-4 rounded-2xl transition-all duration-300"
                style={glass}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    background: "linear-gradient(135deg, #4ade80, #86efac)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm tracking-widest uppercase">Explore</span>
            <h2
              className="text-white mt-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}
            >
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: i === 0 || i === 5 ? 280 : 220, ...glass }}
              >
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,26,14,0.9) 0%, rgba(7,26,14,0.3) 60%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <h3 className="text-white font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.name}</h3>
                  <p className="text-green-400 text-xs mt-0.5">{cat.count}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-white"
                  style={{ background: "rgba(74,222,128,0.3)", backdropFilter: "blur(10px)", border: "1px solid rgba(74,222,128,0.4)" }}
                >
                  Explore <ArrowRight className="w-3 h-3" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-green-400 text-sm tracking-widest uppercase">Why Choose Us</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              The BOTANIKART Difference
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Everything we grow and sell comes with the stamp of authenticity — backed by India's trusted botanical research institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, ...glassHover }}
                className="p-6 rounded-3xl transition-all duration-300 cursor-default"
                style={glass}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `rgba(${feature.color === "#4ade80" ? "74,222,128" : "52,211,153"},0.15)`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-green-400 text-sm tracking-widest uppercase">Fresh Arrivals</span>
              <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
                Featured Plants & Seeds
              </h2>
            </div>
            <NavLink to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-green-400"
                style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}
              >
                View All <ArrowRight className="w-4 h-4" />
              </motion.button>
            </NavLink>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
                style={hoveredProduct === product.id ? glassHover : glass}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ transform: hoveredProduct === product.id ? "scale(1.08)" : "scale(1)" }} />
                  {/* Gradient */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,26,14,0.6) 0%, transparent 60%)" }} />

                  {/* Tag */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: `${product.tagColor}33`, border: `1px solid ${product.tagColor}60`, backdropFilter: "blur(8px)", color: product.tagColor }}
                  >
                    {product.tag}
                  </div>

                  {/* Garden badge */}
                  <div className="absolute bottom-3 left-3 right-3 px-2 py-1 rounded-lg text-xs text-white/70 truncate" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                    🏛️ {product.garden}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-400 text-xs">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white/60 text-xs">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-400 font-medium">₹{product.price}</span>
                      <span className="text-white/30 text-xs line-through ml-2">₹{product.originalPrice}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOVERNMENT PARTNERSHIP BANNER ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(22,163,74,0.2) 0%, rgba(4,47,46,0.4) 50%, rgba(7,26,14,0.6) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(74,222,128,0.25)",
            }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)", transform: "translate(40%,-40%)" }} />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #86efac 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)" }}>
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm tracking-wider">OFFICIAL PARTNERSHIP</span>
                </div>
                <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1.3 }}>
                  Grown Under the Care of India's Premier Botanical Institutions
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  We partner exclusively with government botanical gardens including Lalbagh (Bengaluru), NBRI (Lucknow), and Acharya Jagadish Chandra Bose Botanic Garden (Kolkata) — ensuring every plant meets the highest standards of purity and quality.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Lalbagh, Bengaluru", "NBRI, Lucknow", "AGCBBG, Kolkata", "Sanjay Gandhi NP"].map((g) => (
                    <span key={g} className="px-3 py-1.5 rounded-full text-xs text-green-300" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
                      🏛️ {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Organic Certified", icon: BadgeCheck },
                  { label: "Pesticide-Free", icon: Shield },
                  { label: "Govt. Authorized", icon: Award },
                  { label: "Botanist Verified", icon: FlowerIcon },
                ].map(({ label, icon: Icon }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center"
                    style={glass}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(74,222,128,0.15)" }}>
                      <Icon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-white/70 text-xs">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SUBSCRIPTION BOX ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Seed Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl"
              style={glass}
            >
              <img src={seedsImg} alt="Seed Subscription" className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-300 text-lg">🌾</span>
                  <span className="text-green-400 text-sm">Monthly Subscription</span>
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700 }}>
                  Curated Seed Box
                </h3>
                <p className="text-white/50 text-sm mb-4">
                  Receive 10–15 handpicked seasonal seeds every month — Medicinal, Vegetables, Flowers & Exotic varieties with planting guides.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-400 text-xl font-bold">₹599</span>
                    <span className="text-white/40 text-sm">/month</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74,222,128,0.4)" }}
                    className="px-5 py-2.5 rounded-full text-sm text-white font-medium"
                    style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Garden Starter Kit */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl"
              style={glass}
            >
              <img src={cropsImg} alt="Garden Starter Kit" className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-lg">🌱</span>
                  <span className="text-green-400 text-sm">Bundle Deal</span>
                </div>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700 }}>
                  Garden Starter Kit
                </h3>
                <p className="text-white/50 text-sm mb-4">
                  Perfect for beginners! Includes 5 live plants + 20 seed varieties + organic soil mix + a complete care guide from our botanists.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-green-400 text-xl font-bold">₹1,299</span>
                    <span className="text-white/40 text-sm line-through ml-2">₹1,899</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2.5 rounded-full text-sm text-white"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    Get the Kit
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-400 text-sm tracking-widest uppercase">Reviews</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700 }}>
              What Our Gardeners Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.03, ...glassHover }}
                className="p-6 rounded-3xl transition-all duration-300"
                style={activeTestimonial === i ? { ...glass, border: "1px solid rgba(74,222,128,0.35)" } : glass}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.location}</div>
                    <div className="text-green-400 text-xs mt-0.5">{t.garden}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeTestimonial === i ? "24px" : "8px",
                  height: "8px",
                  background: activeTestimonial === i ? "#4ade80" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-10 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(7,26,14,0.5) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(74,222,128,0.25)",
            }}
          >
            <div className="text-4xl mb-4">🌿</div>
            <h2 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700 }}>
              Get Your Free Gardening Guide
            </h2>
            <p className="text-white/50 mb-6 text-sm">
              Subscribe to our newsletter and receive a free "Beginner's Botanical Gardening Guide" PDF — plus exclusive deals on seasonal arrivals.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full text-sm text-white placeholder-white/30 outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(74,222,128,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full text-sm text-white font-medium whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
              >
                Get Guide
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
