"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NOTES, INDEX_FLAG, isNoteActive } from "./notes";

// 解錠済みのメモを一覧表示する。
// 予約コード "0000" で一覧許可フラグが立っていれば、解錠ゼロでも開ける。
// どちらの許可も無ければトップへ戻す。
export default function SecretIndex() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    let indexAllowed = false;
    try {
      indexAllowed = sessionStorage.getItem(INDEX_FLAG) === "1";
    } catch {
      indexAllowed = false;
    }

    const ids = NOTES.filter((n) => {
      if (!isNoteActive(n)) return false; // 期限切れは一覧に出さない
      try {
        return sessionStorage.getItem(`rs-unlock-${n.id}`) === "1";
      } catch {
        return false;
      }
    }).map((n) => n.id);

    if (!indexAllowed && ids.length === 0) {
      router.replace("/");
      return;
    }
    setUnlockedIds(ids);
    setReady(true);
  }, [router]);

  if (!ready) return null;

  const visible = NOTES.filter((n) => unlockedIds.includes(n.id));

  return (
    <main className="article">
      <Link href="/" className="article-back" data-hover>
        ← トップへ戻る
      </Link>

      <p className="article-eyebrow">Study Notes</p>
      <h1>学習メモ</h1>

      {visible.length === 0 ? (
        <p className="article-lead">
          まだ解錠した資料はありません。各資料のパスコードを入力すると開けます。
        </p>
      ) : (
        <>
          <p className="article-lead">
            解錠済みの資料です。ほかの資料は、それぞれのパスコードで開けます。
          </p>
          <ul className="note-list">
            {visible.map((n) => (
              <li key={n.id}>
                <Link href={n.path} className="note-card" data-hover>
                  <span className="note-card-title">{n.title}</span>
                  <span className="note-card-desc">{n.desc}</span>
                  <span className="note-card-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
