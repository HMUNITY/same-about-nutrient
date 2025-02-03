class Pacman3Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.foodItems = [];
        this.score = 0;
        
        this.pacman = { x: 300, y: 200, radius: 15, speed: 2, direction: Math.random() * Math.PI * 2 };
        this.tcmData = [
            { time: "7–11 val.", organ: "Skrandis", function: "Virškinimas", elements: "Cinkas, Chromas" },
            { time: "11–13 val.", organ: "Širdis", function: "Kraujotaka", elements: "Geležis, Varis" },
        ];

        this.init();
    }

    init() {
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        this.spawnFood(5);
        this.populateTCMTable();
        this.gameLoop();
    }

    populateTCMTable() {
        const tbody = document.querySelector('#tcmTable tbody');
        tbody.innerHTML = this.tcmData.map(item => `
            <tr>
                <td>${item.time}</td>
                <td>${item.organ}</td>
                <td>${item.function}</td>
                <td>${item.elements}</td>
            </tr>
        `).join('');
    }

    spawnFood(count) {
        const emojis = ["🍎", "🥕", "🍗"];
        for (let i = 0; i < count; i++) {
            this.foodItems.push({
                x: Math.random() * (this.canvas.width - 30) + 15,
                y: Math.random() * (this.canvas.height - 30) + 15,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                active: true
            });
        }
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        this.foodItems.forEach(food => {
            if (food.active) {
                this.ctx.font = '30px Arial';
                this.ctx.fillText(food.emoji, food.x, food.y);
            }
        });

        requestAnimationFrame(() => this.gameLoop());
    }

    resetGame() {
        this.foodItems = [];
        this.spawnFood(5);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Pacman3Game();
});
