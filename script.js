cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const state = { ingredients: [] };

    function updateClock() {
        const now = new Date();
        document.getElementById('current-time').textContent = `${now.getHours()}:00`;
    }

    function getOrganFunction(hour) {
        if (hour >= 7 && hour < 11) return "Skrandis/Blužnis: Virškinimas. Mikroelementai: Cinkas, Chromas.";
        if (hour >= 11 && hour < 13) return "Širdis: Kraujotaka. Mikroelementai: Geležis, Varis.";
        if (hour >= 15 && hour < 19) return "Inkstai/Šlapimo pūslė: Skysčių balansas. Mikroelementai: Magnis, Kalis.";
        if (hour >= 19 && hour < 21) return "Perikardas: Emocinė būsena. Mikroelementai: Magnis, Kalis.";
        if (hour >= 1 && hour < 3) return "Kepenys: Detoksikacija. Mikroelementai: Geležis, Cinkas, Varis.";
        return "Šiuo metu nėra dominuojančio organo aktyvumo.";
    }

    function showOrganFunction() {
        const now = new Date();
        const organFunction = getOrganFunction(now.getHours());
        document.getElementById("organ-function").textContent = organFunction;
    }

    function addIngredient() {
        const name = document.getElementById('ingredient-name').value;
        const amount = document.getElementById('ingredient-amount').value;
        if (name && amount) {
            state.ingredients.push({ name, amount });
            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g`;
            document.getElementById('saved-list').appendChild(li);
        }
    }

    document.getElementById('add-ingredient').addEventListener('click', addIngredient);
    document.getElementById('show-organ-function').addEventListener('click', showOrganFunction);

    updateClock();
    setInterval(updateClock, 3600000);

    const ingredientList = document.getElementById('ingredient-options');
    const ingredients = ["Špinatai", "Morkos", "Saldžios bulvės", "Pienas", "Jogurtas", "Sūris", "Tofu", "Oregano", "Bazilikas",
        "Lašiša", "Sardinė", "Tunas", "Kodas", "Kiaušiniai", "Briuselio kopūstai", "Braškės", "Papaja", "Citrusiniai vaisiai",
        "Brokoliai", "Saulėgrąžų sėklos", "Sezamo sėklos", "Lęšiai", "Žalieji žirneliai", "Svogūnai", "Bananai", "Pomidorai",
        "Raudona mėsa", "Krevetės", "Jūros dumbliai", "Moliūgų sėklos", "Pupos", "Anakardžiai", "Migdolai", "Rudi ryžiai"];

    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientList.appendChild(li);
    });
});
EOF
