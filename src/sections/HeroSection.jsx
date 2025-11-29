import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div 
          className="flex flex-col gap-4 sm:gap-6 lg:col-span-1 text-center lg:text-left"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-medium text-gray-600 tracking-wider uppercase">
              Welcome to Toulang
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Track Your<br />
              Wellness<br />
              Journey
            </h1>
            
            <div className="w-16 h-1 bg-teal-600 mx-auto lg:mx-0"></div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3 sm:mt-4 max-w-md mx-auto lg:mx-0">
              Monitor your health programs, nutrition goals, and wellness progress all in one place. Your complete health companion.
            </p>
          </div>
           <a href="/login" >
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 w-fit mx-auto lg:mx-0 shadow-lg hover:shadow-xl text-sm sm:text-base">
            <Calendar size={18} className="flex-shrink-0" />           
            <span className="font-medium whitespace-nowrap">START TRACKING</span>
          </button>
           </a>
        </div>
        
        {/* Center Image */}
        <div 
          className="flex justify-center lg:col-span-1 order-first lg:order-none"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="relative">
            <div className="w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[500px] rounded-full overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" 
                alt="Health & Wellness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Right Stats */}
        <div 
          className="flex flex-col gap-4 sm:gap-6 lg:gap-8 lg:col-span-1"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-5 sm:py-6 shadow-lg border border-gray-200"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">156</p>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide uppercase">Programs Completed</p>
          </div>
          
          <div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-5 sm:py-6 shadow-lg border border-gray-200"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <p className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">892</p>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide uppercase">Sessions Logged</p>
          </div>
          
          <div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-5 sm:py-6 shadow-lg border border-gray-200"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <p className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1 sm:mb-2">94%</p>
            <p className="text-xs sm:text-sm text-gray-600 tracking-wide uppercase">Goal Achievement Rate</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}