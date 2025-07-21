// 📁 src/sections/WhyChooseUs.jsx
import { memo, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaBolt, 
  FaTags, 
  FaUsers, 
  FaRocket,
  FaGlobe,
  FaStar,
} from 'react-icons/fa';
import CountUp from 'react-countup';

// Memoized constants to prevent recreation on re-renders
const MAIN_FEATURES = [
  {
    id: 'secure',
    icon: <FaShieldAlt className="text-3xl" />,
    title: 'Ultra Secure',
    description: 'Advanced verification & fraud protection',
    color: 'from-blue-500 via-blue-600 to-indigo-700',
    bgColor: 'from-blue-50 to-indigo-100',
  },
  {
    id: 'fast',
    icon: <FaRocket className="text-3xl" />,
    title: 'Lightning Fast',
    description: 'AI-powered matching in 30 seconds',
    color: 'from-purple-500 via-purple-600 to-pink-700',
    bgColor: 'from-purple-50 to-pink-100',
  },
  {
    id: 'price',
    icon: <FaTags className="text-3xl" />,
    title: 'Best Prices',
    description: 'Smart pricing for maximum value',
    color: 'from-green-500 via-green-600 to-emerald-700',
    bgColor: 'from-green-50 to-emerald-100',
  },
  {
    id: 'reach',
    icon: <FaGlobe className="text-3xl" />,
    title: 'Pan-India Reach',
    description: '50M+ users across 500+ cities',
    color: 'from-orange-500 via-red-500 to-pink-600',
    bgColor: 'from-orange-50 to-red-100',
  },
];

const STATS = [
  { 
    id: 'users',
    icon: <FaUsers className="text-2xl" />, 
    label: 'Active Users', 
    value: 50, 
    suffix: 'M+', 
    description: 'Verified buyers & sellers',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'listings',
    icon: <FaTags className="text-2xl" />, 
    label: 'Live Listings', 
    value: 75, 
    suffix: 'M+', 
    description: 'Fresh items posted daily',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'deals',
    icon: <FaBolt className="text-2xl" />, 
    label: 'Daily Deals', 
    value: 25000, 
    suffix: '+', 
    description: 'New opportunities every day',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    id: 'success',
    icon: <FaStar className="text-2xl" />, 
    label: 'Success Rate', 
    value: 98, 
    suffix: '%', 
    description: 'Customer satisfaction score',
    color: 'from-purple-500 to-pink-500'
  },
];

// Optimized animation variants with reduced motion support
const createVariants = (prefersReducedMotion) => ({
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  },
  
  itemVariants: {
    hidden: { y: prefersReducedMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion 
        ? { duration: 0.3 }
        : {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
    }
  },
  
  cardHoverVariants: {
    hover: prefersReducedMotion 
      ? {}
      : {
          scale: 1.02,
          y: -4,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }
  },
  
  iconVariants: {
    hover: prefersReducedMotion
      ? {}
      : {
          scale: 1.1,
          rotate: 5,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10
          }
        }
  }
});

// Memoized Feature Card Component
const FeatureCard = memo(({ feature, index, variants }) => (
  <motion.div
    className="relative group cursor-pointer"
    variants={variants.itemVariants}
    whileHover="hover"
  >
    <motion.div
      className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full p-6"
      variants={variants.cardHoverVariants}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Icon */}
      <motion.div
        className={`relative w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white rounded-xl shadow-md`}
        variants={variants.iconVariants}
      >
        {feature.icon}
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h3 
          className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {feature.title}
        </motion.h3>
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        initial={false}
      />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </motion.div>
  </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

// Memoized Stats Card Component
const StatsCard = memo(({ stat, index, prefersReducedMotion }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ 
      duration: prefersReducedMotion ? 0.3 : 0.6, 
      delay: prefersReducedMotion ? 0 : index * 0.1,
      type: prefersReducedMotion ? "tween" : "spring"
    }}
    whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.01 }}
  >
    <motion.div 
      className="bg-white rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Floating Particle */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
          animate={{
            y: [0, -10, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      )}
      
      <motion.div
        className={`text-3xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.1,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }}
      >
        {stat.icon}
      </motion.div>
      
      <motion.h4 
        className="text-2xl font-bold text-gray-800 mb-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      >
        <CountUp end={stat.value} duration={2} />{stat.suffix}
      </motion.h4>
      
      <motion.p 
        className="text-sm font-medium text-gray-600 mb-1"
        whileHover={prefersReducedMotion ? {} : { color: "#3b82f6" }}
      >
        {stat.label}
      </motion.p>
      
      <p className="text-xs text-gray-500">
        {stat.description}
      </p>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
    </motion.div>
  </motion.div>
));

StatsCard.displayName = 'StatsCard';

// Memoized Background Animation Component
const BackgroundAnimation = memo(({ prefersReducedMotion }) => {
  // Generate random positions once and memoize
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

const WhyChooseUs = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation variants
  const variants = useMemo(() => createVariants(prefersReducedMotion), [prefersReducedMotion]);
  
  // Memoize transition configs
  const headerTransition = useMemo(() => ({
    duration: prefersReducedMotion ? 0.3 : 0.6,
    type: prefersReducedMotion ? "tween" : "spring",
    stiffness: 100
  }), [prefersReducedMotion]);

  return (
    <section className="relative py-16 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Simple Purple Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />

      {/* Animated Background Elements */}
      <BackgroundAnimation prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={headerTransition}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ scale: prefersReducedMotion ? 1 : 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Why Choose <span className="relative">
              OLXpress
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: 0.6 }}
              />
            </span>?
          </motion.h2>
          
          <motion.p
            className="text-white/80 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.6 }}
          >
            Experience the future of classified ads with cutting-edge technology and unmatched security.
          </motion.p>
        </motion.div>

        {/* Main Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={variants.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {MAIN_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              variants={variants}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-center text-white mb-8"
            initial={{ y: prefersReducedMotion ? 0 : 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Millions Across India
          </motion.h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <StatsCard
                key={stat.id}
                stat={stat}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';

export default WhyChooseUs;