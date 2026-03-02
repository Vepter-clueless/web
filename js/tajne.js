/* --- 1. LOGIKA HRY --- */
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

/* --- 3. HACK A RANSOMWARE LOGIKA --- */

// Globální proměnné pro časovač, abychom ho mohli ovládat odkudkoliv
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
    let el = document.getElementById('timer1'); // Použijeme ten hlavní červený časovač
    
    timerInterval = setInterval(() => {
        totalSeconds--;
        
        // Formátování času HH:MM:SS
        let h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        let m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        let s = (totalSeconds % 60).toString().padStart(2, '0');
        el.innerText = `${h}:${m}:${s}`;
        
        // Konec odpočtu
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            el.innerText = "00:00:00";
            startFakeDeletion(); // SPUSTIT MAZÁNÍ!
        }
    }, 1000);
}

// Funkce pro tlačítko "DECRYPT" - Toto je ta past!
function trapDecrypt() {
    alert("CRITICAL ERROR: Payment verification failed! Penalty applied.");
    
    // Zrychlíme čas - skočíme rovnou na 3 sekundy do konce
    totalSeconds = 3; 
    
    // Změníme barvu časovače na rudou
    document.getElementById('timer1').style.color = "red";
    document.getElementById('timer1').style.fontSize = "40px";
}

// Funkce pro falešné mazání souborů
function startFakeDeletion() {
    const funnyFolders = [
        "Domácí úkoly 2024",
        "Složka s trapnými fotkami",
        "Minecraft Save World",
        "Brawl Stars Účet (Login)",
        "Instagram Hesla",
        "Plocha",
        "Stažené soubory",
        "TikTok Videa (Drafts)",
        "System32",
        "Windows Kernel"
    ];

    let container = document.getElementById('deletion-container');
    let i = 0;

    // Rychlá smyčka, která sype okna
    let deleteInterval = setInterval(() => {
        if (i >= funnyFolders.length) {
            clearInterval(deleteInterval);
            // Finále po smazání všeho
            setTimeout(() => {
                alert("SYSTEM DESTROYED. GOODBYE.");
                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll
            }, 2000);
            return;
        }

        // Vytvoření okna
        let div = document.createElement('div');
        div.className = 'delete-alert';
        div.innerText = "❌ DELETING: " + funnyFolders[i];
        
        // Náhodná pozice na obrazovce
        let x = Math.floor(Math.random() * (window.innerWidth - 300));
        let y = Math.floor(Math.random() * (window.innerHeight - 100));
        div.style.left = x + 'px';
        div.style.top = y + 'px';

        container.appendChild(div);
        
        // Přehrát zvuk (volitelné, pokud bys chtěl extra efekt)
        // document.getElementById('scarySound').play();

        i++;
    }, 800); // Každých 0.8 sekundy jedno okno
}

function solveRansomware() {
    // Tlačítko Check Payment funguje správně
    document.getElementById('ransomware').style.display = 'none';
    document.getElementById('finalTroll').style.display = 'block';
    document.body.style.cursor = 'default';
    clearInterval(timerInterval); // Zastavit odpočet, když zaplatí
}