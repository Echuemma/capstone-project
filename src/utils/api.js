// src/utils/api.js
import { workouts as initialWorkouts } from "../data/workouts";
import { exercises as initialExercises } from "../data/exercises";
import { progress as initialProgress } from "../data/progress";

// 🧠 Simulate async API delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 💾 localStorage keys
const STORAGE_KEYS = {
  WORKOUTS: 'fitness_workouts',
  EXERCISES: 'fitness_exercises',
  PROGRESS: 'fitness_progress',
  FAVORITES: 'fitness_favorites'
};

// 🔧 Helper functions for localStorage
const storage = {
  get(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// 📊 Initialize data from localStorage or use defaults
const initializeData = () => {
  const workouts = storage.get(STORAGE_KEYS.WORKOUTS, initialWorkouts);
  const exercises = storage.get(STORAGE_KEYS.EXERCISES, initialExercises);
  const progress = storage.get(STORAGE_KEYS.PROGRESS, initialProgress);
  const favorites = storage.get(STORAGE_KEYS.FAVORITES, []);
  
  return { workouts, exercises, progress, favorites };
};

let data = initializeData();

export const api = {
  // Get all workouts or by date
  async getWorkouts(date) {
    await delay(300);
    if (date) return data.workouts.filter(w => w.date === date);
    return data.workouts;
  },

  // Add a new workout
  async addWorkout(workoutData) {
    await delay(300);
    const newWorkout = { 
      id: Date.now(), 
      userId: 101,
      ...workoutData 
    };
    data.workouts.push(newWorkout);
    storage.set(STORAGE_KEYS.WORKOUTS, data.workouts);
    
    // Update progress for the date
    this.updateProgress(workoutData.date, workoutData.caloriesBurned);
    
    return newWorkout;
  },

  // Update a workout
  async updateWorkout(id, updates) {
    await delay(300);
    const index = data.workouts.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Workout not found');
    
    const oldWorkout = data.workouts[index];
    data.workouts[index] = { ...oldWorkout, ...updates };
    storage.set(STORAGE_KEYS.WORKOUTS, data.workouts);
    
    // Update progress if calories changed
    if (updates.caloriesBurned && updates.caloriesBurned !== oldWorkout.caloriesBurned) {
      const diff = updates.caloriesBurned - oldWorkout.caloriesBurned;
      this.updateProgress(data.workouts[index].date, diff);
    }
    
    return data.workouts[index];
  },

  // Delete a workout
  async deleteWorkout(id) {
    await delay(300);
    const workout = data.workouts.find(w => w.id === id);
    if (!workout) throw new Error('Workout not found');
    
    data.workouts = data.workouts.filter(w => w.id !== id);
    storage.set(STORAGE_KEYS.WORKOUTS, data.workouts);
    
    // Update progress
    this.updateProgress(workout.date, -workout.caloriesBurned);
    
    return { success: true, id };
  },

  // Get all exercises or filtered
  async searchExercises(query, filters = {}) {
    await delay(200);
    let results = data.exercises;

    if (query) {
      results = results.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.muscleGroup && filters.muscleGroup !== 'all') {
      results = results.filter(e => e.muscleGroup === filters.muscleGroup);
    }

    if (filters.equipment && filters.equipment !== 'all') {
      results = results.filter(e => e.equipment === filters.equipment);
    }

    return results;
  },

  // Get progress (for analytics)
  async getProgress() {
    await delay(300);
    return data.progress;
  },

  // Update progress for a specific date
  updateProgress(date, caloriesDiff) {
    const progressIndex = data.progress.findIndex(p => p.date === date);
    
    if (progressIndex !== -1) {
      // Update existing progress
      data.progress[progressIndex].calories += caloriesDiff;
      data.progress[progressIndex].workouts = data.workouts.filter(w => w.date === date).length;
    } else {
      // Create new progress entry
      data.progress.push({
        date,
        calories: Math.max(0, caloriesDiff),
        workouts: data.workouts.filter(w => w.date === date).length
      });
    }
    
    storage.set(STORAGE_KEYS.PROGRESS, data.progress);
  },

  // Toggle favorite exercise
  async toggleFavorite(exerciseId) {
    await delay(200);
    const index = data.favorites.indexOf(exerciseId);
    
    if (index === -1) {
      data.favorites.push(exerciseId);
    } else {
      data.favorites.splice(index, 1);
    }
    
    storage.set(STORAGE_KEYS.FAVORITES, data.favorites);
    return data.favorites;
  },

  // Check if exercise is favorite
  async isFavorite(exerciseId) {
    await delay(100);
    return data.favorites.includes(exerciseId);
  },

  // Get all favorites
  async getFavorites() {
    await delay(200);
    return data.favorites;
  },

  // Reset all data to defaults
  async resetData() {
    await delay(300);
    storage.clear();
    data = initializeData();
    return { success: true };
  }
};