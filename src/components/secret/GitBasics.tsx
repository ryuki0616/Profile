"use client";

import Link from "next/link";
import { useUnlocked } from "./useUnlocked";

export default function GitBasics() {
  const allowed = useUnlocked("git");
  if (!allowed) return null;

  return (
    <main className="article">
      <Link href="/secret/" className="article-back" data-hover>
        ← 一覧へ戻る
      </Link>

      <p className="article-eyebrow">Study Notes</p>
      <h1>SSHキーの設定と Git の基本操作</h1>
      <p className="article-lead">
        GitHub 用の SSHキーの設定と、日常的に使う Git
        コマンドを、最短で使える形でまとめた学習メモです。
      </p>

      <h2>1. SSHキーの設定</h2>
      <p>
        パスワードなしで安全に GitHub と通信するための鍵を作り、公開鍵を
        GitHub に登録します。
      </p>
      <pre>
        <code>{`# 1. 鍵を生成（ed25519 推奨）。保存先とパスフレーズは Enter で既定可
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. ssh-agent を起動し、秘密鍵を登録
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. 公開鍵を表示してコピー
cat ~/.ssh/id_ed25519.pub
#   → GitHub の Settings > SSH and GPG keys > New SSH key に貼り付け

# 4. 接続テスト（"Hi <name>!" が出れば成功）
ssh -T git@github.com`}</code>
      </pre>
      <p>
        既存リポジトリを SSH 接続に切り替えるには、リモート URL を
        <code>git@github.com:ユーザー名/リポジトリ.git</code> 形式にします。
      </p>
      <pre>
        <code>{`git remote set-url origin git@github.com:USER/REPO.git`}</code>
      </pre>

      <h2>2. 基本的な Git 操作</h2>
      <ul>
        <li>
          <code>git add</code> … 変更をステージ（記録候補に載せる）。
          <code>git add .</code> で全変更。
        </li>
        <li>
          <code>git commit</code> … ステージした変更を1つの記録にまとめる。
        </li>
        <li>
          <code>git push</code> … ローカルのコミットをリモートへ送る。
        </li>
        <li>
          <code>git pull</code> … リモートの変更を取得して取り込む。
        </li>
        <li>
          <code>git branch</code> … ブランチの一覧・作成。
        </li>
        <li>
          <code>git checkout</code> … ブランチの切り替え（作業場所の移動）。
        </li>
      </ul>
      <pre>
        <code>{`git add .                      # 変更をすべてステージ
git commit -m "内容を短く説明"   # 記録する
git push                       # リモートへ送信（初回: git push -u origin main）
git pull                       # リモートの最新を取り込む

git branch                     # ブランチ一覧
git branch feature-x           # feature-x を作成
git checkout feature-x         # feature-x へ切り替え
git checkout -b feature-y      # 作成と切り替えを同時に`}</code>
      </pre>
      <p>
        典型的な流れは「<code>pull</code> で最新化 → ブランチを切って作業 →
        <code>add</code> → <code>commit</code> → <code>push</code>」です。
        （最近は切り替えに <code>git switch</code>、復元に{" "}
        <code>git restore</code> も使えます。）
      </p>

      <div className="secret-actions">
        <Link href="/secret/" className="btn btn-ghost" data-hover>
          一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
