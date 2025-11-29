// src/utils/nutritionApi.js
import { initialMeals, weeklyHistory } from '../data/nutrition/meals';
import { popularFoods } from '../data/nutrition/foods';
import { getTodayDate } from './nutritionUtils';

// 🧠 Simulate async API delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 💾 Storage keys
const STORAGE_KEYS = {
  MEALS: 'nutrition_meals',
  FAVORITES: 'nutrition_favorites',
  HISTORY: 'nutrition_history',
  WATER_INTAKE: 'nutrition_water'
};

// 🔧 Helper functions for storage (in-memory, since localStorage not available)
let storageData = {
  meals: null,
  favorites: [],
  history: [],
  waterIntake: {}
};

const storage = {
  get(key, defaultValue) {
    try {
      // Try localStorage first
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      // Fallback to in-memory storage
      switch(key) {
        case STORAGE_KEYS.MEALS:
          return storageData.meals || defaultValue;
        case STORAGE_KEYS.FAVORITES:
          return storageData.favorites || defaultValue;
        case STORAGE_KEYS.HISTORY:
          return storageData.history || defaultValue;
        case STORAGE_KEYS.WATER_INTAKE:
          return storageData.waterIntake || defaultValue;
        default:
          return defaultValue;
      }
    } catch (error) {
      console.error('Error reading from storage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      // Try localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Fallback to in-memory storage
      switch(key) {
        case STORAGE_KEYS.MEALS:
          storageData.meals = value;
          break;
        case STORAGE_KEYS.FAVORITES:
          storageData.favorites = value;
          break;
        case STORAGE_KEYS.HISTORY:
          storageData.history = value;
          break;
        case STORAGE_KEYS.WATER_INTAKE:
          storageData.waterIntake = value;
          break;
      }
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // Clear from in-memory storage
      switch(key) {
        case STORAGE_KEYS.MEALS:
          storageData.meals = null;
          break;
        case STORAGE_KEYS.FAVORITES:
          storageData.favorites = [];
          break;
        case STORAGE_KEYS.HISTORY:
          storageData.history = [];
          break;
        case STORAGE_KEYS.WATER_INTAKE:
          storageData.waterIntake = {};
          break;
      }
    }
  },
  
  clear() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      // Clear in-memory storage
      storageData = {
        meals: null,
        favorites: [],
        history: [],
        waterIntake: {}
      };
    }
  }
};

// 📊 Initialize data from storage or use defaults
const initializeData = () => {
  const meals = storage.get(STORAGE_KEYS.MEALS, initialMeals);
  const favorites = storage.get(STORAGE_KEYS.FAVORITES, []);
  const history = storage.get(STORAGE_KEYS.HISTORY, weeklyHistory);
  const waterIntake = storage.get(STORAGE_KEYS.WATER_INTAKE, {});
  
  return { meals, favorites, history, waterIntake };
};

let data = initializeData();

export const nutritionApi = {
  // Get all meals or by date
  async getMeals(date) {
    await delay(200);
    if (date) {
      const filtered = {};
      Object.keys(data.meals).forEach(mealType => {
        filtered[mealType] = data.meals[mealType].filter(meal => meal.date === date);
      });
      return filtered;
    }
    return data.meals;
  },

  // Add a new meal
  async addMeal(mealData) {
    await delay(300);
    const newMeal = {
      id: Date.now(),
      date: mealData.date || getTodayDate(),
      time: mealData.time || new Date().toTimeString().slice(0, 5),
      ...mealData
    };
    
    const mealType = mealData.mealType || 'snack';
    data.meals[mealType].push(newMeal);
    storage.set(STORAGE_KEYS.MEALS, data.meals);
    
    // Update history
    this.updateHistory(newMeal.date);
    
    return newMeal;
  },

  // Update a meal
  async updateMeal(id, updates) {
    await delay(300);
    let updated = null;
    
    Object.keys(data.meals).forEach(mealType => {
      const index = data.meals[mealType].findIndex(meal => meal.id === id);
      if (index !== -1) {
        data.meals[mealType][index] = { ...data.meals[mealType][index], ...updates };
        updated = data.meals[mealType][index];
      }
    });
    
    if (!updated) throw new Error('Meal not found');
    
    storage.set(STORAGE_KEYS.MEALS, data.meals);
    this.updateHistory(updated.date);
    
    return updated;
  },

  // Delete a meal
  async deleteMeal(id) {
    await delay(300);
    let deleted = false;
    let mealDate = null;
    
    Object.keys(data.meals).forEach(mealType => {
      const index = data.meals[mealType].findIndex(meal => meal.id === id);
      if (index !== -1) {
        mealDate = data.meals[mealType][index].date;
        data.meals[mealType].splice(index, 1);
        deleted = true;
      }
    });
    
    if (!deleted) throw new Error('Meal not found');
    
    storage.set(STORAGE_KEYS.MEALS, data.meals);
    if (mealDate) this.updateHistory(mealDate);
    
    return { success: true, id };
  },

  // Get all foods
  async getFoods() {
    await delay(200);
    return popularFoods;
  },

  // Search foods
  async searchFoods(query) {
    await delay(300);
    if (!query) return popularFoods;
    
    return popularFoods.filter(food =>
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Get nutrition history
  async getHistory() {
    await delay(200);
    return data.history;
  },

  // Update history for a specific date
  updateHistory(date) {
    const dayMeals = Object.values(data.meals)
      .flat()
      .filter(meal => meal.date === date);
    
    const totals = dayMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    
    const historyIndex = data.history.findIndex(h => h.date === date);
    
    if (historyIndex !== -1) {
      data.history[historyIndex] = {
        ...data.history[historyIndex],
        ...totals,
        meals: dayMeals.length
      };
    } else {
      data.history.push({
        date,
        ...totals,
        meals: dayMeals.length,
        mealBreakdown: {
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          snack: 0
        }
      });
    }
    
    storage.set(STORAGE_KEYS.HISTORY, data.history);
  },

  // Toggle favorite food
  async toggleFavorite(foodId) {
    await delay(200);
    const index = data.favorites.indexOf(foodId);
    
    if (index === -1) {
      data.favorites.push(foodId);
    } else {
      data.favorites.splice(index, 1);
    }
    
    storage.set(STORAGE_KEYS.FAVORITES, data.favorites);
    return data.favorites;
  },

  // Get favorites
  async getFavorites() {
    await delay(200);
    return data.favorites;
  },

  // Check if food is favorite
  isFavorite(foodId) {
    return data.favorites.includes(foodId);
  },

  // Water intake
  async getWaterIntake(date = getTodayDate()) {
    await delay(100);
    return data.waterIntake[date] || 0;
  },

  async updateWaterIntake(date = getTodayDate(), glasses) {
    await delay(200);
    data.waterIntake[date] = Math.max(0, glasses);
    storage.set(STORAGE_KEYS.WATER_INTAKE, data.waterIntake);
    return data.waterIntake[date];
  },

  async incrementWater(date = getTodayDate()) {
    await delay(200);
    const current = data.waterIntake[date] || 0;
    data.waterIntake[date] = current + 1;
    storage.set(STORAGE_KEYS.WATER_INTAKE, data.waterIntake);
    return data.waterIntake[date];
  },

  async decrementWater(date = getTodayDate()) {
    await delay(200);
    const current = data.waterIntake[date] || 0;
    data.waterIntake[date] = Math.max(0, current - 1);
    storage.set(STORAGE_KEYS.WATER_INTAKE, data.waterIntake);
    return data.waterIntake[date];
  },

  // Reset all data to defaults
  async resetData() {
    await delay(300);
    storage.clear();
    data = initializeData();
    return { success: true };
  }
};