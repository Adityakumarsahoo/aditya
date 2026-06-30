// app/about/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import { aboutPageStyles } from "@/public/dummyStyles";
import { User, Code2, Briefcase, Sparkles, Compass } from "lucide-react";

import { API_BASE_URL } from "@/lib/api-config";
import { useLiveUpdates } from "@/lib/use-live-updates";

export default function AboutPage() {
  const [profile, setProfile] = useState<any>(null);

  // Handle Server-Sent Events updates in real-time
  useLiveUpdates((data) => {
    if (data.profile) {
      setProfile(data.profile);
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.profile) {
          setProfile(data.profile);
        }
      })
      .catch((err) => console.log("Failed to load about profile", err));
  }, []);

  const interests = profile?.about?.interests || [
    "FULL-STACK DEV",
    "MERN STACK",
    "SPRING BOOT",
    "WEB APPS",
    "DATABASES",
    "READING",
    "TRAVEL"
  ];

  const techStack = profile?.about?.techStack || [
    "React",
    "Node.js",
    "Java",
    "Spring Boot",
    "TypeScript",
    "Next.js",
    "MongoDB",
    "MySQL"
  ];

  const email = profile?.about?.email || "toadityakumarsahoo@gmail.com";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <div className={aboutPageStyles.pageContainer}>
      {/* Background Spotlight for atmospheric depth */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#00E5FF" />

      <div className={aboutPageStyles.contentContainer}>
        {/* Background Container - Contains the animation behind content */}
        <div className={aboutPageStyles.backgroundContainer}>
          {/* Background Effect - Positioned behind with negative z-index */}
          <div className={aboutPageStyles.backgroundEffect}>
            <BackgroundBeamsWithCollision />
          </div>
          
          {/* Content - Stays above the background naturally */}
          <div className={aboutPageStyles.contentWrapper}>
            {/* Main Heading */}
            <h1 className={aboutPageStyles.mainHeading}>
              {profile?.name ? profile.name.split(" ")[0] : "Aditya"}
            </h1>

            {/* Interests/Tags Line */}
            <div className={aboutPageStyles.interestsContainer}>
              {interests.map((interest: string, index: number) => (
                <span key={interest} className={aboutPageStyles.interestItem}>
                  {interest}
                  {index < interests.length - 1 && (
                    <span className={aboutPageStyles.interestSeparator}>•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className={aboutPageStyles.techStackContainer}>
              {techStack.map((tech: string) => (
                <span
                  key={tech}
                  className={aboutPageStyles.techPill}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Content Sections */}
            <div className={aboutPageStyles.sectionsContainer}>
              {/* Who I Am */}
              <div className={`${aboutPageStyles.sectionCard} opacity-0 animate-fade-in`} style={{ animationDelay: "150ms" }}>
                <h2 className={aboutPageStyles.sectionHeading}>
                  <User className="w-5 h-5 text-emerald-400" />
                  Who I Am
                </h2>
                <p className={aboutPageStyles.paragraph}>
                  {profile?.about?.whoIAm || "Hello! I'm Aditya, a full-stack developer passionate about building clean, efficient, and scalable web applications. I specialize in the MERN Stack and Java Spring Boot, crafting end-to-end solutions that deliver high performance and great user experiences."}
                </p>
              </div>

              {/* What I Do */}
              <div className={`${aboutPageStyles.sectionCard} opacity-0 animate-fade-in`} style={{ animationDelay: "300ms" }}>
                <h2 className={aboutPageStyles.sectionHeading}>
                  <Code2 className="w-5 h-5 text-emerald-400" />
                  What I Do
                </h2>
                <p className={aboutPageStyles.paragraph}>
                  {profile?.about?.whatIDo || "I design and build robust web systems, consume/create RESTful APIs, and write optimized database schemas. I focus on clean architecture, agile collaboration, and taking complete product ownership from development to deployment."}
                </p>
              </div>

              {/* My Journey */}
              <div className={`${aboutPageStyles.sectionCard} opacity-0 animate-fade-in`} style={{ animationDelay: "450ms" }}>
                <h2 className={aboutPageStyles.sectionHeading}>
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  My Journey
                </h2>
                <p className={aboutPageStyles.paragraph}>
                  {profile?.about?.myJourney || "With over 2 years of hands-on experience, I have successfully completed 2 industry internships and independently deployed 15+ live full-stack projects. I graduated as the top ranker (#1) in the Computer Science & Engineering department, combining academic excellence with practical execution."}
                </p>
              </div>

              {/* Vision */}
              <div className={`${aboutPageStyles.sectionCard} opacity-0 animate-fade-in`} style={{ animationDelay: "600ms" }}>
                <h2 className={aboutPageStyles.sectionHeading}>
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  Vision
                </h2>
                <p className={aboutPageStyles.paragraph}>
                  {profile?.about?.vision || "To build high-performance products that solve real-world problems and write maintainable, clean code that stands the test of time."}
                </p>
              </div>

              {/* Beyond Code */}
              <div className={`${aboutPageStyles.sectionCard} opacity-0 animate-fade-in`} style={{ animationDelay: "750ms" }}>
                <h2 className={aboutPageStyles.sectionHeading}>
                  <Compass className="w-5 h-5 text-emerald-400" />
                  Beyond Code
                </h2>
                <p className={aboutPageStyles.paragraph}>
                  {profile?.about?.beyondCode || "Love techno & house music, follow F1 (Max), play chess, and read regularly. Travelled recently to Bali, and a month in Thailand/Vietnam in 2025."}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={aboutPageStyles.ctaContainer}>
              {/* Link to contact page */}
              <Link
                href="/contact"
                className={aboutPageStyles.primaryButton}
                aria-label="Get in touch — open contact page"
              >
                Get in Touch
              </Link>

              {/* Open Gmail compose in new tab */}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={aboutPageStyles.secondaryButton}
                aria-label={`Compose email to ${email} in Gmail`}
              >
                <svg className={aboutPageStyles.emailIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}