cat > script.js << 'EOL'
// Comprehensive Nutrient Tracker Script (Previous implementation)
const state = {
    ingredients: [],
    dailyValues: {
        // Extensive list of vitamins and minerals
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
        VitaminA: {
            Spinach: 0.1, Carrot: 0.08, SweetPotato: 0.09, 
            Kale: 0.11, Liver: 0.15, Egg: 0.07
        },
        VitaminC: {
            BrusselsSprouts: 0.08, Strawberries: 0.06, 
            Papaya: 0.1, Orange: 0.07, Broccoli: 0.09
        },
        B1: {
            Asparagus: 0.05, SunflowerSeeds: 0.03, 
            WholeGrains: 0.04, Pork: 0.07, Nuts: 0.06
        }
    },

    recommendations: {
        VitaminA: ['Carrots', 'Sweet Potatoes', 'Spinach', 'Kale'],
        VitaminC: ['Strawberries', 'Oranges', 'Broccoli'],
        Calcium: ['Milk', 'Yogurt', 'Cheese', 'Tofu'],
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
        saveToLocalStorage();
    }
}

function calculateMicronutrients(name, amount) {
    const micronutrients = {};
    
    Object.keys(state.micronutrientSources).forEach(nutrient => {
        Object.keys(state.micronutrientSources[nutrient]).forEach(source => {
            if (name.toLowerCase().includes(source.toLowerCase())) {
                micronutrients[nutrient] = 
                    (micronutrients[nutrient] || 0) + 
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
        li.innerHTML = `
            ${ingredient.name} - ${ingredient.amount}g 
            <button onclick="removeIngredient(${index})">Remove</button>
        `;
        list.appendChild(li);
    });
}

function removeIngredient(index) {
    state.ingredients.splice(index, 1);
    updateIngredientList();
    calculateTotalMicronutrients();
    saveToLocalStorage();
}

function calculateTotalMicronutrients() {
    const summary = {};
    
    state.ingredients.forEach(ingredient => {
        Object.keys(ingredient.micronutrients).forEach(nutrient => {
            summary[nutrient] = (summary[nutrient] || 0) + ingredient.micronutrients[nutrient];
        });
    });

    updateMicronutrientSummary(summary);
    updateRecommendations(summary);
}

function updateMicronutrientSummary(summary) {
    const summaryList = document.getElementById('micronutrient-summary');
    summaryList.innerHTML = '';

    Object.keys(state.dailyValues).forEach(nutrient => {
        const currentValue = summary[nutrient] || 0;
        const percentage = (currentValue / state.dailyValues[nutrient]) * 100;
        
        const li = document.createElement('li');
        li.textContent = `${nutrient}: ${percentage.toFixed(2)}%`;
        
        if (percentage < 50) li.style.color = 'red';
        else if (percentage < 75) li.style.color = 'orange';
        else li.style.color = 'green';
        
        summaryList.appendChild(li);
    });
}

function updateRecommendations(summary) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<h3>Recommended Foods to Reach Daily Values:</h3>';

    Object.keys(state.dailyValues).forEach(nutrient => {
        const currentValue = summary[nutrient] || 0;
        const deficit = state.dailyValues[nutrient] - currentValue;
        
        if (deficit > 0 && state.recommendations[nutrient]) {
            const recommendationList = document.createElement('div');
            recommendationList.innerHTML = `
                <strong>${nutrient} Deficit (${deficit.toFixed(2)}):</strong>
                ${state.recommendations[nutrient].join(', ')}
            `;
            recommendationsDiv.appendChild(recommendationList);
        }
    });
}

function saveToLocalStorage() {
    localStorage.setItem('nutrientTrackerState', JSON.stringify(state));
}

function clearData() {
    state.ingredients = [];
    updateIngredientList();
    calculateTotalMicronutrients();
    localStorage.removeItem('nutrientTrackerState');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '300px';
            document.getElementById('uploaded-image').innerHTML = '';
            document.getElementById('uploaded-image').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('add-ingredient').addEventListener('click', addIngredient);
document.getElementById('save-data').addEventListener('click', saveToLocalStorage);
document.getElementById('clear-data').addEventListener('click', clearData);
document.getElementById('file-upload').addEventListener('change', handleFileUpload);

window.onload = function() {
    const savedState = localStorage.getItem('nutrientTrackerState');
    if (savedState) {
        Object.assign(state, JSON.parse(savedState));
        updateIngredientList();
        calculateTotalMicronutrients();
    }
};
EOL
