"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { motion } from "framer-motion"
import {
    Shield,
    Database,
    Eye,
    Lock,
    Clock,
    UserCheck,
    Cookie,
    ExternalLink,
    AlertTriangle,
    Mail,
    Phone,
    MapPin,
    Settings,
    Globe,
} from "lucide-react"

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />

            <main>
                {/* Hero Section */}
                <section className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-gold/5 rounded-full blur-[150px]" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
                        <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">
                            Legal
                        </span>
                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-pumice max-w-2xl mx-auto">
                            Learn how we collect, use, protect, and manage your personal
                            information.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                        {/* Last Updated */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <p className="text-sm text-pumice/60 bg-card border border-glass-border rounded-full px-4 py-2 inline-block">
                                <strong>Last Updated:</strong> October 13, 2025
                            </p>
                        </motion.div>

                        {/* Introduction */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20"
                        >
                            <div className="glass-card rounded-2xl p-8 lg:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-semibold text-snow">
                                        1. Introduction
                                    </h2>
                                </div>
                                <p className="text-pumice leading-relaxed">
                                    Laneway India Enterprises Private Limited ("we," "our," or
                                    "us") respects your privacy and is committed to protecting
                                    your personal information. This Privacy Policy explains how we
                                    collect, use, disclose, and safeguard your information when
                                    you visit <strong className="text-snow">laneway.in</strong> or
                                    use our services.
                                </p>
                                <p className="text-pumice mt-4">
                                    By using our website and services, you consent to the data
                                    practices described in this Privacy Policy.
                                </p>
                            </div>
                        </motion.div>

                        {/* Information We Collect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20"
                        >
                            <h2 className="font-heading text-3xl font-semibold text-snow text-center mb-12">
                                2. Information We Collect
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Info */}
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <UserCheck className="w-6 h-6 text-gold" />
                                        <h3 className="font-heading text-xl text-snow">
                                            Personal Information
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 text-pumice text-sm">
                                        <li>Name and contact details</li>
                                        <li>Company and job information</li>
                                        <li>Communication preferences</li>
                                        <li>Information submitted via forms</li>
                                        <li>Payment details via secure processors</li>
                                    </ul>
                                </div>

                                {/* Auto Collected */}
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Database className="w-6 h-6 text-red-400" />
                                        <h3 className="font-heading text-xl text-snow">
                                            Automatically Collected
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 text-pumice text-sm">
                                        <li>IP address and location</li>
                                        <li>Browser and device details</li>
                                        <li>Pages visited and session duration</li>
                                        <li>Referring websites</li>
                                        <li>Cookies and tracking data</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Usage */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20"
                        >
                            <div className="glass-card rounded-2xl p-8 lg:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <Eye className="w-6 h-6 text-cyan-400" />
                                    <h2 className="font-heading text-2xl text-snow">
                                        3. How We Use Your Information
                                    </h2>
                                </div>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-pumice">
                                    <li>Providing and improving services</li>
                                    <li>Responding to inquiries</li>
                                    <li>Sending service updates and insights</li>
                                    <li>Processing payments</li>
                                    <li>Security and fraud prevention</li>
                                    <li>Legal compliance</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Security & Retention */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                            <div className="glass-card rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Lock className="w-6 h-6 text-teal-400" />
                                    <h3 className="font-heading text-xl text-snow">
                                        5. Data Security
                                    </h3>
                                </div>
                                <p className="text-pumice">
                                    We use appropriate technical and organizational safeguards to
                                    protect your data. However, no system is 100% secure.
                                </p>
                            </div>

                            <div className="glass-card rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Clock className="w-6 h-6 text-rose-400" />
                                    <h3 className="font-heading text-xl text-snow">
                                        6. Data Retention
                                    </h3>
                                </div>
                                <p className="text-pumice">
                                    We retain personal information only as long as necessary to
                                    fulfill the purposes outlined in this policy.
                                </p>
                            </div>
                        </div>

                        {/* Cookies & Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20"
                        >
                            <div className="glass-card rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Cookie className="w-6 h-6 text-violet-400" />
                                    <h2 className="font-heading text-xl text-snow">
                                        8. Cookies & Tracking
                                    </h2>
                                </div>
                                <p className="text-pumice">
                                    We use cookies to enhance your experience. Please refer to our{" "}
                                    <a
                                        href="/cookie-policy"
                                        className="text-gold hover:text-gold-light"
                                    >
                                        Cookie Policy
                                    </a>{" "}
                                    for more details.
                                </p>
                            </div>
                        </motion.div>

                        {/* 15. Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            <div className="glass-card rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-gold" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-semibold text-snow">15. Contact Information</h2>
                                </div>
                                <div className="space-y-6 text-pumice leading-relaxed">
                                    <div>
                                        <h3 className="font-semibold text-snow mb-3">Laneway India Enterprises Private Limited</h3>

                                        {/* Addresses in a single row */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Head Office */}
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-gold" />
                                                <div>
                                                    <div className="font-medium text-snow mb-1">Head Office</div>
                                                    <div className="text-sm space-y-0.5">
                                                        <p>1087 B, Sankranthi, Perumbaikkad</p>
                                                        <p>Kottayam - 686016, Kerala</p>
                                                    </div>
                                                    <a
                                                        href="https://www.google.com/maps/place/1087%2FB,+Sankranthi,+Kottayam,+Perumbaikad,+Kerala+686016/@9.6250908,76.5343883,17z/data=!3m1!4b1!4m10!1m2!2m1!1s1087+B,+Sankranthi,+Perumbaikkad,++Kottayam+-+686016,+Kerala!3m6!1s0x3b062b506f299b43:0x3c9adcd568e4052e!8m2!3d9.6250908!4d76.5392592!15sCjwxMDg3IEIsIFNhbmtyYW50aGksIFBlcnVtYmFpa2thZCwgIEtvdHRheWFtIC0gNjg2MDE2LCBLZXJhbGGSAQpzdWJwcmVtaXNl4AEA!16s%2Fg%2F11xz04j64r?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gold hover:text-gold-light transition-colors text-sm inline-block mt-1"
                                                    >
                                                        View on Google Maps →
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Operational Office */}
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-gold" />
                                                <div>
                                                    <div className="font-medium text-snow mb-1">Operational Office</div>
                                                    <div className="text-sm space-y-0.5">
                                                        <p>Koramangala 8th Block</p>
                                                        <p>Bangalore - 560095, Karnataka</p>
                                                    </div>
                                                    <a
                                                        href="https://www.google.com/maps/place/Koramangala+8th+Block,+Koramangala,+Bengaluru,+Karnataka/@12.9410853,77.6127627,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1448a71f8e4d:0x17f8352eed30fa02!8m2!3d12.9414686!4d77.6178125!16s%2Fg%2F1ts1l25j?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gold hover:text-gold-light transition-colors text-sm inline-block mt-1"
                                                    >
                                                        View on Google Maps →
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 shrink-0 text-gold" />
                                            <div>
                                                <p className="text-sm font-medium text-snow">Email</p>
                                                <a href="mailto:info@laneway.in" className="text-gold hover:text-gold-light transition-colors text-sm">
                                                    info@laneway.in
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 shrink-0 text-gold" />
                                            <div>
                                                <p className="text-sm font-medium text-snow">Phone</p>
                                                <a href="tel:+919961348942" className="text-gold hover:text-gold-light transition-colors text-sm">
                                                    +91 99613 48942
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-glass-border">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="font-medium text-snow">GST:</span>
                                            <span className="text-pumice">32AAGCL2491R1Z0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
            <Chatbot />
        </>
    )
}
