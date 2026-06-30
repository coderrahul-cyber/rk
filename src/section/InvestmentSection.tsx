"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import InvestmentCard from "@/components/InvestmentCard";
import ConnectivityStrip from "@/components/ConnectivityStrip";

gsap.registerPlugin(ScrollTrigger);

// Static data — moved to module scope so it isn't recreated on every render.
const cards = [
  {
    num: "01",
    title: "Strategic Plot Locations",
    desc: "Premium plots located near future infrastructure and connectivity developments.",
    url: "/strage.png",
  },
  {
    num: "02",
    title: "High Appreciation Potential",
    desc: "Investment opportunities in rapidly growing regions with strong future demand.",
    url: "/appreciation.png",
  },
  {
    num: "03",
    title: "Peaceful Yet Connected",
    desc: "A perfect balance between natural surroundings and urban accessibility.",
    url: "/peace.png",
  },
];

const connectivity = [
  { label: "Railway Station", time: "10 Min", icon: "🚆" },
  { label: "Trans Harbour Link", time: "10 Min", icon: "🌉" },
  { label: "College & School", time: "10 Min", icon: "🎓" },
  { label: "Chirle Junction", time: "10 Min", icon: "🛣️" },
  { label: "Highway Connectivity", time: "02 Min", icon: "🚗" },
];

export default function InvestmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const connectivityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Top Text Stagger
      // Initial opacity:0/y:40 is now set statically via inline style in
      // JSX (see topContentRef children below), so there's no flash of
      // fully-visible text before ScrollTrigger initializes.
      gsap.to(topContentRef.current?.children as HTMLCollection, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: topContentRef.current,
          start: "top 70%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // 2. Image Reveal (Parallax + Scale)
      // Initial scale/clipPath set statically below.
      gsap.to(imageRef.current, {
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // 3. THE CREATIVE CARD ANIMATION
      // Initial transform/opacity (x:-100vw, scale:2, rotationY:45,
      // opacity:0) is now set statically inline on each InvestmentCard's
      // root element, so there's no flash before this fires — same fix
      // as the other three animations in this file.
      gsap.to(cardsContainerRef.current?.children as HTMLCollection, {
        x: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.8,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // 4. Connectivity Icons Fade Up
      // Initial state set statically below.
      gsap.to(connectivityRef.current?.children as HTMLCollection, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: connectivityRef.current,
          start: "top 90%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // ==========================================
      // 5. THE 40% VISIBLE BACKGROUND TRANSITION
      // ==========================================
      // "from" beige already matches the static bg-[#E5E1D8] className,
      // so no flash risk here — left as fromTo for clarity since the
      // explicit from-color documents intent well.
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#E5E1D8" },
        {
          backgroundColor: "#111111",
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#E5E1D8] text-[#E5E1D8] py-10 md:py-16 px-6 md:px-12 xl:px-20 font-serif overflow-hidden relative z-20"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* --- TOP GRID: Text & Image --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-32">
          <div
            ref={topContentRef}
            suppressHydrationWarning
            className="lg:col-span-6 flex flex-col space-y-8"
          >
            <div style={{ opacity: 0, transform: "translateY(40px)" }}>
              <span className="font-sans inline-flex items-center space-x-2 border border-[#E5E1D8]/30 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-[#E5E1D8]">
                Why Invest In Third Mumbai?
              </span>
            </div>

            <h2
              style={{ opacity: 0, transform: "translateY(40px)" }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight leading-[1.1]"
            >
              A new destination <br />
              for <span className="italic font-light text-neutral-400">future-focused</span> investors.
            </h2>

            <p
              style={{ opacity: 0, transform: "translateY(40px)" }}
              className="font-sans text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl tracking-wide"
            >
              Third Mumbai is emerging as one of the most promising development corridors near Navi Mumbai. RK Greenfields Ventures offers strategically located plots making them ideal for residential, commercial, and investment purposes.
            </p>

            <div style={{ opacity: 0, transform: "translateY(40px)" }} className="pt-4 font-sans">
              <button className="bg-[#E5E1D8] text-[#111111] px-8 py-4 rounded-full hover:bg-white transition-all duration-300 font-medium">
                Don&apos;t Miss Mumbai 3.0
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 w-full h-[40vh] lg:h-[50vh] relative overflow-hidden rounded-2xl">
            <div
              ref={imageRef}
              suppressHydrationWarning
              style={{ transform: "scale(1.2)", clipPath: "inset(20% 20% 20% 20%)" }}
              className="w-full h-full bg-neutral-800 relative border border-white/10 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply z-10" />
              <Image
                src="/thirdmumbai.png"
                alt="Third Mumbai aerial view"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>

        {/* --- MIDDLE GRID: Architectural Cards --- */}
        <div
          ref={cardsContainerRef}
          className="grid -mt-10 md:mt-0 grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 md:mb-10 perspective-1000"
        >
          {cards.map((card) => (
            <InvestmentCard
              key={card.num}
              num={card.num}
              title={card.title}
              desc={card.desc}
              url={card.url}
            />
          ))}
        </div>

        {/* --- BOTTOM SECTION: Connectivity --- */}
        <ConnectivityStrip ref={connectivityRef} items={connectivity} />
      </div>
    </section>
  );
}