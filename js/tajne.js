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

/* --- FUNKCE PRO VÝHRU ZÁMKU (Otevře Meme část) --- */
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
let spawnSpeed = 800; // Výchozí rychlost (ms) pro Hydra efekt

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
    
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        totalSeconds--;
        
        if (totalSeconds < 0) totalSeconds = 0;

        let h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        let m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        let s = (totalSeconds % 60).toString().padStart(2, '0');
        el.innerText = `${h}:${m}:${s}`;
        
        // KDYŽ ČAS VYPRŠÍ -> START PEKLA
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            el.innerText = "00:00:00";
            startHydraMode();
        }
    }, 1000);
}

function solveRansomware() {
    // Tlačítko Check Payment - finále
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('finalTroll').style.display = 'block';
    document.body.style.cursor = 'default';
    clearInterval(timerInterval);
}


/* --- 4. HACKING MINI-GAME (S OPRAVOU ZASEKÁVÁNÍ) --- */
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
    
    // ZRYCHLOVÁNÍ
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
    
    // OPRAVA ZASEKÁVÁNÍ (Wall Bounce fix)
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
            // ZÁSAH!
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
            // VEDLE! -> Prohra
            let bg = document.querySelector('.hack-bar-bg');
            bg.style.background = '#aa0000'; 
            setTimeout(loseGame, 500); 
        }
    }
}

/* ÚSPĚCH V MINI-HŘE */
function winMiniGame() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';
    
    // Zastavit časovač
    clearInterval(timerInterval);

    // Zobrazit Windows okno úspěchu
    document.getElementById('win-success-overlay').style.display = 'flex';
}

/* VSTUP ZPĚT DO TAJNÉ SEKCE (Po kliknutí OK v úspěšném okně) */
function enterSecretArea() {
    document.getElementById('win-success-overlay').style.display = 'none';
    document.getElementById('fake-overlay').style.display = 'none';
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('lockScreen').style.display = 'none';
    
    document.getElementById('memeContent').style.display = 'block';
    document.getElementById('clippy').style.display = 'block';
    document.body.style.cursor = 'default';
    startClippyJokes();
}

/* PROHRA V MINI-HŘE */
function loseGame() {
    gameActive = false;
    document.removeEventListener('keydown', handleSpacebar);
    document.getElementById('hack-overlay').style.display = 'none';
    
    // Časovač na nulu a START PEKLA
    totalSeconds = 0;
    document.getElementById('timer1').innerText = "00:00:00";
    clearInterval(timerInterval);

    startHydraMode();
}


/* --- 5. HYDRA EFEKT A BSOD (S MAZÁNÍM SOUBORŮ) --- */

// VELKÝ SEZNAM SOUBORŮ (50+)
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
    // Schováme případné Windows Errory, ale Ransomware necháme vidět!
    document.getElementById('win-error-overlay').style.display = 'none';
    
    // Zčervenání časovače
    document.getElementById('timer1').style.color = "red";
    document.getElementById('timer1').style.fontSize = "45px";
    
    // Odpočet do BSOD (30s)
    setTimeout(showBSOD, 30000); 
    
    // Spustit automatické vyskakování
    autoSpawnLoop();
}

function autoSpawnLoop() {
    if (document.getElementById('bsod').style.display === 'block') return;

    spawnWindow();
    
    // Rekurzivní volání s aktuální rychlostí
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
    
    // HYDRA EFEKT: Kliknutí na X nebo Cancel zavolá množení
    let closeBtn = win.querySelector('.win-close-btn');
    let cancelBtn = win.querySelector('.win-ok-btn');
    
    closeBtn.onclick = function() { triggerHydraEffect(win); };
    cancelBtn.onclick = function() { triggerHydraEffect(win); };
    
    container.appendChild(win);
}

function triggerHydraEffect(windowElement) {
    // 1. Smazat zavřené okno
    windowElement.remove();
    
    // 2. Zrychlit vyskakování
    if (spawnSpeed > 100) {
        spawnSpeed -= 50;
    }
    
    // 3. Otevřít DVĚ nová
    spawnWindow();
    setTimeout(spawnWindow, 100); 
}

function showBSOD() {
    document.getElementById('hydra-container').innerHTML = ''; 
    document.getElementById('ransomware').style.display = 'none'; 
    document.getElementById('bsod').style.display = 'block';
    document.documentElement.requestFullscreen().catch(e=>{});
}