import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CursorTrail from "@/components/CursorTrail";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import Preloader from "@/components/Preloader";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <Preloader />

      {/* スクロール進捗バー（CSS スクロール駆動アニメーション、非対応環境では非表示） */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* CSS アニメーション背景（旧 three.js パーティクルを置き換え） */}
      <div className="aurora" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <CursorTrail />
      <CustomCursor />
      <ScrollReveal />
      <Header />
      <SectionNav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
