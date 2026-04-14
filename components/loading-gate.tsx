"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AnniversaryLoader from "@/components/anniversary-loader";

export default function LoadingGate({ children, initialHasSeen }: { children: React.ReactNode, initialHasSeen?: boolean }) {
  const [loading, setLoading] = useState(!initialHasSeen);

  // Optional: Only show once per session so it's not annoying
  useEffect(() => {
    // Check sessionStorage as a fallback in case cookies weren't sent or just set
    const hasSeenSession = sessionStorage.getItem("anniversary_seen");
    if (initialHasSeen || hasSeenSession) {
      if (hasSeenSession && !initialHasSeen) {
         document.cookie = "anniversary_seen=false; path=/";
      }
      setLoading(true);
    }
  }, [initialHasSeen]);

  const handleComplete = () => {
    sessionStorage.setItem("anniversary_seen", "false");
    document.cookie = "anniversary_seen=false; path=/";
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
