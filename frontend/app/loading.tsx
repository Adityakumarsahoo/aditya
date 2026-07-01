// app/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      {/* Background neon ambient highlights */}
      <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />

      {/* Main concentric spinner circles */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer Cyan Ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#00E5FF] animate-spin" />
          {/* Middle Blue Ring */}
          <div className="absolute inset-2.5 rounded-full border-b-2 border-l-2 border-blue-500 animate-spin-reverse opacity-80" />
          {/* Inner Purple pulse Ring */}
          <div className="absolute inset-5 rounded-full border-t border-purple-500/60 animate-pulse" />

          {/* Central Logo Node */}
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative overflow-hidden group">
            {/* Center glow dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF]"></span>
            </span>
          </div>
        </div>

        {/* Loading text with tracking letters */}
        <div className="mt-8 text-center space-y-3">
          <h2 className="text-xs font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 uppercase select-none">
            Loading Portfolio
          </h2>
          {/* Bounce loader indicators */}
          <div className="flex justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
