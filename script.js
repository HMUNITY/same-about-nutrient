// Data Structures
const foodDatabase = {
    grains: {
        "Rye": { serving: "100g", nutrients: { fiber: 15.1, protein: 10.3 } },
        "Barley": { serving: "120g", nutrients: { fiber: 17.3, protein: 12.5 } },
        "Lentils": { serving: "2 cups", nutrients: { protein: 17.9, iron: 6.6 } }
    },
    vegetables: {
        "Asparagus": { serving: "4 cups", nutrients: { vitaminB1: 0.4, folate: 262 } },
        "Sweet Potatoes": { serving: "3 cups", nutrients: { vitaminA: 1922, vitaminC: 35.3 } }
    },
    proteins: {
        "Chicken": { serving: "500g", nutrients: { protein: 155, vitaminB6: 2.5 } },
        "Salmon": { serving: "1kg", nutrients: { omega3: 4.023, protein: 208 } }
    }
};

const tcmClock = {
    "Heart": { time: "11:00-13:00", element: "Fire", nutrients: ["Iron", "Copper"] },
    "Liver": { time: "01:00-03:00", element: "Wood", nutrients: ["Iron", "Zinc"] },
    // Add more organs as needed
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeForms();
    setupTCMClock();
    setupContactForm();
    new PacmanGame();
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
function initializeForms() {
    const foodSelectionForm = document.getElementById('foodSelectionForm');
    foodSelectionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateNutrition();
    });
}

// Nutrition Calculation (Placeholder)
function calculateNutrition() {
    const food = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;
    const unit = document.getElementById('unit').value;
    // Placeholder for actual calculation logic
    console.log(`Calculating nutrition for ${quantity} ${unit} of ${food}`);
    // Implement actual calculation and display results
}

// TCM Clock Visualization (Placeholder)
function setupTCMClock() {
    const clockContainer = document.querySelector('.clock-visual');
    // Implement clock visualization logic
    console.log("Setting up TCM Clock");
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
        console.log("Contact form submitted");
    });
}

// Pacman Game Logic
class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.pacman = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 15,
            speed: 2,
            mouthOpen: 0.2,
            mouthSpeed: 0.05
        };
        this.dots = [];
        this.keys = {};
        this.init();
    }

    init() {
        this.spawnDots(10);
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());
        this.gameLoop();
    }

    spawnDots(count) {
        for (let i = 0; i < count; i++) {
            this.dots.push({
                x: Math.random() * (this.canvas.width - 30) + 15,
                y: Math.random() * (this.canvas.height - 30) + 15,
                radius: 4,
                active: true
            });
        }
    }

    movePacman() {
        if (this.keys['ArrowUp']) this.pacman.y -= this.pacman.speed;
        if (this.keys['ArrowDown']) this.pacman.y += this.pacman.speed;
        if (this.keys['ArrowLeft']) this.pacman.x -= this.pacman.speed;
        if (this.keys['ArrowRight']) this.pacman.x += this.pacman.speed;

        this.pacman.x = Math.max(this.pacman.radius, Math.min(this.canvas.width - this.pacman.radius, this.pacman.x));
        this.pacman.y = Math.max(this.pacman.radius, Math.min(this.canvas.height - this.pacman.radius, this.pacman.y));

        this.pacman.mouthOpen += this.pacman.mouthSpeed;
        if (this.pacman.mouthOpen > 0.4 || this.pacman.mouthOpen < 0.1) {
            this.pacman.mouthSpeed = -this.pacman.mouthSpeed;
        }
    }

    checkCollisions() {
        this.dots.forEach(dot => {
            if (dot.active) {
                const dx = this.pacman.x - dot.x;
                const dy = this.pacman.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.pacman.radius + dot.radius) {
                    dot.active = false;
                    this.score++;
                    document.getElementById('scoreCounter').textContent = this.score;
                    this.spawnDots(1);
                }
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.dots.forEach(dot => {
            if (dot.active) {
                this.ctx.beginPath();
                this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        this.ctx.fillStyle = '#ffcc00';
        this.ctx.beginPath();
        this.ctx.arc(
            this.pacman.x,
            this.pacman.y,
            this.pacman.radius,
            this.pacman.mouthOpen * Math.PI,
            (2 - this.pacman.mouthOpen) * Math.PI
        );
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fill();
    }

    gameLoop() {
        this.movePacman();
        this.checkCollisions();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    restart() {
        this.score = 0;
        this.pacman.x = this.canvas.width / 2;
        this.pacman.y = this.canvas.height / 2;
        this.dots = [];
        this.spawnDots(10);
        document.getElementById('scoreCounter').textContent = this.score;
    }
}

// Placeholder functions (to be implemented)
function loadTabContent(tab) {
    console.log(`Loading content for ${tab}`);
    // Implement tab content loading logic
}

function performNutritionCalculation(food, quantity, unit) {
    console.log(`Performing calculation for ${food}, ${quantity} ${unit}`);
    // Implement actual calculation logic and return results
    return { food, quantity, unit };
}

function displayResults(results) {
    console.log("Displaying results:", results);
    // Implement display logic for calculationResults
}

function saveEntry(data) {
    const entry = { ...data, timestamp: new Date().toISOString(), comments: [] };
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
                ${entry.comments.map(comment => `<p class="comment">${comment}</p>`).join('')}
            </div>
            <button onclick="addComment(${entry.timestamp})">Add Comment</button>
            <button onclick="deleteEntry(${entry.timestamp})">Delete</button>
        </div>
    `).join('');
}

// Placeholder for addComment and deleteEntry
function addComment(timestamp) {
    console.log(`Adding comment to entry with timestamp: ${timestamp}`);
    // Implement comment addition logic
}

function deleteEntry(timestamp) {
    console.log(`Deleting entry with timestamp: ${timestamp}`);
    // Implement entry deletion logic
}
