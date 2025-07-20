// 📁 src/sections/DownloadApp.jsx
import { motion } from 'framer-motion';
import { FaGooglePlay, FaAppStoreIos, FaStar, FaBolt, FaBell, FaGift } from 'react-icons/fa';
import QRCode from 'react-qr-code';

const DownloadApp = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Download the <span className="text-blue-600 dark:text-blue-400">OLXpress</span> App
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Buy. Sell. Chat. Anytime, anywhere — faster on mobile.
          </p>

          {/* Features */}
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
            <li className="flex items-center gap-2">
              <FaGift className="text-green-500" /> Get ₹100 OLX Coins on first listing
            </li>
            <li className="flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Rated 4.8 ⭐ by 2M+ users
            </li>
            <li className="flex items-center gap-2">
              <FaBolt className="text-purple-500" /> 2x faster experience on the app
            </li>
            <li className="flex items-center gap-2">
              <FaBell className="text-blue-500" /> Instant alerts when someone messages you
            </li>
          </ul>

          {/* Store Buttons */}
          <div className="flex gap-4 mb-6">
            <a
              href="#"
              className="bg-black text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
            >
              <FaGooglePlay className="text-lg" /> Google Play
            </a>
            <a
              href="#"
              className="bg-black text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
            >
              <FaAppStoreIos className="text-lg" /> App Store
            </a>
          </div>

          {/* QR Code */}
          <div className="bg-white dark:bg-gray-700 p-4 w-fit rounded-xl shadow-md">
            <QRCode value="https://play.google.com/store/apps/details?id=com.olxindia" size={100} />
            <p className="text-xs mt-2 text-gray-500 text-center dark:text-gray-300">Scan to download</p>
          </div>
        </motion.div>

        {/* Right Content - Phone Mockup */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-[250px] mx-auto">
            <img
              src="https://cdn.dribbble.com/users/63407/screenshots/16789445/media/6ad4e4a5f49a9e54e1cc08405e4c38ee.png"
              alt="App Mockup"
              className="w-full h-auto rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700"
            />
            <div className="absolute -top-6 -right-6 bg-gradient-to-tr from-blue-400 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
              🎉 New Features!
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadApp;
