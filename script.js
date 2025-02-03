// TCM Data
const tcmData = [
    { laikas: "7–11 val.", organas: "Skrandis / Blužnis", funkcija: "Virškinimas", mikroelementai: "Cinkas, Chromas" },
    { laikas: "11–13 val.", organas: "Širdis", funkcija: "Kraujotaka", mikroelementai: "Geležis, Varis" },
    { laikas: "15–19 val.", organas: "Inkstai / Šlapimo pūslė", funkcija: "Skysčių balansas", mikroelementai: "Magnis, Kalis" },
    { laikas: "19–21 val.", organas: "Perikardas", funkcija: "Emocinė būsena", mikroelementai: "Magnis, Kalis" },
    { laikas: "1–3 val.", organas: "Kepenys", funkcija: "Detoksikacija", mikroelementai: "Geležis, Cinkas, Varis" }
];

// Nutrition Data
let ingredients = [];
const dailyValues = {
    B1: 1.1, B2: 1.0, B3: 35.0, B5: 5.0, B6: 1.3, B7: 0.03, B12: 2.4,
    VitaminA: 700, VitaminC: 75, VitaminD: 15, VitaminE: 15, VitaminK: 90,
    Calcium: 1000, Iron: 18, Magnesium: 310, Phosphorus: 700, Potassium: 2600,
    Zinc: 8, Selenium: 55, Copper: 0.9, Manganese: 1.8, Chromium: 0.025,
    Molybdenum: 0.045, Iodine: 150, Chloride: 2300, Choline: 425
};

const micronutrientSources = {
    B1: { Asparagus: 0.05, SunflowerSeeds: 0.03, GreenPeas: 0.02, SesameSeeds: 0.04 },
    B2: { Spinach: 0.03, SoyBeans: 0.02, Asparagus: 0.02, Eggs: 0.05 },
    B3: { Tuna: 0.1, Chicken: 0.08, Salmon: 0.09, Beef: 0.07 },
    B5: { MushroomShiitake: 0.04, MushroomCrimini: 0.02, SweetPotatoes: 0.01, Chicken: 0.03 },
    B6: { Turkey: 0.05, Beef: 0.04, Salmon: 0.04, Chicken: 0.03, Banana: 0.02 },
    B7: { Tomato: 0.01, Eggs: 0.02, Onions: 0.01, Carrot: 0.01, Banana: 0.01 },
    B12: { Yogurt: 0.1, Eggs: 0.03, Sardines: 0.05, Tuna: 0.04 },
    VitaminA: { Spinach: 0.1, Carrot: 0.08, SweetPotato: 0.09, Kale: 0.11 },
    VitaminC: { BrusselsSprouts: 0.08, Strawberries: 0.06, Papaya: 0.1 },
    VitaminD: { Eggs: 0.02, Salmon: 0.03, SunExposure: 0.05 },
    Calcium: { Tofu: 0.1, Cheese: 0.2, Yogurt: 0.15, Sardines: 0.08 },
    Iron: { SpinachSwissChard: 0.05, Beans: 0.04, PumpkinSeeds: 0.03 },
    Magnesium: { AlmondMigdolas: 0.06, SoybeansPupeles: 0.05, BrownRice: 0.04 },
    Phosphorus: { Chicken: 0.07, Turkey: 0.06, Yogurt: 0.05 },
    Iodine: { Seaweed: 0.2, Fish: 0.1, Shrimp: 0.08 }
};

// Pacman Game Class
class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
