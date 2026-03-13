"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chatbotEnabled, plannerOverrideLabel } from "@/lib/chatbotConfig";

const STORAGE_KEY = "publicChatSession";
const PAGE_SIZE = 20;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const POLL_INTERVAL_MS = 10_000;

function normalizeStoredSession(payload) {
  if (!payload || typeof payload !== "object") return null;

  return {
    conversationId: String(payload.conversationId || ""),
    assignmentStatus: String(payload.assignmentStatus || ""),
    responseMessage: String(payload.responseMessage || ""),
    email: String(payload.email || ""),
    name: String(payload.name || ""),
    preferredPlannerUsername: String(payload.preferredPlannerUsername || ""),
  };
}

function parseStoredSession(raw) {
  if (!raw) return null;
  try {
    return normalizeStoredSession(JSON.parse(raw));
  } catch {
    return null;
  }
}

function readStoredSession() {
  if (typeof window === "undefined") return null;

  const sessionPayload = parseStoredSession(
    window.sessionStorage.getItem(STORAGE_KEY),
  );
  if (sessionPayload) return sessionPayload;

  const localPayload = parseStoredSession(
    window.localStorage.getItem(STORAGE_KEY),
  );
  if (!localPayload) return null;

  // Promote legacy localStorage sessions into sessionStorage for refresh recovery.
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(localPayload));
  } catch {
    // Ignore storage write failures.
  }

  return localPayload;
}

function persistStoredSession(payload) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(normalizeStoredSession(payload));

  try {
    window.sessionStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // Ignore storage write failures.
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // Ignore storage write failures.
  }
}

function normalizeMessagesPayload(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      page: 0,
      size: PAGE_SIZE,
      hasPrev: false,
      hasNext: false,
    };
  }

  const content = Array.isArray(payload?.content)
    ? payload.content
    : Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.messages)
        ? payload.messages
        : [];

  const page = Number.isInteger(payload?.number)
    ? payload.number
    : Number.isInteger(payload?.page)
      ? payload.page
      : 0;

  const size = Number.isInteger(payload?.size) ? payload.size : PAGE_SIZE;

  const hasPrev =
    typeof payload?.first === "boolean" ? !payload.first : page > 0;

  const hasNext =
    typeof payload?.last === "boolean"
      ? !payload.last
      : typeof payload?.totalPages === "number"
        ? page + 1 < payload.totalPages
        : content.length >= size;

  return { items: content, page, size, hasPrev, hasNext };
}

function formatMessageTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

function extractMessageBody(message) {
  if (typeof message === "string") return message;
  return (
    message?.message ||
    message?.content ||
    message?.text ||
    message?.body ||
    "(no content)"
  );
}

function extractMessageSender(message) {
  return (
    message?.senderName ||
    message?.sender ||
    message?.author ||
    message?.role ||
    "Guest"
  );
}

function normalizeUnreadCount(payload) {
  if (typeof payload === "number") return payload;
  if (Number.isInteger(payload?.unreadCount)) return payload.unreadCount;
  if (Number.isInteger(payload?.count)) return payload.count;
  if (Number.isInteger(payload?.unread)) return payload.unread;
  return 0;
}

function safeJson(value) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getMessageId(message) {
  return (
    message?.id ??
    message?.messageId ??
    message?.uuid ??
    message?.message_id ??
    null
  );
}

function extractRealtimeConversationState(payload) {
  return {
    assignmentStatus:
      payload?.assignmentStatus || payload?.assignment_status || "",
    responseMessage: payload?.responseMessage || payload?.message || "",
  };
}

function normalizePlannerResults(payload) {
  const candidates = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.content)
      ? payload.content
      : Array.isArray(payload?.items)
        ? payload.items
        : Array.isArray(payload?.planners)
          ? payload.planners
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

  return candidates
    .map((planner, index) => {
      const username =
        planner?.username ||
        planner?.userName ||
        planner?.plannerUsername ||
        "";
      const displayName =
        planner?.displayName ||
        planner?.fullName ||
        planner?.name ||
        planner?.plannerName ||
        username;

      const status = String(
        planner?.status || planner?.presence || "",
      ).toLowerCase();
      const isOnline =
        typeof planner?.isOnline === "boolean"
          ? planner.isOnline
          : typeof planner?.online === "boolean"
            ? planner.online
            : status === "online" || status === "active";

      if (!username && !displayName) return null;

      return {
        id: planner?.id || username || `planner-${index}`,
        username,
        displayName,
        isOnline,
      };
    })
    .filter(Boolean);
}

function createStoredPlanner(username) {
  const value = username?.trim();
  if (!value) return null;

  return {
    id: value,
    username: value,
    displayName: value,
    isOnline: false,
  };
}

function getAssignmentStatusDetails(status, preferredPlannerUsername) {
  const normalizedStatus = String(status || "")
    .trim()
    .toUpperCase();
  const selectedPlannerHandle = preferredPlannerUsername?.trim()
    ? `@${preferredPlannerUsername.trim()}`
    : "your selected planner";

  switch (normalizedStatus) {
    case "PREFERRED_ASSIGNED":
      return {
        label: "Preferred Planner Assigned",
        message: `${selectedPlannerHandle} has been assigned to your chat. You can start messaging now.`,
      };
    case "PREFERRED_PENDING":
      return {
        label: "Preferred Planner Pending",
        message: `${selectedPlannerHandle} was requested, but has not accepted the chat yet.`,
      };
    case "PREFERRED_NOT_FOUND":
      return {
        label: "Preferred Planner Not Found",
        message: `${selectedPlannerHandle} could not be found. Your chat remains open for assignment.`,
      };
    case "AUTO_ASSIGNED":
      return {
        label: "Planner Assigned",
        message:
          "A planner has been assigned automatically to keep your chat moving.",
      };
    case "OPEN":
      return {
        label: "Open Queue",
        message: "Your chat is open and waiting for an available planner.",
      };
    default:
      return {
        label: normalizedStatus || "Assignment Update",
        message: "Your chat request has been received.",
      };
  }
}

export default function ChatPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferredPlannerUsername, setPreferredPlannerUsername] = useState("");
  const [plannerQuery, setPlannerQuery] = useState("");
  const [selectedPlanner, setSelectedPlanner] = useState(null);
  const [plannerResults, setPlannerResults] = useState([]);
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [plannerSearchError, setPlannerSearchError] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [sessionRecovered, setSessionRecovered] = useState(false);
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadLoading, setUnreadLoading] = useState(false);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const stompClientRef = useRef(null);
  const seenMessageIdsRef = useRef(new Set());
  const prevRealtimeConnectedRef = useRef(false);

  const canSubmit = useMemo(
    () => Boolean(email.trim() && name.trim()) && !submitting,
    [email, name, submitting],
  );

  const assignmentStatusDetails = useMemo(
    () =>
      getAssignmentStatusDetails(
        assignmentStatus,
        preferredPlannerUsername || selectedPlanner?.username,
      ),
    [assignmentStatus, preferredPlannerUsername, selectedPlanner],
  );

  useEffect(() => {
    const parsed = readStoredSession();
    if (!parsed) return;

    setConversationId(parsed.conversationId);
    setAssignmentStatus(parsed.assignmentStatus);
    setResponseMessage(parsed.responseMessage);
    setEmail(parsed.email);
    setName(parsed.name);
    const storedPlannerUsername = parsed.preferredPlannerUsername;
    setPreferredPlannerUsername(storedPlannerUsername);
    setPlannerQuery(storedPlannerUsername);
    setSelectedPlanner(createStoredPlanner(storedPlannerUsername));
    setSessionRecovered(Boolean(parsed.conversationId));
  }, []);

  useEffect(() => {
    if (conversationId) {
      setPlannerResults([]);
      setPlannerLoading(false);
      setPlannerSearchError("");
      return;
    }

    const query = plannerQuery.trim();
    if (query.length < 2) {
      setPlannerResults([]);
      setPlannerLoading(false);
      setPlannerSearchError("");
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setPlannerLoading(true);
      setPlannerSearchError("");

      try {
        const res = await fetch(
          `/api/public/chat/planners?q=${encodeURIComponent(query)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        const text = await res.text();
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text || null;
        }

        if (!res.ok) {
          throw new Error(
            data?.error || data?.message || "Failed to search planners",
          );
        }

        setPlannerResults(normalizePlannerResults(data));
      } catch (err) {
        if (err?.name === "AbortError") return;
        setPlannerResults([]);
        setPlannerSearchError(err?.message || "Unable to search planners");
      } finally {
        if (!controller.signal.aborted) {
          setPlannerLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [conversationId, plannerQuery]);

  const fetchUnreadCount = useCallback(
    async ({ silent = true } = {}) => {
      if (!conversationId) {
        setUnreadCount(0);
        return;
      }

      if (!silent) setUnreadLoading(true);

      try {
        const res = await fetch(
          `/api/public/chat/${encodeURIComponent(conversationId)}/unread-count`,
          { cache: "no-store" },
        );

        const text = await res.text();
        let data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text || null;
        }

        if (!res.ok) {
          throw new Error(
            data?.error || data?.message || "Failed to load unread count",
          );
        }

        setUnreadCount(Math.max(0, normalizeUnreadCount(data)));
      } catch (err) {
        if (!silent) {
          setError(err?.message || "Unable to load unread count");
        }
      } finally {
        if (!silent) setUnreadLoading(false);
      }
    },
    [conversationId],
  );

  const loadConversationHistory = useCallback(
    async ({ page = historyPage, silent = false, merge = false } = {}) => {
      if (!conversationId) {
        setMessages([]);
        setHasPrevPage(false);
        setHasNextPage(false);
        setUnreadCount(0);
        seenMessageIdsRef.current = new Set();
        return;
      }

      if (!silent) {
        setHistoryLoading(true);
        setError("");
      }

      try {
        const res = await fetch(
          `/api/public/chat/${encodeURIComponent(conversationId)}/messages?page=${page}&size=${PAGE_SIZE}`,
          { cache: "no-store" },
        );
        const text = await res.text();
        const data = text ? safeJson(text) : null;

        if (!res.ok) {
          throw new Error(
            data?.error || data?.message || "Failed to load history",
          );
        }

        const normalized = normalizeMessagesPayload(data);

        if (merge) {
          // Deduped append — only add messages whose IDs haven't been seen yet.
          setMessages((prev) => {
            const seen = seenMessageIdsRef.current;
            const toAdd = [];

            for (const msg of normalized.items) {
              const msgId = getMessageId(msg);
              if (msgId !== null) {
                if (!seen.has(msgId)) {
                  seen.add(msgId);
                  toAdd.push(msg);
                }
              } else {
                // No stable ID — always include to avoid silent message loss.
                toAdd.push(msg);
              }
            }

            return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
          });
        } else {
          // Full replace — re-seed the seen-ID set from this page.
          seenMessageIdsRef.current = new Set(
            normalized.items.map(getMessageId).filter(Boolean),
          );
          setMessages(normalized.items);
        }

        setHasPrevPage(normalized.hasPrev);
        setHasNextPage(normalized.hasNext);
        fetchUnreadCount({ silent: true });
      } catch (err) {
        if (!silent) {
          setError(err?.message || "Unable to load conversation history");
        }
      } finally {
        if (!silent) {
          setHistoryLoading(false);
        }
      }
    },
    [conversationId, historyPage, fetchUnreadCount],
  );

  useEffect(() => {
    if (!conversationId) return;

    fetchUnreadCount({ silent: true });
    const intervalId = window.setInterval(() => {
      fetchUnreadCount({ silent: true });
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [conversationId, fetchUnreadCount]);

  useEffect(() => {
    loadConversationHistory();
  }, [loadConversationHistory]);

  useEffect(() => {
    // Track the previous connected state so we can detect a WS drop.
    const wasConnected = prevRealtimeConnectedRef.current;
    prevRealtimeConnectedRef.current = realtimeConnected;

    if (!conversationId || realtimeConnected) return;

    // WS just dropped — immediately resync to avoid a gap of up to POLL_INTERVAL_MS.
    if (wasConnected) {
      loadConversationHistory({
        page: historyPage,
        silent: true,
        merge: false,
      });
      fetchUnreadCount({ silent: true });
    }

    // Ongoing polling: deduped append so messages received via WS before the
    // drop are never lost or duplicated when the poll returns the same page.
    const intervalId = window.setInterval(() => {
      loadConversationHistory({ page: historyPage, silent: true, merge: true });
      fetchUnreadCount({ silent: true });
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [
    conversationId,
    fetchUnreadCount,
    historyPage,
    loadConversationHistory,
    realtimeConnected,
  ]);

  useEffect(() => {
    if (!conversationId) {
      setRealtimeConnected(false);
      return;
    }

    let disposed = false;

    const connectRealtime = async () => {
      try {
        const [{ Client }, sockJsModule] = await Promise.all([
          import("@stomp/stompjs"),
          import("sockjs-client"),
        ]);

        if (disposed) return;

        const SockJS = sockJsModule.default;
        const client = new Client({
          reconnectDelay: 5000,
          debug: () => {},
          webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws-chat`),
          onConnect: () => {
            if (disposed) return;

            setRealtimeConnected(true);

            client.subscribe(
              `/topic/conversations/${conversationId}`,
              (frame) => {
                const payload = safeJson(frame.body);
                const nextState = extractRealtimeConversationState(payload);

                if (nextState.assignmentStatus) {
                  setAssignmentStatus(nextState.assignmentStatus);
                }

                if (nextState.responseMessage) {
                  setResponseMessage(nextState.responseMessage);
                }

                setHistoryPage(0);
                loadConversationHistory({ page: 0, silent: true });
              },
            );

            client.subscribe(
              `/topic/conversations/${conversationId}/unread`,
              (frame) => {
                const payload = safeJson(frame.body);

                if (payload == null || payload === "") {
                  fetchUnreadCount({ silent: true });
                  return;
                }

                setUnreadCount(Math.max(0, normalizeUnreadCount(payload)));
              },
            );
          },
          onDisconnect: () => {
            if (!disposed) setRealtimeConnected(false);
          },
          onStompError: () => {
            if (!disposed) setRealtimeConnected(false);
          },
          onWebSocketClose: () => {
            if (!disposed) setRealtimeConnected(false);
          },
          onWebSocketError: () => {
            if (!disposed) setRealtimeConnected(false);
          },
        });

        stompClientRef.current = client;
        client.activate();
      } catch {
        if (!disposed) {
          setRealtimeConnected(false);
        }
      }
    };

    connectRealtime();

    return () => {
      disposed = true;
      setRealtimeConnected(false);
      const client = stompClientRef.current;
      stompClientRef.current = null;
      if (client) {
        client.deactivate();
      }
    };
  }, [conversationId, fetchUnreadCount, loadConversationHistory]);

  useEffect(() => {
    if (!conversationId) return;

    persistStoredSession({
      conversationId,
      assignmentStatus,
      responseMessage,
      email: email.trim(),
      name: name.trim(),
      preferredPlannerUsername: preferredPlannerUsername.trim(),
    });
  }, [
    assignmentStatus,
    conversationId,
    email,
    name,
    preferredPlannerUsername,
    responseMessage,
  ]);

  const onStartChat = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/public/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          preferredPlannerUsername:
            preferredPlannerUsername.trim() || undefined,
        }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text || null;
      }

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to start chat");
      }

      const nextConversationId =
        data?.conversationId || data?.conversation_id || "";
      const nextAssignmentStatus =
        data?.assignmentStatus || data?.assignment_status || "";
      const nextResponseMessage =
        data?.responseMessage || data?.message || "Chat started successfully.";

      setConversationId(nextConversationId);
      setSessionRecovered(false);
      setAssignmentStatus(nextAssignmentStatus);
      setResponseMessage(nextResponseMessage);
      setHistoryPage(0);
      setUnreadCount(0);

      persistStoredSession({
        conversationId: nextConversationId,
        assignmentStatus: nextAssignmentStatus,
        responseMessage: nextResponseMessage,
        email: email.trim(),
        name: name.trim(),
        preferredPlannerUsername: preferredPlannerUsername.trim(),
      });
    } catch (err) {
      setError(err?.message || "Unable to start public chat");
    } finally {
      setSubmitting(false);
    }
  };

  const onPlannerQueryChange = (event) => {
    const value = event.target.value;
    setPlannerQuery(value);
    setPlannerSearchError("");

    if (value.trim() !== preferredPlannerUsername) {
      setPreferredPlannerUsername("");
      setSelectedPlanner(null);
    }
  };

  const onPlannerSelect = (planner) => {
    setSelectedPlanner(planner);
    setPreferredPlannerUsername(planner.username);
    setPlannerQuery(planner.displayName || planner.username);
    setPlannerResults([]);
    setPlannerSearchError("");
  };

  const clearPlannerSelection = () => {
    setSelectedPlanner(null);
    setPreferredPlannerUsername("");
    setPlannerQuery("");
    setPlannerResults([]);
    setPlannerSearchError("");
  };

  const onSendMessage = async (event) => {
    event.preventDefault();

    const value = chatMessage.trim();
    if (!conversationId) {
      setError("Start chat first to get a conversation ID.");
      return;
    }
    if (!value) {
      setError("Message cannot be empty.");
      return;
    }

    setSendingMessage(true);
    setError("");
    try {
      const res = await fetch(
        `/api/public/chat/${encodeURIComponent(conversationId)}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: value, content: value }),
        },
      );

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text || null;
      }

      if (!res.ok) {
        throw new Error(
          data?.error || data?.message || "Failed to send message",
        );
      }

      setChatMessage("");
      setResponseMessage(
        data?.responseMessage || data?.message || "Message sent successfully.",
      );

      // Refresh first page to reflect latest thread activity.
      setHistoryPage(0);
      fetchUnreadCount({ silent: true });
    } catch (err) {
      setError(err?.message || "Unable to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Chat</h1>
        <p className="max-w-2xl text-white/75">
          {chatbotEnabled
            ? "Start a public chat as a guest. No login is required."
            : "The chatbot is currently disabled. You can still start a direct conversation with a planner below."}
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <form className="space-y-4" onSubmit={onStartChat}>
          <div className="rounded-2xl bg-ink/70 p-4 text-sm text-white/80">
            {chatbotEnabled
              ? "Provide your contact details to begin a conversation and get assigned to a planner."
              : `${plannerOverrideLabel} is still available. Provide your contact details to start a direct planner conversation.`}
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-white/80">Email *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/80">Name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="Your full name"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/80">
              Choose Planner (Optional)
            </span>
            <input
              type="text"
              value={plannerQuery}
              onChange={onPlannerQueryChange}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="Search by username or display name"
              autoComplete="off"
              aria-describedby="planner-search-help"
            />
            <p id="planner-search-help" className="text-xs text-white/55">
              Search planners before starting the chat. Selected planner
              usernames are sent with the chat request.
            </p>
          </label>

          {selectedPlanner && (
            <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 text-sm text-white/85">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {selectedPlanner.displayName}
                  </p>
                  <p className="text-xs text-white/60">
                    @{selectedPlanner.username}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearPlannerSelection}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/75"
                >
                  Clear
                </button>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${selectedPlanner.isOnline ? "bg-emerald-400" : "bg-white/30"}`}
                  aria-hidden="true"
                />
                <span>{selectedPlanner.isOnline ? "Online" : "Offline"}</span>
              </div>
            </div>
          )}

          {!selectedPlanner && plannerQuery.trim().length >= 2 && (
            <div className="rounded-2xl border border-white/10 bg-ink/60 p-3">
              {plannerLoading && (
                <p className="text-sm text-white/70">Searching planners...</p>
              )}

              {!plannerLoading && plannerSearchError && (
                <p className="text-sm text-red-400">{plannerSearchError}</p>
              )}

              {!plannerLoading &&
                !plannerSearchError &&
                plannerResults.length === 0 && (
                  <p className="text-sm text-white/70">
                    No planners matched that search.
                  </p>
                )}

              {!plannerLoading && plannerResults.length > 0 && (
                <ul className="space-y-2">
                  {plannerResults.map((planner) => (
                    <li key={planner.id}>
                      <button
                        type="button"
                        onClick={() => onPlannerSelect(planner)}
                        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-saffron/40 hover:bg-white/10"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-white">
                            {planner.displayName}
                          </span>
                          <span className="block text-xs text-white/60">
                            @{planner.username}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs text-white/70">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${planner.isOnline ? "bg-emerald-400" : "bg-white/30"}`}
                            aria-hidden="true"
                          />
                          <span>{planner.isOnline ? "Online" : "Offline"}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {conversationId && (
            <div className="rounded-xl border border-saffron/40 bg-saffron/10 p-4 text-sm text-white/90">
              {sessionRecovered && (
                <p className="mb-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                  Active chat session restored after refresh.
                </p>
              )}
              <p>
                <span className="font-semibold text-saffron">
                  Conversation ID:
                </span>{" "}
                <span className="break-all">{conversationId}</span>
              </p>
              {assignmentStatus && (
                <p className="mt-2">
                  <span className="font-semibold text-saffron">
                    Planner Status:
                  </span>{" "}
                  {assignmentStatusDetails.label}
                </p>
              )}
              {preferredPlannerUsername && (
                <p className="mt-2">
                  <span className="font-semibold text-saffron">
                    Selected Planner:
                  </span>{" "}
                  @{preferredPlannerUsername}
                </p>
              )}
              {(assignmentStatus || responseMessage) && (
                <p className="mt-2 text-white/80">
                  {assignmentStatus
                    ? assignmentStatusDetails.message
                    : responseMessage}
                </p>
              )}
              {responseMessage &&
                assignmentStatus &&
                responseMessage !== assignmentStatusDetails.message && (
                  <p className="mt-2 text-xs text-white/60">
                    {responseMessage}
                  </p>
                )}
              {conversationId && !assignmentStatus && !responseMessage && (
                <p className="mt-2 text-white/80">
                  {assignmentStatusDetails.message}
                </p>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-300"
          >
            {submitting
              ? "Starting..."
              : chatbotEnabled
                ? "Start Chat"
                : plannerOverrideLabel}
          </button>
        </form>
      </section>

      {conversationId && (
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-2xl text-white">Conversation</h2>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${realtimeConnected ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/15 bg-white/5 text-white/65"}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${realtimeConnected ? "bg-emerald-400" : "bg-white/35"}`}
                  aria-hidden="true"
                />
                {realtimeConnected ? "Live updates" : "Polling fallback"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => fetchUnreadCount({ silent: false })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80"
            >
              <span>Unread</span>
              <span className="rounded-full bg-saffron px-2 py-0.5 text-ink">
                {unreadCount}
              </span>
              {unreadLoading && <span className="text-white/60">...</span>}
            </button>
          </div>

          <form className="mt-4 space-y-3" onSubmit={onSendMessage}>
            <label className="block space-y-2">
              <span className="text-sm text-white/80">Message</span>
              <textarea
                rows={3}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
                placeholder="Type your message"
              />
            </label>

            <button
              type="submit"
              disabled={sendingMessage}
              className="rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-300 disabled:opacity-70"
            >
              {sendingMessage ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">History</h3>
              <p className="text-xs text-white/60">Page {historyPage + 1}</p>
            </div>

            {historyLoading && (
              <p className="text-sm text-white/70">Loading messages...</p>
            )}

            {!historyLoading && messages.length === 0 && (
              <p className="text-sm text-white/70">No messages yet.</p>
            )}

            {!historyLoading && messages.length > 0 && (
              <ul className="space-y-2">
                {messages.map((item, index) => {
                  const key =
                    item?.id || item?.messageId || `${historyPage}-${index}`;
                  return (
                    <li
                      key={key}
                      className="rounded-xl border border-white/10 bg-ink/60 p-3"
                    >
                      <p className="text-xs text-saffron">
                        {extractMessageSender(item)}
                      </p>
                      <p className="mt-1 text-sm text-white/90">
                        {extractMessageBody(item)}
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        {formatMessageTime(
                          item?.createdAt || item?.timestamp || item?.sentAt,
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                disabled={!hasPrevPage || historyLoading}
                onClick={() => setHistoryPage((prev) => Math.max(0, prev - 1))}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!hasNextPage || historyLoading}
                onClick={() => setHistoryPage((prev) => prev + 1)}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
