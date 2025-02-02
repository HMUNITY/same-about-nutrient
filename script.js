// script.js
// Food data and game constants
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

const PACMAN_SIZE = 20;
const GHOST_SIZE = 20;
const PELLET_SIZE = 4;

// Local Storage Functions
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

// Food Selection Functions
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
    const foodCategory = document.getElementById('foodCategory').value;
    const foodItem = document.getElementById('foodItem').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!foodCategory || !foodItem || isNaN(quantity) || quantity <= 0) {
        alert('Prašome pasirinkti tinkamą maistą ir kiekį');
        return;
    }

    const dailyData = getFromLocalStorage(date) || { entries: [], notes: [], totals: {} };
    
    const food = foodData[foodCategory][foodItem];
    const entry = {
        category: foodCategory,
        item: foodItem,
        quantity: quantity,
        nutrients: food.nutrients,
        timestamp: new Date().toISOString()
    };

    dailyData.entries.push(entry);
    updateDailyTotals(dailyData);
    saveToLocalStorage(date, dailyData);
    displayDailyData(dailyData);
}

// Continue with the rest of the JavaScript functions from the previous implementation
// ... [Previous game implementation, reporting, and analysis functions remain the same]

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date
    const date = getCurrentDate();
    document.getElementById('trackingDate').value = date;
    
    // Load saved data
    const dailyData = getFromLocalStorage(date);
    if (dailyData) {
        displayDailyData(dailyData);
        displayNotes(dailyData.notes);
    }
    
    // Initialize Pac-Man game
    const canvas = document.getElementById('pacmanCanvas');
    const game = new PacmanGame(canvas);
    
    // Add game controls
    const gameControls = document.createElement('div');
    gameControls.className = 'game-controls';
    gameControls.innerHTML = `
        <button onclick="startGame()">Pradėti Žaidimą</button>
        <p>Naudokite rodyklių klavišus Pac-Man valdymui</p>
    `;
    canvas.parentNode.insertBefore(gameControls, canvas);
    
    window.startGame = () => {
        game.start();
    };
});
