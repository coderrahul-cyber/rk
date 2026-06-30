"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Nav";

export default function PropertiesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Store the animation instance so we can pause/play it on hover
  const marqueeAnim = useRef<gsap.core.Tween | null>(null);

  const plotLedger = [
    { type: "Residential Plots", area: "Starting From 1089 Sq.Ft. (1 Guntha)", price: "₹4 Lakhs Onwards", status: "Available" },
    { type: "Commercial Plots", area: "Starting From 1089 Sq.Ft. (1 Guntha)", price: "₹12 Lakhs Onwards", status: "Fast Moving" },
    { type: "Bungalow Plots", area: "Starting From 2178 Sq.Ft. (2 Guntha)", price: "₹18 Lakhs Onwards", status: "Premium" },
    { type: "Investment Plots", area: "Starting From 1089 Sq.Ft. (1 Guntha)", price: "₹4 Lakhs Onwards", status: "High ROI" },
    { type: "Premium Corner Plots", area: "Starting From 1500 Sq.Ft.", price: "₹8 Lakhs Onwards", status: "Limited" },
  ];

  const propertyShowcase = [
    {
      title: "Residential Plots",
      tag: "Mumbai 3.0 Corridor",
      desc: "Surrounded by peaceful natural landscapes and planned infrastructure. Ideal for families looking to build bespoke bungalows.",
      image: "/residential-plot.jpg", // Update with your actual image path
    },
    {
      title: "Commercial Plots",
      tag: "High Footfall Zones",
      desc: "Strategically positioned along expanding arterial roads. Perfectly zoned for boutique retail, corporate offices, and high-yield assets.",
      image: "/commercial-plot.jpg",
    },
    {
      title: "Premium Corner Plots",
      tag: "Dual Road Facing",
      desc: "Carefully selected corner parcels offering dual-side accessibility, superior architectural visibility, and higher long-term appreciation.",
      image: "/corner-plot.jpg",
    },
  ];

  // We duplicate the array to create a seamless infinite loop. 
  // We triple it just to ensure it fills ultra-wide screens perfectly.
  const loopedShowcase = [...propertyShowcase, ...propertyShowcase, ...propertyShowcase];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Page Header Reveal
      gsap.fromTo(
        headerRef.current?.children as HTMLCollection,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power4.out" }
      );

      // 2. Editorial Ledger Rows Stagger
      gsap.fromTo(
        ".ledger-row",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ledgerRef.current, start: "top 80%" },
        }
      );

      // 3. Carousel Container Fade Up
      gsap.fromTo(
        carouselContainerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: carouselContainerRef.current, start: "top 75%" },
        }
      );

      // 4. INFINITE SCROLL MARQUEE (The magic happens here)
      if (trackRef.current) {
        marqueeAnim.current = gsap.to(trackRef.current, {
          xPercent: -33.3333, // Moves the track exactly 1/3rd of its width to perfectly loop the duplicated array
          ease: "none",
          duration: 25, // Adjust this number to make it scroll faster or slower
          repeat: -1, // Loops infinitely
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Event handlers to pause/play the slider when the user's mouse is over a card
  const handleMouseEnter = () => marqueeAnim.current?.pause();
  const handleMouseLeave = () => marqueeAnim.current?.play();

  return (
    <div ref={pageRef} className="min-h-screen bg-[#E5E1D8] text-[#1A1A1A] font-serif pt-32 pb-24 selection:bg-neutral-900 selection:text-white overflow-hidden">
      <Navbar />
      {/* --- SECTION 1: PAGE HEADER --- */}
      <div ref={headerRef} className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 mb-20">
        <div className="flex items-center space-x-3 mb-6 font-sans">
          <Link href="/" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-xs uppercase tracking-widest text-emerald-900 font-semibold">Opportunities</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal tracking-tight leading-[1.05] text-neutral-900 max-w-4xl">
          Invest in the future of <br />
          <span className="italic font-light text-neutral-700">Third Mumbai</span>
        </h1>
        
        <p className="font-sans text-neutral-600 max-w-xl text-base md:text-lg leading-relaxed tracking-wide mt-6">
          Surgically selected land parcels engineered for generational appreciation. Transparent pricing, clear title verification, and immediate infrastructure proximity.
        </p>
      </div>

      {/* --- SECTION 2: THE ARCHITECTURAL LEDGER (Table) --- */}
      <div ref={ledgerRef} className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 mb-36">
        <div className="border-t border-b border-neutral-900/20 py-4 grid grid-cols-12 font-sans text-xs uppercase tracking-[0.2em] text-neutral-500">
          <div className="col-span-4 md:col-span-3">Property Type</div>
          <div className="hidden md:block col-span-4">Area Specification</div>
          <div className="col-span-4 md:col-span-3">Starting Valuation</div>
          <div className="col-span-4 md:col-span-2 text-right">Inquiry</div>
        </div>

        <div className="flex flex-col divide-y divide-neutral-400/30 font-sans">
          {plotLedger.map((plot, idx) => (
            <Link
              href="#inquire"
              key={idx}
              className="ledger-row group grid grid-cols-12 items-center py-7 sm:py-9 transition-all duration-500 hover:px-4 hover:bg-white/40 rounded-xl cursor-pointer"
            >
              <div className="col-span-5 md:col-span-3 pr-2">
                <div className="font-serif text-xl sm:text-2xl text-neutral-900 group-hover:italic transition-all">
                  {plot.type}
                </div>
                <div className="md:hidden text-[11px] text-neutral-500 mt-1">{plot.area}</div>
              </div>
              <div className="hidden md:block col-span-4 text-sm text-neutral-600 tracking-wide">{plot.area}</div>
              <div className="col-span-4 md:col-span-3">
                <div className="text-sm sm:text-base font-semibold text-neutral-900">{plot.price}</div>
                <span className="inline-block text-[10px] uppercase tracking-widest text-emerald-800 font-medium mt-0.5">
                  • {plot.status}
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 flex justify-end">
                <span className="w-10 h-10 rounded-full border border-neutral-400/60 flex items-center justify-center text-neutral-700 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all duration-300">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- SECTION 3: INFINITE SCROLL PROPERTY CAROUSEL --- */}
     {/* --- SECTION 3: INFINITE SCROLL PROPERTY CAROUSEL --- */}
      <div ref={carouselContainerRef} className="w-full">
        
        {/* Carousel Header */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 mb-10">
          <span className="font-sans text-xs uppercase tracking-widest text-emerald-900 font-semibold block mb-2">
            Curated Inventory
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900">
            Explore property <span className="italic font-light">typologies</span>
          </h2>
        </div>

        {/* The Infinite Scrolling Track */}
        <div 
          className="w-full overflow-hidden flex relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={trackRef} className="flex w-max space-x-4 md:space-x-6 px-6 md:px-12">
            
            {loopedShowcase.map((item, idx) => (
              <div
                key={idx}
                // SHRINKING THE CARDS: Changed from w-[85vw]/400px/480px to w-[70vw]/320px/380px
                className="w-[75vw] sm:w-[320px] lg:w-[380px] shrink-0 group flex flex-col justify-between rounded-2xl bg-[#111111] text-[#E5E1D8] overflow-hidden border border-neutral-800 shadow-2xl cursor-pointer"
              >
                {/* Image Container */}
                {/* DECREASED HEIGHT: Changed from h-[280px]/320px to h-[200px]/240px */}
                <div className="w-full h-[200px] sm:h-[240px] relative overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30 opacity-80" />
                  
                  {/* Floating Tag Badge - Made slightly smaller */}
                  <div className="absolute top-5 left-5 z-10 font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white">
                    {item.tag}
                  </div>
                </div>

                {/* Content Block - Reduced padding from p-8 to p-6 */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Scaled down text from 3xl to 2xl */}
                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-3 group-hover:italic transition-all duration-300">
                      {item.title}
                    </h3>
                    {/* Added line-clamp-3 so text doesn't break the smaller layout if it's too long */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed tracking-wide line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-sans">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                      Request Spec Sheet
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 text-sm">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}