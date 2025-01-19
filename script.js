const nutrients = {
    vitaminB1: { name: "Vitamin B1", rda: 1.2, unit: "mg" },
    vitaminB2: { name: "Vitamin B2", rda: 1.3, unit: "mg" },
    calcium: { name: "Calcium", rda: 1000, unit: "mg" },
    iron: { name: "Iron", rda: 18, unit: "mg" },
};

const ingredients = {
    tomato: { name: "Tomato", grams: 100, nutrients: { vitaminB1: 0.03, calcium: 10, iron: 0.2 } },
    lettuce: { name: "Lettuce", grams: 100, nutrients: { vitaminB1: 0.07, calcium: 36, iron: 0.5 } },
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
        div.innerHTML = `<label>${item.name} (${item.grams}g)</label>
            <input type="number" min="0" value="0" step="10" />`;
        list.appendChild(div);
    });
}

function populateNutrientBars() {
    const display = document.getElementById("nutrients-display");
    Object.entries(nutrients).forEach(([id, nutrient]) => {
        const bar = document.createElement("div");
        bar.className = "nutrient-bar";
        bar.innerHTML = `<div>${nutrient.name}</div>
            <div class="progress-container">
                <div class="progress-fill" id="${id}-fill" style="width: 0%"></div>
                <span class="progress-label" id="${id}-label">0%</span>
            </div>`;
        display.appendChild(bar);
    });
}
