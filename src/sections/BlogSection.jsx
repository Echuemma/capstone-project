import React from 'react';
import { Calendar } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      date: "March 16, 2024",
      title: "Tips for Faster Recovery After Sports Injury Rehabilitation",
      excerpt: "Phasellus sit amet odio ex. Pellentesque id enim sed...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    },
    {
      id: 2,
      date: "March 16, 2024",
      title: "Understanding the Benefits of Manual Therapy in Physiotherapy",
      excerpt: "Phasellus sit amet odio ex. Pellentesque id enim sed...",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    },
    {
      id: 3,
      date: "January 16, 2022",
      title: "10 Essential Exercises for Knee Rehabilitation After Surgery",
      excerpt: "Phasellus sit amet odio ex. Pellentesque id enim sed...",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16"
        data-aos="fade-down">
          <p className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">
            Our Blog
          </p>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Article About Physiotherapy
          </h2>
          
          <div className="w-16 h-1 bg-teal-600 mx-auto"></div>
        </div>
        
        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-4">
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 leading-snug hover:text-teal-600 transition-colors duration-300 cursor-pointer">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}