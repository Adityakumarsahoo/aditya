"use client";

import React, { useEffect, useState } from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Link from "next/link";

export default function Footer() {
  const [timeNow, setTimeNow] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeNow(new Date().toLocaleTimeString());
    }, 0);
    const id = setInterval(
      () => setTimeNow(new Date().toLocaleTimeString()),
      1000,
    );
    return () => {
      clearTimeout(timer);
      clearInterval(id);
    };
  }, []);

  return (
    <footer className=" relative mx-auto  pb-12 md:pb-0 lg:pb-0 xl:pb-0  max-w-330 bg-zinc-950 border-t border-zinc-800  text-zinc-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-20 py-5">
        <TextHoverEffect text="ADITYA" />
        <Link href="/contact" className="text-lg cursor-pointer">
          Reach out →
        </Link>

        <div className="text-lg">{timeNow}</div>
      </div>
    </footer>
  );
}
