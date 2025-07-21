import { motion, useInView } from 'framer-motion';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
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
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Memoized data to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    { 
      icon: FaFacebookF, 
      color: "from-blue-600 to-blue-700", 
      hoverColor: "hover:text-blue-400", 
      name: "Facebook",
      href: "https://facebook.com" 
    },
    { 
      icon: FaTwitter, 
      color: "from-sky-500 to-sky-600", 
      hoverColor: "hover:text-sky-400", 
      name: "Twitter",
      href: "https://twitter.com" 
    },
    { 
      icon: FaInstagram, 
      color: "from-pink-500 to-purple-600", 
      hoverColor: "hover:text-pink-400", 
      name: "Instagram",
      href: "https://instagram.com" 
    },
    { 
      icon: FaLinkedin, 
      color: "from-blue-700 to-blue-800", 
      hoverColor: "hover:text-blue-300", 
      name: "LinkedIn",
      href: "https://linkedin.com" 
    }
  ], []);

  const companyLinks = useMemo(() => [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Help Center", href: "/help" }
  ], []);

  const legalLinks = useMemo(() => [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" }
  ], []);

  // Optimized animation variants with reduced complexity
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
        ease: "easeOut"
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  const floatingBubbleVariants = useMemo(() => ({
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized scroll handler with throttling
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Throttled scroll listener for scroll-to-top button
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 300);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized social hover handlers
  const handleSocialHover = useCallback((socialName) => {
    setHoveredSocial(socialName);
  }, []);

  const handleSocialLeave = useCallback(() => {
    setHoveredSocial(null);
  }, []);

  // Memoized current year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <motion.footer 
        ref={ref}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Optimized Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
            variants={floatingBubbleVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/15 to-blue-500/15 rounded-full blur-3xl"
            variants={floatingBubbleVariants}
            animate="animate"
            transition={{ delay: 1 }}
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
              <div>
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  OLXpress
                </motion.h3>
                <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                  India's most trusted marketplace. Buy, sell, and connect with millions of users across the country.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  { icon: FaPhone, text: "+91 1800-XXX-XXXX" },
                  { icon: FaEnvelope, text: "support@olxpress.com" },
                  { icon: FaMapMarkerAlt, text: "Mumbai, India" }
                ].map(({ icon: Icon, text }, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                    whileHover={{ x: 3, color: "#60a5fa" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
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
                    key={link.name}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 group-hover:w-3 transition-all duration-300"
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
                    key={link.name}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-2 group-hover:w-3 transition-all duration-300"
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
              <div className="flex items-center gap-6">
                <span className="text-gray-300 text-sm font-medium">Follow Us:</span>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        className={`relative w-10 h-10 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 ${social.hoverColor}`}
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => handleSocialHover(social.name)}
                        onHoverEnd={handleSocialLeave}
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <IconComponent className="w-5 h-5" />
                        {hoveredSocial === social.name && (
                          <motion.div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {social.name}
                          </motion.div>
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end gap-2">
                  Made with 
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaHeart className="text-red-500 w-4 h-4" />
                  </motion.span>
                  in India
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  © {currentYear} OLXpress. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg z-50 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 100
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-label="Scroll to top"
        style={{
          display: showScrollTop ? 'flex' : 'none'
        }}
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </>
  );
};

export default Footer;