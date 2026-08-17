import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Prefers from "@/components/Prefers";
import PartnerTimeline from "@/components/partner/PartnerTimeline";

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
    </main>
  );
}
