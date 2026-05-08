import React, { useState } from 'react';
import { 
  FiShoppingCart, 
  FiUser, 
  FiSearch, 
  FiMapPin, 
  FiClock, 
  FiMenu, 
  FiX,
  FiTrendingUp,
  FiPackage
} from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Brand colors: Lime Yellow #FFD662, Dark Purple #422057
  const brandColors = {
    limeYellow: '#FFD662',
    darkPurple: '#422057'
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full shadow-lg" style={{ backgroundColor: brandColors.darkPurple }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section - LEARN DESIGN */}
            <div className="flex-shrink-0 flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300" style={{ backgroundColor: brandColors.limeYellow }}></div>
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>
                  LD
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight" style={{ color: brandColors.limeYellow }}>
                  LEARN
                  <span className="block text-xs tracking-wider opacity-80" style={{ color: brandColors.limeYellow }}>DESIGN</span>
                </h1>
              </div>
            </div>

            {/* Delivery Info - Inspired by Blinkit/Zepto */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-full" style={{ backgroundColor: 'rgba(255, 214, 98, 0.1)' }}>
              <div className="flex items-center space-x-1">
                <FiClock className="w-4 h-4" style={{ color: brandColors.limeYellow }} />
                <span className="text-xs font-semibold" style={{ color: brandColors.limeYellow }}>Delivery in 9 min</span>
              </div>
              <div className="w-px h-4" style={{ backgroundColor: 'rgba(255, 214, 98, 0.3)' }}></div>
              <div className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition">
                <FiMapPin className="w-3 h-3" style={{ color: brandColors.limeYellow }} />
                <span className="text-xs truncate max-w-[150px]" style={{ color: 'white' }}>Kaithal Bus Stand Rd</span>
              </div>
            </div>

            {/* Search Bar - Centered for uniqueness */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder='Search "design courses"'
                  className="w-full px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 transition-all text-sm"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    placeholderColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <FiSearch className="absolute left-3 top-2.5 w-4 h-4" style={{ color: brandColors.limeYellow }} />
              </div>
            </div>

            {/* Right Section - Login & Cart */}
            <div className="flex items-center space-x-3">
              {/* Login Button - Inspired by Zepto/Blinkit */}
              <button className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 transform duration-200" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>
                <FiUser className="w-4 h-4" />
                <span>Login</span>
              </button>

              {/* Cart Button with Badge */}
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 transform duration-200 group"
                style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}
              >
                <FiShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">My Cart</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: brandColors.darkPurple, color: brandColors.limeYellow }}>
                  3
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-full transition-colors"
                style={{ color: brandColors.limeYellow }}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 space-y-3 border-t" style={{ borderColor: 'rgba(255, 214, 98, 0.2)', backgroundColor: brandColors.darkPurple }}>
            <div className="relative">
              <input
                type="text"
                placeholder='Search "design"'
                className="w-full px-4 py-2 pl-10 rounded-full focus:outline-none text-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                }}
              />
              <FiSearch className="absolute left-3 top-2.5 w-4 h-4" style={{ color: brandColors.limeYellow }} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <FiClock style={{ color: brandColors.limeYellow }} />
                <span className="text-sm" style={{ color: 'white' }}>Delivery in 9 minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiMapPin style={{ color: brandColors.limeYellow }} />
                <span className="text-sm truncate" style={{ color: 'white' }}>Kaithal Bus Stand Rd</span>
              </div>
            </div>
            <button className="w-full py-2 rounded-full font-semibold" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Cart Sidebar - Unique slide-out cart */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-80 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out" style={{ backgroundColor: brandColors.darkPurple }}>
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: brandColors.limeYellow }}>My Cart</h2>
                <button onClick={() => setIsCartOpen(false)} style={{ color: brandColors.limeYellow }}>
                  <FiX size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 214, 98, 0.1)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'white' }}>UI Design Mastery</p>
                    <p className="text-sm opacity-75" style={{ color: 'white' }}>₹2,499</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>-</button>
                    <span style={{ color: 'white' }}>1</span>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 214, 98, 0.1)' }}>
                  <div>
                    <p className="font-medium" style={{ color: 'white' }}>Color Theory Guide</p>
                    <p className="text-sm opacity-75" style={{ color: 'white' }}>₹1,299</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>-</button>
                    <span style={{ color: 'white' }}>2</span>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>+</button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t" style={{ borderColor: 'rgba(255, 214, 98, 0.2)' }}>
                <div className="flex justify-between mb-4">
                  <span style={{ color: 'white' }}>Total</span>
                  <span className="font-bold" style={{ color: brandColors.limeYellow }}>₹5,097</span>
                </div>
                <button className="w-full py-3 rounded-full font-bold transition-all hover:scale-105 transform" style={{ backgroundColor: brandColors.limeYellow, color: brandColors.darkPurple }}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;