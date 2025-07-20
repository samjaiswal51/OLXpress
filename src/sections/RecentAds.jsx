import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiClock, FiHeart } from 'react-icons/fi';

// Mock ads data with more realistic content
const ads = [
  {
    id: 1,
    title: 'Apple iPad Air 5th Gen - Like New',
    price: 42000,
    originalPrice: 54900,
    location: 'Delhi, India',
    timePosted: new Date(Date.now() - 10 * 60 * 1000),
    imageUrls: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop'
    ],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: 'Rahul Kumar',
      rating: 4.8,
      totalReviews: 156
    },
    category: 'Electronics',
    condition: 'Like New',
    description: '10.9-inch display, A14 Bionic chip, 256GB storage'
  },
  {
    id: 2,
    title: 'Bajaj Avenger Cruise 220cc - 2019',
    price: 82000,
    originalPrice: 95000,
    location: 'Mumbai, India',
    timePosted: new Date(Date.now() - 2 * 60 * 60 * 1000),
    imageUrls: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    ],
    isVerified: false,
    isUrgent: true,
    seller: {
      name: 'Amit Sharma',
      rating: 4.2,
      totalReviews: 89
    },
    category: 'Vehicles',
    condition: 'Good',
    description: 'Well maintained, single owner, all papers clear'
  },
  {
    id: 3,
    title: 'LG Smart TV 43" 4K Ultra HD',
    price: 21000,
    originalPrice: 35000,
    location: 'Bangalore, India',
    timePosted: new Date(Date.now() - 24 * 60 * 60 * 1000),
    imageUrls: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop'
    ],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: 'Priya Patel',
      rating: 4.9,
      totalReviews: 234
    },
    category: 'Electronics',
    condition: 'Excellent',
    description: 'WebOS, HDR support, barely used'
  },
  {
    id: 4,
    title: 'iPhone 13 Pro Max 128GB',
    price: 75000,
    originalPrice: 89000,
    location: 'Pune, India',
    timePosted: new Date(Date.now() - 3 * 60 * 60 * 1000),
    imageUrls: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    ],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: 'Vikash Singh',
      rating: 4.7,
      totalReviews: 178
    },
    category: 'Electronics',
    condition: 'Like New',
    description: 'Box packed, all accessories included'
  }
];

const RecentAds = () => {
  const [saved, setSaved] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [location, setLocation] = useState('All India');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const toggleSave = (id) => {
    const updated = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(updated);
  };

  const timeAgo = (time) => {
    const diff = Math.floor((Date.now() - time.getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const discountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const filteredAds = ads.filter(ad => 
    selectedCategory === 'All' || ad.category === selectedCategory
  );

  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
    return b.timePosted - a.timePosted;
  });

  const nextImage = (adId) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    
    setCurrentImageIndex(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) + 1) % ad.imageUrls.length
    }));
  };

  const prevImage = (adId) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    
    setCurrentImageIndex(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) - 1 + ad.imageUrls.length) % ad.imageUrls.length
    }));
  };

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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
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

  const categories = ['All', 'Electronics', 'Vehicles', 'Fashion', 'Home'];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🌟 Fresh Listings
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals from verified sellers across India
          </p>
        </motion.div>

        {/* Enhanced Filter Bar */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded text-sm transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded text-sm transition-all ${
                    viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                  }`}
                >
                  List
                </button>
              </div>

              {/* Location Filter */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:border-blue-500 transition-colors"
              >
                <option>All India</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Pune</option>
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 px-4 py-2 rounded-xl focus:border-blue-500 transition-colors"
              >
                <option value="newest">Latest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated Sellers</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Ads Grid */}
        <motion.div 
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6' 
              : 'flex flex-col gap-6'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {sortedAds.map((ad) => (
              <motion.div
                key={ad.id}
                variants={cardVariants}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
                whileHover={{ y: -15, scale: 1.03 }}
                layout
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'
                }`}>
                  <motion.img
                    src={ad.imageUrls[currentImageIndex[ad.id] || 0]}
                    alt={ad.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-115 ${
                      viewMode === 'list' ? 'h-full' : 'h-48'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Image Navigation */}
                  {ad.imageUrls.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        onClick={() => prevImage(ad.id)}
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ←
                      </motion.button>
                      <motion.button
                        onClick={() => nextImage(ad.id)}
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        →
                      </motion.button>
                    </div>
                  )}

                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-3 left-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {ad.category}
                    </span>
                  </motion.div>

                  {/* Verification and Status Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {Date.now() - ad.timePosted.getTime() < 60 * 60 * 1000 && (
                      <motion.span 
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        New
                      </motion.span>
                    )}
                    {ad.isVerified && (
                      <motion.span 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Verified
                      </motion.span>
                    )}
                    {ad.isUrgent && (
                      <motion.span 
                        className="bg-gradient-to-r from-red-400 to-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-lg animate-pulse"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Urgent
                      </motion.span>
                    )}
                    {ad.originalPrice && (
                      <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 text-xs rounded-full font-bold">
                        -{discountPercentage(ad.originalPrice, ad.price)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {ad.title}
                  </h3>
                  
                  <div className="mb-2">
                    <motion.span 
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
                      whileHover={{ scale: 1.05 }}
                    >
                      ₹{ad.price.toLocaleString()}
                    </motion.span>
                    {ad.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{ad.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{ad.seller.name}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-xs text-gray-600">
                            {ad.seller.rating} ({ad.seller.totalReviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-pink-400" />
                      <span>{ad.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="text-purple-400" />
                      <span>{timeAgo(ad.timePosted)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>

                {/* Save Heart Icon */}
                <motion.button
                  onClick={() => toggleSave(ad.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full shadow-xl hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={saved.includes(ad.id) ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <FiHeart
                      className={`text-lg transition-colors ${
                        saved.includes(ad.id) 
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
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Amazing Deals 🚀
          </motion.button>
        </motion.div>
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

export default RecentAds;