import React from 'react';
import { Instagram, Twitter, Phone, MapPin, Mail,Facebook, Linkedin,  } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-bold text-xl">eHA</span>
              </div>
            </div>

            <div className="w-full h-px bg-gray-600"></div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibu
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-transparent border-2 border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-transparent border-2 border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="#"
                className="w-10 h-10 bg-transparent border-2 border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 hover:border-gray-500 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>

          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="about-us" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Services
                </a>
              </li> */}
              <li>
                <a href="contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Faq
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <a href="tel:+234 9039 3861 10" className="text-gray-400 hover:text-white transition-colors duration-300">
                  +234 9039 3861 10
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Asokoro Abuja, Nigeria
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  support@eHealth.com
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}