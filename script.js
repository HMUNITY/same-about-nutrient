const ingredients = [];
const dailyValues = { VitaminA: 100, Calcium: 100 }; // Example daily values (%)
const micronutrients = {};

// Add ingredient
document.getElementById("add-ingredient").addEventListener("click", () => {
  const name = document.getElementById("ingredient-name").value;
  const amount = parseFloat(document.getElementById("ingredient-amount").value);

  if (name && amount > 0) {
    const newIngredient = { name, amount, micronutrients: calculateIngredientMicronutrients(amount) };
    ingredients.push(newIngredient);
    updateIngredientList();
    calculateMicronutrients();
  } else {
    alert("Please provide valid ingredient details!");
  }
});

// Simulated micronutrient data per gram
function calculateIngredientMicronutrients(amount) {
  return {
    VitaminA: amount * 0.05,
    Calcium: amount * 0.02,
  };
}

// Update ingredient list in the sidebar
function updateIngredientList() {
  const ingredientList = document.getElementById("ingredient-list");
  ingredientList.innerHTML = "";

  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.textContent = `${ingredient.name} - ${ingredient.amount}g`;
    li.appendChild(createDeleteButton(index));
    ingredientList.appendChild(li);
  });
}

// Create a delete button for ingredients
function createDeleteButton(index) {
  const button = document.createElement("button");
  button.textContent = "Remove";
  button.addEventListener("click", () => {
    ingredients.splice(index, 1);
    updateIngredientList();
    calculateMicronutrients();
  });
  return button;
}

// Calculate the combined micronutrients
function calculateMicronutrients() {
  const totalMicronutrients = { VitaminA: 0, Calcium: 0 };

  ingredients.forEach((ingredient) => {
    for (const key in ingredient.micronutrients) {
      totalMicronutrients[key] += ingredient.micronutrients[key];
    }
  });

  updateMicronutrientSummary(totalMicronutrients);
  recommendMicronutrientDeficits(totalMicronutrients);
}

// Update the micronutrient summary in the sidebar
function updateMicronutrientSummary(summary) {
  const micronutrientSummary = document.getElementById("micronutrient-summary");
  micronutrientSummary.innerHTML = "";

  for (const key in summary) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${summary[key].toFixed(2)}%`;
    micronutrientSummary.appendChild(li);
  }
}

// Recommend deficits to reach daily values
function recommendMicronutrientDeficits(summary) {
  const recommendation = document.getElementById("recommendation");
  recommendation.innerHTML = "";

  for (const key in dailyValues) {
    const deficit = dailyValues[key] - summary[key];
    if (deficit > 0) {
      const div = document.createElement("div");
      div.textContent = `You need ${deficit.toFixed(2)}% more ${key}`;
      recommendation.appendChild(div);
    }
  }
}

// Save data to localStorage
document.getElementById("save-data").addEventListener("click", () => {
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
  alert("Data saved successfully!");
});

// Clear data
document.getElementById("clear-data").addEventListener("click", () => {
  ingredients.length = 0;
  updateIngredientList();
  calculateMicronutrients();
  alert("Data cleared!");
});

// File upload logic
document.getElementById("upload-button").addEventListener("click", () => {
  const fileInput = document.getElementById("file-upload");
  if (fileInput.files.length > 0) {
    alert("File uploaded successfully!");
    fileInput.value = "";
  } else {
    alert("Please select a file to upload.");
  }
});

