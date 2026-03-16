import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";

const filterOptions = ["All Events", "Weddings", "Corporate", "Floral"];

const galleryItems = [
  {
    title: "Golden Anniversary Highlights",
    category: "Film",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBv6navSiJ9Hxqz4kJF2nzzTAtVmBP4uzIemNprHIccRdT-mtHLHZNvjlX4rlt48VhmUvJSxpNOmQtUrVNQdEb2TryJHAIflnZWJtNv3xTOV0EXh3Ui4i0BAjjbsiGkh-5OWqHai5E7VGt4bt6EMGQbFGushL42kzezv1F1wMtEsmYgBNsrYoGnns_pWVE3q0v1W240p0jgHL7qTRvmsRZdHZmmI903w6_Ivw1-y1i9gn7u_xRfsLyu-gN1hmd3gBxtY0pAp5sGYpI",
    aspect: "aspect-[4/5]",
    isVideo: true,
  },
  {
    title: "White Rose Garden Arch",
    category: "Floral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6UPPOAD_cZz3KViivY5WuNxzScw1BtHrL8Sjra3Dmf2UV53JcziJ7oVBE71_gG7Eqiyjvhp9gIWjoqeuOPjGaM2VC8F--YYOYAn_cFQcchw1abnypD_cSdFAC5UuiiqLgHtvr3Et9ThgXi9MqkY885UsAytuP0vAVJywOquat4BXFgdeLoszKTMLZ6TWsxE3m9pOgEcBLq-En6c8E0qCk_6iUjYEdEspRfTTHrlFXYXe9B_-Tx9A2GpsgreI0ZD9kuEkZ1yiTrM8",
    aspect: "aspect-square",
  },
  {
    title: "Tech Summit 2023 Gala",
    category: "Corporate",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXL0zOrwwTirycfHQQ84JtPTaq6vikfa8cmZBwQIWcNj2hsE6mGqEgock5f_vZehO8ubT-qVvrOzSrHJ3MyBVXRJZaE77ULJAEolOeVdiBWWp4ZDuPWrePI8LnjmYf0nRoTHnbuGm6X64dID4wu5Uj-0UBSnwAl-q8bsnS_aACE9ZXQsDMr4U8kkFJGWs9WxaIfXjD9N-GkTc9YRaft6iks5pN8KfFMbM8cXxnx7E62REPXxQSJzbjkeCnLhaK9dcpSnq5_1xpis",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Autumnal Reception Details",
    category: "Weddings",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUrtjS3o9gbbzWq4xw0X86c-PcAISoyPhtM_8DRLM6k2EWg5L5h3GxCaCxEFkwSNBzLxDdNY9q5roSiRrGpSsAicoK5FIkyabW8SRJICWkE5jSdFGtNOSsvL0SqS0d92C2TkWo4FwX2q3XYJu8wgBLYfbDtf1f8jq3N35uCO00X_p7Y5K-6aoNcf7uxSgrv9jCPWGN3odTYXYGNz4nC5koIZIXnOQ8IZhrnGKy_7QDt2IHV0AgVGKgRVHs9_gBWTHn_zW85THEzHQ",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Tropical Paradise Showcase",
    category: "Floral",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgRFo4_lS_eyJ66JMqrKKFZpnNJa9cyU1vlz2IoT6xhATudwHqQt5CNcpV-cY_qARnVBbCemsoOCvrsQ0frRrbxDxpnL7-xYWsKrr7hOe_-NaeiRKvFokbYOZnF2yfW60IF24b2UR8Z_TO-VMlQjGoANJanmw6K-zzn04Tzf3tU6XSi1FjQX45kAs6pX6pHOkPK_lfdB2L7rAb7HCx8wKHRmaoA-kEXR6pIzSnzxJDUQPjLDcOKTP5aw6HQs_e-uM46VY16eIggwY",
    aspect: "aspect-square",
  },
  {
    title: "Luxury Brand Launch",
    category: "Film",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3gl3wG-6mVu3KfkCWNBOhwGM8yDsF-yu63WVux71Y2iiGYlNvE5yslTHW-Lm_k2jeuEAVTKyma7N_8CABTwL7AE6OfrwflpU9GVj8p6VD5CcnLA3G3XWAsEzTMoMFScBZnKmW2CLTBJXcquuH5nl7y3QueedzzdChS9TOOE_NOajMB877mBvWUwqO_SsueAegK9NCpaKlbtVdhaPG7uSgkP2ch4UqFFewvUWlcQgYPRIeZ2qpJbXYbbPvTiLofL56XntPaJwGlk",
    aspect: "aspect-[9/16]",
    isVideo: true,
  },
  {
    title: "Artisanal Wedding Cakes",
    category: "Weddings",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMbQu688C2MoTgGWnstqrx5D-0oUQZcvTdYu8_7EB5maDlgE_c0YXyNKGYUGu63oFwuQuhUZAdTFQz8pYLog9D69xQnMKhf_9fs6jniDlca98osWvJ0y7D2g4OxrzU52D-WVRYV3m--vumh_4CYNJhsgpKlNrzg_iDxJOH5_ExJxg2DFNp1cIkprmVOu-8v2YpD_Pu_WoEf9m1v4UBspY506hI6azNgcab0E7mBR8MqyYLR0Z37i3wJrwRO7KPR7jsJY-rqhVmCYE",
    aspect: "aspect-square",
  },
  {
    title: "Annual Garden Retreat",
    category: "Corporate",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN-sVy6Qv4mvD-_R-_is6kleJtPZGfPnzu0bRH6yjyBnnUKrfdx-9i67QICxEsiOVuaK6OujcOSmspo3mN54BpFjQHLhvdmMblrC7FBPXttc8nstHXUjfqkxthIoaR8oHZz1QAGYnkzStz8yrRc6ASH4Fd0F_49XGzEdaUp3OB-w4_l9BjSP9iEFTSdROXpTPyWyvLet6S9hmvFNLg32zQaa4HQt8fMLoOLmb0aSZaiqhD_dzWo71nOwpTOVx9Is86bj47cKXjE7o",
    aspect: "aspect-[4/3]",
  },
];

export const metadata = {
  title: "Gallery | Saffron Gardens",
};

export default async function GalleryPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawQueryParam = resolvedSearchParams?.q;
  const searchQueryRaw =
    typeof rawQueryParam === "string"
      ? rawQueryParam
      : Array.isArray(rawQueryParam)
        ? (rawQueryParam[0] ?? "")
        : "";
  const searchQuery = searchQueryRaw.trim().toLowerCase();
  const filteredGalleryItems = searchQuery
    ? galleryItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery),
      )
    : galleryItems;

  return (
    <div className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <PublicHeader currentPath="/gallery" searchQuery={searchQueryRaw} />

      <main className="w-full px-6 pb-16 pt-28 md:px-10 lg:px-20">
        <section className="mx-auto mb-12 w-full max-w-[1400px]">
          <div
            className="group relative min-h-[320px] overflow-hidden rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmFtv5-hCXDu7j0f_AP8rRvS4wRAhkXaeUnI-27xrDoXUgusOHwrEaQSXZ2BVHm_z3d4SgwuYbDsdJ-QTZpH6IE-LBi7JaPKR7O_8f-sCgtuJPOuiC6b0j0K1a9su-o5o6hmqVUQCgR0nyJ1R6p4FFov2rTYgoP0KGmH47Hep9c2JgLncJQMzXFNxgKGGAZ6AiQNgIHeEsP7Y5RkW6EBepsX8GnTll85KGxWDSwBi2p4fpy9vwyOXPE4Z6HxPcHPG9FrH--93kJb0")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
            <div className="relative p-8 md:p-12">
              <span className="mb-4 inline-block rounded bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-background-dark">
                The Collection
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                Event Gallery
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-300">
                Experience the artistry of luxury celebrations. From intimate
                floral showcases to grand corporate galas.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-12 flex w-full max-w-[1400px] flex-col justify-between gap-6 border-b border-slate-200 pb-8 dark:border-primary/10 md:flex-row md:items-center">
          <div className="flex w-fit gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/50">
            {filterOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
                  index === 0
                    ? "bg-primary font-bold text-background-dark shadow-lg shadow-primary/10"
                    : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-primary/60">
            <span className="text-xs font-bold uppercase tracking-wider">
              Sort by:
            </span>
            <select className="cursor-pointer border-none bg-transparent text-sm font-bold text-slate-900 focus:ring-0 dark:text-slate-100">
              <option>Latest First</option>
              <option>Oldest First</option>
              <option>By Popularity</option>
            </select>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-[1400px]"
          aria-label="Gallery items"
        >
          <p className="mb-5 text-sm text-slate-500 dark:text-primary/40">
            {searchQuery
              ? `Showing ${filteredGalleryItems.length} result${filteredGalleryItems.length === 1 ? "" : "s"} for "${searchQueryRaw}"`
              : `Showing all ${galleryItems.length} events`}
          </p>
          <div
            className="columns-1 gap-6 md:columns-2 lg:columns-3"
            style={{ columnGap: "1.5rem" }}
          >
            {filteredGalleryItems.map((item) => (
              <article
                key={item.title}
                className="group relative mb-6 cursor-pointer overflow-hidden rounded-xl bg-slate-200 break-inside-avoid dark:bg-slate-800"
              >
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${item.isVideo ? "bg-black/30 group-hover:bg-black/10" : "bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100"}`}
                  />
                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-sm font-bold text-background-dark shadow-2xl transition-transform group-hover:scale-105">
                        PLAY
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-dark to-transparent p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-1 text-xs font-bold uppercase text-primary">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
              </article>
            ))}
            {filteredGalleryItems.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-slate-500 dark:text-slate-300">
                No events found for &quot;{searchQueryRaw}&quot;.
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mb-16 mt-20 w-full max-w-[1400px] border-t border-slate-200 pt-16 text-center dark:border-primary/10">
          <button
            type="button"
            className="rounded-xl border-2 border-primary px-12 py-4 font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-background-dark"
          >
            Explore Full Archive
          </button>
          <p className="mt-6 text-sm text-slate-500 dark:text-primary/40">
            Viewing 8 of 142 luxury event galleries
          </p>
        </section>
      </main>

      <footer className="mt-12 bg-slate-100 px-6 py-20 dark:bg-slate-900 md:px-20">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <span className="text-2xl font-extrabold uppercase tracking-tight">
                  Saffron Gardens
                </span>
              </Link>
            </div>
            <p className="mb-8 max-w-sm text-slate-500 dark:text-slate-400">
              Built with care for crafting unforgettable experiences in the
              world&apos;s most beautiful venues.
            </p>
            <div className="flex gap-4">
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-primary hover:text-background-dark dark:bg-slate-800"
                href="https://instagram.com/the_saffron_gardens"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Saffron Gardens on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-primary hover:text-background-dark dark:bg-slate-800"
                href="#"
              >
                SH
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/gallery"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/about-services"
                >
                  The Venues
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/about-services"
                >
                  Floral Design
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/about-services"
                >
                  Planning
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary">
              Contact
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/contact"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Press Inquiries
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-20 w-full max-w-[1400px] border-t border-slate-200 pt-8 text-center text-xs text-slate-400 dark:border-primary/5">
          © 2024 Saffron Gardens International Events. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
