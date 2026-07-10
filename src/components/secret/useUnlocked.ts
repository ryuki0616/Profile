"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 指定した id のメモが解錠済み（該当パスコードで開かれた）かを確認する簡易ガード。
// 未解錠ならトップへ戻す。期限切れでもパスコードで開けば閲覧可（期限は一覧表示のみに影響）。
// ※ 静的サイト＋クライアント判定のため本物のアクセス制御ではない。
export function useUnlocked(id: string): boolean {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let unlocked = false;
    try {
      unlocked = sessionStorage.getItem(`rs-unlock-${id}`) === "1";
    } catch {
      unlocked = false;
    }
    if (unlocked) {
      setAllowed(true);
    } else {
      router.replace("/");
    }
  }, [id, router]);

  return allowed;
}
