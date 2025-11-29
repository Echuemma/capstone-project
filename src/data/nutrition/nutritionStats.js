// src/data/nutrition/nutritionStats.js

export const dailyGoals = {
  calories: 2200,
  protein: 165,
  carbs: 275,
  fats: 73,
  water: 8 // glasses
};

export const initialDailyStats = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  water: 0
};

export const weeklyCaloriesData = [
  { day: 'Mon', calories: 2100, target: 2200 },
  { day: 'Tue', calories: 1950, target: 2200 },
  { day: 'Wed', calories: 2250, target: 2200 },
  { day: 'Thu', calories: 1847, target: 2200 },
  { day: 'Fri', calories: 2050, target: 2200 },
  { day: 'Sat', calories: 2400, target: 2200 },
  { day: 'Sun', calories: 1900, target: 2200 }
];

export const macroDistribution = [
  { 
    name: 'Protein', 
    value: 28, 
    color: 'bg-blue-500', 
    grams: 142,
    colorHex: '#3b82f6' 
  },
  { 
    name: 'Carbs', 
    value: 40, 
    color: 'bg-green-500', 
    grams: 185,
    colorHex: '#22c55e'
  },
  { 
    name: 'Fats', 
    value: 32, 
    color: 'bg-yellow-500', 
    grams: 62,
    colorHex: '#eab308'
  }
];

// Weekly macro trends
export const weeklyMacroTrends = [
  { name: 'Protein', current: 148, target: 165, color: 'blue', trend: '+5%' },
  { name: 'Carbs', current: 195, target: 275, color: 'green', trend: '-2%' },
  { name: 'Fats', current: 65, target: 73, color: 'yellow', trend: '+3%' }
];

// Nutrition score breakdown
export const nutritionScore = {
  total: 87,
  balance: 92,
  consistency: 85,
  variety: 84
};

// Helper function to calculate macro percentages
export const calculateMacroPercentages = (protein, carbs, fats) => {
  const proteinCals = protein * 4;
  const carbsCals = carbs * 4;
  const fatsCals = fats * 9;
  const totalCals = proteinCals + carbsCals + fatsCals;
  
  return {
    protein: Math.round((proteinCals / totalCals) * 100),
    carbs: Math.round((carbsCals / totalCals) * 100),
    fats: Math.round((fatsCals / totalCals) * 100)
  };
};

// Helper function to get calorie target status
export const getCalorieStatus = (current, target) => {
  const percentage = (current / target) * 100;
  
  if (percentage < 80) return { status: 'low', color: 'text-orange-600' };
  if (percentage > 110) return { status: 'high', color: 'text-red-600' };
  return { status: 'good', color: 'text-green-600' };
};