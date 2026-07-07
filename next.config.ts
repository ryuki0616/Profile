import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Apache / GitHub Pages へ静的ファイルとして配備するため export 固定
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
