// src/modals/FoodLogModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Flame } from 'lucide-react';
import { mealTypes } from '../data/nutrition/mealTypes';
import { calculateServingValues, getCurrentTime, getTodayDate } from '../utils/nutritionUtils';

function FoodLogModal({ show, onClose, selectedFood, onSave, editingMeal = null }) {
  const [servingSize, setServingSize] = useState(1);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [time, setTime] = useState(getCurrentTime());
  const [date, setDate] = useState(getTodayDate());
  const [notes, setNotes] = useState('');

  // Initialize form when modal opens or editing meal changes
  useEffect(() => {
    if (show) {
      if (editingMeal) {
        // Populate form with existing meal data
        setServingSize(editingMeal.servingSize || 1);
        setSelectedMealType(editingMeal.mealType || 'breakfast');
        setTime(editingMeal.time || getCurrentTime());
        setDate(editingMeal.date || getTodayDate());
        setNotes(editingMeal.notes || '');
      } else {
        // Reset to defaults for new meal
        setServingSize(1);
        setSelectedMealType('breakfast');
        setTime(getCurrentTime());
        setDate(getTodayDate());
        setNotes('');
      }
    }
  }, [show, editingMeal]);

  if (!show || !selectedFood) return null;

  // Calculate nutrition values based on serving size
  const nutritionValues = calculateServingValues(selectedFood, servingSize);

  const handleSubmit = () => {
    const mealData = {
      name: selectedFood.name,
      calories: nutritionValues.calories,
      protein: nutritionValues.protein,
      carbs: nutritionValues.carbs,
      fats: nutritionValues.fats,
      servingSize: `${servingSize} × ${selectedFood.serving}`,
      mealType: selectedMealType,
      time,
      date,
      notes,
      image: selectedFood.image,
      category: selectedFood.category
    };

    onSave(mealData);
  };

  const handleServingChange = (change) => {
    setServingSize(Math.max(0.25, servingSize + change));
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}
      onClick={onClose}
    >
      <div className="bg-white rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {editingMeal ? 'Edit Meal' : 'Log Food'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Food Info */}
          <div className="text-center">
            <div className="text-6xl mb-3">{selectedFood.image || '🍽️'}</div>
            <h4 className="font-semibold text-gray-900 text-lg mb-2">{selectedFood.name}</h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
              <span>{selectedFood.category}</span>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <h5 className="font-semibold text-gray-900 mb-3">Nutrition Facts (per serving)</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-sm text-gray-600">Calories</span>
                <span className="font-semibold text-gray-900">{nutritionValues.calories}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-sm text-gray-600">Protein</span>
                <span className="font-semibold text-blue-600">{nutritionValues.protein}g</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-sm text-gray-600">Carbs</span>
                <span className="font-semibold text-green-600">{nutritionValues.carbs}g</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <span className="text-sm text-gray-600">Fats</span>
                <span className="font-semibold text-yellow-600">{nutritionValues.fats}g</span>
              </div>
            </div>
          </div>

          {/* Serving Size */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Serving Size</label>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleServingChange(-0.25)}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-bold text-gray-700 transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center">
                <input 
                  type="number"
                  step="0.25"
                  value={servingSize}
                  onChange={(e) => setServingSize(Math.max(0.25, parseFloat(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center font-semibold"
                />
                <p className="text-xs text-gray-500 mt-1">{selectedFood.serving}</p>
              </div>
              <button 
                onClick={() => handleServingChange(0.25)}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-bold text-gray-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Meal Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Add to Meal</label>
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((meal) => {
                const Icon = meal.icon;
                return (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMealType(meal.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedMealType === meal.id
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${selectedMealType === meal.id ? 'text-teal-600' : 'text-gray-600'}`} />
                    <p className={`text-xs font-medium ${selectedMealType === meal.id ? 'text-teal-900' : 'text-gray-700'}`}>
                      {meal.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Time</label>
            <input 
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this meal..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              {editingMeal ? 'Update' : 'Add Food'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodLogModal;