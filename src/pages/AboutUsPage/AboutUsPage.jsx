import React, { useEffect } from 'react';
import { Heart, Target, Users, TrendingUp, Award, Shield, Zap, Sparkles } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUsPage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out',
        });
    }, []);

    const values = [
        {
            icon: Heart,
            title: 'User-Centered',
            description: 'Every feature is designed with your wellness journey in mind, making health tracking intuitive and empowering.'
        },
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'Your health data is sacred. We employ industry-leading security to keep your information safe and private.'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'Constantly evolving with the latest health tracking technologies to give you the best experience.'
        },
        {
            icon: Sparkles,
            title: 'Holistic Approach',
            description: 'We believe wellness encompasses programs, nutrition, and goals - all seamlessly integrated.'
        }
    ];

    const milestones = [
        { year: '2020', event: 'Platform Founded', description: 'Started with a vision to simplify health tracking' },
        { year: '2021', event: '10,000 Users', description: 'Reached our first major user milestone' },
        { year: '2022', event: 'Feature Expansion', description: 'Added nutrition tracking and goal management' },
        { year: '2023', event: '50,000 Users', description: 'Community grew 5x with global reach' },
        { year: '2024', event: 'AI Integration', description: 'Launched intelligent insights and recommendations' }
    ];

  const team = [
  {
    name: 'Dr. Aisha Bello',
    role: 'Chief Medical Officer',
    image: '/images/bello.jpg',
    bio: 'Experienced medical practitioner with over 12 years in patient care and community health.'
  },
  {
    name: 'Chinedu Okeke',
    role: 'Head of Product',
    image: '/images/chinedu.jpg',
    bio: 'Product strategist focused on building innovative and accessible digital health solutions.'
  },
  {
    name: 'Adaugo Nwosu',
    role: 'Lead Nutritionist',
    image: '/images/adaugo.jpg',
    bio: 'Certified nutrition expert specializing in African diet wellness and lifestyle optimization.'
  },
  {
    name: 'Echu Emmanuel',
    role: 'CTO',
    image: '/images/niceman.jpg',
    bio: 'Software architect with hands-on experience building scalable and secure health tech platforms.'
  }
];


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="relative min-h-[60vh] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center px-4 py-20">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80')"
                    }}
                ></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center" data-aos="fade-up">
                    <p className="text-sm font-medium text-gray-300 tracking-wider uppercase mb-4">
                        About Toulang Health Tracker
                    </p>
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Empowering Your<br />Wellness Journey
                    </h1>
                    <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        We're on a mission to make health tracking simple, comprehensive, and accessible for everyone pursuing their wellness goals.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6" data-aos="fade-up">
                            <p className="text-sm font-medium text-gray-600 tracking-wider uppercase">
                                Our Story
                            </p>
                            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                Built by Health Enthusiasts, For Health Enthusiasts
                            </h2>
                            <div className="w-16 h-1 bg-teal-600"></div>
                            <p className="text-gray-600 leading-relaxed">
                                Toulang Health Tracker was born from a simple observation: managing multiple aspects of health shouldn't be complicated. Our founders experienced firsthand the frustration of juggling therapy appointments, nutrition logs, and wellness goals across different platforms.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                In 2020, we set out to create a unified solution that brings together program tracking, nutrition monitoring, and goal management in one intuitive platform. Today, we're proud to serve thousands of users worldwide on their wellness journeys.
                            </p>
                            <div className="grid grid-cols-3 gap-6 pt-4">
                                <div>
                                    <p className="text-4xl font-bold text-teal-600">50K+</p>
                                    <p className="text-sm text-gray-600 mt-1">Active Users</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-teal-600">500K+</p>
                                    <p className="text-sm text-gray-600 mt-1">Sessions Logged</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-teal-600">95%</p>
                                    <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative" data-aos="fade-down">
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                                    alt="Team collaboration"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <p className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">
                            What Drives Us
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Our Mission & Vision
                        </h2>
                        <div className="w-16 h-1 bg-teal-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white rounded-3xl p-10 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                            <Target className="w-12 h-12 text-teal-600 mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To provide a comprehensive, user-friendly platform that seamlessly integrates therapy tracking, nutrition monitoring, and goal management, empowering individuals to take control of their wellness journey and achieve lasting health outcomes.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-10 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                            <TrendingUp className="w-12 h-12 text-teal-600 mb-6" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the world's most trusted health tracking platform, where millions of people seamlessly manage their wellness routines, celebrate their progress, and inspire others to prioritize their health every single day.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <p className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">
                            Our Values
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            What We Stand For
                        </h2>
                        <div className="w-16 h-1 bg-teal-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <p className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">
                            Our Journey
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Key Milestones
                        </h2>
                        <div className="w-16 h-1 bg-teal-600 mx-auto"></div>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-600 hidden md:block"></div>

                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                            >
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                                        <p className="text-3xl font-bold text-teal-600 mb-2">{milestone.year}</p>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                                        <p className="text-gray-600">{milestone.description}</p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-600 rounded-full border-4 border-gray-100 hidden md:block"></div>

                                <div className="flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <p className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">
                            Meet The Team
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            The People Behind Toulang
                        </h2>
                        <div className="w-16 h-1 bg-teal-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-20 px-6 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80')"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 to-gray-900/90"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center" data-aos="zoom-in">
                    <Award className="w-16 h-16 text-teal-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Start Your Wellness Journey?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                        Join thousands of users who are taking control of their health with Toulang Health Tracker.
                    </p>
                    <a href="/login">
                        <button className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl">
                            Get Started Today
                        </button>
                    </a>
                </div>
            </section>

        </div>
    );
}