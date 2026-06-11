"use client";

import React, { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  // Ring coordinates (smoothed)
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    setMounted(true);

    // Hide custom cursor on mobile touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Track mouse movement
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Update dot position instantly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Animate trailing ring
    let animationFrameId: number;
    const animateRing = () => {
      // Linear interpolation: target position is mouse coordinate, current position moves towards it
      const ease = 0.15; // spring rate
      
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * ease;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    // Spawning click ripples
    const onMouseDown = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    // Hover state detection on links and interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
      }
    };

    const onMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        // Clear oldest ripple after animation completes
        setRipples((prev) => prev.slice(1));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  if (!mounted) return null;

  // Don't render on mobile touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide default cursor globally on desktop pointer devices */
        @media (pointer: fine) {
          body, a, button, select, input, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }

        .neon-ripple {
          position: fixed;
          border: 2px solid #0FFF50;
          border-radius: 50%;
          background: rgba(15, 255, 80, 0.03);
          pointer-events: none;
          z-index: 9997;
          transform: translate(-50%, -50%);
          animation: neon-ripple-anim 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes neon-ripple-anim {
          0% {
            width: 8px;
            height: 8px;
            opacity: 1;
            border-color: #0FFF50;
            box-shadow: 0 0 10px rgba(15, 255, 80, 0.8);
          }
          100% {
            width: 90px;
            height: 90px;
            opacity: 0;
            border-color: rgba(15, 255, 80, 0);
            box-shadow: 0 0 25px rgba(15, 255, 80, 0);
          }
        }
      `}} />

      {/* Tiny inner neon green cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#0FFF50] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      {/* Trailing larger glowing aura ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-[#0FFF50]/30 bg-[#0FFF50]/5 shadow-[0_0_12px_rgba(15,255,80,0.12)] transition-all duration-300 ease-out ${
          isHovered
            ? "w-12 h-12 -ml-6 -mt-6 border-[#0FFF50]/80 bg-[#0FFF50]/10 shadow-[0_0_22px_rgba(15,255,80,0.3)] scale-105"
            : "w-8 h-8 -ml-4 -mt-4"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="neon-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </>
  );
}
