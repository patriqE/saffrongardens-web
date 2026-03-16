"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  chatbotEnabled,
  getPrimaryChatLabel,
  plannerOverrideLabel,
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
  const searchParams = useSearchParams();
  const isEmbeddedChat =
    pathname === "/chat" && searchParams.get("embed") === "1";
  const usesCustomPublicLayout =
    pathname === "/" || pathname === "/gallery" || pathname === "/contact";
  const hideShellChrome = usesCustomPublicLayout || isEmbeddedChat;

  return (
    <div className="site-bg min-h-dvh text-foreground">
      {!hideShellChrome && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-lg">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-saffron/40 bg-white/5">
                <Image
                  src="/logo.PNG"
                  alt="Saffron Gardens logo"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span className="font-heading text-lg tracking-wide text-white">
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
                    className={`rounded-full px-3 py-2 text-sm transition ${
                      active
                        ? "bg-saffron text-ink"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {chatbotEnabled && (
                <Link
                  href="/chat"
                  className="rounded-full border border-saffron/40 bg-saffron/10 px-4 py-2 text-sm font-semibold text-saffron transition hover:bg-saffron hover:text-ink"
                >
                  {plannerOverrideLabel}
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
          <ul
            className={`grid gap-1 ${chatbotEnabled ? "grid-cols-6" : "grid-cols-5"}`}
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-2 py-2 text-center text-xs transition ${
                      active
                        ? "bg-saffron text-ink"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {chatbotEnabled && (
              <li>
                <Link
                  href="/chat"
                  className="block rounded-lg border border-saffron/40 bg-saffron/10 px-2 py-2 text-center text-xs font-semibold text-saffron transition hover:bg-saffron hover:text-ink"
                >
                  {plannerOverrideLabel}
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
