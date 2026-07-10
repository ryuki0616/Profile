"use client";

import Link from "next/link";
import { useUnlocked } from "./useUnlocked";

export default function Neovim() {
  const allowed = useUnlocked("nvim");
  if (!allowed) return null;

  return (
    <main className="article">
      <Link href="/secret/" className="article-back" data-hover>
        ← 一覧へ戻る
      </Link>

      <p className="article-eyebrow">Study Notes</p>
      <h1>Neovim の基本と設定</h1>
      <p className="article-lead">
        モードの考え方から、移動・編集・検索置換・ウィンドウ操作、そして
        init.lua とプラグイン管理までの要点。まず「モード」と「移動・編集」を
        体に入れるのが近道です。
      </p>

      <h2>1. セットアップとモード</h2>
      <p>
        キーボードだけで編集する。<code>Esc</code> で常に Normal
        へ戻るのが基本です。
      </p>
      <pre>
        <code>{`brew install neovim   # 起動: nvim
# 設定ファイル: ~/.config/nvim/init.lua（Lua）

# モード
#   Normal   … 既定。移動・コマンド（i/a/o で Insert へ）
#   Insert   … 文字入力（Esc で Normal へ戻る）
#   Visual   … 選択（v 文字 / V 行 / Ctrl-v 矩形）
#   Command  … : で入りコマンド実行（:w など）
#   Terminal … :terminal で端末を開く`}</code>
      </pre>

      <h2>2. 移動（Normal モード）</h2>
      <pre>
        <code>{`h j k l        # ← ↓ ↑ →
w / b / e      # 次の単語 / 前の単語 / 単語の末尾
0 / ^ / $      # 行頭 / 最初の非空白 / 行末
gg / G         # ファイル先頭 / 末尾
{N}G  ( :N )   # N 行目へ
Ctrl-u / Ctrl-d  # 半画面 上 / 下スクロール
f{文字} / t{文字}  # 行内でその文字へ / 手前へジャンプ
%              # 対応する括弧へ`}</code>
      </pre>

      <h2>3. 編集：変更・コピペ・取り消し</h2>
      <p>
        「オペレータ＋モーション」で操作を組み立てます（例:{" "}
        <code>d2w</code>＝2単語削除、<code>ci&quot;</code>＝引用符の中を変更）。
      </p>
      <pre>
        <code>{`i a o          # カーソル前 / 後 / 下の行から入力（I A O は行頭/行末/上の行）
x  dd  dw  d$  # 1文字 / 1行 / 単語 / 行末まで削除
cc  cw  r      # 行変更 / 単語変更 / 1文字置換
yy  yw  p  P   # 行コピー / 単語コピー / 後ろに貼付 / 前に貼付
u  Ctrl-r      # 取り消し / やり直し
.              # 直前の操作を繰り返し
>>  <<         # インデントを右 / 左へ`}</code>
      </pre>

      <h2>4. 保存・終了・検索・置換</h2>
      <pre>
        <code>{`:w   :q   :wq (:x)   :q!   :wa   # 保存 / 終了 / 保存終了 / 破棄終了 / 全保存
/word  → Enter,  n / N            # 前方検索、次 / 前へ
*                                 # カーソル上の単語を検索
:%s/old/new/g                     # ファイル全体を置換（/gc で確認付き）
:noh                              # 検索ハイライトを消す`}</code>
      </pre>

      <h2>5. ウィンドウ・バッファ・タブ</h2>
      <pre>
        <code>{`:split  :vsplit        # 横 / 縦に分割（:sp / :vsp）
Ctrl-w h/j/k/l         # 分割間をカーソル移動（Ctrl-w q で閉じる）
:e file                # ファイルを開く
:ls   :bn / :bp   :bd  # バッファ一覧 / 次・前へ / 閉じる
:tabnew   gt / gT      # タブを新規 / 次・前のタブへ`}</code>
      </pre>

      <h2>6. 設定（init.lua）</h2>
      <p>
        <code>~/.config/nvim/init.lua</code> に Lua で書きます。
      </p>
      <pre>
        <code>{`vim.opt.number = true          -- 行番号
vim.opt.relativenumber = true  -- 相対行番号（移動が楽に）
vim.opt.expandtab = true       -- タブを空白に
vim.opt.shiftwidth = 2         -- インデント幅
vim.opt.ignorecase = true      -- 検索は大小無視…
vim.opt.smartcase = true       -- …大文字を含むときだけ区別

vim.g.mapleader = " "          -- リーダーキーをスペースに
vim.keymap.set("n", "<leader>w", ":w<CR>")  -- Space+w で保存`}</code>
      </pre>

      <h2>7. プラグイン管理（lazy.nvim）</h2>
      <p>
        現代の定番マネージャ。init.lua で必要なプラグインを宣言します（bootstrap
        コードは lazy.nvim の README を参照）。
      </p>
      <pre>
        <code>{`require("lazy").setup({
  "nvim-treesitter/nvim-treesitter",  -- 高精度な構文ハイライト
  "neovim/nvim-lspconfig",            -- LSP（補完・定義ジャンプ・エラー表示）
  "nvim-telescope/telescope.nvim",    -- あいまい検索（ファイル/文字列）
})

-- 例: telescope でファイル検索
vim.keymap.set("n", "<leader>f", ":Telescope find_files<CR>")`}</code>
      </pre>

      <div className="secret-actions">
        <Link href="/secret/" className="btn btn-ghost" data-hover>
          一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
