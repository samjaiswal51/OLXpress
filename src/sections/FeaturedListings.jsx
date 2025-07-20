import { useState } from 'react';
import { FiMapPin, FiClock, FiHeart, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const images = import.meta.glob('/src/assets/featured/*.{jpg,png,jpeg}', { eager: true });

const allListings = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max 128GB',
    price: 92000,
    location: 'Delhi',
    time: '2 hours ago',
    image: 'iphone.jpg',
    category: 'Mobiles',
  },
  {
    id: 2,
    title: 'Honda City 2020',
    price: 850000,
    location: 'Mumbai',
    time: '1 day ago',
    image: 'bike.jpg',
    category: 'Cars',
  },
  {
    id: 3,
    title: 'Sofa Set (5 Seater)',
    price: 12000,
    location: 'Bangalore',
    time: '3 hours ago',
    image: 'sofa.jpg',
    category: 'Furniture',
  },
  {
    id: 4,
    title: 'Samsung 55" Smart TV',
    price: 34500,
    location: 'Hyderabad',
    time: '4 days ago',
    image: 'smartTv.jpg',
    category: 'Electronics',
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-16 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Listing
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover amazing deals and find exactly what you're looking for
          </p>
        </motion.div>

        {/* Listings */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {listingsToShow.map((item) => {
              const imagePath = Object.keys(images).find((path) =>
                path.includes(item.image)
              );
              const imageSrc = imagePath ? images[imagePath].default : '';

              return (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500"
                  whileHover={{ y: -15, scale: 1.03 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={imageSrc}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-115"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <motion.div className="absolute top-3 left-3" whileHover={{ scale: 1.1 }}>
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </motion.div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="mb-4">
                      <motion.span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600" whileHover={{ scale: 1.05 }}>
                        ₹{item.price.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiMapPin className="text-purple-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-indigo-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <motion.button
                      className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>

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
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-2xl border border-white/30 transform transition-all duration-300 overflow-hidden group backdrop-blur-md"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More Listings
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <FiSearch className="text-lg" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
