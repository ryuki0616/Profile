# Profile Site

ポートフォリオ・プロフィールサイトのソースコードです。

## 概要
個人の活動、制作物、スキルセットを紹介するためのWebサイトです。Next.js の静的エクスポートで構築されています。

## 特徴
- **レスポンシブデザイン**: PC、タブレット、スマートフォンなど、様々なデバイスで適切に表示されます。
- **ダークモード対応**: 黒を基調とした目に優しいデザイン（ターミナルの `theme` コマンドで切替）。
- **インタラクティブな要素**: Three.js の背景パーティクル、カスタムカーソル、ターミナル風イースターエッグ（Ctrl + Alt + T）。

## 技術スタック
- Next.js 15 (App Router) + TypeScript — 静的エクスポート（`output: 'export'`）
- React 19
- Three.js（npm パッケージ）
- CSS（グローバル CSS、`app/globals.css`）

## 開発

```bash
npm install
npm run dev    # 開発サーバー (http://localhost:3000)
npm run lint   # ESLint
npm run build  # 静的エクスポート（out/ に生成）
```

## CI/CD
- CI: GitHub Actions で lint とビルドを検証します（`.github/workflows/ci.yml`）。
- CD: `main` ブランチへの push で `out/` を GitHub Pages へ自動デプロイします（`.github/workflows/deploy-pages.yml`）。

## 本番公開（kyarameru.jp / Apache on AWS Lightsail）
`npm run build` で生成される `out/` の中身をドキュメントルートへ配置します。
`out/.htaccess` にセキュリティヘッダ（HSTS / X-Frame-Options / CSP など）と
旧URL `/privacy.html` → `/privacy/` の301リダイレクトが含まれます。

Apache 側で一度だけ必要な設定:

```bash
sudo a2enmod headers expires
# /etc/apache2/apache2.conf: ドキュメントルートの <Directory> を AllowOverride All に
# /etc/apache2/conf-available/security.conf:
#   ServerTokens Prod
#   ServerSignature Off
sudo systemctl reload apache2
```

## ライセンス
このプロジェクトは [MIT License](LICENSE) の下で公開されています。
