cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const state = {
        ingredients: [],
        nutrients: {
            VitaminA: 700,
            VitaminC: 75,
            VitaminD: 15,
            Calcium: 1000,
            Iron: 18,
            Magnesium: 310
            // Add more nutrients here...
        },
        dailyValues: {
            VitaminA: 700,
            VitaminC: 75,
            VitaminD: 15,
            Calcium: 1000,
            Iron: 18,
            Magnesium: 310
        }
    };

    // Update Clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        document.getElementById('current-time').textContent = `Time: ${hours}:${minutes}`;
    }

    // Add Ingredient
    document.getElementById('add-ingredient').addEventListener('click', () => {
        const name = document.getElementById('ingredient-name').value;
        const amount = parseInt(document.getElementById('ingredient-amount').value);

        if (name && amount > 0) {
            state.ingredients.push({ name, amount });
            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g`;
            document.getElementById('ingredient-list').appendChild(li);
        }
    });

    // Save Ingredients
    document.getElementById('save-ingredients').addEventListener('click', () => {
        alert('Ingredients saved!');
    });

    // Erase Ingredients
    document.getElementById('erase-ingredients').addEventListener('click', () => {
        state.ingredients = [];
        document.getElementById('ingredient-list').innerHTML = '';
        alert('Ingredients erased!');
    });

    // Initial Setup
    updateClock();
    setInterval(updateClock, 60000); // Update every minute
});
EOF
