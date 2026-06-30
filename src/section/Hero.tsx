"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RevealCurtain from "@/components/RevealCurtain";
import HeroContent from "@/components/HeroContent";


gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Single source of truth for the timeline — identical sequencing/easing/
  // stagger to the original. Split into RevealCurtain / HeroContent for
  // readability only; the animation itself is untouched.
  useGSAP(
    () => {
      if (
        !overlayRef.current ||
        !logoRef.current ||
        !contentRef.current ||
        !mapRef.current
      )
        return;

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      gsap.set(contentRef.current.children, { opacity: 0, y: 30 });
      gsap.set(mapRef.current, { opacity: 0, y: 30, scale: 1.05 });

      tl.to(logoRef.current, { opacity: 0, duration: 0.4, delay: 0.6 })
        .to(overlayRef.current, { yPercent: -100, duration: 1.2 }, "-=0.2")
        .to(
          contentRef.current.children,
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.7"
        )
        .to(
          mapRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          "-=1"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef} 
      className="relative min-h-screen bg-[#E5E1D8] text-[#1A1A1A] font-serif overflow-hidden flex items-center"
    >
      <RevealCurtain ref={overlayRef}  logoRef={logoRef} />

      <main  className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16 px-2 md:px-12 xl:px-20 pt-20 pb-12 relative z-10">
        <HeroContent ref={contentRef} mapRef={mapRef} />
      </main>
    </div>
  );
}