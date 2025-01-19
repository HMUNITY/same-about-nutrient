// script.js
// Nutrient content per 100g of each ingredient
const nutrientData = {
    eggs: {
        iron: 1.75,
        zinc: 1.29,
        calcium: 56
    },
    spinach: {
        iron: 2.71,
        zinc: 0.53,
        calcium: 99
    },
    salmon: {
        iron: 0.8,
        zinc: 0.64,
        calcium: 13
    },
    quinoa: {
        iron: 4.57,
        zinc: 3.1,
        calcium: 47
    },
    almonds: {
        iron: 3.71,
        zinc: 3.12,
        calcium: 269
    },
    yogurt: {
        iron: 0.05,
        zinc: 0.59,
        calcium: 121
    },
    lentils: {
        iron: 6.51,
        zinc: 2.27,
        calcium: 35
    },
    broccoli: {
        iron: 0.73,
        zinc: 0.41,
        calcium: 47
    },
    chickpeas: {
        iron: 4.31,
        zinc: 2.76,
        calcium: 49
    }
};

// Daily recommended values (in mg)
const dailyRecommended = {
    iron: 18,
    zinc: 11,
    calcium: 1000
};

// Update nutrient calculations when any input changes
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculateNutrients);
});

function calculateNutrients() {
    const totals = {
        iron: 0,
        zinc: 0,
        calcium: 0
    };

    // Calculate totals from each ingredient
    Object.keys(nutrientData).forEach(ingredient => {
        const grams = parseFloat(document.getElementById(ingredient).value) || 0;
        Object.keys(nutrientData[ingredient]).forEach(nutrient => {
            totals[nutrient] += (nutrientData[ingredient][nutrient] * grams) / 100;
        });
    });

    // Update progress bars and percentages
    Object.keys(totals).forEach(nutrient => {
        const percentage = (totals[nutrient] / dailyRecommended[nutrient]) * 100;
        const cappedPercentage = Math.min(percentage, 100);
        
        document.getElementById(`${nutrient}-progress`).style.width = `${cappedPercentage}%`;
        document.getElementById(`${nutrient}-percentage`).textContent = `${percentage.toFixed(1)}%`;
    });

    updateDailySummary(totals);
}

function updateDailySummary(totals) {
    // Update total nutrients consumed
    const totalNutrientsList = Object.entries(totals)
        .map(([nutrient, amount]) => `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: ${amount.toFixed(2)}mg`)
        .join('<br>');
    document.getElementById('total-nutrients-list').innerHTML = totalNutrientsList;

    // Update remaining daily needs
    const remainingNutrients = Object.entries(totals)
        .map(([nutrient, amount]) => {
            const remaining = Math.max(0, dailyRecommended[nutrient] - amount);
            return `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}: ${remaining.toFixed(2)}mg`;
        })
        .join('<br>');
    document.getElementById('remaining-nutrients-list').innerHTML = remainingNutrients;
}

// Initial calculation
calculateNutrients();
