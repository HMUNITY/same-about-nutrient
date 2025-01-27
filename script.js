cat > script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
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
            suggestions = 'Start your day with a high-protein breakfast and fresh fruit.';
        } else if (hours < 14) {
            suggestions = 'Focus on a balanced lunch with vegetables and whole grains.';
        } else if (hours < 18) {
            suggestions = 'Have a light snack—nuts or yogurt are great options.';
        } else {
            suggestions = 'End the day with a light dinner, avoiding caffeine.';
        }
        document.getElementById('meal-suggestions').innerText = suggestions;
    }

    // Initial Load
    updateClock();
    getSuggestions();

    // Update Clock and Suggestions Every Minute
    setInterval(() => {
        updateClock();
        getSuggestions();
    }, 60000);
});
EOF
