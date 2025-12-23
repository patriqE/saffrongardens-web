"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Image from "next/image";

export default function AdminPage() {
  const { user, loading } = useRequireAuth({ allowedRoles: ["ADMIN"] });

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-[#f2f2e6] font-display antialiased overflow-x-hidden selection:bg-primary selection:text-black pb-28 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-6 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-transparent group-hover:border-primary transition-all duration-300 bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {user.name?.[0] || user.username?.[0] || "A"}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Welcome back
            </span>
            <h2 className="text-lg font-bold leading-tight">
              {user.name || user.username || "Admin"}
            </h2>
          </div>
        </div>
        <button className="relative flex items-center justify-center size-10 rounded-full bg-surface-light dark:bg-surface-dark shadow-sm active:scale-95 transition-transform">
          <span
            className="material-symbols-outlined text-gray-800 dark:text-white"
            style={{ fontSize: "24px" }}
          >
            notifications
          </span>
          <span className="absolute top-2 right-2.5 size-2 bg-primary rounded-full animate-pulse"></span>
        </button>
      </header>

      {/* Stats Section (Horizontal Scroll) */}
      <section className="mt-2 pl-6 overflow-hidden">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pr-6 pb-4">
          {/* Card 1 */}
          <div className="flex min-w-[160px] flex-col justify-between gap-1 rounded-2xl p-5 bg-surface-light dark:bg-surface-dark shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 h-36">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-black dark:text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                pending_actions
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">12</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pending Requests
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex min-w-[160px] flex-col justify-between gap-1 rounded-2xl p-5 bg-[#1c1c0d] dark:bg-[#f9f506] shadow-sm h-36 group">
            <div className="size-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center text-white dark:text-black">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                attach_money
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-white dark:text-black">
                $145k
              </p>
              <p className="text-sm font-medium text-white/60 dark:text-black/60">
                Monthly Revenue
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex min-w-[160px] flex-col justify-between gap-1 rounded-2xl p-5 bg-surface-light dark:bg-surface-dark shadow-sm dark:shadow-none border border-gray-100 dark:border-white/5 h-36">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-black dark:text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                event_available
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">48</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Bookings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pending Approvals */}
      <section className="px-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight">
            Pending Approvals
          </h3>
          <button className="text-xs font-bold text-gray-500 dark:text-primary uppercase tracking-wider">
            See All
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {/* List Item 1 */}
          <div className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 rounded-full size-12 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  restaurant
                </span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm line-clamp-1">
                  Elite Catering Co.
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[10px] font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                    Vendor
                  </span>
                  <span className="text-xs text-gray-400">• 2h ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center size-9 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 transition hover:bg-red-200">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  close
                </span>
              </button>
              <button className="flex items-center justify-center size-9 rounded-full bg-primary text-black shadow-lg shadow-primary/20 transition hover:brightness-110">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  check
                </span>
              </button>
            </div>
          </div>

          {/* List Item 2 */}
          <div className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 rounded-full size-12 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm line-clamp-1">Sarah Jenkins</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[10px] font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                    Planner
                  </span>
                  <span className="text-xs text-gray-400">• 5h ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center size-9 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 transition hover:bg-red-200">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  close
                </span>
              </button>
              <button className="flex items-center justify-center size-9 rounded-full bg-primary text-black shadow-lg shadow-primary/20 transition hover:brightness-110">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  check
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Schedule */}
      <section className="px-6 mt-8">
        <h3 className="text-lg font-bold tracking-tight mb-4">Next 24 Hours</h3>
        <div className="relative pl-4 border-l-2 border-gray-200 dark:border-white/10 space-y-6">
          {/* Timeline Item 1 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
            <div className="flex flex-col gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                    Today, 18:00
                  </p>
                  <h4 className="font-bold text-base">The Henderson Wedding</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Grand Ballroom • 250 Guests
                  </p>
                </div>
                <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-gray-600 dark:text-gray-300"
                    style={{ fontSize: "20px" }}
                  >
                    celebration
                  </span>
                </div>
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#2d2d1d] bg-primary/30 flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div className="inline-block size-6 rounded-full ring-2 ring-white dark:ring-[#2d2d1d] bg-primary/30 flex items-center justify-center text-xs font-bold">
                  B
                </div>
                <div className="flex items-center justify-center size-6 rounded-full ring-2 ring-white dark:ring-[#2d2d1d] bg-gray-100 dark:bg-white/20 text-[10px] font-medium">
                  +4
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative">
            <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-background-light dark:ring-background-dark"></div>
            <div className="flex flex-col gap-2 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 opacity-80">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                    Tomorrow, 09:00
                  </p>
                  <h4 className="font-bold text-base">
                    Tech Corp Annual Summit
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Conference Hall A • 120 Guests
                  </p>
                </div>
                <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-gray-600 dark:text-gray-300"
                    style={{ fontSize: "20px" }}
                  >
                    business_center
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 z-30 flex items-center justify-center size-14 rounded-full bg-primary text-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "28px" }}
        >
          add
        </span>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 inset-x-4 z-40 bg-surface-light/80 dark:bg-[#1a1a12]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-full shadow-2xl h-16 flex items-center justify-around px-2">
        <button className="flex flex-col items-center justify-center gap-1 w-14 h-full group">
          <span
            className="material-symbols-outlined text-black dark:text-primary transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            dashboard
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-100 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 w-14 h-full group">
          <span
            className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            calendar_today
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 w-14 h-full group">
          <span
            className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            group
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 w-14 h-full group">
          <div className="relative">
            <span
              className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              style={{ fontSize: "24px" }}
            >
              settings
            </span>
          </div>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
      </nav>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
