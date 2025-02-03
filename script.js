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
    tbody.innerHTML = tcmData.map(item => 
        `<tr>
            <td>${item.laikas}</td>
            <td>${item.organas}</td>
            <td>${item.funkcija}</td>
            <td>${item.mikroelementai}</td>
        </tr>`
    ).join('');
}

// Maistinių medžiagų duomenys
const dailyValues = {
    B1: 1.1, B2: 1.0, B3: 35.0, B5: 5.0, B6: 1.3, B7: 0.03, B12: 2.4,
    VitaminA: 700, VitaminC: 75, VitaminD: 15, VitaminE: 15, VitaminK: 90,
    Calcium: 1000, Iron: 18, Magnesium: 310, Phosphorus: 700, Potassium: 2600,
    Zinc: 8, Selenium: 55, Copper: 0.9, Manganese: 1.8, Chromium: 0.025,
    Molybdenum: 0.045, Iodine: 150, Chloride: 2300, Choline: 425
};

// Maistinių medžiagų šaltiniai
const micronutrientSources = {
    B1: { Asparagus: 0.05, SunflowerSeeds: 0.03, GreenPeas: 0.02, SesameSeeds: 0.04 },
    B2: { Spinach: 0.03, SoyBeans: 0.02, Asparagus: 0.02, Eggs: 0.05 },
    B3: { Tuna: 0.1, Chicken: 0.08, Salmon: 0.09, Beef: 0.07 },
    B5: { MushroomShiitake: 0.04, MushroomCrimini: 0.02, SweetPotatoes: 0.01, Chicken: 0.03 },
    B6: { Turkey: 0.05, Beef: 0.04, Salmon: 0.04, Chicken: 0.03, Banana: 0.02 },
    B7: { Tomato: 0.01, Eggs: 0.02, Onions: 0.01, Carrot: 0.01, Banana: 0.01 },
    B12: { Yogurt: 0.1, Eggs: 0.03, Sardines: 0.05, Tuna: 0.04 },
    VitaminA: { Spinach: 0.1, Carrot: 0.08, SweetPotato: 0.09, Kale: 0.11 },
    VitaminC: { BrusselsSprouts: 0.08, Strawberries: 0.06, Papaya: 0.1 },
    VitaminD: { Eggs: 0.02, Salmon: 0.03, SunExposure: 0.05 },
    Calcium: { Tofu: 0.1, Cheese: 0.2, Yogurt: 0.15, Sardines: 0.08 },
    Iron: { SpinachSwissChard: 0.05, Beans: 0.04, PumpkinSeeds: 0.03 },
    Magnesium: { AlmondMigdolas: 0.06, SoybeansPupeles: 0.05, BrownRice: 0.04 },
    Phosphorus: { Chicken: 0.07, Turkey: 0.06, Yogurt: 0.05 },
    Iodine: { Seaweed: 0.2, Fish: 0.1, Shrimp: 0.08 }
};

// Maisto analizė
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

// Rodyti maistinės medžiagos analizę
function displayNutrientAnalysis(summary) {
    const analysisDiv = document.getElementById("nutrientAnalysis");
    analysisDiv.innerHTML = Object.entries(summary).map(([nutrient, value]) => 
        `<div class="nutrient-item">
            <div class="nutrient-name">${nutrient}</div>
            <div class="nutrient-progress">
                <div class="progress-bar" style="width: ${Math.min(100, (value / dailyValues[nutrient]) * 100)}%">
                    ${Math.round((value / dailyValues[nutrient]) * 100)}%
                </div>
            </div>
        </div>`
    ).join('');
}

// Pacman žaidimas
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
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();

        this.letterObjects.forEach(letter => {
            if (letter.active) {
                this.ctx.fillText(letter.letter, letter.x, letter.y);
            }
        });

        this.checkCollisions();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Paleidžiame žaidimą
const game = new PacmanGame();
fillTcmTable();
