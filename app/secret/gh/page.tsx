import type { Metadata } from "next";
import GitHubCli from "@/components/secret/GitHubCli";

export const metadata: Metadata = {
  title: "GitHub CLI（gh）コマンド | Study Notes",
  robots: { index: false, follow: false },
};

export default function GitHubCliPage() {
  return <GitHubCli />;
}
