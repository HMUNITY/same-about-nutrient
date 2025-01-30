// Data Structures
const foodDatabase = {
    grains: {
        "Rye": { serving: "100g", nutrients: { fiber: 15.1, protein: 10.3 } },
        "Barley": { serving: "120g", nutrients: { fiber: 17.3, protein: 12.5 } },
        "Lentils": { serving: "2 cups", nutrients: { protein: 17.9, iron: 6.6 } }
        // Add more items
    },
    vegetables: {
        "Asparagus": { serving: "4 cups", nutrients: { vitaminB1: 0.4, folate: 262 } },
        "Sweet Potatoes": { serving: "3 cups", nutrients: { vitaminA: 1922, vitaminC: 35.3 } }
        // Add more items
    },
    proteins: {
        "Chicken": { serving: "500g", nutrients: { protein: 155, vitaminB6: 2.5 } },
        "Salmon": { serving: "1kg", nutrients: { omega3: 4.023, protein: 208 } }
        // Add more items
    }
};

const tcmClock = {
    "Heart": { time: "11:00-13:00", element: "Fire", nutrients: ["Iron", "Copper"] },
    "Liver": { time: "01:00-03:00", element: "Wood", nutrients: ["Iron", "Zinc"] },
    // Add more organs
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeforms();
    setupTCMClock();
    setupContactForm();
});

// Tab Navigation
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadTabContent(btn.dataset.tab);
        });
    });
}

// Form Handling
function initializeforms() {
    const foodSelectionForm = document.getElementById('foodSelectionForm');
    foodSelectionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateNutrition();
    });
}

// Nutrition Calculation
function calculateNutrition() {
    const food = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;
    const unit = document.getElementById('unit').value;
    
    // Perform calculations
    const results = performNutritionCalculation(food, quantity, unit);
    displayResults(results);
    saveEntry(results);
}

// TCM Clock Visualization
function setupTCMClock() {
    const clockContainer = document.querySelector('.clock-visual');
    createClockVisualization(clockContainer);
    updateTCMRecommendations();
}

// Contact Form
function setupContactForm() {
    const photoUpload = document.getElementById('photoUpload');
    photoUpload.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name || 'No file selected';
        document.getElementById('fileName').textContent = fileName;
    });

    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission
    });
}

// Utility Functions
function saveEntry(data) {
    const entry = {
        ...data,
        timestamp: new Date().toISOString(),
        comments: []
    };
    
    // Save to local storage
    const savedEntries = JSON.parse(localStorage.getItem('nutritionEntries') || '[]');
    savedEntries.push(entry);
    localStorage.setItem('nutritionEntries', JSON.stringify(savedEntries));
    
    updateSavedEntriesDisplay();
}

function updateSavedEntriesDisplay() {
    const entriesContainer = document.getElementById('savedEntries');
    const entries = JSON.parse(localStorage.getItem('nutritionEntries') || '[]');
    
    entriesContainer.innerHTML = entries.map(entry => `
        <div class="entry-card">
            <h4>${entry.food}</h4>
            <p>Added: ${new Date(entry.timestamp).toLocaleString()}</p>
            <div class="comments">
                ${entry.comments.map(comment => `
                    <p class="comment">${comment}</p>
                `).join('')}
            </div>
            <button onclick="addComment(${entry.timestamp})">Add Comment</button>
            <button onclick="deleteEntry(${entry.timestamp})">Delete</button>
        </div>
    `).join('');
}

// Initialize the application
loadTabContent('grains'); // Load initial content
