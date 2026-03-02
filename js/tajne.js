/* --- 1. LOGIKA HRY (ZÁMEK - ÚVOD) --- */
let SECRET_CODE = [];
let currentGuess = [];
let attempts = 10;
let gameOver = false;

// Vygeneruje tajný kód a vypíše ho do konzole
function generateSecretCode() {
    SECRET_CODE = [];
    for(let i=0; i<4; i++) SECRET_CODE.push(Math.floor(Math.random() * 10));
    console.log("%c 🕵️‍♂️ Pssst! Kód je: " + SECRET_CODE.join(''), "background: #222; color: #bada55; font-size: 20px; padding: 10px;");
}
generateSecretCode();

function addNum(num) {
    if (currentGuess.length < 4 && !gameOver) {
        currentGuess.push(num);
        updateDisplay();
    }
}

function clearInput() {
    if(!gameOver) { 
        currentGuess = []; 
        updateDisplay(); 
        document.getElementById('message').innerText = ""; 
    }
}

function updateDisplay() {
    for (let i = 0; i < 4; i++) {
        let el = document.getElementById('d' + i);
        el.innerText = (currentGuess[i] !== undefined) ? currentGuess[i] : "";
    }
}

function checkCode() {
    if (currentGuess.length !== 4 || gameOver) return;
    attempts--;
    document.getElementById('attemptsLeft').innerText = attempts;

    let correctCount = 0;
    let historyHTML = '<div class="history-row">';
    let tempSecret = [...SECRET_CODE]; 

    for (let i = 0; i < 4; i++) {
        let num = currentGuess[i];
        let colorClass = "wrong";
        if (num === SECRET_CODE[i]) {
            colorClass = "correct";
            correctCount++;
            tempSecret[i] = null;
        } else if (tempSecret.includes(num)) {
            colorClass = "present";
        }
        historyHTML += `<div class="history-digit ${colorClass}">${num}</div>`;
    }
    historyHTML += '</div>';
    let historyContainer = document.getElementById('historyLog');
    historyContainer.innerHTML = historyHTML + historyContainer.innerHTML;

    if (correctCount === 4) {
        gameWin();
    } else if (attempts <= 0) {
        document.getElementById('message').innerText = "GAME OVER";
        setTimeout(() => { window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; }, 1000);
    } else {
        currentGuess = [];
        updateDisplay();
    }
}

function gameWin() {
    gameOver = true;
    document.getElementById('message').innerText = "ACCESS GRANTED";
    document.getElementById('message').style.color = "#0f0";
    setTimeout(() => {
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('memeContent').style.display = 'block';
        document.getElementById('clippy').style.display = 'block';
        startClippyJokes();
    }, 1000);
}

/* --- 2. MEME FUNKCE (RAM, SYSTEM32) --- */
function downloadRam() {
    let progress = document.getElementById('ramProgress');
    let text = document.getElementById('ramText');
    let val = 0;
    text.innerText = "Stahování... (Nezavírejte okno)";
    let interval = setInterval(() => {
        val += Math.random() * 3;
        progress.value = val;
        if (val >= 100) {
            clearInterval(interval);
            text.innerText = "Chyba: RAMka se zasekla v kabelu.";
            text.style.color = "orange";
        }
    }, 100);
}

function deleteSystem32() {
    if(confirm("Opravdu smazat System32?")) { alert("Chyba: Nedostatečná práva. Jsi jen uživatel."); }
}

function toggleComicSans() {
    document.body.classList.toggle('comic-mode');
}

let dodgeCount = 0;
function moveButton() {
    if (dodgeCount < 5) {
        let btn = document.getElementById('dangerBtn');
        let x = Math.random() * 200 - 100;
        let y = Math.random() * 200 - 100;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        dodgeCount++;
    }
}

function startClippyJokes() {
    const jokes = ["Vypadáš, že se snažíš pracovat. Mám to vypnout?", "Heslo '1234' není bezpečné.", "Pozor na viry!"];
    setInterval(() => {
        document.getElementById('clippyText').innerText = jokes[Math.floor(Math.random() * jokes.length)];
    }, 8000);
}

/* --- 3. RANSOMWARE LOGIKA --- */

let timerInterval;
let totalSeconds;

function triggerHack() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();

    document.getElementById('fake-overlay').style.display = 'block';
    let terminal = document.getElementById('terminal');
    let logs = "";
    let counter = 0;

    let matrixInterval = setInterval(() => {
        logs += "ENCRYPTING SECTOR " + Math.floor(Math.random() * 99999) + "... [LOCKED]<br>";
        terminal.innerHTML = logs;
        window.scrollTo(0, document.body.scrollHeight);
        counter++;
        if (counter > 40) {
            clearInterval(matrixInterval);
            terminal.style.display = 'none';
            showRansomware();
        }
    }, 30);
}

function showRansomware() {
    let wc = document.getElementById('ransomware');
    wc.style.display = 'flex';
    
    let audio = document.getElementById('scarySound');
    audio.play().catch(e => console.log("Audio needs interaction"));
    
    document.body.style.cursor = 'progress'; 
    
    // Spustit odpočet - 10 minut (600 sekund)
    startTimer(600); 
}

function startTimer(seconds) {
    totalSeconds = seconds;
    let el = document.getElementById('timer1'); 
    
    // Vyčistit předchozí interval, kdyby nějaký běžel
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        totalSeconds--;
        
        // Zobrazení 00:00:00 pokud je pod nulou
        if (totalSeconds < 0) totalSeconds = 0;

        let h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        let m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        let s = (totalSeconds % 60).toString().padStart(2, '0');
        el.innerText = `${h}:${m}:${s}`;
        
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            // Čas vypršel -> Spustit Hydra peklo
            startHydraMode();
        }
    }, 1000);
}

function solveRansomware() {
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('finalTroll').style.display = 'block';
    document.body.style.cursor = 'default';
    clearInterval(timerInterval);
}

/* --- 4. HACKING MINI-GAME (OPRAVENO) --- */
let hackLevel = 1;
let hackMarkerPos = 0;
let hackTargetStart = 0;
let hackTargetWidth = 0;
let hackDirection = 1;
let hackSpeed = 2;
let hackInterval;
let gameActive = false;

/* SPUŠTĚNÍ HACKOVACÍ HRY */
function startHackingGame() {
    document.getElementById('hack-overlay').style.display = 'flex';
    hackLevel = 1;
    gameActive = true;
    startHackLevel();
    
    // Posluchač pro mezerník
    document.addEventListener('keydown', handleSpacebar);
}

function startHackLevel() {
    document.getElementById('hack-level').innerText = `${hackLevel}/3`;
    
    let barBg = document.querySelector('.hack-bar-bg');
    let barWidth = barBg.offsetWidth;
    
    // Zmenšování cílové zóny s každým levelem
    hackTargetWidth = 60 - (hackLevel * 10); 
    hackTargetStart = Math.random() * (barWidth - hackTargetWidth);
    
    let target = document.getElementById('hack-target-zone');
    target.style.left = hackTargetStart + 'px';
    target.style.width = hackTargetWidth + 'px';
    
    hackMarkerPos = 0;
    
    // ZRYCHLOVÁNÍ: Level 1 = 3, Level 2 = 6, Level 3 = 10
    hackSpeed = 2 + (hackLevel * 3); 
    
    // Vyčistit předchozí interval
    if (hackInterval) clearInterval(hackInterval);
    
    hackInterval = setInterval(moveMarker, 15); // Plynulejší pohyb (nižší ms)
}

function moveMarker() {
    let barBg = document.querySelector('.hack-bar-bg');
    // Musíme ověřit, že element existuje, než změříme šířku
    if (!barBg) return; 

    let barWidth = barBg.offsetWidth;
    let markerWidth = 5; // Šířka markeru podle CSS

    // Posuneme marker
    hackMarkerPos += hackSpeed * hackDirection;
    
    // KONTROLA PRAVÉHO OKRAJE
    // Pokud vyjel doprava (barWidth - šířka markeru)
    if (hackMarkerPos >= (barWidth - markerWidth)) {
        hackMarkerPos = barWidth - markerWidth; // Natvrdo ho vrátíme na kraj
        hackDirection = -1; // Otočíme směr doleva
    }
    
    // KONTROLA LEVÉHO OKRAJE
    // Pokud vyjel doleva (pod 0)
    else if (hackMarkerPos <= 0) {
        hackMarkerPos = 0; // Natvrdo ho vrátíme na nulu
        hackDirection = 1; // Otočíme směr doprava
    }
    
    document.getElementById('hack-marker').style.left = hackMarkerPos + 'px';
}

function handleSpacebar(e) {
    if (e.code === 'Space' && gameActive) {
        e.preventDefault(); // Zastavit scrollování
        
        // Zastavit pohyb
        clearInterval(hackInterval);
        
        // Kontrola zásahu
        if (hackMarkerPos >= hackTargetStart && hackMarkerPos <= (hackTargetStart + hackTargetWidth)) {
            // ZÁSAH!
            hackLevel++;
            if (hackLevel > 3) {
                winGame();
            } else {
                // Efekt úspěchu (zelená)
                let bg = document.querySelector('.hack-bar-bg');
                bg.style.background = '#00aa00';
                
                setTimeout(() => {
                    bg.style.background = '#222';
                    startHackLevel(); // Spustit další level
                }, 500);
            }
        } else {
            // VEDLE!
            let bg = document.querySelector('.hack-bar-bg');
            bg.style.background = '#aa0000'; // Červená pro efekt chyby
            setTimeout(loseGame, 500); // Po chvilce spustit prohru
        }
    }
}

function winGame() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';
    
    // DŮLEŽITÉ: Zastavit odpočet ransomwaru, aby nezačal ječet, zatímco čteš zprávu
    clearInterval(timerInterval);

    // Místo alertu zobrazíme naše Windows okno úspěchu
    document.getElementById('win-success-overlay').style.display = 'flex';
}

// Tuto funkci volá tlačítko OK v okně úspěchu
function enterSecretArea() {
    // 1. Schovat okno úspěchu
    document.getElementById('win-success-overlay').style.display = 'none';

    // 2. Schovat CELÝ ransomware overlay (černé pozadí i wannacry)
    document.getElementById('fake-overlay').style.display = 'none';
    document.getElementById('ransomware').style.display = 'none';

    // 3. Schovat původní zámek (aby tam nezacláněl)
    document.getElementById('lockScreen').style.display = 'none';

    // 4. Zobrazit tajný obsah a Clippyho
    document.getElementById('memeContent').style.display = 'block';
    document.getElementById('clippy').style.display = 'block';
    
    // Vrátit kurzor myši do normálu
    document.body.style.cursor = 'default';

    startClippyJokes();
}

function loseGame() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';
    
    // PROHRA -> OKAMŽITÁ SMRT
    // 1. Nastavit časovač ransomwaru na 0
    totalSeconds = 0;
    document.getElementById('timer1').innerText = "00:00:00";
    clearInterval(timerInterval);

    // 2. Spustit HYDRA mód (vyskakovací okna)
    startHydraMode();
}

/* --- 5. HYDRA EFEKT A BSOD --- */

function startHydraMode() {
    // Pokud je zobrazený win-error-overlay z minula, schovat ho
    document.getElementById('win-error-overlay').style.display = 'none';
    
    // Spustit časovač do BSOD (30 sekund pekla)
    setTimeout(showBSOD, 30000); 
    
    // Spustit první vlnu
    spawnWindow();
}

function spawnWindow() {
    let container = document.getElementById('hydra-container');
    let win = document.createElement('div');
    win.className = 'win-window';
    
    let x = Math.random() * (window.innerWidth - 420);
    let y = Math.random() * (window.innerHeight - 200);
    win.style.left = x + 'px';
    win.style.top = y + 'px';
    win.style.zIndex = 1000 + document.getElementsByClassName('win-window').length;
    
    // Náhodné chybové hlášky
    const errors = ["Deleting System32...", "Sending data to FBI...", "Encrypting drive C:", "Critical Process Died", "Trojan.Win32 detected"];
    let randomError = errors[Math.floor(Math.random() * errors.length)];

    win.innerHTML = `
        <div class="win-title-bar">
            <span>System Error 0x800${Math.floor(Math.random()*999)}</span>
            <button class="win-close-btn">✕</button>
        </div>
        <div class="win-content">
            <div class="win-icon">❌</div>
            <div class="win-text">Critical Error: ${randomError}</div>
        </div>
        <div class="win-buttons">
            <button class="win-ok-btn">OK</button>
        </div>
    `;
    
    let closeBtn = win.querySelector('.win-close-btn');
    let okBtn = win.querySelector('.win-ok-btn');
    
    // Množení oken (Hydra efekt)
    let multiplyFunc = function() {
        win.remove(); 
        spawnTwoWindows(); 
    };
    
    closeBtn.onclick = multiplyFunc;
    okBtn.onclick = multiplyFunc;
    
    container.appendChild(win);
}

function spawnTwoWindows() {
    if (document.getElementsByClassName('win-window').length > 50) {
        showBSOD();
        return;
    }
    spawnWindow();
    setTimeout(spawnWindow, 150); // Rychlejší množení
}

function showBSOD() {
    document.getElementById('hydra-container').innerHTML = ''; // Vyčistit okna
    document.getElementById('bsod').style.display = 'block';
    document.documentElement.requestFullscreen().catch(e=>{});
}