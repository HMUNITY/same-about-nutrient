document.addEventListener("DOMContentLoaded", function () {
    updateOptions();
    loadSavedSelections();
});

const foodOptions = {
    vaisiai: ["Obuolys", "Bananai", "Apelsinas"],
    darzoves: ["Morka", "Agurkas", "Pomidoras"],
    baltymai: ["Vištiena", "Žuvis", "Pupelės"]
};

function updateOptions() {
    const category = document.getElementById("category").value;
    const options = document.getElementById("options");
    options.innerHTML = "";
    
    foodOptions[category].forEach(food => {
        let option = document.createElement("option");
        option.textContent = food;
        option.value = food;
        options.appendChild(option);
    });
}

function saveSelection() {
    const category = document.getElementById("category").value;
    const food = document.getElementById("options").value;
    const savedList = document.getElementById("saved-list");

    let timestamp = new Date().toLocaleString("lt-LT", { hour12: false });

    let listItem = document.createElement("li");
    listItem.textContent = `${food} (${category}) - Išsaugota: ${timestamp}`;
    
    savedList.appendChild(listItem);

    saveToLocalStorage(food, category, timestamp);
}

function saveToLocalStorage(food, category, timestamp) {
    let savedItems = JSON.parse(localStorage.getItem("savedFoods")) || [];
    savedItems.push({ food, category, timestamp });
    localStorage.setItem("savedFoods", JSON.stringify(savedItems));
}

function loadSavedSelections() {
    let savedItems = JSON.parse(localStorage.getItem("savedFoods")) || [];
    const savedList = document.getElementById("saved-list");

    savedItems.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.food} (${item.category}) - Išsaugota: ${item.timestamp}`;
        savedList.appendChild(listItem);
    });
}
