import {
  CtaSection,
  HeroSection,
  ServiceCardsSection,
} from "@/components/public/sections";

export const metadata = {
  title: "Home | Saffron Gardens",
};

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <ServiceCardsSection />
      <CtaSection />
    </div>
  );
}
