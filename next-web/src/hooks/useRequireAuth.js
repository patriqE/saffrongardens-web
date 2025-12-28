"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const {
    allowedRoles = null,
    redirectTo = "/login",
    unauthorizedRedirectTo = null,
    allowPreview = false,
  } = options;
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = allowPreview && searchParams?.get("preview") === "1";

  useEffect(() => {
    if (loading) return;

    // In preview mode, skip all redirects so pages can be viewed.
    if (isPreview) return;

    // Not authenticated
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Check role authorization if specified
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // If explicit unauthorized redirect provided, use it.
      if (unauthorizedRedirectTo) {
        router.push(unauthorizedRedirectTo);
        return;
      }
      // Else redirect to appropriate dashboard based on user's actual role
      const roleDashboard = {
        ADMIN: "/admin",
        EVENT_PLANNER: "/planner-dashboard",
        VENDOR: "/vendor-dashboard",
      };
      router.push(roleDashboard[user.role] || "/");
    }
  }, [user, loading, router, allowedRoles, redirectTo]);

  const isAuthorized =
    isPreview || (!loading && user && (!allowedRoles || allowedRoles.includes(user.role)));

  return { user, loading, isAuthorized };
}
