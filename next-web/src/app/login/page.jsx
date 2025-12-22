"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col items-center justify-center font-[\'Spline Sans\',_\'Noto Sans\',_sans-serif] relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Ambient Background Glow (Luxury Effect) */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Main Content Container */}
      <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col z-10 relative">
        <Link
          href="/"
          className="absolute left-0 -top-2 text-[#9e9d47] dark:text-primary/80 hover:text-primary transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-base">home</span>
          Home
        </Link>
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6 flex items-center justify-center">
            <Image
              src="/logo.PNG"
              alt="Saffron Gardens logo"
              width={80}
              height={80}
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-[#1c1c0d] dark:text-[#f8f8f5] tracking-tight text-[32px] font-bold leading-tight text-center">
            Saffron Gardens
          </h1>
          <p className="text-[#1c1c0d]/70 dark:text-[#f8f8f5]/60 text-base font-normal leading-normal pt-3 text-center max-w-[280px]">
            Log in to manage your luxury events
          </p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Username Field */}
          <label className="flex flex-col gap-2 group">
            <p className="text-[#1c1c0d] dark:text-[#f8f8f5] text-sm font-medium leading-normal ml-1">
              Username
            </p>
            <div className="relative">
              <input
                className="flex w-full min-w-0 resize-none overflow-hidden rounded-xl text-[#1c1c0d] dark:text-white border border-[#e9e8ce] dark:border-[#4a4930] bg-[#fcfcf8] dark:bg-[#2e2d1a] h-14 placeholder:text-[#9e9d47] dark:placeholder:text-[#888750] px-[15px] text-base font-normal leading-normal focus:outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9e9d47] pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[20px]">
                  badge
                </span>
              </div>
            </div>
          </label>

          {/* Password Field */}
          <label className="flex flex-col gap-2">
            <p className="text-[#1c1c0d] dark:text-[#f8f8f5] text-sm font-medium leading-normal ml-1">
              Password
            </p>
            <div className="flex w-full items-stretch rounded-xl relative">
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1c1c0d] dark:text-white border border-[#e9e8ce] dark:border-[#4a4930] bg-[#fcfcf8] dark:bg-[#2e2d1a] h-14 placeholder:text-[#9e9d47] dark:placeholder:text-[#888750] pl-[15px] pr-12 text-base font-normal leading-normal focus:outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-[#9e9d47] dark:text-[#888750] hover:text-primary transition-colors focus:outline-none"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </label>

          {/* Forgot Password Link */}
          <div className="flex justify-end -mt-1">
            <Link
              className="text-[#9e9d47] dark:text-primary/80 text-sm font-medium leading-normal hover:text-primary hover:underline transition-all"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}

          {/* Primary Button */}
          <button
            className="w-full bg-primary hover:bg-[#e6e205] text-[#23220f] font-bold text-base h-14 rounded-full shadow-[0_4px_14px_0_rgba(249,245,6,0.39)] hover:shadow-[0_6px_20px_rgba(249,245,6,0.23)] hover:-translate-y-0.5 transition-all duration-200 mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-[#1c1c0d]/60 dark:text-[#f8f8f5]/50 text-sm">
            Not a verified User?
            <Link
              className="text-[#1c1c0d] dark:text-primary font-semibold hover:underline ml-1"
              href="/request-access"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
