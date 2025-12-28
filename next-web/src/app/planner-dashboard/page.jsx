"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function PlannerDashboardPage() {
  const { user, loading } = useRequireAuth({ allowedRoles: ["EVENT_PLANNER"] });

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
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-[#f8f8f5] font-display min-h-screen flex flex-col antialiased selection:bg-primary selection:text-black pb-24">
      {/* Top AppBar removed for cleaner UI */}

      <main className="flex-1 w-full max-w-md mx-auto flex flex-col gap-6 px-4 pt-6">
        {/* Greeting & Overview */}
        <section>
          <h2 className="text-3xl font-bold leading-tight tracking-tight mb-1">
            Good Evening,
            <br />
            {user.name || user.username || "Planner"}
          </h2>
          <p className="text-black/60 dark:text-white/60 text-sm font-medium">
            You have 3 events coming up this month.
          </p>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary">
                event_available
              </span>
              <span className="text-xs font-bold text-black/40 dark:text-white/40">
                THIS MONTH
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">3</p>
              <p className="text-xs text-black/60 dark:text-white/60 font-medium">
                Confirmed Events
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="material-symbols-outlined text-primary">
                pending_actions
              </span>
              <span className="text-xs font-bold text-black/40 dark:text-white/40">
                PENDING
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">1</p>
              <p className="text-xs text-black/60 dark:text-white/60 font-medium">
                Request Awaiting
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="flex flex-col gap-3">
          <button className="w-full flex items-center justify-between h-16 px-6 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all rounded-2xl text-[#1c1c0d] shadow-[0_0_20px_-5px_rgba(249,245,6,0.3)]">
            <div className="flex flex-col items-start">
              <span className="text-base font-bold">New Booking Request</span>
              <span className="text-xs font-medium opacity-70">
                Schedule a new event
              </span>
            </div>
            <div className="bg-black/10 rounded-full p-2">
              <span className="material-symbols-outlined">add</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-center h-12 px-6 bg-surface-light dark:bg-surface-dark border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-all rounded-xl text-current">
            <span
              className="material-symbols-outlined mr-2"
              style={{ fontSize: "20px" }}
            >
              calendar_month
            </span>
            <span className="text-sm font-bold">Check Hall Availability</span>
          </button>
        </section>

        {/* Upcoming Bookings Carousel */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Upcoming Events</h3>
            <button className="text-xs font-bold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="-mx-4 overflow-x-auto no-scrollbar pb-2 pl-4 flex gap-4 snap-x">
            {/* Card 1 */}
            <div className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 relative group">
              <div
                className="h-32 w-full bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjebeiR0urgV4d10JhnBSJbS8TVu1ggQaPxJwUiKnAn12qxFEOTVuYnfK58Kl7Biwc3kDm9mHadKmXiupB2mDyKlHG4evWiodknuUkuQx_weRzNRFIKUPqWvNbzUPjjOpdgGD0fxPs7Caql0_Gvtm6NRv-4kF02iyJ3MPFbAAaa0aEwT74T9KeTHicz9oWoAaZKzhSuAifElS-tpxaVi1xFadqqzuvwb9KVm9MqeTY-h-loYfMTzK3q8_XoXvmkHb25TNYMkrEIlw")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                    CONFIRMED
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base leading-tight">
                      The Grand Ballroom
                    </h4>
                    <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                      Johnson Wedding
                    </p>
                  </div>
                  <div className="text-center bg-black/5 dark:bg-white/10 rounded-lg p-2 min-w-[50px]">
                    <span className="block text-[10px] font-bold text-primary uppercase">
                      Jun
                    </span>
                    <span className="block text-lg font-bold leading-none">
                      12
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50 mt-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    schedule
                  </span>
                  <span>6:00 PM - 11:30 PM</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-start shrink-0 w-[280px] rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 relative group">
              <div
                className="h-32 w-full bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9dDgd_qtI90U6b9FFc5OALE1OZBj6Y3dWsPEfiL05qqGT-gYUKrE_WAsifs5BUERsnD6oTgfBFJTUlyqOYS5ayeBNflkdHK1u_c6XVGgqo_7t69PO10oDkGrO1LIgtP1qH0Zal4ZnzFRMvODqA63g22fTHjUbh-9jop3JCHJDkGdiGR_DwfK6GvV4gRRih2T2m7-jpJ5r__by0TNNF9XXH2gS4YncqI3sZvPL4b95Rpi_qV2t-ZskCdBK1uizK9R2KDnBEETgsho")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                    CONFIRMED
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-base leading-tight">
                      Garden Terrace
                    </h4>
                    <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                      Tech Corporate Gala
                    </p>
                  </div>
                  <div className="text-center bg-black/5 dark:bg-white/10 rounded-lg p-2 min-w-[50px]">
                    <span className="block text-[10px] font-bold text-primary uppercase">
                      Jul
                    </span>
                    <span className="block text-lg font-bold leading-none">
                      04
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50 mt-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    schedule
                  </span>
                  <span>7:00 PM - 12:00 AM</span>
                </div>
              </div>
            </div>

            {/* Spacer for scroll */}
            <div className="snap-start shrink-0 w-2"></div>
          </div>
        </section>

        {/* Recent Activity List */}
        <section className="space-y-4 pb-4">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {/* Item 1 */}
            <div className="flex gap-4 items-start">
              <div className="size-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex-1 border-b border-black/5 dark:border-white/5 pb-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold">Booking #4022 Confirmed</p>
                  <span className="text-[10px] text-black/40 dark:text-white/40 font-medium">
                    2h ago
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                  The contract for the Smith Wedding has been signed by all
                  parties.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 items-start">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  description
                </span>
              </div>
              <div className="flex-1 border-b border-black/5 dark:border-white/5 pb-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold">Contract Sent</p>
                  <span className="text-[10px] text-black/40 dark:text-white/40 font-medium">
                    5h ago
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                  Contract for Golden Jubilee sent to client for review.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4 items-start">
              <div className="size-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  mail
                </span>
              </div>
              <div className="flex-1 pb-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold">New Message</p>
                  <span className="text-[10px] text-black/40 dark:text-white/40 font-medium">
                    1d ago
                  </span>
                </div>
                <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                  Vendor "Floral Dreams" sent a query regarding setup times.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-[#1c1c0d]/90 dark:bg-[#2c2b18]/90 backdrop-blur-xl rounded-full p-2 shadow-2xl shadow-black/40 border border-white/5 flex justify-between items-center z-50">
        <button className="flex flex-col items-center justify-center size-12 rounded-full bg-primary text-[#1c1c0d]">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            home
          </span>
        </button>
        <button className="flex flex-col items-center justify-center size-12 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            calendar_month
          </span>
        </button>
        <button className="flex flex-col items-center justify-center size-12 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            chat_bubble
          </span>
        </button>
        <button className="flex flex-col items-center justify-center size-12 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            settings
          </span>
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
