"use client";

import { useState } from "react";
import Image from "next/image";

type InvestmentCardProps = {
  num: string;
  title: string;
  desc: string;
  url: string;
};

/**
 * Pure presentational card. No GSAP here — the parent
 * (InvestmentSection) owns the entrance timeline and targets
 * these as direct children of cardsContainerRef, exactly as before.
 *
 * Image loading: starts at opacity-0, fades to opacity-100 once
 * the browser reports the image has actually loaded (onLoad),
 * so large card images don't pop in abruptly while the rest of
 * the card (title, description, number) is already visible.
 */
export default function InvestmentCard({ num, title, desc, url }: InvestmentCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      suppressHydrationWarning
      style={{
        opacity: 0,
        transform: "translateX(-100vw) scale(2) rotateY(45deg)",
      }}
      className="group relative flex flex-col justify-between h-70 md:h-87.5 p-8 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="font-sans text-5xl font-light text-white/30 group-hover:text-[#E5E1D8] transition-colors duration-500">
        {num}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-medium mb-3 group-hover:-translate-y-2 transition-transform duration-500">
          {title}
        </h3>
        <p className="font-sans text-sm text-neutral-400 leading-relaxed group-hover:-translate-y-2 transition-transform duration-500 delay-75">
          {desc}
        </p>
      </div>

      <Image
        src={url}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 object-cover object-left md:object-center transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}