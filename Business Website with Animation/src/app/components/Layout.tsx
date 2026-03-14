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
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items: cartItems, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const userMenuRef = useRef<HTMLDivElement>(null);

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
        `}</style>
      </div>

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
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #4ade80)",
                  boxShadow: "0 0 20px rgba(74,222,128,0.4)",
                }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <span
                  className="text-white block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  BOTANIKART
                </span>
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
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  <h2 className="text-white text-lg font-semibold">Your Cart</h2>
                  {totalItems > 0 && (
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

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
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
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div
                  className="px-6 py-5 space-y-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Subtotal</span>
                    <span className="text-white text-lg font-semibold">₹{totalPrice}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-white text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #4ade80)",
                      boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
                    }}
                  >
                    Checkout — ₹{totalPrice}
                  </motion.button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-white/30 text-xs hover:text-red-400 transition-colors"
                  >
                    Clear Cart
                  </button>
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
                Bringing nature's finest directly to your doorstep — grown with love in India's prestigious government
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
