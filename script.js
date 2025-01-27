cat > script.js << 'EOF'
const state = {
    ingredients: [],
    dailyValues: {
        VitaminA: 700, VitaminC: 75, VitaminD: 15, 
        VitaminE: 15, VitaminK: 90,
        B1: 1.1, B2: 1.0, B3: 35.0, 
        B5: 5.0, B6: 1.3, B7: 0.03, B12: 2.4,
        Calcium: 1000, Iron: 18, Magnesium: 310, 
        Zinc: 8, Selenium: 55, Copper: 0.9, 
        Manganese: 1.8, Chromium: 0.025, 
        Molybdenum: 0.045, Iodine: 150, 
        Phosphorus: 700, Potassium: 2600, 
        Chloride: 2300, Choline: 425
    },
    micronutrientSources: {
        VitaminA: { Spinach: 0.1, Carrot: 0.08, SweetPotato: 0.09 },
        VitaminC: { Orange: 0.07, Strawberries: 0.06, Broccoli: 0.09 },
        B1: { Pork: 0.07, Nuts: 0.06, Asparagus: 0.05 }
    },
    recommendations: {
        VitaminA: ['Carrots', 'Spinach', 'Sweet Potatoes'],
        VitaminC: ['Oranges', 'Strawberries', 'Broccoli'],
        Calcium: ['Milk', 'Yogurt', 'Cheese'],
        Iron: ['Red Meat', 'Spinach', 'Lentils']
    }
};

function addIngredient() {
    const name = document.getElementById('ingredient-name').value;
    const amount = parseFloat(document.getElementById('ingredient-amount').value);

    if (name && amount > 0) {
        const micronutrients = calculateMicronutrients(name, amount);
        state.ingredients.push({ name, amount, micronutrients });
        updateIngredientList();
        calculateTotalMicronutrients();
    }
}

function calculateMicronutrients(name, amount) {
    const micronutrients = {};
    Object.keys(state.micronutrientSources).forEach(nutrient => {
        Object.keys(state.micronutrientSources[nutrient]).forEach(source => {
            if (name.toLowerCase().includes(source.toLowerCase())) {
                micronutrients[nutrient] = (micronutrients[nutrient] || 0) + 
                                           (state.micronutrientSources[nutrient][source] * amount);
            }
        });
    });
    return micronutrients;
}

function updateIngredientList() {
    const list = document.getElementById('ingredient-list');
    list.innerHTML = '';
    state.ingredients.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${ingredient.name} - ${ingredient.amount}g 
            <button onclick="removeIngredient(${index})">Remove</button>`;
        list.appendChild(li);
    });
}

function calculateTotalMicronutrients() {
    const summary = {};
    state.ingredients.forEach(ingredient => {
        Object.keys(ingredient.micronutrients).forEach(nutrient => {
            summary[nutrient] = (summary[nutrient] || 0) + ingredient.micronutrients[nutrient];
        });
    });
    updateMicronutrientSummary(summary);
}

function updateMicronutrientSummary(summary) {
    const summaryList = document.getElementById('micronutrient-summary');
    summaryList.innerHTML = '';
    Object.keys(state.dailyValues).forEach(nutrient => {
        const currentValue = summary[nutrient] || 0;
        const percentage = (currentValue / state.dailyValues[nutrient]) * 100;
        const li = document.createElement('li');
        li.textContent = `${nutrient}: ${percentage.toFixed(2)}%`;
        summaryList.appendChild(li);
    });
}

document.getElementById('add-ingredient').addEventListener('click', addIngredient);
EOF

