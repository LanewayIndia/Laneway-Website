import { ComingSoonTemplate } from "@/components/blogs/coming-soon-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Building Your First AI-Powered Application | Laneway",
  description: "A comprehensive guide to understanding and developing your first Artificial Intelligence-powered application from scratch.",
}

export default function AIPoweredAppPage() {
  return (
    <ComingSoonTemplate
      title="Building Your First AI-Powered Application"
      category="AI & Development"
    />
  )
}
