import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from "./components/Navbar";
import Hero from './sections/Hero';
import FeaturedListings from './sections/FeaturedListings';
import RecentAds from "./sections/RecentAds";
import WhyChooseUs from './sections/WhyChooseUs';
import DownloadApp from './sections/DownloadApp';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedListings />
      <RecentAds />
      <WhyChooseUs />
      <DownloadApp />
    </>
  );
}


export default App
