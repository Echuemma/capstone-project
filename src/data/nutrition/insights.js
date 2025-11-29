import { Award, Target, TrendingUp } from 'lucide-react';

export const nutritionInsights = [
  {
    id: 1,
    title: 'Great Protein Intake!',
    description: 'You\'ve hit 86% of your protein goal',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 2,
    title: 'Stay Hydrated',
    description: '2 more glasses to reach your water goal',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 3,
    title: 'Calorie Deficit',
    description: '353 calories remaining for today',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

// Function to generate dynamic insights based on current stats
export const generateInsights = (currentStats, goals) => {
  const insights = [];
  
  // Protein insight
  const proteinPercentage = (currentStats.protein / goals.protein) * 100;
  if (proteinPercentage >= 80) {
    insights.push({
      id: 'protein',
      title: 'Great Protein Intake!',
      description: `You've hit ${Math.round(proteinPercentage)}% of your protein goal`,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    });
  } else if (proteinPercentage < 50) {
    insights.push({
      id: 'protein',
      title: 'Boost Your Protein',
      description: `Add ${Math.round(goals.protein - currentStats.protein)}g more protein today`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    });
  }
  
  // Water insight
  const waterRemaining = goals.water - currentStats.water;
  if (waterRemaining > 0) {
    insights.push({
      id: 'water',
      title: 'Stay Hydrated',
      description: `${waterRemaining} more ${waterRemaining === 1 ? 'glass' : 'glasses'} to reach your water goal`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    });
  }
  
  // Calorie insight
  const caloriesRemaining = goals.calories - currentStats.calories;
  if (caloriesRemaining > 0) {
    insights.push({
      id: 'calories',
      title: caloriesRemaining > 500 ? 'Fuel Up!' : 'Almost There!',
      description: `${caloriesRemaining} calories remaining for today`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    });
  } else if (caloriesRemaining < 0) {
    insights.push({
      id: 'calories',
      title: 'Over Goal',
      description: `You're ${Math.abs(caloriesRemaining)} calories over your daily target`,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    });
  }
  
  const carbsPercentage = (currentStats.carbs / goals.carbs) * 100;
  const fatsPercentage = (currentStats.fats / goals.fats) * 100;
  
  if (
    proteinPercentage >= 90 && proteinPercentage <= 110 &&
    carbsPercentage >= 90 && carbsPercentage <= 110 &&
    fatsPercentage >= 90 && fatsPercentage <= 110
  ) {
    insights.push({
      id: 'balance',
      title: 'Perfect Balance!',
      description: 'Your macros are perfectly balanced today',
      icon: Award,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    });
  }
  
  return insights.slice(0, 3); 
};