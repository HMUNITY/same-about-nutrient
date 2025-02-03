const dailyValues = {
    B1: 1.1, B12: 2.4, Calcium: 1000, Iron: 18,
    Choline: 425, VitaminD: 15, VitaminK: 90
};

const micronutrientSources = {
    B1: {
        "Žaliasis žirnis": 0.02,
        "Pupelės": 0.03,
        "Saulėgrąžų sėklos": 0.05
    },
    B12: {
        "Lašiša": 0.04,
        "Jautiena": 0.03,
        "Kiaušiniai": 0.02
    },
    Calcium: {
        "Sūris": 0.2,
        "Jogurtas": 0.15,
        "Spinatas": 0.1
    },
    Iron: {
        "Jautiena": 0.04,
        "Lęšiai": 0.03,
        "Moliūgų sėklos": 0.05
    }
};

let selectedProducts = [];

function updateProducts() {
    const category = document.getElementById('categorySelect').value;
    const products = Object.keys(micronutrientSources[category]);
    
    document.getElementById('productList').innerHTML = products
        .map(product => `
            <div class="product-item" onclick="selectProduct('${product}')">
                ${product} (${micronutrientSources[category][product]}mg/g)
            </div>
        `).join('');
}

function selectProduct(productName) {
    document.querySelectorAll('.product-item').forEach(item => 
        item.classList.remove('selected'));
    event.target.classList.add('selected');
}

function addProduct() {
    const productName = document.querySelector('.product-item.selected').textContent.split(' ')[0];
    const quantity = parseFloat(document.getElementById('productQuantity').value);
    
    if(!productName || isNaN(quantity)) {
        alert("Pasirinkite produktą ir įveskite kiekį!");
        return;
    }

    selectedProducts.push({
        name: productName,
        quantity: quantity,
        timestamp: new Date().toLocaleString()
    });

    updateSummary();
    updateProgress();
}

function calculateNutrients() {
    return selectedProducts.reduce((totals, product) => {
        Object.entries(micronutrientSources).forEach(([nutrient, sources]) => {
            if(sources[product.name]) {
                totals[nutrient] = (totals[nutrient] || 0) + 
                    (sources[product.name] * product.quantity);
            }
        });
        return totals;
    }, {});
}

function updateProgress() {
    const nutrients = calculateNutrients();
    document.getElementById('progressContainer').innerHTML = Object.entries(nutrients)
        .map(([nutrient, value]) => `
            <div class="progress-bar">
                <div class="progress-fill" 
                     style="width: ${Math.min((value / dailyValues[nutrient]) * 100, 100)}%">
                    ${nutrient}: ${value.toFixed(2)}/${dailyValues[nutrient]}mg
                </div>
            </div>
        `).join('');
}

function updateSummary() {
    document.getElementById('selectedProducts').innerHTML = selectedProducts
        .map(product => `
            <div class="product-entry">
                ${product.name} - ${product.quantity}g 
                <small>(${product.timestamp})</small>
            </div>
        `).join('');
}

function saveData() {
    const data = {
        date: document.getElementById('currentDate').value,
        products: selectedProducts,
        nutrients: calculateNutrients()
    };
    
    const allData = JSON.parse(localStorage.getItem('nutritionData') || '[]');
    const existingIndex = allData.findIndex(d => d.date === data.date);
    
    if(existingIndex > -1) {
        allData[existingIndex] = data;
    } else {
        allData.push(data);
    }
    
    localStorage.setItem('nutritionData', JSON.stringify(allData));
    alert('Duomenys sėkmingai išsaugoti!');
}

function clearData() {
    if(confirm("Ar tikrai norite išvalyti visus duomenis?")) {
        selectedProducts = [];
        updateSummary();
        updateProgress();
    }
}

// Pradinis užkrovimas
document.addEventListener('DOMContentLoaded', () => {
    updateProducts();
    updateProgress();
});
