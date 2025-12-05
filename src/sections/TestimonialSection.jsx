import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);

 const testimonials = [
  {
    id: 1,
    text: "This health tracker has really helped me stay on top of my wellness journey. Being able to log my workouts, monitor my meals, and track my progress in one place has made consistency so much easier. I honestly recommend it to anyone trying to stay healthy.",
    name: "Emeka Okafor",
    role: "Platform User",
    image: "/images/okafor.jpg"
  },
  {
    id: 2,
    text: "I love how simple and user-friendly the platform is. Tracking my fitness goals and daily habits has never been this smooth. The insights really help me stay motivated and make better choices every day.",
    name: "Amina Yusuf",
    role: "Platform User",
    image: "/images/amina.jpg"
  },
  {
    id: 3,
    text: "Managing my health used to be stressful, but this tracker has changed everything. I can see my progress clearly, set goals that make sense, and stay consistent. It has become part of my everyday routine.",
    name: "Tunde Balogun",
    role: "Platform User",
    image: "/images/balogun.jpg"
  }
];


  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 100);
  };

  const previousTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 100);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'right' : 'left');
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 100);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6"
          data-aos="fade-down"
          >
            <p className="text-sm font-medium text-gray-300 tracking-wider uppercase">
              Testimonials
            </p>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              What Our<br />
              Users Say<br />
              About Us
            </h2>
            
            <div className="w-16 h-1 bg-teal-500"></div>
          </div>
          
          {/* Right Content - Testimonial Card */}
          <div className="relative">
            {/* Testimonial Card with Animation */}
            <div 
              key={currentIndex}
              className={`bg-gray-700/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-600 transform transition-all duration-700 ease-out
                ${direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
              `}
              style={{
                animation: `${direction === 'right' ? 'slideInRight' : 'slideInLeft'} 0.7s ease-out`
              }}
            >
              <div className="space-y-8">
                {/* Testimonial Text */}
                <p className="text-gray-200 text-lg leading-relaxed">
                  {testimonials[currentIndex].text}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-500"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white w-8' 
                      : 'bg-gray-500 hover:bg-gray-400 w-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={previousTestimonial}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
          
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}