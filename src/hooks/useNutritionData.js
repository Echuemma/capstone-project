// src/hooks/useNutritionData.js
import { useState, useEffect, useCallback } from 'react';
import { nutritionApi } from '../utils/nutritionApi';
import { 
  getTodayDate, 
  calculateDailyStats,
  calculateMealTypeCalories,
  getMealsByDate,
  filterFoods,
  calculateProgress,
  calculateRemaining,
  getNutritionStatus
} from '../utils/nutritionUtils';
import { dailyGoals } from '../data/nutrition/nutritionStats';
import { popularFoods } from '../data/nutrition/foods';
import { generateInsights } from '../data/nutrition/insights';

export const useNutritionData = () => {
  // State management
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  });
  const [foods, setFoods] = useState(popularFoods);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Load data from API
  const loadData = async () => {
    try {
      setLoading(true);
      const [mealsData, favoritesData, historyData, waterData] = await Promise.all([
        nutritionApi.getMeals(),
        nutritionApi.getFavorites(),
        nutritionApi.getHistory(),
        nutritionApi.getWaterIntake(getTodayDate())
      ]);
      
      setMeals(mealsData);
      setFavorites(favoritesData);
      setHistory(historyData);
      setWaterIntake(waterData);
    } catch (error) {
      console.error('Error loading nutrition data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get today's meals
  const todayMeals = getMealsByDate(meals, selectedDate);

  // Calculate today's stats
  const todayStats = calculateDailyStats(meals, selectedDate);
  const todayStatsWithWater = {
    ...todayStats,
    water: waterIntake
  };

  // Calculate progress percentages
  const progressStats = {
    calories: {
      current: todayStats.calories,
      target: dailyGoals.calories,
      percentage: calculateProgress(todayStats.calories, dailyGoals.calories),
      remaining: calculateRemaining(todayStats.calories, dailyGoals.calories),
      status: getNutritionStatus(todayStats.calories, dailyGoals.calories, 'calories')
    },
    protein: {
      current: todayStats.protein,
      target: dailyGoals.protein,
      percentage: calculateProgress(todayStats.protein, dailyGoals.protein),
      remaining: calculateRemaining(todayStats.protein, dailyGoals.protein),
      status: getNutritionStatus(todayStats.protein, dailyGoals.protein, 'macros')
    },
    carbs: {
      current: todayStats.carbs,
      target: dailyGoals.carbs,
      percentage: calculateProgress(todayStats.carbs, dailyGoals.carbs),
      remaining: calculateRemaining(todayStats.carbs, dailyGoals.carbs),
      status: getNutritionStatus(todayStats.carbs, dailyGoals.carbs, 'macros')
    },
    fats: {
      current: todayStats.fats,
      target: dailyGoals.fats,
      percentage: calculateProgress(todayStats.fats, dailyGoals.fats),
      remaining: calculateRemaining(todayStats.fats, dailyGoals.fats),
      status: getNutritionStatus(todayStats.fats, dailyGoals.fats, 'macros')
    },
    water: {
      current: waterIntake,
      target: dailyGoals.water,
      percentage: calculateProgress(waterIntake, dailyGoals.water),
      remaining: calculateRemaining(waterIntake, dailyGoals.water)
    }
  };

  // Calculate meal type calories
  const mealTypeCalories = calculateMealTypeCalories(todayMeals);

  // Generate dynamic insights
  const insights = generateInsights(todayStatsWithWater, dailyGoals);

  // Filter foods based on search and filters
  const filteredFoods = filterFoods(foods, searchQuery, selectedCategory, showFavoritesOnly);

  // Add meal
  const addMeal = useCallback(async (mealData) => {
    try {
      const newMeal = await nutritionApi.addMeal(mealData);
      
      // Update local state
      setMeals(prev => ({
        ...prev,
        [mealData.mealType]: [...prev[mealData.mealType], newMeal]
      }));
      
      // Refresh history
      const updatedHistory = await nutritionApi.getHistory();
      setHistory(updatedHistory);
      
      return { success: true, meal: newMeal };
    } catch (error) {
      console.error('Error adding meal:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Update meal
  const updateMeal = useCallback(async (id, updates) => {
    try {
      const updatedMeal = await nutritionApi.updateMeal(id, updates);
      
      // Update local state
      setMeals(prev => {
        const newMeals = { ...prev };
        Object.keys(newMeals).forEach(mealType => {
          const index = newMeals[mealType].findIndex(meal => meal.id === id);
          if (index !== -1) {
            newMeals[mealType][index] = updatedMeal;
          }
        });
        return newMeals;
      });
      
      // Refresh history
      const updatedHistory = await nutritionApi.getHistory();
      setHistory(updatedHistory);
      
      return { success: true, meal: updatedMeal };
    } catch (error) {
      console.error('Error updating meal:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Delete meal
  const deleteMeal = useCallback(async (id) => {
    try {
      await nutritionApi.deleteMeal(id);
      
      // Update local state
      setMeals(prev => {
        const newMeals = { ...prev };
        Object.keys(newMeals).forEach(mealType => {
          newMeals[mealType] = newMeals[mealType].filter(meal => meal.id !== id);
        });
        return newMeals;
      });
      
      // Refresh history
      const updatedHistory = await nutritionApi.getHistory();
      setHistory(updatedHistory);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting meal:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback(async (foodId) => {
    try {
      const updatedFavorites = await nutritionApi.toggleFavorite(foodId);
      setFavorites(updatedFavorites);
      
      // Update foods list to reflect favorite status
      setFoods(prev => prev.map(food => ({
        ...food,
        isFavorite: updatedFavorites.includes(food.id)
      })));
      
      return { success: true };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Water intake management
  const incrementWater = useCallback(async () => {
    try {
      const newWaterIntake = await nutritionApi.incrementWater(selectedDate);
      setWaterIntake(newWaterIntake);
      return { success: true, water: newWaterIntake };
    } catch (error) {
      console.error('Error incrementing water:', error);
      return { success: false, error: error.message };
    }
  }, [selectedDate]);

  const decrementWater = useCallback(async () => {
    try {
      const newWaterIntake = await nutritionApi.decrementWater(selectedDate);
      setWaterIntake(newWaterIntake);
      return { success: true, water: newWaterIntake };
    } catch (error) {
      console.error('Error decrementing water:', error);
      return { success: false, error: error.message };
    }
  }, [selectedDate]);

  // Change selected date
  const changeDate = useCallback(async (newDate) => {
    try {
      setSelectedDate(newDate);
      
      // Load meals for the new date
      const mealsForDate = await nutritionApi.getMeals(newDate);
      setMeals(mealsForDate);
      
      // Load water intake for the new date
      const waterForDate = await nutritionApi.getWaterIntake(newDate);
      setWaterIntake(waterForDate);
      
      return { success: true };
    } catch (error) {
      console.error('Error changing date:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Reset all data
  const resetData = useCallback(async () => {
    try {
      await nutritionApi.resetData();
      await loadData();
      return { success: true };
    } catch (error) {
      console.error('Error resetting data:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Search foods
  const searchFoods = useCallback(async (query) => {
    try {
      const results = await nutritionApi.searchFoods(query);
      setFoods(results);
      return { success: true, foods: results };
    } catch (error) {
      console.error('Error searching foods:', error);
      return { success: false, error: error.message };
    }
  }, []);

  return {
    // Data
    meals,
    todayMeals,
    foods: filteredFoods,
    favorites,
    history,
    waterIntake,
    selectedDate,
    
    // Stats
    todayStats: todayStatsWithWater,
    progressStats,
    mealTypeCalories,
    dailyGoals,
    insights,
    
    // Loading state
    loading,
    
    // Search and filters
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showFavoritesOnly,
    setShowFavoritesOnly,
    
    // Actions
    addMeal,
    updateMeal,
    deleteMeal,
    toggleFavorite,
    incrementWater,
    decrementWater,
    changeDate,
    resetData,
    searchFoods
  };
};