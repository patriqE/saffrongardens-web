"use client";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Nav from "@/components/Nav";

export default function AppRoot({ children }) {
  const pathname = usePathname();
  const hideNavRoutes = [
    "/login",
    "/",
    "/request-access",
    "/forgot-password",
    "/verify-otp",
    "/change-password",
    "/password-reset-success",
    "/profile",
    "/vendor-dashboard",
    "/planner-dashboard",
    "/admin",
    "/complete-profile",
    "/profile-setup",
    "/profile-submitted",
  ];
  const showNav = !hideNavRoutes.includes(pathname);
  return (
    <AuthProvider>
      {showNav && <Nav />}
      {children}
    </AuthProvider>
  );
}
