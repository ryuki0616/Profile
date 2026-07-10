"use client";

import { useEffect, useRef } from "react";
import Magnetic from "../fx/Magnetic";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 文字パララックス（reduced-motion 設定時は無効化）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const title = titleRef.current;
      if (!title) return;
      const scrolled = window.pageYOffset;
      title.style.transform = `translateY(${scrolled * 0.3}px)`;
      title.style.opacity = String(Math.max(0, 1 - scrolled / 500));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="hero container">
      <div className="hero-inner">
        <div className="hero-eyebrow reveal reveal-1">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          Software Engineer
        </div>

        <div className="reveal reveal-2">
          <h1 className="hero-title" ref={titleRef}>
            ITで、笑顔をつくる。
          </h1>
        </div>

        <p className="hero-desc reveal reveal-3">
          年齢や性別を問わず、誰もが使いやすく、楽しめる技術を。
          <br />
          シンプルで直感的な体験をデザインします。
        </p>

        <div className="hero-cta reveal reveal-4">
          <Magnetic>
            <a href="#works" className="btn btn-primary" data-hover>
              作品を見る
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-ghost" data-hover>
              お問い合わせ
            </a>
          </Magnetic>
        </div>

        <div className="hero-icons reveal reveal-5">
          <i className="fas fa-wifi" title="NFC/RFID" aria-label="NFC/RFID" role="img" data-hover></i>
          <i className="fas fa-mobile-alt" title="Mobile" aria-label="Mobile" role="img" data-hover></i>
          <i className="fas fa-smile" title="Smile" aria-label="Smile" role="img" data-hover></i>
        </div>

        <div className="nfc-badge reveal reveal-6" data-hover>
          <i className="fas fa-rss" aria-hidden="true"></i> NFC / RFID Enthusiast
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="下へスクロール">
        <span className="scroll-cue-text">Scroll</span>
        <span className="scroll-cue-arrow" aria-hidden="true"></span>
      </a>
    </section>
  );
}
