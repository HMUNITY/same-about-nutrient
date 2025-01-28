cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const nutrients = [
        { name: "Vitamin A", source: "Spinach, Carrots, Sweet Potatoes" },
        { name: "Vitamin C", source: "Citrus Fruits, Brussels Sprouts, Strawberries" },
        { name: "Calcium", source: "Milk, Cheese, Yogurt, Tofu" },
        { name: "Iron", source: "Red Meat, Beans, Spinach" },
        { name: "Magnesium", source: "Almonds, Spinach, Whole Grains" }
    ];

    const ingredients = [
        { name: "Spinach", nutrients: "Vitamin A, Magnesium" },
        { name: "Carrots", nutrients: "Vitamin A" },
        { name: "Sweet Potatoes", nutrients: "Vitamin A, Vitamin C" },
        { name: "Milk", nutrients: "Calcium" },
        { name: "Red Meat", nutrients: "Iron" }
    ];

    function loadNutrients() {
        const nutrientList = document.getElementById('nutrient-list');
        nutrients.forEach(nutrient => {
            const li = document.createElement('li');
            li.textContent = `${nutrient.name}: Found in ${nutrient.source}`;
            nutrientList.appendChild(li);
        });
    }

    function loadIngredients() {
        const ingredientList = document.getElementById('ingredient-options-list');
        ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.name}: Provides ${ingredient.nutrients}`;
            ingredientList.appendChild(li);
        });
    }

    loadNutrients();
    loadIngredients();
});
EOF
