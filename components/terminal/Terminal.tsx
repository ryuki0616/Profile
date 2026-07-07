"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  AVAILABLE_COMMANDS,
  HOME_DIR,
  displayPath,
  fileContents,
  fileSystem,
  getFortune,
  isValidCommand,
  resolvePath,
} from "@/lib/terminal-fs";
import { THEME_CHANGE_EVENT } from "@/components/ThreeBackground";
import {
  stopAllEffects,
  toggleMatrixEffect,
  triggerSmileEffect,
} from "./effects";

type NeofetchSnapshot = {
  uptime: string;
  width: number;
  height: number;
  host: string;
  theme: string;
};

type LineData =
  | { kind: "command"; text: string; path: string }
  | { kind: "normal" | "error" | "success"; text: string }
  | { kind: "neofetch"; snapshot: NeofetchSnapshot };

type Line = LineData & { id: number };

const NEOFETCH_LOGO = `       RRRRRR
      RR   RR
     RR   RR
    RRRRRR
   RR  RR
  RR    RR
 RR      RR`;

function NeofetchOutput({ snapshot }: { snapshot: NeofetchSnapshot }) {
  const logoColor = "#3b8eea";
  return (
    <div
      style={{ display: "flex", gap: 20, fontFamily: "'Courier New', monospace" }}
    >
      <div
        style={{
          color: logoColor,
          fontWeight: "bold",
          lineHeight: 1.2,
          whiteSpace: "pre",
        }}
      >
        {NEOFETCH_LOGO}
      </div>
      <div style={{ lineHeight: 1.2 }}>
        <span style={{ color: "#51cf66", fontWeight: "bold" }}>
          ryuki@profile
        </span>
        <br />
        ------------------
        {[
          ["OS", "Ryuki OS v2.0 (Web)"],
          ["Host", snapshot.host],
          ["Uptime", snapshot.uptime],
          ["Resolution", `${snapshot.width}x${snapshot.height}`],
          ["Shell", "JS-Shell"],
          ["Theme", snapshot.theme],
          ["CPU", "100% Passion"],
        ].map(([label, value]) => (
          <div key={label}>
            <span style={{ color: logoColor, fontWeight: "bold" }}>
              {label}:{" "}
            </span>
            {value}
          </div>
        ))}
        <br />
        <div style={{ display: "flex", gap: 5 }}>
          {["#000", "#f00", "#0f0", "#ff0", "#00f", "#f0f", "#0ff", "#fff"].map(
            (color) => (
              <span
                key={color}
                style={{ background: color, width: 15, height: 15 }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [input, setInput] = useState("");
  const [currentDir, setCurrentDir] = useState(HOME_DIR);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(0);
  const nextIdRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const currentDirRef = useRef(currentDir);
  currentDirRef.current = currentDir;

  const addLines = useCallback((newLines: LineData[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l) => ({ ...l, id: nextIdRef.current++ })),
    ]);
  }, []);

  const addOutput = useCallback(
    (text: string, kind: "normal" | "error" | "success" = "normal") => {
      addLines([{ kind, text }]);
    },
    [addLines]
  );

  const toggleTerminal = useCallback(() => {
    setOpen((prev) => {
      if (prev) {
        // 閉じるときは次回のために初期状態へ戻す
        setLines([]);
        setShowIntro(true);
      } else {
        setInput("");
      }
      return !prev;
    });
  }, []);

  // ショートカット (Ctrl+Alt+T / ESC)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTerminal();
      }
      if (e.key === "Escape" && open) {
        toggleTerminal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, toggleTerminal]);

  // 開いたら入力へフォーカス
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // 出力追加時に最下部へスクロール
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    requestAnimationFrame(() => {
      body.scrollTop = body.scrollHeight;
    });
  }, [lines]);

  // アンマウント時にエフェクトを確実に停止
  useEffect(() => stopAllEffects, []);

  const echoCommand = useCallback(
    (raw: string) => {
      addLines([
        { kind: "command", text: raw, path: displayPath(currentDirRef.current) },
      ]);
    },
    [addLines]
  );

  const processCommand = useCallback(
    (raw: string) => {
      // 入力長制限（DoS 対策）
      if (raw.length > 1000) {
        addOutput("Command too long", "error");
        return;
      }

      const args = raw.trim().split(/\s+/);
      const command = (args[0] ?? "").toLowerCase();

      if (!command) {
        echoCommand("");
        return;
      }

      if (!isValidCommand(command)) {
        echoCommand(raw);
        addOutput(
          `'${command}' is not recognized as an internal or external command, operable program or batch file.`,
          "error"
        );
        return;
      }

      echoCommand(raw);
      const dir = currentDirRef.current;

      switch (command) {
        case "sudo": {
          if (args.length < 2) {
            addOutput("usage: sudo command");
            return;
          }
          if (args.slice(1).join(" ").toLowerCase() === "smile") {
            addOutput("[sudo] password for visitor: **********");
            setTimeout(() => {
              addOutput("Access Granted. Initiating SUPER SMILE...", "success");
              triggerSmileEffect();
            }, 800);
            return;
          }
          addOutput(
            "ryuki is not in the sudoers file. This incident will be reported.",
            "error"
          );
          return;
        }

        case "ls":
        case "ll": {
          const files = fileSystem[dir];
          if (!files) {
            addOutput("Error: Directory not found", "error");
            return;
          }
          const showHidden =
            command === "ll" || args.includes("-a") || args.includes("-la");
          const visible = files.filter((f) => showHidden || !f.startsWith("."));
          if (visible.length === 0) {
            addOutput("(empty directory)");
          } else {
            addOutput(
              visible
                .map((f) => (fileSystem[resolvePath(dir, f)] ? `${f}/` : f))
                .join("  ")
            );
          }
          return;
        }

        case "cat": {
          if (args.length < 2) {
            addOutput("usage: cat [filename]");
            return;
          }
          const target = resolvePath(dir, args[1]);
          if (fileContents[target]) {
            addOutput(fileContents[target]);
          } else if (fileSystem[target]) {
            addOutput(`cat: ${args[1]}: Is a directory`, "error");
          } else {
            addOutput(`cat: ${args[1]}: No such file or directory`, "error");
          }
          return;
        }

        case "grep": {
          if (args.length < 3) {
            addOutput("usage: grep [pattern] [filename]");
            return;
          }
          const target = resolvePath(dir, args[2]);
          const content = fileContents[target];
          if (content === undefined) {
            addOutput(`grep: ${args[2]}: No such file or directory`, "error");
            return;
          }
          content
            .split("\n")
            .filter((line) => line.includes(args[1]))
            .forEach((line) => addOutput(line));
          return;
        }

        case "cd": {
          const target = args[1] || "~";
          let newPath = dir;
          if (target === "/") {
            newPath = "/";
          } else if (target === "..") {
            if (newPath !== "/") {
              const parts = newPath.split("/");
              parts.pop();
              newPath = parts.join("/") || "/";
            }
          } else if (target === "~") {
            newPath = HOME_DIR;
          } else {
            newPath = resolvePath(dir, target);
          }
          if (fileSystem[newPath]) {
            setCurrentDir(newPath);
          } else {
            addOutput(`cd: ${target}: No such file or directory`, "error");
          }
          return;
        }

        case "pwd":
          addOutput(dir);
          return;

        case "whoami":
          addOutput("ryuki");
          return;

        case "neofetch": {
          const uptimeSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
          const hours = Math.floor(uptimeSec / 3600);
          const minutes = Math.floor((uptimeSec % 3600) / 60);
          const seconds = uptimeSec % 60;
          addLines([
            {
              kind: "neofetch",
              snapshot: {
                uptime: `${hours}h ${minutes}m ${seconds}s`,
                width: window.innerWidth,
                height: window.innerHeight,
                host:
                  navigator.userAgent.indexOf("Chrome") > -1
                    ? "Chrome"
                    : "Web Browser",
                theme: document.body.classList.contains("light-theme")
                  ? "Light"
                  : "Dark",
              },
            },
          ]);
          return;
        }

        case "help":
          [
            "Available commands:",
            "  neofetch - System Information",
            "  ls       - List files",
            "  cat      - Read file",
            "  cd       - Change directory",
            "  about    - Display profile info",
            "  social   - Show social links",
            "  smile    - Spread happiness (Effect)",
            "  matrix   - Enter the matrix (Effect)",
            "  fortune  - Today's engineer fortune",
            "  cls      - Clear screen",
            "  theme    - Toggle light/dark theme",
          ].forEach((l) => addOutput(l));
          return;

        case "about":
          addOutput("Ryuki Sato - Software Engineer");
          addOutput("Specialized in Flutter, Python, and AI.");
          addOutput("Mission: Make everyone smile with technology.");
          return;

        case "social":
          addOutput("GitHub: https://github.com/ryuki0616");
          addOutput("X (Twitter): https://x.com/kyarameru_dev");
          return;

        case "smile":
          addOutput("Spreading happiness...", "success");
          triggerSmileEffect();
          return;

        case "matrix": {
          const started = toggleMatrixEffect(() =>
            addOutput(
              "Matrix effect automatically stopped after 10 seconds.",
              "success"
            )
          );
          if (started) {
            addOutput("Entering the Matrix...", "success");
            addOutput(
              "Auto-stops after 10s. Use 'stop' or 'clearfx' to stop manually",
              "success"
            );
          } else {
            addOutput("Matrix effect disabled.");
          }
          return;
        }

        case "fortune":
        case "omikuji":
          addOutput(getFortune());
          return;

        case "cls":
        case "clear":
          setLines([]);
          setShowIntro(false);
          return;

        case "stop":
        case "clearfx":
          stopAllEffects();
          addOutput("All effects stopped.");
          return;

        case "exit":
          toggleTerminal();
          return;

        case "theme":
          document.body.classList.toggle("light-theme");
          window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
          addOutput("Theme toggled.");
          return;
      }
    },
    [addLines, addOutput, echoCommand, toggleTerminal]
  );

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const history = historyRef.current;

    if (e.key === "Enter") {
      const raw = input.trim();
      if (raw) {
        history.push(raw);
        historyIndexRef.current = history.length;
      }
      processCommand(raw);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--;
        setInput(history[historyIndexRef.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndexRef.current < history.length - 1) {
        historyIndexRef.current++;
        setInput(history[historyIndexRef.current]);
      } else {
        historyIndexRef.current = history.length;
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;
      const args = input.split(/\s+/);

      if (args.length === 1) {
        // 第1引数（コマンド）の補完
        const matches = AVAILABLE_COMMANDS.filter((cmd) =>
          cmd.startsWith(args[0].toLowerCase())
        );
        if (matches.length >= 1) {
          setInput(matches.length === 1 ? `${matches[0]} ` : matches[0]);
        }
      } else if (args.length === 2) {
        // 第2引数（ファイル・ディレクトリ）の補完
        if (["cd", "cat", "ls", "ll", "grep"].includes(args[0].toLowerCase())) {
          const files = fileSystem[currentDir] || [];
          const matches = files.filter((f) =>
            f.toLowerCase().startsWith(args[1].toLowerCase())
          );
          if (matches.length >= 1) {
            setInput(`${args[0]} ${matches[0]}`);
          }
        }
      }
    }
  };

  // テキスト選択中はフォーカスを奪わない
  const onBodyClick = () => {
    if (window.getSelection()?.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  if (!open) return null;

  const prompt = `ryuki@profile:${displayPath(currentDir)}$ `;

  return (
    <div className="terminal-overlay active">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-title">
            <span className="terminal-icon"></span>
            <span>Command Prompt - ryuki@profile</span>
          </div>
          <div className="terminal-controls">
            <div className="win-btn">_</div>
            <div className="win-btn">□</div>
            <button
              type="button"
              className="win-btn close"
              onClick={toggleTerminal}
              aria-label="Close terminal"
            >
              ×
            </button>
          </div>
        </div>
        <div className="terminal-body" ref={bodyRef} onClick={onBodyClick}>
          {showIntro && (
            <div className="terminal-intro">
              Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)
              <br />
              <br />
              * Documentation:&nbsp;&nbsp;https://help.ubuntu.com
              <br />
              * Management:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://landscape.canonical.com
              <br />
              * Support:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://ubuntu.com/advantage
              <br />
              <br />
              System information available via neofetch
              <br />
              <br />
              ryuki@profile:~$ <br />
            </div>
          )}
          <div className="terminal-output">
            {lines.map((line) => {
              switch (line.kind) {
                case "command":
                  return (
                    <div key={line.id}>
                      <span style={{ color: "#51cf66" }}>{line.path}$ </span>
                      <span style={{ color: "#ccc" }}>{line.text}</span>
                    </div>
                  );
                case "error":
                  return (
                    <div key={line.id} style={{ color: "#ff6b6b" }}>
                      {line.text}
                    </div>
                  );
                case "success":
                  return (
                    <div key={line.id} style={{ color: "#51cf66" }}>
                      {line.text}
                    </div>
                  );
                case "neofetch":
                  return <NeofetchOutput key={line.id} snapshot={line.snapshot} />;
                default:
                  return (
                    <div key={line.id} style={{ whiteSpace: "pre-wrap" }}>
                      {line.text}
                    </div>
                  );
              }
            })}
          </div>
          <div className="terminal-input-line">
            <span className="prompt prompt-active" style={{ color: "#51cf66" }}>
              {prompt}
            </span>
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
