"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { memo } from "react"
import { AnimatedServiceIcon } from "@/components/ui/animated-service-icon"
import { ServiceVisual } from "@/components/ui/service-visual"
import { Brain, TrendingUp, Code, Rocket, Globe, Building, Settings, ClipboardList, Megaphone, ArrowRight, CheckCircle } from "lucide-react"

const services = [
  {
    id: "ai-consulting",
    icon: Brain,
    title: "AI Powered Business Consulting",
    description:
      "Transform your business strategy with data-driven insights and AI-powered analytics. Our consultants help you identify opportunities and optimize operations.",
    useCases: [
      "Strategic planning with predictive analytics",
      "Process optimization and automation",
      "Data-driven decision making frameworks",
      "AI readiness assessments",
    ],
  },
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
    id: "ai-marketing",
    icon: TrendingUp,
    title: "AI Powered Marketing",
    description:
      "Leverage AI to create hyper-targeted campaigns, optimize ad spend, and deliver personalized customer experiences at scale.",
    useCases: [
      "Predictive customer analytics",
      "Automated content optimization",
      "Smart audience segmentation",
      "AI-driven campaign management",
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
]

// Memoized service card to prevent unnecessary re-renders
const ServiceCard = memo(function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  return (
    <motion.div
      key={service.id}
      id={service.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col lg:flex-row items-start gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center">
            <AnimatedServiceIcon icon={service.icon} />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-snow">{service.title}</h2>
        </div>

        <p className="text-pumice text-lg leading-relaxed mb-10 font-light">{service.description}</p>

        <div className="mb-10">
          <h3 className="text-xs tracking-premium uppercase text-pumice mb-6">Key Use Cases</h3>
          <ul className="space-y-4">
            {service.useCases.map((useCase, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-snow/80 text-sm">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
        >
          <span>Get Started</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Visual Card */}
      <div className="flex-1 w-full">
        <div className="relative aspect-4/3 glass-card rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-gold/5 via-transparent to-gold-light/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.02)_1px,transparent_1px)] bg-size-[40px_40px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ServiceVisual id={service.id} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-background to-transparent" />
        </div>
      </div>
    </motion.div>
  )
})

ServiceCard.displayName = "ServiceCard"

export function ServicesList() {
  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-32">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
