import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScanLine, X, Loader2, Sparkles, Leaf, Droplets, Sun, FlaskConical, IndianRupee } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlantProduct {
  name: string;
  category: string;
  price: number;
  difficulty?: string;
  type?: string;
  garden?: string;
}

interface CostAnalysis {
  text: string;
  plantName: string;
}

// ─── Context for modal state ─────────────────────────────────────────────────

interface CostAnalyzerContextType {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  analysis: CostAnalysis | null;
  analyzePlant: (product: PlantProduct) => void;
  closeModal: () => void;
}

const CostAnalyzerContext = createContext<CostAnalyzerContextType | null>(null);

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// ─── Provider ────────────────────────────────────────────────────────────────

export function PlantCostAnalyzerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<CostAnalysis | null>(null);

  const analyzePlant = useCallback(async (product: PlantProduct) => {
    setIsOpen(true);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const prompt = `You are a plant care expert. Provide a detailed monthly cost and expense breakdown to grow a "${product.name}" (Category: ${product.category}${product.difficulty ? `, Difficulty: ${product.difficulty}` : ""}${product.type ? `, Type: ${product.type}` : ""}).

Include these sections with estimated costs in Indian Rupees (₹):
1. 💧 Water Requirements — frequency and monthly cost
2. 🪴 Soil & Potting Mix — type needed and replacement cost
3. 🧪 Fertilizer & Nutrients — type, frequency, monthly cost
4. ☀️ Sunlight Requirements — hours needed, any grow light costs
5. 🛡️ Pest Control — preventive measures and cost
6. 📦 Other Supplies — pots, tools, etc.

End with a "💰 Estimated Monthly Budget: ₹XXX - ₹XXX" summary line.

Keep it practical, concise, and formatted with clear headings and bullet points.`;

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Gemini quota hit");
        }
        throw new Error(`API request failed (${response.status})`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No response received from AI");
      }

      setAnalysis({ text, plantName: product.name });
    } catch (err: any) {
      // 🚀 Fallback to Groq if Gemini fails
      try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }]
          })
        });

        if (!groqResponse.ok) {
          throw new Error(`Groq request failed (${groqResponse.status})`);
        }

        const groqData = await groqResponse.json();
        const fallbackText = groqData?.choices?.[0]?.message?.content;

        if (!fallbackText) {
          throw new Error("No response received from Groq AI fallback");
        }

        setAnalysis({ text: fallbackText, plantName: product.name });

      } catch (fallbackErr: any) {
        // Both APIs failed
        setError("Both primary and fallback AI services failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay cleanup so exit animation can play
    setTimeout(() => {
      setAnalysis(null);
      setError(null);
    }, 300);
  }, []);

  return (
    <CostAnalyzerContext.Provider value={{ isOpen, isLoading, error, analysis, analyzePlant, closeModal }}>
      {children}
    </CostAnalyzerContext.Provider>
  );
}

export function useCostAnalyzer() {
  const ctx = useContext(CostAnalyzerContext);
  if (!ctx) throw new Error("PlantCostButton must be used within PlantCostAnalyzerProvider");
  return ctx;
}

// ─── Scan Icon Button ────────────────────────────────────────────────────────

export function PlantCostButton({ product }: { product: PlantProduct }) {
  const { analyzePlant } = useCostAnalyzer();

  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        analyzePlant(product);
      }}
      className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
      style={{
        background: "rgba(74,222,128,0.25)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(74,222,128,0.4)",
      }}
      title={`Analyze growth cost for ${product.name}`}
    >
      <ScanLine className="w-4 h-4 text-green-400" />
    </motion.button>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatAnalysisText(text: string) {
  // Split into lines and render with basic formatting
  return text.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={i} className="h-2" />;

    // Headings (lines starting with ## or bold **)
    if (trimmed.startsWith("## ") || trimmed.startsWith("**")) {
      const cleaned = trimmed.replace(/^##\s*/, "").replace(/\*\*/g, "");
      return (
        <h4 key={i} className="text-green-400 font-semibold mt-4 mb-1 text-sm flex items-center gap-2">
          {cleaned}
        </h4>
      );
    }

    // Budget summary line
    if (trimmed.includes("Estimated Monthly Budget") || trimmed.includes("💰")) {
      const cleaned = trimmed.replace(/\*\*/g, "");
      return (
        <div
          key={i}
          className="mt-4 p-3 rounded-xl text-sm font-semibold text-green-300"
          style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}
        >
          {cleaned}
        </div>
      );
    }

    // Bullet points
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.match(/^\d+\.\s/)) {
      const cleaned = trimmed.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, "").replace(/\*\*/g, "");
      return (
        <div key={i} className="flex items-start gap-2 text-white/70 text-sm ml-2 mb-0.5">
          <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
          <span>{cleaned}</span>
        </div>
      );
    }

    // Regular text
    const cleaned = trimmed.replace(/\*\*/g, "");
    return (
      <p key={i} className="text-white/60 text-sm mb-0.5">
        {cleaned}
      </p>
    );
  });
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export function PlantCostModal() {
  const { isOpen, isLoading, error, analysis, closeModal } = useCostAnalyzer();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(160deg, rgba(13,43,24,0.98) 0%, rgba(7,26,14,0.99) 100%)",
              border: "1px solid rgba(74,222,128,0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74,222,128,0.1)",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)",
                transform: "translate(30%,-30%)",
              }}
            />

            {/* Header */}
            <div
              className="relative flex items-center justify-between p-5 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  <Sparkles className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3
                    className="text-white text-base"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                  >
                    {isLoading ? "Analyzing..." : analysis?.plantName ? `${analysis.plantName}` : "Plant Cost Analysis"}
                  </h3>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <X className="w-4 h-4 text-white/60" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="relative overflow-y-auto p-5" style={{ maxHeight: "calc(85vh - 80px)" }}>
              {/* Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-5"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(74,222,128,0.2)", filter: "blur(10px)" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-1">Consulting our AI botanist...</p>
                    <p className="text-white/30 text-xs">Calculating water, soil, fertilizer & more</p>
                  </div>

                  {/* Animated info chips */}
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {[
                      { icon: Droplets, label: "Water", delay: 0 },
                      { icon: Leaf, label: "Soil", delay: 0.2 },
                      { icon: FlaskConical, label: "Fertilizer", delay: 0.4 },
                      { icon: Sun, label: "Sunlight", delay: 0.6 },
                      { icon: IndianRupee, label: "Budget", delay: 0.8 },
                    ].map(({ icon: Icon, label, delay }) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                        style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
                      >
                        <Icon className="w-3 h-3 text-green-400" />
                        <span className="text-white/50">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.3)" }}
                  >
                    <X className="w-7 h-7 text-red-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm mb-1">Analysis Failed</p>
                    <p className="text-white/40 text-xs max-w-xs">{error}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-5 py-2 rounded-full text-sm text-white"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}

              {/* Analysis Result */}
              {analysis && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {formatAnalysisText(analysis.text)}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
