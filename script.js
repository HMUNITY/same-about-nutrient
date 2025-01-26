const nutrients = {
    vitaminB1: { name: "Vitamin B1", rda: 1.1, unit: "mg" },
    vitaminB2: { name: "Vitamin B2", rda: 1.1, unit: "mg" },
    vitaminB3: { name: "Vitamin B3", rda: 14, unit: "mg" },
    calcium: { name: "Calcium", rda: 1000, unit: "mg" },
    iron: { name: "Iron", rda: 18, unit: "mg" },
    magnesium: { name: "Magnesium", rda: 320, unit: "mg" },
    vitaminC: { name: "Vitamin C", rda: 75, unit: "mg" },
};

const ingredients = {
    asparagus: { name: "Asparagus", grams: 100, nutrients: { vitaminB1: 0.15, vitaminB2: 0.14 } },
    tuna: { name: "Tuna", grams: 100, nutrients: { vitaminB3: 8.5, vitaminB6: 0.3, vitaminB12: 2.5 } },
    spinach: { name: "Spinach", grams: 100, nutrients: { calcium: 99, iron: 2.7, magnesium: 79, vitaminC: 28.1 } },
    orange: { name: "Orange", grams: 100, nutrients: { vitaminC: 53.2, calcium: 40 } },
};

document.addEventListener("DOMContentLoaded", () => {
    populateIngredients();
    populateNutrientBars();
});

function populateIngredients() {
    const list = document.getElementById("ingredients-list");
    Object.values(ingredients).forEach((item) => {
        const div = document.createElement("div");
        div.className = "ingredient-item";
        div.innerHTML = `
            <label>${item.name} (${item.grams}g)</label>
            <input type="number" min="0" value="0" step="10">
        `;
        list.appendChild(div);
    });
}

function populateNutrientBars() {
    const display = document.getElementById("nutrients-display");
    Object.entries(nutrients).forEach(([id, nutrient]) => {
        const bar = document.createElement("div");
        bar.className = "nutrient-bar";
        bar.innerHTML = `
            <div>${nutrient.name}</div>
            <div class="progress-container">
                <div class="progress-fill" id="${id}-fill" style="width: 0%"></div>
                <span class="progress-label" id="${id}-label">0%</span>
            </div>
        `;
        display.appendChild(bar);
    });
}

