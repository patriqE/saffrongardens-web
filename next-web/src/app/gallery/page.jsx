import Link from "next/link";

export const metadata = {
  title: "Gallery | Saffron Gardens",
};

const galleryItems = [
  "Sunset lawn ceremony",
  "Grand reception hall",
  "Floral stage styling",
  "Courtyard cocktail setup",
  "Signature table scapes",
  "Evening ambient lighting",
];

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Gallery</h1>
        <p className="max-w-2xl text-white/75">
          A preview of layout possibilities and design styles we have delivered.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <article
            key={item}
            className="group min-h-48 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-saffron/80">
              Story {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">{item}</h2>
            <p className="mt-2 text-sm text-white/70">
              Visual placeholder card for media. Replace with real photos or
              videos when content is ready.
            </p>
          </article>
        ))}
      </section>

      <div>
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-ink transition hover:bg-amber-300"
        >
          Book A Venue Tour
        </Link>
      </div>
    </div>
  );
}
