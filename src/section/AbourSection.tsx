"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

// Registered once at module scope instead of on every mount.
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // For Parallax
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // --- ANIMATION A: Creative Image Parallax ---
      // (This naturally reverses because of 'scrub')
      gsap.fromTo(
        imageRef.current,
        { y: -80, scale: 1.1 },
        {
          y: 80,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // --- ANIMATION B: Premium Masked Headline Reveal ---
      // Initial hidden state is now set via static inline style on the
      // element (see JSX below) so it's correct on first paint, before
      // JS hydrates — no more flash of fully-visible text. We animate
      // TO the final state only.
      gsap.to(headlineRef.current, {
        y: "0%",
        rotate: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // --- ANIMATION C: Text & Elements Fade Up ---
      // Same fix: initial opacity:0 / y:30 is static in JSX now.
      const elementsToFade = [textRef.current, pillsRef.current];
      gsap.to(elementsToFade, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "restart reverse restart reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup when navigating away
  }, []);

  const propertyTypes = ["Residential", "Commercial", "Bungalows", "Investment Plots"];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-24 px-6 md:px-12 xl:px-20 font-serif overflow-hidden"
    >
      <div className="w-full max-w-[1600px] mx-auto flex justify-between items-center mb-20 font-sans text-sm tracking-wider">
        <h2 className="text-2xl font-serif italic text-neutral-800">Our Story</h2>
        <div className="text-neutral-500 uppercase text-xs">/ 2024-27 / ©</div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* LEFT: Image Container with Parallax Mask */}
        <div className="lg:col-span-5 w-full h-[60vh] lg:h-[80vh] relative overflow-hidden rounded-2xl">
          <div
            ref={imageContainerRef}
            className="w-full h-full relative overflow-hidden"
          >
            {/* The actual image div that animates (parallax) */}
            <div
              ref={imageRef}
              className="absolute -inset-10 bg-[#D9D5CC] flex flex-col items-center justify-center border border-neutral-400/30"
              style={{ height: "calc(100% + 160px)" }} // Make image taller so it has room to parallax
            >
              <Image
                src="/map.png"
                alt="Map Placeholder"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="font-sans text-xs uppercase tracking-widest text-neutral-500 mb-3 relative z-10">
                Visual Placeholder
              </span>
              <span className="text-xl italic text-neutral-600 text-center px-4 relative z-10">
                [ Insert Third Mumbai <br />
                Landscape ]
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <div>
            <span className="font-sans inline-flex items-center space-x-2 border border-neutral-400 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-neutral-700 bg-transparent shadow-sm">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-pulse"></span>
              <span>RK Greenfields Ventures</span>
            </span>
          </div>

          {/* Masked Headline Wrapper (This hides the text until it animates UP) */}
          <div className="overflow-hidden py-2">
            <h3
              ref={headlineRef}
              suppressHydrationWarning
              style={{ transform: "translateY(120%) rotate(2deg)", opacity: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-normal tracking-tight leading-[1.1] text-neutral-900 origin-bottom-left"
            >
              Investing in land. <br />
              Building <span className="italic font-light text-neutral-600">future opportunities.</span>
            </h3>
          </div>

          <p
            ref={textRef}
            suppressHydrationWarning
            style={{ opacity: 0, transform: "translateY(30px)" }}
            className="font-sans text-neutral-600 text-base md:text-lg 2xl:text-xl leading-relaxed max-w-3xl tracking-wide"
          >
            We are a trusted land investment company focused on strategic growth locations. We help investors and buyers secure future-ready land opportunities with strong appreciation potential, excellent connectivity, and long-term value near the fast-developing Third Mumbai region.
          </p>

          {/* Premium Pill Offerings */}
          <div
            className="pt-4 pb-2"
            ref={pillsRef}
            suppressHydrationWarning
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Premium Offerings
            </h4>
            <div className="flex flex-wrap gap-3 font-sans">
              {propertyTypes.map((type, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-[#E5E1D8] border border-neutral-400/60 rounded-full text-sm font-medium text-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-500 cursor-default flex items-center space-x-2 shadow-sm"
                >
                  <svg className="w-3 h-3 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 font-sans cursor-pointer">
            <Link
              href="/property"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10 font-medium tracking-wide">
                Plot Opportunities
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}