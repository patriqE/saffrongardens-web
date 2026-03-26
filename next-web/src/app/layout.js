import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/public/SiteShell";
import ErrorBoundary from "@/components/ErrorBoundary";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Saffron Gardens | Elegant Events",
  description: "Public showcase for Saffron Gardens event spaces and services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        <ErrorBoundary>
          <SiteShell>{children}</SiteShell>
        </ErrorBoundary>
      </body>
    </html>
  );
}
