"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/request-access", label: "Request Access" },
  { href: "/login", label: "Login" },
  { href: "/booking", label: "Booking" },
  { href: "/vendors", label: "Vendors" },
  { href: "/planner", label: "Planner" },
  { href: "/vendor-dashboard", label: "Vendor Dashboard" },
  { href: "/admin", label: "Admin" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-4 flex-wrap">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                active
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
