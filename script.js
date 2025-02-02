class AdvancedFoodGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isSoundOn = true;
        this.init();
    }

    init() {
        // Game state
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.pacman = {
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            radius: 20,
            speed: 2.5,
            direction: Math.random() * Math.PI * 2,
            mouthOpen: 0.2,
            mouthSpeed: 0.05
        };
        
        // Food configuration
        this.foodItems = [];
        this.foodEmojis = {
            Vaisiai: ["🍎", "🍇", "🍓", "🍌", "🍊"],
            Daržovės: ["🥕", "🥦", "🌽", "🍆", "🥒"],
            Baltymai: ["🍗", "🥩", "🍳", "🥚", "🍤"]
        };
        
        // Game setup
        this.setupControls();
        this.spawnFood(15);
        this.updateScore();
        this.gameLoop();
        this.loadHistory();
    }

    setupControls() {
        // Sound toggle
        document.getElementById('toggleSound').addEventListener('click', () => {
            this.isSoundOn = !this.isSoundOn;
            document.getElementById('toggleSound').textContent = 
                this.isSoundOn ? 'Garso Išjungimas' : 'Garso Įjungimas';
        });

        // Reset game
        document.getElementById('resetBtn').addEventListener('click', () => {
            localStorage.removeItem('savedFoods');
            this.score = 0;
            this.updateScore();
            document.getElementById('saved-list').innerHTML = '';
            this.spawnFood(15);
        });

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterItems(btn.dataset.filter);
            });
        });
    }

    spawnFood(quantity) {
        this.foodItems = [];
        const categories = Object.keys(this.foodEmojis);
        
        for(let i = 0; i < quantity; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            this.foodItems.push({
                x: Math.random() * (this.canvas.width - 40) + 20,
                y: Math.random() * (this.canvas.height - 40) + 20,
                emoji: this.foodEmojis[category][Math.floor(Math.random() * 5)],
                category: category,
                active: true,
                size: Math.random() * 20 + 20
            });
        }
    }

    checkCollision() {
        this.foodItems.forEach(food => {
            if(food.active) {
                const dx = this.pacman.x - food.x;
                const dy = this.pacman.y - food.y;
                const distance = Math.hypot(dx, dy);
                
                if(distance < this.pacman.radius + food.size/2) {
                    this.handleCollision(food);
                }
            }
        });
    }

    handleCollision(food) {
        food.active = false;
        this.score++;
        this.updateScore();
        this.saveToHistory(food);
        this.playSound('collect');
        
        setTimeout(() => {
            food.x = Math.random() * (this.canvas.width - 40) + 20;
            food.y = Math.random() * (this.canvas.height - 40) + 20;
            food.active = true;
        }, 2000);
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        if(this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
        }
        document.getElementById('highScore').textContent = this.highScore;
    }

    saveToHistory(food) {
        const timestamp = new Date().toLocaleString("lt-LT");
        const listItem = this.createHistoryItem(food.emoji, food.category, timestamp);
        document.getElementById('saved-list').prepend(listItem);
        
        const savedItems = JSON.parse(localStorage.getItem('savedFoods')) || [];
        savedItems.unshift({ emoji: food.emoji, category: food.category, timestamp });
        localStorage.setItem('savedFoods', JSON.stringify(savedItems.slice(0, 50)));
    }

    createHistoryItem(emoji, category, timestamp) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="emoji">${emoji}</span>
            <div class="details">
                <div class="category">${category}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
        `;
        return li;
    }

    filterItems(filter) {
        document.querySelectorAll('#saved-list li').forEach(li => {
            const category = li.querySelector('.category').textContent;
            li.style.display = (filter === 'all' || category === filter) ? 'flex' : 'none';
        });
    }

    loadHistory() {
        const savedItems = JSON.parse(localStorage.getItem('savedFoods')) || [];
        const list = document.getElementById('saved-list');
        list.innerHTML = savedItems
            .map(item => this.createHistoryItem(item.emoji, item.category, item.timestamp))
            .join('');
    }

    playSound(type) {
        if(!this.isSoundOn) return;
        
        const audio = new Audio();
        audio.src = type === 'collect' ? 
            'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' : 
            'data:audio/wav;base64,UklGRoAAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAB
