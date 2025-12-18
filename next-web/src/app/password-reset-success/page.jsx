"use client";
import Link from "next/link";

export default function PasswordResetSuccessPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark overflow-x-hidden">
      {/* Top App Bar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <Link
          href="/login"
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Saffron Gardens
        </h2>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col flex-1 justify-center items-center w-full max-w-md mx-auto px-4">
        {/* Success Icon / Visual */}
        <div className="flex w-full p-4 justify-center">
          <div className="relative flex items-center justify-center size-32 rounded-full bg-emerald-500/10 border-2 border-emerald-500">
            <span
              className="material-symbols-outlined text-emerald-500"
              style={{ fontSize: "64px" }}
            >
              check_circle
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4"></div>

        {/* Headline Text */}
        <div className="flex w-full flex-col px-4">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-2">
            Password Updated
          </h1>
        </div>

        {/* Body Text */}
        <div className="flex w-full flex-col px-4">
          <p className="text-slate-700 dark:text-white/70 text-base font-medium leading-relaxed pb-6 text-center max-w-[320px] mx-auto">
            Your password has been successfully reset.
            <br />
            You can now access your dashboard with your new credentials.
          </p>
        </div>

        {/* Decorative Image */}
        <div className="flex w-full px-6 py-4 justify-center opacity-80">
          <div className="w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[2/1] shadow-lg relative group">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover absolute top-0 left-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIYXizrPUdHcKeEvLAlrH_M-5mU_ZFlDMLKFFOzSqKXncHpClsHbEKr-HbMePecN7bXl5emXo7029nfTUb0v3uO23MCYr91uYNZCgxXYFiFGR-K0-tzWudHlXbifcElSrz_76_TPUgFJShZ8Gbv44MNoCiiH-a9IVjIFWmA9hHDPBnF3n8qSKnKSItGM42BIwqSEJzn-q6F6MtyfsuAY4Lf8DQHKgcEcdRU0RDOYSGmR_Lc_F5TKUaSLQWk3AwvtR5OdJ3az8HI1I")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
            <div className="absolute bottom-3 left-4 text-white text-sm font-medium tracking-wide">
              Secure Access
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full p-4 pb-8 max-w-md mx-auto">
        <Link href="/login">
          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary hover:bg-[#d9a50b] active:scale-[0.98] transition-all text-background-dark text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20">
            <span className="truncate">Proceed to Login</span>
            <span className="material-symbols-outlined ml-2 text-xl">
              arrow_forward
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
