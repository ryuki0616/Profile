import type { Metadata } from "next";
import Neovim from "@/components/secret/Neovim";

export const metadata: Metadata = {
  title: "Neovim の基本と設定 | Study Notes",
  robots: { index: false, follow: false },
};

export default function NeovimPage() {
  return <Neovim />;
}
