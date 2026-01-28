"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const { user, loading } = useRequireAuth({
    allowedRoles: ["ADMIN", "SUPER_ADMIN"],
  });
  const { token } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!token) return;

      try {
        setLoadingUser(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        const response = await fetch(`${baseUrl}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserData();
  }, [token]);

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
      <div className="flex items-center gap-4 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>

      <main className="px-6 space-y-6">
        {loadingUser ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-sm">
            Error loading user data: {error}
          </div>
        ) : userData ? (
          <>
            {/* Profile Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-white/5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {userData.name || userData.username || "User"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userData.email}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">
                  {userData.role}
                </span>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Details</h3>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl divide-y divide-gray-100 dark:divide-white/5 border border-gray-100 dark:border-white/5">
                {userData.username && (
                  <div className="flex justify-between items-center p-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      Username
                    </span>
                    <span className="font-medium">{userData.username}</span>
                  </div>
                )}
                {userData.email && (
                  <div className="flex justify-between items-center p-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      Email
                    </span>
                    <span className="font-medium">{userData.email}</span>
                  </div>
                )}
                {userData.role && (
                  <div className="flex justify-between items-center p-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      Role
                    </span>
                    <span className="font-medium">{userData.role}</span>
                  </div>
                )}
                {userData.id && (
                  <div className="flex justify-between items-center p-4">
                    <span className="text-gray-600 dark:text-gray-400">ID</span>
                    <span className="font-medium text-sm">{userData.id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Raw Data */}
            {Object.keys(userData).length > 0 && (
              <details className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                <summary className="font-bold cursor-pointer">All Data</summary>
                <pre className="mt-4 text-xs overflow-auto bg-black/5 dark:bg-white/5 p-3 rounded text-gray-600 dark:text-gray-400">
                  {JSON.stringify(userData, null, 2)}
                </pre>
              </details>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">No user data available</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 inset-x-4 z-40 bg-surface-light/80 dark:bg-[#1a1a12]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-full shadow-2xl h-16 flex items-center justify-around px-2">
        <button
          onClick={() => router.push("/admin")}
          className="flex flex-col items-center justify-center gap-1 w-14 h-full group"
        >
          <span
            className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            dashboard
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button
          onClick={() => router.push("/admin/calendar")}
          className="flex flex-col items-center justify-center gap-1 w-14 h-full group"
        >
          <span
            className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            calendar_today
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button
          onClick={() => router.push("/admin/users")}
          className="flex flex-col items-center justify-center gap-1 w-14 h-full group"
        >
          <span
            className="material-symbols-outlined text-black dark:text-primary transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            group
          </span>
          <span className="size-1 rounded-full bg-black dark:bg-primary opacity-100 group-hover:opacity-100 transition-opacity"></span>
        </button>
        <button
          onClick={() => router.push("/admin/settings")}
          className="flex flex-col items-center justify-center gap-1 w-14 h-full group"
        >
          <span
            className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
            style={{ fontSize: "24px" }}
          >
            settings
          </span>
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
