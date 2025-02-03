const dailyValues = {
    B1: 1.1, B2: 1.1, B3: 35, B5: 5, B6: 1.3,
    B7: 0.03, B12: 2.4, VitaminA: 700, VitaminC: 75,
    VitaminD: 15, VitaminE: 15, VitaminK: 90,
    Calcium: 1000, Iron: 18, Magnesium: 310,
    Phosphorus: 700, Zinc: 8, Selenium: 55,
    Copper: 0.9, Manganese: 1.8, Chromium: 0.025,
    Molybdenum: 0.045, Iodine: 150, Chloride: 2300,
    Choline: 425
};

const micronutrientSources = {
    B1: { Asparagus: 0.05, GreenPeas: 0.02 },
    B12: { Salmon: 0.04, Tuna: 0.03 },
    Calcium: { Cheese: 0.2, Yogurt: 0.15 },
    Iron: { Spinach: 0.05, Beef: 0.04 }
};

let ingredients = [];
let currentDate = new Date().toISOString().split('T')[0];

function updateFoodList() {
    const category = document.getElementById('foodCategory').value;
    const optionsDiv = document.getElementById('ingredientOptions');
    optionsDiv.innerHTML = Object.keys(micronutrientSources[category])
        .map(food => `
            <div class="food-item" onclick="selectFood('${food}')">
                ${food} (${micronutrientSources[category][food]}mg/g)
            </div>
        `).join('');
}

function selectFood(foodName) {
    document.querySelectorAll('.food-item').forEach(item => 
        item.classList.remove('selected'));
    event.target.classList.add('selected');
}

function addIngredient() {
    const foodName = document.querySelector('.food-item.selected').textContent.split(' ')[0];
    const amount = parseFloat(document.getElementById('ingredientAmount').value);
    
    ingredients.push({
        name: foodName,
        amount: amount,
        timestamp: new Date().toISOString()
    });
    
    updateSummary();
}

function calculateTotals() {
    return ingredients.reduce((totals, ingredient) => {
        Object.keys(micronutrientSources).forEach(nutrient => {
            if(micronutrientSources[nutrient][ingredient.name]) {
                totals[nutrient] = (totals[nutrient] || 0) + 
                    (micronutrientSources[nutrient][ingredient.name] * ingredient.amount);
            }
        });
        return totals;
    }, {});
}

function updateSummary() {
    const totals = calculateTotals();
    const progressBars = document.getElementById('progressBars');
    
    progressBars.innerHTML = Object.keys(totals).map(nutrient => `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${Math.min((totals[nutrient]/dailyValues[nutrient])*100, 100)}%">
                <span>${nutrient}: ${totals[nutrient].toFixed(2)}/${dailyValues[nutrient]}mg</span>
            </div>
        </div>
    `).join('');
}

function saveDailyData() {
    const data = {
        date: currentDate,
        ingredients: ingredients,
        totals: calculateTotals()
    };
    
    const allData = JSON.parse(localStorage.getItem('nutritionData') || '[]');
    const existingIndex = allData.findIndex(d => d.date === currentDate);
    
    if(existingIndex > -1) {
        allData[existingIndex] = data;
    } else {
        allData.push(data);
    }
    
    localStorage.setItem('nutritionData', JSON.stringify(allData));
    alert('Duomenys išsaugoti!');
}

// Pradinis užkrovimas
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').value = currentDate;
    updateFoodList();
});
