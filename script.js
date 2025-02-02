// Food database
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

// Storage Management
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Date Management
function getCurrentDate() {
    return document.getElementById('trackingDate').value || new Date().toISOString().split('T')[0];
}

// Food Selection and Management
document.getElementById('foodCategory').addEventListener('change', updateFoodItems);

function updateFoodItems() {
    const category = document.getElementById('foodCategory').value;
    const foodItemSelect = document.getElementById('foodItem');
    foodItemSelect.innerHTML = '<option value="">Pasirinkite Maistą</option>';

    if (category && foodData[category]) {
        Object.keys(foodData[category]).forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            foodItemSelect.appendChild(option);
        });
    }
}

function addFoodItem() {
    const date = getCurrentDate();
    const category = document.getElementById('foodCategory').value;
    const item = document.getElementById('foodItem').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!category || !item || isNaN(quantity) || quantity <= 0) {
        alert('Prašome užpildyti visus laukus teisingai');
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

function calculateNutrients(category, item, quantity) {
    const foodItem = foodData[category][item];
    const nutrients = {};

    for (let nutrient in foodItem.nutrients) {
        nutrients[nutrient] = foodItem.nutrients[nutrient] * quantity;
    }

    return nutrients;
}

function updateTotals(dailyData) {
    const totals = {};

    dailyData.entries.forEach(entry => {
        for (let nutrient in entry.nutrients) {
            totals[nutrient] = (totals[nutrient] || 0) + entry.nutrients[nutrient];
        }
    });

    dailyData.totals = totals;
}

function displayDailyData(dailyData) {
    const entriesDiv = document.getElementById('dailyEntries');
    const totalsDiv = document.getElementById('dailyTotals');

    // Display entries
    entriesDiv.innerHTML = '<h4>Šiandienos Įrašai:</h4>';
    dailyData.entries.forEach((entry, index) => {
        entriesDiv.innerHTML += `
            <div class="entry-item">
                <p>${entry.quantity} ${foodData[entry.category][entry.item].unit} ${entry.item}</p>
                <button onclick="deleteEntry(${index})" class="warning-btn">Ištrinti</button>
            </div>
        `;
    });

    // Display totals
    totalsDiv.innerHTML = '<h4>Dienos Suma:</h4>';
    for (let nutrient in dailyData.totals) {
        totalsDiv.innerHTML += `
            <p>${nutrient}: ${dailyData.totals[nutrient].toFixed(1)}</p>
        `;
    }
}

function deleteEntry(index) {
    const date = getCurrentDate();
    const dailyData = getFromLocalStorage(date);

    if (dailyData && dailyData.entries) {
        dailyData.entries.splice(index, 1);
        updateTotals(dailyData);
        saveToLocalStorage(date, dailyData);
        displayDailyData(dailyData);
    }
}

function clearEntries() {
    if (confirm('Ar tikrai norite išvalyti visus šiandienos įrašus?')) {
        const date = getCurrentDate();
        const dailyData = { entries: [], notes: [], totals: {} };
        saveToLocalStorage(date, dailyData);
        displayDailyData(dailyData);
    }
}

// Notes Management
function addNote() {
    const noteText = document.getElementById('noteInput').value.trim();
    if (!noteText) return;

    const date = getCurrentDate();
    const dailyData = getFromLocalStorage(date) || { entries: [], notes: [], totals: {} };

    dailyData.notes.push({
        text: noteText,
        timestamp: new Date().toISOString()
    });

    saveToLocalStorage(date, dailyData);
    displayNotes(dailyData);
    document.getElementById('noteInput').value = '';
}

function displayNotes(dailyData) {
    const notesDiv = document.getElementById('savedNotes');
    notesDiv.innerHTML = '<h4>Išsaugotos Pastabos:</h4>';

    dailyData.notes.forEach((note, index) => {
        notesDiv.innerHTML += `
            <div class="note-item">
                <p>${note.text}</p>
                <button onclick="deleteNote(${index})" class="warning-btn">Ištrinti</button>
            </div>
        `;
    });
}

function deleteNote(index) {
    const date = getCurrentDate();
    const dailyData = getFromLocalStorage(date);

    if (dailyData && dailyData.notes) {
        dailyData.notes.splice(index, 1);
        saveToLocalStorage(date, dailyData);
        displayNotes(dailyData);
    }
}

function clearNotes() {
    if (confirm('Ar tikrai norite išvalyti visas pastabas?')) {
        const date = getCurrentDate();
        const dailyData = getFromLocalStorage(date) || { entries: [], notes: [], totals: {} };
        dailyData.notes = [];
        saveToLocalStorage(date, dailyData);
        displayNotes(dailyData);
    }
}

// Pac-Man Game
let pacmanGame;

function startGame() {
    const canvas = document.getElementById('pacmanCanvas');
    const ctx = canvas.getContext('2d');

    pacmanGame = new PacmanGame(ctx);
    pacmanGame.start();
}

class PacmanGame {
    constructor(ctx) {
        this.ctx = ctx;
        this.pacman = { x: 50, y: 50, radius: 20, speed: 5 };
        this.direction = { x: 0, y: 0 };
        this.gameInterval = null;
    }

    start() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.gameInterval = setInterval(this.update.bind(this), 1000 / 60);
    }

    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                this.direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                this.direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                this.direction = { x: 1, y: 0 };
                break;
        }
    }

    update() {
        this.pacman.x += this.direction.x * this.pacman.speed;
        this.pacman.y += this.direction.y * this.pacman.speed;

        //
