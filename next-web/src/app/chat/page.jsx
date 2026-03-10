"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "publicChatSession";

export default function ChatPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preferredPlannerUsername, setPreferredPlannerUsername] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(email.trim() && name.trim()) && !submitting,
    [email, name, submitting],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setConversationId(parsed?.conversationId || "");
      setAssignmentStatus(parsed?.assignmentStatus || "");
      setResponseMessage(parsed?.responseMessage || "");
      setEmail(parsed?.email || "");
      setName(parsed?.name || "");
      setPreferredPlannerUsername(parsed?.preferredPlannerUsername || "");
    } catch {
      // Ignore malformed local storage payload.
    }
  }, []);

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
          preferredPlannerUsername: preferredPlannerUsername.trim() || undefined,
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
      setAssignmentStatus(nextAssignmentStatus);
      setResponseMessage(nextResponseMessage);

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          conversationId: nextConversationId,
          assignmentStatus: nextAssignmentStatus,
          responseMessage: nextResponseMessage,
          email: email.trim(),
          name: name.trim(),
          preferredPlannerUsername: preferredPlannerUsername.trim(),
        }),
      );
    } catch (err) {
      setError(err?.message || "Unable to start public chat");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Chat</h1>
        <p className="max-w-2xl text-white/75">
          Start a public chat as a guest. No login is required.
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <form className="space-y-4" onSubmit={onStartChat}>
          <div className="rounded-2xl bg-ink/70 p-4 text-sm text-white/80">
            Provide your contact details to begin a conversation and get assigned
            to a planner.
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
            <span className="text-sm text-white/80">Preferred Planner Username (Optional)</span>
            <input
              type="text"
              value={preferredPlannerUsername}
              onChange={(e) => setPreferredPlannerUsername(e.target.value)}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="e.g. planner.jane"
            />
          </label>

          {conversationId && (
            <div className="rounded-xl border border-saffron/40 bg-saffron/10 p-4 text-sm text-white/90">
              <p>
                <span className="font-semibold text-saffron">Conversation ID:</span>{" "}
                <span className="break-all">{conversationId}</span>
              </p>
              {assignmentStatus && (
                <p className="mt-2">
                  <span className="font-semibold text-saffron">Assignment Status:</span>{" "}
                  {assignmentStatus}
                </p>
              )}
              {responseMessage && (
                <p className="mt-2 text-white/80">{responseMessage}</p>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-300"
          >
            {submitting ? "Starting..." : "Start Chat"}
          </button>
        </form>
      </section>
    </div>
  );
}
