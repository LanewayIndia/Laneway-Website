"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

const stats = [
  { icon: TrendingUp, label: "Revenue Growth", value: "250%", description: "Average client revenue increase" },
  { icon: Users, label: "Clients Served", value: "100+", description: "Businesses transformed" },
  { icon: Target, label: "Campaign Success", value: "95%", description: "Campaigns exceeding targets" },
  { icon: Zap, label: "Efficiency Gains", value: "60%", description: "Process optimization rate" },
]

export function AnalyticsSection() {
  return (
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
  )
}
