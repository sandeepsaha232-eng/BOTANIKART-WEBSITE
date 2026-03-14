import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  Heart,
  Filter,
  ChevronDown,
  X,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const housePlantsImg = "https://images.unsplash.com/photo-1758373148976-5fe6deb51916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3VzZXBsYW50cyUyMHBvdHRlZCUyMGdyZWVufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const herbImg = "https://images.unsplash.com/photo-1726924245031-45478195b89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiJTIwZ2FyZGVuJTIwbWVkaWNpbmFsJTIwcGxhbnRzfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const flowerImg = "https://images.unsplash.com/photo-1708281105381-44c700c1b0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBibG9vbWluZyUyMGdhcmRlbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const seedsImg = "https://images.unsplash.com/photo-1752051665195-a5c2781361fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHBhY2tldHMlMjBnYXJkZW5pbmclMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const exoticImg = "https://images.unsplash.com/photo-1759382904628-91bd4b922460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGV4b3RpYyUyMHBsYW50JTIwcmFyZXxlbnwxfHx8fDE3NzM0ODM2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const cropsImg = "https://images.unsplash.com/photo-1760549255949-767d18981890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZSUyMGNyb3BzJTIwaGFydmVzdCUyMGZhcm18ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const products = [
  { id: 1, name: "Golden Pothos", category: "Indoor", type: "plant", price: 349, originalPrice: 499, rating: 4.8, reviews: 234, tag: "Bestseller", tagColor: "#4ade80", img: housePlantsImg, garden: "Lalbagh, Bengaluru", difficulty: "Easy", available: true },
  { id: 2, name: "Tulsi Herb Kit", category: "Medicinal", type: "plant", price: 199, originalPrice: 299, rating: 4.9, reviews: 512, tag: "Organic", tagColor: "#34d399", img: herbImg, garden: "NBRI, Lucknow", difficulty: "Easy", available: true },
  { id: 3, name: "Marigold Seeds (50g)", category: "Flower", type: "seed", price: 89, originalPrice: 129, rating: 4.7, reviews: 189, tag: "Seasonal", tagColor: "#d4af37", img: flowerImg, garden: "Sanjay Gandhi NP", difficulty: "Easy", available: true },
  { id: 4, name: "Bird of Paradise", category: "Rare", type: "plant", price: 1299, originalPrice: 1799, rating: 4.9, reviews: 87, tag: "Rare", tagColor: "#c084fc", img: exoticImg, garden: "AGCBBG, Kolkata", difficulty: "Expert", available: true },
  { id: 5, name: "Monsoon Seed Box", category: "Vegetable", type: "seed", price: 599, originalPrice: 799, rating: 4.8, reviews: 341, tag: "Bundle", tagColor: "#60a5fa", img: seedsImg, garden: "Multiple Gardens", difficulty: "Beginner", available: true },
  { id: 6, name: "Cherry Tomato Plant", category: "Vegetable", type: "plant", price: 249, originalPrice: 349, rating: 4.6, reviews: 156, tag: "Fresh", tagColor: "#f87171", img: cropsImg, garden: "NBRI, Lucknow", difficulty: "Easy", available: true },
  { id: 7, name: "Peace Lily", category: "Indoor", type: "plant", price: 449, originalPrice: 599, rating: 4.7, reviews: 298, tag: "Air Purifier", tagColor: "#4ade80", img: housePlantsImg, garden: "Lalbagh, Bengaluru", difficulty: "Easy", available: false },
  { id: 8, name: "Neem Seeds Pack", category: "Medicinal", type: "seed", price: 149, originalPrice: 199, rating: 4.5, reviews: 112, tag: "Medicinal", tagColor: "#86efac", img: seedsImg, garden: "NBRI, Lucknow", difficulty: "Moderate", available: true },
  { id: 9, name: "Lavender Bundle", category: "Flower", type: "plant", price: 549, originalPrice: 749, rating: 4.9, reviews: 203, tag: "Fragrant", tagColor: "#c084fc", img: flowerImg, garden: "Sanjay Gandhi NP", difficulty: "Moderate", available: true },
  { id: 10, name: "Bougainvillea Plant", category: "Outdoor", type: "plant", price: 399, originalPrice: 599, rating: 4.8, reviews: 420, tag: "Vibrant", tagColor: "#f472b6", img: flowerImg, garden: "Lalbagh, Bengaluru", difficulty: "Easy", available: true },
  { id: 11, name: "Aloe Vera", category: "Outdoor", type: "plant", price: 199, originalPrice: 249, rating: 4.6, reviews: 890, tag: "Hardy", tagColor: "#34d399", img: housePlantsImg, garden: "NBRI, Lucknow", difficulty: "Beginner", available: true },
];

const tabs = ["All", "Plants", "Seeds"];
const categories = ["All Categories", "Indoor", "Outdoor", "Medicinal", "Vegetable", "Flower", "Rare"];
const difficulties = ["All Levels", "Beginner", "Easy", "Moderate", "Expert"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Newest"];

export function Shop() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<"idle" | "checking" | "available" | "invalid">("idle");
  const { addItem } = useCart();

  const handlePincodeCheck = () => {
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setDeliveryStatus("invalid");
      return;
    }
    setDeliveryStatus("checking");
    setTimeout(() => {
      setDeliveryStatus("available");
    }, 800);
  };

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      img: product.img,
      category: product.category,
    });
    setAddedToCart((prev) => [...prev, product.id]);
    setTimeout(() => setAddedToCart((prev) => prev.filter((x) => x !== product.id)), 2000);
  };

  const filtered = products.filter((p) => {
    const matchTab = activeTab === "All" || (activeTab === "Plants" ? p.type === "plant" : p.type === "seed");
    const matchCat = selectedCategory === "All Categories" || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === "All Levels" || p.difficulty === selectedDifficulty;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchCat && matchDiff && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Top Rated") return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section className="py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={cropsImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,26,14,0.8), rgba(7,26,14,1))" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-green-400 text-sm tracking-widest uppercase">Our Collection</span>
            <h1 className="text-white mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
              Plants & Seeds Shop
            </h1>
            <p className="text-white/50 max-w-xl mx-auto">
              Every item grown in India's botanical gardens — certified, organic, and botanist-approved.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search + Sort bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search plants, seeds, herbs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 rounded-2xl text-sm text-white/80 outline-none cursor-pointer"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}
            >
              {sortOptions.map((opt) => <option key={opt} value={opt} style={{ background: "#0d2b18" }}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm text-white sm:hidden"
            style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}
          >
            <SlidersHorizontal className="w-4 h-4 text-green-400" />
            Filters
          </motion.button>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:block w-64 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-4">
              {/* Type tabs */}
              <div className="rounded-2xl p-4" style={glass}>
                <h3 className="text-white/80 text-sm mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-green-400" /> Product Type
                </h3>
                <div className="flex flex-col gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all"
                      style={{
                        background: activeTab === tab ? "rgba(74,222,128,0.15)" : "transparent",
                        color: activeTab === tab ? "#4ade80" : "rgba(255,255,255,0.5)",
                        border: activeTab === tab ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent",
                      }}
                    >
                      {tab}
                      {activeTab === tab && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="rounded-2xl p-4" style={glass}>
                <h3 className="text-white/80 text-sm mb-3">Category</h3>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="text-left px-3 py-1.5 rounded-lg text-sm transition-all"
                      style={{
                        background: selectedCategory === cat ? "rgba(74,222,128,0.1)" : "transparent",
                        color: selectedCategory === cat ? "#4ade80" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="rounded-2xl p-4" style={glass}>
                <h3 className="text-white/80 text-sm mb-3">Difficulty Level</h3>
                <div className="flex flex-col gap-1.5">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className="text-left px-3 py-1.5 rounded-lg text-sm transition-all"
                      style={{
                        background: selectedDifficulty === d ? "rgba(74,222,128,0.1)" : "transparent",
                        color: selectedDifficulty === d ? "#4ade80" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pincode Checker */}
              <div className="rounded-2xl p-4" style={glass}>
                <h3 className="text-white/80 text-sm mb-3">📦 Check Delivery</h3>
                <input
                  type="text"
                  placeholder="Enter pincode..."
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setDeliveryStatus("idle");
                  }}
                  className="w-full px-3 py-2 rounded-xl text-sm text-white placeholder-white/30 outline-none mb-3"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={handlePincodeCheck}
                  disabled={deliveryStatus === "checking"}
                  className="w-full py-2 rounded-xl text-sm text-white transition-colors"
                  style={{ 
                    background: deliveryStatus === "available" ? "rgba(74,222,128,0.4)" : "rgba(74,222,128,0.2)", 
                    border: "1px solid rgba(74,222,128,0.3)" 
                  }}
                >
                  {deliveryStatus === "checking" ? "Checking..." : deliveryStatus === "available" ? "Delivery Available ✓" : "Check Availability"}
                </motion.button>
                {deliveryStatus === "invalid" && (
                  <p className="text-red-400 text-xs mt-2 text-center">Please enter a valid 6-digit pincode.</p>
                )}
              </div>
            </div>
          </motion.aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-white/40 text-sm">{sorted.length} products found</span>
              <div className="flex gap-2">
                {[activeTab !== "All" && activeTab, selectedCategory !== "All Categories" && selectedCategory, selectedDifficulty !== "All Levels" && selectedDifficulty].filter(Boolean).map((chip) => (
                  <span key={chip as string} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-green-400" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
                    {chip}
                    <button onClick={() => {
                      if (chip === activeTab) setActiveTab("All");
                      if (chip === selectedCategory) setSelectedCategory("All Categories");
                      if (chip === selectedDifficulty) setSelectedDifficulty("All Levels");
                    }}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>

            {sorted.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="text-white/60 mb-2">No plants found</h3>
                <p className="text-white/30 text-sm">Try adjusting your filters</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {sorted.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="rounded-3xl overflow-hidden cursor-pointer group"
                      style={glass}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,26,14,0.7) 0%, transparent 60%)" }} />

                        {/* Tag */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${product.tagColor}25`, border: `1px solid ${product.tagColor}50`, color: product.tagColor, backdropFilter: "blur(8px)" }}>
                          {product.tag}
                        </div>

                        {/* Availability */}
                        {!product.available && (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(7,26,14,0.7)", backdropFilter: "blur(4px)" }}>
                            <span className="px-4 py-2 rounded-full text-sm text-white/70" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                              Pre-Order
                            </span>
                          </div>
                        )}

                        {/* Wishlist */}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all"
                          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
                        >
                          <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-red-400 text-red-400" : "text-white/60"}`} />
                        </motion.button>

                        {/* Garden */}
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-xs text-white/60" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}>
                          🏛️ {product.garden}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-green-400 text-xs">{product.category} • {product.difficulty}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-white/50 text-xs">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                          {product.name}
                        </h3>
                        <p className="text-white/30 text-xs mb-3">({product.reviews} reviews)</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-green-400 font-medium">₹{product.price}</span>
                            <span className="text-white/25 text-xs line-through ml-2">₹{product.originalPrice}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => product.available && addToCart(product)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white transition-all"
                            style={addedToCart.includes(product.id)
                              ? { background: "rgba(74,222,128,0.3)", border: "1px solid rgba(74,222,128,0.5)", color: "#4ade80" }
                              : { background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.3)" }
                            }
                          >
                            {addedToCart.includes(product.id) ? (
                              <><CheckCircle2 className="w-3 h-3" /> Added!</>
                            ) : (
                              <><ShoppingCart className="w-3 h-3" /> Add</>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Plant Care Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-4"
          style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <Leaf className="w-10 h-10 text-green-400 flex-shrink-0" />
          <div>
            <h4 className="text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Every order includes a Plant Care Card
            </h4>
            <p className="text-white/50 text-sm">
              Detailed sunlight requirements, watering schedule, soil type, and seasonal care tips — handwritten by our certified botanists at each garden.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm text-white"
            style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)", boxShadow: "0 4px 15px rgba(74,222,128,0.3)" }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
