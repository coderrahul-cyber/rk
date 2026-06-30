"use client";

import { forwardRef } from "react";

/**
 * Pure presentational component — owns no animation logic.
 * HeroSection drives the timeline; this just exposes the DOM nodes
 * gsap needs to target (overlay + logo) via refs.
 */
const RevealCurtain = forwardRef<HTMLDivElement, { logoRef: React.Ref<HTMLDivElement> }>(
  ({ logoRef }, overlayRef) => {
    return (
      <div
        ref={overlayRef} suppressHydrationWarning
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]"
      >
        <div
          ref={logoRef} 
          className="text-white text-xl md:text-3xl font-light tracking-widest italic select-none"
        >
          RK Greenfield Ventures
        </div>
      </div>
    );
  }
);

RevealCurtain.displayName = "RevealCurtain";

export default RevealCurtain;