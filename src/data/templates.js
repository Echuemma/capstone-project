// src/data/templates.js
export const workoutTemplates = [
  {
    id: 1,
    name: "Push Day",
    exercises: 6,
    duration: "45-60 min",
    focus: "Chest, Shoulders, Triceps",
    exerciseList: [
      { exerciseId: 3, sets: 4, reps: 10 },
      { exerciseId: 1, sets: 3, reps: 12 },
      { exerciseId: 4, sets: 3, reps: 12 }
    ]
  },
  {
    id: 2,
    name: "Pull Day",
    exercises: 5,
    duration: "40-50 min",
    focus: "Back, Biceps",
    exerciseList: [
      { exerciseId: 5, sets: 4, reps: 8 },
      { exerciseId: 4, sets: 3, reps: 10 }
    ]
  },
  {
    id: 3,
    name: "Leg Day",
    exercises: 7,
    duration: "60-75 min",
    focus: "Quads, Hamstrings, Glutes",
    exerciseList: [
      { exerciseId: 2, sets: 4, reps: 12 },
      { exerciseId: 6, sets: 3, reps: 15 }
    ]
  },
  {
    id: 4,
    name: "Full Body",
    exercises: 8,
    duration: "50-65 min",
    focus: "All Major Muscle Groups",
    exerciseList: [
      { exerciseId: 1, sets: 3, reps: 12 },
      { exerciseId: 2, sets: 3, reps: 12 },
      { exerciseId: 3, sets: 3, reps: 10 },
      { exerciseId: 5, sets: 3, reps: 8 }
    ]
  }
];