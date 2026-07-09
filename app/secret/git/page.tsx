import type { Metadata } from "next";
import GitBasics from "@/components/secret/GitBasics";

export const metadata: Metadata = {
  title: "SSHキー設定と Git 基本操作 | Study Notes",
  robots: { index: false, follow: false },
};

export default function GitBasicsPage() {
  return <GitBasics />;
}
