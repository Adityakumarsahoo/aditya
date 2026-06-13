"use client";

import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Spotlight } from "@/components/ui/spotlight";
import { Briefcase, Code2 } from "lucide-react";
import { timelineStyles as s } from "@/public/dummyStyles";
import { API_BASE_URL } from "@/lib/api-config";
import { useLiveUpdates } from "@/lib/use-live-updates";

interface TechCategory {
  title: string;
  items: string[];
  colorClass: string;
  hoverBorderClass: string;
}

const defaultTechCategories: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Angular.js",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Web Design",
      "UI/UX Principles"
    ],
    colorClass: "text-blue-400",
    hoverBorderClass: "hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Java Spring Boot",
      "Spring Framework",
      "REST API Development",
      "WebSockets (Socket.io)",
      "Maven",
      "Gradle"
    ],
    colorClass: "text-emerald-400",
    hoverBorderClass: "hover:border-emerald-500/35 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
  },
  {
    title: "AI/ML",
    items: [
      "Machine Learning Concepts",
      "Neural Networks",
      "Intelligent System Design",
      "Prompt Engineering",
      "OpenAI Integration",
      "AI-based Fraud Detection",
      "AI Pattern Recognition"
    ],
    colorClass: "text-purple-400",
    hoverBorderClass: "hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]",
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "SQL"],
    colorClass: "text-amber-400",
    hoverBorderClass: "hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]",
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "Vercel",
      "Netlify",
      "GitHub Pages",
      "Deployment & Hosting",
      "Git-based Version Control"
    ],
    colorClass: "text-rose-400",
    hoverBorderClass: "hover:border-rose-500/35 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]",
  },
  {
    title: "Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "VS Code",
      "IntelliJ IDEA",
      "Eclipse",
      "Figma",
      "Adobe Photoshop",
      "Adobe After Effects"
    ],
    colorClass: "text-cyan-400",
    hoverBorderClass: "hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
  },
];

export default function TimelineDemo() {
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<TechCategory[]>(defaultTechCategories);

  // Handle Server-Sent Events updates in real-time
  useLiveUpdates((data) => {
    if (data.experience) {
      setExperience(data.experience);
    }
    if (data.skills && data.skills.length > 0) {
      setSkills(data.skills);
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.experience) {
            setExperience(data.experience);
          }
          if (data.skills && data.skills.length > 0) {
            setSkills(data.skills);
          }
        }
      })
      .catch((err) => console.log("Failed to load dynamic portfolio data on experience page", err));
  }, []);

  const timelineData = experience.map((exp) => ({
    title: exp.title,
    content: (
      <div className={`space-y-4 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 shadow-xl transition-all duration-350 hover:bg-zinc-900/20 group/card ${
        exp.type === "full-time" 
          ? "hover:border-blue-500/25 hover:shadow-[0_0_30px_rgba(59,130,246,0.04)]" 
          : "hover:border-purple-500/25 hover:shadow-[0_0_30px_rgba(168,85,247,0.04)]"
      }`}>
        <div className={s.itemFlexContainer}>
          <div className={exp.type === "full-time" ? s.iconContainerBlue : s.iconContainerPurple}>
            {exp.type === "full-time" ? (
              <Briefcase className={s.iconBlue} />
            ) : (
              <Code2 className={s.iconPurple} />
            )}
          </div>
          <div>
            <h3 className={s.contentTitle}>{exp.role} · {exp.company}</h3>
            <p className={s.contentSubtitle}>{exp.companySubtitle}</p>
            <p className={s.contentText}>{exp.location}</p>
          </div>
        </div>
        <ul className="space-y-3 mt-4">
          {exp.points.map((pt: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 group/item">
              <span className={`mt-1.5 flex h-2 w-2 shrink-0 items-center justify-center rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover/item:scale-125 transition-transform duration-200 ${
                exp.type === "full-time" ? "bg-blue-500 shadow-blue-500/60" : "bg-purple-500 shadow-purple-500/60"
              }`} />
              <p className="leading-relaxed select-text">
                {pt}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2">
          {exp.tags.map((tag: string) => (
            <span key={tag} className={`rounded-full bg-zinc-950/45 border border-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-all duration-250 hover:bg-zinc-900/30 hover:scale-105 shadow-sm select-none ${
              exp.type === "full-time" ? "hover:border-blue-500/30 hover:text-blue-400" : "hover:border-purple-500/30 hover:text-purple-400"
            }`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }));

  return (
    <div className={s.container}>
      {/* Spotlight for background glow depth */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#0FFF50" />
      
      <div className={s.innerContainer}>
        <div className="mb-12">
          <div className={s.timelineBadge}>
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className={s.timelineBadgeText}>Career Timeline</span>
          </div>
          <h1 className={s.mainTitle}>Changelog from my journey</h1>
          <p className={s.mainParagraph}>
            Here is a timeline of my professional experience and internships.
          </p>
          <div className={s.legendContainer}>
            <div className={s.legendItem}>
              <div className={`${s.legendDot} bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]`}></div>
              <span className={s.legendText}>Full Time</span>
            </div>
            <div className={s.legendItem}>
              <div className={`${s.legendDot} bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]`}></div>
              <span className={s.legendText}>Internship</span>
            </div>
          </div>
        </div>
        <Timeline data={timelineData} />
        <div className={s.techSectionContainer}>
          <div className={s.techSectionHeader}>
            <div className={s.techSectionIconContainer}>
              <Code2 className={s.techSectionIcon} />
            </div>
            <div>
              <h3 className={s.techSectionTitle}>Technologies Mastered</h3>
              <p className={s.techSectionSubtitle}>Full-stack expertise across modern tech stack</p>
            </div>
          </div>
          <div className={s.techGrid}>
            {skills.map((cat, idx) => (
              <div 
                key={cat.title} 
                className={`${s.techCard} ${cat.hoverBorderClass} opacity-0 animate-fade-in`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className={`${s.techCardTitle} ${cat.colorClass}`}>
                  {cat.title}
                </div>
                <div className={s.techCardContent}>
                  {cat.items.map((item) => {
                    let hoverPillColorClass = "hover:text-emerald-400 hover:border-emerald-500/35 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]";
                    if (cat.title === "Frontend") {
                      hoverPillColorClass = "hover:text-blue-400 hover:border-blue-500/35 hover:shadow-[0_0_10px_rgba(59,130,246,0.1)]";
                    } else if (cat.title === "Backend") {
                      hoverPillColorClass = "hover:text-emerald-400 hover:border-emerald-500/35 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]";
                    } else if (cat.title === "AI/ML") {
                      hoverPillColorClass = "hover:text-purple-400 hover:border-purple-500/35 hover:shadow-[0_0_10px_rgba(168,85,247,0.1)]";
                    } else if (cat.title === "Databases") {
                      hoverPillColorClass = "hover:text-amber-400 hover:border-amber-500/35 hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]";
                    } else if (cat.title === "Cloud & DevOps") {
                      hoverPillColorClass = "hover:text-rose-400 hover:border-rose-500/35 hover:shadow-[0_0_10px_rgba(244,63,94,0.1)]";
                    } else if (cat.title === "Tools") {
                      hoverPillColorClass = "hover:text-cyan-400 hover:border-cyan-500/35 hover:shadow-[0_0_10px_rgba(6,182,212,0.1)]";
                    }
                    return (
                      <span key={item} className={`${s.techCardPill} transition-all duration-300 hover:scale-105 ${hoverPillColorClass}`}>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}