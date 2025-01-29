cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
    const state = { ingredients: [], comments: [] };

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        document.getElementById('current-time').textContent = `${hours}:00 CEST`;
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

    function saveIngredients() { alert('Ingredientai išsaugoti!'); }
    function eraseIngredients() { state.ingredients = []; document.getElementById('ingredient-list').innerHTML = ''; }

    function addComment() {
        const comment = document.getElementById('comment-input').value;
        if (comment) {
            state.comments.push(comment);
            const li = document.createElement('li');
            li.textContent = comment;
            document.getElementById('comment-list').appendChild(li);
        }
    }

    document.getElementById('add-ingredient').addEventListener('click', addIngredient);
    document.getElementById('save-ingredients').addEventListener('click', saveIngredients);
    document.getElementById('erase-ingredients').addEventListener('click', eraseIngredients);
    document.getElementById('add-comment').addEventListener('click', addComment);

    updateClock();
    setInterval(updateClock, 3600000);
});
EOF
