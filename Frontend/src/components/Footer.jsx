import React from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaTwitter, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* Brand */}
        <div className="footer-brand">
          <div className="brand-logo">
            <FaFutbol className="brand-icon" />
            <span className="brand-title text-gradient">WORLDCUP</span>
          </div>
          <p className="footer-desc">
            Your ultimate travel companion for the FIFA World Cup 2026 across
            USA, Canada, and Mexico.
          </p>
          <a href="mailto:contact@worldcuptrip2026.com" className="footer-email">
            <FaEnvelope /> contact@worldcuptrip2026.com
          </a>
          <div className="social-links">
            <a href="https://twitter.com/" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="link-group">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/services">Services</Link>
          </div>
          <div className="link-group">
            <h4>Travel Tools</h4>
            <Link to="/matches">Matches</Link>
            <Link to="/stadiums">Stadiums</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/transport">Transport</Link>
            <Link to="/emergency">Emergency Info</Link>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} World Cup Trip 2026. Graduation Project. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
