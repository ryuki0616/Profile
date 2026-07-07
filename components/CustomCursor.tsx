"use client";

import { useEffect, useRef } from "react";

// 旧 main.js §1: カスタムカーソル。
// ホバー検知は querySelectorAll の一括バインドからイベント委譲へ変更し、
// React の再レンダリングで要素が差し替わっても追従できるようにする。
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const onMove = (e: MouseEvent) => {
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const isHoverTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest("[data-hover], a, button");

    const onOver = (e: MouseEvent) => {
      if (!isHoverTarget(e.target)) return;
      ring.style.transform = "translate(-50%, -50%) scale(2.5)";
      ring.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      ring.style.borderColor = "transparent";
    };

    const onOut = (e: MouseEvent) => {
      if (!isHoverTarget(e.target)) return;
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.backgroundColor = "transparent";
      ring.style.borderColor = "var(--text-main)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
