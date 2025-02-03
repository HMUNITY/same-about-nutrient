class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;

        this.pacman = { x: 50, y: 150, radius: 15, speed: 2, direction: Math.PI / 4 };
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letterObjects = [];

        this.init();
    }

    init() {
        this.spawnLetters(5);
        this.gameLoop();
    }

    spawnLetters(count) {
        for (let i = 0; i < count; i++) {
            this.letterObjects.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                letter: this.letters[Math.floor(Math.random() * this.letters.length)],
                active: true
            });
        }
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        if (this.pacman.x < 0 || this.pacman.x > this.canvas.width) this.pacman.direction = Math.PI - this.pacman.direction;
        if (this.pacman.y < 0 || this.pacman.y > this.canvas.height) this.pacman.direction = -this.pacman.direction;

        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        this.letterObjects.forEach(letter => {
            if (letter.active) {
                this.ctx.font = '20px Arial';
                this.ctx.fillText(letter.letter, letter.x, letter.y);
            }
        });

        requestAnimationFrame(() => this.gameLoop());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PacmanGame();
});

document.getElementById('diaryBtn').addEventListener('click', () => {
    document.getElementById('diaryModal').style.display = 'block';
});

document.getElementById('closeDiary').addEventListener('click', () => {
    document.getElementById('diaryModal').style.display = 'none';
});

function analyzeFood() {
    let text = document.getElementById("foodEntry").value;
    let words = text.split(/\s+/);
    let wordCount = {};
    
    words.forEach(word => {
        word = word.toLowerCase();
        if (wordCount[word]) wordCount[word]++;
        else wordCount[word] = 1;
    });

    let list = document.getElementById("wordCountList");
    list.innerHTML = Object.keys(wordCount).map(key => `<li>${key}: ${wordCount[key]}</li>`).join('');
}

function saveDiary() {
    let data = document.getElementById("foodEntry").value;
    localStorage.setItem("foodDiary", data);
}

function clearDiary() {
    localStorage.removeItem("foodDiary");
    document.getElementById("foodEntry").value = "";
}
