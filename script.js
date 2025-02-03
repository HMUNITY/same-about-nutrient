class SimpleFoodGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.foodItems = [];
        this.score = 0;
        
        this.pacman = {
            x: 300,
            y: 200,
            radius: 15,
            speed: 2,
            direction: Math.random() * Math.PI * 2
        };

        this.init();
    }

    init() {
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        this.spawnFood(10);
        this.gameLoop();
    }

    spawnFood(count) {
        const emojis = ["🍎", "🥕", "🍗"];
        for(let i = 0; i < count; i++) {
            this.foodItems.push({
                x: Math.random() * (this.canvas.width - 30) + 15,
                y: Math.random() * (this.canvas.height - 30) + 15,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                active: true
            });
        }
    }

    checkCollision() {
        this.foodItems.forEach(food => {
            if(food.active) {
                const dx = this.pacman.x - food.x;
                const dy = this.pacman.y - food.y;
                if(Math.hypot(dx, dy) < this.pacman.radius + 15) {
                    this.handleFoodCollection(food);
                }
            }
        });
    }

    handleFoodCollection(food) {
        food.active = false;
        this.score++;
        this.addToList(food.emoji);
        setTimeout(() => {
            food.x = Math.random() * (this.canvas.width - 30) + 15;
            food.y = Math.random() * (this.canvas.height - 30) + 15;
            food.active = true;
        }, 2000);
    }

    addToList(emoji) {
        const li = document.createElement('li');
        li.textContent = emoji;
        document.getElementById('saved-list').prepend(li);
    }

    resetGame() {
        this.foodItems = [];
        this.score = 0;
        document.getElementById('saved-list').innerHTML = '';
        this.spawnFood(10);
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update Pac-Man position
        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        // Wall collision
        if(this.pacman.x < 0 || this.pacman.x > this.canvas.width) {
            this.pacman.direction = Math.PI - this.pacman.direction;
        }
        if(this.pacman.y < 0 || this.pacman.y > this.canvas.height) {
            this.pacman.direction = -this.pacman.direction;
        }

        // Draw Pac-Man
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        // Draw food
        this.foodItems.forEach(food => {
            if(food.active) {
                this.ctx.font = '30px Arial';
                this.ctx.fillText(food.emoji, food.x, food.y);
            }
        });

        this.checkCollision();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start game when page loads
window.addEventListener('load', () => {
    new SimpleFoodGame();
});
