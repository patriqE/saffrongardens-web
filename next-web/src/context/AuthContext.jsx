"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Api } from "@/lib/api";
import { mockLogin, isMockAuthEnabled } from "@/lib/mockAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = globalThis?.localStorage?.getItem("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setToken(parsed.token || null);
        setUser(parsed.user || null);
      } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const payload = JSON.stringify({ token, user });
      globalThis?.localStorage?.setItem("auth", payload);
    }
  }, [token, user, loading]);

  async function login(username, password) {
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
    if (token) {
      try {
        const userData = await Api.fetchUserProfile(token);
        setUser(userData || null);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
      }
    }

    return { token, user };
  }

  function logout() {
    setToken(null);
    setUser(null);
    globalThis?.localStorage?.removeItem("auth");
  }

  const value = useMemo(
    () => ({ token, user, loading, login, logout }),
    [token, user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
