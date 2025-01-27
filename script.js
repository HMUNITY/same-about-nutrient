cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = [];
    const nutrientSummary = [];

    // Clock Update
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        document.getElementById('current-time').innerText = `Current Time: ${formattedTime}`;
    }

    // Circadian Suggestions
    function getSuggestions() {
        const hours = new Date().getHours();
        let suggestions = '';
        if (hours < 10) {
            suggestions = 'Morning: Start with proteins and fruits.';
        } else if (hours < 14) {
            suggestions = 'Afternoon: Balanced lunch with whole grains.';
        } else if (hours < 18) {
            suggestions = 'Evening: Light snacks like nuts or yogurt.';
        } else {
            suggestions = 'Night: Light dinner, avoid caffeine.';
        }
        document.getElementById('meal-suggestions').innerText = suggestions;
    }

    // Add Ingredient
    document.getElementById('add-ingredient').addEventListener('click', () => {
        const name = document.getElementById('ingredient-name').value;
        const amount = document.getElementById('ingredient-amount').value;

        if (name && amount) {
            ingredientList.push({ name, amount });
            const li = document.createElement('li');
            li.textContent = `${name} - ${amount}g`;
            document.getElementById('ingredient-list').appendChild(li);
            document.getElementById('ingredient-name').value = '';
            document.getElementById('ingredient-amount').value = '';
        }
    });

    // Save Ingredients
    document.getElementById('save-ingredients').addEventListener('click', () => {
        console.log('Ingredients saved:', ingredientList);
        alert('Ingredients saved!');
    });

    // Erase Ingredients
    document.getElementById('erase-ingredients').addEventListener('click', () => {
        ingredientList.length = 0;
        document.getElementById('ingredient-list').innerHTML = '';
        alert('Ingredients erased!');
    });

    // Initial Load
    updateClock();
    getSuggestions
