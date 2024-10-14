import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
    <div className="logo-container">
      <img src={logo} alt="FinanceApp Logo" className="logo-img" />
      <Link to="/" className="logo-text">FinanceApp</Link>
    </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
