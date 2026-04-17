"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function buildNextUrl(pathname, searchParams, updates) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export default function GalleryControls({
  currentCategory,
  currentSort,
  filterOptions,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateWithParams = (updates) => {
    router.push(buildNextUrl(pathname, searchParams, updates));
  };

  return (
    <section className="sticky top-[4.75rem] z-40 mx-auto mb-12 flex w-full max-w-[1400px] flex-col justify-between gap-4 rounded-2xl border border-slate-200/70 bg-background-light/90 p-3 backdrop-blur-sm dark:border-primary/10 dark:bg-background-dark/90 md:top-4 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0">
      <div className="mobile-nav-scrollbar flex w-full gap-2 overflow-x-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50 md:w-fit md:flex-wrap md:overflow-visible">
        {filterOptions.map((option) => {
          const isActive = option === currentCategory;

          return (
            <button
              key={option}
              type="button"
              onClick={() => navigateWithParams({ category: option })}
              className={`flex-none rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors md:flex-auto ${
                isActive
                  ? "bg-primary font-bold text-background-dark shadow-lg shadow-primary/10"
                  : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 self-end rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-primary/60 md:self-auto">
        <label
          className="text-xs font-bold uppercase tracking-wider"
          htmlFor="gallery-sort"
        >
          Sort by:
        </label>
        <select
          id="gallery-sort"
          value={currentSort}
          onChange={(event) => navigateWithParams({ sort: event.target.value })}
          className="cursor-pointer rounded-md border-none bg-transparent px-1 text-sm font-bold text-slate-900 focus:ring-0 dark:text-slate-100"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">By Popularity</option>
        </select>
      </div>
    </section>
  );
}
