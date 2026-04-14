"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const howWeOperateData: Record<string, { title: string; desc: string }[]> = {
  "consulting": [
    { title: "Business Deep Dive", desc: "We start by understanding your goals, challenges, and current performance to identify high-impact opportunities." },
    { title: "Opportunity Mapping", desc: "We pinpoint where strategy, operations, or technology can drive the most value for your business." },
    { title: "Strategic Roadmapping", desc: "We design a clear, tailored plan that aligns initiatives with your growth objectives." },
    { title: "Targeted Execution", desc: "We implement focused solutions that deliver quick wins while building long-term capability." },
    { title: "Scale & Integration", desc: "Proven solutions are expanded across your business for maximum efficiency and consistency." },
    { title: "Ongoing Optimization", desc: "We continuously refine strategies and systems to keep you ahead in a changing market." }
  ],
  "ai-tech": [
    { title: "Requirements Gathering", desc: "Defining technical specs and use cases for the AI solution." },
    { title: "Data Preparation", desc: "Structuring and cleaning data for model training." },
    { title: "Architecture Design", desc: "Designing scalable infrastructure for AI models." },
    { title: "Model Development", desc: "Building, training, and testing the custom AI/ML model." },
    { title: "Integration", desc: "Seamlessly deploying the solution into your existing ecosystem." }
  ],
  "media-marketing": [
    { title: "Audience & Brand Analysis", desc: "We understand your audience, positioning, and current marketing effectiveness." },
    { title: "Campaign Strategy Design", desc: "We craft tailored marketing strategies aligned with your brand and business goals." },
    { title: "Content & Channel Optimization", desc: "We refine messaging and select the most effective platforms for maximum reach." },
    { title: "Execution & Performance Tracking", desc: "We launch campaigns and continuously monitor performance metrics." },
    { title: "Refinement & Scaling", desc: "We optimize what works and scale campaigns to maximize ROI and brand impact." }
  ],
  "software": [
    { title: "Requirements Analysis", desc: "Gathering and documenting detailed software requirements." },
    { title: "Architecture Design", desc: "Mapping out scalable software infrastructure." },
    { title: "UI/UX Prototyping", desc: "Creating interactive blueprints for user experiences." },
    { title: "Agile Development", desc: "Iteratively building the application with continuous feedback." },
    { title: "Quality Assurance", desc: "Rigorous testing to ensure security and performance." },
    { title: "Deployment & Support", desc: "Launching the application and providing ongoing support." }
  ],
  "mvp": [
    { title: "Concept Refinement", desc: "Sharpening your idea into a viable product description." },
    { title: "Market Validation", desc: "Testing assumptions with target user demographics." },
    { title: "Rapid Prototyping", desc: "Designing UI/UX flow to visualize the core product." },
    { title: "Core Development", desc: "Building essential features needed to enter the market." },
    { title: "Launch & Validate", desc: "Releasing to early adopters and gathering critical feedback." },
    { title: "Iteration", desc: "Refining the product based on real-world usage and data." }
  ],
  "web": [
    { title: "Discovery Workshop", desc: "Understanding brand guidelines and website goals." },
    { title: "UX/UI Design", desc: "Crafting intuitive and visually stunning interfaces." },
    { title: "Front-End Development", desc: "Building responsive, fast, and accessible layouts." },
    { title: "Back-End Integration", desc: "Connecting databases, CMS, and required APIs." },
    { title: "Quality Testing", desc: "Ensuring cross-browser compatibility and responsiveness." },
    { title: "Optimization & Launch", desc: "SEO, speed testing, and final deployment." }
  ],
  "incubator": [
    { title: "Pitch Evaluation", desc: "Assessing the potential of your startup idea." },
    { title: "Due Diligence", desc: "Reviewing business models, market fit, and financials." },
    { title: "Strategic Roadmap", desc: "Defining clear growth and funding milestones." },
    { title: "Resource Alignment", desc: "Providing mentorship, tools, and initial capital." },
    { title: "Scale to Market", desc: "Guiding the startup towards successful launch or Series A." }
  ],
  "operations": [
    { title: "Workflow Audit", desc: "Identifying bottlenecks in your current processes." },
    { title: "Root Cause Analysis", desc: "Determining the underlying issues causing inefficiencies." },
    { title: "Process Redesign", desc: "Creating streamlined and efficient operational frameworks." },
    { title: "System Implementation", desc: "Deploying new tools and standard operating procedures." },
    { title: "Team Training", desc: "Educating staff on new systems and best practices." },
    { title: "Continuous Monitoring", desc: "Tracking KPIs to ensure sustained efficiency gains." }
  ],
  "admin": [
    { title: "Needs Assessment", desc: "Understanding your current administrative workload." },
    { title: "Tool Selection", desc: "Choosing the right software for task management." },
    { title: "Process Automation", desc: "Setting up digital tools to handle repetitive tasks." },
    { title: "Resource Allocation", desc: "Assigning dedicated support for day-to-day operations." },
    { title: "Ongoing Management", desc: "Providing continuous business administration support." }
  ],
  "branding": [
    { title: "Brand Audit", desc: "Evaluating your current brand presence and market position." },
    { title: "Competitor Analysis", desc: "Analyzing industry peers to find unique positioning." },
    { title: "Identity Creation", desc: "Developing a cohesive visual and verbal brand strategy." },
    { title: "Content Production", desc: "Creating high-quality media assets and copy." },
    { title: "Omnichannel Rollout", desc: "Launching the brand across all relevant platforms." },
    { title: "Performance Review", desc: "Monitoring brand sentiment and adjusting strategies." }
  ]
};

const serviceNames: Record<string, string> = {
  "consulting": "Consulting",
  "ai-tech": "AI Technology",
  "media-marketing": "Media & Marketing",
  "software": "Software Development",
  "mvp": "MVP Building",
  "web": "Website Development",
  "incubator": "Startup Incubator",
  "operations": "Operations Management",
  "admin": "Business Administration",
  "branding": "Branding & Media"
};

function HowWeOperateInner() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")
  
  const [serviceData, setServiceData] = useState<{ title: string; desc: string }[] | null>(null)
  const [serviceName, setServiceName] = useState<string>("")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (serviceParam && howWeOperateData[serviceParam]) {
      setServiceData(howWeOperateData[serviceParam])
      setServiceName(serviceNames[serviceParam] || serviceParam)
      
      // Smooth scroll to this section on load
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    }
  }, [serviceParam])

  // GSAP Animations
  useEffect(() => {
    if (!serviceData || !sectionRef.current) return;

    // Refresh ScrollTrigger when components mount/change
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // 1. Left Side: Fade and slide up when section is reached
      gsap.fromTo(
        ".left-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Progress Line Growth Tracking
      gsap.to(".progress-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 50%",
          end: "bottom 50%",
          scrub: 0.5, // Smooth scrubbing
        }
      });

      // 3. Step Cards Animation (Progressive Reveal & Dimming)
      const stepCards = gsap.utils.toArray<HTMLElement>(".step-card");
      
      stepCards.forEach((card, i) => {
        const numberIndicator = card.querySelector(".number-indicator");
        const dotIndicator = card.querySelector(".step-dot");
        
        // Initial entry animation (slides in with low opacity)
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 0.3,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers slightly before it enters middle viewport
              toggleActions: "play none none reverse",
            }
          }
        );

        // Highlight Active State & Dim Previous State
        gsap.to(card, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 60%", // Becomes active when reaching middle area
            end: "bottom 40%", // Becomes inactive when it scrolls past middle
            toggleActions: "play reverse play reverse",
          }
        });

        // Numbers & Dots Highlight Animation
        if (numberIndicator) {
          gsap.to(numberIndicator, {
            borderColor: "rgba(201, 168, 85, 0.8)", 
            color: "#c9a855",
            boxShadow: "0 0 20px rgba(201, 168, 85, 0.15)",
            duration: 0.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play reverse play reverse",
            }
          });
        }
        
        if (dotIndicator) {
          gsap.to(dotIndicator, {
            scale: 1,
            backgroundColor: "#c9a855",
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play reverse play reverse",
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [serviceData]);

  if (!serviceData) {
    return null
  }

  return (
    <section ref={sectionRef} className="pt-32 pb-24 relative bg-background" id="how-we-operate">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-gold-light/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* LEFT SIDE - Static/Sticky Title */}
          <div className="lg:w-5/12 lg:pt-8">
            <div className="sticky top-32 lg:top-40 left-content">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-gold">OUR PROCESS</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-snow mb-6 leading-tight">
                How We<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-gold-light">Operate</span>
              </h2>
              <p className="text-lg text-pumice max-w-md leading-relaxed">
                Our approach to delivering <span className="font-semibold text-snow">{serviceName}</span>.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Scrollable Dynamic Steps */}
          <div className="lg:w-7/12 steps-container">
            <div className="space-y-6 sm:space-y-12 relative pt-8 lg:pt-20">
              
              {/* Central Progress Line Background */}
              <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-glass-border hidden sm:block" />
              
              {/* Growing Progress Line Fill */}
              <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-linear-to-b from-gold to-gold-light hidden sm:block origin-top scale-y-0 progress-line-fill z-0" />
              
              {serviceData.map((step, index) => (
                <StepCard 
                  key={index} 
                  step={step} 
                  index={index} 
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: { title: string; desc: string }, index: number }) {
  // Format number to '01', '02', etc.
  const formattedNumber = (index + 1).toString().padStart(2, '0');

  return (
    <div className="relative flex gap-6 sm:gap-10 group step-card opacity-0">
      
      {/* Scroll indicator components */}
      <div className="relative z-10 shrink-0 hidden sm:flex flex-col items-center">
        {/* Step Dot over the progress line */}
        <div className="absolute -left-1.5 top-5 w-3 h-3 bg-glass-border rounded-full z-20 step-dot scale-75 transform transition-colors" />
        
        {/* Number Box */}
        <div className="number-indicator w-14 h-14 bg-background border-2 border-glass-border rounded-2xl flex items-center justify-center font-heading text-xl font-bold text-pumice transition-all duration-300 ml-8 relative z-10">
          {formattedNumber}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-4 sm:pb-8 w-full max-w-full">
        <div className="glass-card rounded-3xl p-6 sm:p-10 hover:border-gold/20 transition-all duration-500 overflow-hidden relative">
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none" />

          {/* Mobile number indicator */}
          <div className="sm:hidden w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center font-heading text-sm font-bold text-gold mb-5 number-indicator shadow-[0_0_15px_rgba(201,168,85,0.15)]">
             {formattedNumber}
          </div>
          
          <h3 className="text-2xl font-heading font-semibold text-snow mb-3 transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-pumice text-lg leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export function HowWeOperate() {
  return (
    <Suspense fallback={null}>
      <HowWeOperateInner />
    </Suspense>
  )
}

