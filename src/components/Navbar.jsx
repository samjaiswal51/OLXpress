import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiUser, FiHeart, FiMessageSquare, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useState('All India');
  const [searchQuery, setSearchQuery] = useState('');

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.5 
      }
    }
  };

  // Wavy gradient animation
  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.header
      className={`fixed w-full z-50 ${isScrolled ? 'backdrop-blur-md shadow-sm' : ''}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        variants={gradientVariants}
        animate="animate"
        style={{
          background: 'linear-gradient(270deg, #1E3A8A, #6D28D9, #6366F1, #A78BFA, #6D28D9, #1E3A8A)',
          backgroundSize: '400% 400%'
        }}
      />
      
      {/* Glassmorphism Overlay */}
      <div className={`absolute inset-0 -z-10 ${isScrolled ? 'bg-white/20 backdrop-blur-md' : 'bg-white/10'}`} />

      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <a href="/" className="text-2xl font-bold text-white relative group">
              OLXPress
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>

          {/* Location Selector - Desktop */}
          <motion.div 
            className="hidden md:flex items-center mx-4 relative group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center cursor-pointer">
              <FiMapPin className="mr-1 text-white/80" />
              <span className="text-sm font-medium text-white relative group-hover:after:scale-x-100 after:absolute after:w-full after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300">
                {location}
              </span>
            </div>
            <motion.div 
              className="absolute top-full left-0 mt-2 w-48 bg-white/90 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-medium mb-2 text-[#1E3A8A]">Select Location</h4>
              <input 
                type="text" 
                placeholder="Search location..." 
                className="w-full p-2 border border-[#6366F1] rounded mb-2 text-sm bg-white/90 text-[#1E3A8A]"
              />
              <div className="max-h-60 overflow-y-auto">
                {['All India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'].map((loc) => (
                  <motion.div 
                    key={loc} 
                    className={`p-2 text-sm cursor-pointer hover:bg-[#EEF2FF] rounded ${
                      location === loc ? 'bg-[#EEF2FF]' : ''
                    }`}
                    onClick={() => setLocation(loc)}
                    whileHover={{ scale: 1.01 }}
                    style={{ color: '#1E3A8A' }}
                  >
                    {loc}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <motion.div 
            className="hidden md:flex flex-1 max-w-2xl mx-4 relative"
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
              className="w-full py-2 px-4 border border-[#6366F1] rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent bg-white/90 text-[#1E3A8A]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
              <FiSearch className="text-[#6366F1]" />
            </div>
            <motion.button 
              className="px-6 py-2 rounded-r-full transition-colors"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Search
            </motion.button>
          </motion.div>

          {/* Right Side Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              className="flex items-center text-sm font-medium text-white relative group"
              whileHover={{ scale: 1.05 }}
            >
              <FiMessageSquare className="mr-1" />
              <span className="group-hover:after:scale-x-100 after:absolute after:w-full after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300">
                Chats
              </span>
            </motion.button>
            
            <motion.button 
              className="flex items-center text-sm font-medium text-white relative group"
              whileHover={{ scale: 1.05 }}
            >
              <FiHeart className="mr-1" />
              <span className="group-hover:after:scale-x-100 after:absolute after:w-full after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300">
                Saved
              </span>
            </motion.button>
            
            <motion.button 
              className="flex items-center text-sm font-medium text-white relative group"
              whileHover={{ scale: 1.05 }}
            >
              <FiUser className="mr-1" />
              <span className="group-hover:after:scale-x-100 after:absolute after:w-full after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:origin-bottom-left after:scale-x-0 after:transition-transform after:duration-300">
                Login
              </span>
            </motion.button>
            
            <motion.button 
              className="flex items-center px-4 py-2 rounded-full transition-colors ml-2"
              style={{ backgroundColor: '#A78BFA', color: '#1E3A8A' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MdSell className="mr-1" />
              <span>Sell</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden focus:outline-none text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-gradient-to-r from-[#1E3A8A] to-[#6366F1] shadow-lg absolute top-full left-0 right-0 z-50 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Location Selector - Mobile */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Location</span>
                <span className="text-[#A78BFA]">{location}</span>
              </div>
            </div>

            {/* Search Bar - Mobile */}
            <div className="p-4 border-b border-white/20">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search on OLX..."
                  className="w-full py-2 px-4 pr-10 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A78BFA] focus:border-transparent bg-white/90 text-[#1E3A8A]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-2.5 text-[#6366F1]" />
              </div>
            </div>

            {/* User Menu - Mobile */}
            <div className="p-4">
              <motion.button 
                className="w-full flex items-center justify-center px-4 py-2 rounded-full mb-3"
                style={{ backgroundColor: '#A78BFA', color: '#1E3A8A' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MdSell className="mr-2" />
                <span>Sell</span>
              </motion.button>
              
              <div className="flex justify-around">
                <motion.button 
                  className="flex flex-col items-center text-xs text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiMessageSquare className="mb-1 text-[#A78BFA]" />
                  <span>Chats</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center text-xs text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiHeart className="mb-1 text-[#A78BFA]" />
                  <span>Saved</span>
                </motion.button>
                
                <motion.button 
                  className="flex flex-col items-center text-xs text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiUser className="mb-1 text-[#A78BFA]" />
                  <span>Login</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;