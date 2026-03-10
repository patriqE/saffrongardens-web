import { ContactBlock } from "@/components/public/sections";

export const metadata = {
  title: "Contact | Saffron Gardens",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Contact Us</h1>
        <p className="max-w-2xl text-white/75">
          Share your event plans and we will respond with availability and a
          guided next step.
        </p>
      </section>

      <ContactBlock />

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-heading text-2xl text-white">Quick Inquiry</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          aria-label="Contact inquiry form"
        >
          <label className="space-y-1 sm:col-span-1">
            <span className="text-sm text-white/80">Name</span>
            <input
              type="text"
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-1 sm:col-span-1">
            <span className="text-sm text-white/80">Email</span>
            <input
              type="email"
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="you@example.com"
            />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span className="text-sm text-white/80">Message</span>
            <textarea
              rows={4}
              className="focus-ring w-full rounded-xl border border-white/15 bg-ink/70 px-3 py-2 text-sm text-white"
              placeholder="Tell us about your event plans"
            />
          </label>
          <button
            type="button"
            className="w-fit rounded-full bg-saffron px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-300"
          >
            Send Inquiry
          </button>
        </form>
      </section>
    </div>
  );
}
