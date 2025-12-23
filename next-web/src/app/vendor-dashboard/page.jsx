"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useState, useMemo } from "react";

export default function VendorDashboardPage() {
  const { user, loading } = useRequireAuth({ allowedRoles: ["VENDOR"] });
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(true);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Mock bookings data - dates with bookings
  const bookingDates = useMemo(
    () => [
      new Date(2025, 11, 24), // Dec 24
      new Date(2025, 11, 25), // Dec 25
      new Date(2025, 11, 28), // Dec 28
      new Date(2026, 0, 2), // Jan 2
      new Date(2026, 0, 5), // Jan 5
    ],
    []
  );

  // Generate week days based on current offset
  const weekDays = useMemo(() => {
    const today = new Date(); // Real-time current date
    // Get to Sunday of current week and apply offset
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + currentWeekOffset * 7
    );

    const days = [];
    // Generate all 7 days (Sunday through Saturday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + i
      );
      days.push(date);
    }
    return days;
  }, [currentWeekOffset]);

  // Get month and year for display
  const displayMonthYear = useMemo(() => {
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    const firstMonth = firstDay.toLocaleDateString("en-US", { month: "long" });
    const lastMonth = lastDay.toLocaleDateString("en-US", { month: "long" });
    const firstYear = firstDay.getFullYear();
    const lastYear = lastDay.getFullYear();

    if (firstMonth === lastMonth && firstYear === lastYear) {
      return `${firstMonth} ${firstYear}`;
    } else if (firstYear === lastYear) {
      return `${firstMonth} - ${lastMonth} ${firstYear}`;
    } else {
      return `${firstMonth} ${firstYear} - ${lastMonth} ${lastYear}`;
    }
  }, [weekDays]);

  // Check if a date has bookings
  const hasBooking = (date) => {
    return bookingDates.some(
      (bookingDate) =>
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date(); // Real-time current date
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is in the past
  const isPast = (date) => {
    const today = new Date(); // Real-time current date
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const goToPreviousWeek = () => {
    setCurrentWeekOffset((prev) => prev - 1);
  };

  const goToNextWeek = () => {
    setCurrentWeekOffset((prev) => prev + 1);
  };

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
    <div className="bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-[#f2f2e8] font-display transition-colors duration-300 antialiased overflow-x-hidden">
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden pb-24 bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pt-8 bg-background-light dark:bg-background-dark sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="bg-primary/20 rounded-full size-12 ring-2 ring-primary/50 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {user.businessName?.[0] ||
                    user.name?.[0] ||
                    user.username?.[0] ||
                    "V"}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Welcome back,
              </p>
              <h2 className="text-xl font-bold leading-tight">
                {user.businessName || user.name || user.username}
              </h2>
            </div>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/10 text-gray-800 dark:text-white transition-transform hover:scale-105 active:scale-95 relative">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "24px" }}
            >
              notifications
            </span>
            <div className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-surface-light dark:border-surface-dark"></div>
          </button>
        </header>

        {/* Availability Toggle */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 size-10">
                <span className="material-symbols-outlined">
                  event_available
                </span>
              </div>
              <div>
                <p className="font-bold text-sm">Accepting New Bookings</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Turn off to hide from planners
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAcceptingBookings}
                onChange={(e) => setIsAcceptingBookings(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-6 mb-8">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <div className="flex min-w-[100px] flex-1 flex-col items-center gap-1 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
              <span className="text-2xl font-bold text-primary">3</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Pending
              </span>
            </div>
            <div className="flex min-w-[100px] flex-1 flex-col items-center gap-1 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
              <span className="text-2xl font-bold text-white dark:text-white">
                12
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Confirmed
              </span>
            </div>
            <div className="flex min-w-[100px] flex-1 flex-col items-center gap-1 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm">
              <span className="text-2xl font-bold text-white dark:text-white">
                84
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Done
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="text-lg font-bold">{displayMonthYear}</h3>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousWeek}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button
                onClick={goToNextWeek}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
          <div className="flex gap-2.5 px-6 overflow-x-auto no-scrollbar pb-2 snap-x">
            {weekDays.map((date, index) => {
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dayNumber = date.getDate();
              const isTodayDate = isToday(date);
              const isPastDate = isPast(date);
              const hasBookingDate = hasBooking(date);

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center min-w-[52px] flex-shrink-0 h-[84px] rounded-2xl snap-center transition-all ${
                    isTodayDate
                      ? "bg-primary text-black shadow-lg shadow-primary/20 transform scale-105"
                      : isPastDate
                      ? "border border-transparent bg-transparent text-gray-400 dark:text-gray-600"
                      : "border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-surface-dark"
                  }`}
                >
                  <span
                    className={`text-xs font-medium mb-1 ${
                      isTodayDate
                        ? "font-bold opacity-80"
                        : isPastDate
                        ? ""
                        : "text-gray-500"
                    }`}
                  >
                    {dayName}
                  </span>
                  <span
                    className={`${
                      isTodayDate
                        ? "text-2xl font-extrabold"
                        : "text-lg font-bold"
                    }`}
                  >
                    {dayNumber}
                  </span>
                  {hasBookingDate && (
                    <div
                      className={`w-1 h-1 rounded-full mt-1 ${
                        isTodayDate ? "bg-black" : "bg-primary"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Bookings List */}
        <div className="flex-1 px-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Upcoming Jobs</h3>
            <button className="text-primary text-sm font-semibold hover:text-primary/80">
              See All
            </button>
          </div>

          {/* Card 1: Action Required */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20">
                Action Needed
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  celebration
                </span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="font-bold text-base truncate pr-16">
                  Gatsby Gala Reception
                </h4>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    location_on
                  </span>
                  <span>Grand Ballroom A</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  <span>19:00 - 23:00 • Today</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 rounded-full bg-primary py-2.5 text-sm font-bold text-black transition hover:bg-primary/90">
                Accept Job
              </button>
              <button className="rounded-full border border-gray-200 dark:border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5">
                Decline
              </button>
            </div>
          </div>

          {/* Card 2: Confirmed */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 transition-all">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  restaurant
                </span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-base">Corporate Luncheon</h4>
                  <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/20 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    location_on
                  </span>
                  <span>The Garden Terrace</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  <span>12:00 - 14:00 • Tomorrow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Confirmed */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark p-5 shadow-sm border border-gray-100 dark:border-white/5 transition-all">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  local_florist
                </span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-base">Miller Wedding</h4>
                  <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/20 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
                    Confirmed
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    location_on
                  </span>
                  <span>Main Hall</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  <span>16:00 - 22:00 • Oct 14</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bottom Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
          <div className="flex items-center justify-between px-6 py-4 bg-[#1c1c0d]/90 dark:bg-[#e9e8ce]/90 backdrop-blur-md rounded-full shadow-2xl border border-white/10">
            <button className="flex flex-col items-center gap-1 group">
              <span className="material-symbols-outlined text-primary dark:text-background-dark font-bold">
                home
              </span>
              <span className="w-1 h-1 rounded-full bg-primary dark:bg-background-dark"></span>
            </button>
            <button className="flex flex-col items-center gap-1 group text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary transition-colors"></span>
            </button>
            <button className="flex flex-col items-center gap-1 group text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary transition-colors"></span>
            </button>
            <button className="flex flex-col items-center gap-1 group text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-background-dark transition-colors">
              <span className="material-symbols-outlined">person</span>
              <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-primary transition-colors"></span>
            </button>
          </div>
        </div>

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
    </div>
  );
}
