/* --- 1. LOGIKA HRY (ZÁMEK - ÚVOD) --- */
let SECRET_CODE = [];
let currentGuess = [];
let attempts = 10;
let gameOver = false;

// Vygeneruje tajný kód
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

/* --- 2. MEME FUNKCE --- */
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
// Časovače
let timeToRaise = 60; // 1 minuta do zvednutí ceny
let timeToLost = 3600; // 1 hodina do smazání

// Peníze a rychlost
let currentPrice = 300;
let currency = "$";
let speedMultiplier = 1; // Normální rychlost (1s = 1s)

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
    
    startTimers(); 
}

function startTimers() {
    if (timerInterval) clearInterval(timerInterval);

    let el1 = document.getElementById('timer1'); // Payment raise timer
    let el2 = document.getElementById('timer2'); // Lost files timer
    let priceLabel = document.getElementById('ransom-price');

    timerInterval = setInterval(() => {
        // --- ČASOVAČ 1: ZVEDNUTÍ CENY ---
        if (timeToRaise > 0) {
            timeToRaise--;
            el1.innerText = formatTime(timeToRaise);
        } else {
            el1.innerText = "00:00:00";
            if (currency === "$") {
                currency = "BTC";
                currentPrice = 1;
                priceLabel.innerText = "1 BTC";
                priceLabel.style.color = "red";
                priceLabel.style.fontWeight = "bold";
                alert("PRICE INCREASED! Payment required: 1 BTC");
            }
        }

        // --- ČASOVAČ 2: SMAZÁNÍ DAT (S brutálním zrychlením) ---
        if (timeToLost > 0) {
            // Odečítáme 'speedMultiplier' sekund každou sekundu
            timeToLost -= speedMultiplier; 
            if (timeToLost < 0) timeToLost = 0;
            el2.innerText = formatTime(timeToLost);
        } else {
            clearInterval(timerInterval);
            el2.innerText = "00:00:00";
            startHydraMode();
        }

    }, 1000); 
}

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    let m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    let s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function solveRansomware() {
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('finalTroll').style.display = 'block';
    document.body.style.cursor = 'default';
    clearInterval(timerInterval);
}


/* --- 4. HACKING MINI-GAME --- */
let hackLevel = 1;
let hackMarkerPos = 0;
let hackTargetStart = 0;
let hackTargetWidth = 0;
let hackDirection = 1;
let hackSpeed = 2;
let hackInterval;
let gameActive = false;

function startHackingGame() {
    document.getElementById('hack-overlay').style.display = 'flex';
    hackLevel = 1;
    gameActive = true;
    startHackLevel();
    document.addEventListener('keydown', handleSpacebar);
}

function startHackLevel() {
    document.getElementById('hack-level').innerText = `${hackLevel}/3`;
    
    let barBg = document.querySelector('.hack-bar-bg');
    let barWidth = barBg.offsetWidth;
    
    hackTargetWidth = 60 - (hackLevel * 10); 
    hackTargetStart = Math.random() * (barWidth - hackTargetWidth);
    
    let target = document.getElementById('hack-target-zone');
    target.style.left = hackTargetStart + 'px';
    target.style.width = hackTargetWidth + 'px';
    
    hackMarkerPos = 0;
    hackSpeed = 2 + (hackLevel * 3); 
    
    if (hackInterval) clearInterval(hackInterval);
    hackInterval = setInterval(moveMarker, 15); 
}

function moveMarker() {
    let barBg = document.querySelector('.hack-bar-bg');
    if (!barBg) return;

    let barWidth = barBg.offsetWidth;
    let markerWidth = 5;

    hackMarkerPos += hackSpeed * hackDirection;
    
    if (hackMarkerPos >= (barWidth - markerWidth)) {
        hackMarkerPos = barWidth - markerWidth;
        hackDirection = -1;
    }
    else if (hackMarkerPos <= 0) {
        hackMarkerPos = 0;
        hackDirection = 1;
    }
    
    document.getElementById('hack-marker').style.left = hackMarkerPos + 'px';
}

function handleSpacebar(e) {
    if (e.code === 'Space' && gameActive) {
        e.preventDefault(); 
        clearInterval(hackInterval);
        
        if (hackMarkerPos >= hackTargetStart && hackMarkerPos <= (hackTargetStart + hackTargetWidth)) {
            // ZÁSAH
            hackLevel++;
            if (hackLevel > 3) {
                winMiniGame();
            } else {
                let bg = document.querySelector('.hack-bar-bg');
                bg.style.background = '#00aa00';
                setTimeout(() => {
                    bg.style.background = '#222';
                    startHackLevel();
                }, 500);
            }
        } else {
            // VEDLE -> TREST
            let bg = document.querySelector('.hack-bar-bg');
            bg.style.background = '#aa0000'; 
            setTimeout(failMiniGameAttempt, 500); 
        }
    }
}

function winMiniGame() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';
    
    // TADY JE OPRAVA ČASOVAČE: Tvrdé zastavení
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; // Zničíme ho úplně
    }

    // Zobrazit nové Windows okno úspěchu (bez alertu)
    document.getElementById('win-success-overlay').style.display = 'flex';
}
// ZMĚNA: Trest je nyní brutální (60x, pak 2x)
function failMiniGameAttempt() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';

    // 1. Zrychlení časovače
    if (speedMultiplier === 1) {
        speedMultiplier = 60; // První chyba: 60x rychleji
    } else {
        speedMultiplier *= 2; // Další chyby: 120x, 240x...
    }

    // 2. Zdvojnásobit dluh
    currentPrice *= 2;
    
    // Aktualizace textu ceny
    let priceLabel = document.getElementById('ransom-price');
    if (priceLabel) {
        priceLabel.innerText = currentPrice + " " + currency;
        priceLabel.style.color = "red";
    }

    // 3. Vykreslit trest do nového okna
    let failText = document.getElementById('fail-message-text');
    if (failText) {
        failText.innerHTML = `<strong>Security breach detected.</strong><br>Time speed: <span style="color:red; font-weight:bold;">${speedMultiplier}x</span><br>New Debt: <strong>${currentPrice} ${currency}</strong>`;
    }
    
    // Zobrazit okno selhání
    document.getElementById('win-fail-overlay').style.display = 'flex';
}
function closeFailWindow() {
    document.getElementById('win-fail-overlay').style.display = 'none';
}
function enterSecretArea() {
    // Pro jistotu zastavíme časovač i tady
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; 
    }

    document.getElementById('win-success-overlay').style.display = 'none';
    document.getElementById('fake-overlay').style.display = 'none';
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('lockScreen').style.display = 'none';
    
    document.getElementById('memeContent').style.display = 'block';
    document.getElementById('clippy').style.display = 'block';
    document.body.style.cursor = 'default';
    startClippyJokes();
}
/* --- 5. HYDRA EFEKT A BSOD --- */
let spawnSpeed = 800;
const funnyFiles = [
    "Domácí úkoly 2024.docx", "Minecraft_Save_World_Survival.dat", "Hesla_Instagram_Facebook.txt",
    "Tajný_deníček.doc", "Prezentace_Škola_FINAL_verze2.pptx", "Brawl_Stars_Login_Info.json",
    "Složka: System32", "Windows Kernel.dll", "Bootloader.exe", "Registry_Backup.reg",
    "Foto_z_Vánoc_trapné.jpg", "TikTok_Drafts_Backup.mp4", "Roblox_Robux_Hack.exe",
    "Fortnite_Account_Skiny.txt", "Písemka_Matika_tahák.jpg", "Referát_Dějepis.doc",
    "Steam_Library_Backup", "Discord_Chat_Logs.txt", "Snapchat_Memories.zip",
    "Virus_Definition_Database", "User_Profile_Data", "Browser_History_FULL.log",
    "Cookies_NetFlix.dat", "Spotify_Playlist_Tajný.mp3", "GTA_V_Savegame.sav",
    "League_of_Legends_Replays", "CS2_Config.cfg", "Valorant_Skins.txt",
    "Školní_Email_Heslo.txt", "Práce_do_Fyziky.pdf", "Chemické_tabulky.pdf",
    "Videa_z_výletu.mp4", "Rodinné_oslavy.avi", "Dokumenty_Rodiče_Tajné.pdf",
    "Bankovní_Výpis.pdf", "Kryptopeněženka.dat", "Bitcoin_Miner.exe",
    "Wi-Fi_Hesla_Sousedů.txt", "Hack_Tools_Collection", "Kali_Linux_ISO",
    "Ovladače_Grafické_Karty", "DirectX_Shaders_Cache", "Temp_Files",
    "Koš (Recycle Bin)", "Plocha (Desktop)", "Dokumenty (Documents)",
    "Stažené soubory (Downloads)", "Obrázky (Pictures)", "Hudba (Music)",
    "Video (Videos)", "Hry (Games)", "Program Files"
];

function startHydraMode() {
    document.getElementById('win-error-overlay').style.display = 'none';
    document.getElementById('timer1').style.color = "red";
    document.getElementById('timer1').style.fontSize = "45px";
    setTimeout(showBSOD, 30000); 
    autoSpawnLoop();
}

function autoSpawnLoop() {
    if (document.getElementById('bsod').style.display === 'block') return;
    spawnWindow();
    setTimeout(autoSpawnLoop, spawnSpeed);
}

function spawnWindow() {
    if (document.getElementsByClassName('win-window').length > 80) return;

    let container = document.getElementById('hydra-container');
    let win = document.createElement('div');
    win.className = 'win-window';
    
    let x = Math.random() * (window.innerWidth - 350);
    let y = Math.random() * (window.innerHeight - 200);
    win.style.left = x + 'px';
    win.style.top = y + 'px';
    win.style.zIndex = 10000 + document.getElementsByClassName('win-window').length;
    
    let randomFile = funnyFiles[Math.floor(Math.random() * funnyFiles.length)];

    win.innerHTML = `
        <div class="win-title-bar" style="background: #ffcccc;">
            <span>Deleting File...</span>
            <button class="win-close-btn">✕</button>
        </div>
        <div class="win-content">
            <div class="win-icon">🗑️</div>
            <div class="win-text">
                <strong>Permanently deleting:</strong><br>
                ${randomFile}<br>
                <span style="color: red; font-size: 12px;">(Cannot be undone)</span>
            </div>
        </div>
        <div class="win-buttons">
            <button class="win-ok-btn">Cancel</button>
        </div>
    `;
    
    let closeBtn = win.querySelector('.win-close-btn');
    let cancelBtn = win.querySelector('.win-ok-btn');
    
    closeBtn.onclick = function() { triggerHydraEffect(win); };
    cancelBtn.onclick = function() { triggerHydraEffect(win); };
    
    container.appendChild(win);
}

function triggerHydraEffect(windowElement) {
    windowElement.remove();
    if (spawnSpeed > 100) spawnSpeed -= 50;
    spawnWindow();
    setTimeout(spawnWindow, 100); 
}

function showBSOD() {
    document.getElementById('hydra-container').innerHTML = ''; 
    document.getElementById('ransomware').style.display = 'none'; 
    document.getElementById('bsod').style.display = 'block';
    document.documentElement.requestFullscreen().catch(e=>{});
}