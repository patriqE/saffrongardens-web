import { CtaSection, ServiceCardsSection } from "@/components/public/sections";

export const metadata = {
  title: "About & Services | Saffron Gardens",
};

export default function AboutServicesPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-saffron/90">
          About Us
        </p>
        <h1 className="mt-3 font-heading text-4xl text-white">
          A venue team built around detail.
        </h1>
        <p className="mt-4 max-w-3xl text-white/75">
          Saffron Gardens is an event destination for weddings, private galas,
          cultural ceremonies, and premium brand gatherings. We pair timeless
          architecture with modern production standards so every event feels
          effortless to guests and controlled behind the scenes.
        </p>
      </section>

      <ServiceCardsSection />
      <CtaSection />
    </div>
  );
}
