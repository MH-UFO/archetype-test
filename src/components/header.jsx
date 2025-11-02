import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.css'; 

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="logo-link">
        <svg className="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 10 V 90 M10 50 H 90" />
          <circle cx="50" cy="50" r="20" />
        </svg>
      </NavLink>

      <nav className="nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          خانه
        </NavLink>
        <NavLink 
          to="/guid" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          راهنما
        </NavLink>
        <NavLink 
          to="/archetype_test" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          تست شناسایی کهن الگوها
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
