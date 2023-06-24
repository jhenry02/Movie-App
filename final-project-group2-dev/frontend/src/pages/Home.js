import React, { useEffect } from 'react';
import MyCarousel from '../components/carousel/Carousel';
import '../App.css';

export default function Home() {
  useEffect(() => {
    // Import the CSS file dynamically when the component mounts
    const link = document.createElement('link');
    link.href = '../App.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Remove the CSS file when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="home-page">
      <div className="centered">
        <MyCarousel />
      </div>
    </div>
  );
}
