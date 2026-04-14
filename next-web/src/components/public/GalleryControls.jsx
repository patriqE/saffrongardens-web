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
    <section className="mx-auto mb-12 flex w-full max-w-[1400px] flex-col justify-between gap-6 border-b border-slate-200 pb-8 dark:border-primary/10 md:flex-row md:items-center">
      <div className="flex w-fit flex-wrap gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50">
        {filterOptions.map((option) => {
          const isActive = option === currentCategory;

          return (
            <button
              key={option}
              type="button"
              onClick={() => navigateWithParams({ category: option })}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
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

      <div className="flex items-center gap-4 text-slate-500 dark:text-primary/60">
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
          className="cursor-pointer border-none bg-transparent text-sm font-bold text-slate-900 focus:ring-0 dark:text-slate-100"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">By Popularity</option>
        </select>
      </div>
    </section>
  );
}
