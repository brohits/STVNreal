import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaMicrophone, FaCircle, FaCoins, FaUserCircle } from 'react-icons/fa';
import stvnLogo from '../../../assets/STVN logo 1.png';
import './NavBar1.css';

const NavBar1 = () => {
  return (
    <navbar1 className="navbar1">
      <div className="navbar1-content">
        <div className="logo">
          <Link to="/">
            <img src={stvnLogo} alt="STVN Logo" className="navbar1-logo-img" />
          </Link>
        </div>
        <div className="navbar1-icons">
          <button className="icon-button">
            <FaSearch className="navbar1-icon" />
          </button>
          <button className="icon-button">
            <FaBell className="navbar1-icon" />
          </button>
          <button className="icon-button">
            <FaMicrophone className="navbar1-icon" />
          </button>
          <button className="icon-button">
            <div className="live-icon">
              <FaCircle className="navbar1-icon" />
              <span>LIVE</span>
            </div>
          </button>
          <button className="icon-button">
            <FaCoins className="navbar1-icon" />
          </button>
          <button className="icon-button">
            <FaUserCircle className="navbar1-icon" />
          </button>
        </div>
      </div>
    </navbar1>
  );
};

export default NavBar1;
