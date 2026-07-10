"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

// スクロールに連動して現在のセクションを判定し、
// 画面右のドットとヘッダーのナビをハイライトする。
export default function SectionNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ヘッダーの該当リンクへ active クラスを反映
  useEffect(() => {
    SECTIONS.forEach((s) => {
      const link = document.querySelector(`header nav a[href="#${s.id}"]`);
      if (link) link.classList.toggle("active", s.id === active);
    });
  }, [active]);

  return (
    <nav className="section-nav" aria-label="セクションナビゲーション">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-dot${active === s.id ? " active" : ""}`}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="section-dot-label">{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
