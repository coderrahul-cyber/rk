// src/lib/gsap.ts
//
// Central GSAP setup file.
// Import `gsap` from here instead of directly from "gsap"
// so all plugins are always registered and tree-shaking works.
//
// Usage:
//   import { gsap, ScrollTrigger } from "@/lib/gsap";
//
// Install the Club GSAP plugins you have access to (ScrollSmoother etc.)
// or comment them out if using the free tier:
//   bun add gsap

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";   // Club GSAP — comment out if not available
import { Draggable } from "gsap/Draggable";    // Free

// Register once globally — safe to call multiple times
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    SplitText,    // Remove if not on Club plan
    Draggable,
  );

  // Performance: tell ScrollTrigger to use the native scroll on mobile
  ScrollTrigger.config({
    ignoreMobileResize: true,
    // Ensures ScrollTrigger calculations are accurate after fonts/images load
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });

  // Default GSAP defaults — reduces repetition in components
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, Draggable };
export default gsap;