import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/fx/CustomCursor";
import CursorTrail from "@/components/fx/CursorTrail";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Marquee from "@/components/fx/Marquee";
import Preloader from "@/components/fx/Preloader";
import SectionNav from "@/components/fx/SectionNav";

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
