import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about-services", label: "About & Services" },
  { href: "/contact", label: "Contact" },
  { href: "/#booking", label: "Book Tour" },
];

export default function PublicHeader({ currentPath = "/", searchQuery = "" }) {
  const showGallerySearch = currentPath === "/gallery";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md py-4">
      <div className="flex w-full items-center justify-start gap-8 px-6 lg:gap-12 lg:px-20">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <Image
            src="/logo.PNG"
            alt="Saffron Gardens Logo"
            width={32}
            height={32}
            className="size-8 object-contain rounded"
            priority
          />
          <h2 className="text-slate-100 text-xl font-extrabold tracking-tighter uppercase">
            Saffron Gardens
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => {
            const isActive =
              item.href === "/gallery"
                ? currentPath === "/gallery"
                : item.href === "/about-services"
                  ? currentPath === "/about-services"
                  : item.href === "/contact"
                    ? currentPath === "/contact"
                    : false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-slate-300 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {showGallerySearch && (
          <form
            action="/gallery"
            method="get"
            className="ml-auto hidden md:flex h-10 w-full max-w-xs items-center overflow-hidden rounded-lg border border-white/15 bg-white/5"
          >
            <span className="flex h-full items-center px-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search events..."
              className="h-full w-full border-none bg-transparent px-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
              aria-label="Search gallery events"
            />
          </form>
        )}
      </div>
    </header>
  );
}
