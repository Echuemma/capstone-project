import React, { useState } from 'react';
import { X, Save, Trash2 } from 'lucide-react';

function WorkoutLogModal({ 
  show, 
  onClose, 
  selectedExercise, 
  editingWorkout, 
  onSave 
}) {
  const [sets, setSets] = useState(
    editingWorkout ? [{ reps: editingWorkout.reps, weight: 0 }] : [{ reps: 10, weight: 0 }]
  );
  const [notes, setNotes] = useState(editingWorkout?.notes || '');

  if (!show) return null;

  const handleSave = () => {
    const workoutData = {
      name: selectedExercise.name,
      muscleGroup: selectedExercise.muscleGroup,
      equipment: selectedExercise.equipment,
      sets: sets.length,
      reps: parseInt(sets[0].reps) || 10,
      caloriesBurned: sets.length * 40,
      duration: sets.length * 5,
      notes: notes
    };
    
    onSave(workoutData);
  };

  const handleAddSet = () => {
    setSets([...sets, { reps: 10, weight: 0 }]);
  };

  const handleUpdateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleRemoveSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}
      onClick={onClose}
    >
<div className="bg-white rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {editingWorkout ? 'Edit Workout' : 'Log Workout'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{selectedExercise?.name}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded">{selectedExercise?.muscleGroup}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{selectedExercise?.equipment}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Sets</label>
              <button 
                onClick={handleAddSet}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                + Add Set
              </button>
            </div>

            {sets.map((set, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Reps</label>
                  <input 
                    type="number"
                    value={set.reps}
                    onChange={(e) => handleUpdateSet(index, 'reps', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Weight (lbs)</label>
                  <input 
                    type="number"
                    value={set.weight}
                    onChange={(e) => handleUpdateSet(index, 'weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                {sets.length > 1 && (
                  <button 
                    onClick={() => handleRemoveSet(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Notes (Optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows="3"
              placeholder="How did it feel? Any modifications?"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editingWorkout ? 'Update' : 'Save'} Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutLogModal;