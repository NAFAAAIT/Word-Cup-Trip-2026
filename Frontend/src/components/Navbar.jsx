import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFutbol, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <nav className="navbar glass-panel">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <FaFutbol className="brand-icon" />
          <div className="brand-text">
            <span className="brand-title text-gradient">WORLDCUP</span>
            <span className="brand-subtitle">TRIP 2026</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-menu flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/hotels" className={`nav-link ${isActive('/hotels')}`}>Hotels</Link>
          <Link to="/restaurants" className={`nav-link ${isActive('/restaurants')}`}>Dining</Link>
          <Link to="/stadiums" className={`nav-link ${isActive('/stadiums')}`}>Stadiums</Link>
          <Link to="/transport" className={`nav-link ${isActive('/transport')}`}>Transport</Link>
          <Link to="/emergency" className={`nav-link ${isActive('/emergency')}`}>Emergency</Link>
          <Link to="/matches" className={`nav-link ${isActive('/matches')}`}>Matches</Link>
        </div>

        {/* User Actions */}
        <div className="nav-actions flex items-center gap-4">
          <div className="user-profile">
            <FaUserCircle className="profile-icon" />
            <div className="profile-menu">
              <Link to="/login" className="menu-item">Login</Link>
              <Link to="/signup" className="menu-item">Sign Up</Link>
            </div>
          </div>
          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu glass-panel">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
          <Link to="/hotels" className="mobile-link" onClick={toggleMenu}>Hotels</Link>
          <Link to="/restaurants" className="mobile-link" onClick={toggleMenu}>Dining</Link>
          <Link to="/stadiums" className="mobile-link" onClick={toggleMenu}>Stadiums</Link>
          <Link to="/transport" className="mobile-link" onClick={toggleMenu}>Transport</Link>
          <Link to="/emergency" className="mobile-link" onClick={toggleMenu}>Emergency</Link>
          <Link to="/matches" className="mobile-link" onClick={toggleMenu}>Matches</Link>
          <div className="mobile-divider"></div>
          <Link to="/login" className="mobile-link" onClick={toggleMenu}>Login</Link>
          <Link to="/signup" className="mobile-link" onClick={toggleMenu}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
