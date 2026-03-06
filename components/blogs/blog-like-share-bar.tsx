"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Share2, Link2, Linkedin, Facebook } from "lucide-react"
import { useSession } from "@/hooks/use-session"
import { useToast } from "@/hooks/use-toast"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// X/Twitter icon (Lucide doesn't have the rebranded icon)
function XIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

interface BlogLikeShareBarProps {
    slug: string
    title: string
}

export function BlogLikeShareBar({ slug, title }: BlogLikeShareBarProps) {
    const { user } = useSession()
    const { toast } = useToast()
    const router = useRouter()

    // Start false (SSR), detect after hydration to avoid hydration mismatch
    const [supportsNativeShare, setSupportsNativeShare] = useState(false)
    useEffect(() => {
        setSupportsNativeShare(
            typeof navigator !== "undefined" && typeof navigator.share === "function"
        )
    }, [])

    // Redirect to auth page, returning to this blog after login
    const redirectToAuth = useCallback(() => {
        const returnUrl = `/blogs/${slug}`
        router.push(`/auth?redirect=${encodeURIComponent(returnUrl)}`)
    }, [router, slug])

    // ── Share handlers ──────────────────────────────────────────────────────────
    const handleShare = useCallback(async () => {
        if (!user) {
            redirectToAuth()
            return
        }

        const shareUrl = `${window.location.origin}/blogs/${slug}`
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title, text: `Check out: ${title}`, url: shareUrl })
                return
            } catch {
                // cancelled or unsupported — fall through to dropdown
            }
        }
    }, [user, slug, title, redirectToAuth])

    const handleCopyLink = useCallback(async () => {
        const shareUrl = `${window.location.origin}/blogs/${slug}`
        try {
            await navigator.clipboard.writeText(shareUrl)
            toast({
                title: "Link copied!",
                description: "The blog link has been copied to your clipboard.",
            })
        } catch {
            toast({
                title: "Failed to copy",
                description: "Please copy the URL from your browser address bar.",
            })
        }
    }, [slug, toast])

    const handleSocialShare = useCallback(
        (platform: "linkedin" | "x" | "facebook") => {
            const shareUrl = encodeURIComponent(`${window.location.origin}/blogs/${slug}`)
            const shareTitle = encodeURIComponent(title)

            const urls: Record<string, string> = {
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
                x: `https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            }

            window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=500")
        },
        [slug, title]
    )

    // Shared button styles
    const shareButtonStyle = {
        borderColor: "#1f1f1f",
        background: "rgba(12, 12, 12, 0.7)",
        color: "#a1a1a1",
    }

    const glowSpan = (
        <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: "0 0 16px rgba(201, 168, 85, 0.18)" }}
        />
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3"
            id="blog-share-bar"
        >
            {supportsNativeShare ? (
                // Mobile: native share sheet
                <button
                    id="blog-share-button"
                    onClick={handleShare}
                    className="group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 select-none"
                    style={shareButtonStyle}
                    aria-label="Share this article"
                >
                    {glowSpan}
                    <Share2 size={16} />
                    <span>Share</span>
                </button>
            ) : (
                // Desktop: Radix dropdown
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            id="blog-share-button"
                            onClick={() => { if (!user) redirectToAuth() }}
                            className="group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 select-none"
                            style={shareButtonStyle}
                            aria-label="Share this article"
                        >
                            {glowSpan}
                            <Share2 size={16} />
                            <span>Share</span>
                        </button>
                    </DropdownMenuTrigger>

                    {user && (
                        <DropdownMenuContent
                            align="start"
                            sideOffset={8}
                            className="min-w-[180px] rounded-xl border-[#1f1f1f] bg-[#0c0c0c]"
                        >
                            <DropdownMenuItem
                                onClick={handleCopyLink}
                                className="cursor-pointer gap-2.5 py-2 text-[#a1a1a1] hover:text-[#F5B513]! focus:text-[#F5B513]!"
                            >
                                <Link2 size={15} />
                                Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleSocialShare("linkedin")}
                                className="cursor-pointer gap-2.5 py-2 text-[#a1a1a1] hover:text-[#F5B513]! focus:text-[#F5B513]!"
                            >
                                <Linkedin size={15} />
                                Share on LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleSocialShare("x")}
                                className="cursor-pointer gap-2.5 py-2 text-[#a1a1a1] hover:text-[#F5B513]! focus:text-[#F5B513]!"
                            >
                                <XIcon size={15} />
                                Share on X
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleSocialShare("facebook")}
                                className="cursor-pointer gap-2.5 py-2 text-[#a1a1a1] hover:text-[#F5B513]! focus:text-[#F5B513]!"
                            >
                                <Facebook size={15} />
                                Share on Facebook
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    )}
                </DropdownMenu>
            )}
        </motion.div>
    )
}
