import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ToulangNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-[#e8e6e1] px-6 lg:px-8 py-5 shadow-sm relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer z-50">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 p-4 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl ">eHA</span>
          </div>
          {/* <span className="text-2xl lg:text-3xl font-light tracking-[0.15em] text-gray-700 uppercase">
            TOULANG
          </span> */}
        </div>

        <ul className="hidden lg:flex gap-10 items-center">
          <li className="relative group">
            <Link 
              href="/" 
              className="text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors pb-1 block"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          </li>
{/*           
          <li className="relative">
            <button 
              onClick={() => toggleDropdown('page')}
              className="flex items-center gap-1 text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors group pb-1"
            >
              PAGE
              <ChevronDown 
                size={16} 
                className={`transition-transform ${activeDropdown === 'page' ? 'rotate-180' : ''}`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </button>
            
            {activeDropdown === 'page' && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[180px] z-50">
                <Link href="#page1" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Page 1</Link>
                <Link href="#page2" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Page 2</Link>
                <Link href="#page3" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Page 3</Link>
              </div>
            )}
          </li> */}
          
          {/* <li className="relative">
            <button 
              onClick={() => toggleDropdown('blog')}
              className="flex items-center gap-1 text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors group pb-1"
            >
              BLOG
              <ChevronDown 
                size={16} 
                className={`transition-transform ${activeDropdown === 'blog' ? 'rotate-180' : ''}`}
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </button>
            
            {activeDropdown === 'blog' && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 min-w-[180px] z-50">
                <Link href="#latest" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Latest Posts</Link>
                <Link href="#categories" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Categories</Link>
                <Link href="#archive" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Archive</Link>
              </div>
            )}
          </li> */}
          
       

            <li className="relative group">
            <Link 
              href="/contact" 
              className="text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors pb-1 block"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          </li>

               <li className="relative group">
            <Link 
              href="/about-us" 
              className="text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors pb-1 block"
            >
              ABOUT US
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          </li>

             <li className="relative group">
            <Link 
              href="/login" 
              className="text-gray-700 font-medium text-sm tracking-wider uppercase hover:text-gray-900 transition-colors pb-1 block"
            >
              LOGIN
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          </li>
          
          <li>
            <Link 
              href="/register" 
              className="bg-gray-700 text-white px-6 py-2.5 rounded-md font-medium text-sm tracking-wider uppercase hover:bg-gray-800 transition-all hover:shadow-md"
            >
              REGISTER
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-50 p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#e8e6e1] z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6 pb-6 overflow-y-auto h-full">
          <ul className="space-y-1">
            <li>
              <Link 
                href="#home" 
                onClick={closeMobileMenu}
                className="block py-3 px-4 text-gray-700 font-medium text-base tracking-wider uppercase hover:bg-white/50 rounded-md transition-colors"
              >
                HOME
              </Link>
            </li>
            
            <li>
              <button 
                onClick={() => toggleDropdown('page')}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-700 font-medium text-base tracking-wider uppercase hover:bg-white/50 rounded-md transition-colors"
              >
                PAGE
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${activeDropdown === 'page' ? 'rotate-180' : ''}`}
                />
              </button>
              
              {activeDropdown === 'page' && (
                <div className="mt-1 ml-4 space-y-1">
                  <Link 
                    href="#page1" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Page 1
                  </Link>
                  <Link 
                    href="#page2" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Page 2
                  </Link>
                  <Link 
                    href="#page3" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Page 3
                  </Link>
                </div>
              )}
            </li>
            
            <li>
              <button 
                onClick={() => toggleDropdown('blog')}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-700 font-medium text-base tracking-wider uppercase hover:bg-white/50 rounded-md transition-colors"
              >
                BLOG
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${activeDropdown === 'blog' ? 'rotate-180' : ''}`}
                />
              </button>
              
              {activeDropdown === 'blog' && (
                <div className="mt-1 ml-4 space-y-1">
                  <Link 
                    href="#latest" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Latest Posts
                  </Link>
                  <Link 
                    href="#categories" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Categories
                  </Link>
                  <Link 
                    href="#archive" 
                    onClick={closeMobileMenu}
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-white/50 rounded-md transition-colors"
                  >
                    Archive
                  </Link>
                </div>
              )}
            </li>
            
            <li>
              <Link 
                href="/login" 
                onClick={closeMobileMenu}
                className="block py-3 px-4 text-gray-700 font-medium text-base tracking-wider uppercase hover:bg-white/50 rounded-md transition-colors"
              >
                LOGIN
              </Link>
            </li>
            
            <li className="pt-4">
              <Link 
                href="/register" 
                onClick={closeMobileMenu}
                className="block text-center bg-gray-700 text-white px-6 py-3 rounded-md font-medium text-base tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}