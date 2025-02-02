// Food Database
const foodData = {
    grains: {
        "Rugiai": { nutrients: { fiber: 15, protein: 10 }, unit: "g" },
        "Miežiai": { nutrients: { fiber: 17, protein: 12 }, unit: "g" },
        "Lęšiai": { nutrients: { protein: 18, iron: 7 }, unit: "cups" }
    },
    vegetables: {
        "Šparagai": { nutrients: { vitaminB1: 0.4, folate: 262 }, unit: "cups" },
        "Saldžiosios Bulvės": { nutrients: { vitaminA: 1922, vitaminC: 35 }, unit: "cups" },
        "Špinatai": { nutrients: { iron: 2.7, vitaminK: 483 }, unit: "cups" }
    },
    proteins: {
        "Vištiena": { nutrients: { protein: 31, iron: 1 }, unit: "g" },
        "Jautiena": { nutrients: { protein: 26, zinc: 5 }, unit: "g" },
        "Jogurtas": { nutrients: { calcium: 200, protein: 10 }, unit: "cups" }
    }
};

// Random Links Configuration
const linkTemplates = [
    "https://www.nutritionistblog.com/search?q=%%TOPIC%%",
    "https://www.marketprices.com/products/%%TOPIC%%",
    "https://www.allrecipes.com/search?q=%%TOPIC%%",
    "https://www.healthnews.com/topic/%%TOPIC%%"
];
const topics = ["vitamins", "protein", "fiber", "recipes", "health", "diet"];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setRandomLinks();
    updateFoodItems();
    loadSavedData();
});

// Random Links Generator
function setRandomLinks() {
    const links = document.querySelectorAll("#randomLinks .link-btn");
    links.forEach(link => {
        const template = linkTemplates[Math.floor(Math.random() * linkTemplates.length)];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        link.href = template.replace("%%TOPIC%%", topic);
        link.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
    });
}

// Food Selection Logic
document.getElementById("foodCategory").addEventListener("change", updateFoodItems);

function updateFoodItems() {
    const category = document.getElementById("foodCategory").value;
    const foodItemSelect = document.getElementById("foodItem");
    foodItemSelect.innerHTML = '<option value="">Pasirinkite Maistą</option>';

    if (category && foodData[category]) {
        Object.keys(foodData[category]).forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            foodItemSelect.appendChild(option);
        });
    }
}

// Daily Tracker Logic
function addFoodItem() {
    const date = getCurrentDate();
    const category = document.getElementById("foodCategory").value;
    const item = document.getElementById("foodItem").value;
    const quantity = parseFloat(document.getElementById("quantity").value);

    if (!category || !item || isNaN(quantity) || quantity <= 0) {
        alert("Prašome užpildyti visus laukus teisingai!");
        return;
    }

    const dailyData = getFromLocalStorage(date) || { entries: [], notes: [], totals: {} };
    const entry = {
        category,
        item,
        quantity,
        nutrients: calculateNutrients(category, item, quantity),
        timestamp: new Date().toISOString()
    };

    dailyData.entries.push(entry);
    updateTotals(dailyData);
    saveToLocalStorage(date, dailyData);
    displayDailyData(dailyData);
}

// Notes Management
function addNote() {
    const noteText = document.getElementById("noteInput").value.trim();
    if (!noteText) return;

    const date = getCurrentDate();
    const dailyData = getFromLocalStorage(date) || { entries: [], notes: [], totals: {} };
    dailyData.notes.push({ text: noteText, timestamp: new Date().toISOString() });
    saveToLocalStorage(date, dailyData);
    displayNotes(dailyData);
    document.getElementById("noteInput").value = "";
}

// Pac-Man Game
let pacmanGame;

function startGame() {
    const canvas = document.getElementById("pacmanCanvas");
    const ctx = canvas.getContext("2d");
    pacmanGame = new PacmanGame(ctx);
    pacmanGame.start();
}

function toggleFullscreen() {
    const canvas = document.getElementById("pacmanCanvas");
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().then(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }).catch(err => alert("Fullscreen failed: " + err));
    } else {
        document.exitFullscreen();
        canvas.width = 600;
        canvas.height = 400;
    }
}

class PacmanGame {
    constructor(ctx) {
        this.ctx = ctx;
        this.pacman = { x: 50, y: 50, radius: 20, speed: 5 };
        this.direction = { x: 0, y: 0 };
        this.gameInterval = null;
    }

    start() {
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
        this.gameInterval = setInterval(this.update.bind(this), 1000 / 60);
    }

    handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp": this.direction = { x: 0, y: -1 }; break;
            case "ArrowDown": this.direction = { x: 0, y: 1 }; break;
            case "ArrowLeft": this.direction = { x: -1, y: 0 }; break;
            case "ArrowRight": this.direction = { x: 1, y: 0 }; break;
        }
    }

    update() {
        this.pacman.x += this.direction.x * this.pacman.speed;
        this.pacman.y += this.direction.y * this.pacman.speed;

        // Boundary checks
        if (this.pacman.x - this.pacman.radius < 0) this.pacman.x = this.pacman.radius;
        if (this.pacman.x + this.pacman.radius > this.ctx.canvas.width) this.pacman.x = this.ctx.canvas.width - this.pacman.radius;
        if (this.pacman.y - this.pacman.radius < 0) this.pacman.y = this.pacman.radius;
        if (this.pacman.y + this.pacman.radius > this.ctx.canvas.height) this.pacman.y = this.ctx.canvas.height - this.pacman.radius;

        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI);
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

// Helper Functions
function getCurrentDate() {
    return document.getElementById("trackingDate").value || new Date().toISOString().split("T")[0];
}

function calculateNutrients(category, item, quantity) {
    const foodItem = foodData[category][item];
    const nutrients = {};
    for (let nutrient in foodItem.nutrients) {
        nutrients[nutrient] = foodItem.nutrients[nutrient] * quantity;
