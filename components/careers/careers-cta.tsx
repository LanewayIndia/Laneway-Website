"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CareersCTA() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitMessage("Application submitted successfully!")
        setShowForm(false)
      } else {
        setSubmitMessage("Failed to submit application. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4 text-balance">
            {`Don't See Your Perfect Role?`}
          </h2>
          <p className="text-pumice text-lg max-w-2xl mx-auto mb-8">
            {`We're always looking for talented individuals. Send us your resume and let's start a conversation.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-gold/50 text-snow hover:bg-gold/10 hover:border-gold font-semibold px-6 py-3 rounded-full bg-transparent"
            >
              <a href="mailto:hr@laneway.ai">
                <Mail size={18} className="mr-2" />
                Email HR Team
              </a>
            </Button>

            <Button
              onClick={() => setShowForm(!showForm)}
              className={`font-semibold px-6 py-3 rounded-full ${
                showForm ? "bg-snow text-background hover:bg-pumice" : "bg-gold hover:bg-gold-light text-background"
              }`}
            >
              <FileText size={18} className="mr-2" />
              {showForm ? "Close Form" : "Submit Application"}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 48 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-2xl font-semibold text-snow">Application Form</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 text-pumice hover:text-snow transition-colors"
                    aria-label="Close form"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-pumice mb-2">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        className="bg-card border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-pumice mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-card border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-pumice mb-2">
                      Position of Interest
                    </label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      placeholder="e.g., Software Engineer, Designer"
                      className="bg-card border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-pumice mb-2">
                      Portfolio / LinkedIn URL
                    </label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      placeholder="https://..."
                      className="bg-card border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-pumice mb-2">
                      Resume (PDF, DOC, DOCX - Max 5MB)
                    </label>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="bg-card border-border text-snow file:bg-gold file:text-background file:border-none file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-pumice mb-2">
                      Cover Letter (PDF, DOC, DOCX - Max 5MB)
                    </label>
                    <Input
                      id="coverLetterFile"
                      name="coverLetterFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="bg-card border-border text-snow file:bg-gold file:text-background file:border-none file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer"
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetterText" className="block text-sm font-medium text-pumice mb-2">
                      Cover Letter (Text)
                    </label>
                    <Textarea
                      id="coverLetterText"
                      name="coverLetterText"
                      placeholder="Tell us about yourself and why you'd be a great fit..."
                      rows={4}
                      className="bg-card border-border text-snow placeholder:text-pumice/50 focus:border-gold resize-none"
                    />
                  </div>

                  {submitMessage && (
                    <p className={`text-sm ${submitMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                      {submitMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 rounded-full disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
