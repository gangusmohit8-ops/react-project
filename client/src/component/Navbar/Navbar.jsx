import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../cotext/DarkandLight.jsx';
import { 
  HiOutlineShoppingCart, 
  HiOutlineUser, 
  HiOutlineMenuAlt2, 
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineTruck,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import { HiOutlineWrench } from 'react-icons/hi2';
import { 
  FaTools, 
  FaBolt, 
  FaPalette, 
  FaShieldAlt, 
  FaMagic,
  FaPaintBrush,
  FaBolt as FaLightningBolt
} from 'react-icons/fa';
import { GiCarWheel, GiGearHammer } from 'react-icons/gi';

// Logo component with brand colors
const Logo = ({ isDark }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="relative">
      {/* Animated logo container */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD662] to-[#FFD662]/50 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
        isDark ? 'bg-[#422057]/80' : 'bg-white'
      } shadow-lg overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#FFD662] rounded-full blur-xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 text-2xl font-black text-[#FFD662]"><img src="https://res.cloudinary.com/dzqvy8tjo/image/upload/v1778472208/Background_Removed_1_sauchz.png" alt="" /></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FFD662] rounded-full border-2 border-[#422057] animate-pulse"></div>
      </div>
    </div>
    <div className="flex flex-col">
      <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-[#422057]'
      }`}>STREET</span>
      <span className="text-sm font-bold tracking-wider text-[#FFD662] bg-[#422057] px-1 -mt-1 rounded">GARAGE</span>
    </div>
  </div>
);

// Category data with react-icons
const categories = [
  { id: 1, name: "ALL PARTS", slug: "all-parts", icon: <FaTools className="w-5 h-5" />, gradient: "from-[#422057] to-[#5a2d7a]" },
  { id: 2, name: "PERFORMANCE", slug: "performance", icon: <FaLightningBolt className="w-5 h-5" />, gradient: "from-[#FFD662] to-[#f5cc4a]" },
  { id: 3, name: "EXTERIOR", slug: "exterior", icon: <FaPaintBrush className="w-5 h-5" />, gradient: "from-[#422057] to-[#5a2d7a]" },
  { id: 4, name: "WHEELS & TIRES", slug: "wheels-tires", icon: <GiCarWheel className="w-5 h-5" />, gradient: "from-[#FFD662] to-[#f5cc4a]" },
  { id: 5, name: "PROTECTION", slug: "protection", icon: <FaShieldAlt className="w-5 h-5" />, gradient: "from-[#422057] to-[#5a2d7a]" },
  { id: 6, name: "CUSTOM", slug: "custom", icon: <FaMagic className="w-5 h-5" />, gradient: "from-[#FFD662] to-[#f5cc4a]" }
];

// Nav items with react-icons
const navItems = [
  { name: "SHOP", slug: "shop", icon: <HiOutlineShoppingCart className="w-4 h-4" /> },
  { name: "GARAGE", slug: "garage", icon: <HiOutlineTruck className="w-4 h-4" /> },
  { name: "BUILD", slug: "build", icon: <GiGearHammer className="w-4 h-4" /> },
  { name: "COMMUNITY", slug: "community", icon: <HiOutlineHeart className="w-4 h-4" /> },
  { name: "SUPPORT", slug: "support", icon: <HiOutlineShieldCheck className="w-4 h-4" /> }
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [cartCount, setCartCount] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Main Navbar */}
      <nav className={`transition-all duration-500 ${
        isScrolled 
          ? isDarkMode
            ? 'bg-[#1a0a2e]/95 backdrop-blur-xl shadow-2xl border-b border-[#FFD662]/20'
            : 'bg-white/70 backdrop-blur-xl shadow-2xl'
          : isDarkMode
            ? 'bg-[#1a0a2e] shadow-xl border-b border-[#FFD662]/10'
            : 'bg-white shadow-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <Logo isDark={isDarkMode} />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative group px-4 py-2 rounded-xl transition-all duration-300 overflow-hidden ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-[#FFD662]' 
                      : 'text-[#422057] hover:text-[#FFD662]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-wide">
                    <span className={`transition-transform duration-300 group-hover:scale-110 ${
                      hoveredNav === item.name ? 'text-[#FFD662]' : ''
                    }`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FFD662]/0 via-[#FFD662]/10 to-[#FFD662]/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700"></span>
                </Link>
              ))}
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-2">
              {/* Animated Search Bar */}
              <div className="hidden sm:flex items-center relative">
                <div className={`relative transition-all duration-500 ${searchFocused ? 'w-72' : 'w-44'}`}>
                  <input
                    type="text"
                    placeholder="Search 10k+ parts..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`w-full pl-11 pr-4 py-2.5 rounded-full text-sm transition-all duration-300 outline-none ${
                      isDarkMode
                        ? 'bg-[#2a1a3e] text-white placeholder-gray-400 border border-[#FFD662]/20 focus:border-[#FFD662] focus:ring-2 focus:ring-[#FFD662]/20'
                        : 'bg-gray-100 text-[#422057] placeholder-gray-500 border border-transparent focus:border-[#FFD662] focus:ring-2 focus:ring-[#FFD662]/20'
                    }`}
                  />
                  <HiOutlineSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  {searchFocused && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#FFD662] animate-pulse">
                      ⌘K
                    </div>
                  )}
                </div>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`relative p-2.5 rounded-xl transition-all duration-500 overflow-hidden group ${
                  isDarkMode
                    ? 'bg-[#2a1a3e] text-[#FFD662] hover:bg-[#3a2a4e]'
                    : 'bg-gray-100 text-[#422057] hover:bg-gray-200'
                }`}
              >
                <div className="relative z-10">
                  {isDarkMode ? (
                    <HiOutlineSun className="w-5 h-5 animate-spin-slow" />
                  ) : (
                    <HiOutlineMoon className="w-5 h-5" />
                  )}
                </div>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD662]/0 via-[#FFD662]/20 to-[#FFD662]/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700"></span>
              </button>

              {/* User Icon Button */}
              <button className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 group ${
                isDarkMode
                  ? 'bg-[#2a1a3e] text-gray-300 hover:text-[#FFD662] hover:bg-[#3a2a4e]'
                  : 'bg-gray-100 text-[#422057] hover:bg-gray-200'
              }`}>
                <HiOutlineUser className="w-5 h-5" />
              </button>

              {/* Cart Icon with Badge */}
              <button className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 group ${
                isDarkMode
                  ? 'bg-[#2a1a3e] text-gray-300 hover:text-[#FFD662] hover:bg-[#3a2a4e]'
                  : 'bg-gray-100 text-[#422057] hover:bg-gray-200'
              }`}>
                <HiOutlineShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-[#FFD662] text-[#422057] text-[10px] font-black rounded-full shadow-lg animate-bounce-slow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#2a1a3e] text-gray-300 hover:text-[#FFD662]'
                    : 'bg-gray-100 text-[#422057]'
                }`}
              >
                {isMenuOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenuAlt2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-4 py-5 space-y-2 ${
            isDarkMode ? 'bg-[#1a0a2e] border-t border-[#FFD662]/10' : 'bg-white border-t border-gray-100'
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.slug}
                to={`/${item.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 group ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-[#FFD662] hover:bg-[#2a1a3e]'
                    : 'text-[#422057] hover:text-[#FFD662] hover:bg-gray-50'
                }`}
              >
                <span className="text-[#FFD662]">{item.icon}</span>
                {item.name}
                <HiOutlineArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </Link>
            ))}
            {/* Mobile Search */}
            <div className="relative pt-4">
              <input
                type="text"
                placeholder="Search parts..."
                className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all ${
                  isDarkMode
                    ? 'bg-[#2a1a3e] text-white placeholder-gray-400 border border-[#FFD662]/20 focus:border-[#FFD662]'
                    : 'bg-gray-100 text-[#422057] placeholder-gray-500 border border-transparent focus:border-[#FFD662]'
                }`}
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Categories Bar - Glass morphism effect */}
      <div className={`transition-all duration-300 ${
        isDarkMode ? 'bg-[#1a0a2e]/100 backdrop-blur-md border-b border-[#FFD662]/40' : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-3 px-1 gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                onClick={() => setActiveCategory(category.id)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500 group no-underline ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white scale-105`
                    : isDarkMode
                      ? 'bg-[#2a1a3e] text-gray-300 hover:bg-[#3a2a4e] hover:text-[#FFD662]'
                      : 'bg-gray-100 text-[#422057] hover:bg-gray-200'
                }`}
              >
                <span className={`transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  activeCategory === category.id ? 'text-white' : 'text-[#FFD662]'
                }`}>
                  {category.icon}
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
                  {category.name}
                </span>
                {activeCategory === category.id && (
                  <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#FFD662] rounded-full shadow-lg shadow-[#FFD662]/50"></span>
                )}
              </Link>
            ))}
            
            {/* Brand hashtag */}
            <div className="flex-shrink-0 ml-auto hidden sm:flex items-center gap-3 text-xs">
              <span className="w-1.5 h-1.5 bg-[#FFD662] rounded-full animate-pulse"></span>
              <span className={`font-mono tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-[#422057]'}`}>
                #STREETGARAGE
              </span>
              <span className="w-1.5 h-1.5 bg-[#FFD662] rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Gradient Border Line */}
      {/* <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD662] to-transparent animate-gradient-x"></div> */}

      {/* Custom CSS Animations
      <style>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style> */}
    </div>
  );
};

export default Navbar;