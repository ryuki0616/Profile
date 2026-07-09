"use client";

import { useEffect, useState } from "react";

// オープニング演出。RS. ロゴとカウンター(0→100)を見せてから本編へ。
// reduced-motion では即座にスキップする。
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const duration = 1200;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(p * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        document.body.style.overflow = "";
        setDone(true);
        window.setTimeout(() => setHidden(true), 800);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader${done ? " preloader-done" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-logo">RS.</span>
        <span className="preloader-count">{count}</span>
      </div>
      <div className="preloader-bar">
        <span className="preloader-bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
