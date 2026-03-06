"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BlogLikeShareBar } from "@/components/blogs/blog-like-share-bar"

interface Section {
  heading?: string
  text: string
}

interface BlogTemplateProps {
  title: string
  category: string
  date: string
  readTime: string
  image: string
  sections: Section[]
}

export function BlogTemplate({
  title,
  category,
  date,
  readTime,
  image,
  sections,
}: BlogTemplateProps) {
  // Derive slug from the current URL path: /blogs/my-slug → my-slug
  const pathname = usePathname()
  const slug = pathname.split("/").filter(Boolean).pop() ?? ""

  return (
    <section className="pt-36 pb-28">
      <div className="mx-auto max-w-5xl px-6">

        {/* CATEGORY */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-premium uppercase text-gold block mb-4"
        >
          {category}
        </motion.span>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow leading-tight mb-6"
        >
          {title}
        </motion.h1>

        {/* META + LIKE/SHARE (near title) */}
        <div className="text-pumice text-sm mb-12 flex flex-wrap items-center gap-6">
          <span>{date}</span>
          <span>{readTime}</span>
          <BlogLikeShareBar slug={slug} title={title} />
        </div>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video rounded-3xl overflow-hidden mb-16 glow-gold-sm"
        >
          <Image src={image} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>

        {/* CONTENT */}
        <article className="space-y-14 text-pumice leading-relaxed">

          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="space-y-5"
            >
              {section.heading && (
                <h2 className="font-heading text-2xl sm:text-3xl text-snow font-semibold tracking-wide border-l-4 border-gold pl-4">
                  {section.heading}
                </h2>
              )}

              <p className="text-base sm:text-lg leading-8">
                {section.text}
              </p>
            </motion.div>
          ))}

        </article>

        {/* LIKE/SHARE at end of article */}
        <div className="mt-16 pt-8 border-t border-[#1f1f1f]">
          <BlogLikeShareBar slug={slug} title={title} />
        </div>
      </div>
    </section>
  )
}
