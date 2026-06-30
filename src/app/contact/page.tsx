"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Nav";

// Register once at module load, not on every mount
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const landImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Single timeline + single ScrollTrigger instead of three separate
      // triggers watching the same element — same visual stagger, far
      // less scroll/resize listener overhead.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        Array.from(leftContentRef.current?.children ?? []),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
      )
        .fromTo(
          Array.from(rightContentRef.current?.children ?? []),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.8" // mirrors the old 0.2s delay offset
        )
        .fromTo(
          landImageRef.current,
          { y: 50, opacity: 0, rotate: 2 },
          { y: 0, opacity: 1, rotate: 0, duration: 1.5, ease: "power4.out" },
          "-=0.9"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#E5E1D8] text-[#1A1A1A] py-24 px-6 md:px-12 xl:px-20 overflow-hidden z-30"
    >
      <Navbar />
      <div className="max-w-350 mt-5 md:mt-20 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        {/* ================= LEFT COLUMN ================= */}
        <div ref={leftContentRef} className="flex flex-col space-y-12">
          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.05] text-neutral-900">
            Let&apos;s start a <br />
            real <span className="italic font-light">conversation</span>
          </h2>

          {/* Contact Details Cards */}
          <div className="flex flex-col space-y-6 font-sans text-sm md:text-base text-neutral-800 font-medium">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>invest@rkgreenfields.com</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>Third Mumbai, Maharashtra</span>
            </div>
          </div>

          {/* Tabular Info Section */}
          <div className="pt-8 border-t border-neutral-400/30">
            <div className="flex flex-col space-y-4 font-sans text-sm">
              <div className="flex justify-between items-center border-b border-neutral-300/50 pb-3">
                <span className="text-neutral-500">Response time</span>
                <span className="font-medium text-neutral-900">Within 24 hours</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-300/50 pb-3">
                <span className="text-neutral-500">Availability</span>
                <span className="font-medium text-neutral-900">Booking Q3 2026</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-300/50 pb-3">
                <span className="text-neutral-500">Based in</span>
                <span className="font-medium text-neutral-900">Navi Mumbai, India</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-300/50 pb-3">
                <span className="text-neutral-500">Working hours</span>
                <span className="font-medium text-neutral-900">Mon–Sat, 10–6 IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Form) ================= */}
        <div ref={rightContentRef} className="flex flex-col space-y-4 pt-4 lg:pt-0 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-black/5 hover:bg-black/10 transition-colors text-neutral-900 placeholder:text-neutral-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-sans text-sm font-medium"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-black/5 hover:bg-black/10 transition-colors text-neutral-900 placeholder:text-neutral-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-sans text-sm font-medium"
            />
          </div>

          <input
            type="text"
            placeholder="Investment interest (e.g., Commercial Plot)"
            className="w-full bg-black/5 hover:bg-black/10 transition-colors text-neutral-900 placeholder:text-neutral-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-sans text-sm font-medium"
          />

          <textarea
            placeholder="Project details or specific inquiries..."
            rows={5}
            className="w-full bg-black/5 hover:bg-black/10 transition-colors text-neutral-900 placeholder:text-neutral-500 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-sans text-sm font-medium resize-none"
          ></textarea>

          <button className="group w-full bg-[#1A1A1A] text-white rounded-2xl px-6 py-5 font-sans text-sm font-medium flex items-center justify-center space-x-2 hover:bg-black transition-all shadow-lg hover:shadow-xl mt-2">
            <span>Let&apos;s work together</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}