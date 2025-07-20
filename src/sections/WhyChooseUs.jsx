// 📁 src/sections/WhyChooseUs.jsx
import { motion } from 'framer-motion';
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

const mainFeatures = [
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: 'Ultra Secure',
    description: 'Advanced verification & fraud protection',
    color: 'from-blue-500 via-blue-600 to-indigo-700',
    bgColor: 'from-blue-50 to-indigo-100',
    darkBg: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: 'Lightning Fast',
    description: 'AI-powered matching in 30 seconds',
    color: 'from-purple-500 via-purple-600 to-pink-700',
    bgColor: 'from-purple-50 to-pink-100',
    darkBg: 'from-purple-900/20 to-pink-900/20'
  },
  {
    icon: <FaTags className="text-3xl" />,
    title: 'Best Prices',
    description: 'Smart pricing for maximum value',
    color: 'from-green-500 via-green-600 to-emerald-700',
    bgColor: 'from-green-50 to-emerald-100',
    darkBg: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: <FaGlobe className="text-3xl" />,
    title: 'Pan-India Reach',
    description: '50M+ users across 500+ cities',
    color: 'from-orange-500 via-red-500 to-pink-600',
    bgColor: 'from-orange-50 to-red-100',
    darkBg: 'from-orange-900/20 to-red-900/20'
  },
];

const stats = [
  { 
    icon: <FaUsers className="text-2xl" />, 
    label: 'Active Users', 
    value: 50, 
    suffix: 'M+', 
    description: 'Verified buyers & sellers',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: <FaTags className="text-2xl" />, 
    label: 'Live Listings', 
    value: 75, 
    suffix: 'M+', 
    description: 'Fresh items posted daily',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    icon: <FaBolt className="text-2xl" />, 
    label: 'Daily Deals', 
    value: 25000, 
    suffix: '+', 
    description: 'New opportunities every day',
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    icon: <FaStar className="text-2xl" />, 
    label: 'Success Rate', 
    value: 98, 
    suffix: '%', 
    description: 'Customer satisfaction score',
    color: 'from-purple-500 to-pink-500'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const WhyChooseUs = () => {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/15 to-purple-100/15 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Why Choose <span className="relative">
              OLXpress
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
            </span>?
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience the future of classified ads with cutting-edge technology and unmatched security.
          </motion.p>
        </motion.div>

        {/* Main Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative group cursor-pointer`}
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className={`relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 overflow-hidden h-full`}
                variants={cardHoverVariants}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} dark:bg-gradient-to-br dark:${feature.darkBg} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: 'linear-gradient(45deg, transparent, transparent)' }}
                  whileHover={{ 
                    background: [
                      'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                      'linear-gradient(135deg, transparent, rgba(147, 51, 234, 0.3), transparent)',
                      'linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                      'linear-gradient(315deg, transparent, rgba(147, 51, 234, 0.3), transparent)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Icon */}
                <motion.div
                  className={`relative w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                  variants={iconVariants}
                >
                  {feature.icon}
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.h3 
                    className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={false}
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Millions Across India
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md border border-white/30 dark:border-gray-700/30 group-hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                >
                  {/* Floating Particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                  
                  <motion.div
                    className={`text-3xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, 0] 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      rotate: { duration: 0.5 }
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.h4 
                    className="text-2xl font-bold text-gray-800 dark:text-white mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <CountUp end={stat.value} duration={2.5} />{stat.suffix}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
                    whileHover={{ color: "#3b82f6" }}
                  >
                    {stat.label}
                  </motion.p>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>

                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-blue-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;