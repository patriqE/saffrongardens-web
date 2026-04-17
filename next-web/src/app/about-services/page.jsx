import { CtaSection, ServiceCardsSection } from "@/components/public/sections";
import Link from "next/link";

export const metadata = {
  title: "About & Services | Saffron Gardens",
};

export default function AboutServicesPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
        <div className="pointer-events-none absolute -right-20 top-0 size-60 rounded-full bg-saffron/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.22em] text-saffron/90">
            About Saffron Gardens
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-white md:text-5xl">
            Planning precision, venue elegance, and service built around your
            timeline.
          </h1>
          <p className="mt-4 max-w-3xl text-white/75">
            Saffron Gardens is an event destination for weddings, private
            galas, cultural ceremonies, and premium brand gatherings. We pair
            timeless architecture with modern production standards so every
            event feels effortless to guests and controlled behind the scenes.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-saffron/90">
                Years in Events
              </p>
              <p className="mt-1 text-2xl font-bold text-white">12+</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-saffron/90">
                Signature Venues
              </p>
              <p className="mt-1 text-2xl font-bold text-white">5</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-saffron/90">
                Dedicated Team
              </p>
              <p className="mt-1 text-2xl font-bold text-white">40+</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-300"
            >
              Request Proposal
            </Link>
            <Link
              href="/gallery"
              className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>

      <ServiceCardsSection />
      <CtaSection />
    </div>
  );
}
