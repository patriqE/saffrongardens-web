"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook to protect routes that require authentication
 * Redirects to login if user is not authenticated
 * Optionally checks for specific roles
 *
 * @param {Object} options - Configuration options
 * @param {string[]} options.allowedRoles - Array of allowed roles (e.g., ['ADMIN', 'EVENT_PLANNER'])
 * @param {string} options.redirectTo - Path to redirect if unauthorized (default: '/login')
 * @returns {Object} - { user, loading, isAuthorized }
 */
export function useRequireAuth(options = {}) {
  const { allowedRoles = null, redirectTo = "/login" } = options;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Not authenticated
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Check role authorization if specified
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      const roleDashboard = {
        ADMIN: "/admin",
        EVENT_PLANNER: "/planner-dashboard",
        VENDOR: "/vendor-dashboard",
      };
      router.push(roleDashboard[user.role] || "/");
    }
  }, [user, loading, router, allowedRoles, redirectTo]);

  const isAuthorized =
    !loading && user && (!allowedRoles || allowedRoles.includes(user.role));

  return { user, loading, isAuthorized };
}
