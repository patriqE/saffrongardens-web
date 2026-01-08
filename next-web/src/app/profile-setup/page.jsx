"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ProfileSetupPage() {
  // Allow only planner or vendor to access
  const { user, loading } = useRequireAuth({
    allowedRoles: ["EVENT_PLANNER", "VENDOR"],
    unauthorizedRedirectTo: "/complete-profile",
    allowPreview: true,
  });
  const router = useRouter();

  const [role, setRole] = useState(
    user?.role === "EVENT_PLANNER" ? "planner" : "vendor"
  );
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const onBack = () => router.push("/complete-profile");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    const isPlanner = role === "planner";
    const requiredField = isPlanner ? fullName : businessName;
    if (!requiredField || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const fd = new FormData();

      // Common fields
      fd.append("description", description);
      fd.append("website", website);
      fd.append("phoneNumber", phoneNumber);
      fd.append("email", email);

      // Role-specific fields
      if (isPlanner) {
        fd.append("fullName", fullName);
        fd.append("companyName", companyName);
      } else {
        fd.append("businessName", businessName);
        fd.append("address", address);
        fd.append("city", city);
        fd.append("state", state);
      }

      // Append files
      if (files?.length) {
        files.forEach((file) => fd.append("files", file));
      }

      const res = await fetch(`${base}/api/profile/complete`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        let data = null;
        try {
          data = JSON.parse(text);
        } catch {}
        throw new Error(data?.error || text || "Submission failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/profile-submitted");
      }, 800);
    } catch (err) {
      setError(err?.message || "Unable to submit profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col antialiased selection:bg-primary/30 selection:text-primary">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button
            onClick={onBack}
            className="text-gray-800 dark:text-white flex size-12 shrink-0 items-center justify-start hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              arrow_back_ios_new
            </span>
          </button>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Verify Your Business
          </h2>
        </div>
        {/* Progress Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-3 pb-4 pt-1">
          <div className="h-1.5 w-8 rounded-full bg-primary/30"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(242,185,13,0.4)]"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary/30"></div>
        </div>
      </header>

      {/* Main Content Form */}
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-5 pt-6 pb-24 overflow-y-auto">
        {/* Intro Text */}
        <div className="mb-8">
          <h3 className="text-gray-900 dark:text-white tracking-tight text-2xl font-bold leading-tight mb-2">
            Business Identity
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-relaxed">
            To maintain our exclusive standards at Saffron Gardens, please
            provide your professional details for our verification team.
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-3 ml-1">
            I am a
          </label>
          <div className="flex p-1 bg-gray-200 dark:bg-surface-dark rounded-xl">
            <label className="flex-1 cursor-pointer">
              <input
                className="peer sr-only"
                name="role"
                type="radio"
                value="planner"
                checked={role === "planner"}
                onChange={() => setRole("planner")}
              />
              <div className="flex items-center justify-center py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 transition-all peer-checked:bg-white dark:peer-checked:bg-background-dark peer-checked:text-primary peer-checked:shadow-sm">
                Event Planner
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                className="peer sr-only"
                name="role"
                type="radio"
                value="vendor"
                checked={role === "vendor"}
                onChange={() => setRole("vendor")}
              />
              <div className="flex items-center justify-center py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 transition-all peer-checked:bg-white dark:peer-checked:bg-background-dark peer-checked:text-primary peer-checked:shadow-sm">
                Vendor
              </div>
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Company Details */}
          <div className="space-y-5">
            {/* Vendor: Business Name */}
            {role === "vendor" && (
              <div className="group">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                  htmlFor="businessName"
                >
                  Business Name *
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all duration-300"
                    id="businessName"
                    placeholder="e.g. Elite Events Co."
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Planner: Full Name & Company Name */}
            {role === "planner" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                      htmlFor="fullName"
                    >
                      Full Name *
                    </label>
                    <input
                      className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                      id="fullName"
                      placeholder="First & Last"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="group">
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                      htmlFor="companyName"
                    >
                      Company Name
                    </label>
                    <input
                      className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                      id="companyName"
                      placeholder="e.g. Elite Events Co."
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Vendor: Address Fields */}
            {role === "vendor" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="group col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                    id="address"
                    placeholder="Street address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                    id="city"
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                    id="state"
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Common: Phone Number & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                  id="phoneNumber"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="group">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Common: Website */}
            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                htmlFor="website"
              >
                Website or Portfolio URL
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-gray-400 dark:text-white/30 material-symbols-outlined text-[20px]">
                  language
                </span>
                <input
                  className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 pl-10 placeholder-gray-400 dark:placeholder-white/20 transition-all"
                  id="website"
                  placeholder="https://"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            {/* Common: Description */}
            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 pl-1"
                htmlFor="description"
              >
                Description *
              </label>
              <textarea
                className="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3.5 placeholder-gray-400 dark:placeholder-white/20 transition-all resize-none"
                id="description"
                placeholder="Briefly describe your services..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Upload Section */}
          <div className="pt-6">
            <h4 className="text-gray-900 dark:text-white text-lg font-bold mb-4">
              Credentials & Verification
            </h4>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="relative group cursor-pointer">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-all group-hover:border-primary/50">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">
                      upload_file
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      Upload Files
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Documents, licenses, or portfolio samples (PDF, JPG, PNG)
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                    add_circle
                  </span>
                </div>
              </div>
              {files.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {files.length} file(s) selected
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm">Submitted! Redirecting…</p>
          )}

          {/* Sticky Footer Button */}
          <div className="fixed bottom-0 left-0 w-full bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/5 p-5 pb-8 z-40 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
            <div className="max-w-md mx-auto">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-yellow-400 text-background-dark font-bold text-base py-4 px-6 rounded-xl shadow-[0_4px_14px_rgba(242,185,13,0.3)] hover:shadow-[0_6px_20px_rgba(242,185,13,0.4)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>
                  {submitting ? "Submitting…" : "Submit for Verification"}
                </span>
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
