"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useRequireAuth();
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
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      <main className="px-6 space-y-6">
        {loadingUser ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-600 rounded-xl">
            Error loading profile: {error}
          </div>
        ) : userData ? (
          <>
            {/* Profile Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData.name || userData.username || "User"}
                  </h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                  {userData.role}
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-lg font-bold mb-2">Details</h3>
              <div className="rounded-2xl border divide-y">
                {userData.username && (
                  <DetailRow label="Username" value={userData.username} />
                )}
                {userData.email && (
                  <DetailRow label="Email" value={userData.email} />
                )}
                {userData.role && (
                  <DetailRow label="Role" value={userData.role} />
                )}
                {userData.id && (
                  <DetailRow label="User ID" value={userData.id} />
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No user data available</p>
        )}
      </main>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
