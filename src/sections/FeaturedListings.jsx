import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiSearch, FiChevronDown, FiTrendingUp, FiZap, FiUsers, FiArrowRight, FiPlay, FiStar, FiClock, FiHeart, FiFilter } from 'react-icons/fi';
import { FaCar, FaMotorcycle, FaHome, FaMobile, FaCouch, FaBriefcase, FaShoppingCart, FaCamera } from 'react-icons/fa';

const allListings = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max 128GB',
    price: 92000,
    location: 'Delhi',
    time: '2 hours ago',
    image: 'https://images.olx.in/thumbnails/294823614-800x600.webp',
    category: 'Mobiles',
  },
  {
    id: 2,
    title: 'Honda City 2020',
    price: 850000,
    location: 'Mumbai',
    time: '1 day ago',
    image: 'https://images.olx.in/thumbnails/295648086-800x600.webp',
    category: 'Cars',
  },
  {
    id: 3,
    title: 'Sofa Set (5 Seater)',
    price: 12000,
    location: 'Bangalore',
    time: '3 hours ago',
    image: 'https://images.olx.in/thumbnails/295515234-800x600.webp',
    category: 'Furniture',
  },
  {
    id: 4,
    title: 'Samsung 55" Smart TV',
    price: 34500,
    location: 'Hyderabad',
    time: '4 days ago',
    image: 'https://images.olx.in/thumbnails/295289214-800x600.webp',
    category: 'Electronics',
  },
];

const categories = [
  { name: 'Cars', icon: FaCar, color: 'from-blue-400 to-purple-500' },
  { name: 'Bikes', icon: FaMotorcycle, color: 'from-green-400 to-blue-500' },
  { name: 'Properties', icon: FaHome, color: 'from-orange-400 to-pink-500' },
  { name: 'Electronics', icon: FaMobile, color: 'from-purple-400 to-indigo-500' },
  { name: 'Furniture', icon: FaCouch, color: 'from-yellow-400 to-orange-500' },
  { name: 'Jobs', icon: FaBriefcase, color: 'from-red-400 to-pink-500' }
];

const filterCategories = ['All', 'Mobiles', 'Cars', 'Furniture', 'Electronics', 'Properties', 'Bikes'];

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

const MergedHeroFeatured = () => {
  // Hero section states
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');

  // Featured listings states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = allListings.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesMin = priceRange.min === '' || item.price >= parseInt(priceRange.min);
    const matchesMax = priceRange.max === '' || item.price <= parseInt(priceRange.max);
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesMin && matchesMax && matchesSearch;
  });

  const listingsToShow = filtered.slice(0, visibleCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.4, 0.7, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HERO SECTION */}
        <div className="min-h-[75vh] flex items-center py-8">
          <div className="grid lg:grid-cols-5 gap-8 items-center w-full pt-16">
            
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
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
                  className="group bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-6 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2 w-fit"
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
                        className="w-full pl-9 pr-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                        className="w-full pl-9 pr-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </motion.div>

                    <motion.button 
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 text-sm"
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

        {/* FEATURED LISTINGS SECTION */}
        <div className="py-16">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Listings
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover amazing deals and find exactly what you're looking for
            </p>
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div 
            className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 mb-10 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <FiFilter className="text-white/70" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                >
                  {filterCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-800 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-24 px-3 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-24 px-3 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-white/80 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              Found {filtered.length} listings
            </span>
          </motion.div>

          {/* Listings Grid */}
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {listingsToShow.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500"
                  whileHover={{ y: -15, scale: 1.03 }}
                  layout
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-115"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-3 left-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <div className="mb-4">
                      <motion.span 
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                        whileHover={{ scale: 1.05 }}
                      >
                        ₹{item.price.toLocaleString()}
                      </motion.span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="text-pink-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-purple-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>

                  {/* Save Heart Icon */}
                  <motion.button
                    onClick={() => handleSave(item.id)}
                    className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full shadow-xl hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={favorites.includes(item.id) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <FiHeart
                        className={`text-lg transition-colors ${
                          favorites.includes(item.id) 
                            ? 'text-red-400 fill-current' 
                            : 'text-gray-600 hover:text-red-400'
                        }`}
                      />
                    </motion.div>
                  </motion.button>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {visibleCount < filtered.length && (
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-2xl border border-white/30 transform transition-all duration-300 overflow-hidden group backdrop-blur-md"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Load More Listings
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <FiSearch className="text-lg" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default MergedHeroFeatured;