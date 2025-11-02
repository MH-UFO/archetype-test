import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/startTest.css';
import StarryBackground from './StarryBackground';
import Header from './header';

function StartTest() {
  return (
    <div className="test-selection-page">
      <div className="selection-content">
        <StarryBackground />
        <Header />
        <h1 className="selection-title">مسیر خود را انتخاب کنید</h1>
        <p className="selection-instruction">
          پیش از شروع، پیشنهاد می‌کنیم ابتدا <Link to="/guid" className="guid-link">راهنمای کهن‌الگوها</Link> را مطالعه کنید تا با مفاهیم آن آشنا شوید.
        </p>

        <div className="cards-container">
          <Link to="/archetype_test/female" className="choice-card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <h3 className="card-title">تست کهن‌الگوهای زنانه</h3>
          </Link>

          <Link to="/archetype_test/male" className="choice-card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <h3 className="card-title">تست کهن‌الگوهای مردانه</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartTest;
