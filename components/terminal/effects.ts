// smile / matrix コマンドの全画面エフェクト（旧 main.js）
// DOM を直接操作するため React の外で管理し、必ず後始末できる形にする。

let smileInterval: ReturnType<typeof setInterval> | undefined;
let smileTimeout: ReturnType<typeof setTimeout> | undefined;
let smileCleanupTimeout: ReturnType<typeof setTimeout> | undefined;

export function triggerSmileEffect() {
  stopSmileEffect();

  const smiles = ["😊", "😄", "😁", "😆", "😉", "😍", "😎", "😸", ":)", "(:", "(^_^)", "✨", "💻"];
  const container = document.createElement("div");
  container.id = "smile-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  // 5秒間生成し続ける
  smileInterval = setInterval(() => {
    const smile = document.createElement("div");
    smile.textContent = smiles[Math.floor(Math.random() * smiles.length)];
    smile.style.position = "absolute";
    smile.style.left = Math.random() * 100 + "vw";
    smile.style.top = "-50px";
    smile.style.fontSize = Math.random() * 2 + 1 + "rem";
    smile.style.color = "#fff";
    smile.style.textShadow = "0 0 10px rgba(255,255,255,0.5)";
    smile.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    container.appendChild(smile);
    smile.addEventListener("animationend", () => smile.remove());
  }, 100);

  smileTimeout = setTimeout(() => {
    clearInterval(smileInterval);
    smileCleanupTimeout = setTimeout(() => {
      if (container.parentNode) container.remove();
    }, 5000); // 最後のエレメントが消えるのを待つ
  }, 5000);
}

export function stopSmileEffect() {
  clearInterval(smileInterval);
  clearTimeout(smileTimeout);
  clearTimeout(smileCleanupTimeout);
  document.getElementById("smile-container")?.remove();
}

let matrixInterval: ReturnType<typeof setInterval> | undefined;
let matrixTimeout: ReturnType<typeof setTimeout> | undefined;
let matrixResizeHandler: (() => void) | undefined;
const MATRIX_DURATION = 10000; // 10秒後に自動停止

// 戻り値: true = 開始, false = トグルで停止
export function toggleMatrixEffect(onAutoStop: () => void): boolean {
  const id = "matrix-canvas";
  if (document.getElementById(id)) {
    stopMatrixEffect();
    return false;
  }

  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "9998"; // ターミナルより下、コンテンツより上
  canvas.style.background = "black";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜ";
  const fontSize = 16;
  const drops: number[] = [];
  for (let i = 0; i < canvas.width / fontSize; i++) drops[i] = 1;

  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // 残像効果
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  matrixInterval = setInterval(draw, 33);

  matrixTimeout = setTimeout(() => {
    stopMatrixEffect();
    onAutoStop();
  }, MATRIX_DURATION);

  matrixResizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", matrixResizeHandler);

  return true;
}

export function stopMatrixEffect() {
  clearInterval(matrixInterval);
  clearTimeout(matrixTimeout);
  if (matrixResizeHandler) {
    window.removeEventListener("resize", matrixResizeHandler);
    matrixResizeHandler = undefined;
  }
  document.getElementById("matrix-canvas")?.remove();
}

export function stopAllEffects() {
  stopSmileEffect();
  stopMatrixEffect();
}
