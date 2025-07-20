import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiClock, FiHeart, FiSearch } from "react-icons/fi";

// Dynamically import all images in /assets/recents
const imageModules = import.meta.glob("/src/assets/recents/*.{jpg,jpeg,png}", {
  eager: true,
});

const getImageUrl = (relativePath) => {
  const match = Object.entries(imageModules).find(([path]) =>
    path.includes(relativePath)
  );
  return match ? match[1].default : "";
};

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

const RecentAds = () => {
  const [saved, setSaved] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [location, setLocation] = useState("All India");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleSave = (id) => {
    const updated = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(updated);
  };

  const timeAgo = (time) => {
    const diff = Math.floor((Date.now() - time.getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const discountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const filteredAds = ads.filter(
    (ad) => selectedCategory === "All" || ad.category === selectedCategory
  );

  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.seller.rating - a.seller.rating;
    return b.timePosted - a.timePosted;
  });

  const adsToShow = sortedAds.slice(0, visibleCount);

  const nextImage = (adId) => {
    const ad = ads.find((a) => a.id === adId);
    if (!ad) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [adId]: ((prev[adId] || 0) + 1) % ad.imageUrls.length,
    }));
  };

  const prevImage = (adId) => {
    const ad = ads.find((a) => a.id === adId);
    if (!ad) return;

    setCurrentImageIndex((prev) => ({
      ...prev,
      [adId]:
        ((prev[adId] || 0) - 1 + ad.imageUrls.length) % ad.imageUrls.length,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const categories = ["All", "Electronics", "Vehicles", "Fashion", "Home"];

  return (
    <section className="relative py-16 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Simple Purple Background - Matching FeaturedListings */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

      {/* Animated Background Elements - Matching FeaturedListings */}
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
        {/* Header Section - Matching FeaturedListings */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
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

        {/* Ads Grid - Cards without Glassmorphism, matching FeaturedListings */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {adsToShow.map((ad, index) => (
              <motion.div
                key={ad.id}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500"
                whileHover={{ y: -15, scale: 1.03 }}
                layout
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={getImageUrl(
                      ad.imageUrls[currentImageIndex[ad.id] || 0]
                    )}
                    alt={ad.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-115"
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

                  {/* Category Badge - Matching FeaturedListings */}
                  <motion.div
                    className="absolute top-3 left-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {ad.category}
                    </span>
                  </motion.div>

                  {/* Additional Badges */}
                  <div className="absolute top-3 right-14 flex flex-col gap-1">
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
                        className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-2 py-1 text-xs rounded-full font-semibold shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        ✓
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

                {/* Content - Matching FeaturedListings structure */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {ad.title}
                  </h3>

                  <div className="mb-4">
                    <motion.span
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600"
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

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-purple-400" />
                      <span>{ad.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="text-indigo-400" />
                      <span>{timeAgo(ad.timePosted)}</span>
                    </div>
                  </div>

                  {/* Action Button - Matching FeaturedListings */}
                  <motion.button
                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>

                {/* Save Heart Icon - Matching FeaturedListings */}
                <motion.button
                  onClick={() => toggleSave(ad.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full shadow-xl hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={
                      saved.includes(ad.id) ? { scale: [1, 1.3, 1] } : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <FiHeart
                      className={`text-lg transition-colors ${
                        saved.includes(ad.id)
                          ? "text-red-400 fill-current"
                          : "text-gray-600 hover:text-red-400"
                      }`}
                    />
                  </motion.div>
                </motion.button>

                {/* Hover Glow Effect - Matching FeaturedListings */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button - Matching FeaturedListings */}
        {visibleCount < sortedAds.length && (
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
                Load More Ads
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FiSearch className="text-lg" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.button>
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
