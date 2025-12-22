"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // TODO: call backend reset endpoint
      await new Promise((resolve) => setTimeout(resolve, 400));
      // Navigate to OTP verification with email as query param
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err?.message || "Unable to send OTP");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white antialiased selection:bg-primary selection:text-background-dark min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between page-padding pb-2 z-10 relative">
        <Link
          href="/login"
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/5 transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">
            arrow_back_ios_new
          </span>
        </Link>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Saffron Gardens
        </h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full max-w-lg mx-auto px-6 pt-6 pb-6 z-10 relative">
        <div className="mb-4">
          <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight text-left">
            Reset your password
          </h2>
        </div>
        <div className="mb-10">
          <p className="text-white/80 text-base font-normal leading-relaxed">
            Please enter the email associated with your account. We will send
            you a secure OTP to reset your credentials.
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex flex-col w-full gap-2">
            <label
              className="text-white text-base font-medium leading-normal pl-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative group">
              <input
                autoComplete="email"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white bg-[#342d18] border border-[#685a31] focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 placeholder:text-[#cbbc90] p-[15px] text-base font-normal leading-normal transition-all duration-200"
                id="email"
                name="email"
                placeholder="planner@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#cbbc90] pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[20px]">
                  mail
                </span>
              </div>
            </div>
            {error && (
              <p
                className="text-red-400 text-sm pl-1 mt-1 flex items-center gap-1"
                role="alert"
              >
                <span className="material-symbols-outlined text-[16px]">
                  error
                </span>
                {error}
              </p>
            )}
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary hover:bg-[#d9a60c] active:bg-[#bf930b] text-[#231e10] text-base font-bold leading-normal tracking-[0.015em] transition-all duration-200 shadow-lg shadow-primary/10 mt-4 group"
            disabled={submitting}
            type="submit"
          >
            <span className="truncate group-hover:scale-[1.02] transition-transform">
              {submitting ? "Sending..." : "Send OTP"}
            </span>
          </button>
        </form>

        <div className="flex-1 min-h-[40px]" />

        <div className="py-6 text-center">
          <a
            className="inline-flex items-center gap-2 text-[#cbbc90] hover:text-primary text-sm font-medium tracking-wide transition-colors duration-200 decoration-1 hover:underline underline-offset-4"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">
              support_agent
            </span>
            Need help? Contact Support
          </a>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
    </div>
  );
}
