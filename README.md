# Profile Site

ポートフォリオ・プロフィールサイトのソースコードです。

## 概要
個人の活動、制作物、スキルセットを紹介するためのWebサイトです。シンプルで見やすいデザインを目指して作成されました。

## 特徴
- **レスポンシブデザイン**: PC、タブレット、スマートフォンなど、様々なデバイスで適切に表示されます。
- **ダークモード対応**: 黒を基調とした目に優しいデザイン（または現在のデザインに合わせて記述）。
- **インタラクティブな要素**: スムーズなスクロールやアニメーションを使用しています。

## 技術スタック
- HTML5
- CSS3
- JavaScript (Vanilla JS)

## CI/CD
- CI: GitHub Actions で静的ファイル構成と `main.js` の構文を検証します。
- CD: `main` ブランチへの push で GitHub Pages へ自動デプロイします。
- Three.js は `vendor/three.r128.min.js` を同梱して配信します。

### GitHub 側で必要な設定
- `Settings > Pages > Source` を `GitHub Actions` に変更
- カスタムドメインを使う場合は `CNAME` ファイルを追加

## 公開ページ
GitHub Pagesにて公開されています（設定済みの場合）：
https://ryuki0616.github.io/Profile/

## ライセンス
このプロジェクトは [MIT License](LICENSE) の下で公開されています。
