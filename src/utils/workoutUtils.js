// src/utils/workoutUtils.js

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Filter workouts by date
 */
export const getWorkoutsByDate = (workouts, date) => {
  return workouts.filter(workout => workout.date === date);
};

/**
 * Calculate total duration from workouts
 */
export const calculateTotalDuration = (workouts) => {
  return workouts.reduce((sum, workout) => sum + workout.duration, 0);
};

/**
 * Calculate total calories from workouts
 */
export const calculateTotalCalories = (workouts) => {
  return workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
};

/**
 * Get today's stats from workouts
 */
export const getTodayStats = (workouts) => {
  const today = getTodayDate();
  const todayWorkouts = getWorkoutsByDate(workouts, today);
  
  return {
    workouts: todayWorkouts.length,
    duration: calculateTotalDuration(todayWorkouts),
    calories: calculateTotalCalories(todayWorkouts),
    exercises: todayWorkouts.length
  };
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
 * Get day name from date
 */
export const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Get weekly progress data
 */
export const getWeeklyProgress = (progress) => {
  return progress.map(p => ({
    day: getDayName(p.date),
    workouts: p.workouts,
    calories: p.calories,
    date: p.date
  }));
};

/**
 * Filter exercises by search query
 */
export const filterExercises = (exercises, searchQuery, selectedMuscle, selectedEquipment) => {
  return exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || exercise.muscleGroup.toLowerCase() === selectedMuscle.toLowerCase();
    const matchesEquipment = selectedEquipment === 'all' || exercise.equipment.toLowerCase() === selectedEquipment.toLowerCase();
    return matchesSearch && matchesMuscle && matchesEquipment;
  });
};

/**
 * Calculate total sets from workouts
 */
export const calculateTotalSets = (workouts) => {
  return workouts.reduce((sum, workout) => sum + workout.sets, 0);
};

/**
 * Get workout by ID
 */
export const getWorkoutById = (workouts, id) => {
  return workouts.find(workout => workout.id === id);
};

/**
 * Get exercise by ID
 */
export const getExerciseById = (exercises, id) => {
  return exercises.find(exercise => exercise.id === id);
};

/**
 * Calculate workout streak
 */
export const calculateWorkoutStreak = (progress) => {
  let streak = 0;
  const sortedProgress = [...progress].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  for (const day of sortedProgress) {
    if (day.workouts > 0) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Get total workouts in period
 */
export const getTotalWorkoutsInPeriod = (progress) => {
  return progress.reduce((sum, day) => sum + day.workouts, 0);
};

/**
 * Get max muscle group workouts for scaling
 */
export const getMaxMuscleGroupWorkouts = (muscleGroups) => {
  return Math.max(...muscleGroups.map(g => g.workouts));
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