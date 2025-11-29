// src/data/nutrition/meals.js

// --------------------------------------
// Today’s meals (initial data)
// --------------------------------------
export const initialMeals = {
  breakfast: [
    {
      id: 1,
      name: 'Oatmeal with Berries',
      calories: 320,
      protein: 12,
      carbs: 54,
      fats: 8,
      servingSize: '1 bowl',
      time: '7:30 AM',
      image: '🥣',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      calories: 150,
      protein: 20,
      carbs: 15,
      fats: 4,
      servingSize: '200g',
      time: '7:35 AM',
      image: '🥛',
      date: new Date().toISOString().split('T')[0]
    }
  ],

  lunch: [
    {
      id: 3,
      name: 'Grilled Chicken Salad',
      calories: 425,
      protein: 45,
      carbs: 32,
      fats: 18,
      servingSize: '1 large bowl',
      time: '12:30 PM',
      image: '🥗',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      name: 'Brown Rice',
      calories: 215,
      protein: 5,
      carbs: 45,
      fats: 2,
      servingSize: '1 cup',
      time: '12:35 PM',
      image: '🍚',
      date: new Date().toISOString().split('T')[0]
    }
  ],

  dinner: [
    {
      id: 5,
      name: 'Salmon Fillet',
      calories: 367,
      protein: 40,
      carbs: 0,
      fats: 22,
      servingSize: '6 oz',
      time: '7:00 PM',
      image: '🐟',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 6,
      name: 'Roasted Vegetables',
      calories: 120,
      protein: 4,
      carbs: 18,
      fats: 5,
      servingSize: '1 cup',
      time: '7:05 PM',
      image: '🥦',
      date: new Date().toISOString().split('T')[0]
    }
  ],

  snack: [
    {
      id: 7,
      name: 'Almonds',
      calories: 170,
      protein: 6,
      carbs: 6,
      fats: 15,
      servingSize: '1 oz (23 nuts)',
      time: '3:00 PM',
      image: '🥜',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 8,
      name: 'Apple',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fats: 0.3,
      servingSize: '1 medium',
      time: '10:00 AM',
      image: '🍎',
      date: new Date().toISOString().split('T')[0]
    }
  ]
};

// --------------------------------------
// Recent Foods (NEW EXPORT)
// --------------------------------------
export const recentFoods = [
  {
    id: 101,
    name: 'Banana',
    calories: 105,
    protein: 1,
    carbs: 27,
    fats: 0,
    emoji: '🍌',
    time: '9:10 AM',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 102,
    name: 'Protein Shake',
    calories: 210,
    protein: 24,
    carbs: 10,
    fats: 6,
    emoji: '🥤',
    time: '11:00 AM',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: 103,
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 4,
    emoji: '🍗',
    time: '1:30 PM',
    date: new Date().toISOString().split('T')[0]
  }
];

// --------------------------------------
// Weekly History
// --------------------------------------
export const weeklyHistory = [
  {
    date: '2025-06-10',
    calories: 1847,
    protein: 142,
    carbs: 185,
    fats: 62,
    meals: 12,
    mealBreakdown: {
      breakfast: 470,
      lunch: 640,
      dinner: 487,
      snack: 250
    }
  },
  {
    date: '2025-06-09',
    calories: 2050,
    protein: 155,
    carbs: 210,
    fats: 68,
    meals: 14,
    mealBreakdown: {
      breakfast: 520,
      lunch: 680,
      dinner: 590,
      snack: 260
    }
  },
  {
    date: '2025-06-08',
    calories: 2250,
    protein: 170,
    carbs: 245,
    fats: 75,
    meals: 15,
    mealBreakdown: {
      breakfast: 580,
      lunch: 750,
      dinner: 640,
      snack: 280
    }
  },
  {
    date: '2025-06-07',
    calories: 1950,
    protein: 148,
    carbs: 195,
    fats: 65,
    meals: 13,
    mealBreakdown: {
      breakfast: 490,
      lunch: 650,
      dinner: 550,
      snack: 260
    }
  }
];

// --------------------------------------
// Top Logged Foods
// --------------------------------------
export const topLoggedFoods = [
  { id: 1, name: 'Chicken Breast', count: 28, calories: 4620, emoji: '🍗' },
  { id: 2, name: 'Brown Rice', count: 24, calories: 2688, emoji: '🍚' },
  { id: 3, name: 'Greek Yogurt', count: 22, calories: 1298, emoji: '🥛' },
  { id: 4, name: 'Broccoli', count: 20, calories: 680, emoji: '🥦' },
  { id: 5, name: 'Salmon', count: 18, calories: 3744, emoji: '🐟' }
];
