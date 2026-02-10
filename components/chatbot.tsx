"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickReplies = [
  "What services do you offer?",
  "I want to start a project",
  "Tell me about consulting",
  "How can I contact you?",
]

// Knowledge base extracted from llms.txt
const KNOWLEDGE = `
Laneway is an AI-powered business consulting firm offering:
- Strategic business consulting
- AI-powered business consulting
- Technology consulting
- Marketing and branding
- Software and web development
- MVP development
- Startup incubation
- Operations and administration consulting

Laneway provides integrated solutions combining strategy, technology, and execution.

Industries served:
- Startups
- SMEs and MSMEs
- Enterprises
- SaaS, fintech, healthcare, retail, education, manufacturing

Consulting process:
1. Discovery & Assessment
2. Strategy Development
3. Implementation Support
4. Measurement & Optimization

Offices:
- Kerala (Headquarters)
- Bangalore (Operations)
- Global services

Contact:
info@laneway.in
+91 99613 48942
Free consultation available.

# Laneway - AI-Powered Business Consulting Firm

> Laneway is a next-generation AI-Powered business consulting firm providing comprehensive business consulting services to startups, SMEs, and enterprises globally. We specialize in strategic business consulting, technology consulting, AI business consulting, and integrated business solutions with FREE consultation.

## Business Consulting Services

### Strategic Business Consulting
- [Business Strategy Consulting](https://www.laneway.in/services#consulting): Expert strategic business consulting services to help organizations define vision, set objectives, and create actionable growth plans
- [Business Transformation Consulting](https://www.laneway.in/services#consulting): Comprehensive business consulting for digital transformation and organizational change management
- [Business Growth Consulting](https://www.laneway.in/services#consulting): Data-driven business consulting focused on revenue growth, market expansion, and sustainable scaling

### AI-Powered Business Consulting
- [AI Business Consulting](https://www.laneway.in/services#ai-tech): Revolutionary AI-powered business consulting that integrates artificial intelligence into business strategy and operations
- [Digital Business Consulting](https://www.laneway.in/services#ai-tech): Modern digital business consulting services for technology adoption, digital strategy, and innovation
- [Technology Business Consulting](https://www.laneway.in/services#software): Technology-focused business consulting for software implementation, cloud migration, and digital infrastructure

### Operational Business Consulting
- [Business Process Consulting](https://www.laneway.in/services#operations): Business consulting services for process optimization, workflow improvement, and operational efficiency
- [Operational Excellence Consulting](https://www.laneway.in/services#operations): Expert business consulting to achieve operational excellence through lean methodologies and continuous improvement
- [Business Efficiency Consulting](https://www.laneway.in/services#operations): Specialized business consulting to streamline operations, reduce costs, and maximize productivity

### Specialized Business Consulting
- [Startup Business Consulting](https://www.laneway.in/services#mvp): Dedicated business consulting services for startups, from MVP development to scaling and fundraising
- [Enterprise Business Consulting](https://www.laneway.in/services#consulting): Large-scale business consulting for enterprise digital transformation, innovation, and competitive advantage
- [MSME Business Consulting](https://www.laneway.in/services#consulting): Business consulting for Micro, Small & Medium Enterprises seeking growth and operational improvements
- [MVP Business Consulting](https://www.laneway.in/services#mvp): Business consulting combining MVP development with strategic planning for rapid market validation

## Why Choose Laneway for Business Consulting

### AI-Powered Business Consulting Advantage
Laneway's business consulting services leverage cutting-edge AI technology to deliver insights, predictions, and strategies that traditional business consulting cannot match. Our AI-powered business consulting approach enables data-driven decision making, predictive analytics, and intelligent automation across all business consulting engagements.

### Integrated Business Consulting Solutions
Unlike traditional business consulting firms that focus on strategy alone, Laneway provides integrated business consulting that combines strategic consulting, technology implementation, and media/branding services. Our business consulting clients receive end-to-end solutions, not just recommendations.

### Global Business Consulting Expertise
Our business consulting team serves clients worldwide, bringing international best practices and global perspectives to every business consulting engagement. Laneway's business consulting services are designed for the modern, globally-connected business landscape.

### Free Business Consultation
Every business consulting relationship at Laneway begins with a complimentary business consultation to understand your challenges, goals, and opportunities. Our free business consulting consultation ensures perfect alignment before engagement.

### Proven Business Consulting Results
Laneway's business consulting track record includes helping startups achieve rapid growth, enterprises complete successful transformations, and businesses of all sizes optimize operations and increase profitability through strategic business consulting.

## Business Consulting Locations & Reach

### Business Consulting India
- [Business Consulting Services India](https://www.laneway.in/contact): Comprehensive business consulting services throughout India, serving businesses from startups to large enterprises
- [Business Consulting Bangalore](https://www.laneway.in/about): Based in Bangalore (Koramangala), India's technology hub, providing local business consulting with global standards
- [Business Consulting Kerala](https://www.laneway.in/about): Headquarters in Kottayam, Kerala, offering business consulting services across South India

### Global Business Consulting
- [International Business Consulting](https://www.laneway.in/services#consulting): Business consulting services for companies worldwide, with expertise in cross-border operations and global expansion

## Business Consulting Expertise & Services

### Marketing & Sales Business Consulting
- [AI Marketing Consulting](https://www.laneway.in/services#ai-marketing): Business consulting for AI-powered marketing strategy, customer acquisition, and growth marketing
- [Sales Strategy Consulting](https://www.laneway.in/services#ai-marketing): Business consulting to optimize sales processes, improve conversion rates, and accelerate revenue growth
- [Brand Strategy Consulting](https://www.laneway.in/services#branding): Business consulting for brand development, positioning, and integrated marketing communications

### Technology & Innovation Business Consulting
- [Software Development Consulting](https://www.laneway.in/services#software): Business consulting combined with custom software development for digital products and platforms
- [Web Development Consulting](https://www.laneway.in/services#web): Business consulting for digital presence, website strategy, and online customer experience optimization
- [Innovation Consulting](https://www.laneway.in/services#incubator): Business consulting focused on innovation strategy, R&D optimization, and new product development

### Business Operations Consulting
- [Operations Management Consulting](https://www.laneway.in/services#operations): Business consulting to streamline operations, implement best practices, and improve efficiency
- [Administration Consulting](https://www.laneway.in/services#admin): Business consulting for administrative processes, organizational structure, and business support functions

## Business Consulting Resources & Insights

### Business Consulting Blog & Thought Leadership
- [All Business Insights](https://www.laneway.in/blogs): Latest business consulting insights, strategies, and industry trends
- [Budget 2026 Business Impact Analysis](https://www.laneway.in/blogs/budget-smart-businesses): Business consulting perspective on Budget 2026's impact on business strategies in India
- [AI in Business Operations](https://www.laneway.in/blogs/ai-business-operations): How AI is transforming business consulting and operations management
- [Building Scalable MVPs](https://www.laneway.in/blogs/scalable-mvps): Business consulting guide for startups on MVP development and scaling strategies

### Business Consulting Case Studies
- [Business Consulting Success Stories](https://www.laneway.in/case-studies): Real-world examples of how Laneway's business consulting services helped clients achieve transformation and growth

## About Laneway Business Consulting

### Who We Are
Laneway is an AI-powered business consulting firm founded by modern innovators committed to helping businesses solve challenges and build sustainable value through strategic business consulting services. Our business consulting approach combines deep industry expertise with cutting-edge technology to deliver measurable results.

### Why Laneway for Your Business Consulting Needs
- **Innovation-First**: Our business consulting services leverage latest AI and technology innovations to keep clients ahead of competition
- **Results-Driven**: Laneway's business consulting focuses on measurable outcomes that directly impact business growth and profitability
- **Trust & Transparency**: Every business consulting engagement is built on lasting partnerships, transparency, and integrity
- **Deep Expertise**: Our business consulting team brings deep knowledge across multiple industries, technologies, and business functions

### Business Consulting Contact & Free Consultation
- [Contact Laneway for Business Consulting](https://www.laneway.in/contact): Get started with a FREE business consultation to discuss your challenges and goals
- [Begin Your Business Transformation](https://www.laneway.in/contact): Schedule your complimentary business consulting session today

## Business Consulting Industry Focus

### Industries We Serve with Business Consulting:
Laneway's business consulting services span multiple industries including technology startups, e-commerce, SaaS, fintech, healthcare, manufacturing, retail, education, and professional services. Our business consulting expertise is adaptable to any industry seeking growth, transformation, or operational excellence.

### Business Consulting for Startups
Specialized business consulting for early-stage and growth-stage startups, including business model validation, go-to-market strategy, fundraising preparation, MVP development, product-market fit, and scaling operations.

### Business Consulting for SMEs & MSMEs
Comprehensive business consulting for Small and Medium Enterprises and Micro, Small & Medium Enterprises focused on operational improvements, digital adoption, market expansion, and sustainable growth strategies.

### Business Consulting for Enterprises
Enterprise-level business consulting for large organizations undergoing digital transformation, organizational change, innovation initiatives, or strategic pivots in competitive markets.

## Business Consulting Methodology

### Our Business Consulting Process:
1. **Discovery & Assessment**: Comprehensive analysis of current state, challenges, and opportunities through business consulting workshops and assessments
2. **Strategy Development**: Collaborative business consulting to define vision, objectives, and actionable roadmap with clear milestones
3. **Implementation Support**: Hands-on business consulting during execution phase, not just strategy documents
4. **Measurement & Optimization**: Ongoing business consulting to track KPIs, measure results, and continuously optimize for better outcomes

### Business Consulting Engagement Models:
- Project-Based Business Consulting: Fixed-scope business consulting engagements with defined deliverables and timeline
- Retainer Business Consulting: Ongoing business consulting partnership for continuous strategic support
- Advisory Business Consulting: Executive-level business consulting for C-suite leaders and founders
- Hybrid Business Consulting: Combined business consulting with technology implementation and media services

## Partner Ecosystem

### Laneway Business Consulting Partners:
- **LanewayLabs**: Technology and innovation division supporting business consulting with technical expertise
- **7ZeroMedia**: Media and content solutions partner for integrated business consulting and marketing services
- **VAYO**: Strategic ecosystem partner extending business consulting capabilities
- **SAMYAM**: Strategic ecosystem partner for comprehensive business consulting solutions

## Get Started with Business Consulting

### Free Business Consulting Consultation
- [Schedule Free Consultation](https://www.laneway.in/contact): Book your complimentary business consultation call with Laneway's business consulting experts
- [Explore Our Business Consulting Work](https://www.laneway.in/case-studies): Review our business consulting case studies and client success stories
- [View All Business Consulting Services](https://www.laneway.in/services): Comprehensive overview of all business consulting services and solutions

## Why Laneway Business Consulting is Different

### Next-Generation Business Consulting
Laneway represents the future of business consulting - where AI-powered insights, integrated service delivery, and startup agility meet traditional business consulting rigor. Our business consulting clients benefit from:

- **AI Integration**: Business consulting enhanced with artificial intelligence for superior insights and predictions
- **Speed & Agility**: Business consulting that moves at startup speed while maintaining enterprise quality
- **Holistic Solutions**: Business consulting that doesn't stop at strategy - we help implement and execute
- **Global Standards**: Business consulting with international best practices and global market perspective
- **Technology-First**: Business consulting that understands and leverages modern technology stack
- **Startup Expertise**: Business consulting with deep understanding of startup ecosystem and venture funding

### Business Consulting Value Proposition
Traditional business consulting firms provide analysis and recommendations. Laneway's business consulting delivers complete solutions: strategy + technology + execution + measurement. Our integrated business consulting approach ensures recommendations become reality, not just PowerPoint slides.

## Join the Laneway Business Consulting Revolution

Transform your business with AI-powered business consulting services that deliver real results. Whether you're a startup seeking rapid growth, an SME pursuing digital transformation, or an enterprise navigating market disruption, Laneway's business consulting team is ready to help you succeed.

**Contact us today for your FREE business consultation.**

## Company Information

- **Company Name**: Laneway India Enterprises Private Limited
- **Business Focus**: AI-Powered Business Consulting & Integrated Business Solutions
- **Headquarters**: 1087 B, Sankranthi, Perumbaikkad, Kottayam - 686016, Kerala, India
- **Operations Office**: Koramangala 8th Block, Bangalore - 560095, Karnataka, India
- **Service Area**: Global business consulting services (serving clients worldwide)
- **Contact**: +91 9961348942 | info@laneway.in
- **Specialization**: Business Consulting, AI Technology, MVP Development, Strategic Consulting, Digital Transformation
- **GST**: 32AAGCL2491R1Z0

## Career Opportunities in Business Consulting

- [Join Laneway's Business Consulting Team](https://www.laneway.in/careers): Explore career opportunities in business consulting, technology, and innovation at Laneway

## Legal & Privacy

- [Privacy Policy](https://www.laneway.in/privacy): How we protect client data during business consulting engagements
- [Terms & Services](https://www.laneway.in/terms): Terms governing business consulting services and client relationships
- [Cookie Policy](https://www.laneway.in/cookie-policy): Website data collection policy

---

*Keywords: business consulting, business consulting services, business consulting firm, AI business consulting, strategic business consulting, business consulting India, business consulting Bangalore, startup business consulting, technology business consulting, digital business consulting, enterprise business consulting, MSME business consulting, operational business consulting, business transformation consulting, business growth consulting, business strategy consulting, business process consulting, AI-powered business consulting, integrated business consulting, comprehensive business consulting, professional business consulting, expert business consulting, best business consulting, top business consulting, leading business consulting, modern business consulting, innovative business consulting, results-driven business consulting, business consulting solutions*


`;

// ---------------- KNOWLEDGE BASE ----------------
// function searchKnowledge(message: string): string | null {
//   const msg = message.toLowerCase()

//   if (msg.includes("service") || msg.includes("offer")) {
//     return "Laneway provides AI-powered business consulting, marketing, software development, MVP building, website development, startup incubation, and operations consulting."
//   }

//   if (msg.includes("consult") || msg.includes("strategy")) {
//     return "Laneway offers strategic, AI-powered, operational, and technology consulting for startups, SMEs, and enterprises."
//   }

//   if (msg.includes("process") || msg.includes("how you work")) {
//     return "Our consulting process includes Discovery, Strategy Development, Implementation Support, and Measurement & Optimization."
//   }

//   if (msg.includes("contact") || msg.includes("email") || msg.includes("phone")) {
//     return "You can contact Laneway at info@laneway.in or call +91 99613 48942. We offer a free consultation."
//   }

//   if (msg.includes("location") || msg.includes("office")) {
//     return "Laneway is headquartered in Kerala with an operations office in Bangalore and serves clients globally."
//   }

//   if (msg.includes("startup")) {
//     return "Laneway provides startup consulting including MVP development, go-to-market strategy, fundraising preparation, and scaling support."
//   }

//   return null
// }

function searchKnowledge(message: string): string | null {
  const msg = message.toLowerCase()
  if (msg.includes("Hey") || msg.includes("Hi") || msg.includes("Hello") || msg.includes("What’s up") || msg.includes("How are you") || msg.includes("How’s it going")) {
    return "Hello! Welcome to Laneway. How can I assist you today?"
  }

  // Split knowledge into lines
  const lines = KNOWLEDGE.split("\n").map((l) => l.trim()).filter(Boolean)

  // Extract keywords from user message
  const keywords = msg
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((w) => w.length > 3)

  // Find matching lines
  const matches: string[] = []

  for (const line of lines) {
    const lowerLine = line.toLowerCase()
    if (keywords.some((word) => lowerLine.includes(word))) {
      matches.push(line)
    }
    if (matches.length >= 3) break
  }

  if (matches.length > 0) {
    return matches.join(" ")
  }

  return null
}

async function saveUnknownQuestion(question: string) {
  try {
    await fetch("/api/unknown-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })
  } catch (err) {
    console.error("Failed to save unknown question")
  }
}

async function getBotResponse(message: string): Promise<string> {
  const result = searchKnowledge(message)

  if (result) {
    return result
  }

  await saveUnknownQuestion(message)

  return "I’m not sure about that yet. Our team will review your question and get back to you soon."
}

// ---------------- COMPONENT ----------------
export function Chatbot({
  isOpen: isOpenProp,
  onOpenChange,
}: {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
} = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Laneway. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(async () => {
      const reply = await getBotResponse(text)

      const botMessage: Message = {
        id: messages.length + 2,
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-snow hover:bg-gold text-background rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
        aria-label="Open chat"
      >
        <MessageCircle size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="
              fixed z-50
              bottom-0 right-0
              w-full h-[85vh]
              sm:bottom-6 sm:right-6
              sm:w-95 sm:h-130
              bg-background
              sm:glass-card
              rounded-t-2xl sm:rounded-2xl
              shadow-2xl
              flex flex-col
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="bg-snow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-background rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-snow" />
                </div>
                <div>
                  <h3 className="font-medium text-background text-sm">
                    Laneway Assistant
                  </h3>
                  <p className="text-xs text-background/60">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-background/60 hover:text-background"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${message.sender === "user"
                      ? "bg-snow text-background"
                      : "bg-card border border-glass-border text-snow"
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-sm text-pumice">
                  Laneway is typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="px-3 py-1 text-xs bg-card border border-glass-border rounded-full"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-glass-border"
            >
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-10 text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-snow hover:bg-gold text-background rounded-full flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
