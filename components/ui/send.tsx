"use client";

import * as React from "react";

export function SendIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  shareTitle,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
  shareTitle?: string;
}) {
  const handleShare = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e);
      return;
    }
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = shareTitle || document.title;
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-pointer ${className || ""}`}
      onClick={handleShare}
      {...props}
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"/>
    </svg>
  );
}
