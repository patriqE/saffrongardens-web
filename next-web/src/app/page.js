import Image from "next/image";
import PublicHeader from "@/components/public/PublicHeader";

export const metadata = {
  title: "Home | Saffron Gardens",
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col font-display text-slate-900 dark:text-slate-100 bg-background-light dark:bg-background-dark antialiased overflow-x-hidden">
      <PublicHeader currentPath="/" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-background-dark/20 to-background-dark z-10"></div>
            <div
              className="w-full h-full bg-cover bg-center scale-105"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHQlyCPgHqzkn17fMo28lxTHHD0_q9wG0zD2pmdgo8QBXeAwHLeGYCbYt-djwOPV9U_0Hp8b9avGLFYXfUXViRv4f9CW3KkRnVKXrsPUGn94FxhtDX8aLcw8c0gu0JttLiLBADKh8CpfsYGEcI5DHa4qSGKoAOSte8vjyjr2IexdHx74R4u6daE9EgXUaW5NhhlDEC5TPPTmZFFKuWwmidLTwIpwP2vFPYQ2CzcYLitlaYDlus0IbQVOoKz65ZJMEb9TXEMdri6dk")',
              }}
            ></div>
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <span className="inline-block text-primary text-sm font-bold tracking-[0.3em] uppercase mb-6 opacity-90">
              The Pinnacle of Elegance
            </span>
            <h1 className="text-slate-100 text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8">
              Exquisite Moments <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">
                Defined.
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Experience the prestige of Saffron Gardens. A cinematic sanctuary
              designed for the world&apos;s most discerning guests and
              unforgettable celebrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto min-w-[200px] h-14 bg-primary text-background-dark rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/10">
                Book Private Tour
              </button>
              <button className="w-full sm:w-auto min-w-[200px] h-14 bg-white/5 backdrop-blur-md border border-white/10 text-slate-100 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
                View Showcase
              </button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <span className="material-symbols-outlined text-slate-400 text-3xl">
              expand_more
            </span>
          </div>
        </section>

        {/* Services Section */}
        <section
          className="py-24 px-6 lg:px-20 bg-background-dark"
          id="services"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
                  Our Services
                </h2>
                <h3 className="text-slate-100 text-4xl md:text-5xl font-bold leading-tight">
                  Tailored experiences for life&apos;s precious moments.
                </h3>
              </div>
              <p className="text-slate-400 text-lg max-w-md">
                Every detail curated by artisans of hospitality to ensure
                perfection for your unique vision.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-white/5 p-1 border border-white/10 hover:border-primary/50 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA_W760uspRT-uXrfLqVb8_33uyW9Bf_yHEkC-XEWkzsXVNJaf3X6lcajzdaA-PuKiGzrtQ-apZug-k6HxQmt1j2hQeYQVwZ9fw-eK-OOI6wTHwn6TJ6mSCuleqFGdgSKfdRuu5dW-IH8y9aL4_qANscAiGz8BAeTPl5TRf7Glxv31FLZheWgt4MBbHWUKSl6xwSuCNLKLOsUowYvc2uYzecG8ih76_2KYDRT5iI5-unSFOtmSTUA3zvqyzEmjD2Th7zF4RxlAI24")',
                    }}
                  ></div>
                </div>
                <div className="px-6 pb-8">
                  <h4 className="text-slate-100 text-2xl font-bold mb-3">
                    Bespoke Catering
                  </h4>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    A culinary journey curated by Michelin-star chefs, featuring
                    seasonal flavors and artistic presentation.
                  </p>
                  <a
                    className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                    href="#"
                  >
                    Learn More{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
              {/* Service 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-white/5 p-1 border border-white/10 hover:border-primary/50 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFmVV2VBEEYklin5DGOkh1CcabL5W3GCG4e874Xn7atoSVG-xvOGsbhY-JL4nkZpl1SVoMSGO5Szlqo3zBnYb2cgFFmUq6ZZybvIgNvXxULTt5qmn7ln5A_wgE-9WHBLUjAjjUVshVjx0F2CjuoScL3wReoH3x0C8BbbS4jcrZxEg6G0X3q7uddszYvGc_hBjhdkzRZyWJOttuyY4v8-9IiJKUxHaHKWw95SQuWFF5QPHcVfR4rbZ45pDfp0JLTVm1LO3FvnCPWeI")',
                    }}
                  ></div>
                </div>
                <div className="px-6 pb-8">
                  <h4 className="text-slate-100 text-2xl font-bold mb-3">
                    Private Concierge
                  </h4>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Dedicated planning staff available 24/7 to manage every
                    logistical nuance with absolute discretion.
                  </p>
                  <a
                    className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                    href="#"
                  >
                    Learn More{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
              {/* Service 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-white/5 p-1 border border-white/10 hover:border-primary/50 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvIOxGI5LqqTvwm4EmhS0ZkGie58PmanNIMklXzG8P5sZ1hQ0kjNpVdHLFAkpYt4emqi-tlbCoLP4nEMydM16Pi1SQ2D5nJGmNWTrjvq_KdHk1LYqsX7LL44aa34sKrLBDFrCdvAtYfnenrfwrg3qBEzMx2bDG1gvLjBAv8MB_vUODcNVdbD5csrSsVOUbdiMLw48nlnrWa3f1LMNWaV1bjTLNSgIqapFvF5jH2K3DJTp_u0_gBom7mYP46zY9OFxpoHBErYthKCQ")',
                    }}
                  ></div>
                </div>
                <div className="px-6 pb-8">
                  <h4 className="text-slate-100 text-2xl font-bold mb-3">
                    Artisanal Decor
                  </h4>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Custom floral and light arrangements designed by
                    award-winning visual artists to set the mood.
                  </p>
                  <a
                    className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                    href="#"
                  >
                    Learn More{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Horizontal Scroll */}
        <section
          className="py-24 bg-white/5 border-y border-white/5 overflow-hidden"
          id="gallery"
        >
          <div className="px-6 lg:px-20 mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-4">
                The Portfolio
              </h2>
              <h3 className="text-slate-100 text-4xl font-bold">
                Unrivaled Settings
              </h3>
            </div>
            <div className="flex gap-2">
              <button className="size-12 rounded-full border border-white/20 flex items-center justify-center text-slate-100 hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-12 rounded-full border border-white/20 flex items-center justify-center text-slate-100 hover:bg-primary hover:text-background-dark transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-8 px-6 lg:px-20 pb-10 no-scrollbar">
            {/* Gallery Items */}
            <div className="flex-none w-[400px] md:w-[600px] group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-2xl">
                <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-transparent transition-all"></div>
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAXpnMrYJN8pqKkXLqG0IP--1jiBjV9KUeYxbwGNILLJtCRCujW92kiOYvhtmrfE4USgmDwZkXIrGWRLKp1FRShCVEMq0GNVUS03fUEty4k6i56fx08baVS4q9H2NLJxp-85A_rfg1Z_a45JGUSn9v1_75TK_qK-Vrjf4bOqNWn8qAKyLsetOd4O15SISvYaZasH1-qAxifDOsyZHB8oMC_IVQVeYCeOZhS1-5V9gUEItoEPDxTRXOLOvgQEj4FqNEy3qOZm05WFs")',
                  }}
                ></div>
              </div>
              <h5 className="text-slate-100 text-xl font-bold">
                The Imperial Hall
              </h5>
              <p className="text-primary/70 text-sm tracking-wide">
                Grandeur Redefined • Capacity: 500 Guests
              </p>
            </div>
            <div className="flex-none w-[400px] md:w-[600px] group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-2xl">
                <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-transparent transition-all"></div>
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbfN_eyqmBZhwZ2xtIWQw2UFfOu749AhysFijwxEAcq3DihlBKGO60kQWyu-xshSOutWvKcpnY9Ztm_kwjI0iya-xnWTBePH8SwpeE01fn01VPmu-VcX4kaFaby6X-9cZqhxXUV-mneb1tbvfBGk0AHpuq3JprOl2oRPSJ2NYdTRM0Efxn1RuV-eRfrzLoYSFsRhuPhmDqNAvzcdfs-sMSm6mF2wL75nweSdXpLS4EMfl6xi4oCCXcSYdyoHVpcYvPzJ4jylwHIng")',
                  }}
                ></div>
              </div>
              <h5 className="text-slate-100 text-xl font-bold">
                The Saffron Terrace
              </h5>
              <p className="text-primary/70 text-sm tracking-wide">
                Serenity in Nature • Capacity: 250 Guests
              </p>
            </div>
            <div className="flex-none w-[400px] md:w-[600px] group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-2xl">
                <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-transparent transition-all"></div>
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYLI52buDxmRy2y2wkpTPnXe0dBsXzwRGTJbsxuGbH1dCGe3opaVMhiZPEjDPUjxL-QDIPH02PLaptX-G461mONiuc9QQBB7syk_ldiYZSE20QPRO3ajczDQdwxz-ADpcp-f621rys8FUGaKmt0JN21TTKe908uS5bLunn8LCNebYI3MXsHS_kdwXx3IsDtCXTt4J9e8nJTE_8EDWi5-6YO0PxvbdztaPjNjVv3j6JAzXvHTpIG2-Cj1eFogZKfqmIuliBqTn3h8U")',
                  }}
                ></div>
              </div>
              <h5 className="text-slate-100 text-xl font-bold">
                The Gilded Lounge
              </h5>
              <p className="text-primary/70 text-sm tracking-wide">
                Intimate Luxury • Capacity: 80 Guests
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          className="py-32 px-6 lg:px-20 bg-background-dark text-center relative overflow-hidden"
          id="booking"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[40rem]">
              temple_buddhist
            </span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-slate-100 text-4xl md:text-6xl font-black mb-8">
              Begin Your Legacy.
            </h2>
            <p className="text-slate-400 text-xl font-light mb-12">
              Private tours are by invitation or request only. Experience the
              standard of luxury that Saffron Gardens offers for your next
              landmark event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-background-dark h-16 px-10 rounded-lg font-bold text-lg hover:brightness-110 shadow-2xl shadow-primary/20 transition-all">
                Request Private Invitation
              </button>
              <button className="border border-white/20 text-slate-100 h-16 px-10 rounded-lg font-bold text-lg hover:bg-white/5 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark border-t border-white/5 pt-20 pb-10 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 text-primary mb-6">
                <Image
                  src="/logo.PNG"
                  alt="Saffron Gardens Logo"
                  width={32}
                  height={32}
                  className="size-8 object-contain rounded"
                />
                <h2 className="text-slate-100 text-lg font-extrabold uppercase tracking-tighter">
                  Saffron Gardens
                </h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Defining the next era of bespoke events and cinematic luxury.
                Where every moment is a masterpiece.
              </p>
            </div>
            <div>
              <h6 className="text-slate-100 font-bold mb-6">Navigation</h6>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#gallery"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#services"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#booking"
                  >
                    Book Tour
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-slate-100 font-bold mb-6">Legal</h6>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-slate-100 font-bold mb-6">Contact</h6>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    mail
                  </span>{" "}
                  concierge@saffrongardens.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    call
                  </span>{" "}
                  +1 (800) LUX-SAFFRON
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>{" "}
                  1200 Saffron Drive, Beverly Hills
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 gap-6">
            <p className="text-slate-500 text-xs tracking-widest uppercase">
              © 2024 Saffron Gardens Group. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                className="text-slate-500 hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                className="text-slate-500 hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a
                className="text-slate-500 hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
