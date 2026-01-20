"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"

const blogs = [
  {
    title: "The Future of AI in Business Operations",
    excerpt: "Exploring how artificial intelligence is reshaping the way companies operate and make decisions.",
    category: "AI & Technology",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    href: "/blogs/ai-business-operations",
  },
  {
    title: "Building Scalable MVPs: A Complete Guide",
    excerpt: "Learn the essential strategies for creating minimum viable products that can grow with your vision.",
    category: "Startup",
    date: "Jan 8, 2026",
    readTime: "8 min read",
    href: "/blogs/scalable-mvps",
  },
  {
    title: "Digital Marketing Trends for 2026",
    excerpt: "Stay ahead of the curve with our comprehensive analysis of emerging marketing strategies.",
    category: "Marketing",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    href: "/blogs/marketing-trends-2026",
  },
]

export function BlogsPreview() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Insights</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-snow">Latest Blogs</h2>
          </div>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm text-pumice hover:text-snow transition-colors duration-300"
          >
            <span>View All</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={blog.href} className="group block h-full">
                <div className="glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 hover:border-gold/20">
                  <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-light/10" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-snow/90 text-background text-xs font-medium rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="absolute top-4 right-4 text-snow opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-medium text-snow mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-pumice text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-pumice/70">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
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
