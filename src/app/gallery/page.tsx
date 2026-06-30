"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Nav";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Pure Image Inventory (No extra text metadata needed)
  const galleryItems = [
    { src: "/property/img1.png", alt: "Site Capture 1", span: "col-span-12 lg:col-span-8", aspect: "h-[400px] lg:h-[600px]" },
    { src: "/property/img2.png", alt: "Site Capture 2", span: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "h-[400px] lg:h-[600px]" },
    { src: "/property/img3.png", alt: "Site Capture 3", span: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "h-[350px] lg:h-[450px]" },
    { src: "/property/img4.png", alt: "Site Capture 4", span: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "h-[350px] lg:h-[450px]" },
    { src: "/property/img5.png", alt: "Site Capture 5", span: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "h-[350px] lg:h-[450px]" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        headerRef.current?.children as HTMLCollection,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power4.out" }
      );

      // 2. Bento Grid Clip-Path Reveal
      gsap.fromTo(
        ".gallery-card",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.1 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Modal Backdrop Blur Animation
  useEffect(() => {
    if (selectedImage !== null) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(16px)", duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedImage]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#E5E1D8] text-[#1A1A1A] font-serif pt-32 pb-24 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      {/* --- SECTION 1: HEADER --- */}
      <div ref={headerRef} className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 mb-16">
        <div className="flex items-center space-x-3 mb-6 font-sans">
          <Link href="/" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-xs uppercase tracking-widest text-emerald-900 font-semibold">Visuals</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-400/40 pb-8">
          <div>
            <span className="font-sans inline-flex items-center space-x-2 border border-neutral-400/80 rounded-full px-4 py-1 text-xs tracking-widest uppercase text-neutral-700 mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-pulse"></span>
              <span>Investment Gallery</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-neutral-900">
              Visualize your <span className="italic font-light">opportunity</span>
            </h1>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-neutral-500 max-w-xs leading-relaxed">
            Actual site captures and topographical demarcations of Third Mumbai.
          </p>
        </div>
      </div>

      {/* --- SECTION 2: PURE IMAGE BENTO GRID --- */}
      <div ref={gridRef} className="max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 grid grid-cols-12 gap-6 md:gap-8">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`gallery-card group relative ${item.span} ${item.aspect} rounded-2xl overflow-hidden bg-neutral-200 cursor-zoom-in shadow-md`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              unoptimized
            />
            
            {/* Ultra-subtle overlay that slightly darkens on hover to signal it's clickable */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* --- SECTION 3: MINIMALIST IMAGE MODAL --- */}
      {selectedImage !== null && (
        <div
          ref={modalRef}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 md:p-12 cursor-zoom-out"
        >
          {/* Frameless full-screen viewing box */}
          <div className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={galleryItems[selectedImage].src}
              alt={galleryItems[selectedImage].alt}
              fill
              className="object-contain pointer-events-none"
              unoptimized
            />
            
            {/* Minimalist Floating Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 font-sans text-xs uppercase tracking-widest px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              [ Close X ]
            </button>
          </div>
        </div>
      )}

    </div>
  );
}