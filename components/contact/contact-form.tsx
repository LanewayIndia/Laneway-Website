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
                  <a href="mailto:info@laneway.in" className="text-pumice hover:text-gold transition-colors">
                    info@laneway.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Call Us</h3>
                  <a href="tel:+919961348942" className="text-pumice hover:text-gold transition-colors">
                    +91 99613 48942
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Head Office</h3>
                  <a 
                    href="https://www.google.com/maps/place/1087%2FB,+Sankranthi,+Kottayam,+Perumbaikad,+Kerala+686016/@9.6250908,76.5343883,17z/data=!3m1!4b1!4m10!1m2!2m1!1s1087+B,+Sankranthi,+Perumbaikkad,++Kottayam+-+686016,+Kerala!3m6!1s0x3b062b506f299b43:0x3c9adcd568e4052e!8m2!3d9.6250908!4d76.5392592!15sCjwxMDg3IEIsIFNhbmtyYW50aGksIFBlcnVtYmFpa2thZCwgIEtvdHRheWFtIC0gNjg2MDE2LCBLZXJhbGGSAQpzdWJwcmVtaXNl4AEA!16s%2Fg%2F11xz04j64r?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pumice hover:text-gold transition-colors"
                  >
                    1087 B, Sankranthi, Perumbaikkad,
                    <br />
                    Kottayam - 686016, Kerala
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-snow mb-1">Operational Office</h3>
                  <a 
                    href="https://www.google.com/maps/place/Koramangala+8th+Block,+Koramangala,+Bengaluru,+Karnataka/@12.9410853,77.6127627,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1448a71f8e4d:0x17f8352eed30fa02!8m2!3d12.9414686!4d77.6178125!16s%2Fg%2F1ts1l25j?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pumice hover:text-gold transition-colors"
                  >
                    Koramangala 8th block
                    <br/>
                    Bangalore - 560095, Karnataka
                  </a>
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
