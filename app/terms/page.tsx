"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { motion } from "framer-motion"
import {
  FileText,
  Shield,
  Users,
  CreditCard,
  Lock,
  AlertTriangle,
  XCircle,
  Info,
  Scale,
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Settings
} from "lucide-react"

export default function TermsPage() {
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
                        <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Legal</span>
                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow mb-6 text-balance">
                            Terms of Service
                        </h1>
                        <p className="text-lg text-pumice max-w-2xl mx-auto">
                            Please read these terms carefully before using our services.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
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

                        {/* Terms Sections */}
                        <div className="space-y-12">
                            {/* 1. Acceptance of Terms */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">1. Acceptance of Terms</h2>
                                    </div>
                                    <div className="space-y-4 text-pumice leading-relaxed">
                                        <p>
                                            These Terms of Service ("Terms") govern your use of the website laneway.in and the services provided by Laneway India Enterprises Private Limited ("Company," "we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms.
                                        </p>
                                        <p>
                                            If you do not agree to these Terms, please do not use our website or services.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 2. Description of Services */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-green-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">2. Description of Services</h2>
                                    </div>
                                    <p className="text-pumice mb-4 leading-relaxed">
                                        Laneway India Enterprises provides the following services:
                                    </p>
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <strong className="text-snow">Business Consulting:</strong> Strategic business advice, market analysis, and growth planning
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <strong className="text-snow">Technology Solutions:</strong> Software development, digital transformation, and IT consulting
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <strong className="text-snow">MVP Building:</strong> Minimum Viable Product development and prototyping
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <strong className="text-snow">Startup Incubator:</strong> Early-stage investment and startup support services
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <strong className="text-snow">Media Management:</strong> Digital marketing, content creation, and brand management
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* 3. User Responsibilities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                            <Users className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">3. User Responsibilities</h2>
                                    </div>
                                    <p className="text-pumice mb-4 leading-relaxed">
                                        By using our services, you agree to:
                                    </p>
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Provide accurate and complete information when requested
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Use our services only for lawful purposes
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Respect intellectual property rights
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Not engage in any fraudulent, abusive, or illegal activities
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Maintain the confidentiality of any proprietary information shared
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Comply with all applicable laws and regulations
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* 4. Intellectual Property Rights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">4. Intellectual Property Rights</h2>
                                    </div>
                                    <div className="space-y-4 text-pumice leading-relaxed">
                                        <p>
                                            All content, trademarks, logos, and intellectual property on our website and in our services are owned by Laneway India Enterprises or our licensors. You may not use, reproduce, or distribute any content without our express written permission.
                                        </p>
                                        <p>
                                            Any work product created as part of our consulting services will be governed by separate agreements that specify ownership and usage rights.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 5. Payment Terms */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">5. Payment Terms</h2>
                                    </div>
                                    <p className="text-pumice mb-4 leading-relaxed">
                                        Payment terms for our services will be specified in individual service agreements. Generally:
                                    </p>
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Fees are due as specified in the service agreement
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Late payments may incur additional charges
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            All prices are exclusive of applicable taxes
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Refunds are subject to our refund policy as outlined in service agreements
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* 6. Confidentiality */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                            <Lock className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">6. Confidentiality</h2>
                                    </div>
                                    <p className="text-pumice mb-4 leading-relaxed">
                                        We understand the sensitive nature of business information. We maintain strict confidentiality regarding:
                                    </p>
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Client business strategies and plans
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Financial information and data
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Proprietary technology and processes
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Customer lists and market information
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Any other information marked as confidential
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* 7-9. Legal Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* 7. Limitation of Liability */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <div className="glass-card rounded-2xl p-8 h-full">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                            </div>
                                            <h2 className="font-heading text-xl font-semibold text-snow">7. Limitation of Liability</h2>
                                        </div>
                                        <div className="space-y-4 text-pumice leading-relaxed text-sm">
                                            <p>
                                                To the maximum extent permitted by law, Laneway India Enterprises shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services.
                                            </p>
                                            <p>
                                                Our total liability for any claims arising from our services shall not exceed the total amount paid by you for the specific service giving rise to the claim.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 8. Disclaimers */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    <div className="glass-card rounded-2xl p-8 h-full">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                                                <Info className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <h2 className="font-heading text-xl font-semibold text-snow">8. Disclaimers</h2>
                                        </div>
                                        <p className="text-pumice mb-4 leading-relaxed text-sm">
                                            Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee:
                                        </p>
                                        <ul className="space-y-2 text-pumice text-sm">
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0"></div>
                                                Specific business outcomes or results
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0"></div>
                                                Uninterrupted or error-free service
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0"></div>
                                                Compatibility with all systems or platforms
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0"></div>
                                                Accuracy of third-party information or recommendations
                                            </li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>

                            {/* 9. Termination */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gray-500/10 rounded-xl flex items-center justify-center">
                                            <XCircle className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">9. Termination</h2>
                                    </div>
                                    <div className="space-y-4 text-pumice leading-relaxed">
                                        <p>
                                            We reserve the right to terminate or suspend your access to our services at any time, with or without notice, for any reason, including violation of these Terms.
                                        </p>
                                        <p>
                                            Upon termination, your right to use our services will cease immediately, and we may delete any data associated with your account.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 10-15. Final Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* 10. Governing Law */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <div className="glass-card rounded-2xl p-8 h-full">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                                                <Scale className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <h2 className="font-heading text-xl font-semibold text-snow">10. Governing Law</h2>
                                        </div>
                                        <div className="space-y-4 text-pumice leading-relaxed text-sm">
                                            <p>
                                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Kottayam, Kerala, India.
                                            </p>
                                            <p>
                                                Before pursuing legal action, we encourage parties to attempt to resolve disputes through good faith negotiations.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 11. Force Majeure */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                >
                                    <div className="glass-card rounded-2xl p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                                <Zap className="w-6 h-6 text-amber-400" />
                                            </div>
                                            <h2 className="font-heading text-2xl font-semibold text-snow">11. Force Majeure</h2>
                                        </div>
                                        <div className="space-y-4 text-pumice leading-relaxed">
                                            <p>
                                                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, government actions, or technical failures.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 12. Severability */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                >
                                    <div className="glass-card rounded-2xl p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-teal-400" />
                                            </div>
                                            <h2 className="font-heading text-2xl font-semibold text-snow">12. Severability</h2>
                                        </div>
                                        <div className="space-y-4 text-pumice leading-relaxed">
                                            <p>
                                                If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 13. Entire Agreement */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <div className="glass-card rounded-2xl p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-rose-400" />
                                            </div>
                                            <h2 className="font-heading text-2xl font-semibold text-snow">13. Entire Agreement</h2>
                                        </div>
                                        <div className="space-y-4 text-pumice leading-relaxed">
                                            <p>
                                                These Terms, together with our Privacy Policy and any specific service agreements, constitute the entire agreement between you and Laneway India Enterprises regarding the use of our services.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* 14. Modifications */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 1.3 }}
                            >
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                                            <Settings className="w-6 h-6 text-violet-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">14. Modifications</h2>
                                    </div>
                                    <p className="text-pumice leading-relaxed">
                                        We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
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
                    </div>
                </section>
            </main>
            <Footer />
            <Chatbot />
        </>
    )
}