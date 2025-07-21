import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef, useMemo, useCallback, memo } from 'react';
import { 
  FaGooglePlay, 
  FaAppStoreIos, 
  FaStar, 
  FaBolt, 
  FaBell, 
  FaGift,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaMobile,
  FaQrcode,
  FaDownload,
  FaHeart,
  FaTrophy,
  FaFireAlt
} from 'react-icons/fa';

// Memoized constants to prevent recreation
const FEATURES = [
  {
    id: 'bonus',
    icon: FaGift,
    title: "Welcome Bonus",
    description: "Get ₹100 OLX Coins on first listing",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-500"
  },
  {
    id: 'rated',
    icon: FaStar,
    title: "Top Rated",
    description: "4.8⭐ rating from 2M+ users",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-500"
  },
  {
    id: 'fast',
    icon: FaBolt,
    title: "Lightning Fast",
    description: "2x faster than web version",
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-500"
  },
  {
    id: 'alerts',
    icon: FaBell,
    title: "Smart Alerts",
    description: "Instant notifications for messages",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-500"
  },
  {
    id: 'secure',
    icon: FaShieldAlt,
    title: "Secure Chat",
    description: "End-to-end encrypted messaging",
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-500"
  },
  {
    id: 'ai',
    icon: FaRocket,
    title: "AI-Powered",
    description: "Smart recommendations & pricing",
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-500"
  }
];

const STATS = [
  { id: 'users', icon: FaUsers, value: "10M+", label: "Active Users" },
  { id: 'listings', icon: FaFireAlt, value: "50K+", label: "Daily Listings" },
  { id: 'rank', icon: FaTrophy, value: "#1", label: "Marketplace App" }
];

const SAMPLE_ITEMS = [
  { id: 1, title: "iPhone 14 Pro", price: "₹89,999", image: "📱" },
  { id: 2, title: "Gaming Laptop", price: "₹75,000", image: "💻" },
  { id: 3, title: "Royal Enfield", price: "₹1,80,000", image: "🏍️" }
];

// Memoized Background Animation Component
const BackgroundAnimation = memo(({ prefersReducedMotion }) => {
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })), []
  );

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-32 h-32 bg-white/3 rounded-full blur-2xl"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-32 h-32 bg-white/5 rounded-full blur-2xl"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.id * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

// Memoized Stats Component
const StatsSection = memo(({ stats, prefersReducedMotion }) => (
  <div className="flex gap-8">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.id}
        className="text-center"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-2 mx-auto">
          <stat.icon className="w-6 h-6" />
        </div>
        <div className="text-2xl font-bold text-white">{stat.value}</div>
        <div className="text-sm text-white/70">{stat.label}</div>
      </motion.div>
    ))}
  </div>
));

StatsSection.displayName = 'StatsSection';

// Memoized Feature Card Component
const FeatureCard = memo(({ feature, index, activeFeature, onFeatureChange, prefersReducedMotion }) => {
  const IconComponent = feature.icon;
  const isActive = activeFeature === index;

  const handleClick = useCallback(() => {
    onFeatureChange(index);
  }, [index, onFeatureChange]);

  const handleHover = useCallback(() => {
    onFeatureChange(index);
  }, [index, onFeatureChange]);

  return (
    <motion.div
      className={`p-4 rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-white/20 backdrop-blur-md shadow-lg scale-105'
          : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
      }`}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(255,255,255,0.2)"
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onClick={handleClick}
      onHoverStart={handleHover}
    >
      <div className="flex items-start gap-3">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${feature.bgColor}`}
          whileHover={prefersReducedMotion ? {} : { rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <IconComponent className="w-5 h-5" />
        </motion.div>
        <div>
          <h4 className="font-semibold text-white text-sm">
            {feature.title}
          </h4>
          <p className="text-white/70 text-xs mt-1">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Memoized Download Button Component
const DownloadButton = memo(({ platform, icon: Icon, hoveredButton, onHover, onHoverEnd, prefersReducedMotion }) => {
  const isGoogle = platform === 'google';
  const gradientClass = isGoogle 
    ? "from-green-500 to-blue-500" 
    : "from-purple-500 to-pink-500";

  return (
    <motion.a
      href="#"
      className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-medium text-lg transition-all duration-300"
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        initial={false}
      />
      <Icon className="w-6 h-6 relative z-10 group-hover:text-white" />
      <span className="relative z-10 group-hover:text-white">
        {isGoogle ? 'Google Play' : 'App Store'}
      </span>
      <motion.div
        className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={hoveredButton === platform ? { x: 0 } : { x: 10 }}
      >
        <FaDownload className="w-4 h-4 text-white" />
      </motion.div>
    </motion.a>
  );
});

DownloadButton.displayName = 'DownloadButton';

// Memoized Phone Mockup Component
const PhoneMockup = memo(({ prefersReducedMotion }) => (
  <div className="relative flex justify-center">
    <div className="relative">
      {/* Phone Frame */}
      <motion.div
        className="relative w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl"
        whileHover={prefersReducedMotion ? {} : { 
          rotateY: 3,
          rotateX: 3,
          scale: 1.01
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="bg-gray-100 h-6 flex items-center justify-between px-6 text-xs font-medium text-gray-700">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-6 h-3 border border-gray-400 rounded-sm">
                <div className="w-4 h-full bg-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900">OLXpress</h3>
                <p className="text-sm text-gray-600">Buy & Sell Instantly</p>
              </div>
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FaHeart className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
            <div className="space-y-3">
              {SAMPLE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                    <p className="text-green-600 font-bold text-sm">{item.price}</p>
                  </div>
                  <motion.button 
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    Chat
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
      </motion.div>

      {/* Floating Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-8 -right-8 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg"
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎉 New Features!
          </motion.div>

          <motion.div
            className="absolute -bottom-8 -left-8 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg"
            animate={{
              x: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⚡ Lightning Fast
          </motion.div>

          {/* Background Decoration */}
          <motion.div
            className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
    </div>
  </div>
));

PhoneMockup.displayName = 'PhoneMockup';

const DownloadApp = memo(() => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  // Memoized callbacks
  const handleFeatureChange = useCallback((index) => {
    setActiveFeature(index);
  }, []);

  const handleGoogleHover = useCallback(() => {
    setHoveredButton('google');
  }, []);

  const handleAppleHover = useCallback(() => {
    setHoveredButton('apple');
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredButton(null);
  }, []);

  const toggleQR = useCallback(() => {
    setShowQR(prev => !prev);
  }, []);

  // Memoized animation variants
  const variants = useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.2,
          duration: 0.6
        }
      }
    },
    itemVariants: {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0.3 : 0.6, ease: "easeOut" }
      }
    },
    phoneVariants: {
      hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: prefersReducedMotion ? 0.3 : 0.8, ease: "easeOut" }
      }
    }
  }), [prefersReducedMotion]);

  return (
    <section 
      ref={ref}
      className="relative py-24 overflow-hidden min-h-screen"
    >
      {/* Matching Purple Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

      {/* Animated Background Elements */}
      <BackgroundAnimation prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          variants={variants.containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={variants.itemVariants} className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <FaMobile className="w-4 h-4" />
                Mobile App Available
              </motion.div>
              
              <motion.h2 
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                variants={variants.itemVariants}
              >
                Download the{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  OLXpress
                </span>{" "}
                App
              </motion.h2>
              
              <motion.p 
                className="text-xl text-white/80 leading-relaxed"
                variants={variants.itemVariants}
              >
                Experience the fastest way to buy and sell. Join millions of users who trust OLXpress for their marketplace needs.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div variants={variants.itemVariants}>
              <StatsSection stats={STATS} prefersReducedMotion={prefersReducedMotion} />
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-4"
              variants={variants.itemVariants}
            >
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  activeFeature={activeFeature}
                  onFeatureChange={handleFeatureChange}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>

            {/* Download Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={variants.itemVariants}
            >
              <DownloadButton
                platform="google"
                icon={FaGooglePlay}
                hoveredButton={hoveredButton}
                onHover={handleGoogleHover}
                onHoverEnd={handleHoverEnd}
                prefersReducedMotion={prefersReducedMotion}
              />
              <DownloadButton
                platform="apple"
                icon={FaAppStoreIos}
                hoveredButton={hoveredButton}
                onHover={handleAppleHover}
                onHoverEnd={handleHoverEnd}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>

            {/* QR Code Section */}
            <motion.div 
              className="flex items-center gap-4"
              variants={variants.itemVariants}
            >
              <motion.button
                onClick={toggleQR}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <FaQrcode className="w-5 h-5" />
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </motion.button>
              
              <motion.div
                initial={false}
                animate={{ opacity: showQR ? 1 : 0, scale: showQR ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20"
                style={{ display: showQR ? 'block' : 'none' }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaQrcode className="w-12 h-12 text-white" />
                </div>
                <p className="text-xs mt-2 text-white/70 text-center">Scan to download</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div variants={variants.phoneVariants}>
            <PhoneMockup prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

DownloadApp.displayName = 'DownloadApp';

export default DownloadApp;