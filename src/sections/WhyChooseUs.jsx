// 📁 src/sections/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaTags, FaUsers, FaClock, FaCheckCircle, FaHandshake } from 'react-icons/fa';
import CountUp from 'react-countup';

const features = [
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: 'Safe & Secure',
    description: 'Every listing is verified for your protection.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: <FaBolt className="text-3xl" />,
    title: 'Instant Deals',
    description: 'Connect with buyers in real-time.',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: <FaTags className="text-3xl" />,
    title: 'Best Prices',
    description: 'Thousands of listings with unbeatable value.',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: <FaUsers className="text-3xl" />,
    title: 'Massive Reach',
    description: '10M+ users across India trust OLXpress.',
    color: 'from-yellow-300 to-yellow-500'
  },
];

const stats = [
  { icon: <FaClock />, label: 'Years Active', value: 18, suffix: '+', description: 'Serving India since 2006' },
  { icon: <FaUsers />, label: 'Users', value: 10, suffix: 'M+', description: 'Trusted buyers & sellers' },
  { icon: <FaTags />, label: 'Listings', value: 25, suffix: 'M+', description: 'Live classified listings' },
  { icon: <FaBolt />, label: 'Daily Deals', value: 15000, suffix: '+', description: 'New posts every day' },
];

const steps = [
  {
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    title: 'Post Your Ad',
    description: 'List your item in under 60 seconds – for free!',
  },
  {
    icon: <FaHandshake className="text-purple-500 text-2xl" />,
    title: 'Get Responses',
    description: 'Buyers contact you directly via chat or call.',
  },
  {
    icon: <FaBolt className="text-yellow-500 text-2xl" />,
    title: 'Close the Deal',
    description: 'Meet, negotiate, and make the sale happen fast.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Why Choose <span className="text-blue-600 dark:text-blue-400">OLXpress</span>?
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover what makes us India’s most trusted classifieds platform.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-white/40 dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition border-t-4 border-transparent hover:border-blue-400`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white rounded-full shadow-md`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl py-6 px-4 shadow hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                <CountUp end={stat.value} duration={2} />{stat.suffix}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default WhyChooseUs;
