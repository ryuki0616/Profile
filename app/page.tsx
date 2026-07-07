import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import ThreeBackground from "@/components/ThreeBackground";
import SiteExtras from "@/components/SiteExtras";
import Terminal from "@/components/terminal/Terminal";

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <CustomCursor />
      <ScrollReveal />
      <SiteExtras />
      <Terminal />
      <Header />
      <main>
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
