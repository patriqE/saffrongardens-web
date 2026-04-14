import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";

export const metadata = {
  title: "Contact | Saffron Gardens",
};

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <PublicHeader currentPath="/contact" />

      <main className="flex-1 pt-24">
        <section className="relative h-[45vh] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFLKYhoMoucNhNxa77hA1RqPCd20ye4tCvHIwMhreoVVzjk7GDMFs_FUaGuQrsc3ue_v22IMadU143jKOZjeNQI8dJoZSpJsdlLHZJQKIoWYhCqEL4rBY9ZlObXQcdJ1ds98-T-2M1HVCWWlRerHvRz3IYCvK7qoS1n-HnU_xQxDNT6Ksw-3roDyYOtEG1WjrEjjCUUNv1jj4RwKig92L-0Z6bHdcb3NU4Sfam_G06DNfWafjUuv7xsB_1khoTSkRysRWCCSGQtdA')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-20">
            <h1 className="mb-4 text-5xl font-light tracking-tighter text-slate-100 lg:text-7xl">
              How can we{" "}
              <span className="font-bold text-primary italic underline decoration-primary/30">
                assist
              </span>{" "}
              you?
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-300">
              Experience white-glove service from our global concierge team. We
              are dedicated to curating your perfect luxury experience.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-8 py-16 lg:grid-cols-12 lg:px-20">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h2 className="mb-4 text-xs font-bold tracking-[0.3em] text-primary uppercase">
                Direct Communication
              </h2>
              <h3 className="mb-8 text-3xl font-semibold text-slate-100">
                Get in Touch
              </h3>
              <div className="space-y-1">
                <div className="group mb-4 flex items-start gap-6 rounded-xl border border-primary/30 bg-[#2f2d10] p-6 transition-all hover:border-primary/50">
                  <div className="rounded-lg bg-[#3a370f] p-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-widest text-primary/90 uppercase">
                      Email
                    </p>
                    <p className="text-xl font-medium text-slate-100">
                      saffrongardens2@gmail.com
                    </p>
                  </div>
                </div>

                <div className="group mb-4 flex items-start gap-6 rounded-xl border border-primary/30 bg-[#2f2d10] p-6 transition-all hover:border-primary/50">
                  <div className="rounded-lg bg-[#3a370f] p-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 3.18 2 2 0 0 1 4.09 1h2a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L7.1 8.6a16 16 0 0 0 6.3 6.3l1.15-1.16a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-widest text-primary/90 uppercase">
                      Global Hotlines
                    </p>
                    <p className="text-xl font-medium text-slate-100">
                      +1 (800) LUX-SAFFRON
                    </p>
                    <p className="text-sm text-slate-400">
                      +44 20 7946 0123 (International)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary/10 shadow-2xl">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj0-fl38TNogP8kXp8lhBe6XwN4QAL3yk6AfnemeGS192JLtWo4Jgtg0Ct2xpC-QihSXTuNDFW4Xhk7os5kV45yx_kEJMNGac7b-aI1Zuwd27UCSCH-47mjIKBzRFIK2IHzLE5Lnqbvmr8Z0n-cINEqQVwaW78kobhQVt9ZTMXWQP_yBrjRKjj4qjHpjxhQGk0rsBS_vo2oYq0UtueqrDmkEUFe06wtS68VhjhmGOrdLZrSX-fZQ1woZP9XB509cjL98xrB7E76UI')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background-dark/60 to-transparent" />
              <div className="absolute left-8 top-8">
                <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-background-dark uppercase">
                  Featured Venue
                </span>
                <h4 className="mt-2 text-3xl font-bold text-white">
                  The Emerald Estate
                </h4>
                <p className="mt-2 max-w-xs text-sm font-light text-slate-200">
                  Available for private viewings and corporate retreats. Our
                  specialists are ready to coordinate your visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-background-dark px-8 py-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <Image
              src="/logo.PNG"
              alt="Saffron Gardens Logo"
              width={20}
              height={20}
              className="size-5 object-contain"
            />
            <h2 className="text-sm font-bold tracking-widest uppercase">
              Saffron Gardens
            </h2>
          </div>

          <div className="flex gap-8 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
            <Link
              className="transition-colors hover:text-primary"
              href="/contact"
            >
              Privacy
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="/contact"
            >
              Terms
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="mailto:concierge@saffrongardens.com?subject=Legal%20Inquiry"
            >
              Legal
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="mailto:press@saffrongardens.com?subject=Press%20Inquiry"
            >
              Press
            </Link>
          </div>

          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            © 2024 Saffron Gardens Group
          </p>
        </div>
      </footer>
    </div>
  );
}
