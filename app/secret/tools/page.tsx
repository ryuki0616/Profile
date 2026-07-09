import type { Metadata } from "next";
import DevTools from "@/components/secret/DevTools";

export const metadata: Metadata = {
  title: "開発効率が上がる CLI ツール | Study Notes",
  robots: { index: false, follow: false },
};

export default function DevToolsPage() {
  return <DevTools />;
}
