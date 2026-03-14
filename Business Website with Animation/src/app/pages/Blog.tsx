import { useState } from "react";
import { motion } from "motion/react";
import { Search, Clock, User, ArrowRight, Tag, BookOpen } from "lucide-react";

const herbImg = "https://images.unsplash.com/photo-1726924245031-45478195b89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiJTIwZ2FyZGVuJTIwbWVkaWNpbmFsJTIwcGxhbnRzfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const flowerImg = "https://images.unsplash.com/photo-1708281105381-44c700c1b0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBibG9vbWluZyUyMGdhcmRlbiUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzQ4MzYzOXww&ixlib=rb-4.1.0&q=80&w=1080";
const cropsImg = "https://images.unsplash.com/photo-1760549255949-767d18981890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZSUyMGNyb3BzJTIwaGFydmVzdCUyMGZhcm18ZW58MXx8fHwxNzczNDgzNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const housePlantsImg = "https://images.unsplash.com/photo-1758373148976-5fe6deb51916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBob3VzZXBsYW50cyUyMHBvdHRlZCUyMGdyZWVufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";
const exoticImg = "https://images.unsplash.com/photo-1759382904628-91bd4b922460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGV4b3RpYyUyMHBsYW50JTIwcmFyZXxlbnwxfHx8fDE3NzM0ODM2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const seedsImg = "https://images.unsplash.com/photo-1752051665195-a5c2781361fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkcyUyMHBhY2tldHMlMjBnYXJkZW5pbmclMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzQ4MzYzOHww&ixlib=rb-4.1.0&q=80&w=1080";

const glass = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const posts = [
  {
    id: 1,
    title: "10 Best Indoor Plants for Indian Homes in 2026",
    excerpt: "Transform your living space with these botanist-recommended indoor plants that thrive in India's diverse climates — from humid coastal homes to dry northern apartments.",
    category: "Indoor Plants",
    author: "Dr. Meera Krishnan",
    date: "Mar 10, 2026",
    readTime: "6 min read",
    img: housePlantsImg,
    tags: ["Indoor", "Beginner", "Air Purifying"],
    featured: true,
  },
  {
    id: 2,
    title: "Monsoon Gardening Guide: Seeds to Plant in June-September",
    excerpt: "The monsoon season is a golden opportunity for gardeners. Discover which seeds to sow, soil preparation tips, and drainage hacks from our NBRI experts.",
    category: "Seasonal Guide",
    author: "Arjun Nair",
    date: "Mar 5, 2026",
    readTime: "8 min read",
    img: cropsImg,
    tags: ["Monsoon", "Seeds", "Seasonal"],
    featured: false,
  },
  {
    id: 3,
    title: "Tulsi: The Sacred Herb with 100 Scientific Benefits",
    excerpt: "Ocimum tenuiflorum — India's most revered herb isn't just cultural heritage. Backed by modern science, Tulsi offers extraordinary medicinal properties your family needs.",
    category: "Medicinal Herbs",
    author: "Dr. Meera Krishnan",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    img: herbImg,
    tags: ["Medicinal", "Tulsi", "Ayurveda"],
    featured: false,
  },
  {
    id: 4,
    title: "How to Start a Balcony Garden from Scratch",
    excerpt: "No space? No problem. Our botanists walk you through creating a thriving balcony garden with container plants, vertical gardening, and space-efficient seed varieties.",
    category: "Beginner Guide",
    author: "Ritu Sharma",
    date: "Feb 20, 2026",
    readTime: "12 min read",
    img: flowerImg,
    tags: ["Beginner", "Balcony", "Container"],
    featured: false,
  },
  {
    id: 5,
    title: "5 Rare Exotic Plants Available Only from Botanical Gardens",
    excerpt: "Did you know India's botanical gardens house plant species not found anywhere else commercially? Here are 5 extraordinary species now available through BOTANIKART.",
    category: "Rare & Exotic",
    author: "Arjun Nair",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    img: exoticImg,
    tags: ["Rare", "Exotic", "Collectible"],
    featured: false,
  },
  {
    id: 6,
    title: "Seed Saving 101: Preserve Your Garden's Future",
    excerpt: "Learn the ancient art of seed saving from our botanists. Proper harvesting, drying, and storage techniques to preserve heirloom varieties across seasons.",
    category: "Seed Knowledge",
    author: "Dr. Meera Krishnan",
    date: "Feb 8, 2026",
    readTime: "9 min read",
    img: seedsImg,
    tags: ["Seeds", "DIY", "Preservation"],
    featured: false,
  },
];

const allCategories = ["All", "Indoor Plants", "Seasonal Guide", "Medicinal Herbs", "Beginner Guide", "Rare & Exotic", "Seed Knowledge"];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || searchQuery);

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section className="py-16 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
          <span className="text-green-400 text-sm tracking-widest uppercase">Knowledge Hub</span>
          <h1 className="text-white mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
            The Botanical Journal
          </h1>
          <p className="text-white/50 mb-8">
            Expert gardening tips, planting guides, seasonal care advice, and plant science — written by our team of certified botanists.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles, tips, plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
            />
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={activeCategory === cat
                ? { background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.5)", color: "#4ade80" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
              }
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {featured && activeCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="mb-10 rounded-3xl overflow-hidden cursor-pointer group"
            style={glass}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-72 md:h-auto">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, rgba(7,26,14,0.6))" }} />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs text-green-400" style={{ background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.4)", backdropFilter: "blur(8px)" }}>
                  ⭐ Featured
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs text-green-400" style={{ background: "rgba(74,222,128,0.1)" }}>
                    {featured.category}
                  </span>
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {featured.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <User className="w-3.5 h-3.5" />
                    {featured.author} · {featured.date}
                  </div>
                  <motion.button
                    whileHover={{ gap: "10px" }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white"
                    style={{ background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.3)" }}
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        {rest.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-3xl overflow-hidden cursor-pointer group"
                style={glass}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,26,14,0.7) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs text-green-400" style={{ background: "rgba(74,222,128,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(74,222,128,0.3)" }}>
                    {post.category}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/50 text-xs">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white mb-2 line-clamp-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white/40" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-white/30 text-xs flex items-center gap-1">
                      <User className="w-3 h-3" /> {post.author}
                    </div>
                    <span className="text-white/30 text-xs">{post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-white/40">No articles found</h3>
            <p className="text-white/20 text-sm mt-2">Try a different search or category</p>
          </motion.div>
        )}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 rounded-3xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.12), rgba(7,26,14,0.5))", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <div className="text-4xl mb-3">📬</div>
          <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700 }}>
            Never Miss a Planting Season
          </h3>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            Get weekly gardening tips, seasonal planting guides, and early access to rare plant arrivals — straight in your inbox.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-2xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-3 rounded-2xl text-sm text-white font-medium"
              style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
