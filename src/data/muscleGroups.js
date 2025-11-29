// src/data/muscleGroups.js
export const muscleGroupDistribution = [
  { 
    id: 1,
    muscle: "Chest", 
    workouts: 8, 
    color: "bg-blue-500",
    exercises: ["Push-ups", "Bench Press"]
  },
  { 
    id: 2,
    muscle: "Back", 
    workouts: 7, 
    color: "bg-green-500",
    exercises: ["Pull-ups"]
  },
  { 
    id: 3,
    muscle: "Legs", 
    workouts: 6, 
    color: "bg-purple-500",
    exercises: ["Squats", "Lunges"]
  },
  { 
    id: 4,
    muscle: "Shoulders", 
    workouts: 5, 
    color: "bg-yellow-500",
    exercises: []
  },
  { 
    id: 5,
    muscle: "Arms", 
    workouts: 4, 
    color: "bg-red-500",
    exercises: ["Bicep Curls"]
  }
];

export const muscleGroupsList = [
  'all', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 
  'Abs', 'Glutes', 'Calves', 'Forearms'
];