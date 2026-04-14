"use client"

import { motion } from "framer-motion"
import { Header } from "./header"
import { Footer } from "./footer"

export default function LanewayOpenHouse() {
  return (
    <>
      <Header />
      <main aria-label="Open House content">
        <section className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 bg-[#0e0e0e] text-white overflow-hidden font-sans border-t border-white/5">
          <div className="absolute inset-0 noise-texture pointer-events-none opacity-40 z-0" aria-hidden="true" />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(201,162,39,0.12)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* ── Desktop / Tablet: Two-column layout (md+) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-6xl hidden md:grid md:grid-cols-2 md:gap-16 lg:gap-24 items-center"
          >
            {/* LEFT COLUMN — Headline & description */}
            <div className="flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#C9A227] mb-7"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"
                />
                Limited spots · Applications open
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-heading text-[72px] lg:text-[88px] leading-[0.95] tracking-[0.03em] mb-2 font-bold"
              >
                Open <span className="block text-[#C9A227]">House</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-[24px] lg:text-[28px] tracking-[0.12em] text-[#888888] mb-8 uppercase"
              >
                Anniversary Edition
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="w-12 h-px bg-[#C9A227] opacity-40 mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[15px] lg:text-[16px] font-medium text-[#999999] leading-relaxed max-w-[460px]"
              >
                A year ago we started LANEWAY with one purpose — to help founders build, scale, and transform their businesses. A year later, that hasn't changed. Laneway's Open House is our way of living that mission out loud. A select few founders get a full week of hands-on consulting, marketing, and tech support from our team.
                We only have a few spots. If this sounds like something your business needs, claim yours now.          </motion.p>
            </div>

            {/* RIGHT COLUMN — Service cards & CTA */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="flex flex-col gap-2 w-full max-w-[440px] mb-11"
              >
                <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <path d="M2 12L8 4L14 12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 12L8 7.5L11 12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] font-bold text-white mb-px">Laneway Consulting</strong>
                    <span className="text-[12px] text-[#888888]">Strategy, market research &amp; growth planning</span>
                  </div>
                  <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded-full whitespace-nowrap">Free</span>
                </div>

                <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <circle cx="8" cy="8" r="3" stroke="#C9A227" strokeWidth="1.5" />
                      <path d="M8 2V4M8 12V14M2 8H4M12 8H14" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] font-bold text-white mb-px">7Zero Media</strong>
                    <span className="text-[12px] text-[#888888]">Branding, social media &amp; performance marketing</span>
                  </div>
                  <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded-full whitespace-nowrap">Free</span>
                </div>

                <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <rect x="2" y="3" width="12" height="9" rx="1.5" stroke="#C9A227" strokeWidth="1.5" />
                      <path d="M5 13H11" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M6 7L7.5 8.5L10 6" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-[13px] font-bold text-white mb-px">Laneway Labs</strong>
                    <span className="text-[12px] text-[#888888]">Web, app development &amp; AI automation</span>
                  </div>
                  <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa] bg-white/5 px-2 py-1 rounded-full whitespace-nowrap">Discounted</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <a
                  href="https://tally.so/r/NpY1Yj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#C9A227] text-[#0e0e0e] text-[14px] font-bold tracking-[0.04em] px-8 py-4 rounded-xl transition-all hover:bg-[#E0B830] hover:-translate-y-px active:translate-y-0"
                >
                  Claim your Open House spot
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#0e0e0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="mt-4 text-[12px] text-[#555555] tracking-[0.02em]">
                  Application-based · Hand-reviewed · One cohort only
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Mobile: Original single-column centered layout (below md) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#C9A227] mb-7"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"
              />
              Limited spots · Applications open
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-heading text-6xl leading-[0.95] tracking-[0.03em] mb-2 font-bold"
            >
              Open <span className="block text-[#C9A227]">House</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-xl tracking-[0.12em] text-[#888888] mb-8 uppercase"
            >
              Anniversary Edition
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="w-12 h-px bg-[#C9A227] opacity-40 mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[15px] font-medium text-[#999999] leading-relaxed max-w-[420px] mb-10"
            >
              We work with a small group of businesses each cohort. Fill out the application so we can understand where you are, what you&apos;re building, and whether this week is the right fit for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col gap-2 w-full max-w-[420px] mb-11"
            >
              <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-3 sm:p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path d="M2 12L8 4L14 12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 12L8 7.5L11 12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white mb-px">Laneway Consulting</strong>
                  <span className="text-[12px] text-[#888888]">Strategy, market research &amp; growth planning</span>
                </div>
                <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded-full whitespace-nowrap">Free</span>
              </div>

              <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-3 sm:p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <circle cx="8" cy="8" r="3" stroke="#C9A227" strokeWidth="1.5" />
                    <path d="M8 2V4M8 12V14M2 8H4M12 8H14" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white mb-px">7Zero Media</strong>
                  <span className="text-[12px] text-[#888888]">Branding, social media &amp; performance marketing</span>
                </div>
                <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#C9A227] bg-[#C9A227]/10 px-2 py-1 rounded-full whitespace-nowrap">Free</span>
              </div>

              <div className="flex items-center gap-3 bg-[#161616] border border-white/5 rounded-xl p-3 sm:p-4 text-left hover:border-[#C9A227]/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <rect x="2" y="3" width="12" height="9" rx="1.5" stroke="#C9A227" strokeWidth="1.5" />
                    <path d="M5 13H11" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 7L7.5 8.5L10 6" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white mb-px">Laneway Labs</strong>
                  <span className="text-[12px] text-[#888888]">Web, app development &amp; AI automation</span>
                </div>
                <span className="ml-auto text-[10px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa] bg-white/5 px-2 py-1 rounded-full whitespace-nowrap">Discounted</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <a
                href="https://tally.so/r/NpY1Yj"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#C9A227] text-[#0e0e0e] text-[14px] font-bold tracking-[0.04em] px-8 py-4 rounded-xl transition-all hover:bg-[#E0B830] hover:-translate-y-px active:translate-y-0"
              >
                Claim your Open House spot
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0e0e0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="mt-4 text-[12px] text-[#555555] tracking-[0.02em]">
                Application-based · Hand-reviewed · One cohort only
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
