const ingredients = [];
const micronutrients = {};

// Add ingredient
document.getElementById("add-ingredient").addEventListener("click", () => {
  const name = document.getElementById("ingredient-name").value;
  const amount = parseFloat(document.getElementById("ingredient-amount").value);

  if (name && amount > 0) {
    ingredients.push({ name, amount });
    updateIngredientList();
    calculateMicronutrients();
  } else {
    alert("Please enter valid ingredient details!");
  }
});

// Update ingredient list
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

// Create delete button
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

// Calculate micronutrients
function calculateMicronutrients() {
  // Example micronutrient calculation logic
  const summary = { VitaminA: 0, Calcium: 0 };
  ingredients.forEach((ingredient) => {
    // Replace with real data or API calls
    summary.VitaminA += ingredient.amount * 0.05;
    summary.Calcium += ingredient.amount * 0.02;
  });

  displayMicronutrientSummary(summary);
}

// Display micronutrient summary
function displayMicronutrientSummary(summary) {
  const summaryList = document.getElementById("micronutrient-summary");
  summaryList.innerHTML = "";
  for (const [key, value] of Object.entries(summary)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value.toFixed(2)}%`;
    summaryList.appendChild(li);
  }
}

// Save results
document.getElementById("save-button").addEventListener("click", () => {
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
  alert("Data saved!");
});

// Delete results
document.getElementById("delete-button").addEventListener("click", () => {
  localStorage.clear();
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
    fileInput.value = ""; // Reset file input
  } else {
    alert("Please select a file to upload.");
  }
});

