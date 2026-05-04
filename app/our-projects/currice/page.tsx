"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SendIcon } from "@/components/ui/send"

export default function CurriceCaseStudy() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-28">

        {/* HERO */}
        <motion.div
           initial={{ opacity: 0, y: 28 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative text-center"
        >
          <div className="absolute -inset-10 bg-linear-to-br from-gold/20 to-transparent blur-3xl" />
          <Image
            src="/currice.png"
            alt="Currice Foods logo"
            width={180}
            height={180}
            className="mx-auto mb-8 object-contain"
            priority
          />
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Case Study by Laneway
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mt-6">
            Currice Foods: Building the Founder. Building the Brand.
          </h1>
          <p className="mt-6 text-xl text-pumice max-w-3xl mx-auto">
            How Laneway is helping Currice Foods grow through founder-led marketing across Instagram, LinkedIn, and Reddit.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-pumice/80">
            <span>Founder-Led Marketing</span>
            <span>·</span>
            <span>Instagram, LinkedIn, Reddit</span>
            <span>·</span>
            <span>Food & Beverage</span>
            <span>·</span>
            <span className="text-gold font-medium">● Active Partnership</span>
          </div>
        </motion.div>

        {/* ABOUT */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            About the Brand
          </h2>
          <p className="text-pumice leading-relaxed mb-8">
            Currice Foods is a layered experience brand built by founder Sujay S. Kashyap. It is not a food product — it is an experience ecosystem operating across four distinct verticals, each serving a different audience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-card border border-border rounded-xl p-6">
               <h3 className="text-gold font-bold text-lg mb-2">Currice Experience</h3>
               <p className="text-pumice">Live food stations for weddings & large-scale events</p>
             </div>
             <div className="bg-card border border-border rounded-xl p-6">
               <h3 className="text-gold font-bold text-lg mb-2">Currice Café</h3>
               <p className="text-pumice">Managed café experiences for corporate offices</p>
             </div>
             <div className="bg-card border border-border rounded-xl p-6">
               <h3 className="text-gold font-bold text-lg mb-2">Currice Daily</h3>
               <p className="text-pumice">Reliable daily meal solutions for office workers</p>
             </div>
             <div className="bg-card border border-border rounded-xl p-6">
               <h3 className="text-gold font-bold text-lg mb-2">Currice Executive</h3>
               <p className="text-pumice">Premium dining for leadership & high-end clients</p>
             </div>
          </div>
        </motion.section>

        {/* CHALLENGE */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            The Challenge
          </h2>
          <p className="text-pumice leading-relaxed mb-4">
            Currice had real traction on the ground — events, bookings, and a founder with a clear vision. But the digital presence wasn't keeping pace. Engagement on Instagram and LinkedIn was low, the four verticals weren't being communicated clearly, and the most powerful asset — the founder's story — wasn't being used at all.
          </p>
          <ul className="space-y-2 text-pumice list-disc list-inside ml-2">
            <li>Low engagement across Instagram and LinkedIn</li>
            <li>No consistent content cadence or brand voice online</li>
            <li>Four distinct verticals — none clearly spoken to digitally</li>
            <li>The founder's personal brand completely untapped</li>
          </ul>
        </motion.section>

        {/* STRATEGY */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Our Strategy
          </h2>
          <div className="space-y-6 text-pumice leading-relaxed">
            <p>
              At Laneway, we work with founders — not just brands. For Currice Foods, that meant one clear decision: put Sujay at the centre of the content, and build everything around his story, his events, and his world.
            </p>
            <div className="pl-6 border-l-2 border-gold italic opacity-90 text-lg my-8">
              "Experiences like Currice's aren't sold through scheduled posts. They are sold through presence, story, and a voice people trust before they ever walk through the door."
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-gold font-bold">01</span> <span className="text-snow font-bold">Instagram</span> — Consistent reels, stories, and community management capturing the energy of every Currice event.
              </div>
              <div>
                <span className="text-gold font-bold">02</span> <span className="text-snow font-bold">LinkedIn</span> — First-person posts written as Sujay — event recaps, founder reflections, milestones — targeting corporate and B2B audiences.
              </div>
              <div>
                <span className="text-gold font-bold">03</span> <span className="text-snow font-bold">Reddit</span> — Active participation in r/bangalore and relevant food communities to build organic reach.
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3-MONTH ROADMAP */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-8">
            3-Month Roadmap
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-6">
              <div className="md:w-32 shrink-0">
                <span className="text-gold font-bold">Month 1</span>
              </div>
              <div className="md:w-48 shrink-0">
                <span className="text-snow font-semibold">Foundation & Setup</span>
              </div>
              <div className="text-pumice">
                Brand alignment, account optimisation, content tone locked in, first reels and posts live.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-6">
              <div className="md:w-32 shrink-0">
                <span className="text-gold font-bold">Month 2</span>
              </div>
              <div className="md:w-48 shrink-0">
                <span className="text-snow font-semibold">Growth Testing</span>
              </div>
              <div className="text-pumice">
                Testing content pillars, analysing audience response, refining the hook. Best-performing formats identified.
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 pb-6">
              <div className="md:w-32 shrink-0">
                <span className="text-gold font-bold">Month 3</span>
              </div>
              <div className="md:w-48 shrink-0">
                <span className="text-snow font-semibold">Performance Scaling</span>
              </div>
              <div className="text-pumice">
                Doubling down on winning formats. Community engagement deepened. Full performance review with data-backed recommendations.
              </div>
            </div>
          </div>
        </motion.section>

        {/* DELIVERABLES */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-8">
            What We Deliver Every Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">01</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Reels</h3>
                <p className="text-pumice text-sm">2–3 reels edited from Sujay's raw footage, formatted for Instagram and LinkedIn</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">02</span>
              <div>
                <h3 className="text-snow font-bold mb-2">LinkedIn Posts</h3>
                <p className="text-pumice text-sm">6–8 posts written in first person as Sujay — event recaps, founder reflections, milestones</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">03</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Captions & Copy</h3>
                <p className="text-pumice text-sm">All post captions across Instagram, LinkedIn, and Reddit — written in his voice</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">04</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Stories & Community</h3>
                <p className="text-pumice text-sm">Daily Instagram stories, DM and comment handling, LinkedIn engagement</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">05</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Reddit</h3>
                <p className="text-pumice text-sm">Active participation in r/bangalore and relevant food communities</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">06</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Static Creatives</h3>
                <p className="text-pumice text-sm">2–3 designed posts for event announcements and key moments</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">07</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Content Calendar</h3>
                <p className="text-pumice text-sm">Full monthly plan — dates, platform, caption drafts — approved before anything goes live</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex gap-4">
              <span className="text-gold font-bold text-xl">08</span>
              <div>
                <h3 className="text-snow font-bold mb-2">Performance Report</h3>
                <p className="text-pumice text-sm">Reach, impressions, engagement, follower growth, and what changes next month</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gold italic text-sm">
            3-month totals: 9–12 reels · 18–24 LinkedIn posts · 6–9 static creatives · 3 content calendars · 3 performance reports
          </div>
        </motion.section>

        {/* RESULTS */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Results & Impact
          </h2>
          <p className="text-pumice mb-6">
            This is an active, ongoing partnership. Results are building month on month.
          </p>
          <ul className="space-y-3 text-pumice">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>Founder-led content strategy live across Instagram, LinkedIn, and Reddit</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>Consistent content cadence established for the first time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>Sujay's personal brand being built alongside Currice Foods</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>All four verticals clearly represented in the content ecosystem</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>Community management running across all platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✔</span> 
              <span>Results compounding — month on month</span>
            </li>
          </ul>
        </motion.section>

        <motion.div className="flex justify-center gap-8">
          <SendIcon size={28} className="hover:text-gold cursor-pointer transition-colors" />
        </motion.div>
      </div>
    </section>
  )
}
