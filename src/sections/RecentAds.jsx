// 📁 src/sections/RecentAds.jsx
import { useEffect, useState } from 'react';
import { FiMapPin, FiClock, FiHeart, FiShare2, FiRefreshCw, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ads = [
  {
    id: 1,
    title: 'Apple iPad Air 5th Gen',
    price: 42000,
    location: 'Delhi',
    timePosted: new Date(Date.now() - 10 * 60 * 1000), // 10 mins ago
    imageUrls: [
      'https://images.olx.in/thumbnails/295312334-800x600.webp',
      'https://images.olx.in/thumbnails/295312335-800x600.webp'
    ],
    isVerified: true,
    isUrgent: false
  },
  {
    id: 2,
    title: 'Bajaj Avenger Cruise 220cc',
    price: 82000,
    location: 'Mumbai',
    timePosted: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    imageUrls: [
      'https://images.olx.in/thumbnails/295389214-800x600.webp'
    ],
    isVerified: false,
    isUrgent: true
  },
  {
    id: 3,
    title: 'LG Smart TV 42 inch',
    price: 21000,
    location: 'Bangalore',
    timePosted: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    imageUrls: [
      'https://images.olx.in/thumbnails/295315234-800x600.webp'
    ],
    isVerified: true,
    isUrgent: false
  }
];

const RecentAds = () => {
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('savedAds')) || []);
  const [sortBy, setSortBy] = useState('newest');
  const [location, setLocation] = useState('All India');

  const toggleSave = (id) => {
    const updated = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(updated);
    localStorage.setItem('savedAds', JSON.stringify(updated));
  };

  const timeAgo = (time) => {
    const diff = Math.floor((Date.now() - time.getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const sortedAds = [...ads].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    return b.timePosted - a.timePosted;
  });

  return (
    <section className="py-16 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">🆕 Recent Ads</h2>
          <div className="flex gap-3 items-center">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option>All India</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option value="newest">Newest</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
            <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FiRefreshCw /> Refresh
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto">
          {sortedAds.map((ad, idx) => (
            <motion.div
              key={ad.id}
              className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Swiper carousel */}
              <Swiper className="w-full h-48 rounded-t-xl">
                {ad.imageUrls.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={ad.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {Date.now() - ad.timePosted.getTime() < 60 * 60 * 1000 && (
                  <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">New</span>
                )}
                {ad.isVerified && (
                  <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">Verified</span>
                )}
                {ad.isUrgent && (
                  <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">Urgent</span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{ad.title}</h3>
                <p className="text-blue-600 font-bold">₹{ad.price.toLocaleString()}</p>

                <div className="flex items-center text-sm text-gray-600 gap-4">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {ad.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {timeAgo(ad.timePosted)}
                  </span>
                </div>

                <div className="flex gap-3 mt-3 text-gray-600 text-lg">
                  <button onClick={() => toggleSave(ad.id)}>
                    <FiHeart className={saved.includes(ad.id) ? 'text-red-500' : ''} />
                  </button>
                  <button>
                    <FiShare2 />
                  </button>
                  <button>
                    <FiMessageSquare />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentAds;