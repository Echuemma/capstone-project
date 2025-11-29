import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../store/slices/authSlice';
import {
  Home,
  Target,
  Calendar,
  Award,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get user data from Redux
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'goals', label: 'My goals', icon: Target, path: '/dashboard/goals' },
    { id: 'fitness', label: 'Fitness', icon: Calendar, path: '/dashboard/fitness' },
    { id: 'nutrition', label: 'Nutrition', icon: Award, path: '/dashboard/nutrition' },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp, path: '/dashboard/statistics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return `${first}${last}`;
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-red-500',
    ];
    
    const charSum = name?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
    return colors[charSum % colors.length];
  };

  // Prepare user data with fallbacks
  const userData = {
    name: user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.email || 'User',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: 'User', // You can add age/gender to your Firebase data later
    email: user?.email || '',
    initials: getInitials(user?.firstName, user?.lastName),
    avatarColor: getAvatarColor(user?.firstName || user?.email || 'User'),
    height: user?.height || '0',
    weight: user?.weight || '0',
    heightUnit: user?.heightUnit || 'cm',
    weightUnit: user?.weightUnit || 'kg'
  };

  // Determine active nav based on current path
  const getActiveNav = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.id : 'home';
  };

  // Get current date information
  const getCurrentDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return {
      formatted: `${dayName}, ${getOrdinal(day)} ${month}, ${year}`,
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: year
    };
  };

  const currentDate = getCurrentDate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 2000,
    });
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-50
          fixed lg:relative inset-y-0 left-0
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {isSidebarOpen ? (
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-center gap-0 flex-1">
                  {/* Avatar with Initials - Centered */}
                  <div className={`w-16 h-16 rounded-full ${userData.avatarColor} flex items-center justify-center text-white font-semibold text-xl`}>
                    {userData.initials}
                  </div>
                  {/* Name and Email - Centered and Stacked */}
                  <div className="text-center w-full px-2">
                    <h3 className="font-semibold text-gray-900 text-base truncate">{userData.name}</h3>
                    <p className="text-xs text-gray-500 truncate" title={userData.email}>{userData.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Height</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {userData.height} <span className="text-sm text-gray-500">{userData.heightUnit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Weight</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {userData.weight} <span className="text-sm text-gray-500">{userData.weightUnit}</span>
                  </p>
                </div>
              </div> */}
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`w-10 h-10 rounded-full ${userData.avatarColor} flex items-center justify-center hover:opacity-90 transition-opacity text-white font-semibold`}
                title="Expand sidebar"
              >
                {userData.initials || <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = getActiveNav() === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">
                  TRACK <span className="font-normal">FITNESS</span>
                </h1>
              </div>

              <div className="hidden md:flex items-center gap-4 ml-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-teal-500 font-medium">DAY 2, WEEK 6</p>
                    <p className="text-sm text-gray-900 font-medium">{currentDate.formatted}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 text-lg font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}