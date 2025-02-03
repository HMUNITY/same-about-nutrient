// TCM Data
const tcmData = [
    { laikas: "7–11 val.", organas: "Skrandis / Blužnis", funkcija: "Virškinimas", mikroelementai: "Cinkas, Chromas" },
    { laikas: "11–13 val.", organas: "Širdis", funkcija: "Kraujotaka", mikroelementai: "Geležis, Varis" },
    { laikas: "15–19 val.", organas: "Inkstai / Šlapimo pūslė", funkcija: "Skysčių balansas", mikroelementai: "Magnis, Kalis" },
    { laikas: "19–21 val.", organas: "Perikardas", funkcija: "Emocinė būsena", mikroelementai: "Magnis, Kalis" },
    { laikas: "1–3 val.", organas: "Kepenys", funkcija: "Detoksikacija", mikroelementai: "Geležis, Cinkas, Varis" }
];

// Food Data
let ingredients = [];
const dailyValues = {
    B1: 1.1, B2: 1.0, B3: 35.0, B5: 5.0, B6: 1.3, B7: 0.03, B12: 2.4,
    VitaminA: 700, VitaminC: 75, VitaminD: 15, VitaminE: 15, VitaminK: 90,
    Calcium: 1000, Iron: 18, Magnesium: 310, Phosphorus: 700, Potassium: 2600,
    Zinc: 8, Selenium: 55, Copper: 0.9, Manganese: 1.8, Chromium: 0.025,
    Molybdenum: 0.045, Iodine: 150, Chloride: 2300, Choline: 425
};

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

// Pacman Game
class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.pacman = { 
            x: 50, 
            y: 150, 
            radius: 15, 
            speed: 2, 
            direction: Math.PI / 4 
        };
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letterObjects = [];
        this.init();
    }

    init() {
        this.spawnLetters(8);
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

        // Pacman movement
        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        // Bounce logic
        if (this.pacman.x < 0 || this.pacman.x > this.canvas.width) {
            this.pacman.direction = Math.PI - this.pacman.direction;
        }
        if (this.pacman.y < 0 || this.pacman.y > this.canvas.height) {
            this.pacman.direction = -this.pacman.direction;
        }

        // Drawing
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        // Drawing letters
        this.letterObjects.forEach(letter => {
            if (letter.active) {
                this.ctx.font = '20px Arial';
                this.ctx.fillStyle = '#2ecc71';
                this.ctx.fillText(letter.letter, letter.x, letter.y);
            }
        });

        this.checkCollisions();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// TCM Table Population
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

// Food Diary Functions
document.getElementById('diaryBtn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('diaryModal').style.display = 'block';
    loadDiary();
});

document.getElementById('closeDiary').addEventListener('click', closeDiaryModal);

function analyzeFood() {
    const text = document.getElementById("foodEntry").value;
    ingredients = text.split(/,\s*|\n/)
        .map(entry => entry.trim())
        .filter(entry => entry)
        .map(entry => {
            const [name, amount] = entry.split(':').map(s => s.trim());
            return {
                name,
                amount: parseFloat(amount) || 100,
                nutrients: calculateMicronutrients(name, parseFloat(amount) || 100)
            };
        });

    updateRecentEntries();
    updateNutrientAnalysis();
}

function calculateMicronutrients(name, amount) {
    const nutrients = {};
    Object.entries(micronutrientSources).forEach(([nutrient, sources]) => {
        Object.entries(sources).forEach(([source, value]) => {
            if (name.toLowerCase().includes(source.toLowerCase())) {
                nutrients[nutrient] = (nutrients[nutrient] || 0) + (value * amount);
            }
        });
    });
    return nutrients;
}

function updateRecentEntries() {
    const recentEntries = document.getElementById('recentEntries');
    recentEntries.innerHTML = ingredients.map((ing, index) => `
        <div class="ingredient-list" onclick="showIngredientDetails(${index})">
            ${ing.name} (${ing.amount}g)
        </div>
    `).join('');
}

function updateNutrientAnalysis() {
    const analysis = ingredients.reduce((acc, ing) => {
        Object.entries(ing.nutrients).forEach(([nutrient, value]) => {
            acc[nutrient] = (acc[nutrient] || 0) + value;
        });
        return acc;
    }, {});

    const analysisDiv = document.getElementById('nutrientAnalysis');
    analysisDiv.innerHTML = Object.entries(analysis).map(([nutrient, total]) => `
        <div class="nutrient-item">
            <div class="nutrient-name">${nutrient}</div>
            <div class="nutrient-progress">
                <div class="progress-bar" 
                     style="width: ${Math.min(100, (total / dailyValues[nutrient]) * 100)}%">
                    ${Math.round((total / dailyValues[nutrient]) * 100)}%
                </div>
            </div>
        </div>
    `).join('');
}

function showIngredientDetails(index) {
    const ingredient = ingredients[index];
    const details = document.getElementById('ingredientDetails');
    
    details.innerHTML = `
        <h4>${ingredient.name} (${ingredient.amount}g)</h4>
        <ul>
            ${Object.entries(ingredient.nutrients).map(([nutrient, value]) => `
                <li>${nutrient}: ${value.toFixed(2)}mg (${((value / dailyValues[nutrient]) * 100).toFixed(1)}% RDI)</li>
            `).join('')}
        </ul>
    `;
    
    document.getElementById('ingredientModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

function closeDiaryModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('diaryModal').style.display = 'none';
    document.getElementById('ingredientModal').style.display = 'none';
}

// Local Storage Functions
function saveDiary() {
    const diaryEntry = {
        date: new Date().toISOString(),
        ingredients: ingredients,
        nutrients: calculateTotalNutrients()
    };
    localStorage.setItem('foodDiary', JSON.stringify(diaryEntry));
    alert('Dienoraštis išsaugotas!');
}

function loadDiary() {
    const savedData = localStorage.getItem('foodDiary');
    if (savedData) {
        const diaryEntry = JSON.parse(savedData);
        ingredients = diaryEntry.ingredients;
        document.getElementById('foodEntry').value = ingredients
            .map(ing => `${ing.name}: ${ing.amount}`)
            .join(', ');
        updateRecentEntries();
        updateNutrientAnalysis();
    }
}

function clearDiary() {
    localStorage.removeItem('foodDiary');
    document.getElementById('foodEntry').value = '';
    ingredients = [];
    updateRecentEntries();
    updateNutrientAnalysis();
    alert('Dienoraštis išvalytas!');
}

// Initialization
window.addEventListener('load', () => {
    fillTcmTable();
    new PacmanGame();
});
