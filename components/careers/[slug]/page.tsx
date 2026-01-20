// app/careers/[slug]/page.tsx

import { notFound } from "next/navigation"
import { ApplicationFormModal } from "../application-form"

const jobs = [
  "senior-ai-engineer",
  "product-designer",
  "full-stack-developer",
  "bd-manager",
  "marketing-specialist",
  "devops-engineer",
]

export default function JobPage({
  params,
}: {
  params: { slug: string }
}) {
    const isValidJob = jobs.includes(params.slug)
    if (!isValidJob) notFound()

    const jobTitle = params.slug
        .split("-")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ")

  return (
    <main className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-heading text-snow">
        {jobTitle}
      </h1>

      <p className="text-pumice mt-2">
        Careers at Laneway
      </p>

      <ApplicationFormModal open={true} onClose={() => {}}jobTitle={jobTitle} />
    </main>
  )
}
