// TCM Organ Data
const tcmData = [
    { time: "7–11 AM", organ: "Stomach / Spleen", function: "Digestion", nutrients: "Zinc, Chromium" },
    { time: "11 AM–1 PM", organ: "Heart", function: "Circulation", nutrients: "Iron, Copper" },
    { time: "3–7 PM", organ: "Kidneys / Bladder", function: "Fluid Balance", nutrients: "Magnesium, Potassium" },
    { time: "7–9 PM", organ: "Pericardium", function: "Emotional State", nutrients: "Magnesium, Potassium" },
    { time: "1–3 AM", organ: "Liver", function: "Detoxification", nutrients: "Iron, Zinc, Copper" }
];

// Nutrient Analysis
let ingredients = [];
const nutrientValues = {
    VitaminB1: 1.1, VitaminB2: 1.0, VitaminB3: 35.0, VitaminB5: 5.0, VitaminB6: 1.3, 
    VitaminB7: 0.03, VitaminB12: 2.4, VitaminA: 700, VitaminC: 75, VitaminD: 15,
    Calcium: 1000, Iron: 18, Magnesium: 310, Phosphorus: 700, Potassium: 2600
};

// Open Food Diary Modal
document.getElementById('diaryBtn').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('diaryModal').style.display = 'block';
});

// Close Food Diary Modal
document.getElementById('closeDiary').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('diaryModal').style.display = 'none';
});

// Analyze Food Entry
function analyzeFood() {
    const foodEntry = document.getElementById('foodEntry').value;
    // Process food entry to extract nutrients (basic version)
    const analysis = `Analyzed Nutrients for: ${foodEntry}`;
    document.getElementById('nutrientAnalysis').innerHTML = analysis;
}

// Save Diary
function saveDiary() {
    // Save the current food diary to local storage
    const diaryEntry = document.getElementById('foodEntry').value;
    localStorage.setItem('foodDiary', diaryEntry);
}

// Clear Diary
function clearDiary() {
    document.getElementById('foodEntry').value = '';
    document.getElementById('nutrientAnalysis').innerHTML = '';
}

// TCM Table Population
const tcmTableBody = document.getElementById('tcmTable').getElementsByTagName('tbody')[0];
tcmData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.time}</td><td>${item.organ}</td><td>${item.function}</td><td>${item.nutrients}</td>`;
    tcmTableBody.appendChild(row);
});

