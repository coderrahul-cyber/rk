"use client";

import { forwardRef } from "react";

type ConnectivityItem = {
  label: string;
  time: string;
  icon: string;
};

type ConnectivityStripProps = {
  items: ConnectivityItem[];
};

/**
 * Pure presentational component. Parent (InvestmentSection) owns
 * the GSAP timeline and targets this wrapper's children directly
 * (same .children targeting pattern as before), so no animation
 * logic lives here.
 */
const ConnectivityStrip = forwardRef<HTMLDivElement, ConnectivityStripProps>(
  ({ items }, ref) => {
    return (
      <div className="border-t border-white/20 pt-16 flex flex-col items-center">
        <div className="font-sans inline-block border border-[#E5E1D8]/30 rounded-full px-6 py-2 text-xs tracking-widest uppercase mb-12">
          Prime Connectivity Benefits
        </div>

        <div
          ref={ref}
          className="w-full flex flex-row flex-wrap justify-center md:justify-between items-start gap-8 md:gap-4 font-sans"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              suppressHydrationWarning
              style={{ opacity: 0, transform: "translateY(30px) scale(0.9)" }}
              className="flex flex-col items-center text-center space-y-3 w-30 md:w-auto"
            >
              <div className="text-4xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-default">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1">
                  {item.label}
                </div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ConnectivityStrip.displayName = "ConnectivityStrip";

export default ConnectivityStrip;