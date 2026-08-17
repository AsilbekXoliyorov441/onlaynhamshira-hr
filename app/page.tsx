import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main className="hero-canvas relative min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
    </main>
  );
}
