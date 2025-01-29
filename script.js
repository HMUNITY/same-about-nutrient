cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const state = { ingredients: [] };

    const nutrients = {
        "Vitaminas A": ["Morkos", "Salotos", "Špinatai"],
        "Vitaminas C": ["Citrinos", "Braškės", "Papaja"],
        "Kalcis": ["Tofu", "Sūris", "Jogurtas"],
        "Geležis": ["Lęšiai", "Jautiena", "Špinatai"],
        "Magnis": ["Anakardžiai", "Sojų pupelės", "Rudi ryžiai"]
    };

    const ingredients = [
        "Asparagai", "Lęšiai", "Sezamo sėklos", "Šiitake grybai", "Saldžios bulvės",
        "Avokadai", "Vistiena", "Svogūnai", "Bananai", "Špinatai", "Kopūstai",
        "Kiaušiniai", "Briuselio kopūstai", "Papaja", "Tofu", "Oregano", "Bazilikas",
        "Rugiai", "Alyvuogės", "Jūros gėrybės", "Krevetės", "Žuvis", "Sojų pupelės",
        "Anakardžiai", "Rudi ryžiai", "Migdolai", "Moliūgų sėklos", "Brokoliai"
    ];

    function updateClock() {
        const now = new Date();
        document.getElementById('current-time').textContent = `${now.getHours()}:00`;
    }

    function addIngredient() {
        const name = document.getElementById('ingredient-name').value;
        const amount = document.getElementById('ingredient-amount').value;
        if (name && amount) {
            state.ingredients.push({ name, amount });
            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g`;
            document.getElementById('ingredient-list').appendChild(li);
        }
    }

    document.getElementById('add-ingredient').addEventListener('click', addIngredient);

    updateClock();
    setInterval(updateClock, 3600000);

    const nutrientList = document.getElementById('nutrient-list');
    Object.keys(nutrients).forEach(nutrient => {
        const li = document.createElement('li');
        li.textContent = `${nutrient}: ${nutrients[nutrient].join(", ")}`;
        nutrientList.appendChild(li);
    });

    const ingredientList = document.getElementById('ingredient-options');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientList.appendChild(li);
    });
});
EOF
