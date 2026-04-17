"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublicGalleryCollection } from "@/lib/publicGalleryAdapter";

const INITIAL_VISIBLE_ITEMS = 6;
const LOAD_MORE_STEP = 4;
const CARD_ASPECT = "aspect-[4/3]";

function MediaSkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink/45">
      <div
        className={`animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/0 ${CARD_ASPECT}`}
      />
      <div className="space-y-2 p-4">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-5 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
      </div>
    </div>
  );
}

function MediaCard({ item, index, onOpen }) {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-ink/45">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${item.title} in gallery lightbox`}
      >
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 ${CARD_ASPECT}`}
        >
          <div
            className={`absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/0 transition-opacity duration-300 ${mediaLoaded ? "opacity-0" : "opacity-100"}`}
            aria-hidden="true"
          />

          {item.type === "video" ? (
            <video
              className={`h-full w-full object-cover transition-all duration-500 ${mediaLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"}`}
              preload="metadata"
              playsInline
              controls={false}
              muted
              poster={item.poster || ""}
              aria-label={item.alt}
              onLoadedData={() => setMediaLoaded(true)}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className={`h-full w-full object-cover transition-all duration-500 ${mediaLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"}`}
              onLoad={() => setMediaLoaded(true)}
            />
          )}

          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
            <span
              className="h-1.5 w-1.5 rounded-full bg-saffron"
              aria-hidden="true"
            />
            {item.type}
          </div>

          {item.type === "video" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-xs font-bold tracking-wide text-background-dark shadow-2xl transition-transform group-hover:scale-105">
                PLAY
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-dark to-transparent p-4 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs uppercase tracking-[0.14em] text-saffron/85">
              {item.category}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {item.title}
            </h2>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <p className="text-sm text-white/70">{item.description}</p>
        </div>
      </button>
    </article>
  );
}

export default function GalleryExperience() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryItems, setGalleryItems] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const [activeIndex, setActiveIndex] = useState(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGallery = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPublicGalleryCollection(
          {},
          { signal: controller.signal },
        );
        const categories = Array.isArray(data.categories)
          ? data.categories
          : [];

        setGalleryItems(Array.isArray(data.items) ? data.items : []);
        setCategoryOptions(["All", ...categories]);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Unable to load gallery");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadGallery();

    return () => controller.abort();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  );

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return filteredItems[activeIndex] || null;
  }, [activeIndex, filteredItems]);

  const hasMore = visibleCount < filteredItems.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_STEP, filteredItems.length),
        );
      },
      { root: null, rootMargin: "500px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [filteredItems.length, hasMore]);

  useEffect(() => {
    setActiveIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % Math.max(filteredItems.length, 1);
        });
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null || prev === 0) {
            return Math.max(filteredItems.length - 1, 0);
          }
          return prev - 1;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeItem, filteredItems.length]);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-heading text-4xl text-white">Gallery</h1>
        <p className="max-w-2xl text-white/75">
          Browse curated photos and short venue reels sourced from our phase-1
          static media feed.
        </p>
      </section>

      <section
        className="sticky top-[4.75rem] z-30 space-y-3 rounded-2xl border border-white/10 bg-background/90 p-3 backdrop-blur-sm"
        aria-label="Gallery filters"
      >
        <div className="mobile-nav-scrollbar flex gap-2 overflow-x-auto">
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
                className={`flex-none rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
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

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        aria-live="polite"
      >
        {loading &&
          Array.from({ length: INITIAL_VISIBLE_ITEMS }).map((_, index) => (
            <MediaSkeletonCard key={`skeleton-${index}`} />
          ))}

        {!loading && error && <p className="text-sm text-red-400">{error}</p>}

        {!loading && !error && visibleItems.length === 0 && (
          <p className="text-sm text-white/70">No gallery items found.</p>
        )}

        {visibleItems.map((item, index) => (
          <MediaCard
            key={item.id || `${item.title}-${index}`}
            item={item}
            index={index}
            onOpen={setActiveIndex}
          />
        ))}
      </section>

      {hasMore && (
        <div className="space-y-4 text-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + LOAD_MORE_STEP, filteredItems.length),
              )
            }
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/85 transition hover:border-saffron/60 hover:text-white"
          >
            Load More
          </button>
          <div
            ref={sentinelRef}
            className="mx-auto h-1 w-full max-w-md"
            aria-hidden="true"
          />
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

      {activeItem && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery item ${activeItem.title}`}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-ink/95">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                  {activeItem.category}
                </p>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {activeItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="relative bg-black">
              {activeItem.type === "video" ? (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="h-[65vh] w-full object-contain"
                />
              ) : (
                <div className="relative h-[65vh] w-full">
                  <Image
                    src={activeItem.src}
                    alt={activeItem.alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => {
                        if (prev === null || prev === 0) {
                          return filteredItems.length - 1;
                        }
                        return prev - 1;
                      })
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/70"
                    aria-label="Previous gallery item"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => {
                        if (prev === null) return 0;
                        return (prev + 1) % filteredItems.length;
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black/70"
                    aria-label="Next gallery item"
                  >
                    Next
                  </button>
                </>
              )}
            </div>

            <p className="border-t border-white/10 px-4 py-3 text-sm text-white/75 sm:px-6">
              Use Left/Right arrows to browse and Esc to close.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
