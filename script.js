cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const nutrients = [
        { name: "Vitamin A", benefit: "Supports vision, immune function, and skin health." },
        { name: "Vitamin C", benefit: "Boosts immunity, promotes collagen production, and aids iron absorption." },
        { name: "Vitamin D", benefit: "Regulates calcium and phosphorus for strong bones." },
        { name: "Iron", benefit: "Essential for oxygen transport and energy production." },
        { name: "Magnesium", benefit: "Supports muscle and nerve function, and energy production." }
    ];

    const ingredients = [
        { name: "Spinach", provides: "Vitamin A, Magnesium, and Iron" },
        { name: "Carrots", provides: "Vitamin A" },
        { name: "Sweet Potatoes", provides: "Vitamin A, Vitamin C, and Potassium" },
        { name: "Milk", provides: "Calcium and Vitamin D" },
        { name: "Salmon", provides: "Vitamin D, Omega-3s, and Vitamin B12" },
        { name: "Eggs", provides: "Vitamin D and B12" }
    ];

    const ingredientsToSearch = ["Brussels Sprouts", "Seaweed", "Sunflower Seeds", "Shiitake Mushrooms", "Cashews", "Yogurt", "Tofu", "Papaya"];

    function loadNutrientBenefits() {
        const list = document.getElementById('nutrient-benefits');
        nutrients.forEach(nutrient => {
            const li = document.createElement('li');
            li.textContent = `${nutrient.name}: ${nutrient.benefit}`;
            list.appendChild(li);
        });
    }

    function loadIngredientOptions() {
        const list = document.getElementById('ingredient-options');
        ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.name}: Provides ${ingredient.provides}`;
            list.appendChild(li);
        });
    }

    function loadIngredientsToSearch() {
        const list = document.getElementById('ingredient-search');
        ingredientsToSearch.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            list.appendChild(li);
        });
    }

    loadNutrientBenefits();
    loadIngredientOptions();
    loadIngredientsToSearch();
});
EOF
