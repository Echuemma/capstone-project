import React from 'react';
import { Activity, Apple, Target } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Activity,
      title: "Program Tracking",
      description: "Log and monitor your therapy sessions, treatments, and wellness programs with detailed progress analytics and insights.",
      bgColor: "bg-white"
    },
    {
      id: 2,
      icon: Apple,
      title: "Nutrition Monitoring",
      description: "Track your daily meals, calories, and macros with comprehensive nutrition data to support your wellness goals.",
      bgColor: "bg-gray-50"
    },
    {
      id: 3,
      icon: Target,
      title: "Goal Management",
      description: "Set and achieve your health objectives with personalized goal tracking, progress visualization, and milestone celebrations.",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto"     
       >
        <div className="text-center mb-16"
      data-aos="fade-down"
       data-aos-delay="100"
       >
          <p className="text-sm font-medium text-gray-300 tracking-wider uppercase mb-4">
            Platform Features
          </p>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything You Need To Track Your Health
          </h2>
          
          <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
       data-aos-delay="100"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className={`${service.bgColor} rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center mb-6">
                  <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                {/* Button */}
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium uppercase text-sm">
                  Learn More
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}