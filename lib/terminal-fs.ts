// ターミナルイースターエッグの擬似ファイルシステムとコマンド定義（旧 main.js §6）

export const HOME_DIR = "/home/ryuki";

export const fileSystem: Record<string, string[]> = {
  "/": ["home", "etc"],
  "/home": ["ryuki"],
  "/home/ryuki": [
    "README.md",
    "about.txt",
    "skills.json",
    "contact.info",
    "projects.txt",
    ".secret_config",
  ],
  "/etc": ["os-release", "passwd"],
};

export const fileContents: Record<string, string> = {
  "/home/ryuki/README.md":
    "# Ryuki Profile\nWelcome to my terminal portfolio.\nType `help` for commands, `neofetch` for system info.",
  "/home/ryuki/about.txt":
    "Name: Ryuki Sato\nRole: IT Engineer\nMission: Create smiles with technology.\nLoves: NFC, RFID, Flutter, Python.",
  "/home/ryuki/skills.json":
    '["JavaScript", "Python", "Flutter", "Dart", "Three.js", "HTML/CSS", "Node.js"]',
  "/home/ryuki/contact.info":
    "Email: ryu727tmm19@gmail.com\nGitHub: https://github.com/ryuki0616\nX: https://x.com/kyarameru_dev",
  "/home/ryuki/projects.txt":
    "1. Digital Live Adventure (JS/Node.js)\n2. Log Check AI (Python/AI)\n3. AI & Machine Learning (Research)",
  "/home/ryuki/.secret_config": "theme=dark\nsudo_admin=false\n",
  "/etc/os-release":
    'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nVERSION="22.04.3 LTS (Jammy Jellyfish)"\nID=ubuntu',
  "/etc/passwd":
    "root:x:0:0:root:/root:/bin/bash\nryuki:x:1000:1000:Ryuki,,,:/home/ryuki:/bin/bash",
};

export const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "social",
  "smile",
  "matrix",
  "fortune",
  "omikuji",
  "cls",
  "stop",
  "clearfx",
  "exit",
  "theme",
  "sudo",
  "neofetch",
  "ls",
  "ll",
  "cat",
  "grep",
  "cd",
  "pwd",
  "whoami",
  "clear",
] as const;

export function isValidCommand(cmd: string): boolean {
  return (AVAILABLE_COMMANDS as readonly string[]).includes(cmd.toLowerCase());
}

// ホームディレクトリを ~ 表示にする
export function displayPath(dir: string): string {
  return dir.startsWith(HOME_DIR) ? dir.replace(HOME_DIR, "~") : dir;
}

// カレントディレクトリ基準でパスを解決する
export function resolvePath(currentDir: string, name: string): string {
  if (name.startsWith("/")) return name;
  return currentDir === "/" ? `/${name}` : `${currentDir}/${name}`;
}

export function getFortune(): string {
  const fortunes = [
    "大吉: バグのないコードが書けるでしょう。デプロイも一発成功！",
    "中吉: 新しい技術スタックとの出会いがありそう。",
    "小吉: 些細なTypoに注意。Linterは友達。",
    "吉: リファクタリング日和。コードが綺麗になります。",
    "末吉: 依存関係の競合に巻き込まれるかも。package-lock.jsonを信じて。",
    "凶: 全角スペースが混入する予感...",
    "大凶: `rm -rf /` を打ちそうになるかも。指差し確認を！",
  ];
  const result = fortunes[Math.floor(Math.random() * fortunes.length)];
  return `
-------------------------
  Today's Fortune
-------------------------
  ${result}
-------------------------
`;
}
