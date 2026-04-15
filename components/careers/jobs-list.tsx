"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { jobs, Job } from "@/lib/jobs"
import { useState } from "react"
import { ApplicationForm } from "@/components/careers/application-form"

export function JobsList() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">
            Open Positions
          </h2>
          <p className="text-pumice text-lg max-w-2xl">
            Find your perfect role and become part of something extraordinary.
          </p>
        </motion.div>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                className="group block w-full text-left cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-snow mb-2 group-hover:text-gold transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-pumice">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-pumice group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0"
                    />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* AnimatePresence here so exit animation fires when modal closes */}
        <AnimatePresence>
          {selectedJob && (
            <ApplicationForm
              key={selectedJob.slug}
              jobTitle={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
