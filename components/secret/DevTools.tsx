"use client";

import Link from "next/link";
import { useUnlocked } from "./useUnlocked";

export default function DevTools() {
  const allowed = useUnlocked("tools");
  if (!allowed) return null;

  return (
    <main className="article">
      <Link href="/secret/" className="article-back" data-hover>
        ← 一覧へ戻る
      </Link>

      <p className="article-eyebrow">Study Notes</p>
      <h1>開発効率が上がる CLI ツール</h1>
      <p className="article-lead">
        標準コマンド（cd・ls・find・grep・cat）の置き換えと、それらを対話的に
        つなぐ fzf を、使う流れに沿ってまとめました。効果が大きいのは
        fzf・ripgrep・zoxide なので、まずこの3つから（例は Homebrew / zsh）。
      </p>

      <h2>1. zoxide — 賢い cd</h2>
      <p>訪れたディレクトリを記憶し、部分名でジャンプできる cd の上位版。</p>
      <pre>
        <code>{`brew install zoxide
eval "$(zoxide init zsh)"   # ~/.zshrc に追記（bash なら init bash）

z proj        # "proj" を含む最もよく使うディレクトリへジャンプ
z ap ui       # 複数キーワードで絞り込みジャンプ
zi            # fzf で対話的に選んでジャンプ`}</code>
      </pre>

      <h2>2. eza — 見やすい ls</h2>
      <p>色分け・git 連携・ツリー表示ができる ls 代替。</p>
      <pre>
        <code>{`brew install eza

eza -la                 # 詳細＋隠しファイル
eza -la --git           # git の状態を列に表示
eza --icons             # アイコン表示
eza -T                  # ツリー表示（--tree）
eza -l --sort=modified  # 更新日時でソート
# alias ls='eza' などにすると常用しやすい`}</code>
      </pre>

      <h2>3. fd — 使いやすい find</h2>
      <p>直感的な構文で速い find 代替。.gitignore を尊重します。</p>
      <pre>
        <code>{`brew install fd

fd pattern          # 名前に pattern を含むファイル/ディレクトリを再帰検索
fd -e ts            # 拡張子で絞る（例: ts）
fd -t f / fd -t d   # ファイルのみ / ディレクトリのみ
fd -H pattern       # 隠しファイルも含める
fd pattern src/     # 検索先を指定
fd -e log -x rm     # 一致した各ファイルにコマンド実行（.log を削除）`}</code>
      </pre>

      <h2>4. ripgrep（rg）— 高速な grep</h2>
      <p>.gitignore を尊重しつつ再帰検索する超高速な grep 代替。既定で速く賢い。</p>
      <pre>
        <code>{`brew install ripgrep

rg "pattern"          # カレント以下を再帰検索（.gitignore を無視しない）
rg -i "pattern"       # 大文字小文字を区別しない
rg -w "word"          # 単語単位で一致
rg -l "pattern"       # 一致したファイル名だけ
rg -t ts "pattern"    # 型（言語）で絞る  例: ts, py, md
rg -g '*.tsx' "pat"   # グロブで絞る
rg -A2 -B2 "TODO"     # 前後2行も表示`}</code>
      </pre>

      <h2>5. bat — ハイライト付き cat</h2>
      <p>シンタックスハイライト・行番号・git 差分つきの cat 代替。</p>
      <pre>
        <code>{`brew install bat

bat file.ts         # ハイライト＋行番号で表示
bat -p file.ts      # 装飾なし（プレーン）
bat -n file.ts      # 行番号のみ
bat -l json config  # 言語を明示
bat --diff file.ts  # git の変更行を表示
# fzf などのプレビューに: bat --color=always {}`}</code>
      </pre>

      <h2>6. glow — Markdown をきれいに表示</h2>
      <p>
        Markdown をターミナルで整形表示するビューア。README や学習メモの確認に。
      </p>
      <pre>
        <code>{`brew install glow

glow README.md        # Markdown を整形して表示
glow .                # カレント配下の Markdown を一覧から選ぶ（TUI）
glow -p CHANGELOG.md  # ページャで開く（長い文書向け）
glow -w 100 notes.md  # 折り返し幅を指定
glow github.com/charmbracelet/glow   # リポジトリの README を表示`}</code>
      </pre>

      <h2>7. fzf — あいまい検索（fuzzy finder）</h2>
      <p>
        標準入力を対話的に絞り込むツール。上の fd / rg / bat と組み合わせると真価を
        発揮します。履歴やファイル選択が一気に速くなります。
      </p>
      <pre>
        <code>{`brew install fzf
$(brew --prefix)/opt/fzf/install   # キーバインドと補完を有効化

# キーバインド（有効化後）
#   Ctrl-R  … コマンド履歴をあいまい検索
#   Ctrl-T  … ファイルパスを挿入
#   Alt-C   … サブディレクトリへ cd

vim "$(fzf)"                        # 選んだファイルを開く
git switch "$(git branch | fzf | tr -d ' *')"   # ブランチを選んで切替
fzf --preview 'bat --color=always {}'           # 右にプレビュー表示`}</code>
      </pre>

      <h2>8. その他・組み合わせ</h2>
      <ul>
        <li>
          <code>tldr</code> … コマンドの実用例を簡潔表示。<code>tldr tar</code>。
        </li>
      </ul>
      <pre>
        <code>{`brew install tldr

# 組み合わせ例：rg で探して fzf で選び、bat でプレビュー
rg -l "useEffect" | fzf --preview 'bat --color=always {}'`}</code>
      </pre>

      <div className="secret-actions">
        <Link href="/secret/" className="btn btn-ghost" data-hover>
          一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
