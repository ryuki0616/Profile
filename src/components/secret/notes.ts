// メモの登録表。パスコードとメモを 1 対 1 で対応させる。
// あるパスコードを入れると、その id のメモだけ解錠され、そのページへ直行する。
//
// ※ 重要: クライアント側判定のため、ここに書く passcode は全てブラウザへ配信され、
//   技術的には読み取り可能。本物のアクセス制御ではない（機密は置かない）。
//
// 各メモの passcode は 1〜9 の数字のみ・全メモで同じ桁数（PASSCODE_LENGTH）にすること。
// "0000" は一覧ページへ飛ぶための予約コード（メモには使わない）。
//
// created: 公開（作成）日 "YYYY-MM-DD"（または ISO 日時）。
//   公開日から EXPIRY_DAYS（2週間）を過ぎると「一覧から消える」だけで、
//   パスコードを再入力すれば引き続きページは閲覧できる。
//   省略すると無期限。判定は閲覧時のローカル時刻で行う。
export type Note = {
  id: string;
  path: string;
  title: string;
  desc: string;
  passcode: string;
  created?: string;
};

export const PASSCODE_LENGTH = 4;

// 公開期限（日数）。公開日からこの日数だけ一覧に表示する。
export const EXPIRY_DAYS = 14;

// 期限内（＝一覧に出す）かどうか。created 未設定は常に有効。
// 日付として解釈できなければ有効扱い。判定は呼び出し時（閲覧時）の now で行う。
export function isNoteActive(note: Note, now: number = Date.now()): boolean {
  if (!note.created) return true;
  // 日付のみ（10文字）なら、その日の 0 時を起点にする
  const iso =
    note.created.length <= 10 ? `${note.created}T00:00:00` : note.created;
  const start = new Date(iso).getTime();
  if (Number.isNaN(start)) return true;
  const expiry = start + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return now < expiry;
}

// 一覧（/secret）へ飛ぶための予約パスコードと、その閲覧許可フラグ
export const INDEX_PASSCODE = "0000";
export const INDEX_PATH = "/secret/";
export const INDEX_FLAG = "rs-index";

export const NOTES: Note[] = [
  {
    id: "git",
    path: "/secret/git/",
    title: "SSHキーの設定と Git の基本操作",
    desc: "SSHキーの登録から add / commit / push / pull / branch / checkout まで。",
    passcode: "4237",
    created: "2026-07-10", // 公開日。この日から2週間で一覧から消える
  },
  {
    id: "gh",
    path: "/secret/gh/",
    title: "GitHub CLI（gh）コマンド",
    desc: "認証・リポジトリ・Pull Request・Issue を端末から操作する gh の要点。",
    passcode: "4858",
    created: "2026-07-10",
  },
  {
    id: "tools",
    path: "/secret/tools/",
    title: "開発効率が上がる CLI ツール",
    desc: "fzf・ripgrep(rg)・zoxide など、日々のコマンドを速くする定番ツール。",
    passcode: "2833",
    created: "2026-07-10",
  },
  {
    id: "nvim",
    path: "/secret/nvim/",
    title: "Neovim の基本と設定",
    desc: "モード・移動・編集・検索置換から init.lua とプラグイン管理まで。",
    passcode: "6851",
    created: "2026-07-10",
  },
];
