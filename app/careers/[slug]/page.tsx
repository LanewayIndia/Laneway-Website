"use client"

import { notFound } from "next/navigation"
import { jobs } from "@/lib/jobs"
import { ApplicationForm } from "@/components/careers/application-form"
import { useState } from 'react';

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = jobs.find(j => j.slug === params.slug)
  if (!job) notFound()

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <h1 className="text-4xl font-heading">{job.title}</h1>
      <p className="mt-4">{job.description}</p>

      <button onClick={() => setIsOpen(true)}>Apply Now</button>

      {isOpen && (
        <ApplicationForm onClose={() => setIsOpen(false)} jobTitle={job} />
      )}
    </main>
  )
}