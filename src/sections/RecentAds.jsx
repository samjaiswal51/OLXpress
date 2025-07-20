import { FiMapPin, FiClock } from 'react-icons/fi';

const recentAds = [
  {
    id: 1,
    title: 'Dell XPS 13 Laptop',
    price: 60000,
    location: 'Delhi',
    time: 'Just now',
    image: 'https://images.olx.in/thumbnails/295315234-800x600.webp',
  },
  {
    id: 2,
    title: 'Yamaha FZ Bike 2019',
    price: 85000,
    location: 'Mumbai',
    time: '10 mins ago',
    image: 'https://images.olx.in/thumbnails/295312334-800x600.webp',
  },
  {
    id: 3,
    title: 'Dining Table Set',
    price: 18000,
    location: 'Bangalore',
    time: '30 mins ago',
    image: 'https://images.olx.in/thumbnails/295389214-800x600.webp',
  },
];

const RecentAds = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          🆕 Recent Ads in Your Area
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentAds.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-bold mt-1">
                  ₹{item.price.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center gap-1">
                    <FiMapPin />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentAds;