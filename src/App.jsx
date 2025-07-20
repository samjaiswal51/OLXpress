import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from "./components/Navbar";
import Hero from './sections/Hero';
import FeaturedListings from './sections/FeaturedListings';
import RecentAds from "./sections/RecentAds";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedListings />
      <RecentAds />
    </>
  );
}


export default App
