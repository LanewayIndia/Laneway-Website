import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Laneway",
    description: "Read our Terms of Service to understand the rules and guidelines for using Laneway's services.",
}

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}