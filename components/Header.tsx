"use client";

import { useEffect, useState } from "react";
import Keypad from "./Keypad";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [keypadOpen, setKeypadOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scrolled ? "scrolled" : undefined}>
        <div className="container header-inner">
          <button
            type="button"
            className="logo"
            onClick={() => setKeypadOpen(true)}
            data-hover
            aria-haspopup="dialog"
            aria-label="パスコードを開く"
          >
            RS.
          </button>
          <nav>
            <ul>
              <li>
                <a href="#about" data-hover>
                  About
                </a>
              </li>
              <li>
                <a href="#works" data-hover>
                  Works
                </a>
              </li>
              <li>
                <a href="#contact" data-hover>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {keypadOpen && <Keypad onClose={() => setKeypadOpen(false)} />}
    </>
  );
}
