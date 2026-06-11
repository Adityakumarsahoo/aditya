// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/ui/custom-cursor";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Aditya Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} bg-zinc-950 text-zinc-100 antialiased`}
        suppressHydrationWarning
      >
        {/* Global custom neon cursor and click ripple indicator */}
        <CustomCursor />

        {/* Floating background ambient glow circles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-30" suppressHydrationWarning>
          <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/10 blur-[130px] animate-blob" suppressHydrationWarning />
          <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-teal-500/8 blur-[110px] animate-blob animation-delay-2000" suppressHydrationWarning />
          <div className="absolute bottom-[10%] left-[30%] w-[25vw] h-[25vw] rounded-full bg-emerald-600/5 blur-[95px] animate-blob animation-delay-4000" suppressHydrationWarning />
        </div>

        <div className="min-h-screen flex">
          {/* Sidebar - handles both desktop and mobile */}
          <Sidebar />
          
          {/* Main content area */}
          <div className="flex-1 md:ml-[260px] ml-10px">
            <main className="min-h-screen">
              {children}
            </main>
            {/* Footer added to layout */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}