import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar,
  Award,
  Flame,
  Dumbbell,
  Scale,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  RefreshCw,
  ChevronRight,
  Star,
  Trophy,
  Activity,
  Clock,
  X,
  AlertCircle
} from 'lucide-react';

// Mock data for goals
const initialGoals = [
  {
    id: 1,
    title: 'Lose 10 pounds',
    type: 'weight',
    target: 160,
    current: 170,
    unit: 'lbs',
    startValue: 180,
    deadline: '2025-12-31',
    createdAt: '2025-01-01',
    status: 'in-progress',
    category: 'weight'
  },
  {
    id: 2,
    title: 'Hit 2000 calories daily',
    type: 'calorie',
    target: 2000,
    current: 1850,
    unit: 'cal',
    startValue: 0,
    deadline: '2025-12-31',
    createdAt: '2025-01-15',
    status: 'in-progress',
    category: 'nutrition'
  },
  {
    id: 3,
    title: 'Workout 5 times per week',
    type: 'workout',
    target: 20,
    current: 12,
    unit: 'workouts',
    startValue: 0,
    deadline: '2025-02-28',
    createdAt: '2025-01-01',
    status: 'in-progress',
    category: 'fitness'
  },
  {
    id: 4,
    title: '30-day workout streak',
    type: 'streak',
    target: 30,
    current: 12,
    unit: 'days',
    startValue: 0,
    deadline: '2025-03-15',
    createdAt: '2025-01-15',
    status: 'in-progress',
    category: 'fitness'
  }
];

// Goal type configurations
const goalTypes = [
  { 
    id: 'weight', 
    label: 'Weight Goal', 
    icon: Scale, 
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    description: 'Track your weight loss or gain journey'
  },
  { 
    id: 'calorie', 
    label: 'Calorie Goal', 
    icon: Flame, 
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    description: 'Meet your daily calorie targets'
  },
  { 
    id: 'workout', 
    label: 'Workout Goal', 
    icon: Dumbbell, 
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    description: 'Complete a specific number of workouts'
  },
  { 
    id: 'streak', 
    label: 'Streak Goal', 
    icon: Award, 
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    description: 'Build consistency with daily streaks'
  }
];

// Goal Form Modal Component
function GoalFormModal({ show, onClose, editingGoal, onSave }) {
  const [formData, setFormData] = useState({
    title: editingGoal?.title || '',
    type: editingGoal?.type || 'weight',
    target: editingGoal?.target || '',
    current: editingGoal?.current || '',
    deadline: editingGoal?.deadline || '',
    category: editingGoal?.category || 'weight'
  });

  React.useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        type: editingGoal.type,
        target: editingGoal.target,
        current: editingGoal.current,
        deadline: editingGoal.deadline,
        category: editingGoal.category
      });
    } else {
      setFormData({
        title: '',
        type: 'weight',
        target: '',
        current: '',
        deadline: '',
        category: 'weight'
      });
    }
  }, [editingGoal, show]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getUnitForType = (type) => {
    const units = {
      weight: 'lbs',
      calorie: 'cal',
      workout: 'workouts',
      streak: 'days'
    };
    return units[type] || '';
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.target || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    const goalData = {
      ...formData,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current) || 0,
      unit: getUnitForType(formData.type),
      startValue: editingGoal ? editingGoal.startValue : (parseFloat(formData.current) || 0)
    };

    onSave(goalData);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingGoal ? 'Edit Goal' : 'Create New Goal'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Goal Type Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Goal Type</label>
            <div className="grid grid-cols-2 gap-3">
              {goalTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      handleFormChange('type', type.id);
                      handleFormChange('category', type.id === 'calorie' ? 'nutrition' : type.id === 'weight' ? 'weight' : 'fitness');
                    }}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.type === type.id
                        ? `${type.color} border-transparent text-white`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${formData.type === type.id ? 'text-white' : type.textColor}`} />
                    <p className={`font-semibold mb-1 ${formData.type === type.id ? 'text-white' : 'text-gray-900'}`}>
                      {type.label}
                    </p>
                    <p className={`text-xs ${formData.type === type.id ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                      {type.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Goal Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="e.g., Lose 10 pounds"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Target and Current Values */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Target Value *</label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => handleFormChange('target', e.target.value)}
                placeholder="e.g., 160"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{getUnitForType(formData.type)}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Value</label>
              <input
                type="number"
                value={formData.current}
                onChange={(e) => handleFormChange('current', e.target.value)}
                placeholder="e.g., 170"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{getUnitForType(formData.type)}</p>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Deadline *</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleFormChange('deadline', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">Goal Setting Tips</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Make your goals specific and measurable</li>
                <li>• Set realistic deadlines</li>
                <li>• Break large goals into smaller milestones</li>
                <li>• Review and adjust regularly</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
          >
            {editingGoal ? 'Update Goal' : 'Create Goal'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal Component
function DeleteConfirmModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh' }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Goal</h3>
            <p className="text-sm text-gray-600">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this goal? All progress data will be permanently removed.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
          >
            Delete Goal
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Calculate statistics
  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'in-progress').length,
    completed: goals.filter(g => g.status === 'completed').length,
    completion: Math.round((goals.filter(g => g.status === 'completed').length / goals.length) * 100) || 0
  };

  // Handle goal save (create or update)
  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...g, ...goalData } : g));
    } else {
      const newGoal = {
        ...goalData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'in-progress'
      };
      setGoals([...goals, newGoal]);
    }
    setShowCreateModal(false);
    setEditingGoal(null);
  };

  // Handle edit
  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowCreateModal(true);
  };

  // Handle delete initiation
  const handleDeleteGoal = (goal) => {
    setGoalToDelete(goal);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setGoals(goals.filter(g => g.id !== goalToDelete.id));
    setShowDeleteConfirm(false);
    setGoalToDelete(null);
  };

  // Calculate progress percentage
  const calculateProgress = (goal) => {
    if (goal.type === 'weight') {
      const totalChange = Math.abs(goal.startValue - goal.target);
      const currentChange = Math.abs(goal.startValue - goal.current);
      return Math.min((currentChange / totalChange) * 100, 100);
    }
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  // Filter goals
  const filteredGoals = activeFilter === 'all' 
    ? goals 
    : goals.filter(g => g.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
          <p className="text-gray-600 mt-1">Set targets and track your progress</p>
        </div>
        <button 
          onClick={() => {
            setEditingGoal(null);
            setShowCreateModal(true);
          }}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Goal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-10 h-10 text-teal-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Goals</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
          <p className="text-sm text-gray-600">Active Goals</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.completion}%</p>
          <p className="text-sm text-gray-600">Success Rate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'all'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Goals
        </button>
        <button
          onClick={() => setActiveFilter('weight')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'weight'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Scale className="w-4 h-4 inline mr-2" />
          Weight
        </button>
        <button
          onClick={() => setActiveFilter('nutrition')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'nutrition'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Flame className="w-4 h-4 inline mr-2" />
          Nutrition
        </button>
        <button
          onClick={() => setActiveFilter('fitness')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeFilter === 'fitness'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Dumbbell className="w-4 h-4 inline mr-2" />
          Fitness
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => {
            const goalType = goalTypes.find(t => t.id === goal.type);
            const Icon = goalType?.icon || Target;
            const progress = calculateProgress(goal);
            const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div 
                key={goal.id} 
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-teal-600 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`${goalType?.lightColor} p-3 rounded-xl`}>
                      <Icon className={`w-6 h-6 ${goalType?.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{goal.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        {daysLeft > 0 && (
                          <>
                            <span>•</span>
                            <span className={daysLeft < 7 ? 'text-red-600 font-medium' : ''}>
                              {daysLeft} days left
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditGoal(goal)}
                      className="p-2 text-gray-400 hover:text-teal-600 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Edit goal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteGoal(goal)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Delete goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{goal.current}</p>
                      <p className="text-sm text-gray-600">of {goal.target} {goal.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-600">{Math.round(progress)}%</p>
                      <p className="text-sm text-gray-600">Complete</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full ${goalType?.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Start</p>
                    <p className="font-semibold text-gray-900">{goal.startValue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Current</p>
                    <p className="font-semibold text-teal-600">{goal.current}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Target</p>
                    <p className="font-semibold text-gray-900">{goal.target}</p>
                  </div>
                </div>

                {/* Milestone indicator */}
                {progress >= 50 && progress < 100 && (
                  <div className="mt-4 p-3 bg-teal-50 rounded-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-teal-600 fill-current" />
                    <p className="text-sm text-teal-700 font-medium">Halfway there! Keep pushing!</p>
                  </div>
                )}
                {progress >= 100 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-green-600 fill-current" />
                    <p className="text-sm text-green-700 font-medium">Goal achieved! Congratulations! 🎉</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No goals found in this category</p>
            <button 
              onClick={() => {
                setEditingGoal(null);
                setShowCreateModal(true);
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      {/* Motivational Section */}
      <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Stay Focused on Your Goals</h3>
            <p className="text-teal-100 mb-4">Consistency is the key to success. Review your progress regularly.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Track daily</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Stay motivated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Celebrate wins</span>
              </div>
            </div>
          </div>
          <Trophy className="w-24 h-24 text-white opacity-20" />
        </div>
      </div>

      {/* Modals */}
      <GoalFormModal 
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingGoal(null);
        }}
        editingGoal={editingGoal}
        onSave={handleSaveGoal}
      />

      <DeleteConfirmModal 
        show={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setGoalToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => {
          setEditingGoal(null);
          setShowCreateModal(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 flex items-center justify-center lg:hidden z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default GoalsPage;