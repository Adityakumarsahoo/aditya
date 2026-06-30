"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypingAnimation } from "./ui/typing-animation";
import { usePathname } from "next/navigation";
import { sidebarStyles as s } from "@/public/dummyStyles";
import { API_BASE_URL } from "@/lib/api-config";
import { useLiveUpdates } from "@/lib/use-live-updates";

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11L12 4l9 7v9a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9z" />
  </svg>
);

const ProjectsIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h10v8H4zM10 14h10v6H10zM14 4h6v6h-6z" />
  </svg>
);

const UserIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0 1 16 0" />
  </svg>
);

const MailIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v12H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 7 9-7" />
  </svg>
);

const MenuIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8m0-8l-8 8" />
  </svg>
);

const ExperienceIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10l3 4v14H4V7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4h4M8 13h8M8 17h8" />
  </svg>
);

const ToolsIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 7a4 4 0 0 1 0 8l6 6-2 2-6-6a4 4 0 1 1 2-10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l3 3" />
  </svg>
);

const LockIcon = ({ className, ...props }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" aria-hidden="true" className={className} {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();

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
      .catch((err) => console.log("Failed to load dynamic sidebar profile", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest(".mobile-sidebar") && !target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMobileMenuOpen]);

  const navItems: { href: string; label: string; Icon: React.ComponentType<IconProps> }[] = [
    { href: "/", label: "Home", Icon: HomeIcon },
    { href: "/projects", label: "Projects", Icon: ProjectsIcon },
    { href: "/experience", label: "Experience", Icon: ExperienceIcon },
    { href: "/tools", label: "Tools", Icon: ToolsIcon },
    { href: "/about", label: "About", Icon: UserIcon },
    { href: "/contact", label: "Contact", Icon: MailIcon },
  ];

  const socials = [
    {
      label: "X (Twitter)",
      href: profile?.socials?.twitter || "https://x.com/AdiTheNalanda",
      svgPath: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "LinkedIn",
      href: profile?.socials?.linkedin || "https://www.linkedin.com/in/aditya-kumar-sahoo-nit",
      svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },

    {
      label: "Github",
      href: profile?.socials?.github || "https://github.com/Adityakumarsahoo",
      svgPath: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
    },
    {
      label: "Instagram",
      href: profile?.socials?.instagram || "https://www.instagram.com/king._.cindy",
      svgPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ];

  return (
    <>
      {/* Mobile Top Navbar - Fixed at top on mobile screens */}
      <div className={s.mobileTopNav}>
        <div className={s.mobileTopNavInner}>
          <div className={s.mobileAvatarContainer}>
            <div className={s.mobileAvatar}>
              <Image src={profile?.avatar || "/hexagon.png"} alt="Aditya avatar" width={40} height={40} className={s.mobileAvatarImage} priority />
            </div>
            <div>
              <div className={s.mobileName}>{profile?.name || "Aditya Kumar"}</div>
              <TypingAnimation className={s.mobileTyping} words={profile?.typingWords || ["AI Engineer", "FullStack", "Problem Solver", "Dev Stallion"]} loop startOnView={false} />
            </div>
          </div>
        </div>
      </div>

      <div className={s.mobileSpacer} />

      <aside className={s.desktopSidebar} aria-labelledby="desktop-sidebar">
        <div className={s.desktopAvatarContainer}>
          <div className={s.desktopAvatar}>
            <Image src={profile?.avatar || "/hexagon.png"} alt="Aditya avatar" width={48} height={48} className={s.desktopAvatarImage} priority />
          </div>

          <div>
            <div className={s.desktopName}>{profile?.name || "Aditya Kumar"}</div>
            <TypingAnimation className={s.desktopTyping} words={profile?.typingWords || ["AI Engineer", "FullStack", "Problem Solver", "Dev Stallion"]} loop startOnView={false} />
          </div>
        </div>

        <nav id="desktop-sidebar" className={s.navContainer} aria-label="Primary">
          <ul className={s.navList}>
            {navItems.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} className={`${s.navItem} ${pathname === href ? s.navItemActive : s.navItemInactive}`} aria-current={pathname === href ? "page" : undefined}>
                  <Icon className={s.navIcon} />
                  <span className={s.navLabel}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.connectLabel}>Connect</div>

          <ul className={s.socialList}>
            {socials.map((soc) => (
              <li key={soc.label}>
                <a href={soc.href} className={s.socialItem} title={soc.label} rel="noopener noreferrer" target="_blank">
                  <svg className={s.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={soc.svgPath} />
                  </svg>
                  <span className={s.socialLabel}>{soc.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between w-full px-5 pt-4 border-t border-zinc-900/60 mt-auto">
          <div className="text-[10px] font-bold tracking-widest text-zinc-550 uppercase select-none">
            © 2026 {profile?.name ? profile.name.split(" ")[0] : "Aditya"}
          </div>
          <Link 
            href="/admin" 
            className="p-1.5 rounded-lg bg-zinc-900/30 border border-zinc-850/60 text-zinc-500 hover:text-blue-400 hover:border-blue-500/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center" 
            title="Admin Control Panel"
          >
            <LockIcon className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      <div className={`${s.mobileOverlay} ${isMobileMenuOpen ? s.mobileOverlayVisible : s.mobileOverlayHidden}`}>
        <div className={`${s.mobileOverlayBg} ${isMobileMenuOpen ? s.mobileOverlayBgVisible : s.mobileOverlayBgHidden}`} onClick={() => setIsMobileMenuOpen(false)} />

        <div className={`${s.mobileSidebar} ${isMobileMenuOpen ? s.mobileSidebarVisible : s.mobileSidebarHidden}`}>
          <div className={s.mobileSidebarHeader}>
            <div className={s.mobileHeaderInner}>
              <div className={s.mobileHeaderAvatarContainer}>
                <div className={s.mobileAvatar}>
                  <Image src={profile?.avatar || "/hexagon.png"} alt="Aditya" width={40} height={40} className={s.mobileAvatarImage} priority />
                </div>
                <div>
                  <div className={s.mobileName}>{profile?.name || "Aditya Kumar"}</div>
                  <TypingAnimation className={s.mobileTyping} words={profile?.typingWords || ["AI Engineer", "FullStack", "Problem Solver", "Dev Stallion"]} loop startOnView={false} />
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className={s.mobileCloseButton} aria-label="Close menu">
                <CloseIcon className={s.mobileCloseIcon} />
              </button>
            </div>
          </div>

          <div className={s.mobileContent}>
            <nav className="mb-8">
              <div className={s.mobileSectionLabel}>Home</div>
              <ul className={s.mobileNavList}>
                {navItems.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <Link href={href} onClick={() => setIsMobileMenuOpen(false)} className={`${s.mobileNavItem} ${pathname === href ? s.navItemActive : s.navItemInactive}`} aria-current={pathname === href ? "page" : undefined}>
                      <Icon className={s.mobileNavIcon} />
                      <span className={s.mobileNavLabel}>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={s.mobileSocialSection}>
              <div className={s.mobileSectionLabel}>Connect</div>
              <div className={s.mobileSocialList}>
                {socials.map((soc) => (
                  <a key={soc.label} href={soc.href} className={s.mobileSocialItem} rel="noopener noreferrer" target="_blank">
                    <svg className={s.mobileSocialIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d={soc.svgPath} />
                    </svg>
                    <span className={s.mobileSocialText}>{soc.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={s.mobileFooter}>
            <div className={s.mobileFooterLabel}>Reach out →</div>
            <div className="flex items-center justify-between w-full mt-2">
              <div className="text-[10px] font-bold tracking-widest text-zinc-550 uppercase select-none">
                © 2026 {profile?.name ? profile.name.split(" ")[0] : "Aditya"}
              </div>
              <Link 
                href="/admin" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-1.5 rounded-lg bg-zinc-900/30 border border-zinc-850/60 text-zinc-500 hover:text-blue-400 hover:border-blue-500/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center" 
                title="Admin Control Panel"
              >
                <LockIcon className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={s.bottomNav}>
        <div className={s.bottomNavContainer}>
          <div className={s.bottomNavInner}>
            <div className={s.bottomNavBar}>
              {/* Nav items - using grid for perfect equal distribution */}
              <div className={s.bottomNavGrid}>
                {navItems.map(({ href, label, Icon }) => (
                  <Link 
                    key={href} 
                    href={href} 
                    className={`${s.bottomNavLink} ${pathname === href ? s.bottomNavLinkActive : s.bottomNavLinkInactive}`} 
                    aria-label={label}
                  >
                    <Icon className={s.bottomNavIcon} />
                  </Link>
                ))}
              </div>

              <div className={s.bottomNavDivider}></div>

              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className={s.bottomMenuButton} 
                aria-label="Open menu"
              >
                <MenuIcon className={s.bottomMenuIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}