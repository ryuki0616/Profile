import type { Metadata } from "next";
import NotFound from "@/components/sections/NotFound";

export const metadata: Metadata = {
  title: "404 - ページが見つかりません",
  robots: { index: false, follow: false },
};

// 静的エクスポートでは out/404.html として出力される。
// GitHub Pages は自動認識、Apache は .htaccess の ErrorDocument で指定。
export default function NotFoundPage() {
  return <NotFound />;
}
