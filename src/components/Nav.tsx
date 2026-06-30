"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const navItems = [
    { name: "Home", num: "01", href: "/" },
    { name: "Properties", num: "02", href: "/gallery" },
    { name: "Mumbai 3.0", num: "03", href: "#invest" },
    { name: "Contact", num: "04", href: "/contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const linkEls = linksRef.current?.children;

      // Links pushed down + invisible. (Menu's clip-path hidden state is
      // now set statically via inline style on the element for correct
      // first paint — no longer needs gsap.set here.)
      if (linkEls) gsap.set(linkEls, { y: 60, opacity: 0 });

      // Menu open/close timeline (unchanged)
      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.inOut",
        })
        .to(
          linkEls ?? [],
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Navbar entrance — starts hidden (opacity-0 className, set before
      // paint so there's no flash), fades in timed to roughly match the
      // hero curtain lift (which begins around 0.6-0.8s). Independent
      // timeline from Hero, just timed to feel synced.
      gsap.to(headerRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      {/*
        =========================================
        TOP HEADER BAR (Always Visible)
        Starts at opacity-0 via className so there's
        zero flash before GSAP hydrates, even on slow
        connections. GSAP fades it in once mounted.
        =========================================
      */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 xl:px-20 py-6 z-50 font-sans text-xs tracking-wider uppercase pointer-events-none mix-blend-difference text-white opacity-0"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-serif font-medium tracking-wide italic pointer-events-auto select-none cursor-pointer hover:opacity-70 transition-opacity"
        >
          RK Greenfield Ventures
        </Link>

        {/* Live Status Badge (Hides on Mobile) */}
        <div
          className={`hidden md:flex -ml-20 text-xs items-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 pointer-events-auto shadow-sm transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <span>Available • Mumbai</span>
        </div>

        {/* Animated Burger / Close Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          className="relative flex flex-col items-center justify-center w-12 h-12 pointer-events-auto bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 group"
        >
          <span
            className={`w-5 h-[1.5px] bg-current absolute transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-45" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`w-5 h-[1.5px] bg-current absolute transition-transform duration-500 ease-in-out ${
              isOpen ? "-rotate-45" : "translate-y-1"
            }`}
          ></span>
        </button>
      </header>

      {/*
        =========================================
        FULL SCREEN OVERLAY MENU
        =========================================
      */}
      <div
        ref={menuRef}
        suppressHydrationWarning
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
        className="fixed inset-0 w-full h-screen bg-[#E5E1D8] z-40 flex items-center px-6 md:px-12 xl:px-32"
      >
        <nav
          ref={linksRef}
          suppressHydrationWarning
          className="flex flex-col space-y-4 md:space-y-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-baseline space-x-4 md:space-x-8 text-[#1A1A1A] w-fit"
            >
              <span className="text-xs md:text-sm font-sans tracking-widest text-neutral-500">
                / {item.num} /
              </span>
              <span className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight group-hover:italic transition-all duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}