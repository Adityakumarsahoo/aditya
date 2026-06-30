"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [lineTop, setLineTop] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const flexItems = Array.from(ref.current.children).filter((el) =>
        el.classList.contains("flex")
      );
      if (flexItems.length > 0) {
        const firstItem = flexItems[0] as HTMLElement;
        const lastItem = flexItems[flexItems.length - 1] as HTMLElement;

        const firstPadding = parseFloat(window.getComputedStyle(firstItem).paddingTop) || 0;
        const lastPadding = parseFloat(window.getComputedStyle(lastItem).paddingTop) || 0;

        const firstCenter = firstItem.offsetTop + firstPadding + 20;
        const lastCenter = lastItem.offsetTop + lastPadding + 20;

        setLineTop(firstCenter);
        setHeight(lastCenter - firstCenter);
      } else {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-zinc-950 font-sans md:px-10"
      ref={containerRef}
    >
     
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start md:gap-10 ${index === 0 ? "pt-4 md:pt-12" : "pt-12 md:pt-32"}`}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Glowing futuristic circle node */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-zinc-950 border-2 border-zinc-800/80 flex items-center justify-center shadow-lg transition-all duration-300 hover:border-blue-500/50">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-blue-500 shadow-[0_0_10px_#00E5FF] animate-pulse" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-extrabold text-zinc-400 tracking-tight transition-colors duration-300 hover:text-zinc-200">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl font-bold text-blue-400 mb-4 tracking-tight">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        {/* Futuristic glowing timeline track */}
        <div
          style={{
            height: height + "px",
            top: lineTop + "px",
          }}
          className="absolute md:left-[29px] left-[29px] overflow-hidden w-[6px] bg-zinc-900 border-x border-zinc-800/50 rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-[#00E5FF] via-blue-400 to-blue-600 shadow-[0_0_12px_#00E5FF] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
