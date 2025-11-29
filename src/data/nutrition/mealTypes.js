// src/data/nutrition/mealTypes.js
import { Coffee, Sun, Moon, Sandwich } from 'lucide-react';

export const mealTypes = [
  { 
    id: 'breakfast', 
    name: 'Breakfast', 
    icon: Coffee, 
    color: 'bg-orange-500', 
    time: '7:00 AM',
    description: 'Start your day right'
  },
  { 
    id: 'lunch', 
    name: 'Lunch', 
    icon: Sun, 
    color: 'bg-yellow-500', 
    time: '12:00 PM',
    description: 'Midday fuel'
  },
  { 
    id: 'dinner', 
    name: 'Dinner', 
    icon: Moon, 
    color: 'bg-indigo-500', 
    time: '6:00 PM',
    description: 'Evening meal'
  },
  { 
    id: 'snack', 
    name: 'Snacks', 
    icon: Sandwich, 
    color: 'bg-pink-500', 
    time: 'Anytime',
    description: 'Quick bites'
  }
];

export const getMealTypeById = (id) => {
  return mealTypes.find(meal => meal.id === id);
};

export const getMealTypeColor = (id) => {
  const meal = getMealTypeById(id);
  return meal ? meal.color : 'bg-gray-500';
};