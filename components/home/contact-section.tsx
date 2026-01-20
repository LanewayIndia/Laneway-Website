"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Get Started</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow mb-6 text-balance">
            Ready to Transform
            <br />
            Your Business?
          </h2>
          <p className="text-lg text-pumice max-w-xl mx-auto mb-12 font-light">
            {`Let's discuss how Laneway can help you achieve your digital goals.`}
          </p>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 ${
              isOpen ? "bg-snow text-background hover:bg-pumice" : "bg-snow text-background hover:bg-gold"
            }`}
          >
            <span>{isOpen ? "Close Form" : "Contact Us"}</span>
            {!isOpen && (
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 48 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-2xl p-8 sm:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-heading text-2xl font-medium text-snow">Send us a message</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-pumice hover:text-snow transition-colors rounded-full hover:bg-glass-highlight"
                    aria-label="Close form"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs tracking-wide uppercase text-pumice mb-3">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="bg-background/50 border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 rounded-xl h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs tracking-wide uppercase text-pumice mb-3">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/50 border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs tracking-wide uppercase text-pumice mb-3">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="bg-background/50 border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 rounded-xl h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs tracking-wide uppercase text-pumice mb-3">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="bg-background/50 border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 resize-none rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-snow hover:bg-gold text-background font-medium py-4 rounded-full transition-all duration-300"
                  >
                    <Send size={16} />
                    <span>Send Message</span>
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-glass-border">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Mail size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-pumice">Info@laneway.in</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-pumice">+91 9961348942</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <MessageSquare size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-pumice">Live Chat Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
