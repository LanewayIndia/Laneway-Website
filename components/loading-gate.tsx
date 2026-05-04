"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnniversaryLoader from "@/components/anniversary-loader";

export default function LoadingGate({ children, initialHasSeen }: { children: ReactNode; initialHasSeen?: boolean }) {
  const [loading, setLoading] = useState(!initialHasSeen);

  // Optional: Only show once per session so it's not annoying
  useEffect(() => {
    // Check sessionStorage as a fallback in case cookies weren't sent or just set
    const hasSeenSession = sessionStorage.getItem("anniversary_seen") === "true";
    if (initialHasSeen || hasSeenSession) {
      if (hasSeenSession && !initialHasSeen) {
         document.cookie = "anniversary_seen=true; path=/";
      }
      setLoading(false);
    }
  }, [initialHasSeen]);

  const handleComplete = () => {
    sessionStorage.setItem("anniversary_seen", "true");
    document.cookie = "anniversary_seen=true; path=/";
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <AnniversaryLoader onComplete={handleComplete} />}
      </AnimatePresence>
      
      <div className={loading ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}
