# セキュリティ監査レポート

## 現在の状態

このリポジトリは静的サイトとしては概ね安全な状態です。以前の監査で指摘されていた `innerHTML` ベースの出力は解消済みで、コマンド入力のホワイトリスト検証、パスサニタイズ、CSP の設定も入っています。

## 今回反映した修正

### 1. 実行時エラーの解消
- `theme` コマンドが `material is not defined` で落ちる問題を修正
- Three.js のパーティクルマテリアルを安全に参照・更新する実装へ変更

### 2. スクリプト面の CSP 強化
- Google Analytics の初期化コードを `analytics.js` へ分離
- `onclick` を除去して `addEventListener` へ移行
- これにより `script-src` から `unsafe-inline` を外せる構成に変更

### 3. 外部依存の削減
- Three.js を CDN 読み込みからローカル同梱へ変更
- Font Awesome には `integrity` を設定

### 4. DOM クリア処理の安全化
- ターミナルを閉じる際の `innerHTML = ''` を `removeChild` ベースへ変更

## 残る注意点

### 1. `style-src 'unsafe-inline'` は残っています
- 現在の実装は JS から多数の `element.style` 操作を行っているため、ここを完全に外すには大きめのリファクタが必要です
- 次の改善候補は、インライン style と JS の直接 style 書き換えを CSS クラス中心へ寄せることです

### 2. 公開情報の露出
- メールアドレスや SNS URL は公開前提の内容ですが、ボット収集耐性は高くありません
- 必要ならフォーム化や難読化を検討してください

## 推奨運用

- GitHub Actions の CI を必須化する
- 新しい外部 CDN を追加する場合は SRI かローカル同梱を優先する
- UI 演出を増やすときは `prefers-reduced-motion` を維持する
