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
  "Tell me about pricing",
  "How can I contact you?",
]

const botResponses: Record<string, string> = {
  services:
    "We offer a wide range of services including AI-powered technology solutions, marketing, business consulting, software development, MVP building, website development, startup incubation, and more. Would you like to learn more about any specific service?",
  project:
    "Great! We'd love to hear about your project. You can reach out to us through our contact form or email us at hello@laneway.ai. Our team typically responds within 24 hours.",
  pricing:
    "Our pricing varies based on the scope and complexity of each project. We offer customized solutions to fit different budgets. Would you like to schedule a consultation to discuss your specific needs?",
  contact:
    "You can reach us through multiple channels: Email us at hello@laneway.ai, call us at +1 (234) 567-890, or use the contact form on our website. We're also available for live chat during business hours.",
  default:
    "Thank you for your message! I'm here to help you navigate our services and find the right solutions for your business. Feel free to ask about our services, pricing, or how to get started with a project.",
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
    return botResponses.services
  }
  if (lowerMessage.includes("project") || lowerMessage.includes("start")) {
    return botResponses.project
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
    return botResponses.pricing
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email")) {
    return botResponses.contact
  }
  return botResponses.default
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
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

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-snow hover:bg-gold text-background rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
        aria-label="Open chat"
      >
        <MessageCircle size={22} strokeWidth={1.5} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 right-8 z-50 w-95 max-w-[calc(100vw-64px)] glass-card rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="bg-snow p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-snow" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-background text-sm">Laneway Assistant</h3>
                  <p className="text-xs text-background/60">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-background/60 hover:text-background transition-colors rounded-full"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        message.sender === "user" ? "bg-gold/20" : "bg-glass-border"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User size={14} className="text-gold" strokeWidth={1.5} />
                      ) : (
                        <Bot size={14} className="text-snow" strokeWidth={1.5} />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-snow text-background rounded-tr-sm"
                          : "bg-card border border-glass-border text-snow rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-glass-border rounded-full flex items-center justify-center">
                      <Bot size={14} className="text-snow" strokeWidth={1.5} />
                    </div>
                    <div className="bg-card border border-glass-border rounded-2xl rounded-tl-sm p-3">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-pumice rounded-full animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 bg-pumice rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-pumice rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 bg-background">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="px-3 py-1.5 text-xs bg-card border border-glass-border text-pumice rounded-full hover:border-gold/30 hover:text-snow transition-all duration-300"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-glass-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background border-glass-border text-snow placeholder:text-pumice/40 focus:border-gold/50 rounded-full h-10 text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-snow hover:bg-gold text-background rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-snow"
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
