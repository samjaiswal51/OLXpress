import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiClock, FiHeart, FiSearch } from "react-icons/fi";

// Optimized image loading with error handling and preloading
const imageCache = new Map();

const getImageUrl = (relativePath) => {
  if (imageCache.has(relativePath)) {
    return imageCache.get(relativePath);
  }
  
  // Use your actual image path structure
  const imageUrl = `/src/assets/recents/${relativePath}`;
  imageCache.set(relativePath, imageUrl);
  return imageUrl;
};

// Static data - moved outside component to prevent recreation
const ads = [
  {
    id: 1,
    title: "Apple iPad Air 5th Gen - Like New",
    price: 42000,
    originalPrice: 54900,
    location: "Delhi, India",
    timePosted: new Date(Date.now() - 10 * 60 * 1000),
    imageUrls: ["iPad.jpg"],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: "Rahul Kumar",
      rating: 4.8,
      totalReviews: 156,
    },
    category: "Electronics",
    condition: "Like New",
    description: "10.9-inch display, A14 Bionic chip, 256GB storage",
  },
  {
    id: 2,
    title: "Bajaj Avenger Cruise 220cc - 2019",
    price: 82000,
    originalPrice: 95000,
    location: "Mumbai, India",
    timePosted: new Date(Date.now() - 2 * 60 * 60 * 1000),
    imageUrls: ["HondaBike.jpg"],
    isVerified: false,
    isUrgent: true,
    seller: {
      name: "Amit Sharma",
      rating: 4.2,
      totalReviews: 89,
    },
    category: "Vehicles",
    condition: "Good",
    description: "Well maintained, single owner, all papers clear",
  },
  {
    id: 3,
    title: 'LG Smart TV 43" 4K Ultra HD',
    price: 21000,
    originalPrice: 35000,
    location: "Bangalore, India",
    timePosted: new Date(Date.now() - 24 * 60 * 60 * 1000),
    imageUrls: ["lgTv.jpg"],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: "Priya Patel",
      rating: 4.9,
      totalReviews: 234,
    },
    category: "Electronics",
    condition: "Excellent",
    description: "WebOS, HDR support, barely used",
  },
  {
    id: 4,
    title: "iPhone 13 Pro Max 128GB Brand New ",
    price: 75000,
    originalPrice: 89000,
    location: "Pune, India",
    timePosted: new Date(Date.now() - 3 * 60 * 60 * 1000),
    imageUrls: ["Apple13.jpg"],
    isVerified: true,
    isUrgent: false,
    seller: {
      name: "Vikash Singh",
      rating: 4.7,
      totalReviews: 178,
    },
    category: "Electronics",
    condition: "Like New",
    description: "Box packed, all accessories included",
  },
];

// Constants moved outside component
const CATEGORIES = ["All", "Electronics", "Vehicles", "Fashion", "Home"];
const LOAD_INCREMENT = 6;
const ANIMATION_DURATION = 0.5;

// Optimized animation variants with reduced complexity
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Reduced from 50
    scale: 0.95, // Reduced from 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3, // Reduced from 0.5
      ease: "easeOut",
    },
  },
};

// Memoized Image Component
const OptimizedImage = ({ src, alt, className, onLoad, onError }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
    onLoad={onLoad}
    onError={onError}
    style={{ contentVisibility: 'auto' }}
  />
);

// Memoized Ad Card Component
const AdCard = ({ ad, saved, onToggleSave, currentImageIndex, onNextImage, onPrevImage }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Memoized calculations
  const discountPercentage = useMemo(() => {
    if (!ad.originalPrice) return 0;
    return Math.round(((ad.originalPrice - ad.price) / ad.originalPrice) * 100);
  }, [ad.originalPrice, ad.price]);

  const timeAgo = useMemo(() => {
    const diff = Math.floor((Date.now() - ad.timePosted.getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  }, [ad.timePosted]);

  const isNew = useMemo(() => 
    Date.now() - ad.timePosted.getTime() < 60 * 60 * 1000,
    [ad.timePosted]
  );

  const currentImg = useMemo(() => 
    getImageUrl(ad.imageUrls[currentImageIndex[ad.id] || 0]),
    [ad.imageUrls, currentImageIndex, ad.id]
  );

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      layout
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <OptimizedImage
          src={currentImg}
          alt={ad.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Optimized Image Navigation */}
        {ad.imageUrls.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onPrevImage(ad.id)}
              className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors duration-200"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={() => onNextImage(ad.id)}
              className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors duration-200"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}

        {/* Optimized Badges */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
            {ad.category}
          </span>
        </div>

        <div className="absolute top-3 right-14 flex flex-col gap-1">
          {isNew && (
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
              New
            </span>
          )}
          {ad.isVerified && (
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md">
              ✓
            </span>
          )}
          {ad.isUrgent && (
            <span className="bg-gradient-to-r from-red-400 to-red-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-md animate-pulse">
              Urgent
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 text-xs rounded-full font-semibold">
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
          {ad.title}
        </h3>

        <div className="mb-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
            ₹{ad.price.toLocaleString()}
          </span>
          {ad.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{ad.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FiMapPin className="text-purple-400 flex-shrink-0" />
            <span className="truncate">{ad.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="text-indigo-400 flex-shrink-0" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
          View Details
        </button>
      </div>

      {/* Save Heart Icon */}
      <button
        onClick={() => onToggleSave(ad.id)}
        className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-110"
        aria-label={saved.includes(ad.id) ? "Remove from saved" : "Add to saved"}
      >
        <FiHeart
          className={`text-lg transition-colors duration-300 ${
            saved.includes(ad.id)
              ? "text-red-500 fill-current"
              : "text-gray-600 hover:text-red-400"
          }`}
        />
      </button>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
};

const RecentAds = () => {
  const [saved, setSaved] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [location, setLocation] = useState("All India");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [visibleCount, setVisibleCount] = useState(LOAD_INCREMENT);

  // Optimized callbacks with useCallback
  const toggleSave = useCallback((id) => {
    setSaved(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const nextImage = useCallback((adId) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) + 1) % ad.imageUrls.length,
    }));
  }, []);

  const prevImage = useCallback((adId) => {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    setCurrentImageIndex(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) - 1 + ad.imageUrls.length) % ad.imageUrls.length,
    }));
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + LOAD_INCREMENT);
  }, []);

  // Memoized filtered and sorted ads
  const sortedAds = useMemo(() => {
    const filtered = ads.filter(
      ad => selectedCategory === "All" || ad.category === selectedCategory
    );

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "rating":
          return b.seller.rating - a.seller.rating;
        default:
          return b.timePosted - a.timePosted;
      }
    });
  }, [selectedCategory, sortBy]);

  const adsToShow = useMemo(() => 
    sortedAds.slice(0, visibleCount),
    [sortedAds, visibleCount]
  );

  // Preload next batch of images
  useEffect(() => {
    const nextBatch = sortedAds.slice(visibleCount, visibleCount + LOAD_INCREMENT);
    nextBatch.forEach(ad => {
      const img = new Image();
      img.src = getImageUrl(ad.imageUrls[0]);
    });
  }, [sortedAds, visibleCount]);

  return (
    <section className="relative py-16 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

      {/* Reduced Background Elements for Performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/3 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 25}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent Ads
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Fresh listings from verified sellers across India
          </p>
        </motion.div>

        {/* Ads Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${sortBy}`}
          >
            {adsToShow.map(ad => (
              <AdCard
                key={ad.id}
                ad={ad}
                saved={saved}
                onToggleSave={toggleSave}
                currentImageIndex={currentImageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleCount < sortedAds.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={loadMore}
              className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-2xl border border-white/20 transform transition-all duration-300 overflow-hidden group backdrop-blur-md hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More Ads
                <FiSearch className="text-lg" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </motion.div>
        )}
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