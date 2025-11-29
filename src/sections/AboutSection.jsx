import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600 tracking-wider uppercase"
              data-aos="fade-right"
          data-aos-delay="100"
              >
                About The Platform
              </p>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              data-aos="fade-up"
          data-aos-delay="100"
              >
                Your Complete<br />
                Health Journey Companion
              </h2>
              
              <div className="w-16 h-1 bg-teal-600"></div>
              
              <p className="text-gray-600 leading-relaxed mt-6"
              data-aos="fade-down"
          data-aos-delay="100"
              >
                Track your therapy sessions, monitor nutrition intake, and achieve your wellness goals with our comprehensive health tracking platform. Everything you need to stay on top of your health journey.
              </p>
            </div>
            
            {/* Vision and Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3" data-aos="fade-up"
          data-aos-delay="100">
                <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower individuals with intuitive tools that make health tracking effortless, enabling better wellness outcomes through consistent monitoring and goal achievement.
                </p>
              </div>
              
              <div className="space-y-3" data-aos="fade-down"
          data-aos-delay="100">
                <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Provide a comprehensive platform that seamlessly integrates therapy tracking, nutrition monitoring, and goal management to support your complete wellness journey.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Images */}
          <div className="flex gap-6 items-center justify-center lg:justify-end">
            {/* First Image - Progress Tracking */}
            <div className="w-40 h-96 rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" 
                alt="Health Progress Tracking"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Second Image - Wellness Activities */}
            <div className="w-40 h-96 rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" 
                alt="Wellness Activities"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Third Image - Nutrition */}
            <div className="w-40 h-96 rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" 
                alt="Healthy Nutrition"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}