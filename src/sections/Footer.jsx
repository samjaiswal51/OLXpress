import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const socialLinks = [
    { icon: FaFacebookF, color: "from-blue-600 to-blue-700", hoverColor: "hover:text-blue-400", name: "facebook" },
    { icon: FaTwitter, color: "from-sky-500 to-sky-600", hoverColor: "hover:text-sky-400", name: "twitter" },
    { icon: FaInstagram, color: "from-pink-500 to-purple-600", hoverColor: "hover:text-pink-400", name: "instagram" },
    { icon: FaLinkedin, color: "from-blue-700 to-blue-800", hoverColor: "hover:text-blue-300", name: "linkedin" }
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Help Center", href: "#" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.footer 
        ref={ref}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={containerVariants}
          >
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  OLXpress
                </h3>
                <p className="text-gray-300 text-lg max-w-md">
                  India's most trusted marketplace. Buy, sell, and connect with millions of users across the country.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="space-y-3"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5, color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaPhone className="w-4 h-4" />
                  <span className="text-sm">+91 1800-XXX-XXXX</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5, color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaEnvelope className="w-4 h-4" />
                  <span className="text-sm">support@olxpress.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5, color: "#60a5fa" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span className="text-sm">Mumbai, India</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Company Links */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 group-hover:w-4 transition-all duration-300"
                      />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h4 className="text-xl font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 group-hover:w-4 transition-all duration-300"
                      />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Social Media & Copyright */}
          <motion.div 
            className="border-t border-gray-700/50 pt-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Media */}
              <motion.div 
                className="flex items-center gap-6"
                variants={itemVariants}
              >
                <span className="text-gray-300 text-sm font-medium">Follow Us:</span>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href="#"
                        className={`relative w-10 h-10 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 ${social.hoverColor}`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360,
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        onHoverStart={() => setHoveredSocial(social.name)}
                        onHoverEnd={() => setHoveredSocial(null)}
                      >
                        <IconComponent className="w-5 h-5" />
                        <motion.div
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
                          animate={{ 
                            opacity: hoveredSocial === social.name ? 1 : 0,
                            y: hoveredSocial === social.name ? 0 : 5
                          }}
                        >
                          {social.name}
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Copyright */}
              <motion.div 
                className="text-center md:text-right"
                variants={itemVariants}
              >
                <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end gap-2">
                  Made with 
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaHeart className="text-red-500 w-4 h-4" />
                  </motion.span>
                  in India
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  © {new Date().getFullYear()} OLXpress. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 100
          }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      </motion.footer>
    </>
  );
};

export default Footer;