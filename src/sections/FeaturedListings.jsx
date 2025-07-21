import { useState, useMemo, useCallback } from 'react';
import { FiMapPin, FiClock, FiHeart, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Constants moved outside for better performance
const IMAGES = import.meta.glob('/src/assets/featured/*.{jpg,png,jpeg}', { eager: true });

const ALL_LISTINGS = [
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

const CATEGORIES = ['All', 'Mobiles', 'Cars', 'Furniture', 'Electronics', 'Properties', 'Bikes'];

const LOAD_INCREMENT = 6;

// Background elements configuration
const BACKGROUND_ELEMENTS = Array(8).fill(null).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 12 + Math.random() * 6,
  delay: i * 0.7
}));

// Animation variants for better performance
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Memoized image resolver
const getImageSrc = (imageName) => {
  const imagePath = Object.keys(IMAGES).find((path) =>
    path.includes(imageName)
  );
  return imagePath ? IMAGES[imagePath].default : '';
};

const FeaturedListings = () => {
  const [state, setState] = useState({
    selectedCategory: 'All',
    priceRange: { min: '', max: '' },
    favorites: [],
    visibleCount: LOAD_INCREMENT,
    searchTerm: ''
  });

  // Optimized handlers using useCallback
  const handleSave = useCallback((id) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) 
        ? prev.favorites.filter(f => f !== id) 
        : [...prev.favorites, id]
    }));
  }, []);

  const handleLoadMore = useCallback(() => {
    setState(prev => ({
      ...prev,
      visibleCount: prev.visibleCount + LOAD_INCREMENT
    }));
  }, []);

  // Memoized filtered listings for performance
  const filteredListings = useMemo(() => {
    return ALL_LISTINGS.filter((item) => {
      const matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory;
      const matchesMin = state.priceRange.min === '' || item.price >= parseInt(state.priceRange.min);
      const matchesMax = state.priceRange.max === '' || item.price <= parseInt(state.priceRange.max);
      const matchesSearch = item.title.toLowerCase().includes(state.searchTerm.toLowerCase());
      return matchesCategory && matchesMin && matchesMax && matchesSearch;
    });
  }, [state.selectedCategory, state.priceRange, state.searchTerm]);

  const listingsToShow = useMemo(() => {
    return filteredListings.slice(0, state.visibleCount);
  }, [filteredListings, state.visibleCount]);

  // Memoized background elements
  const backgroundElements = useMemo(() => 
    BACKGROUND_ELEMENTS.map((element) => (
      <motion.div
        key={element.id}
        className="absolute w-32 h-32 bg-white/5 rounded-full blur-2xl will-change-transform"
        style={{
          left: `${element.left}%`,
          top: `${element.top}%`,
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.4, 0.7, 1],
        }}
        transition={{
          duration: element.duration,
          repeat: Infinity,
          delay: element.delay,
        }}
      />
    )), []
  );

  // Memoized listing cards
  const listingCards = useMemo(() => 
    listingsToShow.map((item) => (
      <ListingCard
        key={item.id}
        item={item}
        isFavorite={state.favorites.includes(item.id)}
        onToggleFavorite={handleSave}
      />
    )), [listingsToShow, state.favorites, handleSave]
  );

  return (
    <section className="relative py-16 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements}
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

        {/* Listings Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            key={state.selectedCategory} // Force re-animation on category change
          >
            {listingCards}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {state.visibleCount < filteredListings.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={handleLoadMore}
              className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-2xl border border-white/30 transform transition-all duration-300 overflow-hidden group backdrop-blur-md will-change-transform"
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
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Memoized ListingCard component for better performance
const ListingCard = ({ item, isFavorite, onToggleFavorite }) => {
  const imageSrc = useMemo(() => getImageSrc(item.image), [item.image]);

  const handleFavoriteClick = useCallback(() => {
    onToggleFavorite(item.id);
  }, [item.id, onToggleFavorite]);

  return (
    <motion.div
      variants={CARD_VARIANTS}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 will-change-transform"
      whileHover={{ y: -15, scale: 1.03 }}
      layout
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-115 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <motion.div 
          className="absolute top-3 left-3 will-change-transform" 
          whileHover={{ scale: 1.1 }}
        >
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
            {item.category}
          </span>
        </motion.div>

        {/* Favorite Button */}
        <motion.button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full shadow-xl hover:bg-white transition-all duration-300 will-change-transform"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <FiHeart
              className={`text-lg transition-colors ${
                isFavorite
                  ? 'text-red-400 fill-current'
                  : 'text-gray-600 hover:text-red-400'
              }`}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {item.title}
        </h3>
        
        <div className="mb-4">
          <motion.span 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 will-change-transform" 
            whileHover={{ scale: 1.05 }}
          >
            ₹{item.price.toLocaleString('en-IN')}
          </motion.span>
        </div>
        
        {/* Location and Time */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FiMapPin className="text-purple-400 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="text-indigo-400 flex-shrink-0" />
            <span className="whitespace-nowrap">{item.time}</span>
          </div>
        </div>
        
        {/* View Details Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 will-change-transform"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </motion.button>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
};

export default FeaturedListings;