import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import './NavBar2.css';

const NavBar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="nav-bar-2">
      <div className="nav-bar-2-content">
        <Link to="/" className="nav-bar-2-home">
          <FaHome className="nav-bar-2-home-icon" />
        </Link>
        
        <button className="nav-bar-2-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-bar-2-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/राजनीति" className="nav-bar-2-link" onClick={toggleMenu}>राजनीति</Link></li>
            <li><Link to="/अपराध" className="nav-bar-2-link" onClick={toggleMenu}>अपराध</Link></li>
            <li><Link to="/खेल" className="nav-bar-2-link" onClick={toggleMenu}>खेल</Link></li>
            <li><Link to="/मनोरंजन" className="nav-bar-2-link" onClick={toggleMenu}>मनोरंजन</Link></li>
            <li><Link to="/राष्ट्रीय" className="nav-bar-2-link" onClick={toggleMenu}>राष्ट्रीय</Link></li>
            <li><Link to="/अंतरराष्ट्रीय" className="nav-bar-2-link" onClick={toggleMenu}>अंतरराष्ट्रीय</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar2;