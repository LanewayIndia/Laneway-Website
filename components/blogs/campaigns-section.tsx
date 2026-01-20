"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, ArrowUpRight } from "lucide-react"

const campaigns = [
  {
    title: "AI Transformation Initiative 2025",
    description: "A comprehensive campaign helping 50+ businesses integrate AI into their operations.",
    date: "Q4 2025",
    results: "40% average efficiency increase",
    href: "/blogs/ai-transformation-2025",
  },
  {
    title: "Startup Growth Accelerator",
    description: "Supporting early-stage startups with funding, mentorship, and strategic resources.",
    date: "Ongoing",
    results: "15 startups funded",
    href: "/blogs/startup-accelerator",
  },
  {
    title: "Digital Marketing Excellence",
    description: "Multi-channel marketing campaigns leveraging AI-powered targeting and optimization.",
    date: "Q3 2025",
    results: "300% ROI average",
    href: "/blogs/marketing-excellence",
  },
]

export function CampaignsSection() {
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
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">Our Campaigns</h2>
          <p className="text-pumice text-lg max-w-2xl">
            Discover our strategic initiatives and the impact they create for businesses worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <motion.article
              key={campaign.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={campaign.href} className="group block h-full">
                <div className="bg-background border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
                  <div className="flex items-center gap-2 text-sm text-gold mb-4">
                    <Calendar size={14} />
                    <span>{campaign.date}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-snow mb-3 group-hover:text-gold transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-pumice text-sm leading-relaxed mb-4">{campaign.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gold font-medium">{campaign.results}</span>
                    <ArrowUpRight
                      size={18}
                      className="text-pumice group-hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
                    />
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
