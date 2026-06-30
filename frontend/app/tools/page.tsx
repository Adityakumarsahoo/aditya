"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import { Spotlight } from "@/components/ui/spotlight";
import { toolsPageStyles } from "@/public/dummyStyles";
import { API_BASE_URL } from "@/lib/api-config";
import { useLiveUpdates } from "@/lib/use-live-updates";

interface Tool {
  name: string;
  category: string;
  icon: string;
  href: string;
}

const defaultTools: Tool[] = [
  {
    name: "Git",
    category: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    href: "https://git-scm.com",
  },
  {
    name: "GitHub",
    category: "Dev Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    href: "https://github.com",
  },
  {
    name: "GitLab",
    category: "Dev Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    href: "https://gitlab.com",
  },
  {
    name: "VS Code",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    href: "https://code.visualstudio.com",
  },
  {
    name: "IntelliJ IDEA",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    href: "https://jetbrains.com/idea",
  },
  {
    name: "Eclipse",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",
    href: "https://eclipse.org",
  },
  {
    name: "Figma",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    href: "https://figma.com",
  },
  {
    name: "Adobe Photoshop",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    href: "https://adobe.com/products/photoshop.html",
  },
  {
    name: "Adobe After Effects",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    href: "https://adobe.com/products/aftereffects.html",
  },
];

export default function ToolsPage() {
  const [toolsList, setToolsList] = useState<Tool[]>(defaultTools);

  // Handle Server-Sent Events updates in real-time
  useLiveUpdates((data) => {
    if (data.tools && data.tools.length > 0) {
      setToolsList(data.tools);
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.tools && data.tools.length > 0) {
          setToolsList(data.tools);
        }
      })
      .catch((err) => console.log("Failed to load tools from backend", err));
  }, []);

  return (
    <div className={toolsPageStyles.pageContainer}>
      {/* Spotlight for background glow depth */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#00E5FF" />

      <div className={toolsPageStyles.contentContainer}>
        {/* Header */}
        <div className={toolsPageStyles.headerContainer}>
          <h1 className={toolsPageStyles.headerTitle}>
            Shovels
          </h1>
          <p className={toolsPageStyles.headerSubtitle}>
            Tools I frequently use to make life easier
          </p>
        </div>

        {/* Tools Grid */}
        <div className={toolsPageStyles.toolsGrid}>
          {toolsList.map((tool) => (
            <CometCard key={tool.name}>
              <Link
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={toolsPageStyles.toolCardLink}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Icon */}
                <div className={toolsPageStyles.toolIconContainer}>
                  <Image
                    src={tool.icon}
                    alt={`${tool.name} logo`}
                    width={56}
                    height={56}
                    className={toolsPageStyles.toolIcon}
                    unoptimized={tool.icon.startsWith("http")}
                  />
                </div>

                {/* Name & Category */}
                <div className={toolsPageStyles.toolTextContainer}>
                  <h3 className={toolsPageStyles.toolName}>
                    {tool.name}
                  </h3>
                  <p className={toolsPageStyles.toolCategory}>
                    {tool.category}
                  </p>
                </div>
              </Link>
            </CometCard>
          ))}
        </div>
      </div>
    </div>
  );
}