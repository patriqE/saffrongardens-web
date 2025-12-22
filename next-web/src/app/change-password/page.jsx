"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Password strength checker
  const passwordStrength = useMemo(() => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      uppercase: /[A-Z]/.test(password),
    };

    if (checks.length) strength++;
    if (checks.number) strength++;
    if (checks.symbol) strength++;
    if (checks.uppercase) strength++;

    return { strength, checks };
  }, [password]);

  const strengthLabel = {
    0: "Weak",
    1: "Weak",
    2: "Medium",
    3: "Strong",
    4: "Very Strong",
  }[passwordStrength.strength];

  const strengthColor = {
    0: "bg-red-500",
    1: "bg-red-500",
    2: "bg-yellow-500",
    3: "bg-blue-500",
    4: "bg-green-500",
  }[passwordStrength.strength];

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: call backend change password endpoint
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push("/password-reset-success");
    } catch (err) {
      setError(err?.message || "Unable to change password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-surface-dark/95 backdrop-blur-sm page-padding pb-2 border-b border-white/5">
        <Link
          href="/verify-otp"
          aria-label="Go back"
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            chevron_left
          </span>
        </Link>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Saffron Gardens
        </h2>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-4 pt-6 pb-8">
        {/* Headline & Description */}
        <div className="mb-8">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left mb-3">
            Change Password
          </h1>
          <p className="text-slate-500 dark:text-gray-300 text-base font-normal leading-normal">
            Create a secure password for your account. Please ensure it is
            unique and contains at least 8 characters.
          </p>
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          {/* New Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-slate-900 dark:text-white text-base font-medium leading-normal"
              htmlFor="new-password"
            >
              New Password
            </label>
            <div className="flex w-full items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-sm">
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white border border-slate-200 dark:border-input-border bg-white dark:bg-input-bg h-14 placeholder:text-slate-400 dark:placeholder:text-text-muted p-[15px] pr-2 text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-primary border-r-0 transition-colors"
                id="new-password"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                aria-label="Toggle password visibility"
                className="text-slate-400 dark:text-text-muted flex items-center justify-center pr-[15px] pl-2 rounded-r-lg border border-l-0 border-slate-200 dark:border-input-border bg-white dark:bg-input-bg hover:text-primary transition-colors"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px" }}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {/* Password Strength Meter */}
          {password && (
            <div className="flex flex-col gap-2 -mt-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-medium text-slate-500 dark:text-text-muted uppercase tracking-wider">
                  Strength
                </span>
                <span
                  className={`text-sm font-medium ${
                    strengthColor === "bg-red-500"
                      ? "text-red-500"
                      : strengthColor === "bg-yellow-500"
                      ? "text-yellow-500"
                      : strengthColor === "bg-blue-500"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {strengthLabel}
                </span>
              </div>
              <div className="flex gap-1.5 h-1.5 w-full">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-full ${
                      i < passwordStrength.strength
                        ? strengthColor
                        : "bg-slate-200 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <li className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined ${
                      passwordStrength.checks.length
                        ? "text-primary"
                        : "text-slate-300 dark:text-white/20"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {passwordStrength.checks.length
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    8+ characters
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined ${
                      passwordStrength.checks.number
                        ? "text-primary"
                        : "text-slate-300 dark:text-white/20"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {passwordStrength.checks.number
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    1 Number
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined ${
                      passwordStrength.checks.symbol
                        ? "text-primary"
                        : "text-slate-300 dark:text-white/20"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {passwordStrength.checks.symbol
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    1 Symbol
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span
                    className={`material-symbols-outlined ${
                      passwordStrength.checks.uppercase
                        ? "text-primary"
                        : "text-slate-300 dark:text-white/20"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {passwordStrength.checks.uppercase
                      ? "check_circle"
                      : "radio_button_unchecked"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    1 Uppercase
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-slate-900 dark:text-white text-base font-medium leading-normal"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <div className="flex w-full items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-sm">
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white border border-slate-200 dark:border-input-border bg-white dark:bg-input-bg h-14 placeholder:text-slate-400 dark:placeholder:text-text-muted p-[15px] pr-2 text-base font-normal leading-normal focus:outline-0 focus:ring-0 focus:border-primary border-r-0 transition-colors"
                id="confirm-password"
                placeholder="Re-enter password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                aria-label="Toggle password visibility"
                className="text-slate-400 dark:text-text-muted flex items-center justify-center pr-[15px] pl-2 rounded-r-lg border border-l-0 border-slate-200 dark:border-input-border bg-white dark:bg-input-bg hover:text-primary transition-colors"
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px" }}
                >
                  {showConfirm ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {/* Match indicator */}
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-400 text-sm" role="alert">
              Passwords do not match
            </p>
          )}

          {error && (
            <p className="text-red-400 text-sm" role="alert">
              {error}
            </p>
          )}

          <div className="flex-1" />

          {/* Submit Button */}
          <button
            className="w-full mt-6 bg-primary hover:bg-[#d9a50b] active:scale-[0.98] transition-all text-background-dark font-bold h-14 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 text-lg tracking-tight disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Changing..." : "Change Password"}
          </button>
        </form>
      </main>

      {/* Bottom spacing for mobile safe areas */}
      <div className="h-8 w-full bg-background-light dark:bg-background-dark"></div>
    </div>
  );
}
