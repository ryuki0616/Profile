"use client";

import Link from "next/link";
import { useRef } from "react";
import Magnetic from "../fx/Magnetic";
import Marquee from "../fx/Marquee";

const MARQUEE_ITEMS = ["Page Not Found", "404", "Lost & Found", "Dead End"];

export default function NotFound() {
  const rigRef = useRef<HTMLSpanElement>(null);
  const swinging = useRef(false);

  // 看板をつつくと大きく揺れて減衰する（ふだんの揺れは CSS の nf-sway）
  const swing = () => {
    const el = rigRef.current;
    if (!el || swinging.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    swinging.current = true;
    el.style.animationPlayState = "paused";
    const anim = el.animate(
      [
        { rotate: "0deg" },
        { rotate: "10deg" },
        { rotate: "-8deg" },
        { rotate: "6deg" },
        { rotate: "-4deg" },
        { rotate: "2deg" },
        { rotate: "0deg" },
      ],
      { duration: 1800, easing: "ease-in-out" }
    );
    anim.onfinish = () => {
      el.style.animationPlayState = "";
      swinging.current = false;
    };
  };

  return (
    <main className="not-found">
      <div className="nf-main container">
        <p className="hero-eyebrow reveal reveal-1">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          Error 404 — Page Not Found
        </p>

        <button
          type="button"
          className="nf-sign reveal reveal-2"
          onClick={swing}
          aria-label="404 の看板。クリックすると揺れます"
        >
          <span ref={rigRef} className="nf-rig" aria-hidden="true">
            <span className="nf-ropes">
              <span />
              <span />
            </span>
            <span className="nf-board">
              <span className="nf-404">404</span>
              <span className="nf-board-label">Page Not Found</span>
            </span>
          </span>
        </button>

        <h1 className="nf-title reveal reveal-3">ここは、行き止まりです。</h1>

        <p className="nf-desc reveal reveal-4">
          お探しのページは、看板ごと外されたか、もともと存在しなかったようです。
          <br />
          看板をつつくと揺れます。
        </p>

        <div className="nf-cta reveal reveal-5">
          <Magnetic>
            <Link href="/" className="btn btn-primary">
              ホームへ帰る
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/#works" className="btn btn-ghost">
              作品を見る
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="reveal reveal-6">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </main>
  );
}
