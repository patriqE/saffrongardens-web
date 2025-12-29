"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RequestAccessPage() {
  const [form, setForm] = useState({
    username: "",
    igProfile: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    // basic client-side validation
    if (!form.username || !form.igProfile || !form.password) {
      setError("Username, Instagram profile, and password are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = base ? `${base}/api/register` : "/api/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          igProfile: form.igProfile,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Registration failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Unable to submit registration");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col items-center relative overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-[#6a692f]/10 rounded-full blur-[80px]" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center pt-6 pb-8 text-center">
          <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(249,245,6,0.1)]">
            <Image
              src="/logo.PNG"
              alt="Saffron Gardens logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight pb-3">
            Join Saffron Gardens
          </h1>
          <p className="text-gray-300/80 text-base font-normal leading-relaxed max-w-xs mx-auto">
            Create your account and join our community of event planners and
            vendors.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-lg border border-primary/30 bg-primary/10 text-white px-4 py-3 text-sm font-medium">
            Thanks! Your registration is complete. Our team will review and
            contact you shortly.
          </div>
        ) : (
          <form className="flex flex-col w-full gap-5" onSubmit={onSubmit}>
            {/* Username */}
            <div className="flex flex-col w-full group">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Choose a username"
                type="text"
                required
              />
            </div>

            {/* Instagram Profile Link */}
            <div className="flex flex-col w-full group">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                Instagram Profile
              </label>
              <input
                name="igProfile"
                value={form.igProfile}
                onChange={handleChange}
                className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                placeholder="e.g., https://instagram.com/yourprofile"
                type="url"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full group">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                Password
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Create a password"
                type="password"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col w-full group">
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Re-enter password"
                type="password"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-4 pb-2">
              <button
                className="group relative w-full h-14 bg-primary hover:bg-[#eae605] text-background-dark font-bold text-lg rounded-lg shadow-[0_4px_20px_rgba(249,245,6,0.15)] hover:shadow-[0_4px_25px_rgba(249,245,6,0.3)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70"
                disabled={submitting}
              >
                <span className="relative z-10">
                  {submitting ? "Creating Account..." : "Create Account"}
                </span>
                <span className="material-symbols-outlined relative z-10 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="text-center pt-6 pb-8">
          <p className="text-gray-500 text-sm">
            Already have an account?
            <Link
              className="text-white hover:text-primary transition-colors font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary ml-1"
              href="/login"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
