import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Iklan1 from '../assets/Iklan.png';
import Ramen1 from '../assets/Ramen 1.png';
import Ramen2 from '../assets/Ramen 2.png';
import Ramen3 from '../assets/Ramen 3.png';

import '../pages/Home.css';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    Iklan1,
    'https://placehold.co/400x200?text=Iklan+2',
    'https://placehold.co/400x200?text=Iklan+3',
  ];

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 300);
  };

  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setFade(true);
    }, 300);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="home-main">
        <h2>Selamat datang!</h2>
        <p>Nikmati ramen terenak dengan kuah khas Jepang di Kedai Ramen iTadaKimaSu!</p>

        <div className="ad-wrapper">
          <div className="ad-box">
            <button className="ad-btn" onClick={prevImage}>
              &#8592;
            </button>
            <img
              src={images[currentImageIndex]}
              alt="Iklan"
              className={`ad-img ${fade ? 'fade-in' : 'fade-out'}`}
            />
            <button className="ad-btn" onClick={nextImage}>
              &#8594;
            </button>
          </div>
        </div>

        <div className="recommendation-wrapper">
          <h2>Rekomendasi Menu:</h2>
          <div className="image-gallery">
            {[Ramen1, Ramen2, Ramen3].map((img, index) => (
              <div className="menu-item" key={index}>
                <img src={img} alt={`Menu ${index + 1}`} />
                <p>
                  {[
                    'Yokohama Ramen',
                    'Nakamoto Ramen',
                    'Shibuya Ramen',
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
