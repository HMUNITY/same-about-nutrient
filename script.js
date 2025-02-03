// TCM duomenys
const tcmData = [
    { laikas: "7–11 val.", organas: "Skrandis / Blužnis", funkcija: "Virškinimas", mikroelementai: "Cinkas, Chromas" },
    { laikas: "11–13 val.", organas: "Širdis", funkcija: "Kraujotaka", mikroelementai: "Geležis, Varis" },
    { laikas: "15–19 val.", organas: "Inkstai / Šlapimo pūslė", funkcija: "Skysčių balansas", mikroelementai: "Magnis, Kalis" },
    { laikas: "19–21 val.", organas: "Perikardas", funkcija: "Emocinė būsena", mikroelementai: "Magnis, Kalis" },
    { laikas: "1–3 val.", organas: "Kepenys", funkcija: "Detoksikacija", mikroelementai: "Geležis, Cinkas, Varis" }
];

// Užpildome TCM lentelę
function fillTcmTable() {
    const tbody = document.querySelector("#tcmTable tbody");
    tbody.innerHTML = tcmData.map(item => `
        <tr>
            <td>${item.laikas}</td>
            <td>${item.organas}</td>
            <td>${item.funkcija}</td>
            <td>${item.mikroelementai}</td>
        </tr>
    `).join('');
}

// Pacman žaidimo klasė
class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.pacman = { x: 50, y: 150, radius: 15, speed: 2, direction: Math.PI / 4 };
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letterObjects = [];
        this.init();
    }

    init() {
        this.spawnLetters(5);
        this.gameLoop();
    }

    spawnLetters(count) {
        for (let i = 0; i < count; i++) {
            this.letterObjects.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                letter: this.letters[Math.floor(Math.random() * this.letters.length)],
                active: true
            });
        }
    }

    checkCollisions() {
        this.letterObjects.forEach(letter => {
            if (letter.active) {
                const dx = this.pacman.x - letter.x;
                const dy = this.pacman.y - letter.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.pacman.radius + 15) {
                    letter.active = false;
                    this.score++;
                    document.getElementById('scoreCounter').textContent = this.score;
                }
            }
        });
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        if (this.pacman.x < 0 || this.pacman.x > this.canvas.width) this.pacman.direction = Math.PI - this.pacman.direction;
        if (this.pacman.y < 0 || this.pacman.y > this.canvas.height) this.pacman.direction = -this.pacman.direction;

        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        this.letterObjects.forEach(letter => {
            if (letter.active) {
                this.ctx.font = '20px Arial';
                this.ctx.fillText(letter.letter, letter.x, letter.y);
            }
        });

        this.checkCollisions();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Dienoraščio funkcijos
document.getElementById('diaryBtn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('diaryModal').style.display = 'block';
});

document.getElementById('closeDiary').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('diaryModal').style.display = 'none';
});

function analyzeFood() {
    const text = document.getElementById("foodEntry").value;
    const ingredients = text.split(/,\s*|\n/);
    let nutrientSummary = {};

    ingredients.forEach(ingredient => {
        const [name, amount] = ingredient.split(':').map(s => s.trim());
        const nutrients = calculateIngredientMicronutrients(name, parseFloat(amount) || 100);
        
        Object.entries(nutrients).forEach(([nutrient, value]) => {
            nutrientSummary[nutrient] = (nutrientSummary[nutrient] || 0) + value;
        });
    });

    displayNutrientAnalysis(nutrientSummary);
}

function displayNutrientAnalysis(summary) {
    const analysisDiv = document.getElementById("nutrientAnalysis");
    analysisDiv.innerHTML = Object.entries(summary).map(([nutrient, value]) => `
        <div class="nutrient-item">
            <div class="nutrient-name">${nutrient}</div>
            <div class="nutrient-progress">
                <div class="progress-bar" style="width: ${Math.min(100, (value / dailyValues[nutrient]) * 100)}%">
                    ${Math.round((value / dailyValues[nutrient]) * 100)}%
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializacija
window.addEventListener('load', () => {
    fillTcmTable();
    new PacmanGame();
});
