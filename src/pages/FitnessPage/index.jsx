import React, { useState } from 'react';
import { 
  Dumbbell, 
  Search, 
  Plus, 
  TrendingUp, 
  Clock,
  Target,
  Flame,
  Award,
  ChevronRight,
  Edit2,
  Trash2,
  Heart,
  BarChart3,
  RefreshCw
} from 'lucide-react';

// Import data files
import { workoutTemplates } from '../../data/templates';
import { personalRecords } from '../../data/records';
import { muscleGroupDistribution, muscleGroupsList } from '../../data/muscleGroups';
import { equipmentTypes } from '../../data/equipment';
import { workoutSessions } from '../../data/sessions';
import { volumeProgress } from '../../data/volumeProgress';
import { exerciseFrequency } from '../../data/exerciseFrequency';

// Import utilities
import {
  calculateWorkoutStreak,
  getTotalWorkoutsInPeriod,
  formatDate
} from '../../utils/workoutUtils';

// Import custom hook
import { useFitnessData } from '../../hooks/useFitnessData';

// Import modals
import WorkoutLogModal from '../../modals/WorkoutLogModal';
import DeleteConfirmModal from '/src/modals/DeleteConfirmModal.jsx';

function FitnessPage() {
  // Use custom hook for all data management
  const {
    workouts,
    exercises,
    progress,
    favorites,
    todayWorkoutsList,
    loading,
    searchQuery,
    setSearchQuery,
    selectedMuscle,
    setSelectedMuscle,
    selectedEquipment,
    setSelectedEquipment,
    todayStats,
    weeklyProgressData,
    saveWorkout,
    deleteWorkout,
    toggleFavorite,
    resetData
  } = useFitnessData();

  // UI state
  const [activeTab, setActiveTab] = useState('today');
  const [showLogModal, setShowLogModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  // Calculate analytics data
  const workoutStreak = calculateWorkoutStreak(progress);
  const weeklyCalories = progress.reduce((sum, day) => sum + day.calories, 0);
  const monthlyWorkouts = getTotalWorkoutsInPeriod(progress);

  // Handle workout logging
  const handleLogWorkout = async (workoutData) => {
    const result = await saveWorkout(workoutData, editingWorkout);
    if (result.success) {
      setShowLogModal(false);
      setEditingWorkout(null);
    } else {
      alert('Failed to save workout. Please try again.');
    }
  };

  // Handle workout deletion
  const handleDeleteWorkout = (id) => {
    setWorkoutToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    const result = await deleteWorkout(workoutToDelete);
    if (result.success) {
      setShowDeleteConfirm(false);
      setWorkoutToDelete(null);
    } else {
      alert('Failed to delete workout. Please try again.');
    }
  };

  // Handle edit workout
  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setSelectedExercise({
      name: workout.name,
      muscleGroup: workout.muscleGroup,
      equipment: workout.equipment
    });
    setShowLogModal(true);
  };

  // Handle favorite toggle
  const handleToggleFavorite = async (exerciseId) => {
    await toggleFavorite(exerciseId);
  };

  // Handle data reset
  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      const result = await resetData();
      if (result.success) {
        alert('Data has been reset successfully!');
      } else {
        alert('Failed to reset data. Please try again.');
      }
    }
  };

  // Handle quick log (opens browse tab)
  const handleQuickLog = () => {
    setActiveTab('browse');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Dumbbell className="w-16 h-16 text-teal-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your fitness data...</p>
        </div>
      </div>
    );
  }

return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitness Tracker</h1>
          <p className="text-gray-600 mt-1">Track your workouts and build strength</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResetData}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
            title="Reset all data"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button 
            onClick={handleQuickLog}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Quick Log
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Dumbbell className="w-10 h-10 text-teal-600" />
            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">Today</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.workouts}</p>
          <p className="text-sm text-gray-600">Workouts Logged</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.duration}</p>
          <p className="text-sm text-gray-600">Minutes Trained</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-10 h-10 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.calories}</p>
          <p className="text-sm text-gray-600">Calories Burned</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-10 h-10 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{todayStats.exercises}</p>
          <p className="text-sm text-gray-600">Exercises Done</p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['today', 'browse', 'history', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Today's Workouts Tab */}
          {activeTab === 'today' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Workouts</h3>
              </div>

              {todayWorkoutsList.length > 0 ? (
                <div className="space-y-3">
                  {todayWorkoutsList.map((workout) => (
                    <div key={workout.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{workout.sets} sets × {workout.reps} reps</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4" />
                              {workout.caloriesBurned} cal
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {workout.duration} min
                            </span>
                          </div>
                          {workout.notes && (
                            <p className="text-sm text-gray-500 mt-2 italic">"{workout.notes}"</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditWorkout(workout)}
                            className="p-2 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-white transition-colors"
                            title="Edit workout"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteWorkout(workout.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                            title="Delete workout"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No workouts logged today</p>
                  <button 
                    onClick={() => setActiveTab('browse')}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
                  >
                    Log Your First Workout
                  </button>
                </div>
              )}

              {/* Workout Templates */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workoutTemplates.map((template) => (
                    <div key={template.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 cursor-pointer transition-colors group">
                      <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.focus}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{template.exercises} exercises</span>
                        <span>{template.duration}</span>
                      </div>
                      <button 
                        onClick={() => setActiveTab('browse')}
                        className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg group-hover:bg-teal-600 group-hover:text-white font-medium transition-colors"
                      >
                        Start Workout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Browse Exercises Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Muscle Group</label>
                    <select
                      value={selectedMuscle}
                      onChange={(e) => setSelectedMuscle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {muscleGroupsList.map((muscle) => (
                        <option key={muscle} value={muscle}>
                          {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Equipment</label>
                    <select
                      value={selectedEquipment}
                      onChange={(e) => setSelectedEquipment(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {equipmentTypes.map((equipment) => (
                        <option key={equipment} value={equipment}>
                          {equipment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Exercise Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exercises.length > 0 ? (
                  exercises.map((exercise) => {
                    const isFav = favorites.includes(exercise.id);
                    return (
                      <div key={exercise.id} className="p-4 border border-gray-200 rounded-lg hover:border-teal-600 transition-colors group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                              {isFav && (
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium">
                                {exercise.muscleGroup}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                {exercise.equipment}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleToggleFavorite(exercise.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isFav 
                                ? 'text-red-500 hover:bg-red-50' 
                                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                            }`}
                            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedExercise(exercise);
                            setEditingWorkout(null);
                            setShowLogModal(true);
                          }}
                          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Log Workout
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No exercises found matching your filters</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedMuscle('all');
                        setSelectedEquipment('all');
                      }}
                      className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Workout History</h3>
              </div>

              {/* Weekly Overview */}
              <div className="grid grid-cols-7 gap-2">
                {weeklyProgressData.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs font-medium text-gray-600 mb-2">{day.day}</p>
                    <div className={`rounded-lg p-3 transition-colors ${
                      day.workouts > 0 
                        ? 'bg-teal-50 hover:bg-teal-100 cursor-pointer' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                      <p className={`text-2xl font-bold ${
                        day.workouts > 0 ? 'text-teal-600' : 'text-gray-400'
                      }`}>{day.workouts}</p>
                      <p className="text-xs text-gray-600 mt-1">{day.calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Past Workouts */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Recent Sessions</h4>
                {workoutSessions.length > 0 ? (
                  workoutSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900">{session.name}</h5>
                          <p className="text-sm text-gray-600">{formatDate(session.date)} • {session.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{session.duration} minutes</p>
                          <p className="text-sm text-gray-600">{session.calories} calories</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-white rounded text-gray-700">{session.exercises} exercises</span>
                        <span className="text-xs px-2 py-1 bg-white rounded text-gray-700">{session.sets} sets</span>
                        <span className="text-xs px-2 py-1 bg-white rounded text-gray-700">{session.muscleGroups.join(', ')}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No workout history yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Workout Analytics</h3>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                  <Award className="w-10 h-10 text-teal-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">{workoutStreak}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">{weeklyCalories}</p>
                  <p className="text-sm text-gray-600">Total Calories (Week)</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <BarChart3 className="w-10 h-10 text-purple-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">{monthlyWorkouts}</p>
                  <p className="text-sm text-gray-600">Workouts (Month)</p>
                </div>
              </div>

              {/* Muscle Group Distribution */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Muscle Group Distribution</h4>
                <div className="space-y-3">
                  {muscleGroupDistribution.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{group.muscle}</span>
                        <span className="text-sm text-gray-600">{group.workouts} workouts</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${group.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(group.workouts / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Records */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Personal Records</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalRecords.map((record) => (
                    <div key={record.id} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">{record.exerciseName}</h5>
                          <p className="text-2xl font-bold text-orange-600 mt-1">
                            {record.isBodyweight ? record.note : `${record.weight} ${record.unit}`}
                          </p>
                        </div>
                        <Award className="w-10 h-10 text-orange-500" />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{formatDate(record.date)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume Progress Chart */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Monthly Volume Progression</h4>
                <div className="h-64 flex items-end justify-between gap-2">
                  {volumeProgress.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center h-full">
                      <div className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-lg hover:from-teal-700 hover:to-teal-500 transition-all cursor-pointer relative group mt-auto" 
                           style={{ height: `${data.volume}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.volume}k lbs
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 font-medium">{data.week}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercise Frequency */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Most Performed Exercises</h4>
                <div className="space-y-3">
                  {exerciseFrequency.map((exercise, index) => (
                    <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{exercise.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{exercise.count} times</span>
                        <span className="text-sm font-medium text-green-600">{exercise.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workout Consistency Calendar */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Workout Consistency</h4>
                <div className="space-y-4">
                  {/* Week labels */}
                  <div className="grid grid-cols-8 gap-2 text-xs font-medium text-gray-600">
                    <div></div>
                    <div className="text-center">Mon</div>
                    <div className="text-center">Tue</div>
                    <div className="text-center">Wed</div>
                    <div className="text-center">Thu</div>
                    <div className="text-center">Fri</div>
                    <div className="text-center">Sat</div>
                    <div className="text-center">Sun</div>
                  </div>
                  
                  {/* Calendar grid - 4 weeks */}
                  {Array.from({ length: 4 }, (_, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-8 gap-2">
                      <div className="text-xs font-medium text-gray-600 flex items-center">
                        Week {weekIndex + 1}
                      </div>
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const intensity = Math.random();
                        return (
                          <div
                            key={dayIndex}
                            className={`aspect-square rounded-lg cursor-pointer hover:ring-2 hover:ring-teal-500 transition-all ${
                              intensity > 0.7 ? 'bg-teal-600' :
                              intensity > 0.4 ? 'bg-teal-400' :
                              intensity > 0.2 ? 'bg-teal-200' :
                              'bg-gray-100'
                            }`}
                            title={`Week ${weekIndex + 1}, Day ${dayIndex + 1}: ${Math.floor(intensity * 3)} workouts`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-4 mt-4">
                  <span className="text-xs text-gray-600">Less</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-100 rounded"></div>
                    <div className="w-4 h-4 bg-teal-200 rounded"></div>
                    <div className="w-4 h-4 bg-teal-400 rounded"></div>
                    <div className="w-4 h-4 bg-teal-600 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-600">More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <WorkoutLogModal 
        show={showLogModal}
        onClose={() => {
          setShowLogModal(false);
          setEditingWorkout(null);
        }}
        selectedExercise={selectedExercise}
        editingWorkout={editingWorkout}
        onSave={handleLogWorkout}
      />

      <DeleteConfirmModal 
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setWorkoutToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={handleQuickLog}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 flex items-center justify-center lg:hidden z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default FitnessPage;