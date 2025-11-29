// src/utils/nutritionUtils.js

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Format date to readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Get short date format (e.g., "Jun 10, 2025")
 */
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

/**
 * Get day name from date
 */
export const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Calculate total nutrition from meals
 */
export const calculateTotalNutrition = (meals) => {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fats: totals.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};

/**
 * Calculate nutrition for a specific meal type
 */
export const calculateMealTypeNutrition = (meals, mealType) => {
  const mealTypeMeals = meals.filter(meal => meal.mealType === mealType);
  return calculateTotalNutrition(mealTypeMeals);
};

/**
 * Calculate daily stats from all meals
 */
export const calculateDailyStats = (allMeals, date = getTodayDate()) => {
  const todayMeals = Object.values(allMeals)
    .flat()
    .filter(meal => meal.date === date);
  
  return calculateTotalNutrition(todayMeals);
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current, target) => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

/**
 * Calculate remaining amount
 */
export const calculateRemaining = (current, target) => {
  return Math.max(target - current, 0);
};

/**
 * Calculate macro percentages from grams
 * Protein: 4 cal/g, Carbs: 4 cal/g, Fats: 9 cal/g
 */
export const calculateMacroPercentages = (protein, carbs, fats) => {
  const proteinCals = protein * 4;
  const carbsCals = carbs * 4;
  const fatsCals = fats * 9;
  const totalCals = proteinCals + carbsCals + fatsCals;
  
  if (totalCals === 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }
  
  return {
    protein: Math.round((proteinCals / totalCals) * 100),
    carbs: Math.round((carbsCals / totalCals) * 100),
    fats: Math.round((fatsCals / totalCals) * 100)
  };
};

/**
 * Calculate calories from macros
 */
export const calculateCaloriesFromMacros = (protein, carbs, fats) => {
  return (protein * 4) + (carbs * 4) + (fats * 9);
};

/**
 * Get meals by date
 */
export const getMealsByDate = (allMeals, date) => {
  const result = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  };
  
  Object.keys(allMeals).forEach(mealType => {
    result[mealType] = allMeals[mealType].filter(meal => meal.date === date);
  });
  
  return result;
};

/**
 * Filter meals by date range
 */
export const getMealsByDateRange = (allMeals, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const filtered = {};
  Object.keys(allMeals).forEach(mealType => {
    filtered[mealType] = allMeals[mealType].filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate >= start && mealDate <= end;
    });
  });
  
  return filtered;
};

/**
 * Get total meals count for a date
 */
export const getTotalMealsCount = (allMeals, date = getTodayDate()) => {
  return Object.values(allMeals)
    .flat()
    .filter(meal => meal.date === date)
    .length;
};

/**
 * Calculate meal type calories
 */
export const calculateMealTypeCalories = (meals) => {
  return {
    breakfast: meals.breakfast.reduce((sum, meal) => sum + meal.calories, 0),
    lunch: meals.lunch.reduce((sum, meal) => sum + meal.calories, 0),
    dinner: meals.dinner.reduce((sum, meal) => sum + meal.calories, 0),
    snack: meals.snack.reduce((sum, meal) => sum + meal.calories, 0)
  };
};

/**
 * Get nutrition status (low, good, high)
 */
export const getNutritionStatus = (current, target, type = 'calories') => {
  const percentage = (current / target) * 100;
  
  if (type === 'calories') {
    if (percentage < 80) return { status: 'low', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    if (percentage > 110) return { status: 'high', color: 'text-red-600', bgColor: 'bg-red-50' };
    return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-50' };
  }
  
  // For macros
  if (percentage < 70) return { status: 'low', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  if (percentage > 120) return { status: 'high', color: 'text-red-600', bgColor: 'bg-red-50' };
  return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-50' };
};

/**
 * Calculate weekly average
 */
export const calculateWeeklyAverage = (weeklyData, key) => {
  const total = weeklyData.reduce((sum, day) => sum + day[key], 0);
  return Math.round(total / weeklyData.length);
};

/**
 * Calculate nutrition streak
 */
export const calculateNutritionStreak = (history) => {
  let streak = 0;
  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  for (const day of sortedHistory) {
    // Consider a day successful if they logged at least 3 meals
    if (day.meals >= 3) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Get goal hit rate (percentage of days goals were met)
 */
export const getGoalHitRate = (history, goals) => {
  if (history.length === 0) return 0;
  
  const daysMetGoal = history.filter(day => {
    const caloriePercentage = (day.calories / goals.calories) * 100;
    return caloriePercentage >= 90 && caloriePercentage <= 110;
  }).length;
  
  return Math.round((daysMetGoal / history.length) * 100);
};

/**
 * Search/filter foods
 */
export const filterFoods = (foods, query, category = 'All', showFavoritesOnly = false) => {
  let filtered = [...foods];
  
  // Filter by search query
  if (query) {
    filtered = filtered.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Filter by category
  if (category && category !== 'All') {
    filtered = filtered.filter(food => food.category === category);
  }
  
  // Filter by favorites
  if (showFavoritesOnly) {
    filtered = filtered.filter(food => food.isFavorite);
  }
  
  return filtered;
};

/**
 * Calculate serving multiplier values
 */
export const calculateServingValues = (food, servingSize) => {
  return {
    calories: Math.round(food.calories * servingSize),
    protein: Math.round(food.protein * servingSize * 10) / 10,
    carbs: Math.round(food.carbs * servingSize * 10) / 10,
    fats: Math.round(food.fats * servingSize * 10) / 10
  };
};

/**
 * Format time (24hr to 12hr)
 */
export const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

/**
 * Get current time in HH:MM format
 */
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};