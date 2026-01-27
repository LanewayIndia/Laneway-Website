"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Job } from "@/lib/jobs"
import { X, User, Mail, Link, FileText, Upload, Send, Loader2} from "lucide-react"


export function ApplicationForm({

    onClose,
    jobTitle,
}: {
    open: boolean
    onClose: () => void
    jobTitle: Job
}) {

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        formData.append("position", jobTitle.title)

        // Send form (with files) to server API; server will handle uploads via multer + Cloudinary
        const result = await fetch("/api/submit-application", {
            method: "POST",
            body: formData,
        })

        setLoading(false)
        setMessage(result.ok ? "Application submitted!" : "Submission failed.")
    }

    return (
        <AnimatePresence>
            (<>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background border border-border rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Header with Cross Button */}
                        <div className="relative bg-linear-to-r from-background to-background/95 border-b border-border p-4 sm:p-6 shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-border/50 transition-colors duration-200 group z-10"
                                aria-label="Close application form"
                            >
                                <X size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            <div className="pr-10 sm:pr-12">
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                                    Apply for {jobTitle.title}
                                </h2>
                                <p className="text-muted-foreground text-xs sm:text-sm">
                                    Join our team and help shape the future of digital innovation
                                </p>
                            </div>
                        </div>

                        {/* Form Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                                    Personal Information
                                </h3>

                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        name="fullName"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        placeholder="Full Name"
                                        required
                                        className="pl-10 h-12 bg-background/50 border-border/50 focus:border-gold/50 transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        name="email"
                                        type="email"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        placeholder="Email Address"
                                        required
                                        className="pl-10 h-12 bg-background/50 border-border/50 focus:border-gold/50 transition-colors"
                                    />
                                </div>

                                <div className="relative">
                                    <Link size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        name="portfolio"
                                        type="url"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        placeholder="Portfolio URL (Optional)"
                                        className="pl-10 h-12 bg-background/50 border-border/50 focus:border-gold/50 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Cover Letter Section */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                                    Cover Letter
                                </h3>

                                <div className="relative">
                                    <FileText size={18} className="absolute left-3 top-3 text-muted-foreground" />
                                    <Textarea
                                        name="coverLetterText"
                                        placeholder="Tell us why you're the perfect fit for this role..."
                                        rows={4}
                                        className="pl-10 bg-background/50 border-border/50 focus:border-gold/50 transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            {/* File Uploads Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                                    Documents
                                </h3>

                                <div className="space-y-3">
                                    <div className="relative">
                                        <Upload size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="file"
                                            name="resume"
                                            accept=".pdf,.doc,.docx"
                                            required
                                            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-gold/50 transition-colors file:bg-gold/10 file:text-gold file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:font-medium hover:file:bg-gold/20"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1 ml-10">Resume/CV (PDF, DOC, DOCX)</p>
                                    </div>

                                    <div className="relative">
                                        <Upload size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="file"
                                            name="coverLetterFile"
                                            accept=".pdf,.doc,.docx"
                                            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-gold/50 transition-colors file:bg-gold/10 file:text-gold file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:font-medium hover:file:bg-gold/20"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1 ml-10">Cover Letter (Optional)</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Footer - Fixed at Bottom */}
                        <div className="border-t border-border p-4 sm:p-6 shrink-0 bg-background/95">
                            {/* Message */}
                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                                            message.includes('submitted')
                                                ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-600 border border-red-500/20'
                                        }`}
                                    >
                                        {message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-border/50 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.form>
                </motion.div>
            </>
            )
        </AnimatePresence>
    )
}
