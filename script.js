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
        "Chicken": { nutrients: { protein: 31, iron: 1 }, unit: "g" },
        "Beef": { nutrients: { protein: 26, zinc: 5 }, unit: "g" },
        "Yogurt": { nutrients: { calcium: 200, protein: 10 }, unit: "cups" }
    }
};

// Handle Category Change
function updateFoodItems() {
    const category = document.getElementById('foodCategory').value;
    const foodItemSelect = document.getElementById('foodItem');
    foodItemSelect.innerHTML = '<option value="">Select Food</option>';

    if (category && foodData[category]) {
        const items = Object.keys(foodData[category]);
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            foodItemSelect.appendChild(option);
        });
    }
}

// Handle Add Food Item
function addFoodItem() {
    const foodCategory = document.getElementById('foodCategory').value;
    const foodItem = document.getElementById('foodItem').value;
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!foodCategory || !foodItem || isNaN(quantity) || quantity <= 0) {
        alert('Please select a valid food item and quantity');
        return;
    }

    const food = foodData[foodCategory][foodItem];
    const dailyEntries = document.getElementById('dailyEntries');

    const entry = document.createElement('div');
    entry.textContent = `${foodItem} x${quantity} - Nutrients: ${JSON.stringify(food.nutrients)}`;
    dailyEntries.appendChild(entry);

    updateDailyTotals(foodCategory, foodItem, quantity);
}

// Update Daily Totals
function updateDailyTotals(foodCategory, foodItem, quantity) {
    const dailyTotals = document.getElementById('dailyTotals');
    const food = foodData[foodCategory][foodItem];
    let totalNutrients = {};

    if (dailyTotals.textContent === '') {
        totalNutrients = food.nutrients;
    } else {
        totalNutrients = JSON.parse(dailyTotals.textContent);
    }

    Object.keys(food.nutrients).forEach(nutrient => {
        totalNutrients[nutrient] = (totalNutrients[nutrient] || 0) + (food.nutrients[nutrient] * quantity);
    });

    dailyTotals.textContent = JSON.stringify(totalNutrients);
}

// Handle Notes Input
function addNote() {
    const noteInput = document.getElementById('noteInput');
    const savedNotes = document.getElementById('savedNotes');
    const noteText = noteInput.value;

    if (noteText) {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = noteText;
        savedNotes.appendChild(noteDiv);
        noteInput.value = '';
    } else {
        alert('Please enter a note');
    }
}
