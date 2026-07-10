# Profile Site

ポートフォリオ・プロフィールサイトのソースコードです。

## 概要
個人の活動、制作物、スキルセットを紹介するためのWebサイトです。Next.js の静的エクスポートで構築されています。

## 特徴
- **レスポンシブデザイン**: PC、タブレット、スマートフォンなど、様々なデバイスで適切に表示されます。
- **モダン・ダーク UI**: 黒を基調に、控えめなアクセントカラーと余白で読みやすくまとめています。
- **CSS アニメーション**: オーロラ背景、ヒーローの登場・シマー、スクロール表示、カード/ボタンのホバー、スクロール進捗バーなど、動きのある演出を CSS 中心で実装。
- **インタラクティブな要素**: カスタムカーソル、3D ティルトカード。
- **アクセシビリティ配慮**: `prefers-reduced-motion` でアニメーション低減、キーボードフォーカス可視化、装飾アイコンの `aria-hidden`。

## 技術スタック
- Next.js 15 (App Router) + TypeScript — 静的エクスポート（`output: 'export'`）
- React 19
- CSS（グローバル CSS、`app/globals.css`）

## 開発

```bash
npm install
npm run dev    # 開発サーバー (http://localhost:3000)
npm run lint   # ESLint
npm run build  # 静的エクスポート（out/ に生成）
```

## ディレクトリ構成

```
app/                  # App Router のページ・レイアウト・メタデータ
├── privacy/          # プライバシーポリシー
└── secret/           # パスコード解錠で見る学習メモ（演出であり認証ではない）
components/
├── sections/         # ページを構成するセクション（Header〜Footer）
├── fx/               # 演出・インタラクション（カーソル、ティルト、マーキー等）
├── secret/           # secret 機能一式（Keypad、メモ本文、解錠フック）
└── useFocusTrap.ts   # 共有フック（モーダルのフォーカストラップ）
public/               # 静的ファイル（画像、.htaccess、旧URLリダイレクトスタブ）
docs/                 # ローカル運用メモ（gitignore 対象を含む）
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
