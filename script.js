// script.js
const nutrients = {
    vitaminB1: { name: 'Vitamin B1', rda: 1.2, unit: 'mg' },
    vitaminB2: { name: 'Vitamin B2', rda: 1.3, unit: 'mg' },
    vitaminB3: { name: 'Vitamin B3', rda: 16, unit: 'mg' },
    vitaminB5: { name: 'Vitamin B5', rda: 5, unit: 'mg' },
    vitaminB6: { name: 'Vitamin B6', rda: 1.7, unit: 'mg' },
    vitaminB7: { name: 'Vitamin B7', rda: 30, unit: 'mcg' },
    vitaminB12: { name: 'Vitamin B12', rda: 2.4, unit: 'mcg' },
    vitaminC: { name: 'Vitamin C', rda: 90, unit: 'mg' },
    vitaminD: { name: 'Vitamin D', rda: 15, unit: 'mcg' },
    vitaminK: { name: 'Vitamin K', rda: 120, unit: 'mcg' },
    calcium: { name: 'Calcium', rda: 1000, unit: 'mg' },
    iron: { name: 'Iron', rda: 18, unit: 'mg' },
    magnesium: { name: 'Magnesium', rda: 400, unit: 'mg' },
    zinc: { name: 'Zinc', rda: 11, unit: 'mg' },
    potassium: { name: 'Potassium', rda: 3500, unit: 'mg' },
    iodine: { name: 'Iodine', rda: 150, unit: 'mcg' },
    choline: { name: 'Choline', rda: 550, unit: 'mg' },
    manganese: { name: 'Manganese', rda: 2.3, unit: 'mg' },
    phosphorus: { name: 'Phosphorus', rda: 700, unit: 'mg' },
    chromium: { name: 'Chromium', rda: 35, unit: 'mcg' }
};

const ingredients = {
    // Vegetables per cup
    tomato: { name: 'Tomato', serving: '1 cup', servingSize: 180 },
    lettuce: { name: 'Lettuce', serving: '1 cup', servingSize: 47 },
    spinach: { name: 'Spinach', serving: '4 cups', servingSize: 100 },
    asparagus: { name: 'Asparagus', serving: '4 cups', servingSize: 134 },
    brusselSprouts: { name: 'Brussels Sprouts', serving: '1 cup', servingSize: 88 },
    
    // Fruits
    banana: { name: 'Banana', serving: '4 units', servingSize: 480 },
    papaya: { name: 'Papaya', serving: '1 cup', servingSize: 145 },
    avocado: { name: 'Avocado', serving: '2 cups', servingSize: 230 },
    
    // Proteins per specific weight
    tofu: { name: 'Tofu', serving: '100g', servingSize: 100 },
    lamb: { name: 'Lamb', serving: '200g', servingSize: 200 },
    turkey: { name: 'Turkey', serving: '1kg', servingSize: 1000 },
    chicken: { name: 'Chicken', serving: '1kg', servingSize: 1000 },
    beef: { name: 'Beef', serving: '1kg', servingSize: 1000 },
    salmon: { name: 'Salmon', serving: '500g', servingSize: 500 },
    shrimp: { name: 'Shrimp', serving: '400g', servingSize: 400 },
    
    // Seeds and nuts
    flaxseed: { name: 'Flaxseed', serving: '1 cup', servingSize: 168 },
    pumpkinSeeds: { name: 'Pumpkin Seeds', serving: '2 cups', servingSize: 128 },
    sunflowerSeeds: { name: 'Sunflower Seeds', serving: '1 cup', servingSize: 140 },
    sesameSeeds: { name: 'Sesame Seeds', serving: '5 cups', servingSize: 144 },
    cashews: { name: 'Cashews', serving: '1 cup', servingSize: 160 },
    almonds: { name: 'Almonds', serving: '2 cups', servingSize: 240 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeIngredients();
    initializeNutrientBars();
    setupLanguageToggle();
    setupEventListeners();
});

function initializeIngredients() {
    const ingredientsList = document.getElementById('ingredients-list');
    
    Object.entries(ingredients).forEach(([id, data]) => {
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            <label>${data.name} (${data.serving})</label>
            <input type="number" id="${id}" min="0" value="0" step="0.1">
        `;
        ingredientsList.appendChild(item);
    });
}

function initializeNutrientBars() {
    const nutrientsDisplay = document.getElementById('nutrients-display');
    
    Object.entries(nutrients).forEach(([id, data]) => {
        const bar = document.createElement('div');
        bar.className = 'nutrient-bar';
        bar.innerHTML = `
            <div class="nutrient-label">${data.name} (${data.unit})</div>
            <div class="progress-container">
                <div class="progress-fill" id="${id}-progress" style="width: 0%"></div>
                <span class="progress-label" id="${id}-label">0%</span>
            </div>
        `;
        nutrientsDisplay.appendChild(bar);
    });
}

function setupLanguageToggle() {
    const enBtn = document.getElementById('enBtn');
    const ltBtn = document.getElementById('ltBtn');
    
    enBtn.addEventListener('click', () => setLanguage('en'));
    ltBtn.addEventListener('click', () => setLanguage('lt'));
}

function setupEventListeners() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', calculateNutrients);
    });
}

function calculateNutrients() {
    // Implement nutrient calculation logic here
    // This would involve complex calculations based on the input values
    // and updating the progress bars and summaries
    updateNutrientBars();
    updateSummaries();
}

function updateNutrientBars() {
    // Update progress bars based on calculations
}

function updateSummaries() {
    // Update daily summaries and nutrient sources information
}

function setLanguage(lang) {
    // Implement language switching logic
    document.documentElement.setAttribute('lang', lang);
    const buttons = document.querySelectorAll('.controls button');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${lang}Btn`).classList.add('active');
}
