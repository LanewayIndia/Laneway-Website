"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useSession } from "@/hooks/use-session"
import { UserProfileMenu } from "./user-profile-menu"
import { supabase } from "@/lib/supabase"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Careers", href: "/careers" },
  { name: "About Us", href: "/about" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSuccess, setEditSuccess] = useState(false)
  const router = useRouter()
  const { user, loading } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when modal or mobile menu is open
  useEffect(() => {
    if (isEditModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isEditModalOpen, isMobileMenuOpen])

  const handleUpdateProfile = async () => {
    setEditError(null)
    setEditSuccess(false)
    setEditLoading(true)

    // Validate passwords match if provided
    if (editData.newPassword || editData.confirmPassword) {
      if (editData.newPassword !== editData.confirmPassword) {
        setEditError("Passwords do not match")
        setEditLoading(false)
        return
      }
      if (editData.newPassword.length < 6) {
        setEditError("Password must be at least 6 characters")
        setEditLoading(false)
        return
      }
    }

    try {
      // Update email using client auth if changed
      if (editData.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: editData.email,
        })
        if (emailError) {
          setEditError(emailError.message || "Failed to update email")
          setEditLoading(false)
          return
        }
      }

      // Update password using client auth if provided
      if (editData.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: editData.newPassword,
        })
        if (passwordError) {
          setEditError(passwordError.message || "Failed to update password")
          setEditLoading(false)
          return
        }
      }

      // Update profile (name and phone) directly with RLS protection
      if (editData.name !== user?.name || editData.phone !== user?.phone) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            name: editData.name,
            phone: editData.phone,
          })
          .eq("id", user?.id)

        if (profileError) {
          setEditError(profileError.message || "Failed to update profile")
          setEditLoading(false)
          return
        }
      }

      setEditSuccess(true)
      setEditData({
        ...editData,
        newPassword: "",
        confirmPassword: "",
      })
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsEditModalOpen(false)
      }, 2000)
    } catch (err) {
      setEditError("Error updating profile")
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-glass-border" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 sm:h-24 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <motion.span
              className="font-heading text-2xl font-bold tracking-tight text-snow"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            >

              <motion.span
                className="font-heading text-2xl font-bold tracking-tight text-gold flex items-center gap-2"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/Laneway-Logo.png"
                  alt="Laneway Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                LANEWAY
              </motion.span>

            </motion.span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-normal text-pumice hover:text-snow transition-colors duration-300 group"
              >
                <span className="tracking-wide">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <UserProfileMenu />
            ) : (
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
              >
                <span>Begin Your Transformation</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-snow hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-glass-border max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <nav className="flex flex-col px-6 py-8 gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-heading font-medium text-snow hover:text-gold transition-colors py-3"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.4 }}
                className="pt-6 mt-4 border-t border-glass-border"
              >
                {user ? (
                  <div className="space-y-4">
                    <div className="px-4 py-4 bg-slate-800/50 rounded-lg border border-border">
                      <p className="text-snow font-semibold text-base">{user.name || "User"}</p>
                      <p className="text-pumice text-xs break-all mt-1">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditData({
                          name: user.name || "",
                          email: user.email || "",
                          phone: user.phone || "",
                          newPassword: "",
                          confirmPassword: "",
                        })
                        setIsEditModalOpen(true)
                      }}
                      className="w-full px-4 py-4 h-12 text-snow bg-gold/20 border border-gold/50 hover:bg-gold/30 hover:border-gold transition-all text-base font-semibold rounded-lg"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut()
                        setIsMobileMenuOpen(false)
                        router.push("/")
                      }}
                      className="w-full px-4 py-4 h-12 text-background bg-red-500 hover:bg-red-600 rounded-lg transition-all text-base font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-background bg-snow rounded-full hover:bg-gold transition-all duration-300"
                  >
                    Get In Touch
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal for Mobile */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-snow text-xl sm:text-2xl font-bold mb-6">Edit Profile</h2>

            {editError && (
              <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg">{editError}</p>
            )}
            {editSuccess && (
              <p className="text-green-400 text-sm mb-4 p-3 bg-green-500/10 rounded-lg">Profile updated successfully!</p>
            )}

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full mb-4 p-3 sm:p-4 h-11 sm:h-12 rounded-lg bg-background border border-border text-snow placeholder:text-pumice/60 text-base"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="w-full mb-4 p-3 sm:p-4 h-11 sm:h-12 rounded-lg bg-background border border-border text-snow placeholder:text-pumice/60 text-base"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              className="w-full mb-4 p-3 sm:p-4 h-11 sm:h-12 rounded-lg bg-background border border-border text-snow placeholder:text-pumice/60 text-base"
            />

            {/* New Password */}
            <input
              type="password"
              placeholder="New Password (leave blank to keep current)"
              value={editData.newPassword}
              onChange={(e) => setEditData({ ...editData, newPassword: e.target.value })}
              className="w-full mb-4 p-3 sm:p-4 h-11 sm:h-12 rounded-lg bg-background border border-border text-snow placeholder:text-pumice/60 text-base"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={editData.confirmPassword}
              onChange={(e) => setEditData({ ...editData, confirmPassword: e.target.value })}
              className="w-full mb-6 p-3 sm:p-4 h-11 sm:h-12 rounded-lg bg-background border border-border text-snow placeholder:text-pumice/60 text-base"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 sm:py-4 h-11 sm:h-12 rounded-lg border border-border text-snow hover:bg-slate-800 transition font-medium text-base sm:text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={editLoading}
                className="flex-1 py-3 sm:py-4 h-11 sm:h-12 rounded-lg bg-gold text-background font-semibold disabled:opacity-60 transition text-base sm:text-lg"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}
