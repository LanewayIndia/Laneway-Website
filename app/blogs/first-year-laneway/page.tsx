"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { BlogLikeShareBar } from "@/components/blogs/blog-like-share-bar"

const ecosystemItems = [
  {
    name: "Laneway",
    desc: "The foundation where strategy and consulting come together.",
  },
  {
    name: "Laneway Labs",
    desc: "Exploring AI, automation, and the systems that will define future businesses.",
  },
  {
    name: "7ZeroMedia",
    desc: "Translating ideas into visibility, content, and distribution.",
  },
  {
    name: "Vayo",
    desc: "Representing the problems we aim to solve and communities we want to build for.",
  },
]

export default function FirstYearLanewayBlog() {
  return (
    <section className="pt-32 pb-28 relative">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-gold/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-pumice hover:text-gold transition-colors duration-200 text-sm font-medium mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Category */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-widest uppercase text-gold block mb-4"
        >
          Company · Founder&apos;s Perspective
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow leading-tight mb-8"
        >
          The First Year of Laneway
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-4 text-pumice/70 text-sm mb-10"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Apr 15, 2026
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            8 min read
          </span>
          <span className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-gold/30">
              <Image src="/gokul-m-prabhu.jpg" alt="Gokul M Prabhu" fill className="object-cover" />
            </div>
            <span>Gokul M Prabhu</span>
          </span>
          <BlogLikeShareBar slug="first-year-laneway" title="The First Year of Laneway" />
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-14"
          style={{ boxShadow: "0 0 60px rgba(245,181,19,0.08), 0 24px 60px rgba(0,0,0,0.5)" }}
        >
          <Image
            src="/1.svg"
            alt="The First Year of Laneway"
            width={1080}
            height={1350}
            className="w-full h-auto"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/50" />
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1.5 bg-gold text-coal text-xs font-semibold rounded-full">
              One Year of Building
            </span>
          </div>
        </motion.div>

        {/* Article */}
        <article className="space-y-6 text-pumice/85 text-base sm:text-lg leading-[1.85]">

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-heading text-2xl sm:text-3xl text-snow font-semibold border-l-4 border-gold pl-4 mb-5">
              One Year of Building With Intention
            </h2>
            <p>
              A year ago, we did not exist in the form we do today. There was no clear structure, no defined system,
              and no roadmap that outlined what we would eventually become. What existed instead was something much
              simpler — an intention to help.
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            In the earliest days, we were not a company. We were a series of conversations. Businesses reached out
            with questions, challenges, and uncertainties, and we responded in the only way we knew how — by trying
            to bring clarity. There was no positioning behind it, no structured offering, and no long-term plan
            attached to those interactions. It was simply an effort to be useful wherever we could.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Over time, a pattern began to emerge. The conversations were not isolated. The problems were not unique.
            And more importantly, the solutions were working. What started as informal guidance began to create
            tangible outcomes. That realisation became the foundation on which everything else was built.
          </motion.p>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="my-10 pl-6 border-l-2 border-gold"
          >
            <p className="text-snow text-xl sm:text-2xl font-medium leading-snug italic">
              &ldquo;Building a business and scaling a business are fundamentally different challenges.&rdquo;
            </p>
          </motion.blockquote>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
            Before we took shape as Laneway, the journey that informed us came from years of experience in
            e-commerce. It was a space that demanded constant learning, adaptation, and resilience. Through repeated
            cycles of experimentation and failure, one insight became clear — building a business and scaling a
            business are fundamentally different challenges. What works in one environment does not always translate
            to another, and understanding that difference is what defines long-term success.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            That understanding shaped how we approached every problem moving forward.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            At one stage, the focus shifted toward building a product of our own through Vayo. It represented a
            direction we believed in, and for a time, it felt like the right path. However, as we continued to test
            and validate the idea, it became evident that the timing and structure were not aligned with
            sustainability. Recognising that was not easy, but it was necessary.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
            What followed was not a planned pivot, but a gradual shift driven by real interactions. The turning
            point came when the first client placed trust in us — not because of a defined service, but because they
            needed clarity. That moment marked a transition from unstructured support to something that could be
            systemised and scaled.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }} className="font-medium text-snow">
            From there, Laneway began to take shape.
          </motion.p>

          {/* Section heading */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
            <h2 className="font-heading text-2xl sm:text-3xl text-snow font-semibold border-l-4 border-gold pl-4 mt-6 mb-5">
              Building the Ecosystem
            </h2>
            <p>
              The focus was not just on growth, but on building with intention. Instead of expanding in a single
              direction, we structured ourselves to address different aspects of business transformation. This led to
              the creation of an ecosystem.
            </p>
          </motion.div>

          {/* Ecosystem cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8"
          >
            {ecosystemItems.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-xl border border-white/5 bg-white/3 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
              >
                <p className="text-gold font-semibold text-sm mb-2">{item.name}</p>
                <p className="text-pumice/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}>
            Each of these components serves a purpose, but together, they form a unified approach. Because over
            time, it became clear that businesses do not operate in silos. Strategy without execution fails.
            Execution without visibility limits growth. And growth without systems cannot sustain itself. Our role
            evolved to address all of these layers — not independently, but as interconnected parts of a larger
            system.
          </motion.p>

          {/* Section heading */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54 }}>
            <h2 className="font-heading text-2xl sm:text-3xl text-snow font-semibold border-l-4 border-gold pl-4 mt-6 mb-5">
              What Helping Means Now
            </h2>
            <p>
              What &ldquo;helping&rdquo; meant in the beginning has also evolved. It is no longer limited to advice
              or direction. It now involves building structured systems, enabling execution at scale, and integrating
              artificial intelligence into the way businesses operate and make decisions. The intention remains
              unchanged, but the way it is delivered has become more defined, more scalable, and more impactful.
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}>
            Today, we stand at the end of our first year in a very different position from where we started. We have
            built multiple brands, formed meaningful partnerships, and established a growing team aligned with a
            shared vision. More importantly, we have gained clarity — about what we do, how we do it, and where we
            are heading.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}>
            At the same time, we recognise that we are still at an early stage.
          </motion.p>

          {/* Section heading */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="font-heading text-2xl sm:text-3xl text-snow font-semibold border-l-4 border-gold pl-4 mt-6 mb-5">
              The Next Phase
            </h2>
            <p>
              Because the focus ahead is not just on continuing to build, but on building intelligently. It is about
              creating systems that last, enabling businesses to scale with intention, and exploring how artificial
              intelligence will reshape the way organisations operate in the years to come. It is about consistency,
              visibility, and long-term impact.
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
            The first year was about understanding and foundation. The next phase is about scale. It is about
            showing up consistently, sharing what we learn, building in public, and expanding the impact of what we
            have started. It is about moving from isolated outcomes to repeatable systems that can support businesses
            at a much larger scale.
          </motion.p>

          {/* Closing pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.64 }}
            className="my-10 pl-6 border-l-2 border-gold"
          >
            <p className="text-snow text-xl sm:text-2xl font-medium leading-snug italic">
              &ldquo;Everything began with the simple act of trying to help. That has not changed — what has changed
              is the scale at which we intend to do it.&rdquo;
            </p>
          </motion.blockquote>

        </article>

        {/* Author + share bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-gold/30 shrink-0">
              <Image src="/gokul-m-prabhu.jpg" alt="Gokul M Prabhu" fill className="object-cover" />
            </div>
            <div>
              <p className="text-snow font-semibold text-sm leading-tight">Gokul M Prabhu</p>
              <p className="text-pumice/60 text-xs">Founder &amp; CEO, Laneway</p>
            </div>
          </div>
          <BlogLikeShareBar slug="first-year-laneway" title="The First Year of Laneway" />
        </motion.div>

        {/* Closing brand block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-10 p-6 rounded-2xl border border-gold/10 bg-gold/5 text-center"
        >
          <p className="text-gold font-bold tracking-widest text-sm mb-1">LANEWAY</p>
          <p className="text-pumice/60 text-xs">Transforming business with AI-powered excellence</p>
        </motion.div>

      </div>
    </section>
  )
}
