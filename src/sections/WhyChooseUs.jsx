import { FaShieldAlt, FaBolt, FaTags, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock } from 'react-icons/fi';
const features = [
  {
    icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
    title: 'Safe & Secure',
    description: 'Every listing is verified to ensure a safe experience.',
  },
  {
    icon: <FaBolt className="text-purple-600 text-3xl" />,
    title: 'Instant Deals',
    description: 'Connect with buyers and sellers in real-time.',
  },
  {
    icon: <FaTags className="text-green-600 text-3xl" />,
    title: 'Best Prices',
    description: 'Thousands of listings to compare and choose from.',
  },
  {
    icon: <FaUsers className="text-yellow-500 text-3xl" />,
    title: 'Wide Community',
    description: 'Over 10 million users trust OLXpress daily.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Why Choose <span className="text-blue-600">OLXpress</span>?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We make buying and selling smoother, safer, and faster. Here’s why millions trust us.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
