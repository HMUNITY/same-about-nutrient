cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const nutrients = [
        { name: "Vitamin A", benefit: "Supports vision, immune function, and skin health." },
        { name: "Vitamin C", benefit: "Boosts immunity, promotes collagen production, and aids iron absorption." },
        { name: "Iron", benefit: "Essential for oxygen transport and energy production." },
        { name: "Magnesium", benefit: "Supports muscle and nerve function, and energy production." },
        { name: "Potassium", benefit: "Regulates fluid balance and supports heart rhythm." },
        { name: "Zinc", benefit: "Strengthens the immune system and supports lung function." }
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
        list.innerHTML = ""; // Clear existing content
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name || item;
            list.appendChild(li);
        });
    }

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
        document.getElementById("current-time").innerText = `Current Time: ${formattedTime}`;
        
        const organFunction = getOrganFunction(hours);
        document.getElementById("organ-function").innerText = organFunction;
    }

    function getOrganFunction(hour) {
        if (hour >= 7 && hour < 11) return "Stomach/Spleen (7am-11am): Focus on digestion. Nutrients: Zinc, Chromium.";
        if (hour >= 11 && hour < 13) return "Heart (11am-1pm): Blood circulation. Nutrients: Iron, Copper.";
        if (hour >= 13 && hour < 15) return "Small Intestine (1pm-3pm): Absorption. Nutrients: Calcium.";
        if (hour >= 15 && hour < 19) return "Bladder/Kidney (3pm-7pm): Fluid balance. Nutrients: Magnesium, Phosphorus.";
        if (hour >= 19 && hour < 21) return "Pericardium (7pm-9pm): Emotional balance. Nutrients: Magnesium, Potassium.";
        if (hour >= 1 && hour < 3) return "Liver (1am-3am): Detoxification. Nutrients: Iron, Zinc, Copper.";
        if (hour >= 3 && hour < 5) return "Lung (3am-5am): Respiratory health. Nutrients: Zinc, Selenium.";
        return "Time not associated with a major organ in TCM.";
    }

    document.getElementById('add-ingredient').addEventListener('click', () => {
        const name = document.getElementById('ingredient-name').value;
        const amount = document.getElementById('ingredient-amount').value;

        if (name && amount > 0) {
            const list = document.getElementById('ingredient-list');
            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g`;
            list.appendChild(li);
        }
    });

    updateClock();
    setInterval(updateClock, 60000); // Update clock every minute
    loadList('nutrient-list', nutrients);
    loadList('ingredient-options', ingredients);
});
EOF
