import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';

import PublicLayout from "./components/PublicLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import NutritionPage from "./pages/NutritionPage";
import FitnessPage from "./pages/FitnessPage";
import GoalsPage from "./pages/GoalsPage";

import ProtectedRoute from "./components/ProtectedRoute";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
      mirror: false,
    });
  }, []);

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES WITH NAV + FOOTER */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />

        <Route
          path="/about-us"
          element={
            <PublicLayout>
              <AboutUsPage />
            </PublicLayout>
          }
        />

        {/* <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        /> */}

        {/* LOGIN & REGISTER WITHOUT NAV & FOOTER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="fitness" element={<FitnessPage />} />
            <Route path="goals" element={<GoalsPage />} />
          </Route>
        </Route>

      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Slide}
      />
    </Router>
  );
}

export default App;
