export const metadata = {
  title: "Chat | Saffron Gardens",
};

const quickPrompts = [
  "What dates are available for a 300-guest wedding?",
  "Do you provide in-house decor and lighting?",
  "Can we schedule a site visit this week?",
];

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Chat</h1>
        <p className="max-w-2xl text-white/75">
          Public pre-sales chat experience. This can later connect to live
          support or an AI concierge.
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-4">
          <div className="rounded-2xl bg-ink/70 p-4 text-sm text-white/80">
            Welcome to Saffron Gardens. Ask us about availability, pricing,
            services, or event planning packages.
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {quickPrompts.map((prompt) => (
              <li key={prompt}>
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/15 px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  {prompt}
                </button>
              </li>
            ))}
          </ul>
          <label className="block space-y-2">
            <span className="text-sm text-white/80">Your Message</span>
            <textarea
              rows={4}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="Type a message..."
            />
          </label>
          <button
            type="button"
            className="rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-300"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
}
