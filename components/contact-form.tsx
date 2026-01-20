"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-snow mb-6">Contact Information</h2>
            <p className="text-pumice text-lg mb-10 leading-relaxed">
              {`Have a project in mind or just want to learn more about how we can help? Reach out through any of these
              channels and we'll get back to you within 24 hours.`}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Email Us</h3>
                  <a href="mailto:hello@laneway.ai" className="text-pumice hover:text-gold transition-colors">
                    hello@laneway.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Call Us</h3>
                  <a href="tel:+1234567890" className="text-pumice hover:text-gold transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Location</h3>
                  <p className="text-pumice">Global Operations</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-heading text-2xl font-semibold text-snow mb-6">Send a Message</h2>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-pumice mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-pumice mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-pumice mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-pumice mb-2">
                    Company (Optional)
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-pumice mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-pumice mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="bg-background border-border text-snow placeholder:text-pumice/50 focus:border-gold resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 rounded-full"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
