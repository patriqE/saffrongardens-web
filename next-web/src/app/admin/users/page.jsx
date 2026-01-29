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
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdminUsers() {
      if (!token || !user) return;

      try {
        setLoadingUsers(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

        // SUPER_ADMIN can view superadmin, admin, planners, vendors
        // ADMIN can only see admins, planners, and vendors
        const endpoint =
          user.role === "SUPER_ADMIN"
            ? `${baseUrl}/api/admins/users`
            : `${baseUrl}/api/admins/users`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log("Admin users response:", data);
        console.log("Current user role:", user.role);
        // Extract content array from paginated response
        setAdminUsers(data.content || data || []);
      } catch (err) {
        console.error("Error fetching admin users:", err);
        setError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchAdminUsers();
  }, [token, user]);

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
        <h1 className="text-2xl font-bold">
          {user.role === "SUPER_ADMIN" ? "All Users" : "Users"}
        </h1>
      </div>

      <main className="px-6 space-y-6">
        {loadingUsers ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl text-sm">
            Error loading users: {error}
          </div>
        ) : adminUsers.length > 0 ? (
          <div className="space-y-3">
            {adminUsers.map((admin) => (
              <div
                key={admin.id}
                className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 border border-gray-100 dark:border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 rounded-full size-14 shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      admin_panel_settings
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">
                        {admin.name || admin.username || "Admin"}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wide">
                        {admin.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {admin.email}
                    </p>
                    {admin.username && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        @{admin.username}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
              group_off
            </span>
            <p className="text-sm">No users found</p>
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
