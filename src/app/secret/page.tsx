import type { Metadata } from "next";
import SecretIndex from "@/components/secret/SecretIndex";

// 検索エンジンにインデックスさせない隠しページ
export const metadata: Metadata = {
  title: "学習メモ | Study Notes",
  robots: { index: false, follow: false },
};

export default function SecretPage() {
  return <SecretIndex />;
}
