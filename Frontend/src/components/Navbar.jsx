import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFutbol, FaBars, FaTimes, FaSun, FaMoon, FaUserCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar glass-panel${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container flex items-center justify-between">

        <Link to="/" className="navbar-brand">
          <FaFutbol className="brand-icon" />
          <div className="brand-text">
            <span className="brand-title text-gradient">WORLDCUP</span>
            <span className="brand-subtitle">TRIP 2026</span>
          </div>
        </Link>

        <div className="desktop-menu flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          {user && (
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
          )}
        </div>

        <div className="nav-actions flex items-center gap-3">
          <button
            className="theme-toggle-btn"
            onClick={() => setIsDarkMode(d => !d)}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
            <span className="toggle-glow" />
          </button>

          {user ? (
            <div className="user-menu-wrap">
              <button className="user-avatar-btn">
                <FaUserCircle className="profile-icon" />
                <span className="user-name-label">{user.fullName?.split(' ')[0] || 'User'}</span>
              </button>
              <div className="user-dropdown glass-panel">
                <Link to="/dashboard" className="dropdown-item">
                  <FaTachometerAlt /> Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="dropdown-item">Admin Panel</Link>
                )}
                <button className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-btns flex items-center gap-2">
              <Link to="/login" className="nav-link nav-login-link">Login</Link>
              <Link to="/signup" className="btn btn-primary nav-signup-btn">Sign Up</Link>
            </div>
          )}

          <button className="mobile-toggle" onClick={() => setIsOpen(o => !o)} aria-label="Toggle menu">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu glass-panel">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/services" className="mobile-link">Services</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
          {user && <Link to="/dashboard" className="mobile-link">Dashboard</Link>}
          <div className="mobile-divider" />
          {user ? (
            <button className="mobile-link mobile-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </button>
          ) : (
            <>
              <Link to="/login" className="mobile-link">Login</Link>
              <Link to="/signup" className="mobile-link mobile-signup">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
