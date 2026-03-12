"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import galleryItems from "@/data/gallery-media.json";

const INITIAL_VISIBLE_ITEMS = 6;
const LOAD_MORE_STEP = 4;

function useIntersectionFlag(ref, { rootMargin = "300px", threshold = 0.15 } = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, ref, rootMargin, threshold]);

  return isVisible;
}

function MediaCard({ item }) {
  const cardRef = useRef(null);
  const mediaInView = useIntersectionFlag(cardRef);

  return (
    <article
      ref={cardRef}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-ink/45"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-white/0">
        {item.type === "video" ? (
          <video
            className="h-full w-full object-cover"
            controls
            preload="none"
            playsInline
            poster={item.poster || ""}
            aria-label={item.alt}
          >
            {mediaInView && <source src={item.src} type="video/mp4" />}
          </video>
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron" aria-hidden="true" />
          {item.type}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-saffron/85">{item.category}</p>
        <h2 className="text-lg font-semibold text-white">{item.title}</h2>
        <p className="text-sm text-white/70">{item.description}</p>
      </div>
    </article>
  );
}

export default function GalleryExperience() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const sentinelRef = useRef(null);

  const categoryOptions = useMemo(() => {
    const categories = new Set(galleryItems.map((item) => item.category));
    return ["All", ...Array.from(categories)];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );

  const hasMore = visibleCount < filteredItems.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredItems.length));
      },
      { root: null, rootMargin: "500px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [filteredItems.length, hasMore]);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Gallery</h1>
        <p className="max-w-2xl text-white/75">
          Browse curated photos and short venue reels sourced from our phase-1 static media feed.
        </p>
      </section>

      <section className="space-y-4" aria-label="Gallery filters">
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(INITIAL_VISIBLE_ITEMS);
                }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "border-saffron bg-saffron text-ink"
                    : "border-white/20 bg-white/5 text-white/75 hover:border-saffron/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-white/60">
          Showing {visibleItems.length} of {filteredItems.length} items
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {visibleItems.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </section>

      {hasMore && (
        <div className="space-y-4 text-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredItems.length))
            }
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/85 transition hover:border-saffron/60 hover:text-white"
          >
            Load More
          </button>
          <div ref={sentinelRef} className="mx-auto h-1 w-full max-w-md" aria-hidden="true" />
        </div>
      )}

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
