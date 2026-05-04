"use client"

import Link from "next/link"
import { useSession } from "@/hooks/use-session"

export function StartConversationLink() {
  const { user, loading } = useSession()

  // If loading, we provide a fallback (e.g. # or disabled style)
  // But generally, navigating to the correct path after hydration is the goal.
  const href = user ? "/contact" : "/auth"

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (loading) e.preventDefault()
      }}
      aria-disabled={loading}
      tabIndex={loading ? -1 : undefined}
      className={`inline-flex items-center gap-2 px-8 py-3.5 bg-snow text-black font-semibold rounded-full hover:bg-[#F5B513] transition-all duration-300 text-sm ${
        loading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      Start a Conversation
    </Link>
  )
}
