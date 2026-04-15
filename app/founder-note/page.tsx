import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ShareButton } from "@/components/founder-note/share-button"
import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.laneway.in"

export const metadata: Metadata = {
  title: "Founder's Note | Gokul M Prabhu | Laneway",
  description:
    "One year of Laneway — a note from Gokul M Prabhu on how it all began, what was built, and where it is heading next.",
  openGraph: {
    title: "One Year of Laneway | Gokul M Prabhu",
    description:
      "A year ago, Laneway did not exist. Read how it started with a simple intention to help, and where it is heading next.",
    url: `${SITE_URL}/founder-note`,
    siteName: "Laneway",
    images: [
      {
        url: `${SITE_URL}/gokul-m-prabhu.jpg`,
        width: 1200,
        height: 630,
        alt: "Gokul M Prabhu — Founder of Laneway",
      },
    ],
    type: "article",
    authors: ["Gokul M Prabhu"],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Year of Laneway | Gokul M Prabhu",
    description:
      "A year ago, Laneway did not exist. Read how it started with a simple intention to help, and where it is heading next.",
    images: [`${SITE_URL}/gokul-m-prabhu.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/founder-note`,
  },
}

const ecosystemItems = [
  {
    name: "Laneway",
    description: "The foundation where consulting and strategy come together.",
  },
  {
    name: "Laneway Labs",
    description: "Exploring AI, automation, and the systems that will define how businesses operate in the future.",
  },
  {
    name: "7ZeroMedia",
    description: "Translating ideas into visibility, content, and distribution.",
  },
  {
    name: "Vayo",
    description: "A reminder of the problems we still want to solve and the communities we still want to build for.",
  },
]

export default function FounderNotePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-gold/8 rounded-full blur-[120px]" />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-pumice hover:text-gold transition-colors duration-200 text-sm font-medium mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Home
            </Link>

            {/* Label */}
            <p className="text-xs tracking-widest uppercase text-gold/70 mb-4">
              Founder&apos;s Note · 15 April 2026
            </p>

            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-snow leading-none mb-10 max-w-4xl">
              One Year of{" "}
              <span className="text-gold">Laneway</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-16 bg-gold" />
              <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              <div className="h-px flex-1 bg-gold/10" />
            </div>

            {/* Founder card + Share */}
            <div className="flex items-center justify-between gap-5 flex-wrap">
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-gold/30 shrink-0">
                  <Image
                    src="/gokul-m-prabhu.jpg"
                    alt="Gokul M Prabhu, Founder of Laneway"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="text-snow font-semibold text-base sm:text-lg leading-tight">Gokul M Prabhu</p>
                  <p className="text-pumice/70 text-sm">Founder &amp; CEO, Laneway</p>
                </div>
              </div>
              <ShareButton />
            </div>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────────── */}
        <section className="pb-20 sm:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-2xl mx-auto">

              {/* Opening paragraphs */}
              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  A year ago, Laneway did not exist as a company. There were no systems in place, no defined structure,
                  and no real sense of what this would eventually become. It was simply an intention — an intention to help.
                </p>
                <p>
                  Before there were teams, brands, or even a name that carried weight, there were just conversations.
                  People would reach out with problems they were trying to solve, and we would show up, trying to offer
                  whatever clarity we could. There was no larger strategy behind it, no calculated plan to turn it into
                  something bigger. It was simply a consistent effort to be useful.
                </p>
                <p>
                  Over time, something became clear. The advice we were giving was not just helpful in the moment, it
                  was working. It was creating direction, solving problems, and in some cases, changing outcomes. That
                  realisation, although simple, was what quietly set everything in motion.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="my-12 pl-6 border-l-2 border-gold">
                <p className="text-snow text-xl sm:text-2xl font-medium leading-snug italic">
                  &ldquo;Just because you can build something does not mean you can scale it in every market.&rdquo;
                </p>
              </blockquote>

              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  Before any of this, we had spent years building e-commerce, navigating a space that was competitive,
                  unpredictable, and often difficult to sustain without constant adaptation. Like most early journeys,
                  it was built on trial and error. We experimented, failed, adjusted, and kept going, learning things
                  the hard way because there was no other option. And through that phase, one idea stayed with us —
                  just because you can build something does not mean you can scale it in every market. That
                  understanding did not come quickly, and it did not come easily, but it changed how we started looking
                  at businesses, not just as ideas, but as systems that need to function across different environments.
                </p>
                <p>
                  At one point, we tried to build something of our own again through Vayo. It felt meaningful, and it
                  felt necessary. We spent months trying to shape it into something sustainable, but eventually, we had
                  to face a reality that was difficult to accept at the time — it was not working, at least not in the
                  way we had envisioned. That moment could have been an endpoint, but instead, it became a turning
                  point. It forced us to step back, reassess, and pay closer attention to what was already happening
                  around us.
                </p>
                <p>
                  The shift did not come from a structured pivot or a planned strategy. It came from trust. Our first
                  client approached us not because we had built a funnel or positioned ourselves as a service provider,
                  but because they needed clarity. They needed direction. And we responded the only way we knew how —
                  by trying to help.
                </p>
                <p>
                  That experience changed everything. For the first time, what we were doing felt repeatable. It felt
                  like something that could go beyond one conversation and become a structured way of solving problems
                  for businesses. That is when Laneway began to take its real shape.
                </p>
              </div>

              {/* Section: Building with Intention */}
              <div className="mt-16 mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <h2 className="text-xl sm:text-2xl font-bold text-snow tracking-tight">
                  Building with Intention
                </h2>
              </div>

              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  Over the past year, we have focused on building with intention. Not just growing, but structuring
                  what we were building in a way that could sustain itself. This led to the formation of different
                  parts of our ecosystem, each designed to solve a specific layer of the problem.
                </p>
              </div>

              {/* Ecosystem cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {ecosystemItems.map((item) => (
                  <div
                    key={item.name}
                    className="group p-5 rounded-xl border border-white/5 bg-white/3 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
                  >
                    <p className="text-gold font-semibold text-sm mb-2">{item.name}</p>
                    <p className="text-pumice/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  Through all of this, the intention has not changed. What started as helping still remains at the
                  core of everything we do. The only difference is how that help is delivered today. It now involves
                  building systems that allow businesses to operate more efficiently, creating structures that support
                  long-term scalability, and increasingly, integrating AI into the way decisions are made and executed.
                </p>
              </div>

              {/* Section: Where We Are Now */}
              <div className="mt-16 mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <h2 className="text-xl sm:text-2xl font-bold text-snow tracking-tight">
                  Where We Are Now
                </h2>
              </div>

              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  Today, we are in a very different place than where we started. We have built multiple brands, formed
                  meaningful client partnerships, and grown into a team that is aligned on what we are trying to build.
                  But even with that progress, we are still early in the journey.
                </p>
                <p>
                  Because now, the focus is not just on building, it is on building intelligently. It is about
                  creating systems that last, about understanding how businesses can scale with clarity, and about
                  exploring how AI will reshape the way companies operate in the years to come. It is about helping
                  founders move faster, make better decisions, and build with more intention.
                </p>
              </div>

              {/* Section: What Comes Next */}
              <div className="mt-16 mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <h2 className="text-xl sm:text-2xl font-bold text-snow tracking-tight">
                  What Comes Next
                </h2>
              </div>

              <div className="space-y-5 text-pumice/85 text-base sm:text-lg leading-[1.85]">
                <p>
                  The first year was about finding our footing. It was about understanding where we add value and how
                  we can structure that value into something consistent and repeatable. The next phase is different. It
                  is about scale, visibility, and impact. It is about showing up more consistently, sharing what we
                  learn, building in public, and creating something that goes beyond individual projects or clients.
                </p>
                <p>
                  If there is one thing this journey has reinforced, it is this — everything started with simply
                  trying to help. And even as we grow, evolve, and expand, that is not something we intend to move
                  away from.
                </p>
              </div>

              {/* Pull quote 2 */}
              <blockquote className="my-12 pl-6 border-l-2 border-gold">
                <p className="text-snow text-xl sm:text-2xl font-medium leading-snug italic">
                  &ldquo;It is just something we plan to do at a much larger scale.&rdquo;
                </p>
              </blockquote>

              {/* Signature block */}
              <div className="mt-12 pt-8 border-t border-white/8 flex items-center gap-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 shrink-0">
                  <Image
                    src="/gokul-m-prabhu.jpg"
                    alt="Gokul M Prabhu"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-snow font-semibold text-sm">Gokul M Prabhu</p>
                  <p className="text-pumice/60 text-xs">Founder &amp; CEO, Laneway</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gold font-bold text-sm tracking-wider">LANEWAY</p>
                  <p className="text-pumice/50 text-xs">Transforming business with AI</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gold/5" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-gold/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <p className="text-xs tracking-widest uppercase text-gold/70 mb-4">Let&apos;s Work Together</p>
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-snow mb-5 max-w-2xl mx-auto leading-tight">
              Ready to Build Something That Lasts?
            </h3>
            <p className="text-pumice/70 mb-10 max-w-md mx-auto text-base leading-relaxed">
              Let&apos;s discuss how Laneway can help you scale with clarity, structure, and intelligence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-snow text-black font-semibold rounded-full hover:bg-[#F5B513] transition-all duration-300 text-sm"
            >
              Start a Conversation
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
