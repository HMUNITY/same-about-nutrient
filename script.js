class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.foodItems = [];
        this.pacman = { x: 50, y: 150, radius: 15, speed: 2, direction: Math.PI / 4 };

        this.tcmData = [
            { time: "7–11 val.", organ: "Skrandis / Blužnis", function: "Virškinimas", elements: "Cinkas, Chromas" },
            { time: "11–13 val.", organ: "Širdis", function: "Kraujotaka", elements: "Geležis, Varis" },
            { time: "15–19 val.", organ: "Inkstai / Šlapimo pūslė", function: "Skysčių balansas", elements: "Magnis, Kalis" },
            { time: "19–21 val.", organ: "Perikardas", function: "Emocinė būsena", elements: "Magnis, Kalis" },
            { time: "1–3 val.", organ: "Kepenys", function: "Detoksikacija", elements: "Geležis, Cinkas, Varis" }
        ];

        this.micronutrientData = [
            { title: "Cholinas (CNS ir PNS)", description: "Veikia nervų sistemą, padeda perduoti nervinius signalus.", sources: "Kiaušiniai, tunas, lašiša, jautiena, vištiena" },
            { title: "Kalcis ir Vitaminai K, D", description: "Susiję su kaulų stiprumu.", sources: "Lašiša, žalios lapinės daržovės, kiauliena" },
            { title: "Chloridas", description: "Palaiko mineralų pusiausvyrą skrandžio rūgšties lygyje.", sources: "Riešutai, tofų, pomidorai, salieras, alyvuogės" },
            { title: "B grupės vitaminai", description: "Padeda konvertuoti maistą į energiją.", sources: "Asparagai, špinatai, soja, tunas, vištiena" },
            { title: "Vitaminas C", description: "Neutralizuoja laisvuosius radikalus, stiprina imuninę sistemą.", sources: "Uogos, daržovės, brokoliai, papaja" }
        ];

        this.init();
    }

    init() {
        this.populateTCMTable();
        this.populateMicronutrientInfo();
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

    populateMicronutrientInfo() {
        const microDiv = document.getElementById('microelements');
        microDiv.innerHTML = this.micronutrientData.map(item => `
            <div>
                <h3>${item.title}</h3>
                <p><strong>Funkcija:</strong> ${item.description}</p>
                <p><strong>Šaltiniai:</strong> ${item.sources}</p>
            </div>
            <hr>
        `).join('');
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update Pacman position
        this.pacman.x += Math.cos(this.pacman.direction) * this.pacman.speed;
        this.pacman.y += Math.sin(this.pacman.direction) * this.pacman.speed;

        // Wall collision
        if (this.pacman.x < 0 || this.pacman.x > this.canvas.width) this.pacman.direction = Math.PI - this.pacman.direction;
        if (this.pacman.y < 0 || this.pacman.y > this.canvas.height) this.pacman.direction = -this.pacman.direction;

        // Draw Pacman
        this.ctx.beginPath();
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacman.radius, 0.2, 1.8 * Math.PI);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();

        requestAnimationFrame(() => this.gameLoop());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PacmanGame();
});
