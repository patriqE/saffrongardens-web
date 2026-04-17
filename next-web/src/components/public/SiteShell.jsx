"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  chatbotEnabled,
  getPrimaryChatCtaLabel,
  getPrimaryChatLabel,
} from "@/lib/chatbotConfig";
import GlobalPlannerBubble from "@/components/public/GlobalPlannerBubble";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-services", label: "About/Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/chat", label: getPrimaryChatLabel() },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEmbeddedChat, setIsEmbeddedChat] = useState(false);
  const usesCustomPublicLayout =
    pathname === "/" || pathname === "/gallery" || pathname === "/contact";
  const hideShellChrome = usesCustomPublicLayout || isEmbeddedChat;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/chat") {
      setIsEmbeddedChat(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setIsEmbeddedChat(params.get("embed") === "1");
  }, [pathname]);

  return (
    <div className="site-bg min-h-dvh text-foreground">
      {!hideShellChrome && (
        <header
          className={`sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-lg transition-all duration-300 ${isScrolled ? "shadow-[0_12px_28px_-20px_rgba(246,198,87,0.75)]" : ""}`}
        >
          <div
            className={`mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 transition-[padding] duration-300 ${isScrolled ? "py-2.5" : "py-4"}`}
          >
            <Link href="/" className="flex items-center gap-2">
              <span
                className={`inline-flex items-center justify-center overflow-hidden rounded-full border border-saffron/40 bg-white/5 transition-all duration-300 ${isScrolled ? "size-8" : "size-9"}`}
              >
                <Image
                  src="/logo.PNG"
                  alt="Saffron Gardens logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span
                className={`font-heading tracking-wide text-white transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"}`}
              >
                Saffron Gardens
              </span>
            </Link>

            <nav
              className="hidden items-center gap-2 md:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition ${
                      active
                        ? "bg-saffron/95 text-ink shadow-[0_10px_20px_-14px_rgba(246,198,87,0.95)]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-ink"
                      />
                    )}
                  </Link>
                );
              })}
              {chatbotEnabled && (
                <Link
                  href="/chat"
                  className="rounded-full border border-saffron/40 bg-saffron/10 px-4 py-2 text-sm font-semibold text-saffron transition hover:bg-saffron hover:text-ink"
                >
                  {getPrimaryChatCtaLabel()}
                </Link>
              )}
            </nav>
          </div>
        </header>
      )}

      <main
        className={
          hideShellChrome
            ? "w-full"
            : "mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-6 md:pb-10"
        }
      >
        {children}
      </main>

      {!hideShellChrome && (
        <footer className="border-t border-white/10 bg-ink/80 px-4 py-8 sm:px-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p>Curated event spaces for unforgettable celebrations.</p>
            <p>© {new Date().getFullYear()} Saffron Gardens</p>
          </div>
        </footer>
      )}

      {!hideShellChrome && (
        <nav
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 px-2 py-2 backdrop-blur md:hidden"
        >
          <ul className="mobile-nav-scrollbar flex gap-2 overflow-x-auto pb-[max(0px,env(safe-area-inset-bottom))]">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="flex-none">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block min-w-[5.35rem] rounded-xl px-3 py-2.5 text-center text-xs font-medium transition ${
                      active
                        ? "bg-saffron text-ink shadow-[0_12px_24px_-18px_rgba(246,198,87,0.95)]"
                        : "border border-white/10 text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {chatbotEnabled && (
              <li className="flex-none">
                <Link
                  href="/chat"
                  className="block min-w-[6.6rem] rounded-xl border border-saffron/40 bg-saffron/10 px-3 py-2.5 text-center text-xs font-semibold text-saffron transition hover:bg-saffron hover:text-ink"
                >
                  {getPrimaryChatCtaLabel()}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}

      <GlobalPlannerBubble />
    </div>
  );
}
