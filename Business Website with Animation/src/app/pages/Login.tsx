import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a tiny delay for UX
    await new Promise((r) => setTimeout(r, 600));

    if (isRegister) {
      if (!name.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }
      const result = register(name, email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed");
      }
    } else {
      const result = login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed");
      }
    }
    setLoading(false);
  };

  const fillDemo = () => {
    setEmail("demo@botanikart.in");
    setPassword("demo123");
    setError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{
        background: "linear-gradient(135deg, #071a0e 0%, #0d2b18 40%, #0a2210 70%, #061508 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, #16a34a 0%, transparent 70%)",
            top: "10%",
            left: "-5%",
            filter: "blur(80px)",
            animation: "float1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
            filter: "blur(80px)",
            animation: "float2 15s ease-in-out infinite",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(13, 43, 24, 0.6)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,222,128,0.1)",
          }}
        >
          {/* Header */}
          <div className="text-center pt-10 pb-6 px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: "linear-gradient(135deg, #16a34a, #4ade80)",
                boxShadow: "0 0 40px rgba(74,222,128,0.4)",
              }}
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>

            <h1
              className="text-white text-2xl mb-1"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              {isRegister ? "Join BOTANIKART" : "Welcome Back"}
            </h1>
            <p className="text-white/50 text-sm">
              {isRegister
                ? "Create your account to start shopping"
                : "Sign in to your BOTANIKART account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-2">
                    Full Name
                  </label>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <User className="w-4 h-4 text-green-400/60" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-2">
                Email Address
              </label>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Mail className="w-4 h-4 text-green-400/60" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div>
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider block mb-2">
                Password
              </label>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Lock className="w-4 h-4 text-green-400/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-400 text-xs rounded-lg px-4 py-2"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #16a34a, #4ade80)",
                boxShadow: "0 4px 20px rgba(74,222,128,0.3)",
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  {isRegister ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Demo credentials button */}
            {!isRegister && (
              <motion.button
                type="button"
                onClick={fillDemo}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-green-400 text-sm font-medium transition-all"
                style={{
                  background: "rgba(74,222,128,0.08)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Use Demo Credentials
              </motion.button>
            )}

            {/* Toggle login/register */}
            <p className="text-center text-white/40 text-sm pt-2">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </p>
          </form>
        </div>

        {/* Demo credentials info card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 rounded-2xl px-5 py-4"
          style={{
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.15)",
          }}
        >
          <p className="text-green-400/80 text-xs font-semibold uppercase tracking-wider mb-2">
            Demo Accounts
          </p>
          <div className="space-y-1.5">
            {[
              { email: "demo@botanikart.in", pass: "demo123" },
              { email: "priya@botanikart.in", pass: "priya123" },
              { email: "admin@botanikart.in", pass: "admin123" },
            ].map((cred) => (
              <div
                key={cred.email}
                className="flex items-center justify-between text-white/50 text-xs"
              >
                <span className="font-mono">{cred.email}</span>
                <span className="font-mono text-green-400/60">{cred.pass}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
