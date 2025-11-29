import React, { useState, useEffect } from 'react';

// Auth Layout Component - Reusable for Login/Register
export default function AuthLayout({ children, title }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
      title: 'Destination for <span style="color:#14b8a6;">Relief</span>',
      description: 'Experience personalized physiotherapy care that transforms your health and restores your mobility.',
    },
    {
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
      title: 'Expert <span style="color:#14b8a6;">Therapy</span>',
      description: 'Work with certified therapists dedicated to your recovery and long-term wellness goals.',
    },
    {
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
      title: 'Your <span style="color:#14b8a6;">Wellness Journey</span>',
      description: 'Join thousands of satisfied patients who have transformed their lives through our care.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Carousel (Fixed) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-screen">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
              }}
            >
              <div className="flex flex-col justify-center items-start h-full px-16 text-white">
                <h1
                  className="text-5xl font-bold mb-6 leading-tight"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p className="text-xl text-gray-200 leading-relaxed max-w-md">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-16 flex gap-3 z-10">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-teal-500 w-8'
                  : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Form Content (Scrollable) */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 h-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-6">
          <div className="w-full max-w-md my-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {title}
              </h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
