"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, Play, FileText } from "lucide-react"
import Image from "next/image"


const categories = ["All", "AI & Technology", "Marketing", "Startup", "Research", "Video"]

const blogs = [
  {
    type: "written",
    title: "The Future of AI in Business Operations",
    excerpt: "Exploring how artificial intelligence is reshaping the way companies operate and make decisions.",
    category: "AI & Technology",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    href: "/blogs/ai-business-operations",
    image: "/FABO.png",
  },
  {
    type: "video",
    title: "Building Your First AI-Powered Application",
    excerpt: "A step-by-step video guide to creating intelligent applications with modern AI frameworks.",
    category: "AI & Technology",
    date: "Coming Soon",
    href: "/blogs/ai-powered-application",
    image: "/BFAPA.png",
  },
  {
    type: "written",
    title: "Digital Marketing Trends for 2026",
    excerpt: "Stay ahead of the curve with our comprehensive analysis of emerging marketing strategies.",
    category: "Marketing",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    href: "/blogs/marketing-trends-2026",
    image: "/DMT.png",
  },
  {
    type: "written",
    title: "Building Scalable MVPs: A Complete Guide",
    excerpt: "Learn the essential strategies for creating minimum viable products that can grow with your vision.",
    category: "Startup",
    date: "Jan 3, 2026",
    readTime: "8 min read",
    href: "/blogs/scalable-mvps",
    image: "/BSM.png",
  },
  {
    type: "video",
    title: "Startup Funding Masterclass",
    excerpt: "Insights from our investment team on what makes a startup fundable and how to pitch successfully.",
    category: "Startup",
    date: "Coming Soon",
    href: "/blogs/startup-funding-masterclass",
    image: "/SFM.png",
  },
  {
    type: "written",
    title: "Research: AI Adoption in SMBs",
    excerpt: "Our comprehensive research study on how small and medium businesses are adopting AI technologies.",
    category: "Research",
    date: "Dec 20, 2025",
    readTime: "10 min read",
    href: "/blogs/ai-adoption-smbs",
    image: "/AAIS.png",
  },
]

export function BlogsGrid() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredBlogs = blogs.filter((blog) => {
    if (activeCategory === "All") return true
    if (activeCategory === "Video") return blog.type === "video"
    return blog.category === activeCategory
  })

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-6">Research & Insights</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category
                    ? "bg-gold text-background"
                    : "bg-background border border-border text-pumice hover:border-gold/50 hover:text-snow"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              layout
            >
              <Link href={blog.href} className="group block h-full">
                <div className="bg-background border border-border rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/10 to-black/40" />

                    {/* Category + Video Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 bg-gold/90 text-background text-xs font-medium rounded-full">
                        {blog.category}
                      </span>

                      {blog.type === "video" && (
                        <span className="p-1.5 bg-background/90 rounded-full">
                          <Play size={12} className="text-gold" fill="currentColor" />
                        </span>
                      )}
                    </div>

                    {/* Video Play Button Overlay */}
                    {blog.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={28} className="text-background ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-snow mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-pumice text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-pumice">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        {/* <Clock size={14} /> */}
                        {blog.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
