"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Job } from "@/lib/jobs"


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
        formData.append("jobTitle", jobTitle.title)

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
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background p-8 rounded-xl w-full max-w-lg"
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            Apply for {jobTitle.title}
                        </h2>

                        <Input name="name" placeholder="Full Name" required />
                        <Input name="email" type="email" placeholder="Email" required />
                        <Input name="portfolio" placeholder="Portfolio URL" />

                        <Textarea
                            name="coverLetter"
                            placeholder="Why should we hire you?"
                        />

                        <Input type="file" name="resume" accept=".pdf,.doc,.docx" required />

                        <Input type="file" name="coverLetterFile" accept=".pdf,.doc,.docx" />

                        <Button disabled={loading} className="w-full mt-4">
                            {loading ? "Submitting..." : "Submit Application"}
                        </Button>

                        {message && <p className="mt-2 text-sm">{message}</p>}
                    </motion.form>
                </motion.div>
            </>
            )
        </AnimatePresence>
    )
}
