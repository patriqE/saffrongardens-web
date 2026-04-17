"use client";

import { useEffect, useMemo, useState } from "react";

function getItemKey(item, index) {
  return `${item.title}-${item.category}-${index}`;
}

export default function GalleryGridClient({ items = [] }) {
  const [loadedMap, setLoadedMap] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);

  const activeItem = useMemo(() => {
    if (activeIndex === null) return null;
    return items[activeIndex] || null;
  }, [activeIndex, items]);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % Math.max(items.length, 1),
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          if (prev === null) return 0;
          if (prev === 0) return Math.max(items.length - 1, 0);
          return prev - 1;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeItem, items.length]);

  return (
    <>
      <div
        className="columns-1 gap-6 md:columns-2 lg:columns-3"
        style={{ columnGap: "1.5rem" }}
      >
        {items.map((item, index) => {
          const key = getItemKey(item, index);
          const isLoaded = Boolean(loadedMap[key]);

          return (
            <article
              key={key}
              className="group relative mb-6 overflow-hidden rounded-xl bg-slate-200 break-inside-avoid dark:bg-slate-800"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
                aria-label={`Open ${item.title} in gallery lightbox`}
              >
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <div
                    className={`absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/0 transition-opacity duration-500 ${
                      isLoaded ? "opacity-0" : "opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() =>
                      setLoadedMap((prev) => ({
                        ...prev,
                        [key]: true,
                      }))
                    }
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      isLoaded
                        ? "opacity-100 group-hover:scale-105"
                        : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${
                      item.isVideo
                        ? "bg-black/30 group-hover:bg-black/10"
                        : "bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-40 group-hover:opacity-100"
                    }`}
                  />
                  {item.isVideo && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-xs font-bold tracking-wide text-background-dark shadow-2xl transition-transform group-hover:scale-105">
                        PLAY
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-dark to-transparent p-6 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-1 text-xs font-bold uppercase text-primary">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
              </button>
            </article>
          );
        })}
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
              {activeItem.isVideo ? (
                <video
                  src={activeItem.image}
                  controls
                  autoPlay
                  className="h-[65vh] w-full object-contain"
                />
              ) : (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-[65vh] w-full object-contain"
                />
              )}

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => {
                        if (prev === null || prev === 0) {
                          return items.length - 1;
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
                        return (prev + 1) % items.length;
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
    </>
  );
}
