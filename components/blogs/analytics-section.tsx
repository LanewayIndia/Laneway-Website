"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

const stats = [
  { icon: TrendingUp, label: "Revenue Growth", value: "250%", description: "Average client revenue increase" },
  { icon: Users, label: "Clients Served", value: "100+", description: "Businesses transformed" },
  { icon: Target, label: "Campaign Success", value: "95%", description: "Campaigns exceeding targets" },
  { icon: Zap, label: "Efficiency Gains", value: "60%", description: "Process optimization rate" },
]

const NEWS_API_KEY = "41db5110be954bb88ec5e3b41ca9d57c" // 👈 replace this

const tabs = [
  { label: "⚡ Tech News", query: "technology india" },
  { label: "🚀 Startup Funding", query: "startup funding india" },
  { label: "📈 India Business", query: "india business" },
]

interface Article {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
}

export function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchNews(tabs[activeTab].query)
  }, [activeTab])

  async function fetchNews(query: string) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=9&apiKey=${NEWS_API_KEY}`
      )
      const data = await res.json()
      if (data.articles) {
        setArticles(data.articles)
      } else {
        setError("No articles found.")
      }
    } catch (err) {
      setError("Failed to load news. Check your API key.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Existing Analytics Stats Section ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">Analytics</h2>
            <p className="text-pumice text-lg max-w-2xl mx-auto">
              Data-driven insights from our work across industries and projects.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-gold" />
                </div>
                <div className="font-heading text-3xl font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-snow font-medium mb-1">{stat.label}</div>
                <div className="text-pumice text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Live Indian Tech & Startup News ── */}
      <section className="py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-pumice text-xs tracking-widest uppercase mb-3">── Live Updates ──</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">
              Indian Tech & <span className="text-gold">Startup News</span>
            </h2>
            <p className="text-pumice text-lg max-w-2xl mx-auto">
              Real-time funding news, startup stories & tech updates from India
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-gold text-black"
                    : "bg-card border border-border text-pumice hover:border-gold/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-pumice py-20">Loading news...</div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-400 py-20">{error}</div>
          )}

          {/* News Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all hover:-translate-y-1 block"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-44 object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <div className="p-5">
                    <p className="text-gold text-xs mb-2">
                      {new Date(article.publishedAt).toDateString()} · {article.source.name}
                    </p>
                    <h3 className="text-snow font-semibold text-sm leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-pumice text-xs leading-relaxed">
                      {article.description?.slice(0, 100)}...
                    </p>
                    <p className="text-gold text-xs mt-3">Read more →</p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
