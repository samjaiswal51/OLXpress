import { useState } from 'react';
import { FiMapPin, FiClock, FiHeart, FiSearch, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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
  {
    id: 5,
    title: '2 BHK Flat for Rent',
    price: 22000,
    location: 'Pune',
    time: '6 hours ago',
    image: 'https://images.olx.in/thumbnails/295512345-800x600.webp',
    category: 'Properties',
  },
  {
    id: 6,
    title: 'MacBook Air M2',
    price: 115000,
    location: 'Chennai',
    time: '5 hours ago',
    image: 'https://images.olx.in/thumbnails/295512346-800x600.webp',
    category: 'Electronics',
  },
  {
    id: 7,
    title: 'Royal Enfield Classic 350',
    price: 180000,
    location: 'Kolkata',
    time: '1 hour ago',
    image: 'https://images.olx.in/thumbnails/295512347-800x600.webp',
    category: 'Bikes',
  },
  {
    id: 8,
    title: 'Gaming Chair RGB',
    price: 8500,
    location: 'Ahmedabad',
    time: '8 hours ago',
    image: 'https://images.olx.in/thumbnails/295512348-800x600.webp',
    category: 'Furniture',
  },
];

const categories = ['All', 'Mobiles', 'Cars', 'Furniture', 'Electronics', 'Properties', 'Bikes'];

const FeaturedListings = () => {
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
    <section className="relative py-20 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Featured Listings
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing deals and find exactly what you're looking for
          </p>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-10 shadow-lg border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
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
                className="w-24 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <input
                type="number"
                placeholder="Max ₹"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-24 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
          <span className="text-gray-600 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
            Found {filtered.length} listings
          </span>
        </motion.div>

        {/* Listings Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {listingsToShow.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -10, scale: 1.02 }}
                layout
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-green-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="text-green-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>

                {/* Save Heart Icon */}
                <motion.button
                  onClick={() => handleSave(item.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={favorites.includes(item.id) ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <FiHeart
                      className={`text-xl transition-colors ${
                        favorites.includes(item.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    />
                  </motion.div>
                </motion.button>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
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
              className="relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Load More Listings</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
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

export default FeaturedListings;