"use client";

import { useEffect, useRef } from "react";

// 十字（クロスヘア）カーソル + コンテキストラベル。
// lerp で滑らかに追従。リンク/ボタン上では 45° 回して × に。
// data-cursor="VIEW" などを持つ要素の上ではラベルを表示する。
// タッチ端末と reduced-motion では無効化して通常カーソルに任せる。
export default function CustomCursor() {
  const crossRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cross = crossRef.current;
    const label = labelRef.current;
    if (!cross || !label) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let shown = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!shown) {
        shown = true;
        cross.style.opacity = "1";
      }
    };

    const isHoverTarget = (target: EventTarget | null) =>
      target instanceof Element && target.closest("[data-hover], a, button");

    // 子要素へ移動しただけの mouseout を無視するためのヘルパー
    const stillInside = (el: Element, related: EventTarget | null) =>
      related instanceof Node && el.contains(related);

    const onOver = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) cross.classList.add("cursor-cross-hover");

      const labeled =
        e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      if (labeled) {
        label.textContent = labeled.getAttribute("data-cursor") || "";
        label.classList.add("cursor-label-active");
        cross.classList.add("cursor-cross-min");
      }
    };

    const onOut = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) cross.classList.remove("cursor-cross-hover");

      const labeled =
        e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      if (labeled && !stillInside(labeled, e.relatedTarget)) {
        label.classList.remove("cursor-label-active");
        cross.classList.remove("cursor-cross-min");
      }
    };

    const render = () => {
      x += (mouseX - x) * 0.2;
      y += (mouseY - y) * 0.2;
      cross.style.left = `${x}px`;
      cross.style.top = `${y}px`;
      label.style.left = `${mouseX}px`;
      label.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(render);
    };
    render();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={crossRef} className="cursor-cross" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
