// Pagrindiniai kintamieji
let ingredients = [];

// Dienos normos
const dailyValues = {
    // B Vitaminai (moterims 19+ metų)
    B1: 1.1,    // mg
    B2: 1.0,    // mg
    B3: 35.0,   // mg
    B5: 5.0,    // mg
    B6: 1.3,    // mg
    B7: 0.03,   // mcg (30 mcg)
    B12: 2.4,   // mcg
    
    // Kiti vitaminai
    VitaminA: 700,  // mcg
    VitaminC: 75,   // mg
    VitaminD: 15,   // mcg
    VitaminE: 15,   // mg
    VitaminK: 90,   // mcg
    
    // Mineralai
    Calcium: 1000,    // mg
    Iron: 18,         // mg
    Magnesium: 310,   // mg
    Phosphorus: 700,  // mg
    Potassium: 2600,  // mg
    Zinc: 8,          // mg
    Selenium: 55,     // mcg
    Copper: 0.9,      // mg
    Manganese: 1.8,   // mg
    Chromium: 0.025,  // mg
    Molybdenum: 0.045,// mg
    Iodine: 150,      // mcg
    Chloride: 2300,   // mg
    Choline: 425      // mg
};

// Maisto šaltiniai ir jų mikroelementų kiekiai
const micronutrientSources = {
    B1: { Smidrai: 0.05, SaulėgrąžųSėklos: 0.03, ŽaliejiŽirneliai: 0.02, SezamoSėklos: 0.04 },
    B2: { Špinatai: 0.03, Soja: 0.02, Smidrai: 0.02, Kiaušiniai: 0.05 },
    B3: { Tunas: 0.1, Vištiena: 0.08, Lašiša: 0.09, Jautiena: 0.07 },
    B5: { ShiitakeGrybai: 0.04, KriminiGrybai: 0.02, SaldžiosiosBulvės: 0.01, Vištiena: 0.03 },
    B6: { Kalakutiena: 0.05, Jautiena: 0.04, Lašiša: 0.04, Vištiena: 0.03, Bananas: 0.02 },
    B7: { Pomidoras: 0.01, Kiaušiniai: 0.02, Svogūnai: 0.01, Morka: 0.01, Bananas: 0.01 },
    B12: { Jogurtas: 0.1, Kiaušiniai: 0.03, Sardinės: 0.05, Tunas: 0.04 },
    VitaminA: { Špinatai: 0.1, Morka: 0.08, SaldžiojisBulvė: 0.09, Lapkotis: 0.11 },
    VitaminC: { BriuselioPupelės: 0.08, Braškės: 0.06, Papaja: 0.1 },
    VitaminD: { Kiaušiniai: 0.02, Lašiša: 0.03, SaulėsŠviesa: 0.05 },
    Calcium: { Tofu: 0.1, Sūris: 0.2, Jogurtas: 0.15, Sardinės: 0.08 },
    Iron: { ŠpinataiŠveicarijosLapai: 0.05, Pupelės: 0.04, MoliūgųSėklos: 0.03 },
    Magnesium: { Migdolai: 0.06, SojosPupelės: 0.05, RudiRyžiai: 0.04 },
    Phosphorus: { Vištiena: 0.07, Kalakutiena: 0.06, Jogurtas: 0.05 },
    Iodine: { JūrosŽolės: 0.2, Žuvis: 0.1, Krevetės: 0.08 }
};

// TCM duomenys
const tcmData = [
    { laikas: "7–11 val.", organas: "Skrandis / Blužnis", funkcija: "Virškinimas", mikroelementai: "Cinkas, Chromas" },
    { laikas: "11–13 val.", organas: "Širdis", funkcija: "Kraujotaka", mikroelementai: "Geležis, Varis" },
    { laikas: "15–19 val.", organas: "Inkstai / Šlapimo pūslė", funkcija: "Skysčių balansas", mikroelementai: "Magnis, Kalis" },
    { laikas: "19–21 val.", organas: "Perikardas", funkcija: "Emocinė būsena", mikroelementai: "Magnis, Kalis" },
    { laikas: "1–3 val.", organas: "Kepenys", funkcija: "Detoksikacija", mikroelementai: "Geležis, Cinkas, Varis" }
];

// Pacman žaidimo klasė
class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.pacman = { 
            x: 50, 
            y: 150, 
            radius: 15, 
            speed: 2, 
            direction: Math.PI / 4 
        };
        this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letterObjects = [];
        this.init();
    }

    // [Likusi Pacman žaidimo logika lieka tokia pati]
}

// TCM lentelės užpildymas
function fillTcmTable() {
    const tbody = document.querySelector("#tcmTable tbody");
    tbody.innerHTML = tcmData.map(item => `
        <tr>
            <td>${item.laikas}</td>
            <td>${item.organas}</td>
            <td>${item.funkcija}</td>
            <td>${item.mikroelementai}</td>
        </tr>
    `).join('');
}

// Maisto dienoraščio funkcijos
document.getElementById('diaryBtn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('diaryModal').style.display = 'block';
    loadDiary();
});

document.getElementById('closeDiary').addEventListener('click', closeDiaryModal);

function analyzeFood() {
    const text = document.getElementById("foodEntry").value;
    ingredients = text.split(/,\s*|\n/)
        .map(entry => entry.trim())
        .filter(entry => entry)
        .map(entry => {
            const [name, amount] = entry.split(':').map(s => s.trim());
            return {
                name,
                amount: parseFloat(amount) || 100,
                nutrients: calculateMicronutrients(name, parseFloat(amount) || 100)
            };
        });

    updateRecentEntries();
    updateNutrientAnalysis();
}

// [Likusios funkcijos lieka tokios pačios, tik su lietuviškais pranešimais]

// Inicializacija
window.addEventListener('load', () => {
    fillTcmTable();
    new PacmanGame();
});
