import React, { useState } from 'react';
import { 
  Apple, 
  Search, 
  Plus, 
  Flame, 
  TrendingUp,
  Clock,
  Target,
  Award,
  ChevronRight,
  Edit2,
  Trash2,
  Heart,
  Calendar,
  PieChart,
  Utensils,
  ChevronLeft,
  Star,
  BookmarkPlus,
  Camera,
  Sparkles,
  X,
  RefreshCw
} from 'lucide-react';
import { useNutritionData } from '../../hooks/useNutritionData';
import FoodLogModal from '/src/modals/FoodLogModal';
import { mealTypes } from '../../data/nutrition/mealTypes';
import { weeklyCaloriesData, nutritionScore, weeklyMacroTrends } from '../../data/nutrition/nutritionStats';
import { topLoggedFoods, recentFoods } from '../../data/nutrition/meals';
import { formatShortDate, calculateMacroPercentages } from '../../utils/nutritionUtils';

function NutritionPage() {
  const {
    todayMeals,
    foods,
    favorites,
    history,
    todayStats,
    progressStats,
    mealTypeCalories,
    dailyGoals,
    insights,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    showFavoritesOnly,
    setShowFavoritesOnly,
    selectedDate,
    addMeal,
    updateMeal,
    deleteMeal,
    toggleFavorite,
    incrementWater,
    decrementWater,
    changeDate,
    resetData
  } = useNutritionData();

  const [activeTab, setActiveTab] = useState('today');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);

  const macroDistribution = calculateMacroPercentages(
    todayStats.protein,
    todayStats.carbs,
    todayStats.fats
  );

  const handleSaveMeal = async (mealData) => {
    const result = editingMeal 
      ? await updateMeal(editingMeal.id, mealData)
      : await addMeal(mealData);
    
    if (result.success) {
      setShowLogModal(false);
      setEditingMeal(null);
      setSelectedFood(null);
    } else {
      alert('Failed to save meal. Please try again.');
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setSelectedFood({
      name: meal.name,
      category: meal.category,
      image: meal.image,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      serving: meal.servingSize
    });
    setShowLogModal(true);
  };

  const handleDeleteMeal = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      const result = await deleteMeal(id);
      if (!result.success) {
        alert('Failed to delete meal. Please try again.');
      }
    }
  };

  const handleToggleFavorite = async (foodId) => {
    await toggleFavorite(foodId);
  };

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all nutrition data? This cannot be undone.')) {
      const result = await resetData();
      if (result.success) {
        alert('Data has been reset successfully!');
      } else {
        alert('Failed to reset data. Please try again.');
      }
    }
  };

  const handleDateChange = (direction) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + direction);
    changeDate(currentDate.toISOString().split('T')[0]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Apple className="w-16 h-16 text-teal-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading your nutrition data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FoodLogModal
        show={showLogModal}
        onClose={() => {
          setShowLogModal(false);
          setEditingMeal(null);
          setSelectedFood(null);
        }}
        selectedFood={selectedFood}
        editingMeal={editingMeal}
        onSave={handleSaveMeal}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nutrition Tracker</h1>
          <p className="text-gray-600 mt-1">Track your meals and reach your goals</p>
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
            onClick={() => setActiveTab('search')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Log Food
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-teal-100 text-sm font-medium mb-1">Daily Calories</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-bold">{todayStats.calories}</h2>
                <span className="text-2xl text-teal-100">/ {dailyGoals.calories}</span>
              </div>
              <p className="text-teal-100 mt-2">{progressStats.calories.remaining} calories remaining</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <Flame className="w-8 h-8" />
            </div>
          </div>
          
          <div className="relative w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progressStats.calories.percentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-teal-100 text-xs mb-1">Protein</p>
              <p className="text-2xl font-bold">{todayStats.protein}g</p>
              <p className="text-teal-100 text-xs">{dailyGoals.protein}g goal</p>
            </div>
            <div>
              <p className="text-teal-100 text-xs mb-1">Carbs</p>
              <p className="text-2xl font-bold">{todayStats.carbs}g</p>
              <p className="text-teal-100 text-xs">{dailyGoals.carbs}g goal</p>
            </div>
            <div>
              <p className="text-teal-100 text-xs mb-1">Fats</p>
              <p className="text-2xl font-bold">{todayStats.fats}g</p>
              <p className="text-teal-100 text-xs">{dailyGoals.fats}g goal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-gray-600" />
            Macro Split
          </h3>
          
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-gray-900 mb-2">{todayStats.calories}</p>
            <p className="text-sm text-gray-600">calories today</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700">Protein</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">{todayStats.protein}g</span>
                <span className="text-xs text-gray-500 ml-1">({macroDistribution.protein}%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">Carbs</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">{todayStats.carbs}g</span>
                <span className="text-xs text-gray-500 ml-1">({macroDistribution.carbs}%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-700">Fats</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">{todayStats.fats}g</span>
                <span className="text-xs text-gray-500 ml-1">({macroDistribution.fats}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className={`${insight.bgColor} rounded-xl p-4 border border-gray-200`}>
              <div className="flex items-start gap-3">
                <div className={`${insight.color} p-2 rounded-lg bg-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['today', 'search', 'history', 'analytics'].map((tab) => (
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
          {activeTab === 'today' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDateChange(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatShortDate(selectedDate)}
                  </div>
                  <button 
                    onClick={() => handleDateChange(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {mealTypes.map((mealType) => {
                const Icon = mealType.icon;
                const meals = todayMeals[mealType.id];
                const totalCalories = meals.reduce((sum, food) => sum + food.calories, 0);

                return (
                  <div key={mealType.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className={`${mealType.color} bg-opacity-10 p-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className={`${mealType.color} bg-opacity-20 p-2 rounded-lg`}>
                          <Icon className={`w-5 h-5 ${mealType.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{mealType.name}</h4>
                          <p className="text-sm text-gray-600">{mealType.time} • {totalCalories} calories</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveTab('search');
                        }}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Food
                      </button>
                    </div>

                    {meals.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {meals.map((food) => (
                          <div key={food.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{food.image}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold text-gray-900">{food.name}</h5>
                                  <span className="text-sm text-gray-500">{food.time}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Flame className="w-4 h-4" />
                                    {food.calories} cal
                                  </span>
                                  <span>P: {food.protein}g</span>
                                  <span>C: {food.carbs}g</span>
                                  <span>F: {food.fats}g</span>
                                  <span className="text-gray-400">•</span>
                                  <span>{food.servingSize}</span>
                                </div>
                                {food.notes && (
                                  <p className="text-sm text-gray-500 mt-2 italic">"{food.notes}"</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleEditMeal(food)}
                                  className="p-2 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-white"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMeal(food.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm">No foods logged for {mealType.name.toLowerCase()}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search foods... (e.g., chicken breast, avocado)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    showFavoritesOnly 
                      ? 'bg-teal-100 text-teal-700 border-2 border-teal-600' 
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                  Favorites
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Popular
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foods.map((food) => (
                  <div 
                    key={food.id} 
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-600 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{food.name}</h4>
                          <button 
                            onClick={() => handleToggleFavorite(food.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(food.id) ? 'fill-current text-red-500' : ''}`} />
                          </button>
                        </div>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium mb-3">
                          {food.category}
                        </span>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Cal</p>
                            <p className="font-semibold text-gray-900 text-sm">{food.calories}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">P</p>
                            <p className="font-semibold text-blue-600 text-sm">{food.protein}g</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">C</p>
                            <p className="font-semibold text-green-600 text-sm">{food.carbs}g</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">F</p>
                            <p className="font-semibold text-yellow-600 text-sm">{food.fats}g</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-600">{food.serving}</span>
                      <button 
                        onClick={() => {
                          setSelectedFood(food);
                          setEditingMeal(null);
                          setShowLogModal(true);
                        }}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm flex items-center gap-2 group-hover:shadow-md transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Nutrition History</h3>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Calorie Intake</h4>
                <div className="h-64 flex items-end justify-between gap-2">
                  {weeklyCaloriesData.map((day, index) => {
                    const percentage = (day.calories / day.target) * 100;
                    const isOverTarget = percentage > 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center h-full">
                        <div className="w-full relative mt-auto" style={{ height: `${Math.min(percentage, 100)}%` }}>
                          <div className={`w-full h-full rounded-t-lg transition-all cursor-pointer group ${
                            isOverTarget ? 'bg-gradient-to-t from-red-500 to-red-400' : 'bg-gradient-to-t from-teal-600 to-teal-400'
                          } hover:opacity-80`}>
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              <div>{day.calories} cal</div>
                              <div className="text-gray-300">{day.target} goal</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 font-medium">{day.day}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Recent Days</h4>
                {history.slice(0, 7).map((day, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{formatShortDate(day.date)}</h5>
                        <p className="text-sm text-gray-600">{day.meals} foods logged</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{day.calories}</p>
                        <p className="text-sm text-gray-600">calories</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Protein</p>
                        <p className="font-semibold text-blue-600">{day.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Carbs</p>
                        <p className="font-semibold text-green-600">{day.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Fats</p>
                        <p className="font-semibold text-yellow-600">{day.fats}g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Nutrition Analytics</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                  <Award className="w-10 h-10 text-teal-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Target className="w-10 h-10 text-blue-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-600">Goal Hit Rate</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">2,087</p>
                  <p className="text-sm text-gray-600">Avg Daily Cal</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <Utensils className="w-10 h-10 text-orange-600 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">248</p>
                  <p className="text-sm text-gray-600">Foods Logged</p>
                </div>
              </div>

              {/* Meal Distribution */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Calorie Distribution by Meal</h4>
                <div className="space-y-4">
                  {Object.entries(mealTypeCalories).map(([mealType, calories], index) => {
                    const total = Object.values(mealTypeCalories).reduce((sum, cal) => sum + cal, 0);
                    const percentage = total > 0 ? (calories / total) * 100 : 0;
                    
                    return (
                      <div key={mealType}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">{mealType}</span>
                          <span className="text-sm text-gray-600">{calories} cal ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              mealType === 'breakfast' ? 'bg-orange-500' :
                              mealType === 'lunch' ? 'bg-yellow-500' :
                              mealType === 'dinner' ? 'bg-indigo-500' :
                              'bg-pink-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Macro Trends */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Macro Trends</h4>
                <div className="space-y-6">
                  {weeklyMacroTrends.map((macro, index) => {
                    const percentage = (macro.current / macro.target) * 100;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">{macro.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              macro.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {macro.trend}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{macro.current}g / {macro.target}g</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 bg-${macro.color}-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Foods */}
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Most Logged Foods</h4>
                <div className="space-y-3">
                  {topLoggedFoods.map((food, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-xl">
                          {food.emoji}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{food.name}</p>
                          <p className="text-xs text-gray-600">{food.count} times • {food.calories} total cal</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-teal-600">
                        <BookmarkPlus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Score */}
              <div className="p-6 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-teal-100 text-sm font-medium mb-1">Nutrition Score</p>
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-6xl font-bold">{nutritionScore.total}</h2>
                      <span className="text-3xl text-teal-100">/ 100</span>
                    </div>
                    <p className="text-teal-100 mt-2">Excellent! Keep up the great work</p>
                  </div>
                  <div className="p-4 bg-white bg-opacity-20 rounded-xl">
                    <Star className="w-10 h-10 fill-current" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-teal-100 text-xs mb-1">Balance</p>
                    <p className="text-2xl font-bold">{nutritionScore.balance}</p>
                  </div>
                  <div>
                    <p className="text-teal-100 text-xs mb-1">Consistency</p>
                    <p className="text-2xl font-bold">{nutritionScore.consistency}</p>
                  </div>
                  <div>
                    <p className="text-teal-100 text-xs mb-1">Variety</p>
                    <p className="text-2xl font-bold">{nutritionScore.variety}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setActiveTab('search')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 flex items-center justify-center lg:hidden z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default NutritionPage;