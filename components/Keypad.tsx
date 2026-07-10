"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  NOTES,
  PASSCODE_LENGTH,
  INDEX_PASSCODE,
  INDEX_PATH,
  INDEX_FLAG,
} from "./secret/notes";
import useFocusTrap from "./useFocusTrap";

// パスコード風キーパッド。入力したパスコードに対応するメモを解錠し、
// そのページへ直行する（パスコードごとに見られるメモが異なる）。
// 予約コード "0000" は一覧ページへ飛ぶ。
// 注意: 判定はクライアント側で行うため本物のセキュリティではない。
// 機密情報のガードには使わないこと。パスコードは components/secret/notes.ts を編集。
const LENGTH = PASSCODE_LENGTH;
const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// 正解時の遷移先。unlockId があればその id を解錠、setIndex なら一覧を許可。
type Target = { path: string; unlockId?: string; setIndex?: boolean };

export default function Keypad({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const matchRef = useRef<Target | null>(null);

  const press = useCallback((digit: string) => {
    setEntry((prev) => {
      if (prev.length >= LENGTH) return prev;
      const next = prev + digit;
      if (next.length === LENGTH) {
        if (next === INDEX_PASSCODE) {
          matchRef.current = { path: INDEX_PATH, setIndex: true };
          setStatus("success");
        } else {
          const note = NOTES.find((n) => n.passcode === next);
          if (note) {
            matchRef.current = { path: note.path, unlockId: note.id };
            setStatus("success");
          } else {
            setStatus("error");
            window.setTimeout(() => {
              setEntry("");
              setStatus("idle");
            }, 600);
          }
        }
      } else {
        setStatus("idle");
      }
      return next;
    });
  }, []);

  const backspace = useCallback(() => {
    setStatus("idle");
    setEntry((prev) => prev.slice(0, -1));
  }, []);

  // ポータル用: マウント後にのみ描画する
  useEffect(() => {
    setMounted(true);
  }, []);

  // 正解: 該当フラグを立て、少し見せてから遷移先ページへ移動
  useEffect(() => {
    if (status !== "success") return;
    const target = matchRef.current;
    if (!target) return;
    try {
      if (target.unlockId) {
        sessionStorage.setItem(`rs-unlock-${target.unlockId}`, "1");
      }
      if (target.setIndex) {
        sessionStorage.setItem(INDEX_FLAG, "1");
      }
    } catch {
      /* sessionStorage 不可の環境でも遷移は行う */
    }
    const t = window.setTimeout(() => {
      router.push(target.path);
    }, 900);
    return () => window.clearTimeout(t);
  }, [status, router]);

  // ESC で閉じ、数字キー入力にも対応、背面スクロールをロック
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key >= "0" && e.key <= "9") {
        press(e.key);
      } else if (e.key === "Backspace") {
        backspace();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, press, backspace]);

  // パネル内にフォーカスを閉じ込め、閉じたら開いた要素へ戻す
  useFocusTrap(panelRef, mounted);

  if (!mounted) return null;

  return createPortal(
    <div
      className="keypad-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="パスコード入力"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`keypad${status === "error" ? " keypad-error" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="keypad-close"
          onClick={onClose}
          aria-label="閉じる"
          data-hover
        >
          ×
        </button>

        {status === "success" ? (
          <div className="keypad-result">
            <div className="keypad-result-icon" aria-hidden="true">
              ✓
            </div>
            <p className="keypad-result-title">ACCESS GRANTED</p>
            <p className="keypad-result-text">ページへ移動しています…</p>
          </div>
        ) : (
          <>
            <p className="keypad-title">Enter Passcode</p>
            <div className="keypad-dots" aria-hidden="true">
              {Array.from({ length: LENGTH }).map((_, i) => (
                <span
                  key={i}
                  className={`keypad-dot${i < entry.length ? " filled" : ""}`}
                />
              ))}
            </div>
            <div className="keypad-grid">
              {DIGITS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className="keypad-key"
                  onClick={() => press(d)}
                  aria-label={d}
                  data-hover
                >
                  {d}
                </button>
              ))}
              <span className="keypad-key keypad-key-empty" aria-hidden="true" />
              <button
                type="button"
                className="keypad-key"
                onClick={() => press("0")}
                aria-label="0"
                data-hover
              >
                0
              </button>
              <button
                type="button"
                className="keypad-key keypad-key-back"
                onClick={backspace}
                aria-label="1文字削除"
                data-hover
              >
                ⌫
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
