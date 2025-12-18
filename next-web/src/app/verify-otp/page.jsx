"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "j***@studio.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(299); // 4:59
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      // TODO: POST to backend verify OTP endpoint
      await new Promise((resolve) => setTimeout(resolve, 400));
      // Navigate to password change page
      router.push("/change-password");
    } catch (err) {
      setError(err?.message || "Invalid OTP");
    } finally {
      setSubmitting(false);
    }
  }

  function handleResend() {
    // TODO: call resend OTP endpoint
    setTimeLeft(299);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Mask email to show pattern like j***@studio.com
  function maskEmail(emailStr) {
    const [local, domain] = emailStr.split("@");
    if (local.length <= 1) return emailStr;
    const masked =
      local[0] +
      "*".repeat(Math.max(1, local.length - 2)) +
      local[local.length - 1];
    return `${masked}@${domain}`;
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-start text-slate-900 dark:text-white antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <header className="w-full max-w-md px-4 pt-4 pb-2 flex items-center justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <Link
          href="/forgot-password"
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span
            className="material-symbols-outlined text-slate-800 dark:text-white"
            style={{ fontSize: "24px" }}
          >
            arrow_back_ios_new
          </span>
        </Link>
        <div className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-gray-400">
          Password Reset
        </div>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md flex flex-col px-6 pt-8 pb-8 flex-grow">
        {/* Icon / Visual Indicator */}
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center size-20 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(242,185,13,0.1)]">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: "40px" }}
            >
              lock_person
            </span>
            <div className="absolute -bottom-1 -right-1 bg-background-dark rounded-full p-1 border border-primary/30">
              <span
                className="material-symbols-outlined text-green-500"
                style={{ fontSize: "16px" }}
              >
                check_circle
              </span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-3 tracking-tight">
          Verification Code
        </h1>

        {/* Subtitle/Instructions */}
        <p className="text-center text-slate-500 dark:text-gray-400 text-base leading-relaxed mb-10">
          Please enter the 6-digit code sent to <br />
          <span className="font-semibold text-slate-800 dark:text-white">
            {maskEmail(email)}
          </span>
        </p>

        {/* OTP Inputs */}
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center w-full mb-2">
            <fieldset className="flex gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="flex h-12 w-10 sm:h-14 sm:w-12 text-center bg-white dark:bg-surface-dark border border-gray-300 dark:border-white/10 rounded-lg text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all caret-primary text-slate-900 dark:text-white placeholder-transparent shadow-sm"
                  maxLength="1"
                  placeholder="-"
                  type="number"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </fieldset>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          {/* Timer / Resend */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-sm text-slate-400 dark:text-gray-500">
              Code expires in{" "}
              <span className="font-mono text-primary font-medium">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
            </p>
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5 mt-2"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Resend Code
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="mt-4 mb-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-yellow-400 active:bg-yellow-600 text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{submitting ? "Verifying..." : "Verify OTP"}</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </form>

        {/* Support Link */}
        <div className="text-center pb-4">
          <a
            className="text-xs text-slate-400 dark:text-gray-600 hover:text-slate-600 dark:hover:text-gray-400"
            href="#"
          >
            Having trouble logging in?
          </a>
        </div>
      </main>

      {/* Decorative ambient background element */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-primary/5 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[30%] bg-primary/5 blur-[80px] rounded-full"></div>
      </div>
    </div>
  );
}
