"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuLinks = ["Home", "Properties", "Mumbai 3.0", "About Us"];
const navLinks = ["Contact", "Privacy Policy", "Terms of Service", "Investor Portal"];
const socialLinks = ["Instagram", "LinkedIn", "Twitter", "YouTube"];

// Shared static initial styles — applied directly in JSX so first paint
// already matches what GSAP's "from" state would set, regardless of how
// long JS takes to hydrate. This is what was causing the hydration
// mismatch: these elements were selected by className (.footer-col,
// .footer-social-link), not refs, so multiple elements at once were
// rendering fully visible, then GSAP would snap them to opacity:0 once
// its useEffect fired — a flash + the mismatch warning since React's
// server-rendered HTML never had these GSAP-applied inline styles.
const colInitial = { opacity: 0, transform: "translateY(40px)" } as const;
const socialInitial = { opacity: 0, transform: "translateY(16px)" } as const;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered column reveal
      // "from" state now matches the static style already on each
      // .footer-col element, so this animates TO the visible state only.
      gsap.to(".footer-col", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      });

      // 2. Divider draws left → right
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 92%",
          },
        }
      );

      // 3. Giant background text parallax
      // Initial opacity:0 set statically below — at 18vw, a brief flash
      // of fully-opaque text would be far more visible than the final
      // 0.07 opacity, so this one matters even though scrub recalculates
      // continuously once initialized.
      gsap.to(giantTextRef.current, {
        y: "0%",
        opacity: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 4. Building layer parallax
      // No opacity/visibility change involved (just a y-position scrub),
      // so no flash risk here — left as-is.
      gsap.fromTo(
        buildingRef.current,
        { y: "20%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
        }
      );

      // 5. Social links stagger
      // "from" state now matches the static style on each
      // .footer-social-link anchor.
      gsap.to(".footer-social-link", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-socials",
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#E5E1D8] text-[#1A1A1A] pt-10 md:pt-20 pb-10 overflow-hidden md:min-h-[70vh] min-h-[85dvh] flex flex-col justify-between z-10"
    >
      {/* =========================================
          TOP LAYER: Content & Links (z-30)
          ========================================= */}
      <div
        ref={contentRef}
        className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 relative z-30 mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-12 gap-y-12 gap-x-8">
          {/* ── Brand Column ── */}
          <div
            className="footer-col md:col-span-1 lg:col-span-5 flex flex-col space-y-6"
            suppressHydrationWarning
            style={colInitial}
          >
            <div className="font-serif text-3xl font-medium tracking-wide italic select-none">
              RK Greenfield Ventures
            </div>
            <p className="font-sans text-neutral-600 max-w-sm text-sm leading-relaxed tracking-wide">
              RK Greenfields Ventures brings discipline to land investment.
              Strategy, curated locations, and architectural mastery — made with
              intention.
            </p>
            <div className="pt-2">
              <button className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full hover:bg-neutral-800 active:scale-95 transition-all duration-300 font-sans text-sm font-medium">
                Download Brochure
              </button>
            </div>
          </div>

          {/* ── Links wrapper ── */}
          <div className="footer-col md:col-span-1 lg:contents grid grid-cols-2 lg:grid-cols-none gap-x-8 gap-y-6 md:gap-y-10" suppressHydrationWarning style={colInitial}>
            {/* Menu */}
            <div className="lg:col-span-2 lg:col-start-7 flex flex-col  space-y-2 md:space-y-4 font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-1">
                Menu
              </h4>
              {menuLinks.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors w-fit"
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2 flex flex-col space-y-2 md:space-y-4 font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-1">
                Navigation
              </h4>
              {navLinks.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors w-fit"
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="footer-socials col-span-2 lg:col-span-2 flex flex-col space-y-4 font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-1">
                Socials
              </h4>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:space-y-4">
                {socialLinks.map((s) => (
                  <a
                    key={s}
                    href="#"
                    suppressHydrationWarning
                    style={socialInitial}
                    className="footer-social-link text-sm text-neutral-600 hover:text-neutral-900 transition-colors
                               border border-neutral-400/40 hover:border-neutral-700 rounded-full px-4 py-1.5
                               lg:border-0 lg:rounded-none lg:px-0 lg:py-0 lg:w-fit lg:border-b lg:border-transparent lg:hover:border-neutral-600 lg:pb-px"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 relative z-30 font-sans">
        <div
          ref={dividerRef}
          suppressHydrationWarning
          className="w-full h-px bg-neutral-400/40 mb-6"
          style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
        />
        <div className="flex flex-col md:flex-row md:justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
          <p className="text-[10px] md:text-xs">© 2026 RK Greenfields Ventures — All rights reserved</p>
          <p className="mt-2 md:mt-0">Built with intention.</p>
        </div>
      </div>

      {/* =========================================
          MIDDLE LAYER: Giant Typography (z-10)
          ========================================= */}
      <div className="absolute bottom-30 md:bottom-20 left-0 w-full overflow-hidden flex justify-center pointer-events-none z-10">
        <h1
          ref={giantTextRef}
          suppressHydrationWarning
          style={{ opacity: 0, transform: "translateY(40%)" }}
          className="text-[17vw] md:text-[16vw] font-serif italic tracking-tighter text-[#1A1A1A] leading-none whitespace-nowrap select-none"
        >
          RK Greenfield
        </h1>
      </div>

      {/* =========================================
          FOREGROUND LAYER: Building Cutout (z-20)
          ========================================= */}
      <div
        ref={buildingRef}
        suppressHydrationWarning
        style={{ transform: "translateY(20%)" }}
        className="absolute bottom-0 left-0 w-full h-[40vh] md:h-[50vh] pointer-events-none z-20 flex items-end justify-center"
      >
        {/* Replace with: <Image src="/transparent-buildings.png" alt="Cityscape" fill className="object-contain object-bottom" sizes="100vw" /> */}
        <div className="w-full h-full bg-linear-to-t from-[#E5E1D8] via-transparent to-transparent" />
      </div>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#E5E1D8] to-transparent z-20 pointer-events-none" />
    </footer>
  );
}