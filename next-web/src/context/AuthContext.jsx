"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Api, setAuthErrorHandler } from "@/lib/api";
import { mockLogin, isMockAuthEnabled } from "@/lib/mockAuth";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handle logout and cleanup
  const logout = useMemo(() => {
    return (redirectToLogin = true) => {
      setToken(null);
      setUser(null);
      globalThis?.localStorage?.removeItem("auth");
      if (redirectToLogin && typeof window !== "undefined") {
        router.push("/login");
      }
    };
  }, [router]);

  // Setup global auth error handler
  useEffect(() => {
    setAuthErrorHandler((error) => {
      console.error("Authentication error detected:", error);
      logout(true); // This will clear auth and redirect to login
    });
  }, [logout]);

  // Validate token on mount by fetching user profile
  useEffect(() => {
    async function validateToken() {
      const saved = globalThis?.localStorage?.getItem("auth");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const savedToken = parsed.token;
          const savedUser = parsed.user;

          if (savedToken) {
            // Validate token with backend
            try {
              const userData = await Api.fetchUserProfile(savedToken);
              setToken(savedToken);
              setUser(userData);
            } catch (err) {
              // Token is invalid or expired, clear auth
              console.error("Token validation failed:", err);
              setToken(null);
              setUser(null);
              globalThis?.localStorage?.removeItem("auth");
            }
          } else {
            setToken(savedToken || null);
            setUser(savedUser || null);
          }
        } catch (err) {
          console.error("Error parsing auth from localStorage:", err);
        }
      }
      setLoading(false);
    }

    validateToken();
  }, []);

  useEffect(() => {
    if (!loading) {
      const payload = JSON.stringify({ token, user });
      globalThis?.localStorage?.setItem("auth", payload);
    }
  }, [token, user, loading]);

  const login = useCallback(async (username, password) => {
    // Use mock auth in development or when explicitly enabled
    if (isMockAuthEnabled()) {
      const data = await mockLogin(username, password);
      setToken(data?.token || null);
      setUser(data?.user || null);
      return data;
    }

    // Real API login - returns token
    const loginData = await Api.login({ username, password });
    const token = loginData?.token || null;
    setToken(token);

    // Fetch user profile with token to get user data including canComplete flag
    let userData = null;
    if (token) {
      try {
        userData = await Api.fetchUserProfile(token);
        setUser(userData || null);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
      }
    }

    return { token, user: userData };
  }, []);

  const value = useMemo(
    () => ({ token, user, loading, login, logout }),
    [token, user, loading, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
