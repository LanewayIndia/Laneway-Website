"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, Link2, Linkedin, Facebook } from "lucide-react"
import { useSession } from "@/hooks/use-session"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
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
    const { user, loading: sessionLoading } = useSession()
    const { toast } = useToast()
    const router = useRouter()

    const [likeCount, setLikeCount] = useState(0)
    const [userLiked, setUserLiked] = useState(false)
    const [isLikeLoading, setIsLikeLoading] = useState(true)
    const [isLikeProcessing, setIsLikeProcessing] = useState(false)

    // ─── Native share detection ───────────────────────────────────────────────
    // MUST start as false (matches server render) then detect on client after
    // hydration. Using typeof navigator at render-time causes a hydration mismatch
    // because the server always evaluates it as false while mobile clients see true.
    const [supportsNativeShare, setSupportsNativeShare] = useState(false)
    useEffect(() => {
        setSupportsNativeShare(
            typeof navigator !== "undefined" && typeof navigator.share === "function"
        )
    }, [])

    // Debounce – prevent rapid clicks
    const lastClickRef = useRef<number>(0)

    // Helper: redirect to /auth with the current blog as the post-login destination
    const redirectToAuth = useCallback(() => {
        const returnUrl = `/blogs/${slug}`
        router.push(`/auth?redirect=${encodeURIComponent(returnUrl)}`)
    }, [router, slug])

    // ─── Auth token helper ────────────────────────────────────────────────────
    const getAuthToken = useCallback(async (): Promise<string | null> => {
        const {
            data: { session },
        } = await supabase.auth.getSession()
        return session?.access_token ?? null
    }, [])

    // ─── Fetch like count + user-liked status ────────────────────────────────
    const fetchLikeData = useCallback(async () => {
        setIsLikeLoading(true)
        try {
            const token = await getAuthToken()
            const headers: Record<string, string> = {}
            if (token) headers["Authorization"] = `Bearer ${token}`

            const res = await fetch(
                `/api/blog/count?slug=${encodeURIComponent(slug)}`,
                { headers }
            )

            if (res.ok) {
                const data = await res.json()
                setLikeCount(data.count)
                setUserLiked(data.userLiked)
            }
        } catch (err) {
            console.error("Failed to fetch like data:", err)
        } finally {
            setIsLikeLoading(false)
        }
    }, [slug, getAuthToken])

    // ─── Only fetch ONCE — after the session has finished loading ─────────────
    // This prevents the race condition where:
    //  1. Mount fires fetchLikeData with no token (user=null)
    //  2. Session resolves → user?.id changes → fetchLikeData fires AGAIN
    //  3. Second fetch returns stale data that overwrites an in-flight optimistic update
    const hasFetchedRef = useRef(false)
    useEffect(() => {
        if (sessionLoading) return           // wait for session to resolve
        if (hasFetchedRef.current) return    // already fetched
        hasFetchedRef.current = true
        fetchLikeData()
    }, [sessionLoading, fetchLikeData])

    // ─── Core like API call (always LIKES — never toggles) ───────────────────
    const executeLike = useCallback(async () => {
        const token = await getAuthToken()
        if (!token) {
            toast({
                title: "Please sign in",
                description: "You need to be signed in to like articles.",
            })
            return
        }

        const res = await fetch("/api/blog/like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ slug }),
        })

        if (res.ok) {
            const data = await res.json()
            setLikeCount(data.count)
            setUserLiked(true)
        }
    }, [slug, getAuthToken, toast])

    // ─── Core unlike API call (always UNLIKES) ───────────────────────────────
    const executeUnlike = useCallback(async () => {
        const token = await getAuthToken()
        if (!token) return

        const res = await fetch("/api/blog/unlike", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ slug }),
        })

        if (res.ok) {
            const data = await res.json()
            setLikeCount(data.count)
            setUserLiked(false)
        }
    }, [slug, getAuthToken])

    // ─── Like toggle handler ──────────────────────────────────────────────────
    const handleLikeToggle = useCallback(async () => {
        // Debounce — 400ms minimum between clicks
        const now = Date.now()
        if (now - lastClickRef.current < 400) return
        lastClickRef.current = now

        // Auth gate
        if (!user) {
            redirectToAuth()
            return
        }

        if (isLikeProcessing) return

        // Capture current state for optimistic update + rollback
        const wasLiked = userLiked
        const prevCount = likeCount

        // Optimistic update
        setUserLiked(!wasLiked)
        setLikeCount((c) => (!wasLiked ? c + 1 : Math.max(0, c - 1)))
        setIsLikeProcessing(true)

        try {
            if (!wasLiked) {
                await executeLike()
            } else {
                await executeUnlike()
            }
        } catch {
            // Rollback on failure
            setUserLiked(wasLiked)
            setLikeCount(prevCount)
            toast({
                title: "Something went wrong",
                description: "Could not process your action. Please try again.",
            })
        } finally {
            setIsLikeProcessing(false)
        }
    }, [user, userLiked, likeCount, isLikeProcessing, executeLike, executeUnlike, toast, redirectToAuth])

    // ─── Share handlers ───────────────────────────────────────────────────────
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

    // supportsNativeShare is now a useState — see declaration above

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center gap-3"
                id="blog-like-share-bar"
            >
                {/* ── LIKE BUTTON ── */}
                <button
                    id="blog-like-button"
                    onClick={handleLikeToggle}
                    disabled={isLikeProcessing || isLikeLoading}
                    className="group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 select-none disabled:opacity-60"
                    style={{
                        borderColor: userLiked ? "#c9a855" : "#1f1f1f",
                        background: userLiked
                            ? "rgba(201, 168, 85, 0.10)"
                            : "rgba(12, 12, 12, 0.7)",
                        color: userLiked ? "#F5B513" : "#a1a1a1",
                    }}
                    aria-label={userLiked ? "Unlike this article" : "Like this article"}
                >
                    {/* Glow ring */}
                    <span
                        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ boxShadow: "0 0 16px rgba(201, 168, 85, 0.18)" }}
                    />

                    {/* Heart icon */}
                    <AnimatePresence mode="wait">
                        {isLikeLoading ? (
                            <motion.span
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                            />
                        ) : (
                            <motion.span
                                key={userLiked ? "liked" : "not-liked"}
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.6, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Heart
                                    size={16}
                                    fill={userLiked ? "#F5B513" : "none"}
                                    stroke={userLiked ? "#F5B513" : "currentColor"}
                                    strokeWidth={2}
                                />
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Count — animated */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={likeCount}
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="tabular-nums min-w-[1ch]"
                        >
                            {isLikeLoading ? "—" : likeCount}
                        </motion.span>
                    </AnimatePresence>
                </button>

                {/* ── SHARE BUTTON ── */}
                {supportsNativeShare ? (
                    // Mobile: native share sheet
                    <button
                        id="blog-share-button"
                        onClick={handleShare}
                        className="group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 select-none"
                        style={{
                            borderColor: "#1f1f1f",
                            background: "rgba(12, 12, 12, 0.7)",
                            color: "#a1a1a1",
                        }}
                        aria-label="Share this article"
                    >
                        <span
                            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ boxShadow: "0 0 16px rgba(201, 168, 85, 0.18)" }}
                        />
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                ) : (
                    // Desktop: Radix dropdown
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                id="blog-share-button"
                                onClick={() => {
                                    if (!user) redirectToAuth()
                                }}
                                className="group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 select-none"
                                style={{
                                    borderColor: "#1f1f1f",
                                    background: "rgba(12, 12, 12, 0.7)",
                                    color: "#a1a1a1",
                                }}
                                aria-label="Share this article"
                            >
                                <span
                                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ boxShadow: "0 0 16px rgba(201, 168, 85, 0.18)" }}
                                />
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
        </>
    )
}
