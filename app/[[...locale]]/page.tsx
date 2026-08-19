import dynamic from "next/dynamic";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { localeFromSegments } from "@/lib/i18n/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionShell from "@/components/perf/SectionShell";

/* Ekrandan pastdagi boʻlimlar alohida JS-chunk'larga ajratiladi.
   `ssr` yoqilgan holicha qoladi — HTML server tomonda hosil boʻladi,
   ya'ni SEO va koʻrinish oʻzgarmaydi. Faqat brauzerdagi hydration
   bitta ulkan vazifa oʻrniga kichik boʻlaklarga boʻlinadi. */
const Prefers = dynamic(() => import("@/components/Prefers"));
const PartnerTimeline = dynamic(() => import("@/components/partner/PartnerTimeline"));
const Requirements = dynamic(() => import("@/components/requirements/Requirements"));
const ServiceSection = dynamic(() => import("@/components/service/ServiceSection"));
const IncomeSplit = dynamic(() => import("@/components/income/IncomeSplit"));
const HowItWorks = dynamic(() => import("@/components/howitworks/HowItWorks"));
const OnboardingFlow = dynamic(() => import("@/components/onboarding/OnboardingFlow"));
const PrepChecklist = dynamic(() => import("@/components/checklist/PrepChecklist"));
const Region = dynamic(() => import("@/components/region/Region"));
const Quality = dynamic(() => import("@/components/quality/Quality"));
const Faq = dynamic(() => import("@/components/faq/Faq"));
const FinalCta = dynamic(() => import("@/components/cta/FinalCta"));
const Footer = dynamic(() => import("@/components/footer/Footer"));

/* Uchala til ham build vaqtida statik sahifaga aylanadi:
   "/" (uz), "/ru", "/cy". Server hech nimani qayta hisoblamaydi. */
export function generateStaticParams() {
  return LOCALES.map((locale) =>
    locale === DEFAULT_LOCALE ? { locale: [] } : { locale: [locale] },
  );
}

/* Roʻyxatda yoʻq manzil (masalan "/foo") 404 qaytaradi */
export const dynamicParams = false;

export default function Page({ params }: { params: { locale?: string[] } }) {
  if (!localeFromSegments(params.locale)) notFound();

  return (
    <main id="asosiy" className="relative min-h-screen w-full overflow-hidden bg-page">
      {/* Hero ham oʻralgan: sahifa pastiga surilganda uning bezak
          animatsiyalari ham toʻxtaydi. `defer={false}` — ichkarida
          `position: fixed` header bor, unga containment qoʻllab
          boʻlmaydi. */}
      <SectionShell defer={false}>
        <div className="hero-canvas relative">
          <Navbar />
          <Hero />
        </div>
      </SectionShell>

      {/* Birinchi ekranga yaqin — kechiktirilmaydi */}
      <SectionShell defer={false}>
        <About />
      </SectionShell>

      {/* Har bir <Suspense> alohida hydration chegarasi — React ular
          orasida "nafas oladi", uzun bloklovchi vazifalar boʻlinadi. */}
      <Suspense>
        <SectionShell minHeight={1100}>
          <Prefers />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1600}>
          <PartnerTimeline />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1200}>
          <Requirements />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1000}>
          <ServiceSection />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1200}>
          <IncomeSplit />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1600}>
          <HowItWorks />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1600}>
          <OnboardingFlow />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1600}>
          <PrepChecklist />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1200}>
          <Region />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1400}>
          <Quality />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={1200}>
          <Faq />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={800}>
          <FinalCta />
        </SectionShell>
      </Suspense>
      <Suspense>
        <SectionShell minHeight={900}>
          <Footer />
        </SectionShell>
      </Suspense>
    </main>
  );
}
