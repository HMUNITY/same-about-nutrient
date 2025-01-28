cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const nutrients = [
        { name: "Vitamin A", benefit: "Supports vision, immune function, and skin health." },
        { name: "Vitamin B1", benefit: "Converts food into energy and supports cardiovascular health." },
        { name: "Vitamin C", benefit: "Boosts immunity and aids iron absorption." },
        { name: "Iron", benefit: "Essential for oxygen transport and energy production." },
        { name: "Magnesium", benefit: "Supports muscles, nerves, and energy." },
        { name: "Potassium", benefit: "Maintains fluid balance and heart rhythm." },
        { name: "Zinc", benefit: "Strengthens the immune system and supports lung function." }
    ];

    const ingredients = [
        "Spinach", "Carrots", "Sweet Potatoes", "Milk", "Yogurt", "Cheese", "Tofu",
        "Salmon", "Sardines", "Tuna", "Eggs", "Bananas", "Broccoli", "Brussels Sprouts",
        "Papaya", "Sunflower Seeds", "Pumpkin Seeds", "Cashews", "Asparagus", "Onions",
        "Mushrooms (Shiitake, Crimini)", "Rye", "Tomatoes", "Celery", "Sesame Seeds",
        "Oregano", "Basil", "Almonds", "Brown Rice", "Garbanzo Beans", "Swiss Chard"
    ];

    const state = {
        ingredients: []
    };

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        document.getElementById('current-time').textContent = `Current Time: ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

        const organFunction = getOrganFunction(hours);
        document.getElementById('organ-function').textContent = `Organ Function: ${organFunction}`;
    }

    function getOrganFunction(hour) {
        if (hour >= 7 && hour < 11) return "Stomach/Spleen (7am-11am): Digestive focus. Nutrients: Zinc, Chromium.";
        if (hour >= 11 && hour < 13) return "Heart (11am-1pm): Blood circulation. Nutrients: Iron, Copper.";
        if (hour >= 15 && hour < 19) return "Kidneys/Bladder (3pm-7pm): Fluid balance. Nutrients: Magnesium, Potassium.";
        if (hour >= 19 && hour < 21) return "Pericardium (7pm-9pm): Emotional balance. Nutrients: Magnesium, Potassium.";
        if (hour >= 1 && hour < 3) return "Liver (1am-3am): Detoxification. Nutrients: Iron, Zinc, Copper.";
        return "No active TCM organ focus at this time.";
    }

    function addIngredient() {
        const name = document.getElementById('ingredient-name').value;
        const amount = document.getElementById('ingredient-amount').value;

        if (name && amount) {
            const now = new Date();
            const timeAdded = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            state.ingredients.push({ name, amount, time: timeAdded });

            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g (Added at ${timeAdded})`;
            document.getElementById('ingredient-list').appendChild(li);

            document.getElementById('ingredient-name').value = '';
            document.getElementById('ingredient-amount').value = '';
        }
    }

    document.getElementById('add-ingredient').addEventListener('click', addIngredient);

    updateClock();
    setInterval(updateClock, 60000); // Update clock every minute

    const nutrientList = document.getElementById('nutrient-list');
    nutrients.forEach(nutrient => {
        const li = document.createElement('li');
        li.textContent = `${nutrient.name}: ${nutrient.benefit}`;
        nutrientList.appendChild(li);
    });

    const ingredientList = document.getElementById
