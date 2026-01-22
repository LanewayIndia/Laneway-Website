"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { motion } from "framer-motion"
import {
    Cookie,
    Shield,
    BarChart3,
    Settings,
    Target,
    ExternalLink,
    AlertTriangle,
    Mail,
    Phone,
    MapPin
} from "lucide-react"

export default function CookiePolicyPage() {
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
                            Cookie Policy
                        </h1>
                        <p className="text-lg text-pumice max-w-2xl mx-auto">
                            Learn about how we use cookies and similar technologies to enhance your experience on our website.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container">
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

                        {/* What Are Cookies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-20"
                        >
                            <div className="glass-card rounded-2xl p-8 lg:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                        <Cookie className="w-6 h-6 text-gold" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-semibold text-snow">What Are Cookies?</h2>
                                </div>
                                <div className="space-y-4 text-pumice leading-relaxed">
                                    <p>
                                        Cookies are small text files that are stored on your device (computer, tablet,
                                        or mobile) when you visit a website. They help websites remember information
                                        about your visit, such as your preferred language and other settings, making
                                        your next visit easier and the site more useful to you.
                                    </p>
                                    <p>
                                        This Cookie Policy explains how Laneway India Enterprises Private Limited
                                        (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar
                                        technologies on our website <strong className="text-snow">laneway.in</strong>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Types of Cookies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-20"
                        >
                            <h2 className="font-heading text-3xl font-semibold text-snow text-center mb-12">Types of Cookies We Use</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Essential Cookies */}
                                <div className="glass-card rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold text-snow">Essential Cookies</h3>
                                    </div>
                                    <p className="text-pumice text-sm mb-4 leading-relaxed">
                                        These cookies are necessary for the website to function properly and cannot be disabled.
                                    </p>
                                    <ul className="space-y-2 text-sm text-pumice/80">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Session management cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Security cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Load balancing cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            User interface customization cookies
                                        </li>
                                    </ul>
                                </div>

                                {/* Performance Cookies */}
                                <div className="glass-card rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold text-snow">Performance Cookies</h3>
                                    </div>
                                    <p className="text-pumice text-sm mb-4 leading-relaxed">
                                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                                    </p>
                                    <ul className="space-y-2 text-sm text-pumice/80">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Google Analytics cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Page load time tracking
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            User journey analysis
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Error tracking and debugging
                                        </li>
                                    </ul>
                                </div>

                                {/* Functional Cookies */}
                                <div className="glass-card rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                            <Settings className="w-5 h-5 text-green-400" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold text-snow">Functional Cookies</h3>
                                    </div>
                                    <p className="text-pumice text-sm mb-4 leading-relaxed">
                                        These cookies enable enhanced functionality and personalization.
                                    </p>
                                    <ul className="space-y-2 text-sm text-pumice/80">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Language preferences
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            User interface settings
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Form data retention
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Accessibility preferences
                                        </li>
                                    </ul>
                                </div>

                                {/* Marketing Cookies */}
                                <div className="glass-card rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold text-snow">Marketing Cookies</h3>
                                    </div>
                                    <p className="text-pumice text-sm mb-4 leading-relaxed">
                                        These cookies are used to deliver relevant advertisements and track marketing campaign effectiveness.
                                    </p>
                                    <ul className="space-y-2 text-sm text-pumice/80">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Social media integration cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Advertising platform cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Remarketing cookies
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                            Conversion tracking cookies
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Specific Cookies Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-20"
                        >
                            <h2 className="font-heading text-3xl font-semibold text-snow text-center mb-12">Specific Cookies We Use</h2>
                            <div className="glass-card rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gold/5 border-b border-glass-border">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-snow">Cookie Name</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-snow">Purpose</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-snow">Duration</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-snow">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-glass-border">
                                            <tr className="hover:bg-card/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-pumice font-mono">_ga</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Google Analytics – distinguishes users</td>
                                                <td className="px-6 py-4 text-sm text-pumice">2 years</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">Performance</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-card/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-pumice font-mono">_ga_*</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Google Analytics – session state</td>
                                                <td className="px-6 py-4 text-sm text-pumice">2 years</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">Performance</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-card/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-pumice font-mono">_gid</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Google Analytics – distinguishes users</td>
                                                <td className="px-6 py-4 text-sm text-pumice">24 hours</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">Performance</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-card/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-pumice font-mono">session_id</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Maintains user session</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Session</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded-full text-xs">Essential</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-card/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-pumice font-mono">preferences</td>
                                                <td className="px-6 py-4 text-sm text-pumice">Stores user preferences</td>
                                                <td className="px-6 py-4 text-sm text-pumice">1 year</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">Functional</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>

                        {/* Third-Party Cookies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-20"
                        >
                            <h2 className="font-heading text-3xl font-semibold text-snow text-center mb-12">Third-Party Cookies</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Google Analytics */}
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <BarChart3 className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="font-heading text-xl font-semibold text-snow">Google Analytics</h3>
                                    </div>
                                    <p className="text-pumice mb-4 leading-relaxed">
                                        We use Google Analytics to analyze website traffic and user behavior. Google
                                        Analytics uses cookies to collect information about how visitors use our site.
                                        This information is used to compile reports and help us improve our website.
                                    </p>
                                    <a
                                        href="https://policies.google.com/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium"
                                    >
                                        Google Privacy Policy
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Social Media Platforms */}
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                                            <Target className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="font-heading text-xl font-semibold text-snow">Social Media Platforms</h3>
                                    </div>
                                    <p className="text-pumice leading-relaxed">
                                        Our website may include social media features (such as LinkedIn and Instagram
                                        buttons) that may set cookies when you interact with them. These cookies are
                                        controlled by the respective social media platforms.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* How to Manage Cookies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-20"
                        >
                            <h2 className="font-heading text-3xl font-semibold text-snow text-center mb-12">How to Manage Cookies</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Browser Settings */}
                                <div className="glass-card rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                                            <Settings className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <h3 className="font-heading text-xl font-semibold text-snow">Browser Settings</h3>
                                    </div>
                                    <div className="space-y-3 text-sm text-pumice">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <div>
                                                <strong className="text-snow">Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <div>
                                                <strong className="text-snow">Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <div>
                                                <strong className="text-snow">Safari:</strong> Preferences → Privacy → Manage Website Data
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            <div>
                                                <strong className="text-snow">Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cookie Consent & Opt-Out */}
                                <div className="space-y-8">
                                    {/* Cookie Consent */}
                                    <div className="glass-card rounded-2xl p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-green-400" />
                                            </div>
                                            <h3 className="font-heading text-xl font-semibold text-snow">Cookie Consent</h3>
                                        </div>
                                        <p className="text-pumice text-sm leading-relaxed">
                                            When you first visit our website, you will see a cookie consent banner. You can
                                            choose to accept or decline non-essential cookies. You can change your
                                            preferences at any time by clicking the cookie settings link in our footer.
                                        </p>
                                    </div>

                                    {/* Opt-Out Links */}
                                    <div className="glass-card rounded-2xl p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                                <ExternalLink className="w-6 h-6 text-red-400" />
                                            </div>
                                            <h3 className="font-heading text-xl font-semibold text-snow">Opt-Out Links</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <a
                                                href="https://tools.google.com/dlpage/gaoptout"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm"
                                            >
                                                Google Analytics Opt-out Browser Add-on
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <a
                                                href="https://adssettings.google.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm"
                                            >
                                                Google Ad Settings
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Impact of Disabling Cookies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mb-20"
                        >
                            <div className="glass-card rounded-2xl p-8 lg:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-semibold text-snow">Impact of Disabling Cookies</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            You may need to re-enter information more frequently
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Personalized content and recommendations may not be available
                                        </li>
                                    </ul>
                                    <ul className="space-y-3 text-pumice">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            Some interactive features may not work correctly
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gold rounded-full mt-2 shrink-0"></div>
                                            We may not be able to remember your preferences
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Updates and Contact */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                            {/* Updates */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <div className="glass-card rounded-2xl p-8 h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <Settings className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h2 className="font-heading text-2xl font-semibold text-snow">Updates to This Policy</h2>
                                    </div>
                                    <p className="text-pumice leading-relaxed">
                                        We may update this Cookie Policy from time to time to reflect changes in our
                                        practices or for other operational, legal, or regulatory reasons. We will
                                        notify you of any material changes by posting the updated policy on our website
                                        and updating the &quot;Last Updated&quot; date.
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