import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { getTodayDate, getTodayStats, getWeeklyProgress } from '../utils/workoutUtils';

/**
 * Custom hook to manage all fitness data and operations
 * Centralizes data fetching, state management, and CRUD operations
 */
export function useFitnessData() {
  // State management
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [todayWorkoutsList, setTodayWorkoutsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  // Load initial data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load exercises when filters change
  useEffect(() => {
    loadFilteredExercises();
  }, [searchQuery, selectedMuscle, selectedEquipment]);

  // Load all data
  const loadData = async () => {
    try {
      setLoading(true);
      const [workoutsData, exercisesData, progressData, favoritesData] = await Promise.all([
        api.getWorkouts(),
        api.searchExercises(''),
        api.getProgress(),
        api.getFavorites()
      ]);
      
      setWorkouts(workoutsData);
      setExercises(exercisesData);
      setProgress(progressData);
      setFavorites(favoritesData);
      
      // Get today's workouts
      const today = getTodayDate();
      const todayData = await api.getWorkouts(today);
      setTodayWorkoutsList(todayData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load filtered exercises
  const loadFilteredExercises = async () => {
    try {
      const filters = {};
      if (selectedMuscle !== 'all') filters.muscleGroup = selectedMuscle;
      if (selectedEquipment !== 'all') filters.equipment = selectedEquipment;
      
      const data = await api.searchExercises(searchQuery, filters);
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  };

  // Add or update workout
  const saveWorkout = async (workoutData, editingWorkout) => {
    try {
      if (editingWorkout) {
        await api.updateWorkout(editingWorkout.id, workoutData);
      } else {
        await api.addWorkout({
          ...workoutData,
          date: getTodayDate(),
        });
      }
      await loadData();
      return { success: true };
    } catch (error) {
      console.error('Error saving workout:', error);
      return { success: false, error };
    }
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    try {
      await api.deleteWorkout(id);
      await loadData();
      return { success: true };
    } catch (error) {
      console.error('Error deleting workout:', error);
      return { success: false, error };
    }
  };

  // Toggle favorite
  const toggleFavorite = async (exerciseId) => {
    try {
      const newFavorites = await api.toggleFavorite(exerciseId);
      setFavorites(newFavorites);
      return { success: true };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { success: false, error };
    }
  };

  // Reset all data
  const resetData = async () => {
    try {
      await api.resetData();
      await loadData();
      return { success: true };
    } catch (error) {
      console.error('Error resetting data:', error);
      return { success: false, error };
    }
  };

  // Computed values
  const todayStats = getTodayStats(workouts);
  const weeklyProgressData = getWeeklyProgress(progress);

  return {
    // State
    workouts,
    exercises,
    progress,
    favorites,
    todayWorkoutsList,
    loading,
    
    // Filters
    searchQuery,
    setSearchQuery,
    selectedMuscle,
    setSelectedMuscle,
    selectedEquipment,
    setSelectedEquipment,
    
    // Computed values
    todayStats,
    weeklyProgressData,
    
    // Operations
    loadData,
    saveWorkout,
    deleteWorkout,
    toggleFavorite,
    resetData,
  };
}