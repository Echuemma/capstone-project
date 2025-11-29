import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Add this import at the top


import {
  Activity,
  TrendingUp,
  Target,
  Flame,
  Dumbbell,
  Apple,
  Award,
  Calendar,
  Clock,
  Heart,
  Zap,
  ChevronRight,
  Plus,
  CheckCircle,
  AlertCircle,
  Star,
  Trophy,
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const todayStats = {
    calories: 1847,
    calorieGoal: 2000,
    workouts: 1,
    workoutGoal: 1,
    steps: 8234,
    stepGoal: 10000,
    water: 6,
    waterGoal: 8
  };

  const weeklyProgress = {
    workoutsCompleted: 4,
    workoutGoal: 5,
    avgCalories: 1923,
    calorieGoal: 2000,
    totalWorkoutTime: 240,
    caloriesBurned: 1850
  };


  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return `${first}${last}`;
  };

  const userData = {
    name: user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || 'User',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: 'User',
    email: user?.email || '',
    initials: getInitials(user?.firstName, user?.lastName),
    height: user?.height || '0',
    weight: user?.weight || '0',
    heightUnit: user?.heightUnit || 'cm',
    weightUnit: user?.weightUnit || 'kg'
  };


  const recentActivity = [
    { id: 1, type: 'workout', title: 'Morning Strength Training', time: '2 hours ago', icon: Dumbbell, color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { id: 2, type: 'meal', title: 'Logged Lunch - Chicken Salad', time: '4 hours ago', icon: Apple, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 3, type: 'goal', title: 'Completed Daily Calorie Goal', time: '1 day ago', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 4, type: 'workout', title: 'Evening Cardio Session', time: '1 day ago', icon: Activity, color: 'text-blue-600', bgColor: 'bg-blue-50' }
  ];

  const activeGoals = [
    { id: 1, title: 'Lose 10 pounds', progress: 60, current: 6, target: 10, unit: 'lbs', color: 'bg-purple-500' },
    { id: 2, title: '30-day workout streak', progress: 40, current: 12, target: 30, unit: 'days', color: 'bg-yellow-500' },
    { id: 3, title: 'Hit 2000 calories daily', progress: 85, current: 17, target: 20, unit: 'days', color: 'bg-orange-500' }
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', icon: '🔥', unlocked: true },
    { id: 2, title: 'Early Bird', icon: '🌅', unlocked: true },
    { id: 3, title: 'Consistency King', icon: '👑', unlocked: false },
    { id: 4, title: 'Macro Master', icon: '🎯', unlocked: true }
  ];

  const upcomingWorkouts = [
    { id: 1, name: 'Leg Day', time: 'Today at 6:00 PM', type: 'Strength' },
    { id: 2, name: 'Morning Run', time: 'Tomorrow at 7:00 AM', type: 'Cardio' },
    { id: 3, name: 'Upper Body', time: 'Friday at 5:00 PM', type: 'Strength' }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyActivity = [
    { day: 'Mon', workouts: 1, calories: 1950, active: true },
    { day: 'Tue', workouts: 2, calories: 2100, active: true },
    { day: 'Wed', workouts: 0, calories: 1800, active: false },
    { day: 'Thu', workouts: 1, calories: 1900, active: true },
    { day: 'Fri', workouts: 0, calories: 0, active: false },
    { day: 'Sat', workouts: 0, calories: 0, active: false },
    { day: 'Sun', workouts: 0, calories: 0, active: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-blue-600">{userData.name}</span>! 👋
          </h3>
          <p className="text-gray-600 mt-1">Here's your health overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-10 h-10" />
            <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {Math.round((todayStats.calories / todayStats.calorieGoal) * 100)}%
            </span>
          </div>
          <p className="text-white text-opacity-90 text-sm mb-1">Calories Today</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayStats.calories}</p>
            <span className="text-lg text-white text-opacity-75">/ {todayStats.calorieGoal}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dumbbell className="w-10 h-10" />
            <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {todayStats.workouts}/{todayStats.workoutGoal}
            </span>
          </div>
          <p className="text-white text-opacity-90 text-sm mb-1">Workouts Done</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayStats.workouts}</p>
            <span className="text-lg text-white text-opacity-75">today</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-10 h-10" />
            <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {Math.round((todayStats.steps / todayStats.stepGoal) * 100)}%
            </span>
          </div>
          <p className="text-white text-opacity-90 text-sm mb-1">Steps Taken</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayStats.steps.toLocaleString()}</p>
            <span className="text-lg text-white text-opacity-75">/ {todayStats.stepGoal.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">💧</div>
            <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {todayStats.water}/{todayStats.waterGoal}
            </span>
          </div>
          <p className="text-white text-opacity-90 text-sm mb-1">Water Intake</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayStats.water}</p>
            <span className="text-lg text-white text-opacity-75">glasses</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Dumbbell className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.workoutsCompleted}</p>
                <p className="text-xs text-gray-600">of {weeklyProgress.workoutGoal} workouts</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.avgCalories}</p>
                <p className="text-xs text-gray-600">avg calories</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.totalWorkoutTime}</p>
                <p className="text-xs text-gray-600">total minutes</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{weeklyProgress.caloriesBurned}</p>
                <p className="text-xs text-gray-600">cal burned</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">This Week's Activity</p>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`h-24 rounded-lg mb-2 transition-all cursor-pointer ${day.active
                      ? 'bg-teal-500 hover:bg-teal-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                      }`} style={{
                        height: day.workouts > 0 ? `${40 + (day.workouts * 30)}px` : '40px'
                      }}>
                      {day.workouts > 0 && (
                        <div className="text-white text-xs font-bold pt-2">{day.workouts}</div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-600">{day.day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <div key={goal.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <span className="text-sm font-semibold text-teal-600">{Math.round(goal.progress)}%</span>
                  </div>
                  <div className="relative w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`${goal.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{goal.current} {goal.unit}</span>
                    <span>Target: {goal.target} {goal.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`${activity.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard/fitness')}
                className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Log Workout
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/dashboard/nutrition')}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  Log Meal
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/dashboard/goals')}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Create Goal
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg text-center transition-all ${achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200'
                    : 'bg-gray-100 border-2 border-gray-200 opacity-60'
                    }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className={`text-xs font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                    {achievement.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Workouts</h3>
            <div className="space-y-3">
              {upcomingWorkouts.map((workout) => (
                <div key={workout.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{workout.name}</p>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
                      {workout.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{workout.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl p-6 text-white">
            <Star className="w-10 h-10 mb-4 fill-current" />
            <h3 className="text-xl font-bold mb-2">Keep Going! 💪</h3>
            <p className="text-white text-opacity-90 text-sm mb-4">
              You're doing great! You've logged {weeklyProgress.workoutsCompleted} workouts this week.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Stay consistent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;