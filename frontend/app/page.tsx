// app/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { Cover } from "@/components/ui/cover";
import { homePageStyles, spotlightStyles } from "@/public/dummyStyles";
import { API_BASE_URL } from "@/lib/api-config";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as Icons from "lucide-react";
import { useLiveUpdates } from "@/lib/use-live-updates";

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null);
  const [customSections, setCustomSections] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hook up real-time Server-Sent Events updates
  useLiveUpdates((data) => {
    if (data.profile) setProfile(data.profile);
    if (data.customSections) setCustomSections(data.customSections);
  });

  // Profile image 3D hover springs
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const imgXSpring = useSpring(imgX, { stiffness: 200, damping: 20 });
  const imgYSpring = useSpring(imgY, { stiffness: 200, damping: 20 });
  const imgRotateX = useTransform(imgYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const imgRotateY = useTransform(imgXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    imgX.set(xPct);
    imgY.set(yPct);
  };

  const handleImgMouseLeave = () => {
    imgX.set(0);
    imgY.set(0);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.profile) setProfile(data.profile);
          if (data.customSections) setCustomSections(data.customSections);
        }
      })
      .catch((err) => console.log("Failed to load homepage configs", err));

    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.log("Autoplay prevented:", e);
      });
    }
  }, []);

  return (
    <>
      {/* Content */}
      <div className={homePageStyles.container}>
        {/* Background elements */}
        <div
          className={cn(
            homePageStyles.backgroundGrid.wrapper,
            homePageStyles.backgroundGrid.pattern,
          )}
        />

        <Spotlight className={spotlightStyles.position} fill="#00E5FF" />

        {/* Gradient overlay for better text readability */}
        <div className={homePageStyles.gradientOverlay} />

        {/* HERO */}
        <section className={homePageStyles.heroSection}>
          {/* Hero Sparkles Emitter Background */}
          <div className="absolute inset-x-0 top-0 h-[380px] w-full overflow-hidden [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)] pointer-events-none -z-10 opacity-60">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.5}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#00E5FF"
            />
          </div>
          {/* Hero content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 mb-12">
            {/* Left Column - Text Content */}
            <div className="flex-1 min-w-0">
              <h1 className={homePageStyles.h1}>
                Hey, I&apos;m{" "}
                <span className={homePageStyles.spanWithMargin}>
                  <Cover>{profile?.name ? profile.name.split(" ")[0] : "Aditya"}</Cover>
                </span>
              </h1>

              <h2 className={homePageStyles.h2}>
                Full Stack{" "}
                <span className={homePageStyles.spanInline}>
                  <PointerHighlight>Developer</PointerHighlight>
                </span>
              </h2>

              <div className="mb-6">
                <div className={homePageStyles.calloutCard.wrapper}>
                  <div className={homePageStyles.calloutCard.innerContainer}>
                    <div className={homePageStyles.calloutCard.textContainer}>
                      <svg
                        className={homePageStyles.calloutCard.icon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path d="M3 12l9-9 9 9" strokeWidth="1.2" />
                      </svg>

                      {/* text container uses truncate so long text won't overflow */}
                      <div className={homePageStyles.calloutCard.text}>
                        Connect with me on X
                      </div>
                    </div>

                    <a href={profile?.socials?.twitter || "https://x.com/AdiTheNalanda"}
                    target="_blank"
                      type="button"
                      className={homePageStyles.calloutCard.button}
                      rel="noopener noreferrer"
                    >
                      Follow
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group/bio mt-6 mb-8 max-w-[720px]">
                {/* Accent backglow shadow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 opacity-0 group-hover/bio:from-blue-500/5 group-hover/bio:to-blue-500/10 group-hover/bio:opacity-100 blur-lg transition duration-700 pointer-events-none" />
                
                <div className="relative rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 transition-all duration-350 group-hover/bio:border-blue-500/20 group-hover/bio:shadow-[0_0_30px_rgba(0,229,255,0.02)]">
                  {/* Left accent neon bar */}
                  <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r opacity-50 group-hover/bio:opacity-100 transition-opacity duration-300" />
                  
                  <p className="text-base sm:text-lg text-zinc-300 leading-8 pl-4 select-text">
                    {profile?.bioText ? (
                      profile.bioText
                    ) : (
                      <>
                        Results-driven <span className="font-semibold text-zinc-100 hover:text-blue-400 transition-colors duration-200">Full Stack Developer</span> with <span className="font-semibold text-zinc-100">2+ years</span> of hands-on experience building and deploying scalable web applications using the <span className="text-blue-400 font-medium">MERN Stack</span> and <span className="text-blue-400 font-medium">Java Spring Boot</span>. Proven ability to design and consume <span className="font-medium text-zinc-100">REST APIs</span>, implement real-time features via <span className="font-medium text-zinc-100">WebSockets</span>, and deliver responsive, high-performance UIs. Completed <span className="text-blue-400 font-semibold">2 industry internships</span> prior to graduation, independently deployed <span className="text-blue-400 font-semibold">15+ live full-stack projects</span>, and <span className="text-blue-400 font-semibold">ranked #1</span> in the CSE department. Adept at agile collaboration, clean architecture, and end-to-end product ownership.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Photo of Aditya */}
            <div className="flex-shrink-0 mx-auto md:mx-0 w-[240px] sm:w-[260px] md:w-[280px] self-center">
              <motion.div
                onMouseMove={handleImgMouseMove}
                onMouseLeave={handleImgMouseLeave}
                style={{
                  rotateX: imgRotateX,
                  rotateY: imgRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Elegant back glow shadow effect matching neon green theme */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-blue-500 opacity-15 blur-lg transition duration-1000 group-hover:opacity-30 group-hover:duration-300" />
                
                {/* Image container with framed border */}
                <div className="relative p-1.5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-blue-500/30">
                  <div className="overflow-hidden rounded-xl bg-zinc-950">
                    <img
                      src={profile?.profilePhoto || "/imageofaditya.jpg"}
                      alt={profile?.name || "Aditya"}
                      width={320}
                      height={400}
                      className="w-full h-auto object-cover aspect-[4/5] transition-all duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative group/card mt-8">
            {/* Elegant back glow shadow effect matching neon green theme */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-blue-500 opacity-5 blur-xl transition duration-1000 group-hover/card:opacity-15 group-hover/card:duration-300 pointer-events-none" />

            <article className={homePageStyles.article.wrapper}>
              {/* Video Section - No controls, auto-playing, looping */}
              <div className={homePageStyles.article.videoContainer}>
                <video
                  ref={videoRef}
                  key={profile?.featuredVideo || "/homevideo.webm"}
                  className={homePageStyles.article.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                  style={
                    homePageStyles.article.videoStyles as React.CSSProperties
                  }
                >
                  <source src={profile?.featuredVideo || "/homevideo.webm"} type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Optional: Add a subtle gradient overlay at the bottom for better text contrast */}
              </div>

              <div className={homePageStyles.article.content}>
                <div className={homePageStyles.article.header}>
                  <svg
                    className={homePageStyles.article.headerIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Featured Work</span>
                </div>
                <h3 className={homePageStyles.article.title}>
                  My 2026: Building, Learning, and Shipping Without Excuses
                </h3>
                <p className={homePageStyles.article.description}>
                  Built 15+ Full-Stack Projects from scratch. Balanced two concurrent remote internships while completing my B.Tech. Worked with MERN Stack and Java Spring Boot on production-ready applications.
                </p>

                {/* Optional: Add a simple link/button if you want users to still have a way to interact */}
                <div className={homePageStyles.article.linkContainer}>
                  <Link
                    href="/projects"
                    className={homePageStyles.article.link}
                  >
                    <span>See My Projects</span>
                    <svg
                      className={homePageStyles.article.linkIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Dynamic Custom Sections */}
          {customSections && customSections.length > 0 && (
            <div className="mt-16 space-y-8">
              {customSections.map((sec: any) => (
                <div key={sec.id} className="relative group/custom-card">
                  {/* Subtle neon glow backshadow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/0 opacity-0 group-hover/custom-card:from-blue-500/5 group-hover/custom-card:to-blue-500/10 group-hover/custom-card:opacity-100 blur-lg transition duration-700 pointer-events-none" />
                  
                  <div className="relative rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 md:p-8 transition-all duration-350 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(0,229,255,0.02)]">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="rounded-xl bg-zinc-950 border border-zinc-900 p-2.5 flex items-center justify-center text-blue-400">
                        <DynamicIcon name={sec.icon} className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-100">{sec.title}</h3>
                    </div>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text pl-1">
                      {sec.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Sparkles;
  return <IconComponent className={className} />;
}
