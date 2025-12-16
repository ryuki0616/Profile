// 1. カスタムカーソル
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// ホバー時のカーソル拡大
const hoverElements = document.querySelectorAll('[data-hover], a, button');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursor.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = 'var(--text-main)';
    });
});

// 2. スクロールアニメーション (Intersection Observer)
const scrollElements = document.querySelectorAll('[data-scroll]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15 }); // 少ししきい値を上げる

scrollElements.forEach(el => {
    observer.observe(el);
});

// 3. Three.js 背景パーティクル
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// ピクセル比を考慮してレンダリング負荷を下げる（最大2倍まで）
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// パーティクル作成
const geometry = new THREE.BufferGeometry();
// 画面幅に応じてパーティクル数を調整（スマホ: 100, PC: 200）
const count = window.innerWidth < 768 ? 100 : 200;
const positions = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20; // 広範囲に配置
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));


const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff, // 白い点
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 5;

// アニメーションループ
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    
    // パーティクルをゆっくり回転
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.002;
    
    // マウス追従（少し遅れて動く）
    particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}
animate();

// リサイズ対応
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 4. 3D Tilt Effect (Philosophy Cards)
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // 最大10度
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// 5. 文字パララックス
const heroTitle = document.getElementById('hero-title');
window.addEventListener('scroll', () => {
    if (!heroTitle) return;
    const scrolled = window.pageYOffset;
    heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
    heroTitle.style.opacity = 1 - (scrolled / 500);
});

// ヘッダーのスクロール検知
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// -----------------------------------------------------------
// 6. 隠しコマンドターミナル & システム変数
// -----------------------------------------------------------
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalPromptText = document.getElementById('terminal-prompt-text');

// システム開始時間（Uptime計算用）
const startTime = Date.now();

// ファイルシステム定義
const fileSystem = {
    '/': ['home', 'etc'],
    '/home': ['ryuki'],
    '/home/ryuki': ['README.md', 'about.txt', 'skills.json', 'contact.info', 'projects.txt', '.secret_config'],
    '/etc': ['os-release', 'passwd']
};

const fileContents = {
    '/home/ryuki/README.md': '# Ryuki Profile\nWelcome to my terminal portfolio.\nType `help` for commands, `neofetch` for system info.',
    '/home/ryuki/about.txt': 'Name: Ryuki Sato\nRole: IT Engineer\nMission: Create smiles with technology.\nLoves: NFC, RFID, Flutter, Python.',
    '/home/ryuki/skills.json': '["JavaScript", "Python", "Flutter", "Dart", "Three.js", "HTML/CSS", "Node.js"]',
    '/home/ryuki/contact.info': 'Email: ryu727tmm19@gmail.com\nGitHub: https://github.com/ryuki0616\nX: https://x.com/kyarameru_dev',
    '/home/ryuki/projects.txt': '1. Digital Live Adventure (JS/Node.js)\n2. Log Check AI (Python/AI)\n3. AI & Machine Learning (Research)',
    '/home/ryuki/.secret_config': 'theme=dark\nsudo_admin=false\n',
    '/etc/os-release': 'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nVERSION="22.04.3 LTS (Jammy Jellyfish)"\nID=ubuntu',
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nryuki:x:1000:1000:Ryuki,,,:/home/ryuki:/bin/bash'
};

let currentDir = '/home/ryuki';

// プロンプト更新関数
function updatePrompt() {
    // Ubuntu風プロンプト: ryuki@profile:~/path$ 
    // ~ はホームディレクトリ (/home/ryuki)
    let displayPath = currentDir;
    if (displayPath.startsWith('/home/ryuki')) {
        displayPath = displayPath.replace('/home/ryuki', '~');
    }
    
    terminalPromptText.textContent = `ryuki@profile:${displayPath}$ `;
    terminalPromptText.style.color = '#51cf66'; // 緑色にしてUbuntuっぽく
}

// ショートカットキー (Ctrl + Alt + T)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTerminal();
    }
    // ESCキーで閉じる
    if (e.key === 'Escape' && terminalOverlay.classList.contains('active')) {
        toggleTerminal();
    }
});

// フォーカス制御（どこをクリックしても入力欄へ）
document.querySelector('.terminal-body').addEventListener('click', (e) => {
    // テキスト選択中はフォーカスを奪わない
    if (window.getSelection().toString().length === 0) {
        terminalInput.focus();
    }
});

// Vi / Vim キーバインド対応 (J: Down, K: Up)
document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

    const scrollAmount = 100; 

    if (e.key.toLowerCase() === 'j') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'k') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }
});

// コンソールログの隠しメッセージ
function initConsoleEasterEgg() {
    console.log(
        "%c Hello, Developer! \n%c Welcome to Ryuki's Profile. You found the secret console logs!",
        "color: #0f0; background: #000; font-size: 24px; padding: 10px; border-radius: 5px;",
        "color: #ccc; font-size: 14px; margin-top: 10px;"
    );
    console.log("%c Warning: High level of passion for technology detected.", "color: orange; font-weight: bold;");
    console.log("%c If you are looking for a software engineer who loves creating smiles, contact me: ryu727tmm19@gmail.com", "color: cyan; font-style: italic;");
}
initConsoleEasterEgg();


function toggleTerminal() {
    terminalOverlay.classList.toggle('active');
    if (terminalOverlay.classList.contains('active')) {
        terminalInput.value = '';
        terminalInput.focus();
        updatePrompt(); // 開いたときにも更新
    } else {
        // 閉じたときにクリアする（次回開いたときは初期状態）
        // ただし、完全にリセットする場合はイントロを再表示する必要がある
        terminalOutput.innerHTML = '';
        const intro = document.querySelector('.terminal-intro');
        if (intro) {
            intro.style.display = 'block'; // イントロを再表示
        }
    }
}

// コマンド履歴管理
const commandHistory = [];
let historyIndex = -1;
const AVAILABLE_COMMANDS = [
    'help', 'about', 'social', 'smile', 'matrix', 
    'fortune', 'omikuji', 'cls', 'stop', 'clearfx', 'exit', 'theme',
    'sudo', 'neofetch', 'ls', 'll', 'cat', 'grep', 'cd', 'pwd', 'whoami'
];

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const rawCommand = terminalInput.value.trim();
        
        if (rawCommand) {
            // 履歴に追加
            commandHistory.push(rawCommand);
            historyIndex = commandHistory.length;
        }

        processCommand(rawCommand); 
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const currentInput = terminalInput.value; // 大文字小文字を区別せずに取得、ただし補完時は元の入力を維持したい場合もあるが簡易実装
        if (!currentInput) return;

        const args = currentInput.split(/\s+/);
        
        // 第1引数（コマンド）の補完
        if (args.length === 1) {
            const cmdInput = args[0].toLowerCase();
            const matches = AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(cmdInput));
            if (matches.length === 1) {
                terminalInput.value = matches[0] + ' '; // コマンド確定後はスペースを入れる
            } else if (matches.length > 1) {
                // 共通部分まで補完するロジックも考えられるが、今回は単純に最初の候補
                terminalInput.value = matches[0];
            }
        } 
        // 第2引数以降（ファイル・ディレクトリ）の補完
        else if (args.length === 2) {
            const cmd = args[0].toLowerCase();
            const partialPath = args[1];
            
            // 補完対象のコマンドかチェック (cd, cat, ls, grepなど)
            if (['cd', 'cat', 'ls', 'll', 'grep'].includes(cmd)) {
                const files = fileSystem[currentDir] || [];
                // 部分一致検索
                const matches = files.filter(f => f.toLowerCase().startsWith(partialPath.toLowerCase()));
                
                if (matches.length === 1) {
                    terminalInput.value = `${args[0]} ${matches[0]}`;
                } else if (matches.length > 1) {
                    // 候補が複数ある場合は入力欄はそのままで候補を表示する等のUXもあるが
                    // ここでは最初の候補をセットする簡易実装
                    terminalInput.value = `${args[0]} ${matches[0]}`;
                }
            }
        }
    }
});

// セキュリティ: 入力サニタイゼーション関数
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    // HTML特殊文字をエスケープ
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// セキュリティ: コマンド検証関数
function validateCommand(cmd) {
    const allowedCommands = [
        'help', 'about', 'social', 'smile', 'matrix', 
        'fortune', 'omikuji', 'cls', 'stop', 'clearfx', 'exit', 'theme',
        'sudo', 'neofetch', 'ls', 'll', 'cat', 'grep', 'cd', 'pwd', 'whoami', 'clear'
    ];
    return allowedCommands.includes(cmd.toLowerCase());
}

// セキュリティ: パス検証関数（ディレクトリトラバーサル対策）
function sanitizePath(path) {
    // 危険な文字列を除去
    if (!path || typeof path !== 'string') return '';
    // パストラバーサル攻撃を防ぐ
    return path.replace(/\.\./g, '').replace(/[<>:"|?*\x00-\x1f]/g, '');
}

// 出力用関数（セキュリティ強化版）
function addOutput(text, type = 'normal') {
    const div = document.createElement('div');
    
    switch(type) {
        case 'command':
            // Ubuntu風プロンプト: ryuki@profile:~/path$ 
            let displayPath = currentDir;
            if (displayPath.startsWith('/home/ryuki')) {
                displayPath = displayPath.replace('/home/ryuki', '~');
            }
            const promptSpan = document.createElement('span');
            promptSpan.textContent = `ryuki@profile:${displayPath}$ `;
            promptSpan.style.color = '#51cf66'; // 緑色
            
            const cmdSpan = document.createElement('span');
            // ユーザー入力をサニタイズ
            cmdSpan.textContent = sanitizeInput(text);
            cmdSpan.style.color = '#ccc'; // コマンド本体は白/グレー
            
            div.appendChild(promptSpan);
            div.appendChild(cmdSpan);
            break;
        case 'error':
            div.textContent = sanitizeInput(text);
            div.style.color = '#ff6b6b';
            break;
        case 'success':
            div.textContent = sanitizeInput(text);
            div.style.color = '#51cf66';
            break;
        case 'neofetch':
            // neofetch専用の安全なDOM構築
            // innerHTMLを使わず、DOM APIで直接構築
            buildNeofetchOutput(div);
            break;
        default:
            // 通常出力はtextContentでエスケープする
            div.textContent = sanitizeInput(text);
            div.style.whiteSpace = 'pre-wrap'; // 改行を維持
    }
    
    terminalOutput.appendChild(div);
    
    // スクロール制御：全体が見えるように親要素を含めて調整
    // terminal-bodyのスクロール位置を一番下にする
    const terminalBody = document.querySelector('.terminal-body');
    requestAnimationFrame(() => {
         terminalBody.scrollTop = terminalBody.scrollHeight;
    });
}

// neofetch出力を安全に構築する関数（DOM API使用）
function buildNeofetchOutput(container) {
    const uptimeMillis = Date.now() - startTime;
    const uptimeSec = Math.floor(uptimeMillis / 1000);
    const hours = Math.floor(uptimeSec / 3600);
    const minutes = Math.floor((uptimeSec % 3600) / 60);
    const seconds = uptimeSec % 60;
    const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const logoColor = '#3b8eea';
    const titleColor = '#51cf66';
    
    // メインコンテナ
    const mainDiv = document.createElement('div');
    mainDiv.style.display = 'flex';
    mainDiv.style.gap = '20px';
    mainDiv.style.fontFamily = "'Courier New', monospace";
    
    // ロゴ部分
    const logoDiv = document.createElement('div');
    logoDiv.style.color = logoColor;
    logoDiv.style.fontWeight = 'bold';
    logoDiv.style.lineHeight = '1.2';
    logoDiv.style.whiteSpace = 'pre';
    logoDiv.textContent = `       RRRRRR
      RR   RR
     RR   RR
    RRRRRR
   RR  RR
  RR    RR
 RR      RR`;
    
    // 情報部分
    const infoDiv = document.createElement('div');
    infoDiv.style.lineHeight = '1.2';
    
    // タイトル
    const titleSpan = document.createElement('span');
    titleSpan.style.color = titleColor;
    titleSpan.style.fontWeight = 'bold';
    titleSpan.textContent = 'ryuki@profile';
    infoDiv.appendChild(titleSpan);
    infoDiv.appendChild(document.createElement('br'));
    
    // 区切り線
    infoDiv.appendChild(document.createTextNode('------------------'));
    infoDiv.appendChild(document.createElement('br'));
    
    // システム情報（安全に構築）
    const createInfoLine = (label, value) => {
        const line = document.createElement('div');
        const labelSpan = document.createElement('span');
        labelSpan.style.color = logoColor;
        labelSpan.style.fontWeight = 'bold';
        labelSpan.textContent = `${label}: `;
        line.appendChild(labelSpan);
        line.appendChild(document.createTextNode(value));
        return line;
    };
    
    const hostName = navigator.userAgent.indexOf("Chrome") > -1 ? "Chrome" : "Web Browser";
    const themeName = document.body.classList.contains('light-theme') ? 'Light' : 'Dark';
    
    infoDiv.appendChild(createInfoLine('OS', 'Ryuki OS v1.0 (Web)'));
    infoDiv.appendChild(createInfoLine('Host', hostName));
    infoDiv.appendChild(createInfoLine('Uptime', uptimeStr));
    infoDiv.appendChild(createInfoLine('Resolution', `${width}x${height}`));
    infoDiv.appendChild(createInfoLine('Shell', 'JS-Shell'));
    infoDiv.appendChild(createInfoLine('Theme', themeName));
    infoDiv.appendChild(createInfoLine('CPU', '100% Passion'));
    infoDiv.appendChild(document.createElement('br'));
    
    // カラーパレット
    const paletteDiv = document.createElement('div');
    paletteDiv.style.display = 'flex';
    paletteDiv.style.gap = '5px';
    const colors = ['#000', '#f00', '#0f0', '#ff0', '#00f', '#f0f', '#0ff', '#fff'];
    colors.forEach(color => {
        const colorSpan = document.createElement('span');
        colorSpan.style.background = color;
        colorSpan.style.width = '15px';
        colorSpan.style.height = '15px';
        paletteDiv.appendChild(colorSpan);
    });
    infoDiv.appendChild(paletteDiv);
    
    mainDiv.appendChild(logoDiv);
    mainDiv.appendChild(infoDiv);
    container.appendChild(mainDiv);
}

let secretAccessCount = 0;

function processCommand(rawCmd) {
    // セキュリティ: 入力検証
    if (!rawCmd || typeof rawCmd !== 'string') {
        addOutput('Invalid input', 'error');
        return;
    }
    
    // セキュリティ: 入力長制限（DoS対策）
    if (rawCmd.length > 1000) {
        addOutput('Command too long', 'error');
        return;
    }
    
    const cmdLower = rawCmd.toLowerCase().trim();
    const args = rawCmd.trim().split(/\s+/); // 空白区切りで引数を取得
    const command = args[0].toLowerCase();
    
    // セキュリティ: コマンド検証
    if (command && !validateCommand(command)) {
        addOutput(`'${sanitizeInput(command)}' is not recognized as an internal or external command, operable program or batch file.`, 'error');
        return;
    }

    addOutput(rawCmd, 'command');
    
    // 1. sudo コマンド
    if (command === 'sudo') {
        if (args.length < 2) {
            addOutput("usage: sudo command");
            return;
        }
        const targetCmd = args.slice(1).join(' ');
        if (targetCmd.toLowerCase() === 'smile') {
             addOutput(`[sudo] password for visitor: **********`);
             setTimeout(() => {
                 addOutput(`Access Granted. Initiating SUPER SMILE...`, 'success');
                 triggerSmileEffect(); 
             }, 800);
             return;
        }
        addOutput(`ryuki is not in the sudoers file. This incident will be reported.`, 'error');
        return;
    }

    // 2. ファイルシステム関連コマンド (ls, ll, cat, grep, pwd, cd)
    
    // ls / ll
    if (command === 'ls' || command === 'll') {
        const files = fileSystem[currentDir];
        if (!files) {
            addOutput(`Error: Directory not found`, 'error');
            return;
        }
        
        const showHidden = command === 'll' || args.includes('-a') || args.includes('-la');
        
        const visibleFiles = files.filter(f => showHidden || !f.startsWith('.'));
        
        if (visibleFiles.length === 0) {
            addOutput("(empty directory)");
        } else {
            // 列挙して表示
            const fileList = visibleFiles.map(f => {
                // 簡易的にディレクトリならスラッシュをつける（今回は全部ファイル扱いだがロジックとして）
                const fullPath = currentDir === '/' ? `/${f}` : `${currentDir}/${f}`;
                return fileSystem[fullPath] ? `${f}/` : f;
            }).join('  ');
            addOutput(fileList);
        }
        return;
    }

    // cat
    if (command === 'cat') {
        if (args.length < 2) {
            addOutput("usage: cat [filename]");
            return;
        }
        // セキュリティ: ファイル名をサニタイズ
        const fileName = sanitizePath(args[1]);
        if (!fileName) {
            addOutput("cat: Invalid filename", 'error');
            return;
        }
        // パス解決（簡易版）
        let targetPath = currentDir === '/' ? `/${fileName}` : `${currentDir}/${fileName}`;
        
        if (fileContents[targetPath]) {
            addOutput(fileContents[targetPath]);
        } else {
            // ディレクトリかどうかチェック
            if (fileSystem[targetPath]) {
                addOutput(`cat: ${sanitizeInput(fileName)}: Is a directory`, 'error');
            } else {
                addOutput(`cat: ${sanitizeInput(fileName)}: No such file or directory`, 'error');
            }
        }
        return;
    }

    // grep
    if (command === 'grep') {
        if (args.length < 3) {
            addOutput("usage: grep [pattern] [filename]");
            return;
        }
        // セキュリティ: パターンとファイル名をサニタイズ
        const pattern = sanitizeInput(args[1]);
        const fileName = sanitizePath(args[2]);
        if (!fileName) {
            addOutput("grep: Invalid filename", 'error');
            return;
        }
        let targetPath = currentDir === '/' ? `/${fileName}` : `${currentDir}/${fileName}`;

        if (fileContents[targetPath]) {
            const content = fileContents[targetPath];
            const lines = content.split('\n');
            // セキュリティ: パターンマッチングは安全（既存のファイル内容のみ）
            const matches = lines.filter(line => line.includes(pattern));
            if (matches.length > 0) {
                matches.forEach(m => addOutput(m));
            } 
            // マッチしなければ何も表示しないのがgrep流
        } else {
             addOutput(`grep: ${sanitizeInput(fileName)}: No such file or directory`, 'error');
        }
        return;
    }

    // cd
    if (command === 'cd') {
        let target = args[1];
        if (!target) target = '/home/ryuki'; // default to home
        
        // セキュリティ: パストラバーサル対策
        // 許可されたパスのみ許可
        const allowedPaths = ['/', '/home', '/home/ryuki', '/etc', '..', '~'];
        const isAllowedPath = allowedPaths.includes(target) || 
                             (target.startsWith('/home/ryuki') && fileSystem[target]);
        
        // パス解決ロジック
        let newPath = currentDir;
        
        if (target === '/') {
            newPath = '/';
        } else if (target === '..') {
            if (newPath !== '/') {
                const parts = newPath.split('/');
                parts.pop();
                newPath = parts.join('/') || '/';
            }
        } else if (target === '~') {
            newPath = '/home/ryuki';
        } else {
            // セキュリティ: パスをサニタイズ
            const sanitizedTarget = sanitizePath(target);
            if (!sanitizedTarget && target !== '/') {
                addOutput(`cd: ${sanitizeInput(target)}: Invalid path`, 'error');
                return;
            }
            // 相対パス or 絶対パス
            if (target.startsWith('/')) {
                newPath = sanitizedTarget || target;
            } else {
                newPath = currentDir === '/' ? `/${sanitizedTarget}` : `${currentDir}/${sanitizedTarget}`;
            }
        }
        
        // ディレクトリ存在確認
        if (fileSystem[newPath]) {
            currentDir = newPath;
            updatePrompt(); // プロンプト更新
        } else {
            addOutput(`cd: ${sanitizeInput(target)}: No such file or directory`, 'error');
        }
        return;
    }

    // pwd
    if (command === 'pwd') {
        addOutput(currentDir);
        return;
    }
    
    // whoami
    if (command === 'whoami') {
        addOutput("ryuki");
        return;
    }

    // neofetch implementation
    if (command === 'neofetch') {
        // セキュリティ: DOM APIを使用して安全に構築
        const div = document.createElement('div');
        buildNeofetchOutput(div);
        terminalOutput.appendChild(div);
        
        // スクロール制御
        const terminalBody = document.querySelector('.terminal-body');
        requestAnimationFrame(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        });
        return;
    }

    switch(command) {
        case 'help':
            addOutput("Available commands:");
            addOutput("  neofetch - System Information");
            addOutput("  ls       - List files");
            addOutput("  cat      - Read file");
            addOutput("  cd       - Change directory");
            addOutput("  about    - Display profile info");
            addOutput("  social   - Show social links");
            addOutput("  smile    - Spread happiness (Effect)");
            addOutput("  matrix   - Enter the matrix (Effect)");
            addOutput("  fortune  - Today's engineer fortune");
            addOutput("  cls      - Clear screen");
            addOutput("  theme    - Toggle light/dark theme");
            break;
        case 'about':
            addOutput("Ryuki Sato - Software Engineer");
            addOutput("Specialized in Flutter, Python, and AI.");
            addOutput("Mission: Make everyone smile with technology.");
            break;
        case 'social':
            addOutput("GitHub: https://github.com/ryuki0616");
            addOutput("X (Twitter): https://x.com/kyarameru_dev");
            break;
        case 'smile':
            addOutput("Spreading happiness...", 'success');
            triggerSmileEffect();
            break;
        case 'matrix':
            addOutput("Entering the Matrix...", 'success');
            toggleMatrixEffect();
            break;
        case 'fortune':
        case 'omikuji':
            addOutput(getFortune());
            break;
        case 'cls':
        case 'clear':
            // セキュリティ: innerHTMLの代わりにremoveChildを使用
            while (terminalOutput.firstChild) {
                terminalOutput.removeChild(terminalOutput.firstChild);
            }
            // イントロメッセージも消すために非表示にするか、削除する
            const intro = document.querySelector('.terminal-intro');
            if (intro) {
                intro.style.display = 'none';
            }
            break;
        case 'stop':
        case 'clearfx':
            stopAllEffects();
            addOutput("All effects stopped.");
            break;
        case 'exit':
            toggleTerminal();
            break;
        case 'theme':
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                material.color.setHex(0x111111); 
            } else {
                material.color.setHex(0xffffff); 
            }
            addOutput("Theme toggled.");
            break;
        case '':
            break;
        default:
            // このケースは既にprocessCommandの最初で検証されているため、通常は到達しない
            addOutput(`'${sanitizeInput(command)}' is not recognized as an internal or external command, operable program or batch file.`, 'error');
    }
}

// -----------------------------------------------------------
// コマンド用エフェクト実装
// -----------------------------------------------------------

// 1. Smile Effect
let smileInterval;
let smileTimeout;
let smileCleanupTimeout;

function triggerSmileEffect() {
    // 既存のSMILEがあれば停止
    stopSmileEffect();

    const smiles = ['😊', '😄', '😁', '😆', '😉', '😍', '😎', '😸', ':)', '(:', '(^_^)', '✨', '💻'];
    const container = document.createElement('div');
    container.id = 'smile-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    // 5秒間生成し続ける
    smileInterval = setInterval(() => {
        const smile = document.createElement('div');
        smile.textContent = smiles[Math.floor(Math.random() * smiles.length)];
        smile.style.position = 'absolute';
        smile.style.left = Math.random() * 100 + 'vw';
        smile.style.top = '-50px';
        smile.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        smile.style.color = '#fff';
        smile.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
        smile.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        container.appendChild(smile);

        smile.addEventListener('animationend', () => {
            smile.remove();
        });
    }, 100);

    smileTimeout = setTimeout(() => {
        clearInterval(smileInterval);
        smileCleanupTimeout = setTimeout(() => {
            if(container.parentNode) container.remove();
        }, 5000); // 最後のエレメントが消えるのを待つ
    }, 5000); // 生成時間
}

function stopSmileEffect() {
    clearInterval(smileInterval);
    clearTimeout(smileTimeout);
    clearTimeout(smileCleanupTimeout);
    const container = document.getElementById('smile-container');
    if (container) {
        container.remove();
    }
}

// 2. Matrix Effect
let matrixInterval;
function toggleMatrixEffect() {
    const id = 'matrix-canvas';
    let canvas = document.getElementById(id);
    
    // 既に存在すれば削除（トグル機能）
    if (canvas) {
        stopMatrixEffect();
        addOutput("Matrix effect disabled.");
        return;
    }

    canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9998'; // ターミナルより下、コンテンツより上
    canvas.style.background = 'black';
    canvas.style.pointerEvents = 'none'; // クリック透過
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // 残像効果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // 緑色の文字
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    matrixInterval = setInterval(draw, 33);
    
    // リサイズ対応
    window.addEventListener('resize', () => {
        if(document.getElementById(id)) {
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight; 
        }
    });
}

function stopMatrixEffect() {
    clearInterval(matrixInterval);
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.remove();
    }
}

function stopAllEffects() {
    stopSmileEffect();
    stopMatrixEffect();
}

// 3. Fortune Logic
function getFortune() {
    const fortunes = [
        "大吉: バグのないコードが書けるでしょう。デプロイも一発成功！",
        "中吉: 新しい技術スタックとの出会いがありそう。",
        "小吉: 些細なTypoに注意。Linterは友達。",
        "吉: リファクタリング日和。コードが綺麗になります。",
        "末吉: 依存関係の競合に巻き込まれるかも。package-lock.jsonを信じて。",
        "凶: 全角スペースが混入する予感...",
        "大凶: `rm -rf /` を打ちそうになるかも。指差し確認を！"
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
