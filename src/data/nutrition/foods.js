// src/data/nutrition/foods.js

export const popularFoods = [
  { 
    id: 1, 
    name: 'Chicken Breast', 
    calories: 165, 
    protein: 31, 
    carbs: 0, 
    fats: 3.6, 
    serving: '100g', 
    category: 'Protein', 
    isFavorite: true,
    image: '🍗'
  },
  { 
    id: 2, 
    name: 'Brown Rice', 
    calories: 112, 
    protein: 2.6, 
    carbs: 24, 
    fats: 0.9, 
    serving: '100g', 
    category: 'Carbs', 
    isFavorite: false,
    image: '🍚'
  },
  { 
    id: 3, 
    name: 'Broccoli', 
    calories: 34, 
    protein: 2.8, 
    carbs: 7, 
    fats: 0.4, 
    serving: '100g', 
    category: 'Vegetable', 
    isFavorite: true,
    image: '🥦'
  },
  { 
    id: 4, 
    name: 'Salmon', 
    calories: 208, 
    protein: 20, 
    carbs: 0, 
    fats: 13, 
    serving: '100g', 
    category: 'Protein', 
    isFavorite: true,
    image: '🐟'
  },
  { 
    id: 5, 
    name: 'Avocado', 
    calories: 160, 
    protein: 2, 
    carbs: 9, 
    fats: 15, 
    serving: '100g', 
    category: 'Healthy Fat', 
    isFavorite: false,
    image: '🥑'
  },
  { 
    id: 6, 
    name: 'Greek Yogurt', 
    calories: 59, 
    protein: 10, 
    carbs: 3.6, 
    fats: 0.4, 
    serving: '100g', 
    category: 'Dairy', 
    isFavorite: true,
    image: '🥛'
  },
  { 
    id: 7, 
    name: 'Banana', 
    calories: 89, 
    protein: 1.1, 
    carbs: 23, 
    fats: 0.3, 
    serving: '1 medium', 
    category: 'Fruit', 
    isFavorite: false,
    image: '🍌'
  },
  { 
    id: 8, 
    name: 'Eggs', 
    calories: 155, 
    protein: 13, 
    carbs: 1.1, 
    fats: 11, 
    serving: '2 large', 
    category: 'Protein', 
    isFavorite: true,
    image: '🥚'
  },
  { 
    id: 9, 
    name: 'Sweet Potato', 
    calories: 86, 
    protein: 1.6, 
    carbs: 20, 
    fats: 0.1, 
    serving: '100g', 
    category: 'Carbs', 
    isFavorite: false,
    image: '🍠'
  },
  { 
    id: 10, 
    name: 'Almonds', 
    calories: 579, 
    protein: 21, 
    carbs: 22, 
    fats: 50, 
    serving: '100g', 
    category: 'Healthy Fat', 
    isFavorite: true,
    image: '🥜'
  },
  { 
    id: 11, 
    name: 'Spinach', 
    calories: 23, 
    protein: 2.9, 
    carbs: 3.6, 
    fats: 0.4, 
    serving: '100g', 
    category: 'Vegetable', 
    isFavorite: false,
    image: '🥬'
  },
  { 
    id: 12, 
    name: 'Quinoa', 
    calories: 120, 
    protein: 4.4, 
    carbs: 21, 
    fats: 1.9, 
    serving: '100g', 
    category: 'Carbs', 
    isFavorite: false,
    image: '🌾'
  }
];

export const recentFoods = [
  { id: 101, name: 'Oatmeal', lastEaten: '2 days ago', image: '🥣' },
  { id: 102, name: 'Chicken Breast', lastEaten: '1 day ago', image: '🍗' },
  { id: 103, name: 'Greek Yogurt', lastEaten: 'Today', image: '🥛' },
  { id: 104, name: 'Brown Rice', lastEaten: 'Today', image: '🍚' }
];

export const foodCategories = [
  'All',
  'Protein',
  'Carbs',
  'Vegetable',
  'Fruit',
  'Dairy',
  'Healthy Fat',
  'Snack'
];

// Helper function to get food by ID
export const getFoodById = (id) => {
  return popularFoods.find(food => food.id === id);
};

// Helper function to filter foods
export const filterFoodsByCategory = (category) => {
  if (category === 'All') return popularFoods;
  return popularFoods.filter(food => food.category === category);
};

// Helper function to get favorite foods
export const getFavoriteFoods = () => {
  return popularFoods.filter(food => food.isFavorite);
};