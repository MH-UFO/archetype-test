import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import '../styles/welcome.css';
import StarryBackground from './StarryBackground';

const Welcome = () => {
  return (
    <div className="landing-page">
      <Header />
      <StarryBackground />

      <div className="content">
        <svg className="symbol" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 10 V 90 M10 50 H 90" />
          <circle cx="50" cy="50" r="20" />
          <path d="M35.86 35.86 L 64.14 64.14 M35.86 64.14 L 64.14 35.86" />
        </svg>
        <h1 className="title">
          کهن‌الگوی نهفته در وجود شما چیست؟
        </h1>
        <p className="subtitle">
          سفری به اعماق ناخودآگاه خود را آغاز کنید و با قدرتمندترین جنبه‌های شخصیتی خود آشنا شوید
        </p>
        <Link to="/archetype_test" className="cta-button">
          آغاز سفر
        </Link>
      </div>
    </div>
  );
};

export default Welcome;