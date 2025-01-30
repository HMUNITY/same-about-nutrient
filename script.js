// Data structure for measurements
const measurements = {
    volume: {
        "1 puodelis/cup": [
            "Garbanzo pupelės | Chickpeas",
            "Ananasai | Pineapple",
            "Braškės | Strawberries",
            "Briuselio kopūstai | Brussels sprouts"
        ],
        "2-3 puodeliai/cups": [
            "Lęšiai | Lentils (2)",
            "Sojos pupelės | Soy beans (3)",
            "Saldžiosios bulvės | Sweet Potatoes (3)",
            "Jogurtas | Yogurt (3)"
        ],
        "4-5 puodeliai/cups": [
            "Šparagai | Asparagus (4)",
            "Špinatai | Spinach (4)",
            "Kopūstas | Cabbage (5)",
            "Grybai Crimini | Crimini Mushrooms (5)",
            "Swiss chard (5)"
        ]
    },
    weight: {
        "100g": ["Tofu"],
        "150g": ["Menkė | Cod"],
        "200g": ["Elniena | Venison"],
        "300g": ["Sūris | Cheese"],
        "400g": ["Krevetės | Shrimp"],
        "500g": ["Vištiena | Chicken", "Žuvis | Fish"],
        "700g": ["Mišri mėsa | Mixed meats"],
        "1kg": ["Kalakutiena | Turkey", "Tunas | Tuna", "Lašiša | Salmon"]
    },
    count: {
        "1 vnt./pc": ["Citrina | Lemon", "Grybai Shiitake | Shiitake Mushrooms"],
        "2 vnt./pcs": ["Avokadai | Avocados", "Brokoliai | Broccoli"],
        "4 vnt./pcs": ["Svogūnai | Onions", "Morkos | Carrots", "Kiaušiniai | Eggs"],
        "10 vnt./pcs": ["Bananai | Bananas", "Kiaušiniai | Eggs (complete set)"]
    }
};

// Function to load measurement content
function loadMeasurementContent(type) {
    const container = document.querySelector('.measurement-content');
    container.innerHTML = '';
    
    Object.entries(measurements[type]).forEach(([measure, items]) => {
        const div = document.createElement('div');
        div.className = 'measurement-group';
        div.innerHTML = `
            <h3>${measure}</h3>
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        container.appendChild(div);
    });
}

// Event listeners for tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadMeasurementContent(tab.dataset.tab);
        });
    });

    // Load initial content
    loadMeasurementContent('volume');
});

// Add smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});
