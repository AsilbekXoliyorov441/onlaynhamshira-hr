import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Page() {
  return (
    <main className="hero-canvas relative min-h-screen w-full overflow-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
