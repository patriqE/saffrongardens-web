"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function BookingPage() {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="page-shell bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="page-shell bg-background-light dark:bg-background-dark">
      <main className="page-padding py-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Booking
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300">
            Create and manage your hall bookings.
          </p>
        </div>
      </main>
    </div>
  );
}
