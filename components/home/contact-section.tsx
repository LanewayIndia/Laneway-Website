"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Mail, Phone, MessageSquare, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Chatbot } from "../chatbot"

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [loading, setLoading] = useState(false) //loading state for form submission
  const [message, setMessage] = useState("") //success or failed sending message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  }) //form data state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  } //handle input changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }) //send form data to api route

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage("Message sent successfully! We'll get back to you soon.")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        }) 
        setTimeout(() => {
          setIsOpen(false)
          setMessage("")
        }, 2000)
      } else {
        setMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  } //handle form submission


  return (
    <section className="py-24 sm:py-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-gold/5 rounded-full blur-[150px]" />
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
            className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 ${isOpen ? "bg-snow text-background hover:bg-pumice" : "bg-snow text-background hover:bg-gold"
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

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs tracking-wide uppercase text-pumice mb-3">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
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
                      value={formData.subject}
                      onChange={handleInputChange}
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
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="bg-background/50 border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 resize-none rounded-xl"
                    />
                  </div>

                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg text-sm font-medium ${
                        message.includes("successfully")
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-snow hover:bg-gold text-background font-medium py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-glass-border">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Mail size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-pumice">info@laneway.in</span>
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
                      <span className="text-sm text-pumice"><button onClick={() => setChatbotOpen(true)} className="hover:text-snow transition-colors">Live Chat Available</button></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Chatbot isOpen={chatbotOpen} onOpenChange={setChatbotOpen} />
    </section>
  )
}
