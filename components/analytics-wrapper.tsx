"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { getStoredConsent } from "@/lib/cookie-consent"

export function AnalyticsWrapper() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const consent = getStoredConsent()
    if (consent?.analytics) setEnabled(true)
  }, [])

  if (!enabled) return null
  return <Analytics />
}
