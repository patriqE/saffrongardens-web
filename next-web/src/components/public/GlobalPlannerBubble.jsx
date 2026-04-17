"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { chatbotEnabled, plannerOverrideLabel } from "@/lib/chatbotConfig";
import { assertGuestPublicApiPath } from "@/lib/publicApiBoundary";
import { trackUiEvent } from "@/lib/uiAnalytics";

const EMBED_LOAD_TIMEOUT_MS = 2500;
const DISMISS_STORAGE_KEY = "globalPlannerBubbleDismissed";
const MINIMIZED_STORAGE_KEY = "globalPlannerBubbleMinimized";
const CHAT_SESSION_STORAGE_KEY = "publicChatSession";
const UNREAD_POLL_INTERVAL_MS = 12_000;

function parseConversationIdFromSession() {
  try {
    const raw = window.sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    if (!raw) return "";
    const payload = JSON.parse(raw);
    return String(payload?.conversationId || "").trim();
  } catch {
    return "";
  }
}

function normalizeUnreadCount(payload) {
  if (typeof payload === "number") return payload;
  if (Number.isInteger(payload?.unreadCount)) return payload.unreadCount;
  if (Number.isInteger(payload?.count)) return payload.count;
  if (Number.isInteger(payload?.unread)) return payload.unread;
  return 0;
}

export default function GlobalPlannerBubble() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [embedTimedOut, setEmbedTimedOut] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const closePanel = useCallback((reason) => {
    setOpen(false);
    trackUiEvent("planner_bubble_close", { reason });
  }, []);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = window.sessionStorage.getItem(DISMISS_STORAGE_KEY);
      if (stored === "1") {
        setDismissed(true);
      }

      const minimizedStored = window.localStorage.getItem(
        MINIMIZED_STORAGE_KEY,
      );
      if (minimizedStored === "1") {
        setMinimized(true);
      }
    } catch {
      // Ignore storage access errors.
    }
  }, []);

  useEffect(() => {
    if (pathname === "/chat") return;

    let cancelled = false;

    const fetchUnreadCount = async () => {
      const conversationId = parseConversationIdFromSession();
      if (!conversationId) {
        if (!cancelled) setUnreadCount(0);
        return;
      }

      try {
        const response = await fetch(
          assertGuestPublicApiPath(
            `/api/public/chat/${encodeURIComponent(conversationId)}/unread-count`,
          ),
          { cache: "no-store" },
        );

        const text = await response.text();
        const payload = text ? JSON.parse(text) : null;

        if (!response.ok) return;
        if (!cancelled) {
          setUnreadCount(Math.max(0, normalizeUnreadCount(payload)));
        }
      } catch {
        // Keep previous unread count when poll fails.
      }
    };

    fetchUnreadCount();
    const intervalId = window.setInterval(
      fetchUnreadCount,
      UNREAD_POLL_INTERVAL_MS,
    );

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      setIframeLoaded(false);
      setEmbedTimedOut(false);
      return;
    }

    trackUiEvent("planner_bubble_open", { source: "floating_button" });

    const timeoutId = window.setTimeout(() => {
      if (!iframeLoaded) {
        setEmbedTimedOut(true);
        trackUiEvent("planner_bubble_embed_timeout", {
          timeoutMs: EMBED_LOAD_TIMEOUT_MS,
        });
      }
    }, EMBED_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [iframeLoaded, open]);

  useEffect(() => {
    if (!open) return;

    const closeButton = closeButtonRef.current;
    if (closeButton) {
      closeButton.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      const focusTarget = lastFocusedRef.current;
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePanel("escape_key");
      }
    };

    const handlePointerDown = (event) => {
      const panelNode = panelRef.current;
      const triggerNode = triggerRef.current;
      const target = event.target;

      if (panelNode?.contains(target) || triggerNode?.contains(target)) {
        return;
      }

      closePanel("outside_click");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [closePanel, open]);

  function dismissForSession() {
    closePanel("dismiss_for_session");
    setDismissed(true);
    trackUiEvent("planner_bubble_dismiss", { scope: "session" });
    try {
      window.sessionStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      // Ignore storage write errors.
    }
  }

  function setMinimizedPreference(nextValue) {
    setMinimized(nextValue);
    try {
      window.localStorage.setItem(MINIMIZED_STORAGE_KEY, nextValue ? "1" : "0");
    } catch {
      // Ignore storage write errors.
    }
  }

  if (!chatbotEnabled || pathname === "/chat" || dismissed) {
    return null;
  }

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          className={`fixed bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-4 z-[110] flex h-[70vh] w-[min(28rem,calc(100vw-2rem))] max-h-[42rem] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-background-dark shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] transition-all duration-300 md:bottom-28 md:right-8 ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Saffron Assistant planner chat"
        >
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
              onClick={() => {
                closePanel("minimize_button");
                setMinimizedPreference(true);
              }}
              className="rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
              aria-label="Minimize planner chat"
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
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => closePanel("close_button")}
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

          <div className="relative h-full w-full">
            <iframe
              title="Chat with Planner"
              src="/chat?planner=true&embed=1"
              className="h-full w-full border-0 bg-background-dark"
              onLoad={() => {
                setIframeLoaded(true);
                trackUiEvent("planner_bubble_embed_loaded", {
                  route: "/chat?planner=true&embed=1",
                });
              }}
            />

            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background-dark/95 px-6 text-center">
                <p className="text-sm font-semibold text-slate-100">
                  Loading your planner chat...
                </p>
                <p className="text-xs text-slate-400">
                  If this takes too long, open the full chat page.
                </p>
                {embedTimedOut && (
                  <button
                    type="button"
                    onClick={() => {
                      trackUiEvent("planner_bubble_open_full_chat", {
                        source: "embed_timeout",
                      });
                      router.push("/chat?planner=true");
                    }}
                    className="rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-background-dark"
                  >
                    Open full chat with planner
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!open && (
        <button
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+7.75rem)] right-5 z-[111] rounded-full bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300 transition-colors hover:bg-black hover:text-white md:bottom-[7.75rem] md:right-9"
          type="button"
          aria-label="Dismiss assistant bubble for this session"
          onClick={dismissForSession}
        >
          Dismiss
        </button>
      )}

      <button
        ref={triggerRef}
        className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] right-4 z-[111] flex items-center justify-center rounded-full border border-primary/30 bg-primary text-background-dark shadow-[0_18px_40px_-12px_rgba(249,245,6,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 md:bottom-8 md:right-8 ${minimized ? "size-12" : "size-16"} ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        type="button"
        aria-label={
          open ? `Hide ${plannerOverrideLabel}` : plannerOverrideLabel
        }
        onClick={() => {
          lastFocusedRef.current = triggerRef.current;
          if (open) {
            closePanel("toggle_button");
            return;
          }
          if (minimized) {
            setMinimizedPreference(false);
          }
          setOpen(true);
        }}
      >
        {unreadCount > 0 && !open && (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-background-dark bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${minimized ? "h-6 w-6" : "h-8 w-8"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 3C6.48 3 2 6.8 2 11.5c0 2.6 1.37 4.93 3.53 6.49-.16.82-.62 2.15-1.6 3.34a.75.75 0 0 0 .78 1.2c2.3-.58 4.06-1.42 5.12-2.03.67.12 1.41.2 2.17.2 5.52 0 10-3.8 10-8.5S17.52 3 12 3Z" />
        </svg>
      </button>
    </>
  );
}
