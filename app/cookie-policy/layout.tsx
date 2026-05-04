import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cookie Policy | Laneway",
    description: "Learn about how Laneway uses cookies and similar technologies on our website.",
}

export default function CookiePolicyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}