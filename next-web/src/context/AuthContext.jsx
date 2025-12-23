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

  async function login(email, password) {
    // Use mock auth in development or when explicitly enabled
    if (isMockAuthEnabled()) {
      const data = await mockLogin(email, password);
      setToken(data?.token || null);
      setUser(data?.user || null);
      return data;
    }

    // Real API login
    const data = await Api.login({ email, password });
    // Adjust property names based on backend response shape
    setToken(data?.token || data?.accessToken || null);
    setUser(data?.user || null);
    return data;
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
