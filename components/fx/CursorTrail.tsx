"use client";

import { useEffect, useRef } from "react";

// カーソルの軌跡（尾を引くトレイル）。
// canvas にカーソルの通り道を描き、古い点ほど細く薄くフェードさせる。
// タッチ端末と reduced-motion では無効化する。
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    type Point = { x: number; y: number; life: number };
    const points: Point[] = [];

    const onMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.length > 60) points.shift();
    };
    document.addEventListener("mousemove", onMove);

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 経過で寿命を減らし、尽きた古い点から捨てる
      for (const p of points) p.life -= 0.045;
      while (points.length && points[0].life <= 0) points.shift();

      if (points.length > 1) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#ffffff";
        for (let i = 1; i < points.length; i++) {
          const a = points[i - 1];
          const b = points[i];
          const life = Math.max(0, b.life);
          ctx.globalAlpha = life * 0.55;
          ctx.lineWidth = 7 * life * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x * dpr, a.y * dpr);
          ctx.lineTo(b.x * dpr, b.y * dpr);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}
