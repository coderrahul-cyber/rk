"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";

type HeroContentProps = {
  mapRef: React.Ref<HTMLDivElement>;
};

/**
 * Pure presentational component — owns no animation logic.
 * HeroSection drives the timeline; this just exposes the DOM nodes
 * gsap needs to target (content wrapper + map) via refs.
 */
const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  ({ mapRef }, contentRef) => {
    return (
      <>
        {/* 1. MAP BACKGROUND LAYER (Mobile: Behind Text | Desktop: Right Column) */}
        <div className="col-start-1 row-start-1 lg:col-start-8 lg:col-span-6 w-full h-[78vh] lg:h-[80vh] flex items-center justify-center relative z-0">
          <div
            ref={mapRef} suppressHydrationWarning
            className="w-full h-full rounded-2xl overflow-hidden bg-neutral-300/50 relative border border-neutral-400/30 shadow-lg"
          >
            <div className="absolute inset-0 bg-[#D9D5CC] flex items-center justify-center">
              <Image
                src="/imgg.png"
                alt="image"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* MOBILE ONLY: Soft blur & tint overlay to guarantee text readability */}
            <div className="absolute inset-0 bg-[#E5E1D8]/70 backdrop-blur-[2px] lg:backdrop-blur-none lg:bg-transparent pointer-events-none transition-all duration-500" />
          </div>
        </div>

        {/* 2. PURE TYPOGRAPHY (Zero boxed background styling) */}
        <div
          ref={contentRef} suppressHydrationWarning
          className="col-start-1 row-start-1 lg:col-start-1 lg:col-span-6 flex flex-col space-y-6 z-10 px-4 md:px-0 py-8 lg:py-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <span className="font-sans inline-block border border-neutral-400/80 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-neutral-700 bg-[#E5E1D8]/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
              Real Estate Agency
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal tracking-tight leading-[1.06] text-neutral-900 pointer-events-auto">
            Your strategic gateway to
            <br />
            Third <span className="italic font-light text-neutral-700">Mumbai</span>
          </h1>

          <p className="font-sans text-neutral-700 max-w-lg text-base md:text-lg leading-relaxed tracking-wide pointer-events-auto font-normal">
            We specialize in premium land investments in India&apos;s
            fastest-developing economic corridor. Curated plots, high
            appreciation potential, and secure acquisitions, made with
            intention.
          </p>

          <div className="font-sans pt-4 flex flex-wrap items-center gap-6 text-sm pointer-events-auto">
            <Link
              href={"/contact"}
              className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full hover:bg-neutral-800 transition-all duration-300 font-medium shadow-md hover:shadow-xl hover:scale-105"
            >
              Let&apos;s Talk
            </Link>
            <Link
              href="/gallery"
              className="group flex items-center space-x-2 font-medium border-b border-black pb-1"
            >
              <span>See properties</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>

          <div className="pt-8 border-t border-neutral-400/40 mt-4 max-w-sm pointer-events-auto">
            <div className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900">
              From ₹4 Lakhs
            </div>
            <div className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 mt-1.5 leading-relaxed">
              Starting From 1089 Sq.Ft. (1 Guntha)
            </div>
          </div>
        </div>
      </>
    );
  }
);

HeroContent.displayName = "HeroContent";

export default HeroContent;