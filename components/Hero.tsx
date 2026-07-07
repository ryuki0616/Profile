"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 文字パララックス（旧 main.js §5）
  useEffect(() => {
    const onScroll = () => {
      const title = titleRef.current;
      if (!title) return;
      const scrolled = window.pageYOffset;
      title.style.transform = `translateY(${scrolled * 0.4}px)`;
      title.style.opacity = String(1 - scrolled / 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero container">
      <div className="fade-in-up delay-100">
        <h1 className="hero-title" ref={titleRef}>
          ITで、笑顔をつくる。
        </h1>
        <p className="hero-desc">
          年齢や性別を問わず、誰もが使いやすく、楽しめる技術を。
          <br />
          シンプルで直感的な体験をデザインします。
        </p>

        <div className="hero-icons">
          <i className="fas fa-wifi" title="NFC/RFID" data-hover></i>
          <i className="fas fa-mobile-alt" title="Mobile" data-hover></i>
          <i className="fas fa-smile" title="Smile" data-hover></i>
        </div>

        <div className="nfc-badge" data-hover>
          <i className="fas fa-rss"></i> NFC / RFID Enthusiast
        </div>

        <div className="terminal-shortcut-hint">
          <i className="fas fa-keyboard"></i> Press{" "}
          <span className="shortcut-key">Ctrl + Alt + T</span> for Terminal
        </div>
      </div>
    </section>
  );
}
