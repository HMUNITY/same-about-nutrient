// Database of nutrients and foods
const foodData = {
    grains: {
        "Rye": { nutrients: { fiber: 15, protein: 10 }, unit: "g" },
        "Barley": { nutrients: { fiber: 17, protein: 12 }, unit: "g" },
        "Lentils": { nutrients: { protein: 18, iron: 7 }, unit: "cups" }
    },
    vegetables: {
        "Asparagus": { nutrients: { vitaminB1: 0.4, folate: 262 }, unit: "cups" },
        "Sweet Potatoes": { nutrients: { vitaminA: 1922, vitaminC: 35 }, unit: "cups" },
        "Spinach": { nutrients: { iron: 2.7, vitaminK: 483 }, unit: "cups" }
    },
    proteins: {
        "Chicken": { nutrients: { protein: 31, iron: 1 }, unit: "g" },
        "Beef": { nutrients: { protein: 26, zinc: 5 }, unit: "g" },
        "Yogurt": { nutrients: { calcium: 200, protein: 10 }, unit: "cups" }
    }
};

// Adding vitamins and minerals data to the script
const vitaminsAndMinerals = {
    "Vitamin A": {
        description: [
            "Requires proteins and fats for absorption",
            "Requires zinc for absorption",
            "May interfere with vitamin K absorption",
            "Controls vitamin D metabolism"
        ],
        foods: ["Eggs", "Cheese", "Rye", "Tomatoes"]
    },
    "Vitamin D": {
        description: [
            "Essential for calcium absorption and bone health"
        ],
        foods: ["Eggs", "Cheese", "Rye", "Tomatoes"]
    },
    "Vitamin K": {
        description: [
            "Important for blood clotting and bone health"
        ],
        foods: ["Vegetables", "Rye", "Cheese", "Tomatoes"]
    },
    "Iron": {
        description: [
            "Vital for oxygen transport in the blood"
        ],
        foods: ["Swiss Chard", "Kidney Beans", "Pumpkin Seeds", "Lentils"]
    },
    "Manganese": {
        description: [
            "Important for bone formation and metabolic processes"
        ],
        foods: ["Flax Seeds", "Chickpeas", "Pineapple", "Collard Greens", "Cinnamon", "Black Pepper"]
    },
    "Phosphorus": {
        description: [
            "Necessary for bone health and energy production"
        ],
        foods: ["Lentils", "Chicken", "Turkey", "Beef", "Yogurt", "Pumpkin Seeds"]
    },
    "Chromium": {
        description: [
            "Helps regulate blood sugar levels"
        ],
        foods: ["Broccoli", "Barley"]
    },
    "Chloride": {
        description: [
            "Maintains proper fluid balance and blood pressure"
        ],
        foods: ["Rye", "Tomatoes", "Lettuce", "Celery", "Cheese", "Olives"]
    },
    "Potassium": {
        description: [
            "Important for heart function and muscle contraction"
        ],
        foods: ["Tomatoes", "Rye", "Lettuce", "Celery", "Olives", "Papaya", "Basil", "Flax Seeds", "Oregano", "Chickpeas", "Cashews", "Sunflower Seeds", "Brussels Sprouts", "Berries", "Shiitake Mushrooms", "Almonds", "Avocados", "Collard Greens", "Beans", "Sweet Potatoes", "Soybeans", "Yogurt", "Asparagus", "Bananas", "Carrots", "Onions", "Spinach", "Black Pepper", "Crimini Mushrooms", "Cabbage"]
    }
};

// Implement functionality for adding, saving, and deleting food items
// Additional code logic for handling interactions and displaying nutrient info based on the new entries

