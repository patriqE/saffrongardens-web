"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RequestAccessPage() {
  const [form, setForm] = useState({
    role: "planner",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    category: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const isPlanner = useMemo(() => form.role === "planner", [form.role]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    // basic client-side validation
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

      if (isPlanner) {
        const res = await fetch(`${base}/api/planner/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Planner registration failed");
        }
      } else {
        const res = await fetch(`${base}/api/vendor/apply`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
            businessName: form.businessName,
            category: form.category,
            description: form.description,
          }),
        });

        if (!res.ok) {
          // vendor apply may return plain text
          const text = await res.text();
          const asJson = (() => {
            try {
              return JSON.parse(text);
            } catch {
              return null;
            }
          })();
          throw new Error(asJson?.error || text || "Vendor application failed");
        }
      }

      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Unable to submit request");
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
      <div className="page-shell page-padding flex flex-col relative z-10">
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
            Exclusive Access
          </h1>
          <p className="text-gray-300/80 text-base font-normal leading-relaxed max-w-xs mx-auto">
            Join Saffron Gardens as a planner or vendor. Submit your details for
            approval.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-lg border border-primary/30 bg-primary/10 text-white px-4 py-3 text-sm font-medium">
            Thanks! We received your request. Our team will reach out shortly.
          </div>
        ) : (
          <form className="flex flex-col w-full gap-5" onSubmit={onSubmit}>
            {/* Role toggle */}
            <div className="flex items-center justify-center gap-3 bg-[#2f2d16] border border-[#6a692f] rounded-lg p-2 text-sm text-white">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="planner"
                  checked={isPlanner}
                  onChange={handleChange}
                  className="text-primary focus:ring-primary"
                />
                Planner
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={!isPlanner}
                  onChange={handleChange}
                  className="text-primary focus:ring-primary"
                />
                Vendor
              </label>
            </div>

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

            {/* Email (vendor only) */}
            {!isPlanner && (
              <div className="flex flex-col w-full group">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                  placeholder="Enter your email address"
                  type="email"
                  required={!isPlanner}
                />
              </div>
            )}

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

            {/* Vendor-only fields */}
            {!isPlanner && (
              <>
                <div className="flex flex-col w-full group">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                    Business Name
                  </label>
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                    placeholder="Your business name"
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col w-full group">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] h-14 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
                    required
                  >
                    <option value="" className="text-black">
                      Select a category
                    </option>
                    <option value="CATERING" className="text-black">
                      Catering
                    </option>
                    <option value="DECOR" className="text-black">
                      Decor
                    </option>
                    <option value="PHOTOGRAPHY" className="text-black">
                      Photography
                    </option>
                    <option value="ENTERTAINMENT" className="text-black">
                      Entertainment
                    </option>
                    <option value="VENUE" className="text-black">
                      Venue
                    </option>
                    <option value="OTHER" className="text-black">
                      Other
                    </option>
                  </select>
                </div>

                <div className="flex flex-col w-full group">
                  <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 pl-1 group-focus-within:text-primary transition-colors">
                    Tell us more (optional)
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-input-custom flex w-full rounded-lg text-white border border-[#6a692f] bg-[#353418] placeholder:text-[#cccb8e]/70 p-[15px] text-base font-normal leading-normal focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm h-32 resize-none"
                    placeholder="Describe your services and experience"
                  />
                </div>
              </>
            )}

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
                  {submitting ? "Sending..." : "Request Invitation"}
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
            Already approved?
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
