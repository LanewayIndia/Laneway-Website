"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { memo } from "react"
import { AnimatedServiceIcon } from "@/components/ui/animated-service-icon"
import { ServiceVisual } from "@/components/ui/service-visual"
import {
  Brain,
  TrendingUp,
  Code,
  Rocket,
  Globe,
  Building,
  Settings,
  ClipboardList,
  Megaphone,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Cpu,
  Layers,
} from "lucide-react"

const categoryMeta = [
  { number: "01", Icon: BarChart3 },
  { number: "02", Icon: Cpu },
  { number: "03", Icon: Layers },
]

const categories = [
  {
    id: "business-consulting",
    title: "Business Consulting",
    description: "Strategic guidance and operational excellence to drive your business forward.",
    services: [
      {
        id: "consulting",
        icon: Brain,
        title: "Business Consulting",
        description:
          "We work closely with you to unlock growth, refine operations, and position your business for long-term success. Our approach blends strategic insight with precise execution to deliver measurable impact.",
        useCases: [
          "Growth strategy & market positioning",
          "Operational excellence & efficiency",
          "Insight-driven decision systems",
          "AI & technology transformation",
        ],
      },
      {
        id: "admin",
        icon: ClipboardList,
        title: "Business Administration",
        description:
          "Comprehensive administrative support that lets you focus on growth while we handle the day-to-day operational complexities.",
        useCases: [
          "Administrative process automation",
          "Document management systems",
          "Compliance and governance support",
          "Resource planning and allocation",
        ],
      },
      {
        id: "operations",
        icon: Settings,
        title: "Operations Management",
        description:
          "Streamline your operations for maximum efficiency. We help optimize workflows, reduce costs, and improve overall productivity.",
        useCases: [
          "Process mapping and optimization",
          "Supply chain management",
          "Quality assurance systems",
          "Operational KPI development",
        ],
      },
      {
        id: "incubator",
        icon: Building,
        title: "Startup Incubator & Early Stage Investor",
        description:
          "We support promising startups with funding, mentorship, and resources to help them scale from idea to successful business.",
        useCases: [
          "Seed and pre-seed investments",
          "Mentorship and advisory",
          "Network access and partnerships",
          "Growth strategy development",
        ],
      },
    ],
  },
  {
    id: "ai-tech-services",
    title: "AI & Tech Services",
    description: "Cutting-edge technology solutions powered by artificial intelligence.",
    services: [
      {
        id: "ai-tech",
        icon: Brain,
        title: "AI Powered Technology Solutions",
        description:
          "Implement cutting-edge AI solutions that automate processes, enhance customer experiences, and unlock new business capabilities.",
        useCases: [
          "Custom AI/ML model development",
          "Natural language processing solutions",
          "Computer vision applications",
          "Intelligent automation systems",
        ],
      },
      {
        id: "software",
        icon: Code,
        title: "Software Development Services",
        description:
          "End-to-end custom software development tailored to your specific business needs, from concept to deployment and beyond.",
        useCases: [
          "Enterprise application development",
          "Mobile app development (iOS & Android)",
          "API development and integration",
          "Legacy system modernization",
        ],
      },
      {
        id: "mvp",
        icon: Rocket,
        title: "MVP Building",
        description:
          "Rapidly prototype and validate your product ideas with our MVP development services. Get to market faster with a tested concept.",
        useCases: [
          "Rapid prototyping and iteration",
          "User feedback integration",
          "Scalable architecture design",
          "Go-to-market strategy support",
        ],
      },
      {
        id: "web",
        icon: Globe,
        title: "Website Development",
        description:
          "Create stunning, high-performance websites that captivate visitors and convert them into customers. Optimized for speed and SEO.",
        useCases: [
          "Corporate and brand websites",
          "E-commerce platforms",
          "Progressive web applications",
          "Landing pages and microsites",
        ],
      },
    ],
  },
  {
    id: "media-marketing-category",
    title: "Media & Marketing",
    description: "Comprehensive marketing strategies and media production to amplify your brand.",
    services: [
      {
        id: "media-marketing",
        icon: TrendingUp,
        title: "Media & Marketing",
        description:
          "We help you build a powerful brand presence through data-driven marketing and high-impact media strategies. By combining creativity with intelligent insights, we ensure your campaigns reach the right audience, deliver measurable results, and scale effectively.",
        useCases: [
          "Customer behavior insights & forecasting",
          "Content performance optimization",
          "Precision audience targeting",
          "Campaign performance automation",
        ],
      },
      {
        id: "branding",
        icon: Megaphone,
        title: "Branding, Media & Growth (7Zero Media)",
        description:
          "Full-service branding and media solutions to establish your market presence and accelerate growth through strategic communications.",
        useCases: [
          "Brand identity development",
          "Content strategy and creation",
          "Social media management",
          "PR and media relations",
        ],
      },
    ],
  },
]

const ServiceCard = memo(function ServiceCard({
  service,
  index,
}: {
  service: (typeof categories)[0]["services"][0]
  index: number
}) {
  const isReversed = index % 2 === 1

  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col lg:flex-row items-start gap-12 xl:gap-20 ${isReversed ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Service index marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono tracking-[0.2em] text-gold/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-8 h-px bg-gold/20" />
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/15 shrink-0 mt-0.5 shadow-[0_0_24px_rgba(245,181,19,0.08)]">
            <AnimatedServiceIcon icon={service.icon} />
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-snow leading-tight pt-1">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-pumice text-base leading-relaxed mb-8 font-light pl-16">
          {service.description}
        </p>

        {/* Use Cases */}
        <div className="mb-8 pl-16">
          <h4 className="text-[10px] tracking-premium uppercase text-pumice/50 mb-5">
            Key Use Cases
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.useCases.map((useCase: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-snow/75 text-sm leading-relaxed">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pl-16">
          <Link
            href={`/contact?service=${service.id}`}
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
          >
            <span>Get Started</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Visual Card */}
      <div className="flex-1 w-full">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-card border border-glass-border">
          {/* Inner glow + grid */}
          <div className="absolute inset-0 bg-linear-to-br from-gold/[0.07] via-transparent to-gold-light/4" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,181,19,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(245,181,19,0.025)_1px,transparent_1px)] bg-size-[40px_40px]" />

          {/* Corner frame marks */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/20 rounded-tl" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/20 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold/20 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/20 rounded-br" />

          <div className="absolute inset-0 flex items-center justify-center">
            <ServiceVisual id={service.id} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-background/80 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
})

ServiceCard.displayName = "ServiceCard"

export function ServicesList() {
  return (
    <section className="py-16 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-40">
          {categories.map((category, categoryIndex) => {
            const meta = categoryMeta[categoryIndex]

            return (
              <div key={category.id}>
                {/* ── Category Header ── */}
                <motion.div
                  id={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-20"
                >
                  {/* Background number watermark */}
                  <span className="absolute -top-4 right-0 text-[9rem] lg:text-[11rem] font-heading font-black text-gold/[0.035] leading-none select-none pointer-events-none">
                    {meta.number}
                  </span>

                  <div className="flex items-stretch gap-6 relative z-10">
                    {/* Left accent bar */}
                    <div className="w-0.5 shrink-0 rounded-full bg-linear-to-b from-gold via-gold/40 to-transparent" />

                    <div className="flex-1">
                      {/* Category label row */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[11px] font-mono tracking-[0.25em] text-gold">
                          {meta.number}
                        </span>
                        <div className="w-6 h-px bg-gold/30" />
                        <span className="text-[11px] tracking-premium uppercase text-pumice/70">
                          Service Category
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow mb-4 tracking-tight">
                        {category.title}
                      </h2>

                      {/* Description */}
                      <p className="text-pumice text-lg font-light leading-relaxed max-w-2xl mb-8">
                        {category.description}
                      </p>

                      {/* Service quick-nav pills */}
                      <div className="flex flex-wrap gap-2">
                        {category.services.map((service) => (
                          <a
                            key={service.id}
                            href={`#${service.id}`}
                            className="text-xs px-3.5 py-1.5 rounded-full border border-glass-border text-pumice/70 hover:border-gold/35 hover:text-snow transition-all duration-300"
                          >
                            {service.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Services within category ── */}
                <div className="space-y-28">
                  {category.services.map((service, serviceIndex) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      index={serviceIndex}
                    />
                  ))}
                </div>

                {/* ── Category separator ── */}
                {categoryIndex < categories.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mt-40"
                  >
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold/15 to-transparent" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-gold/25" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/45" />
                      <div className="w-1 h-1 rounded-full bg-gold/25" />
                    </div>
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold/15 to-transparent" />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
