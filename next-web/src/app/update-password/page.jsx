"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Password strength checker
  const passwordStrength = useMemo(() => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    if (checks.length) strength++;
    if (checks.number) strength++;
    if (checks.symbol) strength++;

    return { strength, checks };
  }, [password]);

  const strengthLabel = {
    0: "Weak",
    1: "Weak",
    2: "Medium",
    3: "Strong",
  }[passwordStrength.strength];

  const strengthColor = {
    0: "bg-red-500",
    1: "bg-yellow-500",
    2: "bg-blue-500",
    3: "bg-primary",
  }[passwordStrength.strength];

  const handleCancel = () => {
    router.push("/profile");
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError("Please enter your current password");
      return;
    }

    if (password.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: call backend update password endpoint with current password verification
      await new Promise((resolve) => setTimeout(resolve, 400));
      setSuccess(true);
      // Show success message for 2 seconds then navigate back to profile
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (err) {
      setError(err?.message || "Unable to update password");
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col items-center">
      {/* Mobile Container */}
      <div className="w-full page-shell min-h-screen flex flex-col relative overflow-hidden bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="flex items-center justify-between page-padding pb-2 sticky top-0 z-10 bg-background-light dark:bg-background-dark">
          <Link
            href="/profile"
            className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              arrow_back_ios_new
            </span>
          </Link>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Change Password
          </h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 page-padding py-2 flex flex-col">
          {success ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <div className="flex items-center justify-center size-20 rounded-full bg-green-500/10 border-2 border-green-500">
                <span
                  className="material-symbols-outlined text-green-500"
                  style={{ fontSize: "48px" }}
                >
                  check_circle
                </span>
              </div>
              <h2 className="text-white tracking-tight text-[28px] font-bold leading-tight text-center">
                Password Updated!
              </h2>
              <p className="text-white/80 text-base font-normal leading-relaxed text-center">
                Your password has been successfully changed.
              </p>
            </div>
          ) : (
            <>
              {/* Description */}
              <p className="text-white/80 text-base font-normal leading-relaxed pb-6 pt-2">
                Please enter your current password to verify your identity, then
                create a new distinct password.
              </p>

              {/* Form */}
              <form className="flex flex-col gap-5 flex-1" onSubmit={onSubmit}>
                {/* Current Password */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white text-sm font-medium leading-normal"
                    htmlFor="current-password"
                  >
                    Current Password
                  </label>
                  <div className="flex w-full items-stretch rounded-lg shadow-sm">
                    <input
                      className="form-input flex-1 w-full rounded-l-lg border border-input-border bg-input-bg text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary h-14 placeholder:text-text-gold/50 px-4 text-base transition-colors"
                      id="current-password"
                      placeholder="Enter current password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      className="flex items-center justify-center px-4 rounded-r-lg border border-l-0 border-input-border bg-input-bg text-text-gold hover:text-primary transition-colors"
                      type="button"
                      onClick={() => setShowCurrentPassword((v) => !v)}
                      aria-label="Toggle current password visibility"
                    >
                      <span className="material-symbols-outlined">
                        {showCurrentPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white text-sm font-medium leading-normal"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <div className="flex w-full items-stretch rounded-lg shadow-sm group focus-within:ring-1 focus-within:ring-primary">
                    <input
                      className="form-input flex-1 w-full rounded-l-lg border border-input-border bg-input-bg text-white focus:outline-none focus:ring-0 focus:border-primary h-14 placeholder:text-text-gold/50 px-4 text-base transition-colors"
                      id="new-password"
                      placeholder="Enter new password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      className="flex items-center justify-center px-4 rounded-r-lg border border-l-0 border-input-border bg-input-bg text-text-gold hover:text-primary transition-colors"
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="Toggle new password visibility"
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-text-gold/80 uppercase tracking-wide">
                        Strength
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          strengthColor === "bg-red-500"
                            ? "text-red-500"
                            : strengthColor === "bg-yellow-500"
                            ? "text-yellow-500"
                            : strengthColor === "bg-blue-500"
                            ? "text-blue-500"
                            : "text-primary"
                        }`}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="flex gap-1 h-1.5 w-full">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-full ${
                            i < passwordStrength.strength
                              ? strengthColor
                              : "bg-primary/30"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Requirements Checklist */}
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center gap-2 text-sm text-white/70">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            passwordStrength.checks.length
                              ? "text-green-500"
                              : "text-slate-400"
                          }`}
                        >
                          {passwordStrength.checks.length
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </span>
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2 text-sm text-white/70">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            passwordStrength.checks.number
                              ? "text-green-500"
                              : "text-slate-400"
                          }`}
                        >
                          {passwordStrength.checks.number
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </span>
                        Contains a number
                      </li>
                      <li className="flex items-center gap-2 text-sm text-white/70">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            passwordStrength.checks.symbol
                              ? "text-green-500"
                              : "text-slate-400"
                          }`}
                        >
                          {passwordStrength.checks.symbol
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </span>
                        Contains a symbol
                      </li>
                    </ul>
                  </div>
                )}

                {/* Confirm New Password */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-white text-sm font-medium leading-normal"
                    htmlFor="confirm-password"
                  >
                    Confirm New Password
                  </label>
                  <div className="flex w-full items-stretch rounded-lg shadow-sm">
                    <input
                      className="form-input flex-1 w-full rounded-l-lg border border-input-border bg-input-bg text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary h-14 placeholder:text-text-gold/50 px-4 text-base transition-colors"
                      id="confirm-password"
                      placeholder="Re-enter new password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button
                      className="flex items-center justify-center px-4 rounded-r-lg border border-l-0 border-input-border bg-input-bg text-text-gold hover:text-primary transition-colors"
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label="Toggle confirm password visibility"
                    >
                      <span className="material-symbols-outlined">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    className="text-red-500 text-sm flex items-center gap-2"
                    role="alert"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      error
                    </span>
                    {error}
                  </p>
                )}

                {/* Spacer to push buttons to bottom */}
                <div className="flex-1 min-h-[40px]"></div>

                {/* Actions */}
                <div className="flex flex-col gap-4 pb-6 mt-4">
                  <button
                    className="w-full bg-primary hover:bg-primary-dark text-background-dark font-bold text-base h-14 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-60"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    className="w-full text-white/60 hover:text-white font-medium text-base transition-colors py-2"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
