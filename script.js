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
        "Spinach", "Carrots", "Sweet Potatoes", "Milk", "Yogurt", "Cheese", "Tofu",
        "Oregano", "Basil", "Salmon", "Sardines", "Tuna", "Cod", "Eggs",
        "Brussels Sprouts", "Strawberries", "Papaya", "Citrus Fruits", "Broccoli",
        "Sunflower Seeds", "Sesame Seeds", "Lentils", "Green Peas", "Mushrooms",
        "Onions", "Bananas", "Tomatoes", "Red Meat", "Shrimp", "Seaweed",
        "Pumpkin Seeds", "Beans", "Cashews", "Almonds", "Brown Rice"
    ];

    function loadList(listId, items) {
        const list = document.getElementById(listId);
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name || item;
            list.appendChild(li);
        });
    }

    loadList('nutrient-list', nutrients);
    loadList('ingredient-options', ingredients);
});
EOF
