import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  CheckCircle2,
  CreditCard,
  Loader2,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(() => {
    // Only show splash once per session
    return sessionStorage.getItem("botanikart_splash_done") === "true";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items: cartItems, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<"cart" | "details" | "processing" | "success">("cart");
  const [addressForm, setAddressForm] = useState({ name: "", phone: "", address: "", zip: "" });

  const handleProceedToDetails = () => setCheckoutStatus("details");

  const handlePayNow = () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.address || !addressForm.zip) {
      alert("Please fill in all delivery details");
      return;
    }
    setCheckoutStatus("processing");
    // Simulate Razorpay payment modal delay
    setTimeout(() => {
      setCheckoutStatus("success");
      setTimeout(() => {
        setCheckoutStatus("cart");
        clearCart();
        setCartOpen(false);
      }, 2500);
    }, 2000);
  };

  useEffect(() => {
    if (cartOpen) {
      setCheckoutStatus("cart");
    }
  }, [cartOpen]);

  // Mark splash as done after animation
  useEffect(() => {
    if (!splashDone) {
      const timer = setTimeout(() => {
        setSplashDone(true);
        sessionStorage.setItem("botanikart_splash_done", "true");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [splashDone]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #071a0e 0%, #0d2b18 40%, #0a2210 70%, #061508 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, #16a34a 0%, transparent 70%)",
            top: "-200px",
            left: "-100px",
            filter: "blur(80px)",
            animation: "float1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
            top: "40%",
            right: "-150px",
            filter: "blur(80px)",
            animation: "float2 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
            bottom: "10%",
            left: "30%",
            filter: "blur(80px)",
            animation: "float3 18s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
          @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }
          @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
          @keyframes leafSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
          @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(74,222,128,0.4)} 50%{box-shadow:0 0 35px rgba(74,222,128,0.8), 0 0 60px rgba(74,222,128,0.3)} }
          @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
          @keyframes particleFloat { 0%{transform:translateY(0) rotate(0deg);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100vh) rotate(720deg);opacity:0} }
          @keyframes borderGlow { 0%,100%{border-color:rgba(74,222,128,0.15)} 50%{border-color:rgba(74,222,128,0.4)} }
        `}</style>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "-20px",
              width: `${6 + (i % 3) * 4}px`,
              height: `${6 + (i % 3) * 4}px`,
              borderRadius: "50%",
              background: i % 2 === 0 ? "rgba(74,222,128,0.3)" : "rgba(212,175,55,0.3)",
              animation: `particleFloat ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Splash Screen */}
      <AnimatePresence>
        {!splashDone && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #071a0e 0%, #0d2b18 40%, #0a2210 70%, #061508 100%)",
              perspective: "1200px",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Radial glow behind logo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                background: "radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              initial={{ scale: 1.5, opacity: 0.8 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Logo container that shrinks to top-left */}
            <motion.div
              className="flex flex-col items-center gap-4"
              style={{ transformStyle: "preserve-3d" }}
              initial={{
                scale: 3,
                opacity: 0,
                rotateX: 15,
                rotateY: -10,
              }}
              animate={{
                scale: [0, 3, 3, 1],
                opacity: [0, 1, 1, 1],
                rotateX: [15, 0, 0, 0],
                rotateY: [-10, 0, 0, 0],
                x: [0, 0, 0, 0],
                y: [0, 0, 0, 0],
              }}
              transition={{
                duration: 2.0,
                times: [0, 0.25, 0.65, 1],
                ease: "easeInOut",
              }}
            >
              {/* Leaf icon */}
              <motion.div
                className="rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  width: 80,
                  height: 80,
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(74,222,128,0.4)",
                    "0 0 80px rgba(74,222,128,0.8), 0 0 120px rgba(74,222,128,0.3)",
                    "0 0 30px rgba(74,222,128,0.4)",
                  ],
                  rotate: [0, 360],
                }}
                transition={{
                  boxShadow: { duration: 1.5, repeat: 1, ease: "easeInOut" },
                  rotate: { duration: 2, ease: "easeInOut" },
                }}
              >
                <Leaf className="w-10 h-10 text-white" />
              </motion.div>

              {/* Brand Name */}
              <motion.div className="text-center">
                <motion.span
                  className="text-white block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0, 1, 1], y: [20, 0, 0] }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  BOTANIKART
                </motion.span>
                <motion.span
                  className="text-green-400 block"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1] }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  NATURE'S FINEST MARKETPLACE
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Decorative spinning rings */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                border: "1px solid rgba(74,222,128,0.15)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [0, 0.5, 0], rotate: [0, 180] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                border: "1px solid rgba(74,222,128,0.1)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5, 0], opacity: [0, 0.3, 0], rotate: [0, -120] }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(7, 26, 14, 0.85)"
            : "rgba(7, 26, 14, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(74, 222, 128, 0.15)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 25, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                >
                  <Leaf className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <motion.span
                  className="text-white block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    backgroundImage: "linear-gradient(90deg, #fff 0%, #4ade80 50%, #fff 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 4s linear infinite",
                  }}
                >
                  BOTANIKART
                </motion.span>
                <span className="text-green-400 block" style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                  NATURE'S FINEST MARKETPLACE
                </span>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm transition-all duration-200 rounded-lg group ${
                      isActive ? "text-green-400" : "text-white/80 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: "rgba(74,222,128,0.15)",
                            border: "1px solid rgba(74,222,128,0.3)",
                          }}
                          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCartOpen(!cartOpen)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                  >
                    {totalItems}
                  </span>
                )}
              </motion.button>

              {/* User / Login Button */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-white"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                    >
                      {user.avatar}
                    </div>
                    <span className="hidden lg:inline text-white/90 text-sm">
                      {user.name.split(" ")[0]}
                    </span>
                  </motion.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl overflow-hidden z-50"
                        style={{
                          background: "rgba(13, 43, 24, 0.95)",
                          backdropFilter: "blur(40px)",
                          border: "1px solid rgba(74,222,128,0.2)",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        }}
                      >
                        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                            >
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{user.name}</p>
                              <p className="text-white/40 text-xs">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                              navigate("/login");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(74,222,128,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white"
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #4ade80)",
                      boxShadow: "0 4px 15px rgba(74,222,128,0.3)",
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </motion.button>
                </NavLink>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "rgba(7,26,14,0.95)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(74,222,128,0.15)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                          isActive
                            ? "text-green-400 bg-green-400/10 border border-green-400/20"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile Login/Logout */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  style={{ borderTop: "1px solid rgba(74,222,128,0.15)", paddingTop: "8px", marginTop: "4px" }}
                >
                  {isAuthenticated && user ? (
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        navigate("/login");
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-all w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out ({user.name.split(" ")[0]})
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-green-400 hover:bg-green-400/10 transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      Login / Register
                    </NavLink>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 z-50 flex flex-col"
              style={{
                background: "rgba(7, 26, 14, 0.95)",
                backdropFilter: "blur(40px)",
                borderLeft: "1px solid rgba(74,222,128,0.15)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-3">
                  {checkoutStatus === "details" ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCheckoutStatus("cart")}
                      className="text-white/60 hover:text-white"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <ShoppingCart className="w-5 h-5 text-green-400" />
                  )}
                  <h2 className="text-white text-lg font-semibold">
                    {checkoutStatus === "details" ? "Checkout" : "Your Cart"}
                  </h2>
                  {totalItems > 0 && checkoutStatus === "cart" && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs text-white"
                      style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                    >
                      {totalItems}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {checkoutStatus === "cart" && (
                  cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                      style={{ background: "rgba(74,222,128,0.1)" }}
                    >
                      <ShoppingCart className="w-8 h-8 text-green-400/40" />
                    </div>
                    <p className="text-white/50 text-sm mb-1">Your cart is empty</p>
                    <p className="text-white/30 text-xs">Add some plants to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 rounded-2xl p-3"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                          <p className="text-green-400/60 text-xs">{item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 text-xs hover:text-white"
                                style={{ background: "rgba(255,255,255,0.08)" }}
                              >
                                −
                              </button>
                              <span className="text-white text-xs w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 text-xs hover:text-white"
                                style={{ background: "rgba(255,255,255,0.08)" }}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-green-400 text-sm font-medium">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-white/20 hover:text-red-400 transition-colors self-start"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  )
                )}

                {checkoutStatus === "details" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Delivery Address */}
                    <div>
                      <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-400" /> Delivery Address
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        <textarea
                          placeholder="Street Address & Area"
                          rows={2}
                          value={addressForm.address}
                          onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none resize-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City / State"
                            defaultValue="Mumbai, MH"
                            className="w-full px-3 py-2.5 rounded-xl text-sm text-white/50 outline-none"
                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                            readOnly
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            maxLength={6}
                            value={addressForm.zip}
                            onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value.replace(/\\D/g, "") })}
                            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-green-400" /> Payment Options
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-xl cursor-default" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
                          <input type="radio" checked readOnly className="accent-green-500" />
                          <div>
                            <div className="text-white text-sm font-medium">Razorpay</div>
                            <div className="text-white/50 text-xs">UPI, Cards, Wallets, NetBanking</div>
                          </div>
                        </label>
                        <div className="flex items-center gap-3 p-3 rounded-xl opacity-50 cursor-not-allowed" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <input type="radio" disabled />
                          <div>
                            <div className="text-white text-sm font-medium">Cash on Delivery</div>
                            <div className="text-white/50 text-xs text-red-400">Not available for live plants</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(checkoutStatus === "processing" || checkoutStatus === "success") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    {checkoutStatus === "processing" ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mb-6">
                          <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500" />
                        </motion.div>
                        <h3 className="text-white text-xl font-medium mb-2">Processing Payment...</h3>
                        <p className="text-white/50 text-sm">Please do not close this window or press back.</p>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ type: "spring", damping: 15 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                          style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", boxShadow: "0 0 40px rgba(74,222,128,0.4)" }}
                        >
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-white text-xl font-medium mb-2">Order Confirmed! 🌿</h3>
                        <p className="text-white/50 text-sm text-center">
                          Payment successful. Your botanical treasures are being carefully prepped for dispatch from {addressForm.zip}.
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && checkoutStatus !== "processing" && checkoutStatus !== "success" && (
                <div
                  className="px-6 py-5 space-y-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Subtotal</span>
                    <span className="text-white text-lg font-semibold">₹{totalPrice}</span>
                  </div>
                  
                  {checkoutStatus === "cart" ? (
                    <motion.button
                      onClick={handleProceedToDetails}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #16a34a, #4ade80)",
                        boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
                      }}
                    >
                      Proceed to Checkout — ₹{totalPrice}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handlePayNow}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #16a34a, #4ade80)",
                        boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
                      }}
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay with Razorpay — ₹{totalPrice}
                    </motion.button>
                  )}

                  {checkoutStatus === "cart" && (
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-white/30 text-xs hover:text-red-400 transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-20"
        style={{
          background: "rgba(4,12,7,0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(74,222,128,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
                >
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span
                  className="text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700 }}
                >
                  BOTANIKART
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Bringing nature's finest directly to your doorstep — grown with love in India's prestigious
                botanical gardens.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-green-400 transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Shop Plants", "Shop Seeds", "About Us", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/50 text-sm hover:text-green-400 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Categories</h4>
              <ul className="space-y-2">
                {["Indoor Plants", "Outdoor Crops", "Medicinal Herbs", "Flower Seeds", "Vegetable Seeds", "Rare & Exotic"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 text-sm hover:text-green-400 transition-colors flex items-center gap-2 group">
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Get In Touch</h4>
              <div className="space-y-3">
                {[
                  { icon: Phone, text: "+91 98765 43210" },
                  { icon: Mail, text: "hello@botanikart.in" },
                  { icon: MapPin, text: "New Delhi, India" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/50 text-sm">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-green-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919876543210"
                whileHover={{ scale: 1.03 }}
                className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white w-fit"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 4px 15px rgba(37,211,102,0.3)",
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-white/30 text-xs">
              © 2026 BOTANIKART — Nature's Finest Marketplace, India
            </p>
            <div className="flex gap-4 text-white/30 text-xs">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white/60 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
