import React from 'react';
import { UserPlus, Activity, Target, TrendingUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProcessSection() {
  const steps = [
    {
      id: 1,
      icon: UserPlus,
      title: "1. Create Your Profile",
      description: "Set up your account and personalize your health tracking preferences to match your wellness journey."
    },
    {
      id: 2,
      icon: Activity,
      title: "2. Log Your Activities",
      description: "Track therapy sessions, meals, and daily activities with our intuitive logging interface."
    },
    {
      id: 3,
      icon: Target,
      title: "3. Set Your Goals",
      description: "Define your health objectives and milestones to stay motivated and focused on your wellness targets."
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "4. Monitor Progress",
      description: "View detailed analytics, insights, and trends to see how you're advancing toward your health goals."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Content - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6"
          data-aos="fade-down"
          data-aos-delay="100"
          >
            <p className="text-sm font-medium text-gray-600 tracking-wider uppercase">
              How It Works
            </p>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Start Tracking<br />
              In Four Steps
            </h2>
            
            <div className="w-16 h-1 bg-teal-600"></div>
          </div>
          
          {/* Right Content - Steps Grid - Takes up 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12"
             data-aos="fade-up"
       data-aos-delay="100"
          >
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.id}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center shadow-lg">
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}