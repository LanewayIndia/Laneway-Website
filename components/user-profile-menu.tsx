"use client"

import { useState } from "react"
import { useSession } from "@/hooks/use-session"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, Settings } from "lucide-react"

export function UserProfileMenu() {
  const { user, loading } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    newPassword: "",
    confirmPassword: "",
  })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSuccess, setEditSuccess] = useState(false)

  if (loading) {
    return <div className="w-10 h-10 bg-slate-700 rounded-full animate-pulse" />
  }

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth")
  }

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
      if (editData.email !== user.email) {
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
      if (editData.name !== user.name || editData.phone !== user.phone) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            name: editData.name,
            phone: editData.phone,
          })
          .eq("id", user.id)

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
        setIsEditOpen(false)
      }, 2000)
    } catch (err) {
      setEditError("Error updating profile")
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <>
      {/* Profile Menu Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-border hover:bg-slate-700 transition min-h-10 touch-target"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold flex items-center justify-center text-black font-semibold text-sm">
            {user.name?.charAt(0) || user.email?.charAt(0)}
          </div>
          <span className="text-snow text-sm sm:text-base font-medium hidden sm:inline">
            {user.name || user.email?.split("@")[0]}
          </span>
          <ChevronDown size={16} className="text-pumice" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-card border border-border rounded-lg shadow-lg z-50">
            <div className="p-3 sm:p-4 border-b border-border">
              <p className="text-snow text-sm sm:text-base font-semibold">{user.name || "User"}</p>
              <p className="text-pumice text-xs sm:text-sm break-all">{user.email}</p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false)
                setIsEditOpen(true)
                setEditData({
                  name: user.name || "",
                  email: user.email || "",
                  phone: user.phone || "",
                  newPassword: "",
                  confirmPassword: "",
                })
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-snow hover:bg-slate-800 transition text-sm sm:text-base min-h-10"
            >
              <Settings size={16} className="sm:w-5 sm:h-5" />
              Edit Profile
            </button>

            <button
              onClick={() => {
                setIsOpen(false)
                handleLogout()
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-slate-800 transition text-sm sm:text-base border-t border-border min-h-10"
            >
              <LogOut size={16} className="sm:w-5 sm:h-5" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
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
                onClick={() => setIsEditOpen(false)}
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
    </>
  )
}
