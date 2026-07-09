"use client";

import Link from "next/link";
import { useUnlocked } from "./useUnlocked";

export default function GitHubCli() {
  const allowed = useUnlocked("gh");
  if (!allowed) return null;

  return (
    <main className="article">
      <Link href="/secret/" className="article-back" data-hover>
        ← 一覧へ戻る
      </Link>

      <p className="article-eyebrow">Study Notes</p>
      <h1>GitHub CLI（gh）コマンド</h1>
      <p className="article-lead">
        <code>gh</code> は GitHub 公式のコマンドラインツール。ブラウザを開かずに、
        リポジトリ・Pull Request・Issue などを端末から操作できます。
      </p>

      <h2>1. セットアップと認証</h2>
      <p>
        インストール後、まず認証します。以降のコマンドは認証済み前提です。
      </p>
      <pre>
        <code>{`# インストール（例）
# macOS:  brew install gh
# Windows: winget install GitHub.cli

gh auth login        # 対話式でログイン（GitHub.com / SSH or HTTPS を選択）
gh auth status       # 認証状態を確認`}</code>
      </pre>

      <h2>2. リポジトリ操作</h2>
      <pre>
        <code>{`gh repo create my-app --public        # 新規リポジトリを作成
gh repo clone USER/REPO               # クローン
gh repo view --web                    # ブラウザでリポジトリを開く
gh repo fork USER/REPO --clone        # フォークしてクローン`}</code>
      </pre>

      <h2>3. Pull Request</h2>
      <p>
        現在のブランチから PR を作り、レビュー・マージまで端末で完結できます。
      </p>
      <pre>
        <code>{`gh pr create --title "タイトル" --body "説明"   # PR を作成（-w でブラウザ）
gh pr list                                     # PR 一覧
gh pr status                                   # 自分に関係する PR の状況
gh pr view 123                                 # PR #123 の詳細（--web で開く）
gh pr checkout 123                             # PR #123 をローカルに取り込む
gh pr merge 123 --squash --delete-branch       # マージしてブランチ削除`}</code>
      </pre>

      <h2>4. Issue</h2>
      <pre>
        <code>{`gh issue create --title "バグ報告" --body "内容"   # Issue を作成
gh issue list --state open                        # 未クローズの一覧
gh issue view 45                                  # Issue #45 を表示
gh issue close 45                                 # クローズ`}</code>
      </pre>

      <h2>5. その他の便利コマンド</h2>
      <ul>
        <li>
          <code>gh run list</code> / <code>gh run watch</code> … GitHub Actions
          の実行を確認・監視。
        </li>
        <li>
          <code>gh release create v1.0.0</code> … リリースを作成（ファイル添付も可）。
        </li>
        <li>
          <code>gh api</code> … 任意の GitHub API を直接叩く。
        </li>
        <li>
          <code>gh alias set</code> … よく使うコマンドに短縮名を付ける。
        </li>
      </ul>
      <pre>
        <code>{`gh run watch                       # 実行中のワークフローを監視
gh alias set prc 'pr create -w'    # gh prc で PR 作成を開く
gh api repos/USER/REPO --jq .stargazers_count  # スター数を取得`}</code>
      </pre>

      <div className="secret-actions">
        <Link href="/secret/" className="btn btn-ghost" data-hover>
          一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
