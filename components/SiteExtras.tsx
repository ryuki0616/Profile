"use client";

import { useEffect } from "react";

// 旧 main.js: Vi 風スクロール (J/K) とコンソールの隠しメッセージ
export default function SiteExtras() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      if (active && ["INPUT", "TEXTAREA"].includes(active.tagName)) return;
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

      const scrollAmount = 100;
      if (e.key.toLowerCase() === "j") {
        window.scrollBy({ top: scrollAmount, behavior: "smooth" });
      } else if (e.key.toLowerCase() === "k") {
        window.scrollBy({ top: -scrollAmount, behavior: "smooth" });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    console.log(
      "%c Hello, Developer! \n%c Welcome to Ryuki's Profile. You found the secret console logs!",
      "color: #0f0; background: #000; font-size: 24px; padding: 10px; border-radius: 5px;",
      "color: #ccc; font-size: 14px; margin-top: 10px;"
    );
    console.log(
      "%c Warning: High level of passion for technology detected.",
      "color: orange; font-weight: bold;"
    );
    console.log(
      "%c If you are looking for a software engineer who loves creating smiles, contact me: ryu727tmm19@gmail.com",
      "color: cyan; font-style: italic;"
    );
  }, []);

  return null;
}
