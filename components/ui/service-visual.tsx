"use client"

import { AIBrainPulse } from "@/components/ui/visuals/ai-brain-pulse"
import { AICoreReactor } from "@/components/ui/visuals/ai-core-reactor"
import { MarketingRadar } from "@/components/ui/visuals/marketing-radar"
import { CodeStream } from "@/components/ui/visuals/code-stream"
import { RocketPulse } from "@/components/ui/visuals/rocket-pulse"
import { WebGrid } from "@/components/ui/visuals/web-grid"
import { GrowthOrb } from "@/components/ui/visuals/growth-orb"
import { OpsMachine } from "@/components/ui/visuals/ops-machine"
import { AdminFlow } from "@/components/ui/visuals/admin-flow"
import { MediaWave } from "@/components/ui/visuals/media-wave"

export function ServiceVisual({ id }: { id: string }) {
  switch (id) {
    case "ai-consulting":
      return <AIBrainPulse />
    case "ai-tech":
      return <AICoreReactor />
    case "ai-marketing":
      return <MarketingRadar />
    case "software":
      return <CodeStream />
    case "mvp":
      return <RocketPulse />
    case "web":
      return <WebGrid />
    case "incubator":
      return <GrowthOrb />
    case "operations":
      return <OpsMachine />
    case "admin":
      return <AdminFlow />
    case "branding":
      return <MediaWave />
    default:
      return <AICoreReactor />
  }
}
