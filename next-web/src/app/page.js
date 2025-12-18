import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Saffron Gardens",
};

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased overflow-hidden selection:bg-primary selection:text-background-dark">
      {/* Background Image with Overlays */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIEhep5tfbvpKBe9d6NZKsJ53G4MCQWjtLXeWBUNii9V5_U8pJdFoYu6bTJc86PHjjbLQsDer3SlaC-WyfQWv_0qVWeh7wBHeZKswNka7l94moVaJT8zscmHFV6HxShUOK_cmA06tj__9m9OMF0E9LvjNyzhvox0W5Zdcg2tCWAtOI9cCTHTEorpA68NifpNnvPRIlnB0WvM0y3sVE3bphMWc0-s8CGq-ah77f2Uq_elBMT-dRDOW-bwSFINRFbVy38vZEkuF4YDI')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background-dark/70 to-background-dark" />
        <div className="absolute inset-0 bg-background-dark/30 mix-blend-multiply" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col h-full min-h-screen w-full max-w-md mx-auto px-6 py-8 justify-between">
        {/* Header: Top Center Icon */}
        <div className="flex flex-col items-center pt-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="text-primary/90 p-3 rounded-full border border-primary/20 backdrop-blur-sm bg-black/20">
            <Image
              src="/logo.PNG"
              alt="Saffron Gardens logo"
              width={48}
              height={48}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Center Stage: Typography */}
        <div className="flex flex-col items-center text-center gap-6 mt-auto mb-12">
          <div className="flex flex-col items-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
              <span className="block tracking-widest-luxury text-sm font-medium text-primary mb-2 uppercase opacity-90">
                Exclusive Venues
              </span>
              SAFFRON
              <br />
              GARDENS
            </h1>
            <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed max-w-[320px]">
              Curated spaces for the elite planner. Experience the pinnacle of
              event luxury.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-4 w-full pb-4 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
          <Link
            href="/login"
            className="flex w-full cursor-pointer items-center justify-center rounded-full h-12 bg-white/5 border border-white/10 backdrop-blur-sm text-white text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors duration-200"
          >
            Member Login
          </Link>
          <Link
            href="/request-access"
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary transition-all duration-300 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(249,245,6,0.4)]"
          >
            <span className="relative z-10 text-background-dark text-base font-bold tracking-wide uppercase">
              Request Access
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
          </Link>
          <p className="text-white/30 text-xs font-medium text-center mt-4">
            © 2024 Saffron Gardens. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
