# Toulang Health Tracker - Comprehensive README

## Project Overview

vitaltracking Health Tracker (eHealth) is a comprehensive health and wellness management platform built with React and Vite. It enables users to track their fitness workouts, monitor nutrition intake, set and achieve health goals, and view detailed analytics about their wellness journey—all in one unified application.

Key Tagline: "Track Your Wellness Journey" - Monitor your health programs, nutrition goals, and wellness progress all in one place.

---

## Core Features

### Fitness Tracking
- Log workouts with exercise details (muscle groups, equipment, sets, reps)
- Track workout duration and calories burned
- Monitor workout streak and weekly progress
- View muscle group distribution analytics
- Personal records (PR) tracking
- Volume progression charts
- Exercise frequency analytics
- Quick start workout templates

### Nutrition Monitoring
- Log meals by category (breakfast, lunch, dinner, snacks)
- Track calories, protein, carbs, and fats (macronutrients)
- Daily nutrition goals and progress visualization
- Macro distribution percentages (protein, carbs, fats)
- Food search and favorites system
- Weekly nutrition history and trends
- Nutrition score calculation
- Water intake tracking
- Recent foods and top logged foods analytics
- Meal editing and deletion capabilities

### Goal Management
- Create health goals across multiple categories (weight, calorie, workout)
- Track goal progress with visual indicators
- Goal status management (in-progress, completed)
- Deadline tracking
- Filter goals by status
- Progress visualization
- Motivational goal tracking interface

### Dashboard & Analytics
- Daily statistics overview (calories, workouts, steps, water)
- Weekly progress tracking
- Workout streak calculations
- Upcoming workouts preview
- Quick action buttons for logging meals and workouts
- Performance metrics and trends
- Personalized insights and recommendations

### User Authentication
- User registration with email and password
- Firebase authentication integration
- User profile management
- Protected routes for authenticated users
- Login and registration pages

---

## Technology Stack

### Frontend Framework & Build Tool
- React 18 - UI library
- Vite - Fast build tool and dev server
- React Router v6 - Client-side routing

### Styling & UI
- Tailwind CSS - Utility-first CSS framework
- Lucide React - Icon library (400+ icons)
- AOS (Animate On Scroll) - Scroll animation library

### State Management & Data
- Redux - Global state management
- React Redux - Redux bindings for React

### Backend & Authentication
- Firebase - Backend-as-a-Service (BaaS)
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage

### Notifications
- React Toastify - Toast notification library

### Development Tools
- ESLint - Code linting
- npm - Package manager

---

## Project Structure

capstone-project/
  src/
    components/
      common/
        Navbar.jsx
        Footer.jsx
      layout/
        DashboardLayout.jsx
        AuthLayout.jsx
        PublicLayout.jsx
      ProtectedRoute.jsx
      dashboard/
      fitness/
      nutrition/
    pages/
      HomePage/
      LoginPage/
      RegisterPage/
      ContactPage/
      AboutUsPage/
      DashboardPage/
      FitnessPage/
      NutritionPage/
      GoalsPage/
    sections/
      HeroSection.jsx
      AboutSection.jsx
      ServicesSection.jsx
      ProcessSection.jsx
      TestimonialSection.jsx
      BlogSection.jsx
    hooks/
      useFitnessData.js
      useNutritionData.js
    modals/
      FoodLogModal.jsx
    data/
      workouts.js
      exercises.js
      nutrition/
        meals.js
        foods.js
        nutritionStats.js
        mealTypes.js
      muscleGroups.js
      equipment.js
    services/
    store/
      store.js
      slices/
        authSlice.js
    utils/
      api.js
      nutritionApi.js
      workoutUtils.js
      nutritionUtils.js
    contexts/
    App.jsx
    main.jsx
    firebase.js
    App.css
    index.css
  public/
    _redirects
    images/
  index.html
  netlify.toml
  vite.config.js
  package.json
  eslint.config.js
  .gitignore

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account (for backend services)

### Installation

1. Clone the repository
   git clone https://github.com/Echuemma/capstone-project.git
   cd capstone-project

2. Install dependencies
   npm install

3. Configure Firebase
   - Create a Firebase project at firebase.google.com
   - Update src/firebase.js with your Firebase credentials:
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

4. Start development server
   npm run dev
   The app will be available at http://localhost:5173

### Build for Production
npm run build

### Preview Production Build
npm run preview

---

## Available Routes

### Public Routes
/ - Home Page - Landing page with features overview
/about-us - About Us - Company information and team
/contact - Contact Page - Contact form and information
/login - Login - User authentication
/register - Register - New user registration

### Protected Routes (Requires Authentication)
/dashboard - Dashboard - Overview and quick stats
/dashboard/fitness - Fitness Tracker - Workout logging and analytics
/dashboard/nutrition - Nutrition Tracker - Meal logging and nutrition analytics
/dashboard/goals - Goals Manager - Goal creation and tracking

---

## Key Components & Their Purposes

### App.jsx
Main application component that sets up routing, Redux provider, and toast notifications. Initializes AOS animation library.

### DashboardLayout.jsx
Provides the main dashboard layout with sidebar navigation, header with user info, and protected route wrapper for authenticated pages.

### FitnessPage/index.jsx
Complete fitness tracking interface with workout logging, personal records, volume progression, and analytics using the useFitnessData hook.

### NutritionPage/index.jsx
Comprehensive nutrition tracking with meal logging, macro tracking, and food search using the useNutritionData hook.

### GoalsPage/index.jsx
Goal management system allowing users to create, edit, and track health goals with progress visualization.

### DashboardPage/index.jsx
Dashboard home page displaying key metrics, weekly progress, and quick action buttons for common tasks.

### FoodLogModal.jsx
Modal for logging food items with serving size adjustment, meal type selection, and time/date picking.

---

## Styling

The project uses Tailwind CSS for styling with:
- Custom color scheme: Teal primary (#14b8a6), complementary blues and oranges
- Responsive grid layouts
- Hover states and transitions
- Gradient backgrounds for visual interest
- Shadow and rounded corner utilities

Main Color Palette:
- Primary: Teal (#14b8a6)
- Secondary: Gray shades (700-900)
- Accent Colors: Blue, Orange, Green, Yellow for different sections

---

## Data Structure Examples

### Workout Data
{
  id: 1,
  userId: 101,
  name: "Push-ups",
  muscleGroup: "Chest",
  equipment: "Bodyweight",
  sets: 3,
  reps: 15,
  caloriesBurned: 120,
  duration: 10,
  date: "2025-11-10"
}

### Meal Data
{
  id: 1,
  name: 'Oatmeal with Berries',
  calories: 320,
  protein: 12,
  carbs: 54,
  fats: 8,
  servingSize: '1 bowl',
  time: '7:30 AM',
  image: '🥣',
  date: '2025-06-10',
  mealType: 'breakfast'
}

### Goal Data
{
  id: 1,
  title: 'Lose 10 pounds',
  type: 'weight',
  target: 160,
  current: 170,
  unit: 'lbs',
  deadline: '2025-12-31',
  status: 'in-progress',
  category: 'weight'
}

---

## Authentication Flow

1. Registration - New users create account via RegisterPage
   - Email validation
   - Password confirmation
   - User profile creation in Firestore

2. Login - Existing users authenticate via LoginPage
   - Email and password verification
   - Redux state update with user data
   - Redirect to dashboard

3. Protected Routes - ProtectedRoute.jsx component
   - Checks authentication status
   - Redirects unauthenticated users to login
   - Maintains user session

---

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar on smaller screens
- Mobile-optimized modals and forms
- Touch-friendly button sizes and spacing

---

## Animations & Effects

### AOS (Animate On Scroll)
- Fade-in effects on page load
- Slide animations for sections
- Zoom effects for images
- Staggered animations for lists

### Tailwind Transitions
- Smooth hover states on buttons and cards
- Color transitions
- Transform animations (scale, translate)
- Duration: 300ms default

---

## Deployment

### Netlify Deployment

The project is configured for Netlify with:

netlify.toml configuration
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

- Build Command: npm run build
- Publish Directory: dist

### Deployment Steps
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command and publish directory
4. Deploy automatically on git push

---

## Environment Variables

Create a .env file in the root directory (optional, as Firebase config is in code):

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

---

## Key Utilities

### nutritionUtils.js
- Date formatting functions
- Macro calculation utilities
- Nutrition progress calculations
- Daily stats aggregation

### workoutUtils.js
- Workout streak calculations
- Volume progress tracking
- Time formatting (24hr to 12hr)
- Muscle group analytics

### api.js
- Simulated API calls with localStorage
- Workout data management
- Exercise data management
- Favorites handling

### nutritionApi.js
- Meal management (add, update, delete)
- Food search functionality
- Nutrition history tracking
- Water intake logging

---

## Custom Hooks

### useNutritionData.js
Manages all nutrition-related state:
- Today's meals and stats
- Food search and filtering
- Favorites management
- History tracking
- Daily goals

### useFitnessData.js
Manages all fitness-related state:
- Workouts logging
- Exercise management
- Progress tracking
- Favorites
- Weekly statistics

---

## Contact & Support

- Email: support@eHealth.com
- Phone: +234 9039 3861 10
- Location: Asokoro Abuja, Nigeria

---

## Important Files Reference

File | Purpose
-----|--------
src/firebase.js | Firebase configuration and initialization
src/App.jsx | Main app routing and setup
src/store/store.js | Redux store configuration
netlify.toml | Netlify deployment config
vite.config.js | Vite build configuration
package.json | Dependencies and scripts

---

## Features by Page

### Home Page
- Hero section with CTA
- About overview
- Services/Features showcase
- Process steps
- User testimonials
- Blog section preview

### Dashboard
- At-a-glance health metrics
- Weekly progress overview
- Upcoming workouts
- Quick action buttons
- Motivational section

### Fitness Tracker
- Today's workout logging
- Workout templates
- Personal records
- Volume progression chart
- Exercise frequency analytics
- Muscle group distribution

### Nutrition Tracker
- Daily meal logging by type
- Macro tracking visualization
- Food search and add
- Weekly history
- Nutrition analytics
- Nutrition score

### Goals Manager
- Create new goals
- Filter by status
- Progress tracking
- Goal statistics
- Motivational messaging

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to your fork
5. Create a pull request

---

## License

This project is part of a capstone project. All rights reserved.

---

## Acknowledgments

- Team: Dr. Sarah Mitchell (CMO), Alex Chen (Head of Product), Maria Garcia (Lead Nutritionist), Echu Emmanuel (CTO)
- Founded: 2020
- Users: 50,000+ active users worldwide
- Satisfaction Rate: 95%

---

## Recent Updates

- 2024: AI Integration for intelligent insights and recommendations
- 2023: Reached 50,000 users with global expansion
- 2022: Added nutrition tracking and goal management
- 2021: Hit 10,000 users milestone
- 2020: Platform founded

---

## Quick Links

Home: /
About Us: /about-us
Contact: /contact
Login: /login
Register: /register
Dashboard: /dashboard

---

Last Updated: November 29, 2025
Version: 1.0.0

Toulang Health Tracker - Your Complete Wellness Companion