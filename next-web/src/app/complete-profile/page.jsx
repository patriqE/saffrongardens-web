"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CompleteProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleCompleteProfile = () => {
    // Navigate to profile completion form
    router.push("/profile-setup");
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark group/design-root font-display">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTA5fbMayOE8oAHgPU_0b-9aQSP-OKnQbq5t0rGqcQrrBo2ubyTabjtgV59d1HYAqQTZDPLR54VpStPtTlQ69X7iM-IEc_g9Ni7CHDcF1B_eED9_eTLNlrgt69AO22M5lhOmeeOEa5ckGSvOohGWW2lzoT9dQN-7aRhZNLX4k5knGJ_HmG5044ZuT8U5TXFUe6eX5A_EgdZyHuJN48sW-ilr5FI3X20Uxy0v8FK9b47IoeC4wU4BxS26n0lIIlqR5j2XbOyRKDKg0")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background-light/50 to-background-light dark:from-transparent dark:via-background-dark/80 dark:to-background-dark pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col h-full justify-between p-6 max-w-md mx-auto w-full">
        {/* Top: Brand Header */}
        <div className="flex justify-center pt-8">
          <div className="flex items-center gap-2 opacity-90">
            <Image
              src="/logo.PNG"
              alt="Saffron Gardens logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white">
              Saffron Gardens
            </span>
          </div>
        </div>

        {/* Center: Hero Icon & Messaging */}
        <div className="flex flex-col items-center justify-center gap-6 flex-grow">
          {/* Hero Icon */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full w-24 h-24"></div>
            <div className="w-24 h-24 rounded-full border border-primary/30 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(242,185,13,0.15)]">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "48px" }}
              >
                verified_user
              </span>
            </div>
          </div>

          {/* Headline Text */}
          <div className="text-center space-y-2 mt-4">
            <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-light leading-tight px-4 text-center">
              Verification Required
            </h1>
            <p className="text-primary font-medium text-sm tracking-widest uppercase opacity-80">
              One Last Step
            </p>
          </div>

          {/* Body Text */}
          <div className="max-w-xs mx-auto">
            <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed text-center">
              Thank you for registering. To ensure the exclusivity of our
              community, please complete your professional profile to proceed
              with verification.
            </p>
          </div>
        </div>

        {/* Bottom: Action Buttons */}
        <div className="flex flex-col gap-6 pb-8 w-full">
          {/* Primary Button */}
          <button
            onClick={handleCompleteProfile}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary hover:bg-[#d9a60b] transition-all duration-300 text-[#231e10] text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 active:scale-[0.98]"
          >
            <span className="truncate">Complete Your Profile</span>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              logout
            </span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
