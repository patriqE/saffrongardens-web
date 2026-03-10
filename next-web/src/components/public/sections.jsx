import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-saffron/20 via-ink/70 to-ink px-6 py-14 sm:px-10">
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative max-w-2xl space-y-5">
        <p className="text-xs uppercase tracking-[0.25em] text-saffron/90">
          Premium Event Destination
        </p>
        <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl">
          Signature venues and planning services for elevated celebrations.
        </h1>
        <p className="max-w-xl text-base text-white/75 sm:text-lg">
          From intimate ceremonies to grand receptions, we blend architecture,
          hospitality, and precision planning to create unforgettable
          experiences.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/contact"
            className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-300"
          >
            Plan Your Event
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServiceCardsSection() {
  const services = [
    {
      title: "Venue Curation",
      copy: "Choose from indoor halls, garden courts, and scenic twilight decks.",
    },
    {
      title: "Planning Concierge",
      copy: "Dedicated coordinators for timelines, vendors, and guest flow.",
    },
    {
      title: "Design & Styling",
      copy: "Bespoke floral, lighting, and table design tailored to your story.",
    },
  ];

  return (
    <section className="space-y-5" aria-labelledby="services-heading">
      <div>
        <h2 id="services-heading" className="font-heading text-3xl text-white">
          Services
        </h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Built as modular offerings, so you can engage us for full production
          or selected support.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="text-xl font-semibold text-saffron">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{service.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="rounded-3xl border border-saffron/30 bg-saffron/10 p-8 text-center">
      <h2 className="font-heading text-3xl text-white">Ready to host something remarkable?</h2>
      <p className="mx-auto mt-3 max-w-2xl text-white/75">
        Tell us your date, guest count, and vision. We will craft a custom
        proposal with venue and service recommendations.
      </p>
      <div className="mt-6">
        <Link
          href="/chat"
          className="inline-flex rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-300"
        >
          Start A Quick Chat
        </Link>
      </div>
    </section>
  );
}

export function ContactBlock() {
  return (
    <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
      <div className="space-y-2">
        <h2 className="font-heading text-3xl text-white">Contact</h2>
        <p className="text-white/75">hello@saffrongardens.example</p>
        <p className="text-white/75">+1 (555) 321-8800</p>
        <p className="text-white/75">28 Saffron Lane, Downtown Heights</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-saffron">Visiting Hours</h3>
        <p className="text-white/75">Mon - Fri: 9:00 AM - 7:00 PM</p>
        <p className="text-white/75">Sat: 10:00 AM - 6:00 PM</p>
        <p className="text-white/75">Sun: Appointment Only</p>
      </div>
    </section>
  );
}
