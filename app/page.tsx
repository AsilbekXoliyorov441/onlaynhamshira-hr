import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Prefers from "@/components/Prefers";
import PartnerTimeline from "@/components/partner/PartnerTimeline";
import ServiceSection from "@/components/service/ServiceSection";
import Requirements from "@/components/requirements/Requirements";
import IncomeSplit from "@/components/income/IncomeSplit";
import HowItWorks from "@/components/howitworks/HowItWorks";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import PrepChecklist from "@/components/checklist/PrepChecklist";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#fbfdfb]">
      <div className="hero-canvas relative">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Prefers />
      <PartnerTimeline />
      {/* Demand boʻlimi qoʻshilgach, ServiceSection oʻsha boʻlimdan keyin turadi */}
            <Requirements />

      <ServiceSection />
      <IncomeSplit />
      <HowItWorks />
      <OnboardingFlow />
      <PrepChecklist />
    </main>
  );
}
