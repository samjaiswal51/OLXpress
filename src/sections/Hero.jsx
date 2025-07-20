import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiSearch, FiChevronDown, FiTrendingUp, FiZap, FiUsers, FiArrowRight, FiPlay, FiStar } from 'react-icons/fi';
import { FaCar, FaMotorcycle, FaHome, FaMobile, FaCouch, FaBriefcase, FaShoppingCart, FaCamera } from 'react-icons/fa';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');

  const categories = [
    { name: 'Cars', icon: FaCar, color: 'from-blue-400 to-purple-500' },
    { name: 'Bikes', icon: FaMotorcycle, color: 'from-green-400 to-blue-500' },
    { name: 'Properties', icon: FaHome, color: 'from-orange-400 to-pink-500' },
    { name: 'Electronics', icon: FaMobile, color: 'from-purple-400 to-indigo-500' },
    { name: 'Furniture', icon: FaCouch, color: 'from-yellow-400 to-orange-500' },
    { name: 'Jobs', icon: FaBriefcase, color: 'from-red-400 to-pink-500' }
  ];

  const trendingItems = [
    { name: 'iPhone 15 Pro', price: '₹1,20,000', discount: '15% off' },
    { name: 'Royal Enfield', price: '₹1,85,000', discount: 'Best Price' },
    { name: 'MacBook Air', price: '₹95,000', discount: '20% off' }
  ];

  const stats = [
    { icon: FiUsers, number: '10M+', label: 'Users' },
    { icon: FaShoppingCart, number: '50M+', label: 'Products' },
    { icon: FiTrendingUp, number: '1000+', label: 'Cities' }
  ];

  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden py-8">
      {/* Simple Purple Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          
          {/* Left Side - Hero Content (3 columns) */}
          <motion.div 
            className="lg:col-span-3 space-y-6 text-left"
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 w-fit"
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiZap className="text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">India's #1 Marketplace</span>
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1 
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Buy & Sell
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300">
                  Everything
                </span>{' '}
                Near You
              </motion.h1>

              <motion.p 
                className="text-lg lg:text-xl text-white/80 mb-6 max-w-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover amazing deals, connect with sellers, and find exactly what you're looking for in your local area.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2 w-fit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <FiSearch className="text-lg" />
                Start Exploring
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <FiArrowRight />
                </motion.div>
              </motion.button>

              <motion.button 
                className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 flex items-center justify-center gap-2 w-fit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <FiPlay className="text-lg" />
                Demo
              </motion.button>
            </div>

            {/* Stats Row */}
            <motion.div 
              className="flex gap-8"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-left"
                  whileHover={{ scale: 1.1, y: -3 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-white/20 p-1 rounded-full">
                      <stat.icon className="text-white text-sm" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{stat.number}</h3>
                  </div>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Compact Search Card (2 columns) */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="bg-white/15 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {/* Search Section */}
              <div className="mb-4">
                <h3 className="text-white text-base font-semibold mb-3">Find What You Need</h3>
                
                <div className="space-y-2">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm" />
                    <input
                      type="text"
                      placeholder="Search anything..."
                      className="w-full pl-9 pr-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </motion.div>

                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 text-sm" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-9 pr-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </motion.div>

                  <motion.button 
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiZap className="text-sm" />
                    Search Now
                  </motion.button>
                </div>
              </div>

              {/* Categories Section */}
              <div className="mb-4">
                <h4 className="text-white text-sm font-medium mb-2">Popular Categories</h4>
                
                <div className="grid grid-cols-3 gap-1.5">
                  {categories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.div
                        key={category.name}
                        className="bg-white/15 hover:bg-white/25 p-2 rounded-lg cursor-pointer group text-center border border-white/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                      >
                        <IconComponent className="text-white text-sm mx-auto mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-white text-xs font-medium block">{category.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Trending Section */}
              <div>
                <h4 className="text-white text-sm font-medium mb-2 flex items-center gap-1.5">
                  <FiTrendingUp className="text-yellow-300 text-sm" />
                  Trending
                </h4>
                
                <div className="space-y-1.5">
                  {trendingItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer group"
                      whileHover={{ scale: 1.01, x: 3 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.1 + index * 0.05 }}
                    >
                      <div>
                        <p className="text-white font-medium text-xs">{item.name}</p>
                        <p className="text-white/60 text-xs">{item.price}</p>
                      </div>
                      <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full group-hover:bg-green-400 transition-colors">
                        {item.discount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;