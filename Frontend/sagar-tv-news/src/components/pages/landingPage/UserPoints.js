import React from 'react';
import { FaWallet, FaEllipsisV } from 'react-icons/fa';
import './UserPoints.css';

const UserPoints = () => {
  return (
    <div className="user-points">
      <div className="three-dots-menu">
        <FaEllipsisV />
      </div>
      <div className="user-greeting">
        <h3>Hello</h3>
        <p className="user-name">रामनरेश पांडे</p>
      </div>
      <div className="user-points-balance">
        <FaWallet className="wallet-icon" />
        <span className="points-value">218 pts</span>
      </div>
      <p>आपने 4 घंटे समाचार पढ़ के 218 अंक कमाए</p>
      <button className="redeem-button">Redeem Points</button>
    </div>
  );
};

export default UserPoints;
