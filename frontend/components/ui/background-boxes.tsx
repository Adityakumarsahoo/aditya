"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "#0FFF50", // Neon Green (brightest)
    "#10b981", // Emerald 500
    "#34d399", // Emerald 400
    "#00FF66", // Spring Green
    "#00e676", // Accent Green
    "#059669", // Emerald 600
    "#00FFaa", // Bright Teal-Green
  ];
  const getDeterministicColor = (rowIdx: number, colIdx: number) => {
    return colors[(rowIdx * 77 + colIdx * 33) % colors.length];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-zinc-900"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getDeterministicColor(i, j),
                boxShadow: "0 0 25px rgba(15, 255, 80, 0.45)",
                borderColor: "rgba(15, 255, 80, 0.45)",
                zIndex: 10,
                transition: { duration: 0 },
              }}
              animate={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                boxShadow: "0 0 0px rgba(15, 255, 80, 0)",
                borderColor: "#18181b", // zinc-900 hex code
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-zinc-900"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-zinc-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
