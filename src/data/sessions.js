// src/data/sessions.js
export const workoutSessions = [
  {
    id: 1,
    name: "Push Day Workout",
    date: "2025-11-06",
    time: "9:00 AM",
    duration: 45,
    calories: 320,
    exercises: 6,
    sets: 18,
    muscleGroups: ["Chest", "Shoulders"],
    workoutIds: [1, 2, 3]
  },
  {
    id: 2,
    name: "Leg Day Workout",
    date: "2025-11-05",
    time: "10:00 AM",
    duration: 60,
    calories: 450,
    exercises: 7,    
    sets: 21,
    muscleGroups: ["Legs"],
    workoutIds: [2]
  },
  {
    id: 3,
    name: "Pull Day Workout",
    date: "2025-11-04",
    time: "8:30 AM",
    duration: 50,
    calories: 380,
    exercises: 5,
    sets: 15,
    muscleGroups: ["Back", "Biceps"],
    workoutIds: []
  }
];