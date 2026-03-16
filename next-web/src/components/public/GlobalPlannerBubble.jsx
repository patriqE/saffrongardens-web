"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { chatbotEnabled } from "@/lib/chatbotConfig";

export default function GlobalPlannerBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!chatbotEnabled || pathname === "/chat") {
    return null;
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[110] flex h-[70vh] w-[min(28rem,calc(100vw-2rem))] max-h-[42rem] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-background-dark shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] md:bottom-28 md:right-8">
          <div className="flex items-center justify-between border-b border-primary/35 bg-black px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-primary/40 bg-white/10 p-1">
                <Image
                  src="/logo.PNG"
                  alt="Saffron Gardens Logo"
                  width={20}
                  height={20}
                  className="size-5 object-contain"
                />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-slate-100">
                  Saffron Assistant
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Active Concierge AI
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
              aria-label="Close planner chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <iframe
            title="Planner chat"
            src="/chat?planner=true&embed=1"
            className="h-full w-full border-0 bg-background-dark"
          />
        </div>
      )}

      <button
        className="fixed bottom-6 right-4 z-[111] flex size-16 items-center justify-center rounded-full border border-primary/30 bg-primary text-background-dark shadow-[0_18px_40px_-12px_rgba(249,245,6,0.7)] transition-transform duration-200 hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
        type="button"
        aria-label={open ? "Hide planner chat" : "Open planner chat"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3C6.48 3 2 6.8 2 11.5c0 2.6 1.37 4.93 3.53 6.49-.16.82-.62 2.15-1.6 3.34a.75.75 0 0 0 .78 1.2c2.3-.58 4.06-1.42 5.12-2.03.67.12 1.41.2 2.17.2 5.52 0 10-3.8 10-8.5S17.52 3 12 3Z" />
        </svg>
      </button>
    </>
  );
}
