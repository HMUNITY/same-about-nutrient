document.addEventListener('DOMContentLoaded', () => {
    initializeFoodCategories();
    updateTCMClock();
    loadSavedNotes();
    setupPhotoUpload();
    setInterval(updateTCMClock, 60000);
});

function initializeFoodCategories() {
    const categorySelect = document.getElementById('foodCategory');
    Object.keys(foodData).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
    categorySelect.addEventListener('change', updateFoodItems);
}

function updateFoodItems() {
    const category = document.getElementById('foodCategory').value;
    const foodSelect = document.getElementById('foodItem');
    foodSelect.innerHTML = '<option value="">Select Food</option>';

    if (category) {
        Object.keys(foodData[category]).forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            option.textContent = food;
            foodSelect.appendChild(option);
        });
    }
}

function addFoodItem() {
    const category = document.getElementById('foodCategory').value;
    const food = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;

    if (!category || !food || !quantity) {
        alert('Please fill in all fields');
        return;
    }

    const entry = {
        food,
        quantity,
        unit: foodData[category][food].unit,
        timestamp: new Date().toISOString()
    };

    let entries = JSON.parse(localStorage.getItem('foodEntries') || '[]');
    entries.push(entry);
    localStorage.setItem('foodEntries', JSON.stringify(entries));

    updateDailyLog();
    document.getElementById('quantity').value = '';
}

function updateDailyLog() {
    const entries = JSON.parse(localStorage.getItem('foodEntries') || '[]');
    const dailyEntries = document.getElementById('dailyEntries');
    
    dailyEntries.innerHTML = entries.map(entry => `
        <div class="entry">
            <p>${entry.food}: ${entry.quantity} ${entry.unit}</p>
            <small>${new Date(entry.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');
}
