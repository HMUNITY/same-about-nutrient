// Database of nutrients and foods
const foodData = {
    grains: {
        "Rye": { nutrients: { fiber: 15, protein: 10 }, unit: "g" },
        "Barley": { nutrients: { fiber: 17, protein: 12 }, unit: "g" },
        "Lentils": { nutrients: { protein: 18, iron: 7 }, unit: "cups" }
    },
    vegetables: {
        "Asparagus": { nutrients: { vitaminB1: 0.4, folate: 262 }, unit: "cups" },
        "Sweet Potatoes": { nutrients: { vitaminA: 1922, vitaminC: 35 }, unit: "cups" },
        "Spinach": { nutrients: { iron: 2.7, vitaminK: 483 }, unit: "cups" }
    },
    proteins: {
        "Chicken": { nutrients: { protein: 155, vitaminB6: 2.5 }, unit: "g" },
        "Salmon": { nutrients: { omega3: 4.0, protein: 208 }, unit: "g" },
        "Eggs": { nutrients: { protein: 12, vitaminB12: 0.6 }, unit: "pieces" }
    }
};

const tcmData = {
    "11:00-13:00": { organ: "Heart", element: "Fire", nutrients: ["Iron", "Copper"] },
    "13:00-15:00": { organ: "Small Intestine", element: "Fire", nutrients: ["Vitamin B12", "Zinc"] },
    "15:00-17:00": { organ: "Bladder", element: "Water", nutrients: ["Magnesium", "Calcium"] },
    "17:00-19:00": { organ: "Kidney", element: "Water", nutrients: ["Iron", "Vitamin D"] },
    "19:00-21:00": { organ: "Circulation", element: "Fire", nutrients: ["Vitamin C", "Potassium"] },
    "21:00-23:00": { organ: "Triple Heater", element: "Fire", nutrients: ["Vitamin B complex"] }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFoodCategories();
    updateTCMClock();
    loadSavedNotes();
    setupPhotoUpload();
    setInterval(updateTCMClock, 60000); // Update clock every minute
});

// Initialize food categories
function initializeFoodCategories() {
    const categorySelect = document.getElementById('foodCategory');
    Object.keys(foodData).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', updateFoodItems);
}

// Update food items based on category
function updateFoodItems() {
    const category = document.getElementById('foodCategory').value;
    const foodSelect = document.getElementById('foodItem');
    foodSelect.innerHTML = '<option value="">Select Food</option>';

    if (category) {
        Object.keys(foodData[category]).forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            option.textContent = food;
            foodSelect.appendChild(option);
        });
    }
}

// Add food item to daily log
function addFoodItem() {
    const category = document.getElementById('foodCategory').value;
    const food = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;

    if (!category || !food || !quantity) {
        alert('Please fill in all fields');
        return;
    }

    const entry = {
        food,
        quantity,
        unit: foodData[category][food].unit,
        timestamp: new Date().toISOString()
    };

    let entries = JSON.parse(localStorage.getItem('foodEntries') || '[]');
    entries.push(entry);
    localStorage.setItem('foodEntries', JSON.stringify(entries));

    updateDailyLog();
    document.getElementById('quantity').value = '';
}

// Update the daily log display
function updateDailyLog() {
    const entries = JSON.parse(localStorage.getItem('foodEntries') || '[]');
    const dailyEntries = document.getElementById('dailyEntries');
    
    dailyEntries.innerHTML = entries.map(entry => `
        <div class="entry">
            <p>${entry.food}: ${entry.quantity} ${entry.unit}</p>
            <small>${new Date(entry.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');
}

// TCM Clock functions
function updateTCMClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const currentElement = document.getElementById('currentElement');
    let currentPeriod = Object.entries(tcmData).find(([timeRange]) => {
        const [start, end] = timeRange.split('-');
        return timeString >= start && timeString < end;
    });

    if (currentPeriod) {
        const [timeRange, data] = currentPeriod;
        currentElement.innerHTML = `
            <h3>Current Period: ${timeRange}</h3>
            <p>Organ: ${data.organ}</p>
            <p>Element: ${data.element}</p>
            <p>Recommended Nutrients: ${data.nutrients.join(', ')}</p>
        `;
    }
}

// Notes functions
function addNote() {
    const noteInput = document.getElementById('noteInput');
    if (!noteInput.value.trim()) return;

    const note = {
        text: noteInput.value,
        timestamp: new Date().toISOString()
    };

    let notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';
    loadSavedNotes();
}

function loadSavedNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const savedNotes = document.getElementById('savedNotes');
    
    savedNotes.innerHTML = notes.map(note => `
        <div class="note">
            <p>${note.text}</p>
            <small>${new Date(note.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

// Photo upload handling
function setupPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    photoUpload.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name || 'No file selected';
        document.getElementById('fileName').textContent = fileName;
    });
}

// Contact form submission
function submitForm() {
    const message = document.getElementById('messageInput').value;
    const photo = document.getElementById('photoUpload').files
