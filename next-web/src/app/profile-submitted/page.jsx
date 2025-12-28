"use client";
import { useRouter } from "next/navigation";

export default function ProfileSubmittedPage() {
  const router = useRouter();
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased overflow-hidden">
      <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden">
        {/* Pattern + gradient background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-pattern" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0" />

        {/* Main content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-10 w-full max-w-md mx-auto">
          {/* Hero */}
          <div className="mb-8 flex items-center justify-center relative">
            <div className="absolute w-32 h-32 rounded-full bg-primary/10 blur-xl animate-pulse" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-primary/30 bg-background-dark shadow-[0_0_15px_rgba(242,185,13,0.15)]">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: 48 }}
              >
                verified_user
              </span>
            </div>
            <div className="absolute -bottom-2 bg-surface-dark border border-primary/20 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                Pending Review
              </span>
            </div>
          </div>

          <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center mb-4">
            Profile <span className="text-primary">Submitted</span>
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed text-center max-w-[320px]">
            Thank you for applying to Saffron Gardens. Your credentials have
            been securely received.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed text-center mt-4 max-w-[300px]">
            Verification typically takes{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              24-48 hours
            </span>
            . We will notify you via email once your access to our exclusive
            network is approved.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 w-full px-6 pb-16 pt-4 flex flex-col items-center gap-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent">
          {/* Back to Home */}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-primary hover:bg-[#e0ae0c] text-background-dark font-bold text-base py-4 px-6 rounded-xl shadow-[0_4px_14px_rgba(242,185,13,0.3)] hover:shadow-[0_6px_20px_rgba(242,185,13,0.4)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
            <span className="material-symbols-outlined text-xl">home</span>
          </button>
          <button className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary hover:bg-white/5 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              help
            </span>
            Need help? Contact Support
          </button>
          <div className="h-2" />
        </div>
      </div>

      <style jsx>{`
        .bg-pattern {
          background-image: radial-gradient(#f2b90d 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
